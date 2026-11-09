<script lang="ts">
  let { error }: { error: { message: string; status?: number } } = $props();
  let status = $derived(error?.status ?? 404);
</script>

<svelte:head>
  <title>{status} · Curso Machine Learning</title>
</svelte:head>

<div class="view active">
  <section class="module-hero">
    <div class="eyebrow">Error {status}</div>
    <h1>No encontramos esta página</h1>
    <p class="lead">
      {error?.message ?? 'La ruta solicitada no existe o fue movida.'} Puedes volver al inicio y
      continuar desde tu última lección.
    </p>
    <div class="hero-actions">
      <a class="btn primary" href="/">Volver al inicio</a>
      <a class="btn" href="/modulos/introduccion-ia">Ir al módulo 0</a>
      <a class="btn ghost" href="/glosario">Buscar en el glosario</a>
    </div>
  </section>
</div>
