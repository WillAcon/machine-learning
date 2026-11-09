import { H, W, clear, colors, dot, line, setupCanvas, text } from './util';

type Point = { x: number; y: number };

export function initLinearRegression(root: ParentNode = document) {
  const canvas = root.querySelector<HTMLCanvasElement>('#lrCanvas');
  if (!canvas || canvas.dataset.ready) return;
  canvas.dataset.ready = '1';

  const ctx = setupCanvas(canvas);
  const residChk = root.querySelector<HTMLInputElement>('#lrResid')!;
  const squaresChk = root.querySelector<HTMLInputElement>('#lrSquares')!;
  const resetBtn = root.querySelector<HTMLButtonElement>('#lrReset')!;
  const outlierBtn = root.querySelector<HTMLButtonElement>('#lrOutlier')!;
  const eqOut = root.querySelector<HTMLElement>('#lrEq')!;
  const r2Out = root.querySelector<HTMLElement>('#lrR2')!;
  const nOut = root.querySelector<HTMLElement>('#lrN')!;

  const initial: Point[] = [
    { x: 1.2, y: 2.1 },
    { x: 2.0, y: 3.2 },
    { x: 2.8, y: 3.0 },
    { x: 3.6, y: 4.9 },
    { x: 4.4, y: 5.2 },
    { x: 5.3, y: 5.8 },
    { x: 6.1, y: 7.2 },
    { x: 7.0, y: 6.9 },
    { x: 7.9, y: 8.4 },
    { x: 9.0, y: 9.2 }
  ];
  let points: Point[] = initial.map((p) => ({ ...p }));
  let dragIndex = -1;

  const xToPx = (x: number) => 45 + (x / 10) * (W - 65);
  const yToPx = (y: number) => H - 30 - (y / 10) * (H - 55);
  const pxToX = (px: number) => ((px - 45) / (W - 65)) * 10;
  const pxToY = (py: number) => ((H - 30 - py) / (H - 55)) * 10;

  function fit() {
    const n = points.length;
    const mx = points.reduce((s, p) => s + p.x, 0) / n;
    const my = points.reduce((s, p) => s + p.y, 0) / n;
    let sxx = 0;
    let sxy = 0;
    for (const p of points) {
      sxx += (p.x - mx) ** 2;
      sxy += (p.x - mx) * (p.y - my);
    }
    const a = sxx === 0 ? 0 : sxy / sxx;
    const b = my - a * mx;
    let ssRes = 0;
    let ssTot = 0;
    for (const p of points) {
      const pred = a * p.x + b;
      ssRes += (p.y - pred) ** 2;
      ssTot += (p.y - my) ** 2;
    }
    const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot;
    return { a, b, r2 };
  }

  function draw() {
    const c = colors();
    const { a, b, r2 } = fit();
    clear(ctx, W, H, c.bg);

    for (let g = 0; g <= 10; g++) {
      line(ctx, xToPx(g), yToPx(0), xToPx(g), yToPx(10), c.grid, 1);
      line(ctx, xToPx(0), yToPx(g), xToPx(10), yToPx(g), c.grid, 1);
    }
    line(ctx, xToPx(0), yToPx(0), xToPx(10), yToPx(0), c.axis, 1.4);
    line(ctx, xToPx(0), yToPx(0), xToPx(0), yToPx(10), c.axis, 1.4);

    if (squaresChk.checked) {
      for (const p of points) {
        const pred = a * p.x + b;
        const side = Math.abs(yToPx(p.y) - yToPx(pred));
        const left = xToPx(p.x) - side / 2;
        const top = Math.min(yToPx(p.y), yToPx(pred));
        ctx.fillStyle = 'rgba(168,106,18,.12)';
        ctx.strokeStyle = 'rgba(168,106,18,.5)';
        ctx.lineWidth = 1;
        ctx.fillRect(left, top, side, side);
        ctx.strokeRect(left, top, side, side);
      }
    }

    if (residChk.checked) {
      for (const p of points) {
        const pred = a * p.x + b;
        line(ctx, xToPx(p.x), yToPx(p.y), xToPx(p.x), yToPx(pred), c.gold, 1.2, [4, 3]);
      }
    }

    const x1 = 0;
    const x2 = 10;
    line(ctx, xToPx(x1), yToPx(a * x1 + b), xToPx(x2), yToPx(a * x2 + b), c.accent, 2.4);
    for (const p of points) dot(ctx, xToPx(p.x), yToPx(p.y), 5, c.accent2, c.bg);
    dot(ctx, xToPx(points[0].x), yToPx(points[0].y), 5, c.accent2, c.bg);

    eqOut.textContent = `${a.toFixed(2)}x ${b >= 0 ? '+' : '−'} ${Math.abs(b).toFixed(2)}`;
    r2Out.textContent = r2.toFixed(3);
    nOut.textContent = String(points.length);

    text(ctx, 'x', W - 24, yToPx(0) + 14, c.muted, 11, 'center');
    text(ctx, 'y', xToPx(0) - 14, 26, c.muted, 11, 'center');
    text(ctx, 'Arrastra los puntos · doble clic para añadir', 48, 20, c.muted, 10.5);
  }

  function eventPos(ev: PointerEvent | MouseEvent) {
    const rect = canvas!.getBoundingClientRect();
    return {
      px: ((ev.clientX - rect.left) / rect.width) * W,
      py: ((ev.clientY - rect.top) / rect.height) * H
    };
  }

  canvas.addEventListener('pointerdown', (ev) => {
    const { px, py } = eventPos(ev);
    let best = -1;
    let bestD = 16;
    points.forEach((p, i) => {
      const d = Math.hypot(xToPx(p.x) - px, yToPx(p.y) - py);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    if (best >= 0) {
      dragIndex = best;
      canvas.setPointerCapture(ev.pointerId);
      canvas.style.cursor = 'grabbing';
    }
  });

  canvas.addEventListener('pointermove', (ev) => {
    if (dragIndex < 0) {
      canvas.style.cursor = 'grab';
      return;
    }
    const { px, py } = eventPos(ev);
    points[dragIndex] = {
      x: Math.min(10, Math.max(0, pxToX(px))),
      y: Math.min(10, Math.max(0, pxToY(py)))
    };
    draw();
  });

  canvas.addEventListener('pointerup', () => {
    dragIndex = -1;
    canvas.style.cursor = 'grab';
  });

  canvas.addEventListener('dblclick', (ev) => {
    const { px, py } = eventPos(ev);
    points.push({
      x: Math.min(10, Math.max(0, pxToX(px))),
      y: Math.min(10, Math.max(0, pxToY(py)))
    });
    draw();
  });

  residChk.addEventListener('change', draw);
  squaresChk.addEventListener('change', draw);
  resetBtn.addEventListener('click', () => {
    points = initial.map((p) => ({ ...p }));
    draw();
  });
  outlierBtn.addEventListener('click', () => {
    points.push({ x: 9.4, y: 2.2 });
    draw();
  });

  draw();
  new MutationObserver(draw).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}
