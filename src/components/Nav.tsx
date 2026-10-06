import type { MouseEvent } from 'react';
import { links } from '../data';
import MusicToggle from './MusicToggle';
import { animateScroll } from '../scroll';

const toWork = (e: MouseEvent) => {
  const el = document.getElementById('work');
  if (!el) return;
  e.preventDefault();
  const to = el.getBoundingClientRect().top + window.scrollY;
  animateScroll(to, Math.min(4200, Math.max(1400, Math.abs(to - window.scrollY) * 0.7)));
};

export default function Nav() {
  return (
    <nav id="nav">
      <a className="logo" href="#top">Su<span className="kc">c</span>hit</a>
      <ul>
        <li><a href="#work" onClick={toWork}>Work</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="nr">
        <MusicToggle />
        <a className="btn" href={links.email}>Let's talk</a>
      </div>
    </nav>
  );
}
