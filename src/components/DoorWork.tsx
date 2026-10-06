import { useEffect, useRef } from 'react';
import LazyVideo from './LazyVideo';
import Work from './Work';
import { door as D, doorRefAspect, videos } from '../data';
import { animateScroll } from '../scroll';

const K = 3.6, P1 = 1 / K, DONE = 0.76;
const FALLBACK = { w: 1920, h: 1080 }; // used until the video's real size is known
const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
const sub = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Geo = {
  vw: number; vh: number; posX: number;
  l: number; t: number; w: number; h: number;      // door rect, % of the pinned stage
  src: { x: number; y: number; w: number; h: number }; // door rect in video pixels
  P0: number;                                      // starting scale of the page inside the doorway
};

/**
 * Works out where the door really is on screen.
 * 1. Convert the calibrated door (viewport %) into fractions of the VIDEO frame.
 * 2. Replay object-fit: cover for the current viewport, panning sideways so the door stays centred.
 */
function computeGeo(W: number, H: number, vw: number, vh: number): Geo {
  const RH = 1000, RW = RH * doorRefAspect;
  const rk = Math.max(RW / vw, RH / vh);
  const rox = (RW - vw * rk) / 2, roy = (RH - vh * rk) / 2;
  const f = {
    l: ((D.l / 100) * RW - rox) / (vw * rk),
    t: ((D.t / 100) * RH - roy) / (vh * rk),
    w: ((D.w / 100) * RW) / (vw * rk),
    h: ((D.h / 100) * RH) / (vh * rk),
  };

  const k = Math.max(W / vw, H / vh);
  const spanX = W - vw * k;           // 0 or negative: how much the video overflows sideways
  const spanY = H - vh * k;
  const centreX = (f.l + f.w / 2) * vw * k;
  const ox = spanX === 0 ? 0 : Math.min(0, Math.max(spanX, W / 2 - centreX));
  const posX = spanX === 0 ? 0.5 : ox / spanX;
  const oy = spanY / 2;

  const left = ox + f.l * vw * k, top = oy + f.t * vh * k;
  const width = f.w * vw * k, height = f.h * vh * k;

  return {
    vw, vh, posX,
    l: (left / W) * 100, t: (top / H) * 100, w: (width / W) * 100, h: (height / H) * 100,
    src: { x: f.l * vw, y: f.t * vh, w: f.w * vw, h: f.h * vh },
    P0: Math.max(height / H, width / W),
  };
}

/**
 * One continuous scene, driven by scroll. The real work page sits behind the door, small.
 * Scrolling opens the door, steps the camera in, and that same page grows to fill the screen.
 * Runs on every screen size, phones included. Scrolling back up walks you out again.
 */
export default function DoorWork() {
  const track = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const cam1 = useRef<HTMLDivElement>(null);
  const cam2 = useRef<HTMLDivElement>(null);
  const dr = useRef<HTMLDivElement>(null);
  const leaf = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const portal = useRef<HTMLDivElement>(null);
  const pgl = useRef<HTMLDivElement>(null);
  const txt = useRef<HTMLDivElement>(null);
  const geo = useRef<Geo | null>(null);

  useEffect(() => {
    let tick = false, drawing = 0, paused = false;

    const layout = () => {
      const pn = pin.current, v = vid.current, d = dr.current;
      if (!pn) return;
      const W = pn.clientWidth, H = pn.clientHeight;
      if (!W || !H) return;
      const g = computeGeo(W, H, v?.videoWidth || FALLBACK.w, v?.videoHeight || FALLBACK.h);
      geo.current = g;
      if (v) v.style.objectPosition = `${(g.posX * 100).toFixed(3)}% 50%`;
      if (d) {
        d.style.left = `${g.l}%`;
        d.style.top = `${g.t}%`;
        d.style.width = `${g.w}%`;
        d.style.height = `${g.h}%`;
        d.style.perspective = `${((g.h / 100) * H * 1.4).toFixed(1)}px`;
      }
    };

    const draw = () => {
      const v = vid.current, c = cv.current, g = geo.current, x = c?.getContext('2d');
      if (v && c && x && g && v.videoWidth && v.readyState > 1) {
        if (g.vw !== v.videoWidth) layout();
        const s = (geo.current as Geo).src;
        const cw = Math.max(1, Math.round(s.w)), ch = Math.max(1, Math.round(s.h));
        if (c.width !== cw || c.height !== ch) { c.width = cw; c.height = ch; }
        x.drawImage(v, s.x, s.y, s.w, s.h, 0, 0, cw, ch);
      }
      drawing = requestAnimationFrame(draw);
    };

    const update = () => {
      tick = false;
      const t = track.current, pn = pin.current, c1 = cam1.current, c2 = cam2.current, lf = leaf.current,
        sd = shade.current, pt = portal.current, pg = pgl.current, tx = txt.current, g = geo.current;
      if (!t || !pn || !c1 || !c2 || !lf || !sd || !pt || !pg || !tx || !g) return;

      const range = Math.max(1, t.offsetHeight - pn.offsetHeight);
      const p = clamp(-t.getBoundingClientRect().top / range);
      const e0 = ease(sub(p, 0.04, 0.3)), e1 = ease(sub(p, 0.22, DONE)), e2 = ease(sub(p, 0.45, DONE));
      const done = p >= DONE, live = p > 0.02 && !done, s = 1 + (K - 1) * e1;
      const cx = g.l + g.w / 2, cy = g.t + g.h / 2;

      // camera: the garden and the door leaf move together
      const cam = `translate3d(${e1 * (50 - K * cx)}%,${e1 * (50 - K * cy)}%,0) scale(${s})`;
      c1.style.transform = cam; c2.style.transform = cam;
      c1.style.visibility = done ? 'hidden' : 'visible';
      c2.style.visibility = live ? 'visible' : 'hidden';
      if (live && !drawing) draw();
      if (!live && drawing) { cancelAnimationFrame(drawing); drawing = 0; }
      const v = vid.current;
      if (v) {
        if (done && !paused) { v.pause(); paused = true; }
        else if (!done && paused) { v.play().catch(() => { }); paused = false; }
      }

      // the leaf swings open, then dissolves once the camera starts stepping in,
      // so no sliver of its edge (the line) or its dark back face (the strip) is left behind
      const leafFade = 1 - sub(p, 0.28, 0.4);
      lf.style.transform = `rotateY(${-100 * e0}deg)`;
      lf.style.opacity = String(leafFade);
      lf.style.visibility = leafFade <= 0 ? 'hidden' : 'visible';
      sd.style.opacity = String(0.88 * e0);
      tx.style.opacity = String(1 - sub(p, 0, 0.06));
      tx.style.pointerEvents = p > 0.02 ? 'none' : 'auto';

      // the real page: small in the doorway, growing to exactly 1:1
      pt.style.visibility = p > 0.04 ? 'visible' : 'hidden';
      pt.style.pointerEvents = done ? 'auto' : 'none';
      if (done) {
        pg.style.transform = 'none';
        pt.style.clipPath = 'none';
      } else {
        const ccx = cx + e1 * (50 - cx), ccy = cy + e1 * (50 - cy);
        pg.style.transform = `translate(${ccx - 50}%,${ccy - 50}%) scale(${(g.P0 + (P1 - g.P0) * e1) * s})`;
        const hw = (g.w * s) / 2, hh = (g.h * s) / 2, m = 1 - e2;
        // pull the clip in by a hair (fading out as it opens) so no sliver of the door jamb shows at the page edge
        const trim = (0.6 * m).toFixed(2);
        const f = (n: number) => `calc(${Math.max(0, n * m)}% + ${trim}px)`;
        pt.style.clipPath = `inset(${f(ccy - hh)} ${f(100 - ccx - hw)} ${f(100 - ccy - hh)} ${f(ccx - hw)})`;
      }

      // fade the scroll cue as we near the end of the scene
      const cueEl = pt.querySelector('.cue--work') as HTMLElement | null;
      if (cueEl) {
        const fadeOut = 1 - clamp((p - 0.88) / 0.12);
        cueEl.style.opacity = String(0.45 * fadeOut);
      }
    };

    const onS = () => { if (!tick) { tick = true; requestAnimationFrame(update); } };
    const onSize = () => { layout(); onS(); };

    const v = vid.current;
    v?.addEventListener('loadedmetadata', onSize);
    const ro = new ResizeObserver(onSize);
    if (pin.current) ro.observe(pin.current);
    window.addEventListener('scroll', onS, { passive: true });
    layout();
    update();
    return () => {
      window.removeEventListener('scroll', onS);
      v?.removeEventListener('loadedmetadata', onSize);
      ro.disconnect();
      cancelAnimationFrame(drawing);
    };
  }, []);

  const stepInside = () => {
    const t = track.current, pn = pin.current;
    if (t && pn) animateScroll(t.offsetTop + 0.8 * (t.offsetHeight - pn.offsetHeight), 3400);
  };

  return (
    <section className="scene" ref={track} data-theme="dark">
      <span id="work" style={{ position: 'absolute', left: 0, top: 'calc((var(--sh) - 100svh) * .8)' }} />
      <div className="pin" ref={pin}>
        <div className="cam" ref={cam1} style={{ zIndex: 0 }}><LazyVideo ref={vid} src={videos.door} /></div>
        <div className="portal" ref={portal}><div className="pgl" ref={pgl}><Work /></div></div>
        <div className="cam" ref={cam2} style={{ zIndex: 3, visibility: 'hidden' }}>
          <div className="dr" ref={dr}>
            <div className="leaf" ref={leaf}><canvas ref={cv} /><div className="shade" ref={shade} /></div>
          </div>
        </div>
        <div className="t" ref={txt}>
          <h2>Selected work</h2>
          <p>Engineering the unique: from decentralized mobile networks to AI-driven climate predictions.</p>
          <button className="btn2" onClick={stepInside}>Step inside</button>
        </div>
      </div>
    </section>
  );
}