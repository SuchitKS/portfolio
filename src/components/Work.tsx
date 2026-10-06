import { useState, type ComponentType } from 'react';
import FlexCarouselRaw from './FlexCarousel.jsx';
import { projects } from '../data';

const FlexCarousel = FlexCarouselRaw as unknown as ComponentType<Record<string, unknown>>;
const items = projects.map((p) => ({ src: p.src, alt: p.title, title: p.title }));

/** The work page: heading, live carousel and project details. Lives behind the door. */
export default function Work() {
  const [i, setI] = useState(0);
  const p = projects[i] ?? projects[0];
  return (
    <div className="work" style={{ height: '100%' }}>
      <h2>What's inside</h2>
      <div className="carw">
        <FlexCarousel items={items} preset="liquid" intro="rise" cardHeight={0.5} fit="natural" captureWheel={false} onChange={(n: number) => setI(n)} />
      </div>
      <div className="det" key={i}>
        <div className="tags">{p.stack}</div>
        <p>{p.desc}</p>
        {p.links.length > 0 && (
          <div className="links">
            {p.links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}
          </div>
        )}
      </div>
      <div className="cue cue--work" aria-hidden="true"><span>Scroll</span><i /></div>
    </div>
  );
}

