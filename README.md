# Curso de Machine Learning

Plataforma interactiva en español para estudiar Machine Learning de cero a producción. Cubre **12 módulos, 100 lecciones, 12 quizzes, un examen final de 30 preguntas, un glosario de 110 términos, 9 simuladores y 9 proyectos guiados más un proyecto final integrador**, con datasets públicos y código en Python.

El sitio es estático: SvelteKit con `@sveltejs/adapter-static` genera HTML prerenderizado en `build/`, listo para Vercel. El progreso, los quizzes, el examen y el tema se guardan en `localStorage`; no hay backend ni cuentas. MathJax y las fuentes se cargan desde CDN.

También es una **PWA instalable**: incluye manifest, service worker, iconos y una página offline. En Android/escritorio aparece un botón de instalación en la barra superior; en iPhone/iPad se instala desde Safari con **Compartir → Añadir a pantalla de inicio**.

**Versión:** `v1.0.0` · **Estado:** completa y verificada (`npm run check` y `npm run build` sin errores).

## Contenido del curso

| # | Módulo | Slug | Lecciones | Horas |
|---:|---|---|---:|---:|
| 0 | Introducción a la IA | `introduccion-ia` | 5 | 3 |
| 1 | Fundamentos matemáticos | `fundamentos-matematicos` | 10 | 18 |
| 2 | Python para ML | `python-para-ml` | 7 | 12 |
| 3 | Fundamentos de ML | `fundamentos-ml` | 7 | 14 |
| 4 | Aprendizaje supervisado | `aprendizaje-supervisado` | 11 | 26 |
| 5 | Aprendizaje no supervisado | `aprendizaje-no-supervisado` | 8 | 16 |
| 6 | Evaluación de modelos | `evaluacion-modelos` | 8 | 14 |
| 7 | Redes neuronales y Deep Learning | `deep-learning` | 10 | 24 |
| 8 | Procesamiento de lenguaje natural | `nlp` | 8 | 18 |
| 9 | Visión artificial | `vision-artificial` | 8 | 14 |
| 10 | MLOps y producción | `mlops` | 8 | 12 |
| 11 | Proyectos prácticos | `proyectos` | 10 | 30 |

Cada lección incluye intuición, definición formal, fórmulas en LaTeX, ejemplo numérico, aplicación a Machine Learning, código Python y ejercicios. Los módulos 0–11 terminan con un quiz de cuatro preguntas con feedback inmediato.

## Stack

| Pieza | Versión / uso |
|---|---|
| SvelteKit | `2.70.4` |
| Svelte | `5.57.3` (runes: `$state`, `$derived`, `$props`, `$effect`) |
| Vite | `7.3.8` |
| TypeScript | `5.9.3` |
| Adaptador | `@sveltejs/adapter-static` `3.0.11` |
| Resaltado de código | Prism.js `1.30.0` |
| Matemáticas | MathJax 3 desde CDN |
| Simuladores | Canvas 2D + TypeScript, sin dependencias de gráficos |

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (por defecto `http://localhost:5173`).

### Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente. |
| `npm run check` | `svelte-kit sync` + `svelte-check` + TypeScript. |
| `npm run build` | Genera el sitio estático en `build/`. |
| `npm run preview` | Sirve `build/` localmente para probar el artefacto final. |
| `npm run check:watch` | Igual que `check`, en modo observación. |

El build usa `adapter-static` con `strict: true` y prerenderiza todas las rutas. La salida es:

```text
build/
├── index.html
├── modulos/*.html
├── examen.html
├── glosario.html
├── progreso.html
├── bibliografia.html
├── 404.html
└── _app/...
```

## Estructura del proyecto

```text
.
├── src/
│   ├── app.css                         # sistema de diseño: layout, temas, quizzes, simuladores
│   ├── app.d.ts                        # tipos globales (MathJax, Prism, imports ?raw)
│   ├── app.html                        # shell HTML, tema inicial y configuración de MathJax
│   ├── prism.d.ts                      # tipos de los componentes de Prism
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ProgressRing.svelte     # anillo de progreso del dashboard
│   │   │   ├── Quiz.svelte             # quiz de módulo con feedback y persistencia
│   │   │   ├── SearchModal.svelte      # búsqueda global (⌘K / Ctrl K)
│   │   │   ├── Sidebar.svelte          # navegación, progreso y lecciones
│   │   │   └── Topbar.svelte           # menú móvil, búsqueda y tema
│   │   ├── content/
│   │   │   ├── enhance.ts              # Prism, MathJax, copiar, quiz-mount, simuladores
│   │   │   ├── mathjax.ts              # cola serializada de typeset
│   │   │   └── modules/
│   │   │       ├── mod-0.html          # Introducción a la IA
│   │   │       ├── mod-1.html          # Fundamentos matemáticos
│   │   │       ├── mod-2.html          # Python para ML
│   │   │       ├── mod-3.html          # Fundamentos de ML
│   │   │       ├── mod-4.html          # Aprendizaje supervisado
│   │   │       ├── mod-5.html          # Aprendizaje no supervisado
│   │   │       ├── mod-6.html          # Evaluación de modelos
│   │   │       ├── mod-7.html          # Deep Learning
│   │   │       ├── mod-8.html          # NLP
│   │   │       ├── mod-9.html          # Visión artificial
│   │   │       ├── mod-10.html         # MLOps
│   │   │       └── mod-11.html         # Proyectos
│   │   ├── data/
│   │   │   ├── modules.ts              # metadatos, imports ?raw y extracción de lecciones
│   │   │   ├── quizzes.ts              # 4 preguntas por módulo
│   │   │   ├── exam.ts                 # examen final de 30 preguntas
│   │   │   ├── glossary.ts             # glosario de términos
│   │   │   └── search.ts               # índice de búsqueda de lecciones y secciones
│   │   ├── simulators/
│   │   │   ├── index.ts                # registro e inicialización de simuladores
│   │   │   ├── util.ts                 # canvas, colores, matemáticas y PRNG
│   │   │   ├── gd.ts                   # descenso del gradiente
│   │   │   ├── overfit.ts              # overfitting / bias-variance
│   │   │   ├── linear.ts               # regresión lineal
│   │   │   ├── tree.ts                 # árbol de decisión
│   │   │   ├── kmeans.ts               # K-Means
│   │   │   ├── pca.ts                  # PCA
│   │   │   ├── confusion.ts            # matriz de confusión
│   │   │   ├── neural.ts               # red neuronal
│   │   │   └── conv.ts                 # convolución
│   │   └── stores/
│   │       ├── progress.ts             # progreso, quizzes, examen, tiempo y exportación
│   │       ├── pwa.ts                  # instalación, service worker y detección de iOS
│   │       └── ui.ts                   # tema, sidebar, búsqueda y lección activa
│   └── routes/
│       ├── +error.svelte               # página de error
│       ├── +layout.svelte              # shell: sidebar, topbar, búsqueda y atajos
│       ├── +layout.ts                  # prerender, SSR y trailingSlash
│       ├── +page.svelte                # dashboard: ruta, progreso y simuladores
│       ├── bibliografia/+page.svelte   # libros, documentación y datasets
│       ├── examen/+page.svelte         # examen final y resultados por módulo
│       ├── glosario/+page.svelte       # glosario filtrable
│       ├── modulos/[slug]/+page.svelte # render de módulos, TOC y navegación
│       ├── modulos/[slug]/+page.ts     # validación del slug y carga de datos
│       └── progreso/+page.svelte       # estadísticas, exportar y reiniciar
├── static/
│   ├── favicon.svg
│   ├── manifest.webmanifest            # nombre, colores, iconos y shortcuts de la PWA
│   ├── offline.html                    # fallback cuando no hay red ni caché de la ruta
│   ├── sw.js                           # service worker (network-first + caché)
│   └── icons/
│       ├── icon.svg                    # fuente vectorial del icono
│       ├── icon-maskable.svg           # fuente con zona segura para Android
│       ├── icon-192.png                # icono PWA 192×192
│       ├── icon-512.png                # icono PWA 512×512
│       ├── icon-maskable-512.png       # icono maskable 512×512
│       └── apple-touch-icon.png        # icono iOS 180×180
├── package.json
├── package-lock.json
├── svelte.config.js                    # adapter-static, aliases y prerender
├── tsconfig.json
├── vite.config.ts
├── vercel.json                         # build estático y cleanUrls
└── README.md
```

`legacy/` contiene material previo del curso y está excluido por `.gitignore`; no forma parte del sitio actual. Tampoco se versionan `node_modules/`, `build/` ni `.svelte-kit/`.

## Rutas del sitio

| Ruta | Contenido |
|---|---|
| `/` | Dashboard, progreso global, ruta de aprendizaje y simuladores. |
| `/modulos/<slug>` | Módulo completo con lecciones, TOC, progreso y quiz. |
| `/modulos/<slug>#l-mX-lY` | Enlace directo a una lección concreta. |
| `/examen` | Examen final de 30 preguntas; guarda el mejor resultado. |
| `/glosario` | Glosario de conceptos con búsqueda. |
| `/progreso` | Estadísticas, exportación y reinicio del avance. |
| `/bibliografia` | Libros, documentación oficial, artículos y datasets. |

Ejemplos:

- `/modulos/proyectos`
- `/modulos/vision-artificial#l-m9-l2` (simulador de convolución)
- `/modulos/aprendizaje-no-supervisado#l-m5-l5` (simulador de PCA)

## Contenido y convenciones

Cada lección es un `<article>` dentro de `src/lib/content/modules/mod-N.html`:

```html
<article class="lesson" id="l-m11-l1" data-title="Título de la lección">
  <div class="lesson-head">
    <div class="lesson-head-text">
      <div class="lesson-kicker">Proyecto 11.1</div>
      <h2>Título de la lección</h2>
      <div class="lesson-meta"><span>30 min</span><span class="sep"></span><span>Tema</span></div>
    </div>
    <button class="complete-btn" data-lesson="m11-l1">
      <span class="box">✓</span><span class="lbl">Marcar completada</span>
    </button>
  </div>
  <div class="prose">...</div>
  <details class="exercise">...</details>
</article>
```

Reglas importantes:

- El `id` debe seguir el patrón `l-m< módulo >-l< lección >`; `modules.ts` lo usa para extraer lecciones, construir el TOC y guardar el progreso.
- El botón de completado usa `data-lesson="m< módulo >-l< lección >"` (sin el prefijo `l-`).
- El quiz del módulo se inserta con `<div class="quiz-mount" data-quiz="N"></div>`; si no existe, la página lo añade al final.
- Las fórmulas usan `$...$` o `$$...$$` y se procesan con MathJax después de la hidratación.
- Los bloques de código usan `<pre><code class="language-python">...</code></pre>` y se resaltan con Prism.
- Los enlaces internos usan `/modulos/<slug>#l-mX-lY` para lecciones y `/modulos/<slug>` para módulos.
- Los simuladores se insertan con `<div class="sim" data-sim="...">` y sus controles deben conservar los IDs que espera cada módulo de `src/lib/simulators/`.

### Añadir o modificar una lección

1. Añade el `<article>` con un `id` nuevo en el `mod-N.html` correspondiente.
2. Añade el botón `complete-btn` con el `data-lesson` correcto.
3. Si la lección cierra el módulo, conserva el `quiz-mount`.
4. Actualiza las preguntas en `src/lib/data/quizzes.ts` si cambia el quiz.
5. Ejecuta `npm run check` y `npm run build`; la lección aparece automáticamente en el TOC y en la búsqueda.

## Simuladores

Los simuladores están implementados en Canvas 2D y se inicializan desde `src/lib/simulators/index.ts`. Cada uno requiere su bloque `data-sim` y los IDs de sus controles:

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

## Búsqueda, tema y accesibilidad

- Búsqueda global con `⌘K` en macOS o `Ctrl K` en Windows/Linux; `Escape` cierra el buscador y los overlays.
- Tema claro/oscuro persistente; el tema inicial se aplica antes de hidratar para evitar parpadeos.
- Navegación con teclado en el buscador (`↑`, `↓`, `Enter`, `Escape`).
- Layout responsive con sidebar deslizante en móvil; probado sin desbordamiento de botones a 320, 360 y 390 px.
- Las fórmulas se tipografían de forma serializada para evitar errores de hidratación.

## Aplicación instalable (PWA)

La app se puede instalar y usar sin barra de navegador. La configuración vive en:

- `static/manifest.webmanifest`: nombre, `start_url`, `display: standalone`, colores, iconos y atajos a examen/glosario.
- `static/sw.js`: service worker con estrategia mixta:
  - Navegaciones HTML: **network-first**, con la copia en caché como respaldo.
  - Assets con hash de `/_app/immutable/`: **cache-first**.
  - Recursos estables e iconos: **stale-while-revalidate**.
  - Sin red y sin copia de la ruta: muestra `static/offline.html`.
- `static/icons/`: iconos 192, 512, maskable y Apple Touch.
- `src/lib/stores/pwa.ts`: captura `beforeinstallprompt`, registra `/sw.js` en producción y detecta iOS.

### Instalar

- **Android / Chrome / Edge / escritorio:** pulsa el icono de descarga que aparece en la barra superior cuando el navegador ofrece la instalación. También puedes usar el menú del navegador → **Instalar aplicación**.
- **iPhone / iPad:** abre el sitio en Safari, toca **Compartir** y elige **Añadir a pantalla de inicio**. El dashboard muestra un aviso con estas instrucciones en iOS.
- **Localhost:** la instalación solo se ofrece en `https://` o `localhost`; usa `npm run build && npm run preview`. En `npm run dev` el service worker no se registra para no interferir con la recarga en caliente.

### Actualizar la PWA

- El HTML se pide primero a la red, así que un deploy nuevo se ve al recargar.
- Si cambias la estrategia del service worker, sube `CACHE_VERSION` en `static/sw.js` para eliminar cachés antiguas.
- `vercel.json` sirve `/sw.js` con `max-age=0, must-revalidate` y `Service-Worker-Allowed: /` para que el navegador detecte actualizaciones y el scope sea la raíz.

El modo offline conserva las páginas que ya visitaste. Una ruta nueva sin conexión muestra la página de aviso; no se precargan los 12 módulos completos para no descargar varios megabytes en la instalación.

## Persistencia

- Progreso, quizzes, examen, última ruta, última lección y tiempo: `localStorage` con clave `mlcourse.v2`.
- Tema: `localStorage` con clave `mlcourse.theme`.
- El layout hidrata el progreso en `onMount`; el quiz hidrata explícitamente al montarse para restaurar respuestas guardadas. Las escrituras se activan solo después de la hidratación para no sobrescribir el avance.
- El progreso es local al navegador y dispositivo; no se sincroniza entre equipos.

Para reiniciar el avance, usa **Reiniciar progreso** en `/progreso`. Para exportar, usa el botón de exportación de esa misma página.

## Datos y rigor

Los ejemplos y proyectos usan datasets públicos citados en `/bibliografia`:

- California Housing
- 20 Newsgroups
- Online Retail (UCI)
- SMS Spam Collection (UCI)
- Telco Customer Churn (Kaggle)
- Fashion-MNIST
- CIFAR-10 (extensión opcional)
- IMDB Movie Reviews
- MovieLens 100K
- Credit Card Fraud Detection (ULB / UCI)

No se presentan resultados experimentales inventados ni benchmarks oficiales. Antes de reutilizar un dataset, revisa su licencia y cita la fuente. Los ejemplos numéricos del curso son didácticos y los proyectos indican qué resultados debe medir el estudiante.

## Despliegue en Vercel

### Opción A: desde GitHub (recomendada)

1. Crea un repositorio y sube el proyecto. No incluyas `node_modules/`, `build/` ni `.svelte-kit/`.
2. En Vercel, elige **Add New → Project** e importa el repositorio.
3. Configura:
   - **Framework Preset:** Other (el proyecto es estático; `vercel.json` fija `framework: null`)
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`
4. Despliega. `vercel.json` ya fija el comando, el directorio de salida, `cleanUrls` para que `/modulos/nlp` resuelva a `modulos/nlp.html`, y desactiva la barra final.

### Opción B: desde la CLI

```bash
npm install -g vercel
vercel          # preview
vercel --prod   # producción
```

Vercel usa la configuración de `vercel.json`. Si te pide valores manuales, usa los mismos de la opción A.

### Comprobaciones después del despliegue

- `/` carga el dashboard con 12 módulos y 100 lecciones.
- `/modulos/proyectos` muestra los 9 proyectos guiados, el proyecto final y el quiz del módulo 11.
- `/modulos/vision-artificial#l-m9-l2` abre el simulador de convolución.
- Recargar una ruta profunda (por ejemplo `/examen`) devuelve 200, no 404.
- El progreso y las respuestas de quiz persisten al recargar y al navegar entre módulos.
- El tema claro/oscuro se conserva y el menú móvil abre y cierra correctamente.

## Verificación

```bash
npm run check
npm run build
npm run preview
```

Estado verificado de esta versión:

- `svelte-check`: **0 errores, 0 advertencias**.
- Build estático: **12 páginas de módulo, 100 lecciones, 12 quiz-mounts** y `404.html`.
- Pruebas de interacción en Chrome headless: **13/13** (persistencia de lecciones y quizzes, tema, búsqueda, `Escape`, layout móvil y sidebar).
- PWA: manifest parseado sin errores, `Page.getInstallabilityErrors` vacío, service worker activo y controlando la página, botón de instalación disponible y los cuatro iconos responden 200.
- Offline real con el servidor detenido: una lección visitada sigue abriendo y una ruta nueva muestra `offline.html`.
- Responsive: sin desbordamiento de botones ni scroll horizontal a 320, 360 y 390 px en dashboard, módulos, examen, progreso, glosario y bibliografía.

## Solución de problemas

- **Una ruta profunda devuelve 404 en Vercel:** revisa que `cleanUrls` esté activo y que `trailingSlash` sea `false`; ambos están en `vercel.json`.
- **Las fórmulas no se renderizan:** MathJax se carga desde CDN; comprueba la conexión y la consola del navegador.
- **El progreso no aparece:** verifica que el navegador permita `localStorage` y que no estés en modo privado con almacenamiento bloqueado.
- **Un simulador no responde:** confirma que el bloque `data-sim` y los IDs de controles coinciden con los de `src/lib/simulators/`.
- **No aparece el botón de instalar:** la PWA requiere HTTPS o `localhost`, un manifest válido y un service worker activo. En iOS no existe `beforeinstallprompt`: usa Safari → Compartir → Añadir a pantalla de inicio.
- **Un deploy nuevo no se refleja:** recarga una vez para que el service worker actualice la caché. Si cambiaste la estrategia, sube `CACHE_VERSION` en `static/sw.js`.
- **Una ruta no abre sin conexión:** solo se guardan las páginas que ya visitaste; las demás muestran `offline.html`.
