import { H, W, clear, colors, dot, gaussian, line, mulberry32, setupCanvas, text } from './util';

type P = { x: number; y: number; label: number };

const PAD = 30;
const SIZE = 300;
const OX = (W - SIZE) / 2;
const OY = H - PAD;

const xToPx = (x: number) => OX + x * SIZE;
const yToPx = (y: number) => OY - y * SIZE;

export function initPerceptron(root: ParentNode = document) {
  const canvas = root.querySelector<HTMLCanvasElement>('#pcCanvas');
  if (!canvas || canvas.dataset.ready) return;
  canvas.dataset.ready = '1';

  const ctx = setupCanvas(canvas);
  const etaInput = root.querySelector<HTMLInputElement>('#pcEta');
  const etaOut = root.querySelector<HTMLOutputElement>('#pcEtaOut');
  const stepBtn = root.querySelector<HTMLButtonElement>('#pcStep')!;
  const runBtn = root.querySelector<HTMLButtonElement>('#pcRun')!;
  const resetBtn = root.querySelector<HTMLButtonElement>('#pcReset')!;
  const errorsOut = root.querySelector<HTMLElement>('#pcErrors')!;
  const iterOut = root.querySelector<HTMLElement>('#pcIter')!;
  const epochOut = root.querySelector<HTMLElement>('#pcEpoch')!;
  const accOut = root.querySelector<HTMLElement>('#pcAcc')!;

  let points: P[] = [];
  let w = { x: 0, y: 0 };
  let b = 0;
  let index = 0;
  let steps = 0;
  let errors = 0;
  let correctStreak = 0;
  let converged = false;
  let timer: number | null = null;

  const eta = () => Number(etaInput?.value ?? 0.5);
  const score = (p: P) => w.x * p.x + w.y * p.y + b;
  const predict = (p: P) => (score(p) > 0 ? 1 : -1);

  function generate() {
    const rand = mulberry32(7);
    points = [];
    // Dos nubes separables: el perceptrón converge en pocas épocas y así el
    // simulador puede mostrar el momento exacto en que deja de cometer errores.
    const clusters: Array<{ cx: number; cy: number; label: number }> = [
      { cx: 0.28, cy: 0.32, label: -1 },
      { cx: 0.72, cy: 0.68, label: 1 }
    ];
    for (const c of clusters) {
      for (let i = 0; i < 24; i++) {
        points.push({
          x: Math.max(0.04, Math.min(0.96, c.cx + gaussian(rand) * 0.1)),
          y: Math.max(0.04, Math.min(0.96, c.cy + gaussian(rand) * 0.1)),
          label: c.label
        });
      }
    }
  }

  function reset() {
    stop();
    w = { x: 0, y: 0 };
    b = 0;
    index = 0;
    steps = 0;
    errors = 0;
    correctStreak = 0;
    converged = false;
    draw();
  }

  function draw() {
    const c = colors();
    clear(ctx, W, H, c.bg);

    // Grilla
    for (let g = 0; g <= 1; g += 0.25) {
      line(ctx, xToPx(g), yToPx(0), xToPx(g), yToPx(1), c.grid, 1);
      line(ctx, xToPx(0), yToPx(g), xToPx(1), yToPx(g), c.grid, 1);
    }

    // Frontera actual
    if (Math.abs(w.y) > 1e-9) {
      const x1 = -0.35;
      const x2 = 1.35;
      const y1 = -(w.x * x1 + b) / w.y;
      const y2 = -(w.x * x2 + b) / w.y;
      line(ctx, xToPx(x1), yToPx(y1), xToPx(x2), yToPx(y2), c.accent, 2.4);
    } else if (Math.abs(w.x) > 1e-9) {
      const xv = -b / w.x;
      line(ctx, xToPx(xv), yToPx(-0.35), xToPx(xv), yToPx(1.35), c.accent, 2.4);
    }

    // Puntos
    for (const p of points) {
      const wrong = predict(p) !== p.label;
      const col = p.label > 0 ? c.accent2 : c.danger;
      dot(ctx, xToPx(p.x), yToPx(p.y), wrong ? 4.2 : 3.6, col, wrong ? c.gold : '');
    }

    // Vector normal
    const norm = Math.hypot(w.x, w.y);
    if (norm > 1e-6) {
      const cx = -b * w.x / (norm * norm);
      const cy = -b * w.y / (norm * norm);
      const ux = w.x / norm;
      const uy = w.y / norm;
      const fromX = xToPx(cx);
      const fromY = yToPx(cy);
      const toX = xToPx(cx + ux * 0.16);
      const toY = yToPx(cy + uy * 0.16);
      line(ctx, fromX, fromY, toX, toY, c.gold, 2);
      dot(ctx, toX, toY, 3, c.gold);
    }

    text(ctx, converged ? 'convergió' : 'w · x + b = 0', 16, 18, converged ? c.green : c.muted, 11, 'left', '600');
    text(ctx, `‖w‖ = ${norm.toFixed(2)}`, W - 16, 18, c.muted, 11, 'right');
    text(ctx, 'x₁', W - 18, yToPx(0) - 10, c.muted, 10, 'center');
    text(ctx, 'x₂', xToPx(0) - 10, 32, c.muted, 10, 'center');

    const correct = points.filter((p) => predict(p) === p.label).length;
    errorsOut.textContent = String(errors);
    iterOut.textContent = String(steps);
    epochOut.textContent = String(Math.floor(steps / points.length));
    accOut.textContent = points.length ? `${((correct / points.length) * 100).toFixed(1)}%` : '—';
  }

  function step() {
    if (!points.length || converged) return;
    const p = points[index];
    if (p.label * score(p) <= 0) {
      w.x += eta() * p.label * p.x;
      w.y += eta() * p.label * p.y;
      b += eta() * p.label;
      errors++;
      correctStreak = 0;
    } else {
      correctStreak++;
    }
    steps++;
    index = (index + 1) % points.length;
    if (correctStreak >= points.length) {
      converged = true;
      stop();
    }
    draw();
  }

  function stop() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
    runBtn.textContent = 'Ejecutar';
  }

  stepBtn.addEventListener('click', step);
  resetBtn.addEventListener('click', reset);
  runBtn.addEventListener('click', () => {
    if (timer !== null) {
      stop();
      return;
    }
    if (converged) reset();
    runBtn.textContent = 'Pausar';
    timer = window.setInterval(() => {
      step();
      if (steps > 1400) stop();
    }, 45);
  });
  etaInput?.addEventListener('input', () => {
    if (etaOut) etaOut.textContent = eta().toFixed(2);
  });

  if (etaOut) etaOut.textContent = eta().toFixed(2);
  generate();
  reset();
  new MutationObserver(draw).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}
