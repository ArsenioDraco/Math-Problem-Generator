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

