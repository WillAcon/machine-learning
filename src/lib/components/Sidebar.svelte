<script lang="ts">
  import { page } from '$app/state';
  import { modules } from '$lib/data/modules';
  import { overallPct, progress } from '$lib/stores/progress';
  import { sidebarOpen } from '$lib/stores/ui';

  let activeSlug = $derived(
    page.url.pathname.match(/^\/modulos\/([^/]+)/)?.[1] ?? ''
  );
  let activeLessonId = $derived(page.url.hash?.replace('#', '') ?? '');

  function allDone(moduleId: number) {
    const m = modules.find((x) => x.id === moduleId);
    if (!m || !m.lessons.length) return false;
    return m.lessons.every((l) => $progress.completed[l.id]);
  }
</script>

<aside class="sidebar" class:open={$sidebarOpen} id="sidebar" aria-label="Navegación del curso">
  <a class="brand" href="/" aria-label="Inicio del curso">
    <div class="brand-mark">ML</div>
    <div class="brand-text">
      <div class="brand-title">Machine Learning</div>
      <div class="brand-sub">Curso completo</div>
    </div>
  </a>

  <div class="sidebar-progress">
    <div class="sidebar-progress-top">
      <span>Progreso global</span>
      <strong>{$overallPct}%</strong>
    </div>
    <div class="track"><div class="fill" style={`width:${$overallPct}%`}></div></div>
  </div>

  <nav class="sidebar-nav">
    <div class="nav-section-label">Ruta de aprendizaje</div>
    <a class="nav-item" class:active={page.url.pathname === '/'} href="/">
      <span class="nav-num">⌂</span>
      <span class="nav-text">Inicio y ruta</span>
    </a>

    {#each modules as module (module.id)}
      <div class="has-sub" class:open={activeSlug === module.slug}>
        <a
          class="nav-item"
          class:active={activeSlug === module.slug}
          class:done={allDone(module.id)}
          href={`/modulos/${module.slug}`}
          onclick={() => sidebarOpen.set(false)}
        >
          <span class="nav-num">{module.id}</span>
          <span class="nav-text">{module.short}</span>
          <span class="nav-check">✓</span>
        </a>
        {#if activeSlug === module.slug && module.lessons.length}
          <div class="nav-sub">
            {#each module.lessons as lesson (lesson.id)}
              <a
                class:active={activeLessonId === lesson.id}
                class:done={$progress.completed[lesson.id]}
                href={`/modulos/${module.slug}#${lesson.id}`}
                onclick={() => sidebarOpen.set(false)}
              >
                {lesson.number} · {lesson.title}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    {/each}

    <div class="nav-section-label">Evaluación y referencias</div>
    <a class="nav-item special" class:active={page.url.pathname === '/examen'} href="/examen">
      <span class="nav-num">✦</span><span class="nav-text">Examen final</span>
    </a>
    <a class="nav-item" class:active={page.url.pathname === '/progreso'} href="/progreso">
      <span class="nav-num">◔</span><span class="nav-text">Mi progreso</span>
    </a>
    <a class="nav-item" class:active={page.url.pathname === '/glosario'} href="/glosario">
      <span class="nav-num">≡</span><span class="nav-text">Glosario</span>
    </a>
    <a class="nav-item" class:active={page.url.pathname === '/bibliografia'} href="/bibliografia">
      <span class="nav-num">❧</span><span class="nav-text">Bibliografía</span>
    </a>
  </nav>

  <div class="sidebar-footer">
    <span class="dot"></span> Progreso guardado localmente<br />
    <span style="color:#6f7f95">12 módulos · teoría, código y práctica</span>
  </div>
</aside>
