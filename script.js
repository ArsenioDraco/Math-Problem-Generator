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

