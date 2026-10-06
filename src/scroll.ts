let cancel: (() => void) | null = null;

/** Smooth, eased scroll that we control (so scroll-driven scenes play evenly). Any user input stops it. */
export function animateScroll(to: number, ms: number) {
  cancel?.();
  const from = window.scrollY, d = to - from, t0 = performance.now();
  let raf = 0;
  const stop = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('wheel', stop);
    window.removeEventListener('touchstart', stop);
    window.removeEventListener('keydown', stop);
    cancel = null;
  };
  const step = (n: number) => {
    const t = Math.min((n - t0) / ms, 1);
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    window.scrollTo({ top: from + d * e, behavior: 'instant' as ScrollBehavior });
    if (t < 1) raf = requestAnimationFrame(step); else stop();
  };
  window.addEventListener('wheel', stop, { passive: true });
  window.addEventListener('touchstart', stop, { passive: true });
  window.addEventListener('keydown', stop);
  cancel = stop;
  raf = requestAnimationFrame(step);
}
