<script lang="ts">
  import { modules, totalHours, totalLessons } from '$lib/data/modules';
  import {
    completedCount,
    moduleStats,
    nextIncomplete,
    overallPct,
    progress,
    quizAverage
  } from '$lib/stores/progress';
  import ProgressRing from '$lib/components/ProgressRing.svelte';

  let resume = $derived(nextIncomplete($progress));
  let resumeHref = $derived(
    resume ? `/modulos/${resume.module.slug}#${resume.lesson.id}` : '/examen'
  );
  let resumeLabel = $derived(
    resume ? `Continuar: ${resume.lesson.number} · ${resume.lesson.title}` : 'Ir al examen final'
  );
</script>

<div class="view active">
  <section class="dash-hero">
    <div class="hero-grid">
      <div>
        <div class="hero-kicker">Curso completo · De cero a producción</div>
        <h1>Machine Learning,<br /><em>explicado desde la raíz.</em></h1>
        <p class="hero-lead">
          Un recorrido riguroso y práctico por la inteligencia artificial: matemáticas necesarias,
          Python, algoritmos clásicos, deep learning, NLP, visión, MLOps y proyectos reales con
          datasets públicos. Sin atajos y sin cajas negras.
        </p>
        <div class="hero-meta">
          <span class="chip accent">12 módulos</span>
          <span class="chip teal">{totalLessons} lecciones</span>
          <span class="chip gold">≈ {totalHours} horas</span>
          <span class="chip violet">9 simuladores</span>
        </div>
        <div class="hero-actions">
          <a class="btn primary" href={resumeHref}>{resumeLabel}</a>
          <a class="btn" href="/modulos/introduccion-ia">Empezar desde el módulo 0</a>
          <a class="btn ghost" href="/progreso">Ver mi progreso</a>
        </div>
        <div class="hero-note">
          Tu avance se guarda automáticamente en este navegador. No necesitas cuenta.
        </div>
      </div>

      <div class="hero-progress">
        <ProgressRing />
        <h3>{$completedCount} de {totalLessons} lecciones</h3>
        <p>{$overallPct}% del curso completado</p>
        <a class="btn small" href={resumeHref}>{resume ? 'Continuar ruta' : 'Hacer examen'}</a>
      </div>
    </div>
  </section>

  <div class="section-head">
    <div>
      <h2>Ruta de aprendizaje</h2>
      <p>Doce módulos secuenciales. Cada uno incluye teoría, fórmulas, ejemplos, código y ejercicios.</p>
    </div>
    <span class="side">{$quizAverage === null ? 'Sin quizzes aún' : `Quizzes: ${$quizAverage}%`}</span>
  </div>

  <div class="module-grid">
    {#each modules as module (module.id)}
      {@const stats = moduleStats(module.id, $progress)}
      <a
        class="module-card"
        href={`/modulos/${module.slug}`}
        style={`--card-accent:${module.accent}`}
      >
        <div class="module-card-top">
          <span class="module-num">MÓDULO {module.id}</span>
          <span class="chip outline">{module.tag}</span>
        </div>
        <h3>{module.title}</h3>
        <p>{module.desc}</p>
        <div class="module-card-foot">
          <span>{stats.done}/{stats.total}</span>
          <span class="track"><span class="fill" style={`width:${stats.pct}%`}></span></span>
          <span class="pct">{stats.pct}%</span>
        </div>
      </a>
    {/each}
  </div>

  <div class="dash-cols">
    <div class="panel">
      <h3>Cómo aprovechar el curso</h3>
      <p>Un método simple que funciona mejor que acumular videos.</p>
      <ol class="how-list">
        <li><div><b>Lee la intuición antes de la fórmula.</b> Cada lección empieza explicando qué problema resuelve la idea, y después formaliza.</div></li>
        <li><div><b>Reproduce el código.</b> Ejecuta los ejemplos en Colab o Jupyter y cambia los datos. Aprenderás más de un error propio que de diez aciertos ajenos.</div></li>
        <li><div><b>Resuelve los ejercicios sin mirar.</b> Intenta primero en papel; después contrasta con la solución razonada.</div></li>
        <li><div><b>Usa los simuladores para formar intuición.</b> Mueve los parámetros y observa cómo cambia el modelo. La intuición numérica vale más que memorizar definiciones.</div></li>
        <li><div><b>Cierra cada módulo con el quiz y el proyecto.</b> El quiz detecta vacíos; el proyecto demuestra que puedes integrar lo aprendido.</div></li>
      </ol>
    </div>

    <div class="panel">
      <h3>El curso en números</h3>
      <p>Diseñado para un máster en IA con base matemática en construcción.</p>
      <div class="stat-row">
        <div class="stat-box"><strong>{modules.length}</strong><span>módulos</span></div>
        <div class="stat-box"><strong>{totalLessons}</strong><span>lecciones</span></div>
        <div class="stat-box"><strong>{totalHours}</strong><span>horas estimadas</span></div>
        <div class="stat-box"><strong>10</strong><span>proyectos guiados</span></div>
      </div>
      <div class="path-mini">
        <a href="/modulos/fundamentos-matematicos">Matemáticas</a>
        <a href="/modulos/python-para-ml">Python</a>
        <a href="/modulos/aprendizaje-supervisado">Supervisado</a>
        <a href="/modulos/deep-learning">Deep Learning</a>
        <a href="/examen">Examen</a>
        <a href="/glosario">Glosario</a>
      </div>
      <div class="callout info" style="margin-top:18px">
        <span class="callout-title">Requisito real</span>
        Saber programar lo básico y tener curiosidad. Las matemáticas se construyen desde cero en el módulo 1.
      </div>
    </div>
  </div>

  <div class="section-head">
    <div>
      <h2>Práctica interactiva</h2>
      <p>Nueve simuladores para experimentar con los conceptos en lugar de solo leerlos.</p>
    </div>
  </div>

  <div class="dash-cols" style="grid-template-columns:1fr 1fr">
    <div class="panel">
      <h3>Simuladores incluidos</h3>
      <div class="path-mini" style="margin-top:10px">
        <a href="/modulos/fundamentos-matematicos#l-m1-l7">Descenso del gradiente</a>
        <a href="/modulos/fundamentos-ml#l-m3-l6">Overfitting</a>
        <a href="/modulos/aprendizaje-supervisado#l-m4-l2">Regresión lineal</a>
        <a href="/modulos/aprendizaje-supervisado#l-m4-l7">Árbol de decisión</a>
        <a href="/modulos/aprendizaje-no-supervisado#l-m5-l2">K-Means</a>
        <a href="/modulos/aprendizaje-no-supervisado#l-m5-l5">PCA</a>
        <a href="/modulos/evaluacion-modelos#l-m6-l2">Matriz de confusión</a>
        <a href="/modulos/deep-learning#l-m7-l2">Red neuronal</a>
        <a href="/modulos/vision-artificial#l-m9-l2">Convolución</a>
      </div>
    </div>
    <div class="panel">
      <h3>Evaluación</h3>
      <p>El examen final repasa los 12 módulos con retroalimentación inmediata.</p>
      <div class="hero-actions">
        <a class="btn primary" href="/examen">Abrir examen final</a>
        <a class="btn" href="/progreso">Panel de progreso</a>
      </div>
    </div>
  </div>
</div>
