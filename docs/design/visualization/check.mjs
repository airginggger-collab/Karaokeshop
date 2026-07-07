// check.mjs — контраст-чекер WCAG 2.1 (standalone).
// Впиши свои пары в PAIRS, запусти:  node check.mjs
// Разбирает 3- и 6-значный hex. Те же функции работают в браузере (для живых бейджей).

function _lin(c){ c/=255; return c<=0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); }

export function luminance(hex){
  hex = hex.replace('#','');
  if (hex.length === 3) hex = hex.split('').map(x => x+x).join('');   // #abc -> #aabbcc
  const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
  return 0.2126*_lin(r) + 0.7152*_lin(g) + 0.0722*_lin(b);
}

export function contrast(a, b){
  const l1 = luminance(a), l2 = luminance(b);
  const hi = Math.max(l1,l2), lo = Math.min(l1,l2);
  return (hi + 0.05) / (lo + 0.05);
}

// 'AA' ≥4.5 (тело) · 'AA Large' ≥3 (крупное/UI) · 'FAIL' <3
export function grade(r){ return r >= 4.5 ? 'AA' : r >= 3 ? 'AA Large' : 'FAIL'; }

export function checkPairs(pairs){
  let fails = 0;
  for (const [fg, bg, label] of pairs){
    const r = contrast(fg, bg), g = grade(r);
    console.log(`  ${g.padEnd(9)} ${r.toFixed(2).padStart(6)}:1  ${label||''}  (${fg} on ${bg})`);
    if (g === 'FAIL') fails++;
  }
  console.log(fails ? `\n✗ ${fails} провал(ов) ниже 3:1` : '\n✓ все пары ≥ 3:1');
  return fails === 0;
}

// ---- впиши свои пары [fg, bg, label] и запусти ----
const PAIRS = [
  ['#16202f', '#ffffff', 'текст/карта'],
  ['#57617a', '#ffffff', 'muted/карта'],
  ['#ffffff', '#0d7a6e', 'on-primary'],
];

checkPairs(PAIRS);
