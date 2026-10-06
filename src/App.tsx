import { useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import DoorWork from './components/DoorWork';
import About from './components/About';
import DitherDissolve from './components/DitherDissolve';
import Contact from './components/Contact';

export default function App() {
  useEffect(() => {
    const hero = document.getElementById('top') as HTMLElement;
    const nav = document.getElementById('nav') as HTMLElement;
    const secs = Array.from(document.querySelectorAll<HTMLElement>('[data-theme]'));
    let tick = false;
    const onScroll = () => {
      tick = false;
      const p = Math.min(Math.max(window.scrollY / (hero.offsetHeight * 0.9), 0), 1);
      hero.style.setProperty('--d', p.toFixed(3));
      let dark = false;
      secs.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= 30 && r.bottom > 30) dark = s.dataset.theme === 'dark' || (s === hero && p > 0.45);
      });
      nav.classList.toggle('dk', dark);
      document.body.classList.toggle('dk', dark);
    };
    const onS = () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } };
    window.addEventListener('scroll', onS, { passive: true });
    onScroll();

    const rio = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.2 });
    document.querySelectorAll('.rv').forEach((n) => rio.observe(n));
    return () => { window.removeEventListener('scroll', onS); rio.disconnect(); };
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Manifesto />
      <DoorWork />
      <About />
      <DitherDissolve />
      <Contact />
    </>
  );
}
