import { useEffect, useRef } from 'react';

const B = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

/** Bayer-dithered dissolve from night black to sage. */
export default function DitherDissolve() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const paint = () => {
      const c = ref.current, x = c?.getContext('2d');
      if (!c || !x) return;
      const cols = Math.ceil(window.innerWidth / 4), rows = 35;
      c.width = cols; c.height = rows;
      const im = x.createImageData(cols, rows);
      for (let y = 0; y < rows; y++) for (let i = 0; i < cols; i++) {
        const sage = y / (rows - 1) > (B[(y % 4) * 4 + (i % 4)] + 0.5) / 16, o = (y * cols + i) * 4;
        im.data[o] = sage ? 235 : 5; im.data[o + 1] = sage ? 238 : 5; im.data[o + 2] = sage ? 231 : 6; im.data[o + 3] = 255;
      }
      x.putImageData(im, 0, 0);
    };
    paint();
    window.addEventListener('resize', paint);
    return () => window.removeEventListener('resize', paint);
  }, []);
  return <canvas id="dc" ref={ref} data-theme="dark" />;
}
