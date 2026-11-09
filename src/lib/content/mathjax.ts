let queue: Promise<void> = Promise.resolve();

async function run(target: HTMLElement | HTMLElement[]) {
  const elements = Array.isArray(target) ? target : [target];

  for (let i = 0; i < 60; i++) {
    if (window.MathJax?.typesetPromise) break;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  try {
    if (window.MathJax?.startup?.promise) await window.MathJax.startup.promise;
    await window.MathJax?.typesetPromise?.(elements);
  } catch {
    // Si MathJax falla o no está disponible, el LaTeX sigue siendo legible.
  }
}

/**
 * Tipografía MathJax de forma segura: espera a que el script esté listo y
 * serializa las llamadas para no ejecutar dos tiposets concurrentes.
 */
export function typesetWhenReady(target: HTMLElement | HTMLElement[]): Promise<void> {
  const next = queue.then(() => run(target));
  queue = next.catch(() => {});
  return next;
}
