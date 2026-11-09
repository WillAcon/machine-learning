<script lang="ts">
  import { page } from '$app/state';
  import { getModuleById, modules } from '$lib/data/modules';
  import { moduleStats, progress } from '$lib/stores/progress';
  import { activeLesson } from '$lib/stores/ui';
  import { enhanceContent } from '$lib/content/enhance';
  import Quiz from '$lib/components/Quiz.svelte';

  let { data } = $props();
  let module = $derived(getModuleById(data.moduleId)!);
  let stats = $derived(moduleStats(module.id, $progress));
  let index = $derived(modules.findIndex((m) => m.id === module.id));
  let prev = $derived(index > 0 ? modules[index - 1] : null);
  let next = $derived(index < modules.length - 1 ? modules[index + 1] : null);
  let hasQuizMount = $derived(module.content.includes('quiz-mount'));

  $effect(() => {
    const hash = page.url.hash.replace('#', '');
    const first = module.lessons[0]?.id ?? null;
    if (hash && module.lessons.some((l) => l.id === hash)) activeLesson.set(hash);
    else activeLesson.set(first);
  });
</script>

<svelte:head>
  <title>Módulo {module.id}: {module.title} · Curso Machine Learning</title>
  <meta name="description" content={module.desc} />
</svelte:head>

<div class="view active">
  <section class="module-hero" style={`--mod-accent:${module.accent}`}>
    <div class="eyebrow">Módulo {module.id} · {module.level}</div>
    <h1>{module.title}</h1>
    <p class="lead">{module.lead}</p>
    <div class="module-hero-meta">
      <span class="chip accent">{module.lessons.length} lecciones</span>
      <span class="chip outline">{module.hours} h estimadas</span>
      <span class="chip teal">{module.chip}</span>
      <div class="hero-progress-mini">
        <small>{stats.done} de {stats.total} lecciones completadas</small>
        <div class="bar"><span style={`width:${stats.pct}%`}></span></div>
      </div>
    </div>
  </section>

  {#if module.lessons.length}
    <div class="toc-card">
      <h3>Contenido del módulo</h3>
      <div class="toc-grid">
        {#each module.lessons as lesson (lesson.id)}
          <a href={`#${lesson.id}`} class:done={$progress.completed[lesson.id]}>
            <span class="n">{lesson.number}</span>
            <span>{lesson.title}</span>
          </a>
        {/each}
      </div>
    </div>
  {/if}

  {#key module.id}
    <div use:enhanceContent={module.id}>
      {@html module.content}
    </div>
  {/key}

  {#if !hasQuizMount}
    <div style="margin-top:26px">
      <Quiz moduleId={module.id} />
    </div>
  {/if}

  <nav class="exam-nav" aria-label="Navegación entre módulos" style="margin-top:34px">
    {#if prev}
      <a class="btn" href={`/modulos/${prev.slug}`}>← Módulo {prev.id}: {prev.short}</a>
    {:else}
      <a class="btn" href="/">← Inicio</a>
    {/if}
    {#if next}
      <a class="btn primary" href={`/modulos/${next.slug}`}>Módulo {next.id}: {next.short} →</a>
    {:else}
      <a class="btn primary" href="/examen">Ir al examen final →</a>
    {/if}
  </nav>
</div>
