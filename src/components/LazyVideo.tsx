import { forwardRef, useEffect, useImperativeHandle, useRef, type VideoHTMLAttributes } from 'react';

type Props = VideoHTMLAttributes<HTMLVideoElement> & { src: string; eager?: boolean };

/** Loads when near the screen, pauses when away. */
const LazyVideo = forwardRef<HTMLVideoElement, Props>(({ src, eager, ...rest }, ref) => {
  const el = useRef<HTMLVideoElement>(null);
  useImperativeHandle(ref, () => el.current as HTMLVideoElement);
  useEffect(() => {
    const v = el.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!v.getAttribute('src')) v.src = src;
        v.play().catch(() => {});
      } else v.pause();
    }, { rootMargin: '60% 0px' });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return <video ref={el} muted loop playsInline preload={eager ? 'auto' : 'none'} aria-hidden="true" {...rest} />;
});
export default LazyVideo;
