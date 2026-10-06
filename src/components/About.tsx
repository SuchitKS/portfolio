import { useEffect, useState } from 'react';
import DitherVeil from './DitherVeil';
import { portrait } from '../data';

const skills = [
  { label: 'Languages', items: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'Kotlin'] },
  { label: 'Frameworks', items: ['React', 'Node.js', 'Express', 'FastAPI'] },
  { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Neo4j'] },
  { label: 'Machine learning', items: ['XGBoost', 'Scikit-learn', 'Pandas', 'NumPy'] },
  { label: 'Cloud & tools', items: ['Azure', 'Docker', 'Git', 'GitHub'] },
];

export default function About() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const q = window.matchMedia('(max-width: 760px)');
    setMobile(q.matches);
    const onChange = () => setMobile(q.matches);
    q.addEventListener('change', onChange);
    return () => q.removeEventListener('change', onChange);
  }, []);

  return (
    <section className="about" id="about" data-theme="dark">
      <div className="pw">
        <DitherVeil
          src={portrait}
          pattern="floyd" pixelSize={2} inkColor="#050506" paperColor="#f4f1ea"
          revealRadius={200} softness={0.6} linger={1} fit="contain"
          palette="duotone" levels={2} contrast={1.15} brightness={0} rim={0}
          wander={true} clickBurst={!mobile}
          style={{ pointerEvents: mobile ? 'none' : 'auto' }}
        />
      </div>

      <div className="rv">
        <h2>About</h2>
        <p className="lead">Deeply curious about computer science and always pushing at the edges of what I can build. I've been exploring backend development, cloud, distributed systems, and machine learning that tackles real-world problems. A strong foundation in data structures, algorithms, and problem-solving drives everything I build.</p>

        <dl className="dl">
          <div>
            <dt>Experience</dt>
            <dd>
              <b>R&amp;D Intern, Samsung Research Institute Bengaluru</b>
              <span>Jan – July 2026. Engineered a decentralized, peer-to-peer call aggregation gateway on Android, optimizing real-time audio/video pipelines using WebRTC.</span>
            </dd>
          </div>
          <div>
            <dt>Education</dt>
            <dd>
              <b>BE Information Science, BMS College of Engineering</b>
              <span>2023 – 2027. CGPA 9.52.</span>
            </dd>
          </div>
          <div>
            <dt>Achievements</dt>
            <dd>
              <div className="it"><b>Amazon ML Summer School 2026</b><span>Selected from 134,000+ applicants nationwide.</span></div>
              <div className="it"><b>Flipkart GRiD 8.0</b><span>National semi-finalist among 79,000+ participants.</span></div>
              <div className="it"><b>IEEEXtreme 18.0</b><span>Ranked 4th at BMSCE and in the global top 26% among 10,079 teams.</span></div>
            </dd>
          </div>
          <div>
            <dt>Certified</dt>
            <dd>
              <b>Nutanix Certified Associate 6</b>
              <span>Multicloud Infrastructure. April 2026.</span>
            </dd>
          </div>
          <div>
            <dt>Leadership</dt>
            <dd>
              <b>Junior Coordinator, Info &amp; Web Dev</b>
              <span>UTSAV 2026, BMSCE's inter-collegiate techno-cultural fest.</span>
            </dd>
          </div>
        </dl>
      </div>

      <div className="skills rv">
        <h2>Skills</h2>
        <dl className="sk">
          {skills.map((g) => (
            <div key={g.label}>
              <dt>{g.label}</dt>
              <dd>
                {g.items.map((s, i) => (
                  <span key={s}>{i > 0 && <i>/</i>}{s}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}