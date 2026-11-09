import { modules } from '$lib/data/modules';

export type SearchEntry = {
  href: string;
  module: string;
  title: string;
  text: string;
  kind: 'lesson' | 'section' | 'page';
};

function stripTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  for (const module of modules) {
    for (const lesson of module.lessons) {
      entries.push({
        href: `/modulos/${module.slug}#${lesson.id}`,
        module: `Módulo ${module.id}`,
        title: `${lesson.number} · ${lesson.title}`,
        text: module.short,
        kind: 'lesson'
      });
    }
    // Secciones internas: cada h2/h3 dentro de una lección es navegable
    // hasta la lección que la contiene.
    const articleRe = /<article[^>]*id="(l-m\d+-l\d+)"[^>]*>([\s\S]*?)<\/article>/g;
    let article: RegExpExecArray | null;
    while ((article = articleRe.exec(module.content)) !== null) {
      const lessonId = article[1];
      const body = article[2];
      const headingRe = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/g;
      let heading: RegExpExecArray | null;
      while ((heading = headingRe.exec(body)) !== null) {
        const title = stripTags(heading[2]);
        if (!title || title.length > 90) continue;
        const after = body.slice(heading.index + heading[0].length, heading.index + heading[0].length + 800);
        entries.push({
          href: `/modulos/${module.slug}#${lessonId}`,
          module: `Módulo ${module.id} · ${module.short}`,
          title,
          text: stripTags(after).slice(0, 160),
          kind: 'section'
        });
      }
    }
  }
  entries.push(
    { href: '/examen', module: 'Evaluación', title: 'Examen final', text: 'Evaluación global de 30 preguntas con retroalimentación.', kind: 'page' },
    { href: '/glosario', module: 'Referencia', title: 'Glosario', text: 'Definiciones de los conceptos clave del curso.', kind: 'page' },
    { href: '/bibliografia', module: 'Referencia', title: 'Bibliografía y recursos', text: 'Libros, cursos, documentación y datasets públicos.', kind: 'page' },
    { href: '/progreso', module: 'Panel', title: 'Mi progreso', text: 'Estadísticas, avance por módulo y resultados.', kind: 'page' }
  );
  return entries;
}

export const searchIndex = buildIndex();

export function searchCourse(query: string, limit = 18): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const scored = searchIndex
    .map((entry) => {
      const title = entry.title.toLowerCase();
      const text = entry.text.toLowerCase();
      let score = 0;
      for (const term of terms) {
        if (title.startsWith(term)) score += 8;
        else if (title.includes(term)) score += 5;
        if (text.includes(term)) score += 2;
        if (entry.module.toLowerCase().includes(term)) score += 1;
      }
      return { entry, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return scored.map((x) => x.entry);
}
