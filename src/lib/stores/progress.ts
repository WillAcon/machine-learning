import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import { modules, totalLessons } from '$lib/data/modules';

export type QuizResult = {
  answers: (number | null)[];
  correct: number;
  total: number;
  updated: number;
};

export type ExamResult = {
  best: number | null;
  last: number | null;
  attempts: number;
  byModule: Record<string, { correct: number; total: number }>;
  updated: number | null;
};

export type ProgressState = {
  completed: Record<string, boolean>;
  quiz: Record<string, QuizResult>;
  exam: ExamResult;
  lastRoute: string;
  lastLesson: string;
  timeSpent: number;
  updatedAt: number;
};

const STORAGE_KEY = 'mlcourse.v2';

const initialState: ProgressState = {
  completed: {},
  quiz: {},
  exam: { best: null, last: null, attempts: 0, byModule: {}, updated: null },
  lastRoute: '/',
  lastLesson: 'l-m0-l1',
  timeSpent: 0,
  updatedAt: 0
};

function createProgress() {
  const store = writable<ProgressState>(initialState);
  let saveTimer: ReturnType<typeof setTimeout> | null = null;
  let hydrated = false;

  // Solo guardamos después de hidratar para no sobrescribir el progreso
  // guardado con el estado vacío del render del servidor.
  store.subscribe((value) => {
    if (!browser || !hydrated) return;
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...value, updatedAt: Date.now() }));
      } catch {
        // localStorage puede estar lleno o bloqueado; no rompemos la app.
      }
    }, 120);
  });

  function mutate(fn: (state: ProgressState) => ProgressState) {
    store.update((state) => fn(state));
  }

  return {
    subscribe: store.subscribe,
    hydrate() {
      if (!browser || hydrated) return;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<ProgressState>;
          store.set({
            ...initialState,
            ...parsed,
            completed: parsed.completed ?? {},
            quiz: parsed.quiz ?? {},
            exam: { ...initialState.exam, ...(parsed.exam ?? {}) }
          });
        }
      } catch {
        // Ignoramos JSON corrupto y arrancamos desde cero.
      }
      hydrated = true;
    },
    toggleLesson(id: string) {
      mutate((s) => {
        const completed = { ...s.completed };
        if (completed[id]) delete completed[id];
        else completed[id] = true;
        return { ...s, completed };
      });
    },
    markLesson(id: string, value = true) {
      mutate((s) => ({ ...s, completed: { ...s.completed, [id]: value } }));
    },
    recordQuiz(quizId: string, answers: (number | null)[], correct: number, total: number) {
      mutate((s) => ({
        ...s,
        quiz: {
          ...s.quiz,
          [quizId]: { answers, correct, total, updated: Date.now() }
        }
      }));
    },
    resetQuiz(quizId: string) {
      mutate((s) => {
        const quiz = { ...s.quiz };
        delete quiz[quizId];
        return { ...s, quiz };
      });
    },
    recordExam(score: number, byModule: Record<string, { correct: number; total: number }>) {
      mutate((s) => ({
        ...s,
        exam: {
          best: s.exam.best === null ? score : Math.max(s.exam.best, score),
          last: score,
          attempts: s.exam.attempts + 1,
          byModule,
          updated: Date.now()
        }
      }));
    },
    setLastRoute(route: string, lesson?: string) {
      mutate((s) => ({
        ...s,
        lastRoute: route,
        lastLesson: lesson ?? s.lastLesson
      }));
    },
    addTime(seconds: number) {
      mutate((s) => ({ ...s, timeSpent: s.timeSpent + seconds }));
    },
    resetAll() {
      store.set({ ...initialState, updatedAt: Date.now() });
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Sin acceso a localStorage.
      }
    },
    exportJSON(): string {
      return JSON.stringify(get(store), null, 2);
    }
  };
}

export const progress = createProgress();

export const completedCount = derived(progress, ($p) =>
  totalLessons > 0 ? Object.values($p.completed).filter(Boolean).length : 0
);

export const overallPct = derived(completedCount, ($n) =>
  totalLessons > 0 ? Math.round(($n / totalLessons) * 100) : 0
);

export const quizAverage = derived(progress, ($p) => {
  const values = Object.values($p.quiz);
  if (!values.length) return null;
  return Math.round(
    (values.reduce((a, q) => a + q.correct / Math.max(1, q.total), 0) / values.length) * 100
  );
});

export function moduleStats(moduleId: number, state: ProgressState) {
  const module = modules.find((m) => m.id === moduleId);
  if (!module) return { done: 0, total: 0, pct: 0 };
  const done = module.lessons.filter((l) => state.completed[l.id]).length;
  return {
    done,
    total: module.lessons.length,
    pct: module.lessons.length ? Math.round((done / module.lessons.length) * 100) : 0
  };
}

export function nextIncomplete(state: ProgressState) {
  for (const module of modules) {
    for (const lesson of module.lessons) {
      if (!state.completed[lesson.id]) {
        return { module, lesson };
      }
    }
  }
  return null;
}
