# Curso de Machine Learning

Plataforma interactiva en español para estudiar Machine Learning de cero a producción. Cubre 12 módulos y 100 lecciones: fundamentos matemáticos, Python, ML clásico, deep learning, NLP, visión, MLOps y 10 proyectos guiados con datasets públicos.

El sitio es estático (SvelteKit + adapter-static) y está pensado para desplegarse en Vercel. El progreso, los quizzes, el examen y el tema se guardan en `localStorage`; no hay backend ni cuentas.

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Desarrollo local

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (por defecto `http://localhost:5173`).

## Verificación y build

```bash
npm run check     # svelte-check + TypeScript
npm run build     # genera el sitio estático en build/
npm run preview   # sirve build/ localmente
```

El build usa `@sveltejs/adapter-static` con `strict: true` y prerenderiza todas las rutas. La salida es:

```text
build/
├── index.html
├── modulos/*.html
├── examen.html
├── glosario.html
├── progreso.html
├── bibliografia.html
└── _app/...
```

## Despliegue en Vercel

### Opción A: desde GitHub (recomendada)

1. Crea un repositorio y sube el proyecto (sin `node_modules/`, `build/` ni `.svelte-kit/`).
2. En Vercel, elige **Add New → Project** e importa el repositorio.
3. Configura:
   - **Framework Preset:** SvelteKit
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`
4. Despliega. El archivo `vercel.json` ya fija el comando de build, el directorio `build`, `cleanUrls` para que `/modulos/nlp` resuelva a `modulos/nlp.html`, y desactiva la barra final.

### Opción B: desde la CLI

```bash
npm install -g vercel
vercel          # preview
vercel --prod   # producción
```

Vercel detecta SvelteKit y el directorio `build/` automáticamente. Si te pide configuración manual, usa los mismos valores de la opción A.

### Comprobaciones después del despliegue

- `/` carga el dashboard y muestra 12 módulos y 100 lecciones.
- `/modulos/proyectos` muestra los 10 proyectos y el quiz del módulo 11.
- `/modulos/vision-artificial#l-m9-l2` abre el simulador de convolución.
- Los enlaces del dashboard a simuladores llevan al ancla correcta.
- Recargar una ruta profunda (por ejemplo `/examen`) devuelve 200, no 404.
- El progreso persiste al recargar y al navegar entre módulos.

## Estructura del proyecto

```text
src/
├── app.css                       # sistema de diseño y estilos de simuladores/quizzes
├── app.html                      # shell HTML, tema inicial y carga de MathJax
├── lib/
│   ├── components/               # Sidebar, Topbar, SearchModal, Quiz, ProgressRing
│   ├── content/
│   │   ├── enhance.ts            # Prism, MathJax, copiar, quizzes, simuladores
│   │   └── modules/mod-0..11.html # contenido de las lecciones (HTML parcial)
│   ├── data/
│   │   ├── modules.ts            # metadatos, imports ?raw y extracción de lecciones
│   │   ├── quizzes.ts            # 4 preguntas por módulo
│   │   ├── exam.ts               # examen final de 30 preguntas
│   │   ├── glossary.ts           # glosario
│   │   └── search.ts             # índice de búsqueda
│   ├── simulators/               # canvas en TypeScript (9 simuladores)
│   └── stores/                   # progreso, tema, búsqueda, lección activa
└── routes/
    ├── +page.svelte              # dashboard
    ├── modulos/[slug]/           # render de módulos
    ├── examen/
    ├── glosario/
    ├── progreso/
    └── bibliografia/
```

## Contenido y convenciones

Cada lección es un `<article>` dentro de `src/lib/content/modules/mod-N.html`:

```html
<article class="lesson" id="l-m11-l1" data-title="Título de la lección">
  <div class="lesson-head">...</div>
  <div class="prose">...</div>
  <details class="exercise">...</details>
</article>
```

Reglas importantes:

- El `id` debe seguir el patrón `l-m< módulo >-l< lección >`; `modules.ts` lo usa para extraer lecciones y construir el TOC.
- El botón de completado usa `data-lesson="m< módulo >-l< lección >"` (sin el prefijo `l-`).
- El quiz del módulo se inserta con `<div class="quiz-mount" data-quiz="N"></div>`; si no existe, la página lo añade al final.
- Las fórmulas usan `$...$` o `$$...$$` y se procesan con MathJax.
- Los bloques de código usan `<pre><code class="language-python">...</code></pre>` y se resaltan con Prism.
- Los enlaces internos usan `/modulos/<slug>#l-mX-lY` para lecciones y `/modulos/<slug>` para módulos.

## Simuladores

Los simuladores están implementados en canvas y se inicializan desde `src/lib/simulators/index.ts`. Cada uno requiere su bloque `data-sim` y los IDs de sus controles:

| Simulador | Lección | IDs principales |
|---|---|---|
| Descenso del gradiente | `l-m1-l7` | `gdCanvas` |
| Overfitting | `l-m3-l6` | `overfitCanvas` |
| Regresión lineal | `l-m4-l2` | `lrCanvas` |
| Árbol de decisión | `l-m4-l7` | `treeCanvas` |
| K-Means | `l-m5-l2` | `kmCanvas` |
| PCA | `l-m5-l5` | `pcaCanvas` |
| Matriz de confusión | `l-m6-l2` | `cmCanvas` |
| Red neuronal | `l-m7-l2` | `nnCanvas` |
| Convolución | `l-m9-l2` | `convCanvas`, `convKernel`, `convAbs`, `convStats` |

## Datos y rigor

Los ejemplos y proyectos usan datasets públicos citados en la página de bibliografía (California Housing, 20 Newsgroups, Online Retail, SMS Spam Collection, Telco Churn, Fashion-MNIST, CIFAR-10, IMDB, MovieLens, Credit Card Fraud). No se presentan resultados inventados ni benchmarks oficiales. Antes de reutilizar un dataset, revisa su licencia y cita la fuente.

## Persistencia

- Progreso, quizzes, examen y tiempo: `localStorage` con clave `mlcourse.v2`.
- Tema: `localStorage` con clave `mlcourse.theme`.
- La hidratación ocurre en el cliente (`onMount`) para evitar desajustes de SSR.

Para reiniciar el avance, usa **Reiniciar progreso** en `/progreso`. Para exportar, usa el botón de exportación de esa misma página.
