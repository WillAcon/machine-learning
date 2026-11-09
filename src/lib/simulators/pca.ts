import { H, W, clear, colors, dot, gaussian, line, mulberry32, setupCanvas, text } from './util';

type P = { x: number; y: number };

export function initPCA(root: ParentNode = document) {
  const canvas = root.querySelector<HTMLCanvasElement>('#pcaCanvas');
  if (!canvas || canvas.dataset.ready) return;
  canvas.dataset.ready = '1';

  const ctx = setupCanvas(canvas);
  const angleInput = root.querySelector<HTMLInputElement>('#pcaAngle')!;
  const angleOut = root.querySelector<HTMLOutputElement>('#pcaAngleOut')!;
  const principalBtn = root.querySelector<HTMLButtonElement>('#pcaPrincipal')!;
  const resetBtn = root.querySelector<HTMLButtonElement>('#pcaReset')!;
  const varOut = root.querySelector<HTMLElement>('#pcaVar')!;
  const totalOut = root.querySelector<HTMLElement>('#pcaTotal')!;

  let points: P[] = [];
  let principalAngle = 0;
  let seed = 31;

  const cx = W / 2;
  const cy = H / 2 + 4;
  const scale = 72;
  const toPx = (p: P) => ({ x: cx + p.x * scale, y: cy - p.y * scale });

  function generate() {
    const rand = mulberry32(seed);
    points = [];
    for (let i = 0; i < 110; i++) {
      const x = gaussian(rand);
      const y = 0.8 * x + gaussian(rand) * 0.55;
      points.push({ x, y });
    }
    const mx = points.reduce((s, p) => s + p.x, 0) / points.length;
    const my = points.reduce((s, p) => s + p.y, 0) / points.length;
    points = points.map((p) => ({ x: p.x - mx, y: p.y - my }));
    let sxx = 0;
    let syy = 0;
    let sxy = 0;
    for (const p of points) {
      sxx += p.x * p.x;
      syy += p.y * p.y;
      sxy += p.x * p.y;
    }
    const theta = 0.5 * Math.atan2(2 * sxy, sxx - syy);
    principalAngle = (theta * 180) / Math.PI;
    if (principalAngle < 0) principalAngle += 180;
    angleInput.value = String(Math.round(principalAngle));
    angleOut.textContent = String(Math.round(principalAngle));
    draw();
  }

  function varianceAlong(angleDeg: number) {
    const a = (angleDeg * Math.PI) / 180;
    const ux = Math.cos(a);
    const uy = Math.sin(a);
    let s = 0;
    for (const p of points) {
      const proj = p.x * ux + p.y * uy;
      s += proj * proj;
    }
    return s / points.length;
  }

  function totalVariance() {
    return points.reduce((s, p) => s + p.x * p.x + p.y * p.y, 0) / points.length;
  }

  function draw() {
    const c = colors();
    clear(ctx, W, H, c.bg);
    line(ctx, 20, cy, W - 20, cy, c.grid, 1.2);
    line(ctx, cx, 18, cx, H - 18, c.grid, 1.2);

    const angle = Number(angleInput.value);
    const a = (angle * Math.PI) / 180;
    const ux = Math.cos(a);
    const uy = Math.sin(a);
    const L = 250;
    line(ctx, cx - ux * L, cy + uy * L, cx + ux * L, cy - uy * L, c.gold, 1.6, [6, 4]);

    for (const p of points) {
      const proj = p.x * ux + p.y * uy;
      const qx = proj * ux;
      const qy = proj * uy;
      const A = toPx(p);
      const B = toPx({ x: qx, y: qy });
      line(ctx, A.x, A.y, B.x, B.y, c.dark ? '#39485d' : '#e3dfd2', 1);
      dot(ctx, B.x, B.y, 2.3, c.danger);
    }
    for (const p of points) {
      const A = toPx(p);
      dot(ctx, A.x, A.y, 3.6, c.accent, c.bg);
    }

    const v = varianceAlong(angle);
    const total = totalVariance();
    varOut.textContent = `${((v / total) * 100).toFixed(1)}%`;
    totalOut.textContent = total.toFixed(2);
    text(ctx, `θ = ${angle}°`, 24, 22, c.muted, 11, 'left', '600');
    text(ctx, 'componente 1', 24, 40, c.gold, 10.5);
    text(ctx, 'datos centrados', W - 24, H - 14, c.muted, 10, 'right');
  }

  angleInput.addEventListener('input', () => {
    angleOut.textContent = angleInput.value;
    draw();
  });
  principalBtn.addEventListener('click', () => {
    angleInput.value = String(Math.round(principalAngle));
    angleOut.textContent = String(Math.round(principalAngle));
    draw();
  });
  resetBtn.addEventListener('click', () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    generate();
  });

  generate();
  new MutationObserver(draw).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}
