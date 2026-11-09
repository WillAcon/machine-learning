import mod0 from '../content/modules/mod-0.html?raw';
import mod1 from '../content/modules/mod-1.html?raw';
import mod2 from '../content/modules/mod-2.html?raw';
import mod3 from '../content/modules/mod-3.html?raw';
import mod4 from '../content/modules/mod-4.html?raw';
import mod5 from '../content/modules/mod-5.html?raw';
import mod6 from '../content/modules/mod-6.html?raw';
import mod7 from '../content/modules/mod-7.html?raw';
import mod8 from '../content/modules/mod-8.html?raw';
import mod9 from '../content/modules/mod-9.html?raw';
import mod10 from '../content/modules/mod-10.html?raw';
import mod11 from '../content/modules/mod-11.html?raw';

export type Lesson = {
  id: string;
  number: string;
  title: string;
};

export type ModuleMeta = {
  id: number;
  slug: string;
  title: string;
  short: string;
  desc: string;
  lead: string;
  level: string;
  hours: number;
  tag: string;
  accent: string;
  chip: string;
  content: string;
  lessons: Lesson[];
};

type ModuleSeed = Omit<ModuleMeta, 'lessons' | 'content'> & { content: string };

const seeds: ModuleSeed[] = [
  {
    id: 0,
    slug: 'introduccion-ia',
    title: 'Introducción a la IA',
    short: 'Introducción a la IA',
    desc: 'Qué es la inteligencia artificial, cómo se relacionan IA, ML y DL, y qué problemas resuelve.',
    lead:
      'Antes de escribir una línea de código o derivar una función de pérdida, necesitamos un mapa conceptual: qué es la inteligencia artificial, qué lugar ocupan el Machine Learning y el Deep Learning, y por qué estas ideas cambiaron la tecnología en la última década.',
    level: 'Fundamentos',
    hours: 3,
    tag: 'Base',
    accent: '#3355c8',
    chip: 'Sin prerrequisitos',
    content: mod0
  },
  {
    id: 1,
    slug: 'fundamentos-matematicos',
    title: 'Fundamentos matemáticos',
    short: 'Fundamentos matemáticos',
    desc: 'Álgebra, álgebra lineal, cálculo, probabilidad y estadística explicados desde cero con aplicaciones en ML.',
    lead:
      'Los modelos de Machine Learning son objetos matemáticos: funciones, vectores, matrices y distribuciones. Este módulo construye esas herramientas desde cero, con ejemplos numéricos y su traducción directa a código Python. No se asume cálculo avanzado.',
    level: 'Fundamentos',
    hours: 18,
    tag: 'Matemáticas',
    accent: '#6b3fa0',
    chip: 'Con ejercicios resueltos',
    content: mod1
  },
  {
    id: 2,
    slug: 'python-para-ml',
    title: 'Python para ML',
    short: 'Python para ML',
    desc: 'Python moderno, NumPy, Pandas, Matplotlib y el flujo de trabajo en Jupyter/Colab.',
    lead:
      'Python es el idioma franco del ML por su ecosistema científico. Este módulo cubre lo esencial del lenguaje y las cuatro bibliotecas que usarás a diario: NumPy para cálculo numérico, Pandas para datos tabulares, Matplotlib y Seaborn para visualización.',
    level: 'Fundamentos',
    hours: 12,
    tag: 'Programación',
    accent: '#0e7c6b',
    chip: 'Código ejecutable en Colab',
    content: mod2
  },
  {
    id: 3,
    slug: 'fundamentos-ml',
    title: 'Fundamentos de ML',
    short: 'Fundamentos de ML',
    desc: 'Cómo aprende un modelo, datasets, pérdidas, generalización, overfitting y pipelines.',
    lead:
      'Aquí pasamos de las herramientas matemáticas al ciclo completo de aprendizaje: datos, hipótesis, pérdida, optimización y generalización. Estos conceptos son más importantes que cualquier algoritmo concreto: sobreviven a todas las modas.',
    level: 'Core',
    hours: 14,
    tag: 'Core',
    accent: '#3355c8',
    chip: 'Simulador de overfitting',
    content: mod3
  },
  {
    id: 4,
    slug: 'aprendizaje-supervisado',
    title: 'Aprendizaje supervisado',
    short: 'Aprendizaje supervisado',
    desc: 'Regresión y clasificación: de la regresión lineal a XGBoost, con teoría, código y criterios de elección.',
    lead:
      'El corazón del ML aplicado: predecir un valor continuo o una clase a partir de ejemplos etiquetados. Estudiaremos cada familia de algoritmos con su intuición, su formulación, su implementación y sus limitaciones reales.',
    level: 'Core',
    hours: 26,
    tag: 'Algoritmos',
    accent: '#a86a12',
    chip: '2 simuladores',
    content: mod4
  },
  {
    id: 5,
    slug: 'aprendizaje-no-supervisado',
    title: 'Aprendizaje no supervisado',
    short: 'No supervisado',
    desc: 'Clustering, K-Means, DBSCAN, PCA, detección de anomalías y autoencoders.',
    lead:
      'Sin etiquetas, el objetivo es descubrir estructura: grupos, direcciones de máxima varianza, patrones raros. Veremos cómo medir la calidad de un agrupamiento y cuándo un método no supervisado aporta valor real.',
    level: 'Core',
    hours: 16,
    tag: 'Algoritmos',
    accent: '#0e7c6b',
    chip: 'Simuladores K-Means y PCA',
    content: mod5
  },
  {
    id: 6,
    slug: 'evaluacion-modelos',
    title: 'Evaluación de modelos',
    short: 'Evaluación',
    desc: 'Matriz de confusión, precision, recall, F1, ROC-AUC, MAE, RMSE, R² y validación cruzada.',
    lead:
      'Un modelo no vale por lo que aprende, sino por lo que generaliza. Este módulo enseña a medir, comparar y seleccionar modelos con métricas alineadas al problema y experimentos estadísticamente honestos.',
    level: 'Core',
    hours: 14,
    tag: 'Metodología',
    accent: '#3355c8',
    chip: 'Calculadoras interactivas',
    content: mod6
  },
  {
    id: 7,
    slug: 'deep-learning',
    title: 'Redes neuronales y Deep Learning',
    short: 'Deep Learning',
    desc: 'Perceptrón, activaciones, backpropagation, optimizadores, CNN, RNN, LSTM y Transformers.',
    lead:
      'De la neurona artificial a los Transformers. Construiremos la intuición matemática del aprendizaje profundo: cómo fluye la información, cómo se calculan los gradientes y por qué las arquitecturas modernas funcionan.',
    level: 'Avanzado',
    hours: 24,
    tag: 'Deep Learning',
    accent: '#6b3fa0',
    chip: 'Simulador de red neuronal',
    content: mod7
  },
  {
    id: 8,
    slug: 'nlp',
    title: 'Procesamiento de lenguaje natural',
    short: 'NLP',
    desc: 'Tokenización, TF-IDF, embeddings, Word2Vec, atención, Transformers, BERT y LLMs.',
    lead:
      'El lenguaje es la interfaz más natural del conocimiento humano. Recorreremos el pipeline clásico de NLP hasta los modelos de lenguaje, entendiendo qué representa cada etapa y dónde están sus límites.',
    level: 'Avanzado',
    hours: 18,
    tag: 'NLP',
    accent: '#0e7c6b',
    chip: 'De TF-IDF a LLMs',
    content: mod8
  },
  {
    id: 9,
    slug: 'vision-artificial',
    title: 'Visión artificial',
    short: 'Visión artificial',
    desc: 'Imágenes, convoluciones, CNN, clasificación, detección de objetos y segmentación.',
    lead:
      'Cómo una máquina pasa de una matriz de píxeles a una interpretación del mundo: filtros, convoluciones, arquitecturas CNN y las tareas fundamentales de la visión moderna.',
    level: 'Avanzado',
    hours: 14,
    tag: 'Visión',
    accent: '#a86a12',
    chip: 'Demo de convolución',
    content: mod9
  },
  {
    id: 10,
    slug: 'mlops',
    title: 'MLOps y producción',
    short: 'MLOps',
    desc: 'Serialización, FastAPI, Docker, versionamiento, monitoreo, data drift y despliegue.',
    lead:
      'Un modelo en un notebook no genera valor. Este módulo cubre el ciclo de vida profesional: empaquetar, servir, versionar, monitorear y mantener modelos en producción sin que se degraden en silencio.',
    level: 'Avanzado',
    hours: 12,
    tag: 'Producción',
    accent: '#3355c8',
    chip: 'Código listo para desplegar',
    content: mod10
  },
  {
    id: 11,
    slug: 'proyectos',
    title: 'Proyectos prácticos',
    short: 'Proyectos',
    desc: 'Diez proyectos completos: vivienda, noticias, segmentación, spam, churn, imágenes, sentimiento, recomendación, anomalías y proyecto final.',
    lead:
      'Diez proyectos que integran todo el curso, desde la exploración de datos hasta la interpretación de resultados. Cada uno incluye objetivo, dataset público, pipeline, código y criterios de evaluación.',
    level: 'Integrador',
    hours: 30,
    tag: 'Proyectos',
    accent: '#b42318',
    chip: '10 proyectos guiados',
    content: mod11
  }
];

function decodeEntities(text: string): string {
  return text
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

function extractLessons(html: string): Lesson[] {
  const lessons: Lesson[] = [];
  const re = /<article\s+class="lesson"\s+id="(l-m(\d+)-l(\d+))"\s+data-title="([^"]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    lessons.push({
      id: match[1],
      number: `${match[2]}.${match[3]}`,
      title: decodeEntities(match[4])
    });
  }
  return lessons;
}

export const modules: ModuleMeta[] = seeds.map((seed) => ({
  ...seed,
  lessons: extractLessons(seed.content)
}));

export const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
export const totalHours = modules.reduce((acc, m) => acc + m.hours, 0);

export function getModule(slug: string): ModuleMeta | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getModuleById(id: number): ModuleMeta | undefined {
  return modules.find((m) => m.id === id);
}

export function getLesson(module: ModuleMeta, lessonId: string): Lesson | undefined {
  return module.lessons.find((l) => l.id === lessonId);
}

export function nextLesson(module: ModuleMeta, lessonId: string): Lesson | undefined {
  const i = module.lessons.findIndex((l) => l.id === lessonId);
  return i >= 0 ? module.lessons[i + 1] : undefined;
}

export function flatLessons(): Array<{ module: ModuleMeta; lesson: Lesson }> {
  return modules.flatMap((m) => m.lessons.map((l) => ({ module: m, lesson: l })));
}
