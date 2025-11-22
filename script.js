function rnd(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function round(num, decimals = 0) {
  const factor = 10 ** decimals;
  return Math.round(num * factor) / factor;
}

function simplifyFraction(n, d) {
  function gcd(a,b){ return b===0 ? a : gcd(b, a%b); }
  const g = gcd(n,d);
  return [n/g, d/g];
}
// Problem Generators
   const Generators = {
      algebra: {
        easy(){
          // ax + b = c → integer x
          let a = rnd(2, 12) * (Math.random() < .5 ? 1 : -1);
          let x = rnd(-10, 10);
          let b = rnd(-15, 15);
          const c = a * x + b;
          const q = `Solve for x: ${a}x ${b>=0?'+':''}${b} = ${c}`;
          const ans = `x = ${x}`;
          return { q, ans, hint: "Isolate x: subtract b, divide by a." };
        },
medium(){
          // (p)x + (q) = (r)x + (s)
          let px = rnd(2,9), rx = rnd(2,9);
          if(px===rx) rx += 1; // avoid zero coefficient
          let q = rnd(-15,15), s = rnd(-15,15);
          const x = rnd(-10,10);
          // ensure equality holds for chosen x
          const lhs = px*x + q; const rhs = rx*x + s; // derive mismatch
          // Adjust s so equality with secret x holds
          s = lhs - rx*x;
          const Q = `Solve for x: ${px}x ${q>=0?'+':''}${q} = ${rx}x ${s>=0?'+':''}${s}`;
          const A = `x = ${x}`;
          return { q: Q, ans: A, hint: "Gather x terms on one side, constants on the other." };
        },
hard(){
          // Quadratic with integer roots: (x-a)(x-b)=0
          const a = rnd(-6,6);
          let b = rnd(-6,6);
          if(b===a) b += (b===6?-1:1);
          const B = -(a+b), C = a*b;
          const q = `Solve: x² ${B>=0?'+':''}${B}x ${C>=0?'+':''}${C} = 0`;
          const ans = `x = ${a} or x = ${b}`;
          return { q, ans, hint: "Factor the quadratic into (x - r)(x - s)." };
        }
      },
geometry: {
        easy(){
          // Rectangle area
          const w = rnd(3,20), h = rnd(3,15);
          return {
            q: `A rectangle has width ${w} cm and height ${h} cm. Find the area.`,
            ans: `${w*h} cm²`,
            hint: "Area = width × height."
          };
        },
        medium(){
          // Circle circumference or area
          const r = rnd(2,15);
          const type = choice(["area","circumference"]);
          if(type==="area"){
            const area = round(Math.PI*r*r,2);
            return { q:`A circle has radius ${r} m. Find its area (use π≈3.14).`, ans: `${round(3.14*r*r,2)} m²`, hint:"Area = πr²." };
          } else {
            return { q:`A circle has radius ${r} m. Find its circumference (use π≈3.14).`, ans: `${round(2*3.14*r,2)} m`, hint:"Circumference = 2πr." };
          }
        },
        hard(){
          // Right triangle via Pythagorean triple
          const triples = [ [3,4,5], [5,12,13], [8,15,17], [7,24,25] ];
          const k = rnd(1,4);
          const [a,b,c] = choice(triples).map(n=>n*k);
          const missing = choice(["leg","hyp"]);
          if(missing==="leg"){
            return { q:`Right triangle: hypotenuse ${c} cm, one leg ${a} cm. Find the other leg.`, ans: `${Math.sqrt(c*c - a*a)} cm`, hint:"Use a² + b² = c²." };
          } else {
            return { q:`Right triangle legs are ${a} cm and ${b} cm. Find the hypotenuse.`, ans: `${Math.sqrt(a*a + b*b)} cm`, hint:"Use c = √(a² + b²)." };
          }
        }
      },
trigonometry: {
        easy(){
          // 30-60-90 or 45-45-90 known ratios, rounded
          const angle = choice([30,45,60]);
          const oppOrAdj = choice(["opposite","adjacent"]);
          const hyp = rnd(6,20);
          let val;
          if(angle===30) val = 0.5; else if(angle===60) val = Math.sqrt(3)/2; else val = Math.sqrt(2)/2;
          const q = `In a right triangle, angle A = ${angle}°. If hypotenuse = ${hyp}, find the length of the ${oppOrAdj} side (round to 2 decimals).`;
          const ans = oppOrAdj==="opposite" ? round(hyp * (angle===45?Math.sqrt(2)/2: (angle===30?0.5:Math.sqrt(3)/2)),2) : round(hyp * (angle===45?Math.sqrt(2)/2: (angle===60?0.5:Math.sqrt(3)/2)),2);
          return { q, ans: ans+" units", hint: `Use ${oppOrAdj==="opposite"?"sin":"cos"}(${angle}°) = ${oppOrAdj}/hyp.` };
        },
medium(){
          // Given angle & adjacent, find opposite using tan
          const angle = rnd(15,75);
          const adj = rnd(5,25);
          const opp = round(Math.tan(angle*Math.PI/180) * adj, 2);
          return { q:`Right triangle: angle θ = ${angle}°, adjacent side = ${adj}. Find the opposite side (2 d.p.).`, ans: `${opp} units`, hint:"Use tan(θ) = opposite/adjacent." };
        },
hard(){
          // Given two sides, find an angle via inverse trig
          const opp = rnd(5,25), hyp = rnd(opp+1, opp+30);
          const angle = round(Math.asin(opp/hyp) * 180/Math.PI, 2);
          return { q:`Right triangle: opposite = ${opp}, hypotenuse = ${hyp}. Find angle θ (to 2 d.p.).`, ans: `${angle}°`, hint:"Use sin(θ) = opposite/hypotenuse." };
        }
      },
probstats: {
        easy(){
          // Mean of a small set
          const n = rnd(3,5);
          const arr = Array.from({length:n}, ()=>rnd(1,20));
          const mean = round(arr.reduce((a,b)=>a+b,0)/n,2);
          return { q:`Find the mean of the numbers: ${arr.join(', ')} (2 d.p.).`, ans: `${mean}`, hint:"Mean = (sum of values) / (number of values)." };
        },
        medium(){
          // Simple bag probability
          const red = rnd(2,9), blue = rnd(2,9);
          const total = red + blue;
          const p = simplifyFraction(red, total);
          return { q:`A bag has ${red} red and ${blue} blue balls. One is drawn at random. Probability it is red? (simplify)`, ans: `${p[0]}/${p[1]}`, hint:"P = favourable / total, then reduce the fraction." };
        },
hard(){
          // Median of odd-length set
          const n = 5;
          const arr = Array.from({length:n}, ()=>rnd(1,50));
          const sorted = [...arr].sort((a,b)=>a-b);
          const median = sorted[(n-1)/2];
          return { q:`Find the median of: ${arr.join(', ')}`, ans: `${median}`, hint:"Sort the list; pick the middle value." };
        }
      }
    };
  function generate(category, difficulty){
      const cats = category === 'any' ? Object.keys(Generators) : [category];
      const cat = choice(cats);
      const gen = Generators[cat][difficulty] || Generators[cat]["medium"];
      const { q, ans, hint } = gen();
      return { cat, q, ans, hint };
    }
 // DOM wiring
    const $problem = document.getElementById('problem');
    const $answer = document.getElementById('answer');
    const $hint = document.getElementById('hint');
    const $meta = document.getElementById('meta');
    const $show = document.getElementById('showAnswer');
function setProblem(payload){
      $problem.innerHTML = payload.q;
      $answer.textContent = `Answer: ${payload.ans}`;
      $hint.textContent = payload.hint || '';
      $answer.style.display = 'none';
      $answer.setAttribute('aria-hidden','true');
      $show.setAttribute('aria-expanded','false');
      $meta.textContent = `${payload.cat[0].toUpperCase()+payload.cat.slice(1)} · ${new Date().toLocaleTimeString()} · ${document.getElementById('difficulty').value}`;
    }





