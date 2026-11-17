import { H, W, clear, colors, dot, gaussian, line, mulberry32, setupCanvas, text } from './util';

type P = { x: number; y: number; label: number };
type Model = { wx: number; wy: number; b: number };

const PAD = 30;
const SIZE = 300;
const OX = (W - SIZE) / 2;
const OY = H - PAD;

const xToPx = (x: number) => OX + x * SIZE;
const yToPx = (y: number) => OY - y * SIZE;

export function initMargin(root: ParentNode = document) {
  const canvas = root.querySelector<HTMLCanvasElement>('#svCanvas');
  if (!canvas || canvas.dataset.ready) return;
  canvas.dataset.ready = '1';

  const ctx = setupCanvas(canvas);
  const cInput = root.querySelector<HTMLInputElement>('#svC')!;
  const cOut = root.querySelector<HTMLOutputElement>('#svCOut')!;
  const resetBtn = root.querySelector<HTMLButtonElement>('#svReset')!;
  const marginOut = root.querySelector<HTMLElement>('#svMargin')!;
  const svOut = root.querySelector<HTMLElement>('#svSV')!;
  const errOut = root.querySelector<HTMLElement>('#svErr')!;

  let points: P[] = [];
  let model: Model = { wx: 1, wy: -1, b: 0 };

  const currentC = () => Math.pow(10, Number(cInput.value));

  function generate() {
    const rand = mulberry32(19);
    points = [];
    const clusters: Array<{ cx: number; cy: number; label: number }> = [
      { cx: 0.34, cy: 0.4, label: -1 },
      { cx: 0.66, cy: 0.6, label: 1 }
    ];
    for (const c of clusters) {
      for (let i = 0; i < 45; i++) {
        points.push({
          x: Math.max(0.03, Math.min(0.97, c.cx + gaussian(rand) * 0.19)),
          y: Math.max(0.03, Math.min(0.97, c.cy + gaussian(rand) * 0.19)),
          label: c.label
        });
      }
    }
  }

  /**
   * SVM lineal de margen suave por descenso de subgradiente sobre
   *   L(w,b) = ½‖w‖² + C · (1/n) Σ max(0, 1 − y(wᵀx+b))
   * con λ = 1/C para que el término de datos no dependa de n.
   */
  function train() {
    const C = currentC();
    const lambda = 1 / C;
    const n = points.length;
    let wx = 0;
    let wy = 0;
    let b = 0;
    const eta = 0.5;
    const iters = 2600;
    for (let it = 0; it < iters; it++) {
      let gx = lambda * wx;
      let gy = lambda * wy;
      let gb = 0;
      for (const p of points) {
        const f = wx * p.x + wy * p.y + b;
        if (p.label * f < 1) {
          gx -= (p.label * p.x) / n;
          gy -= (p.label * p.y) / n;
          gb -= p.label / n;
        }
      }
      wx -= eta * gx;
      wy -= eta * gy;
      b -= eta * gb;
    }
    model = { wx, wy, b };
  }

  function draw() {
    const c = colors();
    clear(ctx, W, H, c.bg);
    for (let g = 0; g <= 1; g += 0.25) {
      line(ctx, xToPx(g), yToPx(0), xToPx(g), yToPx(1), c.grid, 1);
      line(ctx, xToPx(0), yToPx(g), xToPx(1), yToPx(g), c.grid, 1);
    }

    const { wx, wy, b } = model;
    const norm = Math.hypot(wx, wy);

    if (norm > 1e-6) {
      const nx = wx / norm;
      const ny = wy / norm;
      const cx = (-b * wx) / (norm * norm);
      const cy = (-b * wy) / (norm * norm);
      const half = 1 / norm;
      const dx = -ny;
      const dy = nx;
      const ext = 1.1;

      const p1 = { x: cx + dx * ext + nx * half, y: cy + dy * ext + ny * half };
      const p2 = { x: cx - dx * ext + nx * half, y: cy - dy * ext + ny * half };
      const p3 = { x: cx - dx * ext - nx * half, y: cy - dy * ext - ny * half };
      const p4 = { x: cx + dx * ext - nx * half, y: cy + dy * ext - ny * half };

      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = c.accent;
      ctx.beginPath();
      ctx.moveTo(xToPx(p1.x), yToPx(p1.y));
      ctx.lineTo(xToPx(p2.x), yToPx(p2.y));
      ctx.lineTo(xToPx(p3.x), yToPx(p3.y));
      ctx.lineTo(xToPx(p4.x), yToPx(p4.y));
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Frontera
      line(
        ctx,
        xToPx(cx + dx * ext),
        yToPx(cy + dy * ext),
        xToPx(cx - dx * ext),
        yToPx(cy - dy * ext),
        c.accent,
        2.4
      );
      // Líneas de margen
      for (const s of [1, -1]) {
        line(
          ctx,
          xToPx(cx + dx * ext + nx * half * s),
          yToPx(cy + dy * ext + ny * half * s),
          xToPx(cx - dx * ext + nx * half * s),
          yToPx(cy - dy * ext + ny * half * s),
          c.axis,
          1.4,
          [5, 4]
        );
      }
    }

    let sv = 0;
    let errors = 0;
    for (const p of points) {
      const f = wx * p.x + wy * p.y + b;
      const margin = p.label * f;
      if (margin <= 1.02) sv++;
      if (margin < 0) errors++;
      const col = p.label > 0 ? c.accent2 : c.danger;
      dot(ctx, xToPx(p.x), yToPx(p.y), 3.6, col, margin <= 1.02 ? c.gold : '');
    }

    marginOut.textContent = norm > 1e-6 ? (2 / norm).toFixed(2) : '—';
    svOut.textContent = String(sv);
    errOut.textContent = String(errors);

    text(ctx, `C = ${formatC(currentC())}`, 16, 18, c.muted, 11, 'left', '600');
    text(ctx, 'banda = margen 2/‖w‖', W - 16, 18, c.muted, 10.5, 'right');
    text(ctx, 'x₁', W - 18, yToPx(0) - 10, c.muted, 10, 'center');
    text(ctx, 'x₂', xToPx(0) - 10, 32, c.muted, 10, 'center');
  }

  function formatC(value: number) {
    return value < 10 ? value.toFixed(2) : value.toFixed(0);
  }

  function apply() {
    cOut.textContent = formatC(currentC());
    train();
    draw();
  }

  cInput.addEventListener('input', apply);
  resetBtn.addEventListener('click', () => {
    generate();
    apply();
  });

  generate();
  apply();
  new MutationObserver(draw).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}
