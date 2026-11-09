<script lang="ts">
  import { goto } from '$app/navigation';
  import { tick } from 'svelte';
  import { searchCourse, type SearchEntry } from '$lib/data/search';
  import { searchOpen } from '$lib/stores/ui';

  let query = $state('');
  let selected = $state(0);
  let inputEl = $state<HTMLInputElement | null>(null);

  let results = $derived<SearchEntry[]>(searchCourse(query));

  const suggestions = ['gradiente', 'overfitting', 'PCA', 'regresión logística', 'transformers', 'matriz de confusión'];

  $effect(() => {
    if ($searchOpen) {
      query = '';
      selected = 0;
      tick().then(() => inputEl?.focus());
    }
  });

  $effect(() => {
    if (selected >= results.length) selected = Math.max(0, results.length - 1);
  });

  function close() {
    searchOpen.set(false);
  }

  function go(entry: SearchEntry) {
    searchOpen.set(false);
    goto(entry.href);
  }

  function onKeydown(ev: KeyboardEvent) {
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      selected = Math.min(results.length - 1, selected + 1);
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      selected = Math.max(0, selected - 1);
    } else if (ev.key === 'Enter' && results[selected]) {
      ev.preventDefault();
      go(results[selected]);
    } else if (ev.key === 'Escape') {
      close();
    }
  }

  function escapeHtml(text: string) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function highlight(text: string) {
    const safe = escapeHtml(text);
    const terms = query.trim().split(/\s+/).filter((t) => t.length > 1);
    if (!terms.length) return safe;
    const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    return safe.replace(re, '<mark>$1</mark>');
  }
</script>

{#if $searchOpen}
  <div
    class="modal open"
    role="dialog"
    aria-modal="true"
    aria-label="Buscar en el curso"
    tabindex="-1"
    onclick={(e) => e.target === e.currentTarget && close()}
    onkeydown={(e) => e.key === 'Escape' && close()}
  >
    <div
      class="modal-panel wide"
      role="document"
      tabindex="-1"
    >
      <div class="modal-search">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--muted)">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          bind:this={inputEl}
          bind:value={query}
          onkeydown={onKeydown}
          type="search"
          placeholder="Busca un concepto, lección o término…"
          aria-label="Término de búsqueda"
          autocomplete="off"
        />
        <span class="kbd">Esc</span>
      </div>

      {#if query.trim().length < 2}
        <div class="search-results">
          <div class="search-hint">Prueba con:</div>
          <div class="path-mini" style="padding:8px 10px 16px">
            {#each suggestions as s}
              <button class="chip outline" type="button" onclick={() => (query = s)}>{s}</button>
            {/each}
          </div>
          <div class="search-hint">La búsqueda recorre títulos, secciones y lecciones de los 12 módulos.</div>
        </div>
      {:else if results.length === 0}
        <div class="search-empty">
          No encontramos resultados para <strong>{query}</strong>.<br />
          Prueba con una palabra más general, por ejemplo «regresión» o «datos».
        </div>
      {:else}
        <div class="search-results">
          {#each results as entry, i (entry.href + entry.title)}
            <button
              type="button"
              class="sr-item"
              class:sel={i === selected}
              onmouseenter={() => (selected = i)}
              onclick={() => go(entry)}
              style="width:100%;text-align:left;border:0;background:transparent;cursor:pointer;border-radius:8px"
            >
              <div class="sr-mod">{entry.module}</div>
              <h4>{@html highlight(entry.title)}</h4>
              <p>{@html highlight(entry.text)}</p>
            </button>
          {/each}
        </div>
        <div class="search-hint" style="padding:0 18px 14px">
          ↑ ↓ para navegar · Enter para abrir · Esc para cerrar
        </div>
      {/if}
    </div>
  </div>
{/if}
