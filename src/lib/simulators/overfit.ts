import { H, W, clear, colors, dot, gaussian, line, meanSquaredError, mulberry32, polyfit, setupCanvas, text } from './util';

type Point = { x: number; y: number };

export function initOverfit(root: ParentNode = document) {
  const canvas = root.querySelector<HTMLCanvasElement>('#overfitCanvas');
  if (!canvas || canvas.dataset.ready) return;
  canvas.dataset.ready = '1';

  const ctx = setupCanvas(canvas);
  const degree = root.querySelector<HTMLInputElement>('#ofDegree')!;
  const degreeOut = root.querySelector<HTMLOutputElement>('#ofDegreeOut')!;
  const noise = root.querySelector<HTMLInputElement>('#ofNoise')!;
  const noiseOut = root.querySelector<HTMLOutputElement>('#ofNoiseOut')!;
  const newBtn = root.querySelector<HTMLButtonElement>('#ofNew')!;
  const optBtn = root.querySelector<HTMLButtonElement>('#ofOpt')!;
  const trainOut = root.querySelector<HTMLElement>('#ofTrain')!;
  const testOut = root.querySelector<HTMLElement>('#ofTest')!;
  const diagOut = root.querySelector<HTMLElement>('#ofDiag')!;

  let train: Point[] = [];
  let test: Point[] = [];
  let coef: number[] = [];
  let seed = 7;

  const xToPx = (x: number) => 44 + ((x + 3.4) / 6.8) * (W - 64);
  const yToPx = (y: number) => H - 30 - ((y + 2.1) / 4.2) * (H - 56);

  function generate() {
    const rand = mulberry32(seed);
    const sigma = Number(noise.value);
    train = [];
    test = [];
    for (let i = 0; i < 30; i++) {
      const x = -3 + rand() * 6;
      train.push({ x, y: Math.sin(x) + gaussian(rand) * sigma });
    }
    for (let i = 0; i < 26; i++) {
      const x = -3 + rand() * 6;
      test.push({ x, y: Math.sin(x) + gaussian(rand) * sigma });
    }
    refit();
  }

  function refit() {
    const d = Number(degree.value);
    coef = polyfit(train.map((p) => p.x), train.map((p) => p.y), d);
    draw();
  }

  function evalAt(x: number) {
    let p = 0;
    for (let j = coef.length - 1; j >= 0; j--) p = p * x + coef[j];
    return p;
  }

  function draw() {
    const c = colors();
    const d = Number(degree.value);
    clear(ctx, W, H, c.bg);

    for (let gx = -3; gx <= 3; gx++) line(ctx, xToPx(gx), yToPx(-2), xToPx(gx), yToPx(2), c.grid, 1);
    for (let gy = -2; gy <= 2; gy++) line(ctx, xToPx(-3.4), yToPx(gy), xToPx(3.4), yToPx(gy), c.grid, 1);
    line(ctx, xToPx(-3.4), yToPx(0), xToPx(3.4), yToPx(0), c.axis, 1);
    line(ctx, xToPx(0), yToPx(-2), xToPx(0), yToPx(2), c.axis, 1);

    for (const p of test) dot(ctx, xToPx(p.x), yToPx(p.y), 3, c.dark ? '#59677c' : '#c7c2b5');
    for (const p of train) dot(ctx, xToPx(p.x), yToPx(p.y), 3.4, c.accent2);

    // Curva ajustada (recortada al área visible)
    ctx.save();
    ctx.beginPath();
    ctx.rect(xToPx(-3.4), 18, xToPx(3.4) - xToPx(-3.4), H - 46);
    ctx.clip();
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= 280; i++) {
      const x = -3.4 + (i / 280) * 6.8;
      const y = evalAt(x);
      if (!Number.isFinite(y) || Math.abs(y) > 12) {
        started = false;
        continue;
      }
      const px = xToPx(x);
      const py = yToPx(y);
      if (!started) {
        ctx.moveTo(px, py);
        started = true;
      } else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = c.accent;
    ctx.lineWidth = 2.1;
    ctx.stroke();
    ctx.restore();

    const trainMse = meanSquaredError(train.map((p) => p.x), train.map((p) => p.y), coef);
    const testMse = meanSquaredError(test.map((p) => p.x), test.map((p) => p.y), coef);
    trainOut.textContent = trainMse.toFixed(3);
    testOut.textContent = testMse.toFixed(3);

    let diag = 'Equilibrado';
    if (trainMse > 0.16 && testMse > 0.16) diag = 'Subajuste';
    else if (testMse > 0.1 && testMse > trainMse * 1.9) diag = 'Sobreajuste';
    else if (trainMse > 0.1) diag = 'Subajuste';
    diagOut.textContent = diag;
    diagOut.style.color = diag === 'Sobreajuste' ? c.danger : diag === 'Subajuste' ? c.gold : c.green;

    text(ctx, `grado ${d}`, 46, 24, c.muted, 11, 'left', '600');
    text(ctx, 'train', W - 88, 24, c.accent2, 10, 'left', '600');
    text(ctx, 'test', W - 46, 24, c.dark ? '#8b98aa' : '#9a9587', 10, 'left', '600');
  }

  degree.addEventListener('input', () => {
    degreeOut.textContent = degree.value;
    refit();
  });
  noise.addEventListener('input', () => {
    noiseOut.textContent = Number(noise.value).toFixed(2);
    generate();
  });
  newBtn.addEventListener('click', () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    generate();
  });
  optBtn.addEventListener('click', () => {
    let best = 1;
    let bestErr = Infinity;
    for (let d = 1; d <= 12; d++) {
      const cf = polyfit(train.map((p) => p.x), train.map((p) => p.y), d);
      const err = meanSquaredError(test.map((p) => p.x), test.map((p) => p.y), cf);
      if (err < bestErr) {
        bestErr = err;
        best = d;
      }
    }
    degree.value = String(best);
    degreeOut.textContent = String(best);
    refit();
  });

  degreeOut.textContent = degree.value;
  noiseOut.textContent = Number(noise.value).toFixed(2);
  generate();
  new MutationObserver(draw).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}
