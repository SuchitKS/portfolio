import { videos } from '../data';

export default function Hero() {
  return (
    <section className="hero" id="top" data-theme="light">
      <div className="vid">
        <video src={videos.hero} poster={videos.heroPoster} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
      </div>
      <div className="dusk" />
      <div className="t">
        <h1><span>Hi, I'm Suchit.</span><span>Curious by nature.Crafted with intent.</span></h1>
      </div>
    </section>
  );
}

