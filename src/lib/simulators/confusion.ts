import { clear, colors, line, setupCanvas, text } from './util';

export function initConfusion(root: ParentNode = document) {
  const canvas = root.querySelector<HTMLCanvasElement>('#cmCanvas');
  if (!canvas || canvas.dataset.ready) return;
  canvas.dataset.ready = '1';

  const ctx = setupCanvas(canvas, 560, 300);
  const ids = ['cmTP', 'cmFP', 'cmFN', 'cmTN'] as const;
  const inputs = ids.map((id) => root.querySelector<HTMLInputElement>(`#${id}`)!);
  const precOut = root.querySelector<HTMLElement>('#cmPrec')!;
  const recOut = root.querySelector<HTMLElement>('#cmRec')!;
  const f1Out = root.querySelector<HTMLElement>('#cmF1')!;
  const accOut = root.querySelector<HTMLElement>('#cmAcc')!;

  function value(i: number) {
    return Math.max(0, Math.round(Number(inputs[i].value) || 0));
  }

  function draw() {
    const c = colors();
    const [tp, fp, fn, tn] = [value(0), value(1), value(2), value(3)];
    clear(ctx, 560, 300, c.bg);

    const x0 = 158;
    const y0 = 66;
    const cw = 150;
    const ch = 82;

    text(ctx, 'Predicción', x0 + cw, 24, c.muted, 10.5, 'center', '700');
    text(ctx, 'Positivo', x0 + cw / 2, 44, c.muted, 10.5, 'center');
    text(ctx, 'Negativo', x0 + cw + cw / 2, 44, c.muted, 10.5, 'center');
    text(ctx, 'Real', 20, y0 + ch, c.muted, 10.5, 'left', '700');
    text(ctx, 'Positivo', 78, y0 + ch / 2, c.muted, 10.5, 'center');
    text(ctx, 'Negativo', 78, y0 + ch + ch / 2, c.muted, 10.5, 'center');

    const cells = [
      { v: tp, label: 'TP', color: c.green, bg: c.dark ? 'rgba(21,115,71,.22)' : '#e4f5ec' },
      { v: fn, label: 'FN', color: c.danger, bg: c.dark ? 'rgba(180,35,24,.2)' : '#fdecea' },
      { v: fp, label: 'FP', color: c.danger, bg: c.dark ? 'rgba(180,35,24,.2)' : '#fdecea' },
      { v: tn, label: 'TN', color: c.accent, bg: c.dark ? 'rgba(51,85,200,.22)' : '#e9edfb' }
    ];

    cells.forEach((cell, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = x0 + col * cw;
      const y = y0 + row * ch;
      ctx.fillStyle = cell.bg;
      ctx.fillRect(x, y, cw, ch);
      ctx.strokeStyle = c.dark ? '#2b3a4f' : '#ddd8ca';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cw, ch);
      text(ctx, cell.label, x + 12, y + 15, cell.color, 9.5, 'left', '700');
      text(ctx, String(cell.v), x + cw / 2, y + ch / 2 + 3, c.ink, 24, 'center', '700');
    });

    const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
    const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;
    const total = tp + fp + fn + tn;
    const acc = total > 0 ? (tp + tn) / total : 0;

    precOut.textContent = (precision * 100).toFixed(1) + '%';
    recOut.textContent = (recall * 100).toFixed(1) + '%';
    f1Out.textContent = (f1 * 100).toFixed(1) + '%';
    accOut.textContent = (acc * 100).toFixed(1) + '%';

    text(ctx, 'Precisión = TP / (TP + FP)', 20, 268, c.muted, 9.5);
    text(ctx, 'Recall = TP / (TP + FN)', 220, 268, c.muted, 9.5);
    text(ctx, 'F1 = 2PR / (P + R)', 400, 268, c.muted, 9.5);
  }

  inputs.forEach((input) => input.addEventListener('input', draw));
  draw();
  new MutationObserver(draw).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}
