import LazyVideo from './LazyVideo';
import { links, videos } from '../data';

export default function Contact() {
  return (
    <footer className="ft" id="contact" data-theme="light">
      <div className="ftc">
        <a className="logo" href="#top">Su<span className="kc">c</span>hit</a>
        <h2>Let's build something together.</h2>
        <ul>
          <li><a href={links.email}>Email</a></li>
          <li><a href={links.linkedin}>LinkedIn</a></li>
          <li><a href={links.github}>GitHub</a></li>
          <li><a href={links.resume}>Resume</a></li>
        </ul>
        <small>© 2026 Suchit K S</small>
      </div>
      <LazyVideo className="fv" src={videos.footer} />
    </footer>
  );
}
