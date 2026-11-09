/// <reference types="vite/client" />

declare module '*.html?raw' {
  const content: string;
  export default content;
}

declare module 'prismjs/components/*';

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: Array<HTMLElement | string>) => Promise<void>;
      typeset?: (elements?: Array<HTMLElement | string>) => void;
      startup?: { promise: Promise<void> };
    };
    Prism?: {
      highlightAllUnder?: (element: Element) => void;
      highlightElement?: (element: Element) => void;
    };
  }
  namespace App {}
}

export {};
