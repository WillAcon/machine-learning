import { H, W, clear, colors, dot, gaussian, line, mulberry32, setupCanvas, text } from './util';

type P = { x: number; y: number; label: number };

export function initNeuralNetwork(root: ParentNode = document) {
  const canvas = root.querySelector<HTMLCanvasElement>('#nnCanvas');
  if (!canvas || canvas.dataset.ready) return;
  canvas.dataset.ready = '1';

  const ctx = setupCanvas(canvas);
  const lrInput = root.querySelector<HTMLInputElement>('#nnLr')!;
  const lrOut = root.querySelector<HTMLOutputElement>('#nnLrOut')!;
  const hiddenInput = root.querySelector<HTMLInputElement>('#nnHidden')!;
  const hiddenOut = root.querySelector<HTMLOutputElement>('#nnHiddenOut')!;
  const trainBtn = root.querySelector<HTMLButtonElement>('#nnTrain')!;
  const resetBtn = root.querySelector<HTMLButtonElement>('#nnReset')!;
  const lossOut = root.querySelector<HTMLElement>('#nnLoss')!;
  const accOut = root.querySelector<HTMLElement>('#nnAcc')!;

  let points: P[] = [];
  let W1: number[][] = [];
  let b1: number[] = [];
  let W2: number[] = [];
  let b2 = 0;
  let seed = 19;

  const xToPx = (x: number) => 32 + x * (W - 52);
  const yToPx = (y: number) => H - 24 - y * (H - 44);

  function initWeights() {
    const rand = mulberry32(seed);
    const h = Number(hiddenInput.value);
    W1 = Array.from({ length: h }, () => [gaussian(rand) * 0.9, gaussian(rand) * 0.9]);
    b1 = Array.from({ length: h }, () => gaussian(rand) * 0.3);
    W2 = Array.from({ length: h }, () => gaussian(rand) * 0.9);
    b2 = gaussian(rand) * 0.3;
  }

  function generate() {
    const rand = mulberry32(seed + 7);
    points = [];
    for (let i = 0; i < 100; i++) {
      const label = i < 50 ? 0 : 1;
      const t = rand() * Math.PI;
      if (label === 0) {
        points.push({
          x: 0.5 + 0.29 * Math.cos(t) + gaussian(rand) * 0.045,
          y: 0.34 + 0.29 * Math.sin(t) + gaussian(rand) * 0.045,
          label
        });
      } else {
        points.push({
          x: 0.5 - 0.29 * Math.cos(t) + gaussian(rand) * 0.045,
          y: 0.66 - 0.29 * Math.sin(t) + gaussian(rand) * 0.045,
          label
        });
      }
    }
    initWeights();
    draw();
  }

  function forward(x: number, y: number) {
    const h = W1.length;
    const hidden = new Array(h);
    for (let j = 0; j < h; j++) hidden[j] = Math.tanh(W1[j][0] * x + W1[j][1] * y + b1[j]);
    let z = b2;
    for (let j = 0; j < h; j++) z += W2[j] * hidden[j];
    return { hidden, out: 1 / (1 + Math.exp(-z)) };
  }

  function lossAndAcc() {
    let loss = 0;
    let correct = 0;
    for (const p of points) {
      const { out } = forward(p.x, p.y);
      const eps = 1e-9;
      loss += -(p.label * Math.log(out + eps) + (1 - p.label) * Math.log(1 - out + eps));
      if ((out >= 0.5 ? 1 : 0) === p.label) correct++;
    }
    return { loss: loss / points.length, acc: correct / points.length };
  }

  function train(epochs: number) {
    const lr = Number(lrInput.value);
    const h = W1.length;
    for (let epoch = 0; epoch < epochs; epoch++) {
      const gradW1 = Array.from({ length: h }, () => [0, 0]);
      const gradB1 = new Array(h).fill(0);
      const gradW2 = new Array(h).fill(0);
      let gradB2 = 0;
      for (const p of points) {
        const { hidden, out } = forward(p.x, p.y);
        const dz2 = out - p.label;
        for (let j = 0; j < h; j++) {
          gradW2[j] += dz2 * hidden[j];
          const dh = dz2 * W2[j] * (1 - hidden[j] * hidden[j]);
          gradW1[j][0] += dh * p.x;
          gradW1[j][1] += dh * p.y;
          gradB1[j] += dh;
        }
        gradB2 += dz2;
      }
      const n = points.length;
      for (let j = 0; j < h; j++) {
        W2[j] -= (lr * gradW2[j]) / n;
        W1[j][0] -= (lr * gradW1[j][0]) / n;
        W1[j][1] -= (lr * gradW1[j][1]) / n;
        b1[j] -= (lr * gradB1[j]) / n;
      }
      b2 -= (lr * gradB2) / n;
    }
    draw();
  }

  function draw() {
    const c = colors();
    clear(ctx, W, H, c.bg);
    const cell = 7;
    for (let py = 22; py < H - 16; py += cell) {
      for (let px = 30; px < W - 12; px += cell) {
        const x = (px - 32) / (W - 52);
        const y = (H - 24 - py) / (H - 44);
        const { out } = forward(x, y);
        const alpha = Math.abs(out - 0.5) * 0.65;
        ctx.fillStyle =
          out >= 0.5
            ? c.dark
              ? `rgba(14,124,107,${0.12 + alpha * 0.35})`
              : `rgba(14,124,107,${0.05 + alpha * 0.2})`
            : c.dark
              ? `rgba(51,85,200,${0.12 + alpha * 0.35})`
              : `rgba(51,85,200,${0.05 + alpha * 0.2})`;
        ctx.fillRect(px, py, cell, cell);
      }
    }
    for (const p of points) {
      dot(ctx, xToPx(p.x), yToPx(p.y), 3.6, p.label === 0 ? '#3355c8' : '#0e7c6b', c.bg);
    }
    line(ctx, xToPx(0), yToPx(0), xToPx(1), yToPx(0), c.axis, 1);
    line(ctx, xToPx(0), yToPx(0), xToPx(0), yToPx(1), c.axis, 1);
    const { loss, acc } = lossAndAcc();
    lossOut.textContent = loss.toFixed(4);
    accOut.textContent = (acc * 100).toFixed(1) + '%';
    text(ctx, `2 → ${W1.length} → 1 · tanh/sigmoid`, 36, 20, c.muted, 10.5);
  }

  lrInput.addEventListener('input', () => {
    lrOut.textContent = Number(lrInput.value).toFixed(2);
  });
  hiddenInput.addEventListener('input', () => {
    hiddenOut.textContent = hiddenInput.value;
    initWeights();
    draw();
  });
  trainBtn.addEventListener('click', () => train(400));
  resetBtn.addEventListener('click', () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    generate();
  });

  lrOut.textContent = Number(lrInput.value).toFixed(2);
  hiddenOut.textContent = hiddenInput.value;
  generate();
  new MutationObserver(draw).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}
