import { H, W, clear, colors, dot, gaussian, line, mulberry32, setupCanvas, text } from './util';

type P = { x: number; y: number };
type Comp = { pi: number; mx: number; my: number; a: number; b: number; c: number };

const PAD = 30;
const SIZE = 300;
const OX = (W - SIZE) / 2;
const OY = H - PAD;
const REG = 1e-4;

const PALETTE = ['#3355c8', '#0e7c6b', '#a86a12', '#6b3fa0'];

const xToPx = (x: number) => OX + x * SIZE;
const yToPx = (y: number) => OY - y * SIZE;

export function initEM(root: ParentNode = document) {
  const canvas = root.querySelector<HTMLCanvasElement>('#emCanvas');
  if (!canvas || canvas.dataset.ready) return;
  canvas.dataset.ready = '1';

  const ctx = setupCanvas(canvas);
  const kInput = root.querySelector<HTMLInputElement>('#emK')!;
  const kOut = root.querySelector<HTMLOutputElement>('#emKOut')!;
  const stepBtn = root.querySelector<HTMLButtonElement>('#emStep')!;
  const runBtn = root.querySelector<HTMLButtonElement>('#emRun')!;
  const resetBtn = root.querySelector<HTMLButtonElement>('#emReset')!;
  const loglikOut = root.querySelector<HTMLElement>('#emLoglik')!;
  const iterOut = root.querySelector<HTMLElement>('#emIter')!;
  const deltaOut = root.querySelector<HTMLElement>('#emDelta')!;

  let points: P[] = [];
  let comps: Comp[] = [];
  let resp: number[][] = [];
  let loglik = -Infinity;
  let delta = 0;
  let iter = 0;
  let timer: number | null = null;

  const k = () => Number(kInput.value);

  function generate() {
    const rand = mulberry32(33);
    points = [];
    const centers = [
      { x: 0.3, y: 0.34 },
      { x: 0.72, y: 0.32 },
      { x: 0.52, y: 0.72 }
    ];
    for (const c of centers) {
      for (let i = 0; i < 48; i++) {
        points.push({
          x: Math.max(0.03, Math.min(0.97, c.x + gaussian(rand) * 0.085)),
          y: Math.max(0.03, Math.min(0.97, c.y + gaussian(rand) * 0.085))
        });
      }
    }
  }

  function reset() {
    stop();
    const K = k();
    comps = [];
    for (let i = 0; i < K; i++) {
      const p = points[Math.floor(((i + 0.5) * points.length) / K)];
      comps.push({ pi: 1 / K, mx: p.x, my: p.y, a: 0.02, b: 0, c: 0.02 });
    }
    iter = 0;
    delta = 0;
    eStep();
    draw();
  }

  function eStep() {
    const K = comps.length;
    const logs: number[][] = [];
    resp = [];
    let total = 0;

    for (const p of points) {
      const row: number[] = [];
      for (let j = 0; j < K; j++) {
        const comp = comps[j];
        const det = Math.max(1e-9, comp.a * comp.c - comp.b * comp.b);
        const dx = p.x - comp.mx;
        const dy = p.y - comp.my;
        const q = (comp.c * dx * dx - 2 * comp.b * dx * dy + comp.a * dy * dy) / det;
        row.push(
          Math.log(Math.max(comp.pi, 1e-12)) -
            Math.log(2 * Math.PI) -
            0.5 * Math.log(det) -
            0.5 * q
        );
      }
      logs.push(row);
      const m = Math.max(...row);
      const s = row.reduce((acc, v) => acc + Math.exp(v - m), 0);
      total += m + Math.log(s);
    }

    for (const row of logs) {
      const m = Math.max(...row);
      const ex = row.map((v) => Math.exp(v - m));
      const s = ex.reduce((acc, v) => acc + v, 0);
      resp.push(ex.map((v) => v / s));
    }
    loglik = total;
  }

  function mStep() {
    const K = comps.length;
    const n = points.length;
    for (let j = 0; j < K; j++) {
      let nk = 0;
      for (let i = 0; i < n; i++) nk += resp[i][j];
      if (nk < 1e-6) {
        // Componente muerta: se recoloca en un punto al azar.
        const p = points[Math.floor(Math.random() * n)];
        comps[j] = { pi: 1 / n, mx: p.x, my: p.y, a: 0.02, b: 0, c: 0.02 };
        continue;
      }
      let mx = 0;
      let my = 0;
      for (let i = 0; i < n; i++) {
        mx += resp[i][j] * points[i].x;
        my += resp[i][j] * points[i].y;
      }
      mx /= nk;
      my /= nk;
      let a = 0;
      let b = 0;
      let c = 0;
      for (let i = 0; i < n; i++) {
        const dx = points[i].x - mx;
        const dy = points[i].y - my;
        a += resp[i][j] * dx * dx;
        b += resp[i][j] * dx * dy;
        c += resp[i][j] * dy * dy;
      }
      comps[j] = {
        pi: nk / n,
        mx,
        my,
        a: a / nk + REG,
        b: b / nk,
        c: c / nk + REG
      };
    }
    const sum = comps.reduce((acc, comp) => acc + comp.pi, 0);
    comps = comps.map((comp) => ({ ...comp, pi: comp.pi / sum }));
  }

  function step() {
    eStep();
    const prev = loglik;
    mStep();
    eStep();
    delta = loglik - prev;
    iter++;
    if (delta < 1e-5 && iter > 1) stop();
    draw();
  }

  function draw() {
    const c = colors();
    clear(ctx, W, H, c.bg);
    for (let g = 0; g <= 1; g += 0.25) {
      line(ctx, xToPx(g), yToPx(0), xToPx(g), yToPx(1), c.grid, 1);
      line(ctx, xToPx(0), yToPx(g), xToPx(1), yToPx(g), c.grid, 1);
    }

    // Puntos coloreados por responsabilidad dominante
    for (let i = 0; i < points.length; i++) {
      let best = 0;
      let bestR = -1;
      for (let j = 0; j < resp[i].length; j++) {
        if (resp[i][j] > bestR) {
          bestR = resp[i][j];
          best = j;
        }
      }
      const alpha = 0.35 + 0.65 * bestR;
      ctx.save();
      ctx.globalAlpha = alpha;
      dot(ctx, xToPx(points[i].x), yToPx(points[i].y), 3, PALETTE[best % PALETTE.length]);
      ctx.restore();
    }

    // Elipses de 2 desviaciones por componente
    comps.forEach((comp, j) => {
      const col = PALETTE[j % PALETTE.length];
      const tr = comp.a + comp.c;
      const det = Math.max(1e-12, comp.a * comp.c - comp.b * comp.b);
      const disc = Math.max(0, (tr * tr) / 4 - det);
      const l1 = tr / 2 + Math.sqrt(disc);
      const l2 = Math.max(0, tr / 2 - Math.sqrt(disc));
      const angle = 0.5 * Math.atan2(2 * comp.b, comp.a - comp.c);
      ctx.save();
      ctx.strokeStyle = col;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(
        xToPx(comp.mx),
        yToPx(comp.my),
        2 * Math.sqrt(Math.max(l1, 1e-8)) * SIZE,
        2 * Math.sqrt(Math.max(l2, 1e-8)) * SIZE,
        -angle,
        0,
        Math.PI * 2
      );
      ctx.stroke();
      ctx.restore();

      // Media
      const px = xToPx(comp.mx);
      const py = yToPx(comp.my);
      line(ctx, px - 7, py, px + 7, py, col, 2);
      line(ctx, px, py - 7, px, py + 7, col, 2);
    });

    loglikOut.textContent = Number.isFinite(loglik) ? loglik.toFixed(1) : '—';
    iterOut.textContent = String(iter);
    deltaOut.textContent = Math.abs(delta) < 1e-4 ? delta.toExponential(1) : delta.toFixed(3);

    text(ctx, `K = ${comps.length}`, 16, 18, c.muted, 11, 'left', '600');
    text(ctx, 'elipses: 2σ', W - 16, 18, c.muted, 10.5, 'right');
    text(ctx, 'x₁', W - 18, yToPx(0) - 10, c.muted, 10, 'center');
    text(ctx, 'x₂', xToPx(0) - 10, 32, c.muted, 10, 'center');
  }

  function stop() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
    runBtn.textContent = 'Ejecutar';
  }

  kInput.addEventListener('input', () => {
    kOut.textContent = kInput.value;
    reset();
  });
  stepBtn.addEventListener('click', step);
  resetBtn.addEventListener('click', reset);
  runBtn.addEventListener('click', () => {
    if (timer !== null) {
      stop();
      return;
    }
    runBtn.textContent = 'Pausar';
    timer = window.setInterval(step, 620);
  });

  kOut.textContent = kInput.value;
  generate();
  reset();
  new MutationObserver(draw).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}
