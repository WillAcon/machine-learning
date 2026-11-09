import { H, W, clear, colors, dot, gaussian, line, mulberry32, setupCanvas, text } from './util';

type Point = { x: number; y: number; label: 0 | 1 };
type Node =
  | { leaf: true; label: 0 | 1; n: number }
  | { leaf: false; feature: 0 | 1; threshold: number; left: Node; right: Node; n: number };

function gini(points: Point[]) {
  if (!points.length) return 0;
  const p = points.filter((q) => q.label === 1).length / points.length;
  return 1 - p * p - (1 - p) * (1 - p);
}

function majority(points: Point[]): 0 | 1 {
  const ones = points.filter((q) => q.label === 1).length;
  return ones >= points.length - ones ? 1 : 0;
}

function build(points: Point[], depth: number, maxDepth: number): Node {
  const base = { n: points.length };
  if (depth >= maxDepth || points.length < 8 || gini(points) < 1e-6) {
    return { leaf: true, label: majority(points), ...base };
  }
  let bestGain = 0;
  let bestFeature: 0 | 1 = 0;
  let bestThreshold = 0;
  let bestLeft: Point[] = [];
  let bestRight: Point[] = [];
  const parent = gini(points);
  for (const feature of [0, 1] as const) {
    const values = [...new Set(points.map((p) => (feature === 0 ? p.x : p.y)))].sort((a, b) => a - b);
    const step = Math.max(1, Math.floor(values.length / 24));
    for (let i = step; i < values.length; i += step) {
      const threshold = (values[i - 1] + values[i]) / 2;
      const left = points.filter((p) => (feature === 0 ? p.x : p.y) <= threshold);
      const right = points.filter((p) => (feature === 0 ? p.x : p.y) > threshold);
      if (!left.length || !right.length) continue;
      const weighted = (left.length * gini(left) + right.length * gini(right)) / points.length;
      const gain = parent - weighted;
      if (gain > bestGain) {
        bestGain = gain;
        bestFeature = feature;
        bestThreshold = threshold;
        bestLeft = left;
        bestRight = right;
      }
    }
  }
  if (bestGain < 1e-4) return { leaf: true, label: majority(points), ...base };
  return {
    leaf: false,
    feature: bestFeature,
    threshold: bestThreshold,
    left: build(bestLeft, depth + 1, maxDepth),
    right: build(bestRight, depth + 1, maxDepth),
    n: points.length
  };
}

function predict(node: Node, p: { x: number; y: number }): 0 | 1 {
  if (node.leaf) return node.label;
  const v = node.feature === 0 ? p.x : p.y;
  return v <= node.threshold ? predict(node.left, p) : predict(node.right, p);
}

function leaves(node: Node): number {
  return node.leaf ? 1 : leaves(node.left) + leaves(node.right);
}

export function initTree(root: ParentNode = document) {
  const canvas = root.querySelector<HTMLCanvasElement>('#treeCanvas');
  if (!canvas || canvas.dataset.ready) return;
  canvas.dataset.ready = '1';

  const ctx = setupCanvas(canvas);
  const depthInput = root.querySelector<HTMLInputElement>('#treeDepth')!;
  const depthOut = root.querySelector<HTMLOutputElement>('#treeDepthOut')!;
  const dataSel = root.querySelector<HTMLSelectElement>('#treeData')!;
  const newBtn = root.querySelector<HTMLButtonElement>('#treeNew')!;
  const accOut = root.querySelector<HTMLElement>('#treeAcc')!;
  const leavesOut = root.querySelector<HTMLElement>('#treeLeaves')!;

  let points: Point[] = [];
  let tree: Node;
  let seed = 11;

  const xToPx = (x: number) => 34 + x * (W - 54);
  const yToPx = (y: number) => H - 24 - y * (H - 44);

  function generate() {
    const rand = mulberry32(seed);
    const kind = dataSel.value;
    points = [];
    if (kind === 'blobs') {
      for (let i = 0; i < 120; i++) {
        const label: 0 | 1 = i < 60 ? 0 : 1;
        const cx = label === 0 ? 0.32 : 0.7;
        const cy = label === 0 ? 0.32 : 0.68;
        points.push({
          x: cx + gaussian(rand) * 0.11,
          y: cy + gaussian(rand) * 0.11,
          label
        });
      }
    } else if (kind === 'moons') {
      for (let i = 0; i < 120; i++) {
        const label: 0 | 1 = i < 60 ? 0 : 1;
        const t = rand() * Math.PI;
        if (label === 0) {
          points.push({ x: 0.5 + 0.3 * Math.cos(t), y: 0.36 + 0.3 * Math.sin(t), label });
        } else {
          points.push({ x: 0.5 - 0.3 * Math.cos(t), y: 0.64 - 0.3 * Math.sin(t), label });
        }
      }
    } else {
      for (let i = 0; i < 120; i++) {
        const x = 0.12 + rand() * 0.76;
        const y = 0.12 + rand() * 0.76;
        const label: 0 | 1 = (x > 0.5) !== (y > 0.5) ? 1 : 0;
        points.push({ x: x + gaussian(rand) * 0.025, y: y + gaussian(rand) * 0.025, label });
      }
    }
    rebuild();
  }

  function rebuild() {
    const maxDepth = Number(depthInput.value);
    tree = build(points, 0, maxDepth);
    draw();
  }

  function draw() {
    const c = colors();
    clear(ctx, W, H, c.bg);

    const cell = 7;
    for (let py = 26; py < H - 16; py += cell) {
      for (let px = 30; px < W - 12; px += cell) {
        const x = (px - 34) / (W - 54);
        const y = (H - 24 - py) / (H - 44);
        const label = predict(tree, { x, y });
        ctx.fillStyle =
          label === 0
            ? c.dark
              ? 'rgba(51,85,200,.20)'
              : 'rgba(51,85,200,.10)'
            : c.dark
              ? 'rgba(14,124,107,.22)'
              : 'rgba(14,124,107,.12)';
        ctx.fillRect(px, py, cell, cell);
      }
    }

    for (const p of points) {
      dot(ctx, xToPx(p.x), yToPx(p.y), 3.3, p.label === 0 ? '#3355c8' : '#0e7c6b', c.bg);
    }

    line(ctx, xToPx(0), yToPx(0), xToPx(1), yToPx(0), c.axis, 1);
    line(ctx, xToPx(0), yToPx(0), xToPx(0), yToPx(1), c.axis, 1);

    let correct = 0;
    for (const p of points) if (predict(tree, p) === p.label) correct++;
    accOut.textContent = `${((correct / points.length) * 100).toFixed(1)}%`;
    leavesOut.textContent = String(leaves(tree));
    text(ctx, 'x₁', W - 22, yToPx(0) + 15, c.muted, 11, 'center');
    text(ctx, 'x₂', xToPx(0) - 15, 30, c.muted, 11, 'center');
  }

  depthInput.addEventListener('input', () => {
    depthOut.textContent = depthInput.value;
    rebuild();
  });
  dataSel.addEventListener('change', generate);
  newBtn.addEventListener('click', () => {
    seed = (seed * 1103515245 + 12345) >>> 0;
    generate();
  });

  depthOut.textContent = depthInput.value;
  generate();
  new MutationObserver(draw).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}
