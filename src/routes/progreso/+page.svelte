<script lang="ts">
  import { modules, totalLessons } from '$lib/data/modules';
  import {
    completedCount,
    moduleStats,
    nextIncomplete,
    overallPct,
    progress,
    quizAverage
  } from '$lib/stores/progress';

  let resume = $derived(nextIncomplete($progress));
  let hours = $derived(Math.floor($progress.timeSpent / 3600));
  let minutes = $derived(Math.floor(($progress.timeSpent % 3600) / 60));

  function download() {
    const blob = new Blob([progress.exportJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'progreso-machine-learning.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function reset() {
    const ok = confirm(
      '¿Borrar todo el progreso, quizzes y resultados del examen? Esta acción no se puede deshacer.'
    );
    if (ok) progress.resetAll();
  }

  function quizFor(id: number) {
    return $progress.quiz[`mod-${id}`];
  }
</script>

<svelte:head>
  <title>Mi progreso · Curso Machine Learning</title>
  <meta name="description" content="Panel de progreso del curso: lecciones completadas, quizzes, examen y tiempo de estudio." />
</svelte:head>

<div class="view active">
  <section class="module-hero" style="--mod-accent:var(--accent)">
    <div class="eyebrow">Panel personal</div>
    <h1>Mi progreso</h1>
    <p class="lead">
      Todo tu avance se guarda en este navegador. Aquí puedes ver qué falta, cómo van los quizzes y
      qué tan sólido es tu resultado en el examen final.
    </p>
    <div class="module-hero-meta">
      <span class="chip accent">{$overallPct}% del curso</span>
      <span class="chip teal">{$completedCount}/{totalLessons} lecciones</span>
      <span class="chip gold">{hours} h {minutes} min de estudio</span>
      {#if $quizAverage !== null}<span class="chip violet">Quizzes: {$quizAverage}%</span>{/if}
    </div>
  </section>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="v">{$overallPct}%</div>
      <div class="k">Progreso global</div>
      <div class="s">{$completedCount} lecciones completadas</div>
    </div>
    <div class="stat-card">
      <div class="v">{hours}h {minutes}m</div>
      <div class="k">Tiempo de estudio</div>
      <div class="s">medido en esta plataforma</div>
    </div>
    <div class="stat-card">
      <div class="v">{$quizAverage === null ? '—' : `${$quizAverage}%`}</div>
      <div class="k">Promedio en quizzes</div>
      <div class="s">{Object.keys($progress.quiz).length} módulos evaluados</div>
    </div>
    <div class="stat-card">
      <div class="v">{$progress.exam.best === null ? '—' : `${$progress.exam.best}/30`}</div>
      <div class="k">Mejor examen</div>
      <div class="s">{$progress.exam.attempts} intento(s)</div>
    </div>
  </div>

  <div class="dash-cols">
    <div class="panel">
      <h3>Avance por módulo</h3>
      <p>Los módulos se desbloquean en orden recomendado, pero puedes navegar libremente.</p>
      <div class="mod-progress-list">
        {#each modules as module (module.id)}
          {@const stats = moduleStats(module.id, $progress)}
          <a
            class="mod-progress-row"
            href={`/modulos/${module.slug}`}
            style="text-decoration:none;color:inherit"
          >
            <span>{module.id}. {module.short}</span>
            <span class="tr"><span class="fl" style={`width:${stats.pct}%;background:${module.accent}`}></span></span>
            <span class="pc">{stats.pct}%</span>
          </a>
        {/each}
      </div>

      <div class="exam-nav" style="margin-top:18px">
        {#if resume}
          <a class="btn primary small" href={`/modulos/${resume.module.slug}#${resume.lesson.id}`}>
            Continuar: {resume.lesson.number} · {resume.lesson.title}
          </a>
        {:else}
          <a class="btn primary small" href="/examen">Todo completado · ir al examen</a>
        {/if}
      </div>
    </div>

    <div class="panel">
      <h3>Resultados de quizzes</h3>
      <p>Cada módulo tiene cuatro preguntas con retroalimentación inmediata.</p>
      <div class="mod-progress-list">
        {#each modules as module (module.id)}
          {@const q = quizFor(module.id)}
          <div class="mod-progress-row" style="grid-template-columns:96px 1fr 58px">
            <span>{module.short}</span>
            <span class="tr">
              <span
                class="fl"
                style={`width:${q ? Math.round((q.correct / Math.max(1, q.total)) * 100) : 0}%;background:${module.accent}`}
              ></span>
            </span>
            <span class="pc">{q ? `${q.correct}/${q.total}` : '—'}</span>
          </div>
        {/each}
      </div>
      <div class="exam-nav" style="margin-top:18px">
        <a class="btn small" href="/examen">Abrir examen final</a>
      </div>
    </div>
  </div>

  <div class="panel" style="margin-top:16px">
    <h3>Datos y respaldo</h3>
    <p>
      El progreso vive en <code>localStorage</code> bajo la clave <code>mlcourse.v2</code>. Exporta un
      JSON si quieres conservarlo al cambiar de navegador.
    </p>
    <div class="hero-actions">
      <button class="btn small" type="button" onclick={download}>Exportar progreso (JSON)</button>
      <a class="btn small" href="/">Volver al inicio</a>
    </div>
    <div class="danger-zone">
      <h4>Zona de riesgo</h4>
      <p>Borrar el progreso elimina lecciones completadas, respuestas de quizzes y resultados del examen.</p>
      <button class="btn small" type="button" style="border-color:var(--danger);color:var(--danger)" onclick={reset}>
        Borrar todo el progreso
      </button>
    </div>
  </div>
</div>
