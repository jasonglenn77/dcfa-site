// Drives headless Edge over the DevTools Protocol to audit pages at a true mobile
// viewport. Windows clamps --window-size to ~492px, so emulation is the only way to
// actually measure 390px. Run: node --experimental-websocket scripts/mobile-audit.mjs
import { writeFileSync, mkdirSync } from 'node:fs';

const CDP_PORT = 9222;
const ORIGIN = 'http://localhost:4321';
const OUT = process.argv[2] || '.';
const WIDTH = 390, HEIGHT = 844;

const PAGES = [
  '/', '/training', '/atp-ctp', '/fleet', '/about', '/contact',
  '/financing', '/financing/va-benefits', '/faq', '/insurance',
  '/rotor-transition', '/blog', '/student-resources',
];

const rpc = (ws, id, method, params = {}) =>
  new Promise((resolve, reject) => {
    const onMsg = (e) => {
      const m = JSON.parse(e.data);
      if (m.id !== id) return;
      ws.removeEventListener('message', onMsg);
      m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result);
    };
    ws.addEventListener('message', onMsg);
    ws.send(JSON.stringify({ id, method, params }));
    setTimeout(() => reject(new Error(`${method} timed out`)), 30000);
  });

// Runs in the page. Measures real layout, not guesses.
const PROBE = `(() => {
  const vw = window.innerWidth;
  const de = document.documentElement;
  const overflowX = Math.max(de.scrollWidth, document.body.scrollWidth) - vw;

  // Elements whose box actually extends past the viewport's right edge.
  const bleed = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    if (r.right > vw + 1 || r.left < -1) {
      // Ignore elements inside a deliberate horizontal scroller.
      let p = el.parentElement, scoped = false;
      while (p) {
        const pcs = getComputedStyle(p);
        if (pcs.overflowX === 'auto' || pcs.overflowX === 'scroll') { scoped = true; break; }
        p = p.parentElement;
      }
      if (scoped) continue;
      bleed.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : String(el.className || '')).slice(0, 90),
        left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width),
        text: (el.textContent || '').trim().slice(0, 45),
      });
    }
  }

  // Touch targets below 44px that are actually interactive.
  const small = [];
  for (const el of document.querySelectorAll('a[href], button, input, select, textarea')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    if (r.height < 44 || r.width < 24) {
      small.push({
        tag: el.tagName.toLowerCase(),
        h: Math.round(r.height), w: Math.round(r.width),
        label: (el.getAttribute('aria-label') || el.textContent || el.getAttribute('name') || '').trim().slice(0, 40),
        cls: String(el.className || '').slice(0, 60),
      });
    }
  }

  // Form controls rendering with no visible border (the Tailwind v4 preflight trap).
  const borderless = [];
  for (const el of document.querySelectorAll('input, select, textarea')) {
    const cs = getComputedStyle(el);
    if (el.type === 'hidden' || el.type === 'checkbox' || el.type === 'radio') continue;
    const bw = parseFloat(cs.borderTopWidth) || 0;
    if (bw === 0) borderless.push({ name: el.getAttribute('name') || el.tagName.toLowerCase(), borderWidth: cs.borderTopWidth, borderColor: cs.borderTopColor });
  }

  return { vw, scrollWidth: Math.max(de.scrollWidth, document.body.scrollWidth), overflowX,
           bleed: bleed.slice(0, 12), small: small.slice(0, 12), borderless, docHeight: de.scrollHeight };
})()`;

const res = await fetch(`http://localhost:${CDP_PORT}/json/list`);
const targets = await res.json();
const page = targets.find((t) => t.type === 'page');
if (!page) { console.error('no CDP page target'); process.exit(1); }

const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r, j) => { ws.addEventListener('open', r); ws.addEventListener('error', j); });

let id = 0;
await rpc(ws, ++id, 'Page.enable');
await rpc(ws, ++id, 'Emulation.setDeviceMetricsOverride', {
  width: WIDTH, height: HEIGHT, deviceScaleFactor: 2, mobile: true,
});
await rpc(ws, ++id, 'Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });

mkdirSync(OUT, { recursive: true });
const report = [];

for (const path of PAGES) {
  try {
    await rpc(ws, ++id, 'Page.navigate', { url: ORIGIN + path });
    await new Promise((r) => setTimeout(r, 1400));
    const { result } = await rpc(ws, ++id, 'Runtime.evaluate', { expression: PROBE, returnByValue: true });
    report.push({ path, ...result.value });
  } catch (e) {
    report.push({ path, error: String(e.message) });
  }
}

// Full-page screenshot of the homepage at true mobile size, for eyeballing.
await rpc(ws, ++id, 'Page.navigate', { url: ORIGIN + '/' });
await new Promise((r) => setTimeout(r, 1500));
const shot = await rpc(ws, ++id, 'Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: WIDTH, height: 1500, scale: 1 } });
writeFileSync(`${OUT}/home-true390.png`, Buffer.from(shot.data, 'base64'));

writeFileSync(`${OUT}/mobile-report.json`, JSON.stringify(report, null, 2));

for (const r of report) {
  if (r.error) { console.log(`\n${r.path}  ERROR ${r.error}`); continue; }
  const flag = r.overflowX > 0 ? `OVERFLOW +${r.overflowX}px` : 'ok';
  console.log(`\n${r.path}  vw=${r.vw} scrollW=${r.scrollWidth} [${flag}]`);
  if (r.bleed.length) {
    console.log('  bleeding elements:');
    for (const b of r.bleed) console.log(`    <${b.tag}> right=${b.right} w=${b.w} "${b.text}" .${b.cls}`);
  }
  if (r.borderless.length) console.log(`  borderless controls: ${r.borderless.map((b) => b.name).join(', ')}`);
  if (r.small.length) console.log(`  small targets (<44px): ${r.small.map((s) => `${s.tag}[${s.label}] ${s.w}x${s.h}`).join(' | ')}`);
}
ws.close();
