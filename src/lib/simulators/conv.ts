import { clear, colors, setupCanvas, text } from './util';

const KERNELS: Record<string, { name: string; k: number[][] }> = {
  edge: { name: 'Bordes (Laplaciano)', k: [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]] },
  sobel: { name: 'Sobel vertical', k: [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]] },
  blur: { name: 'Desenfoque', k: [[1 / 9, 1 / 9, 1 / 9], [1 / 9, 1 / 9, 1 / 9], [1 / 9, 1 / 9, 1 / 9]] },
  sharpen: { name: 'Realce', k: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]] },
  emboss: { name: 'Relieve', k: [[-2, -1, 0], [-1, 1, 1], [0, 1, 2]] }
};

export function initConvolution(root: ParentNode = document) {
  const canvas = root.querySelector<HTMLCanvasElement>('#convCanvas');
  if (!canvas || canvas.dataset.ready) return;
  canvas.dataset.ready = '1';

  const ctx = setupCanvas(canvas, 560, 360);
  const select = root.querySelector<HTMLSelectElement>('#convKernel')!;
  const absChk = root.querySelector<HTMLInputElement>('#convAbs')!;
  const statsOut = root.querySelector<HTMLElement>('#convStats')!;

  const N = 12;
  const image: number[][] = [];
  for (let y = 0; y < N; y++) {
    const row: number[] = [];
    for (let x = 0; x < N; x++) {
      let v = 0.08 + ((x * 7 + y * 13) % 5) * 0.012;
      if (y === 2 && x >= 3 && x <= 9) v = 0.92;
      if (x === 9 && y > 2 && y <= 5) v = 0.85;
      if (x + y === 13 && y > 4) v = 0.8;
      row.push(v);
    }
    image.push(row);
  }

  function convolve(kernel: number[][]) {
    const out: number[][] = [];
    for (let y = 0; y <= N - 3; y++) {
      const row: number[] = [];
      for (let x = 0; x <= N - 3; x++) {
        let s = 0;
        for (let ky = 0; ky < 3; ky++) {
          for (let kx = 0; kx < 3; kx++) s += image[y + ky][x + kx] * kernel[ky][kx];
        }
        row.push(s);
      }
      out.push(row);
    }
    return out;
  }

  function draw() {
    const c = colors();
    const spec = KERNELS[select.value] ?? KERNELS.edge;
    const out = convolve(spec.k);
    const flat = out.flat();
    let min = Math.min(...flat);
    let max = Math.max(...flat);
    if (absChk.checked) {
      min = Math.min(...flat.map(Math.abs));
      max = Math.max(...flat.map(Math.abs));
    }
    const cell = 17;
    const inX = 24;
    const inY = 76;
    const outX = 330;
    const outY = 93;
    clear(ctx, 560, 360, c.bg);

    text(ctx, 'Entrada 12×12', inX, 34, c.muted, 10.5, 'left', '700');
    text(ctx, 'Mapa de activación 10×10', outX, 34, c.muted, 10.5, 'left', '700');
    text(ctx, spec.name, 258, 330, c.muted, 10.5, 'center');
    text(ctx, 'kernel 3×3', 208, 34, c.muted, 9.5, 'center', '700');

    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const g = Math.round(image[y][x] * 255);
        ctx.fillStyle = `rgb(${g},${g},${g})`;
        ctx.fillRect(inX + x * cell, inY + y * cell, cell - 1, cell - 1);
      }
    }

    for (let y = 0; y < out.length; y++) {
      for (let x = 0; x < out[y].length; x++) {
        let v = out[y][x];
        if (absChk.checked) v = Math.abs(v);
        const norm = max > min ? (v - (absChk.checked ? min : min)) / (max - min || 1) : 0.5;
        const g = Math.round(Math.max(0, Math.min(1, norm)) * 255);
        ctx.fillStyle = `rgb(${g},${g},${g})`;
        ctx.fillRect(outX + x * cell, outY + y * cell, cell - 1, cell - 1);
      }
    }

    // kernel
    const kx = 258;
    const ky = 50;
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        const v = spec.k[j][i];
        const shade = v > 0 ? 'rgba(14,124,107,.22)' : v < 0 ? 'rgba(180,35,24,.18)' : 'rgba(140,140,140,.12)';
        ctx.fillStyle = shade;
        ctx.fillRect(kx + i * 26, ky + j * 24, 24, 22);
        ctx.strokeStyle = c.dark ? '#2b3a4f' : '#ddd8ca';
        ctx.strokeRect(kx + i * 26, ky + j * 24, 24, 22);
        text(ctx, Number.isInteger(v) ? String(v) : v.toFixed(2), kx + i * 26 + 12, ky + j * 24 + 11, c.ink, 9.5, 'center');
      }
    }

    statsOut.textContent = `min ${min.toFixed(2)} · max ${max.toFixed(2)} · media ${(flat.reduce((a, b) => a + b, 0) / flat.length).toFixed(2)}`;
  }

  select.addEventListener('change', draw);
  absChk.addEventListener('change', draw);
  draw();
  new MutationObserver(draw).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}
