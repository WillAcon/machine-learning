<script lang="ts">
  import { glossary } from '$lib/data/glossary';
  import { getModuleById } from '$lib/data/modules';

  let query = $state('');
  let category = $state('Todos');

  let categories = $derived(['Todos', ...Array.from(new Set(glossary.map((g) => g.category))).sort()]);
  let filtered = $derived(
    glossary
      .filter((g) => category === 'Todos' || g.category === category)
      .filter((g) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q);
      })
      .sort((a, b) => a.term.localeCompare(b.term, 'es'))
  );
</script>

<svelte:head>
  <title>Glosario · Curso Machine Learning</title>
  <meta name="description" content="Glosario de más de 100 términos de Machine Learning, estadística, deep learning, NLP y MLOps." />
</svelte:head>

<div class="view active">
  <section class="module-hero" style="--mod-accent:var(--accent-2)">
    <div class="eyebrow">Referencia</div>
    <h1>Glosario de Machine Learning</h1>
    <p class="lead">
      Definiciones breves y precisas de los conceptos que aparecen a lo largo del curso. Usa la
      búsqueda o filtra por categoría; cada término enlaza al módulo donde se desarrolla.
    </p>
    <div class="module-hero-meta">
      <span class="chip accent">{glossary.length} términos</span>
      <span class="chip outline">{categories.length - 1} categorías</span>
      <span class="chip teal">Referencia cruzada</span>
    </div>
  </section>

  <div class="gl-search">
    <input bind:value={query} type="search" placeholder="Buscar término o definición…" aria-label="Buscar en el glosario" />
  </div>

  <div class="path-mini" style="margin-bottom:18px">
    {#each categories as cat}
      <button
        type="button"
        class="chip"
        class:accent={category === cat}
        style="cursor:pointer"
        onclick={() => (category = cat)}
      >
        {cat}
      </button>
    {/each}
  </div>

  {#if filtered.length === 0}
    <div class="panel" style="text-align:center;color:var(--muted)">
      No hay términos que coincidan con <strong>{query}</strong>.
    </div>
  {:else}
    <dl class="gl-list">
      {#each filtered as item (item.term)}
        {@const module = getModuleById(item.moduleId)}
        <div class="gl-item" id={`gl-${item.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
          <dt>
            {item.term}
            <span class="gl-cat">{item.category}</span>
          </dt>
          <dd>
            {item.definition}
            {#if module}
              <a href={`/modulos/${module.slug}`} style="white-space:nowrap;font-size:11.5px">→ Módulo {module.id}</a>
            {/if}
          </dd>
        </div>
      {/each}
    </dl>
  {/if}
</div>
