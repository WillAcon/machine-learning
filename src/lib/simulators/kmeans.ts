import { H, W, clear, colors, dot, gaussian, line, mulberry32, setupCanvas, text } from './util';

type P = { x: number; y: number };

const PALETTE = ['#3355c8', '#0e7c6b', '#a86a12', '#6b3fa0', '#b42318', '#0f766e'];

export function initKMeans(root: ParentNode = document) {
  const canvas = root.querySelector<HTMLCanvasElement>('#kmCanvas');
  if (!canvas || canvas.dataset.ready) return;
  canvas.dataset.ready = '1';

  const ctx = setupCanvas(canvas);
  const kInput = root.querySelector<HTMLInputElement>('#kmK')!;
  const kOut = root.querySelector<HTMLOutputElement>('#kmKOut')!;
  const stepBtn = root.querySelector<HTMLButtonElement>('#kmStep')!;
  const runBtn = root.querySelector<HTMLButtonElement>('#kmRun')!;
  const resetBtn = root.querySelector<HTMLButtonElement>('#kmReset')!;
  const inertiaOut = root.querySelector<HTMLElement>('#kmInertia')!;
  const iterOut = root.querySelector<HTMLElement>('#kmIter')!;

  let points: P[] = [];
  let centroids: P[] = [];
  let assignment: number[] = [];
  let iter = 0;
  let timer: number | null = null;

  const xToPx = (x: number) => 34 + x * (W - 54);
  const yToPx = (y: number) => H - 26 - y * (H - 46);

  function generate() {
    const rand = mulberry32(23);
    points = [];
    const centers = [
      { x: 0.26, y: 0.3 },
      { x: 0.72, y: 0.28 },
      { x: 0.52, y: 0.72 },
      { x: 0.2, y: 0.75 },
      { x: 0.8, y: 0.7 },
      { x: 0.5, y: 0.12 }
    ];
    for (let c = 0; c < centers.length; c++) {
      for (let i = 0; i < 42; i++) {
        points.push({
          x: centers[c].x + gaussian(rand) * 0.085,
          y: centers[c].y + gaussian(rand) * 0.075
        });
      }
    }
    reset();
  }

  function reset() {
    stop();
    const k = Number(kInput.value);
    centroids = [];
    for (let i = 0; i < k; i++) {
      const p = points[Math.floor((i + 0.5) * (points.length / k))];
      centroids.push({ x: p.x, y: p.y });
    }
    assignment = new Array(points.length).fill(-1);
    iter = 0;
    stepAssign();
    draw();
  }

  function stepAssign() {
    let changed = false;
    for (let i = 0; i < points.length; i++) {
      let best = 0;
      let bestD = Infinity;
      for (let c = 0; c < centroids.length; c++) {
        const d = (points[i].x - centroids[c].x) ** 2 + (points[i].y - centroids[c].y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = c;
        }
      }
      if (assignment[i] !== best) {
        assignment[i] = best;
        changed = true;
      }
    }
    return changed;
  }

  function updateCentroids() {
    const sums = centroids.map(() => ({ x: 0, y: 0, n: 0 }));
    points.forEach((p, i) => {
      const c = assignment[i];
      sums[c].x += p.x;
      sums[c].y += p.y;
      sums[c].n++;
    });
    centroids = centroids.map((old, i) =>
      sums[i].n ? { x: sums[i].x / sums[i].n, y: sums[i].y / sums[i].n } : old
    );
  }

  function inertia() {
    let s = 0;
    points.forEach((p, i) => {
      const c = centroids[assignment[i]] ?? p;
      s += (p.x - c.x) ** 2 + (p.y - c.y) ** 2;
    });
    return s;
  }

  function draw() {
    const c = colors();
    clear(ctx, W, H, c.bg);
    for (let g = 0; g <= 1; g += 0.2) {
      line(ctx, xToPx(g), yToPx(0), xToPx(g), yToPx(1), c.grid, 1);
      line(ctx, xToPx(0), yToPx(g), xToPx(1), yToPx(g), c.grid, 1);
    }
    points.forEach((p, i) => {
      const col = PALETTE[assignment[i] % PALETTE.length];
      dot(ctx, xToPx(p.x), yToPx(p.y), 3.2, col);
    });
    centroids.forEach((cen, i) => {
      const col = PALETTE[i % PALETTE.length];
      ctx.save();
      ctx.strokeStyle = col;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(xToPx(cen.x), yToPx(cen.y), 9, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(xToPx(cen.x), yToPx(cen.y), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    inertiaOut.textContent = inertia().toFixed(3);
    iterOut.textContent = String(iter);
    text(ctx, `k = ${centroids.length}`, 38, 22, c.muted, 11, 'left', '600');
    text(ctx, 'x₁', W - 22, yToPx(0) + 15, c.muted, 11, 'center');
    text(ctx, 'x₂', xToPx(0) - 15, 30, c.muted, 11, 'center');
  }

  function step() {
    const moved = stepAssign();
    updateCentroids();
    iter++;
    draw();
    return moved;
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
  stepBtn.addEventListener('click', () => {
    step();
  });
  resetBtn.addEventListener('click', reset);
  runBtn.addEventListener('click', () => {
    if (timer !== null) {
      stop();
      return;
    }
    runBtn.textContent = 'Pausar';
    timer = window.setInterval(() => {
      const moved = step();
      if (!moved || iter > 60) stop();
    }, 380);
  });

  kOut.textContent = kInput.value;
  generate();
  new MutationObserver(draw).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}
