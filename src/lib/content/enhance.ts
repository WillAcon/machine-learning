import { mount, unmount } from 'svelte';
import Quiz from '$lib/components/Quiz.svelte';
import { progress } from '$lib/stores/progress';
import { activeLesson } from '$lib/stores/ui';
import { initSimulators } from '$lib/simulators';
import { typesetWhenReady } from './mathjax';

type QuizInstance = Record<string, any>;

let prismPromise: Promise<any> | null = null;

async function loadPrism() {
  if (prismPromise) return prismPromise;
  prismPromise = (async () => {
    const mod = await import('prismjs');
    const Prism = mod.default;
    (window as any).Prism = Prism;
    await import('prismjs/components/prism-python');
    await import('prismjs/components/prism-bash');
    await import('prismjs/components/prism-json');
    await import('prismjs/components/prism-yaml');
    await import('prismjs/components/prism-sql');
    await import('prismjs/components/prism-typescript');
    await import('prismjs/components/prism-markup-templating');
    await import('prismjs/components/prism-java');
    await import('prismjs/components/prism-c');
    await import('prismjs/components/prism-cpp');
    return Prism;
  })();
  return prismPromise;
}

async function typeset(el: HTMLElement) {
  await typesetWhenReady(el);
}

/**
 * Acción de Svelte que mejora el HTML estático de una lección:
 * resaltado de código, MathJax, botones de copia, quizzes y simuladores.
 */
export function enhanceContent(node: HTMLElement, moduleId: number) {
  const quizzes: QuizInstance[] = [];
  let disposed = false;

  // Montar quizzes de Svelte en los marcadores del contenido.
  node.querySelectorAll<HTMLElement>('.quiz-mount').forEach((mountPoint) => {
    mountPoint.innerHTML = '';
    const instance = mount(Quiz, {
      target: mountPoint,
      props: { moduleId }
    });
    quizzes.push(instance);
  });

  // Resaltado de sintaxis.
  loadPrism().then((Prism) => {
    if (disposed) return;
    node.querySelectorAll<HTMLElement>('pre code').forEach((code) => {
      try {
        Prism.highlightElement(code);
      } catch {
        // Un bloque con lenguaje desconocido no debe romper la página.
      }
    });
  });

  // Botones de copiar.
  function onClick(ev: Event) {
    const target = ev.target as HTMLElement | null;
    const copyBtn = target?.closest<HTMLButtonElement>('.copy-btn');
    if (copyBtn) {
      const block = copyBtn.closest('.code-block');
      const code = block?.querySelector('pre code') ?? block?.querySelector('pre');
      if (!code) return;
      const text = (code as HTMLElement).innerText;
      const done = () => {
        copyBtn.classList.add('copied');
        copyBtn.textContent = 'Copiado';
        window.setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.textContent = 'Copiar';
        }, 1600);
      };
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
      } else {
        fallbackCopy(text, done);
      }
      return;
    }

    const completeBtn = target?.closest<HTMLButtonElement>('.complete-btn');
    if (completeBtn) {
      const lesson = completeBtn.dataset.lesson;
      if (lesson) progress.toggleLesson(`l-${lesson}`);
    }
  }

  node.addEventListener('click', onClick);

  // Sincronizar estado de los botones de completado.
  function refresh() {
    const state = getProgress();
    node.querySelectorAll<HTMLButtonElement>('.complete-btn').forEach((btn) => {
      const id = btn.dataset.lesson ? `l-${btn.dataset.lesson}` : '';
      const done = !!state.completed[id];
      btn.classList.toggle('is-done', done);
      const label = btn.querySelector<HTMLElement>('.lbl');
      if (label) label.textContent = done ? 'Completada' : 'Marcar completada';
      btn.setAttribute('aria-pressed', String(done));
    });
  }
  const unsubscribe = progress.subscribe(refresh);

  // Simuladores y MathJax después de que el DOM esté listo.
  queueMicrotask(() => {
    initSimulators(node);
    void typeset(node).then(() => {
      if (disposed) return;
      const hash = decodeURIComponent(window.location.hash.replace('#', ''));
      if (hash) {
        const el = document.getElementById(hash);
        if (el) window.setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
      }
    });
  });

  // Scroll-spy: resalta la lección visible en la barra lateral.
  const articles = Array.from(node.querySelectorAll<HTMLElement>('article.lesson'));
  let raf = 0;
  function spy() {
    raf = 0;
    if (!articles.length) return;
    let current = articles[0].id;
    for (const article of articles) {
      const top = article.getBoundingClientRect().top;
      if (top <= 120) current = article.id;
      else break;
    }
    activeLesson.set(current);
  }
  function onScroll() {
    if (!raf) raf = window.requestAnimationFrame(spy);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  spy();

  return {
    update(nextModuleId: number) {
      if (nextModuleId !== moduleId) {
        // No se espera reutilizar la acción entre módulos, pero evitamos
        // dejar quizzes con el id anterior.
        moduleId = nextModuleId;
        quizzes.forEach((q) => unmount(q));
        quizzes.length = 0;
        node.querySelectorAll<HTMLElement>('.quiz-mount').forEach((mountPoint) => {
          mountPoint.innerHTML = '';
          quizzes.push(mount(Quiz, { target: mountPoint, props: { moduleId } }));
        });
      }
    },
    destroy() {
      disposed = true;
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      node.removeEventListener('click', onClick);
      unsubscribe();
      quizzes.forEach((q) => unmount(q));
    }
  };
}

function fallbackCopy(text: string, done: () => void) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    done();
  } finally {
    ta.remove();
  }
}

// Importar `get` de forma diferida evita acoplar la acción al store en SSR.
import { get } from 'svelte/store';
function getProgress() {
  return get(progress);
}
