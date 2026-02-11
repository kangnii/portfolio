import { useEffect } from 'react';

export function useCursorGlow(){
  useEffect(() => {
    const root = document.documentElement;
    const handler = (e) => {
      root.style.setProperty('--x', `${e.clientX}px`);
      root.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', handler, { passive: true });
    return () => window.removeEventListener('pointermove', handler);
  }, []);
}
