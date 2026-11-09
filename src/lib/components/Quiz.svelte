<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { quizzes } from '$lib/data/quizzes';
  import { progress } from '$lib/stores/progress';
  import { typesetWhenReady } from '$lib/content/mathjax';

  let { moduleId, title = 'Comprueba lo aprendido' }: { moduleId: number; title?: string } = $props();

  // svelte-ignore state_referenced_locally
  const questions = quizzes[moduleId] ?? [];
  // svelte-ignore state_referenced_locally
  const quizId = `mod-${moduleId}`;

  let answers = $state<(number | null)[]>(questions.map(() => null));

  let correct = $derived(
    answers.reduce<number>((acc, a, i) => (a !== null && a === questions[i]?.correct ? acc + 1 : acc), 0)
  );
  let answered = $derived(answers.filter((a) => a !== null).length);
  let finished = $derived(questions.length > 0 && answered === questions.length);

  function choose(qi: number, oi: number) {
    if (answers[qi] !== null) return;
    const next = [...answers];
    next[qi] = oi;
    answers = next;
    const c = next.reduce<number>((acc, a, i) => (a !== null && a === questions[i]?.correct ? acc + 1 : acc), 0);
    progress.recordQuiz(quizId, next, c, questions.length);
    requestMath();
  }

  function reset() {
    answers = questions.map(() => null);
    progress.resetQuiz(quizId);
  }

  function requestMath() {
    const el = document.getElementById(`quiz-${moduleId}`);
    if (el) void typesetWhenReady(el);
  }

  onMount(() => {
    // El quiz se monta antes de que el layout hidrate el store; hidratamos
    // aquí y recuperamos las respuestas guardadas de forma explícita.
    progress.hydrate();
    const saved = get(progress).quiz[quizId];
    if (saved?.answers?.length === questions.length && answers.every((a) => a === null)) {
      answers = [...saved.answers];
    }
    requestMath();
  });

  function optionClass(qi: number, oi: number) {
    if (answers[qi] === null) return '';
    if (oi === questions[qi].correct) return 'correct';
    if (answers[qi] === oi) return 'wrong';
    return 'dim';
  }
</script>

{#if questions.length}
  <section class="quiz" id={`quiz-${moduleId}`} aria-label="Cuestionario del módulo">
    <div class="quiz-head">
      <div class="qicon">?</div>
      <div>
        <h3>{title}</h3>
        <p>Feedback inmediato · Se guarda tu avance</p>
      </div>
      <div class="quiz-score">
        <b>{correct}/{questions.length}</b>
        <div>{answered} respondidas</div>
      </div>
    </div>
    <div class="quiz-body">
      {#each questions as q, qi (qi)}
        <div class="q-item">
          <div class="q-text"><span class="qn">{qi + 1}</span><span>{q.q}</span></div>
          <div class="q-options">
            {#each q.options as opt, oi (oi)}
              <button
                type="button"
                class={`q-opt ${optionClass(qi, oi)}`}
                disabled={answers[qi] !== null}
                onclick={() => choose(qi, oi)}
              >
                <span class="letter">{String.fromCharCode(65 + oi)}</span>
                <span>{opt}</span>
              </button>
            {/each}
          </div>
          {#if answers[qi] !== null}
            <div class={`q-feedback show ${answers[qi] === q.correct ? 'ok' : 'no'}`}>
              <b>{answers[qi] === q.correct ? 'Correcto.' : 'No exactamente.'}</b>
              {q.explain}
            </div>
          {/if}
        </div>
      {/each}
    </div>
    <div class="quiz-foot">
      <div class="quiz-progress">
        <div
          style={`height:100%;width:${(answered / questions.length) * 100}%;background:var(--accent);border-radius:99px;transition:width .3s`}
        ></div>
      </div>
      <span>{finished ? `Resultado: ${correct} de ${questions.length}` : 'Puedes reiniciar cuando quieras'}</span>
      <button class="btn tiny" type="button" onclick={reset}>Reiniciar</button>
    </div>
  </section>
{/if}
