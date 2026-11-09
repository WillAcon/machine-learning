<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Topbar from '$lib/components/Topbar.svelte';
  import SearchModal from '$lib/components/SearchModal.svelte';
  import { progress, overallPct } from '$lib/stores/progress';
  import { initTheme, sidebarOpen, searchOpen } from '$lib/stores/ui';

  let { children } = $props();
  let mounted = $state(false);

  onMount(() => {
    progress.hydrate();
    initTheme();
    mounted = true;

    const onKey = (ev: KeyboardEvent) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k') {
        ev.preventDefault();
        searchOpen.update((v) => !v);
      } else if (ev.key === 'Escape') {
        searchOpen.set(false);
        sidebarOpen.set(false);
      }
    };
    window.addEventListener('keydown', onKey);

    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') progress.addTime(20);
    }, 20000);

    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearInterval(timer);
    };
  });

  // Guarda la última ruta y cierra menús al navegar.
  $effect(() => {
    const path = page.url.pathname;
    if (browser && mounted) {
      progress.setLastRoute(path);
      sidebarOpen.set(false);
      searchOpen.set(false);
    }
  });
</script>

<a class="skip-link" href="#contenido">Saltar al contenido</a>

<div class="app">
  <Sidebar />
  <div class="workspace">
    <Topbar />
    <main class="main" id="contenido">
      {@render children()}
    </main>
    <footer class="site-footer">
      <span>Curso de Machine Learning · teoría, matemáticas y práctica en Python</span>
      <span class="muted">Progreso local · {Math.round($overallPct)}% completado · Hecho para estudiar en cualquier lugar</span>
    </footer>
  </div>
</div>

<div class="scrim" class:show={$sidebarOpen} onclick={() => sidebarOpen.set(false)} role="presentation"></div>
<SearchModal />
