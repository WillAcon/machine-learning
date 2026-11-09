<script lang="ts">
  import { onMount } from 'svelte';
  import { examQuestions, examByModule } from '$lib/data/exam';
  import { modules } from '$lib/data/modules';
  import { progress } from '$lib/stores/progress';
  import { typesetWhenReady } from '$lib/content/mathjax';

  let answers = $state<(number | null)[]>(examQuestions.map(() => null));
  let submitted = $state(false);

  let answered = $derived(answers.filter((a) => a !== null).length);
  let correct = $derived(
    answers.reduce<number>((acc, a, i) => (a !== null && a === examQuestions[i].correct ? acc + 1 : acc), 0)
  );
  let pct = $derived(Math.round((correct / examQuestions.length) * 100));
  let breakdown = $derived(
    Object.entries(examByModule).map(([id, qs]) => {
      let c = 0;
      for (const q of qs) {
        const i = examQuestions.indexOf(q);
        if (answers[i] === q.correct) c++;
      }
      return { id: Number(id), correct: c, total: qs.length };
    })
  );

  function choose(qi: number, oi: number) {
    if (answers[qi] !== null || submitted) return;
    answers[qi] = oi;
    requestMath();
  }

  function submit() {
    if (answered < examQuestions.length) {
      const ok = confirm(`Quedan ${examQuestions.length - answered} preguntas sin responder. ¿Finalizar de todas formas?`);
      if (!ok) return;
    }
    submitted = true;
    const byModule: Record<string, { correct: number; total: number }> = {};
    for (const item of breakdown) byModule[item.id] = { correct: item.correct, total: item.total };
    progress.recordExam(correct, byModule);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function retry() {
    answers = examQuestions.map(() => null);
    submitted = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function requestMath() {
    const el = document.getElementById('exam-root');
    if (el) void typesetWhenReady(el);
  }

  onMount(() => {
    requestMath();
  });

  function optionClass(qi: number, oi: number) {
    if (answers[qi] === null) return '';
    if (oi === examQuestions[qi].correct) return 'correct';
    if (answers[qi] === oi) return 'wrong';
    return 'dim';
  }

  function moduleName(id: number) {
    return modules.find((m) => m.id === id)?.short ?? `Módulo ${id}`;
  }
</script>

<svelte:head>
  <title>Examen final · Curso Machine Learning</title>
  <meta name="description" content="Examen final de 30 preguntas sobre los 12 módulos del curso, con retroalimentación inmediata." />
</svelte:head>

<div class="view active exam-shell" id="exam-root">
  <section class="exam-hero">
    <div class="hero-kicker">Evaluación final</div>
    <h1>Examen de Machine Learning</h1>
    <p>
      30 preguntas que cubren los doce módulos: fundamentos, matemáticas, algoritmos, evaluación,
      deep learning, NLP, visión y MLOps. Recibes retroalimentación inmediata y un desglose por módulo.
    </p>
    <div class="hero-meta">
      <span class="chip accent">{examQuestions.length} preguntas</span>
      <span class="chip outline">Sin límite de tiempo</span>
      <span class="chip teal">Feedback inmediato</span>
      {#if $progress.exam.best !== null}
        <span class="chip gold">Mejor resultado: {$progress.exam.best}/{examQuestions.length}</span>
      {/if}
    </div>
    {#if $progress.exam.attempts > 0}
      <p style="margin:14px 0 0;font-size:12.5px">
        Intentos: {$progress.exam.attempts} · Último: {$progress.exam.last}/{examQuestions.length}.
        El mejor resultado se conserva aunque repitas.
      </p>
    {/if}
  </section>

  {#if submitted}
    <div class="exam-result">
      <div class="pct-label">Resultado</div>
      <div class="score-big">{pct}%</div>
      <div class="pct-label">{correct} de {examQuestions.length} correctas</div>
      <p>
        {#if pct >= 85}
          Dominio sólido. Estás listo para integrar los conceptos en un proyecto real.
        {:else if pct >= 70}
          Buen nivel. Revisa los módulos con más fallos y vuelve a intentarlo.
        {:else if pct >= 50}
          Base en construcción. Repasa la teoría y los ejemplos numéricos antes de repetir.
        {:else}
          Conviene volver a los módulos fundamentales y practicar con los simuladores.
        {/if}
      </p>
      <div class="exam-breakdown">
        {#each breakdown as item (item.id)}
          <div><b>{item.correct}/{item.total}</b>{moduleName(item.id)}</div>
        {/each}
      </div>
      <div class="exam-nav" style="justify-content:center;margin-top:20px">
        <button class="btn primary" type="button" onclick={retry}>Repetir examen</button>
        <a class="btn" href="/progreso">Ver panel de progreso</a>
      </div>
    </div>
  {:else}
    <div class="exam-answered" style="margin-bottom:12px">
      {answered} de {examQuestions.length} respondidas · {correct} correctas hasta ahora
    </div>
  {/if}

  {#each examQuestions as q, qi (qi)}
    <div class="exam-q">
      <div class="q-text">
        <span class="qn">{qi + 1}</span>
        <span>[{moduleName(q.moduleId)}] {q.q}</span>
      </div>
      <div class="q-options">
        {#each q.options as opt, oi (oi)}
          <button
            type="button"
            class={`q-opt ${optionClass(qi, oi)}`}
            disabled={answers[qi] !== null || submitted}
            onclick={() => choose(qi, oi)}
          >
            <span class="letter">{String.fromCharCode(65 + oi)}</span>
            <span>{opt}</span>
          </button>
        {/each}
      </div>
      {#if answers[qi] !== null}
        <div class={`q-feedback show ${answers[qi] === q.correct ? 'ok' : 'no'}`}>
          <b>{answers[qi] === q.correct ? 'Correcto.' : 'Incorrecto.'}</b>
          {q.explain}
        </div>
      {/if}
    </div>
  {/each}

  {#if !submitted}
    <div class="exam-nav">
      <span class="exam-answered">{answered}/{examQuestions.length} respondidas</span>
      <button class="btn primary" type="button" onclick={submit}>Finalizar y calcular resultado</button>
    </div>
  {/if}
</div>
