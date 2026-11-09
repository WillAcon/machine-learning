<script lang="ts">
  import { page } from '$app/state';
  import { getModule } from '$lib/data/modules';
  import { overallPct, progress } from '$lib/stores/progress';
  import { activeLesson, searchOpen, sidebarOpen, theme, toggleTheme } from '$lib/stores/ui';
  import { canInstall, promptInstall } from '$lib/stores/pwa';

  let crumbs = $derived.by(() => {
    const path = page.url.pathname;
    const slug = path.match(/^\/modulos\/([^/]+)/)?.[1];
    if (slug) {
      const module = getModule(slug);
      if (module) {
        const current = module.lessons.find((l) => l.id === $activeLesson);
        return { root: 'Módulo', title: `${module.id}. ${module.short}`, sub: current?.title ?? '' };
      }
    }
    if (path === '/examen') return { root: 'Evaluación', title: 'Examen final', sub: '' };
    if (path === '/progreso') return { root: 'Panel', title: 'Mi progreso', sub: '' };
    if (path === '/glosario') return { root: 'Referencia', title: 'Glosario', sub: '' };
    if (path === '/bibliografia') return { root: 'Referencia', title: 'Bibliografía', sub: '' };
    return { root: 'Curso', title: 'Machine Learning', sub: '' };
  });

  function openSearch() {
    searchOpen.set(true);
  }
</script>

<header class="topbar">
  <button class="icon-btn menu-btn" type="button" aria-label="Abrir menú" onclick={() => sidebarOpen.set(true)}>
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  </button>

  <div class="crumbs">
    <span>{crumbs.root}</span>
    <span class="sep">/</span>
    <b>{crumbs.title}</b>
    {#if crumbs.sub}
      <span class="sep">/</span>
      <span>{crumbs.sub}</span>
    {/if}
  </div>

  <div class="topbar-spacer"></div>

  <div class="topbar-actions">
    <button class="search-trigger" type="button" onclick={openSearch} aria-label="Buscar en el curso">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <span class="label">Buscar concepto…</span>
      <span class="kbd">⌘ K</span>
    </button>

    <div class="progress-pill" title="Progreso global del curso">
      <strong>{$overallPct}%</strong>
      <span class="mini-track"><span class="mini-fill" style={`width:${$overallPct}%`}></span></span>
    </div>

    {#if $canInstall}
      <button
        class="icon-btn install-btn"
        type="button"
        aria-label="Instalar aplicación"
        title="Instalar aplicación"
        onclick={promptInstall}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 3v11m0 0 4-4m-4 4-4-4" />
          <path d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
        </svg>
      </button>
    {/if}

    <button class="icon-btn" type="button" aria-label="Cambiar tema" onclick={toggleTheme}>
      {#if $theme === 'dark'}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      {:else}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      {/if}
    </button>
  </div>
</header>
