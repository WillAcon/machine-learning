import { get, writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

export const theme = writable<Theme>('light');
export const sidebarOpen = writable(false);
export const searchOpen = writable(false);
export const activeLesson = writable<string | null>(null);

export function initTheme() {
  if (!browser) return;
  const saved = localStorage.getItem('mlcourse.theme') as Theme | null;
  const preferred: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(saved ?? preferred);
}

export function applyTheme(value: Theme) {
  if (browser) {
    document.documentElement.dataset.theme = value;
    localStorage.setItem('mlcourse.theme', value);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', value === 'dark' ? '#0b1526' : '#f7f5ef');
  }
  theme.set(value);
}

export function toggleTheme() {
  const current = get(theme);
  applyTheme(current === 'dark' ? 'light' : 'dark');
}
