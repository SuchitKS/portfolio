import { useEffect, useRef, useState } from 'react';

/** Sound toggle with live equaliser bars. Off by default. Put your track at public/music.mp3. */
export default function MusicToggle() {
  const [on, setOn] = useState(false);
  const onRef = useRef(false);
  const bars = useRef<(HTMLElement | null)[]>([]);
  const audio = useRef<HTMLAudioElement | null>(null);
  const fade = useRef(0);
  const kick = useRef<() => void>(() => {});

  useEffect(() => {
    let raf = 0, amp = 0, last = performance.now(), running = false;
    const frame = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      amp += ((onRef.current ? 1 : 0) - amp) * (1 - Math.exp(-dt / 0.22));
      const s = t / 1000;
      bars.current.forEach((b, i) => {
        if (!b) return;
        const w = 0.6 * Math.abs(Math.sin(s * (1.7 + i * 0.43) + i * 1.9)) + 0.4 * Math.abs(Math.sin(s * (0.8 + i * 0.29) + i * 0.7));
        b.style.transform = `scaleY(${0.2 + 0.8 * amp * w})`;
      });
      if (onRef.current || amp > 0.003) raf = requestAnimationFrame(frame);
      else { running = false; bars.current.forEach((b) => b && (b.style.transform = 'scaleY(.2)')); }
    };
    kick.current = () => { if (!running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); } };
    return () => cancelAnimationFrame(raf);
  }, []);

  const toggle = () => {
    const next = !onRef.current;
    onRef.current = next;
    setOn(next);
    kick.current();
    if (!audio.current) {
      const a = new Audio('/audio/audiomass-output.mp3');
      a.loop = true; a.preload = 'none'; a.volume = 0;
      audio.current = a;
    }
    const a = audio.current;
    window.clearInterval(fade.current);
    if (next) {
      a.play().catch(() => {});
      fade.current = window.setInterval(() => { a.volume = Math.min(0.6, a.volume + 0.04); if (a.volume >= 0.6) window.clearInterval(fade.current); }, 60);
    } else {
      fade.current = window.setInterval(() => { a.volume = Math.max(0, a.volume - 0.05); if (a.volume <= 0) { window.clearInterval(fade.current); a.pause(); } }, 60);
    }
  };

  return (
    <button className={`mus${on ? ' on' : ''}`} onClick={toggle} aria-pressed={on} aria-label={on ? 'Pause music' : 'Play music'}>
      <span className="bars" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => <i key={i} ref={(el) => { bars.current[i] = el; }} />)}
      </span>
    </button>
  );
}
