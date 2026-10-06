import { useEffect, useRef } from 'react';
import LazyVideo from './LazyVideo';
import { videos } from '../data';

export default function Manifesto() {
  const cueRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = cueRef.current;
    const sec = secRef.current;
    if (!el || !sec) return;
    const onScroll = () => {
      const rect = sec.getBoundingClientRect();
      const progress = Math.min(Math.max(rect.bottom / window.innerHeight, 0), 1);
      el.style.opacity = String(Math.min(progress, 0.7));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="man" data-theme="dark" ref={secRef}>
      <div className="vid"><LazyVideo src={videos.man} /></div>
      <div className="t rv">
        <h2>Where <em>curiosity</em> turns into <em>things that ship.</em></h2>
        <p>Final-year Information Science student at BMS College of Engineering, drawn to AI/ML, cloud, and distributed systems that work in the real world.</p>
      </div>
      <div className="cue" ref={cueRef} aria-hidden="true"><i /></div>
    </section>
  );
}
