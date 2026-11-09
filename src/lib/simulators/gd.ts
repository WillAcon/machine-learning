import { H, W, clear, colors, dot, line, setupCanvas, text } from './util';

type FnSpec = {
  f: (x: number) => number;
  g: (x: number) => number;
  label: string;
};

const FUNCTIONS: Record<string, FnSpec> = {
  quad: { f: (x) => x * x, g: (x) => 2 * x, label: 'f(x) = x²' },
  shift: { f: (x) => (x - 2) ** 2 + 1, g: (x) => 2 * (x - 2), label: 'f(x) = (x−2)² + 1' },
  quartic: {
    f: (x) => 0.25 * x ** 4 - x ** 2 + 2,
    g: (x) => x ** 3 - 2 * x,
    label: 'f(x) = 0.25x⁴ − x² + 2'
  }
};

export function initGradientDescent(root: ParentNode = document) {
  const canvas = root.querySelector<HTMLCanvasElement>('#gdCanvas');
  if (!canvas || canvas.dataset.ready) return;
  canvas.dataset.ready = '1';

  const ctx = setupCanvas(canvas);
  const lr = root.querySelector<HTMLInputElement>('#gdLr')!;
  const lrOut = root.querySelector<HTMLOutputElement>('#gdLrOut')!;
  const fnSel = root.querySelector<HTMLSelectElement>('#gdFn')!;
  const stepBtn = root.querySelector<HTMLButtonElement>('#gdStep')!;
  const runBtn = root.querySelector<HTMLButtonElement>('#gdRun')!;
  const resetBtn = root.querySelector<HTMLButtonElement>('#gdReset')!;
  const xOut = root.querySelector<HTMLElement>('#gdX')!;
  const fOut = root.querySelector<HTMLElement>('#gdF')!;
  const gOut = root.querySelector<HTMLElement>('#gdG')!;
  const iOut = root.querySelector<HTMLElement>('#gdI')!;

  let x = 4;
  let iter = 0;
  let trail: number[] = [x];
  let timer: number | null = null;

  const toPx = (xv: number) => 40 + ((xv + 5) / 10) * (W - 70);
  const toPy = (yv: number, fmax: number) => H - 42 - (yv / fmax) * (H - 78);

  function spec() {
    return FUNCTIONS[fnSel.value] ?? FUNCTIONS.quad;
  }

  function yMax() {
    const s = spec();
    let m = 0;
    for (let i = -5; i <= 5; i += 0.1) m = Math.max(m, s.f(i));
    return m * 1.1;
  }

  function draw() {
    const c = colors();
    const s = spec();
    const fmax = yMax();
    clear(ctx, W, H, c.bg);
    // rejilla
    for (let gx = -5; gx <= 5; gx += 1) {
      line(ctx, toPx(gx), toPy(0, fmax), toPx(gx), toPy(fmax, fmax), c.grid, 1);
    }
    for (let gy = 0; gy <= fmax; gy += fmax / 6) {
      line(ctx, toPx(-5), toPy(gy, fmax), toPx(5), toPy(gy, fmax), c.grid, 1);
    }
    line(ctx, toPx(-5), toPy(0, fmax), toPx(5), toPy(0, fmax), c.axis, 1.4);
    line(ctx, toPx(0), toPy(0, fmax), toPx(0), toPy(fmax, fmax), c.axis, 1);

    // curva
    ctx.beginPath();
    for (let px = 0; px <= W; px++) {
      const xv = ((px - 40) / (W - 70)) * 10 - 5;
      const py = toPy(s.f(xv), fmax);
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = c.accent;
    ctx.lineWidth = 2.2;
    ctx.stroke();

    // rastro
    for (let i = 0; i < trail.length; i++) {
      dot(ctx, toPx(trail[i]), toPy(s.f(trail[i]), fmax), i === trail.length - 1 ? 7 : 3, i === trail.length - 1 ? c.danger : 'rgba(180,35,24,.28)');
    }

    // tangente
    const slope = s.g(x);
    const y0 = s.f(x);
    const dx = 1.1;
    line(
      ctx,
      toPx(x - dx),
      toPy(y0 - slope * dx, fmax),
      toPx(x + dx),
      toPy(y0 + slope * dx, fmax),
      c.gold,
      1.6,
      [5, 4]
    );

    dot(ctx, toPx(x), toPy(y0, fmax), 7.5, c.danger, c.bg);
    text(ctx, 'x', toPx(x), toPy(y0, fmax) - 18, c.ink, 12, 'center', '700');
    text(ctx, s.label, 46, 22, c.muted, 11);

    xOut.textContent = x.toFixed(2);
    fOut.textContent = s.f(x).toFixed(2);
    gOut.textContent = s.g(x).toFixed(2);
    iOut.textContent = String(iter);
  }

  function step() {
    const s = spec();
    const eta = Number(lr.value);
    x = x - eta * s.g(x);
    iter++;
    if (Math.abs(x) > 12 || !Number.isFinite(x)) {
      x = Math.sign(x) * 12 || 12;
      stop();
    }
    trail.push(x);
    if (trail.length > 40) trail.shift();
    draw();
  }

  function stop() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
    runBtn.textContent = 'Ejecutar';
  }

  function reset() {
    stop();
    x = 4;
    iter = 0;
    trail = [x];
    draw();
  }

  lr.addEventListener('input', () => {
    lrOut.textContent = Number(lr.value).toFixed(2);
  });
  fnSel.addEventListener('change', reset);
  stepBtn.addEventListener('click', step);
  resetBtn.addEventListener('click', reset);
  runBtn.addEventListener('click', () => {
    if (timer !== null) {
      stop();
      return;
    }
    runBtn.textContent = 'Pausar';
    timer = window.setInterval(step, 340);
  });

  lrOut.textContent = Number(lr.value).toFixed(2);
  draw();
  new MutationObserver(draw).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}
