<script lang="ts">
  import { overallPct } from '$lib/stores/progress';

  let { size = 138 }: { size?: number } = $props();
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let dash = $derived(circumference * (1 - $overallPct / 100));
</script>

<div class="ring-wrap" style={`width:${size}px;height:${size}px`}>
  <svg width={size} height={size} viewBox="0 0 138 138" aria-hidden="true">
    <defs>
      <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#3355c8" />
        <stop offset="100%" stop-color="#0e7c6b" />
      </linearGradient>
    </defs>
    <circle class="ring-track" cx="69" cy="69" r={radius} fill="none" stroke-width="9" />
    <circle
      class="ring-fill"
      cx="69"
      cy="69"
      r={radius}
      fill="none"
      stroke-width="9"
      stroke-dasharray={circumference}
      stroke-dashoffset={dash}
    />
  </svg>
  <div class="ring-label">
    <strong>{$overallPct}%</strong>
    <span>del curso</span>
  </div>
</div>
