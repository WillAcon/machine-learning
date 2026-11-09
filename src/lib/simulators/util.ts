export const W = 560;
export const H = 360;

export type CanvasCtx = CanvasRenderingContext2D;

export function setupCanvas(canvas: HTMLCanvasElement, w = W, h = H): CanvasCtx {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = '100%';
  canvas.style.height = 'auto';
  canvas.style.aspectRatio = `${w} / ${h}`;
  const ctx = canvas.getContext('2d')!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

export function colors() {
  const dark = document.documentElement.dataset.theme === 'dark';
  return {
    dark,
    bg: dark ? '#121a26' : '#ffffff',
    grid: dark ? '#223047' : '#eeece4',
    axis: dark ? '#54657d' : '#b9b4a8',
    ink: dark ? '#e6ecf5' : '#1b2430',
    muted: dark ? '#93a1b5' : '#85909d',
    accent: '#3355c8',
    accent2: '#0e7c6b',
    gold: '#a86a12',
    danger: '#b42318',
    green: '#157347',
    violet: '#6b3fa0',
    surface: dark ? '#182231' : '#fbfaf6'
  };
}

export function clear(ctx: CanvasCtx, w = W, h = H, bg?: string) {
  ctx.clearRect(0, 0, w, h);
  if (bg) {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
  }
}

export function line(
  ctx: CanvasCtx,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  width = 1,
  dash: number[] = []
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

export function dot(ctx: CanvasCtx, x: number, y: number, r: number, fill: string, stroke = '') {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }
}

export function text(
  ctx: CanvasCtx,
  str: string,
  x: number,
  y: number,
  color: string,
  size = 11,
  align: CanvasTextAlign = 'left',
  weight = '400'
) {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px Inter, system-ui, sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillText(str, x, y);
}

/** Resuelve un sistema lineal A x = b por eliminación gaussiana con pivoteo. */
export function solve(A: number[][], b: number[]): number[] {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r;
    }
    if (Math.abs(M[pivot][col]) < 1e-12) return new Array(n).fill(0);
    [M[col], M[pivot]] = [M[pivot], M[col]];
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = M[r][col] / M[col][col];
      for (let c = col; c <= n; c++) M[r][c] -= f * M[col][c];
    }
  }
  return M.map((row, i) => row[n] / row[i]);
}

/** Ajuste polinómico por mínimos cuadrados con escalado interno de x. */
export function polyfit(xs: number[], ys: number[], degree: number): number[] {
  const scale = Math.max(1e-9, ...xs.map(Math.abs));
  const zs = xs.map((x) => x / scale);
  const n = degree + 1;
  const A = Array.from({ length: n }, () => new Array(n).fill(0));
  const b = new Array(n).fill(0);
  for (let i = 0; i < zs.length; i++) {
    const pows = new Array(n);
    pows[0] = 1;
    for (let j = 1; j < n; j++) pows[j] = pows[j - 1] * zs[i];
    for (let r = 0; r < n; r++) {
      b[r] += pows[r] * ys[i];
      for (let c = 0; c < n; c++) A[r][c] += pows[r] * pows[c];
    }
  }
  // Pequeña regularización de Tikhonov para grados altos.
  const lambda = degree >= 8 ? 1e-6 * degree : 0;
  for (let i = 0; i < n; i++) A[i][i] += lambda;
  return solve(A, b).map((coef, i) => coef / Math.pow(scale, i));
}

export function meanSquaredError(xs: number[], ys: number[], coef: number[]): number {
  let s = 0;
  for (let i = 0; i < xs.length; i++) {
    let p = 0;
    for (let j = coef.length - 1; j >= 0; j--) p = p * xs[i] + coef[j];
    s += (ys[i] - p) ** 2;
  }
  return s / Math.max(1, xs.length);
}

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function gaussian(rand: () => number) {
  let u = 0;
  let v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

export function redrawOnTheme(canvasId: string, cb: () => void) {
  const observer = new MutationObserver(() => cb());
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  void canvasId;
  return observer;
}
