# Suchit K S — Portfolio

React + TypeScript + Vite + Tailwind. Real React Bits components: Flex Carousel and Dither Veil (both use `ogl`).

    npm install
    npm run dev

## Swap in your own content (src/data.ts)
- Project screenshots: replace the files in `public/projects/` (flo, prism, cloudburst, gridlock, strata).
- Portrait: replace `portrait` with your photo (plain, even background works best).
- GitHub and Resume links: `links` at the top of data.ts.
- Door position in the footage: `door` (percent of the screen). Tuned for desktop.

## Music
Put your track at `public/music.mp3`. The Sound pill (bottom-left) is off by default and fades the audio in and out.

## The door scene
It is scroll-driven: scrolling opens the door and walks you in; "Step inside" and the nav "Work" link play it automatically.

## Prism GitHub link
It is hidden by default. Set `SHOW_PRISM_CODE = true` in `src/data.ts` once you have confirmed it is fine to show publicly.
