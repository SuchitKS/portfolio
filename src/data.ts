// Screenshots live in /public/projects. Replace a file there to update a card.
// Prism's GitHub link is off until you confirm it is OK to show publicly (see README).
const SHOW_PRISM_CODE = false;

export type Project = { title: string; stack: string; desc: string; src: string; links: { label: string; href: string }[] };

export const projects: Project[] = [
  {
    title: 'Flo: event registration',
    stack: 'React · Node.js · PostgreSQL · Azure',
    desc: 'Event registration with time-bound QR contactless check-in for 5,000+ users, secured with JWT login.',
    src: '/projects/flo.jpg',
    links: [{ label: 'Live site', href: 'https://www.flobms.com/' }],
  },
  {
    title: 'Prism: decentralized call aggregation',
    stack: 'Android · WebRTC · Wi-Fi Direct · H.264',
    desc: 'An Android gateway that mixes live audio and video from 4+ phones over Wi-Fi Direct and bridges them to a remote caller.',
    src: '/projects/prism.jpg',
    links: SHOW_PRISM_CODE ? [{ label: 'GitHub', href: 'https://github.com/SuchitKS/prism' }] : [],
  },
  {
    title: 'Cloudburst prediction system',
    stack: 'XGBoost · NLP · Streamlit',
    desc: 'An early-warning system for extreme rainfall that pairs physics-aware ML on weather data with real-time news verification.',
    src: '/projects/cloudburst.jpg',
    links: [
      { label: 'Live app', href: 'https://cloudburstml.streamlit.app/' },
      { label: 'GitHub', href: 'https://github.com/SuchitKS/Cloudburst_ML' },
    ],
  },
  {
    title: 'GridLock Sentinel',
    stack: 'React · FastAPI · PostgreSQL · XGBoost · MapLibre',
    desc: 'AI traffic incident management: report incidents, predict clearance times and generate smart detours, with dashboards for travelers, officers and admins.',
    src: '/projects/gridlock.jpg',
    links: [{ label: 'GitHub', href: 'https://github.com/SuchitKS/grid-locked' }],
  },
  {
    title: 'Strata: industrial knowledge intelligence',
    stack: 'Hybrid RAG · Neo4j · Qdrant · Multi-agent',
    desc: 'Turns engineering documents into a knowledge graph, then answers with cited results, root-cause analysis and auto-generated work orders.',
    src: '/projects/strata.jpg',
    links: [{ label: 'GitHub', href: 'https://github.com/SuchitKS/ET-hackathon' }],
  },
];

// Placeholder portrait: the same image React Bits uses in its demo. Replace with your own photo (plain, even background works best).
// export const portrait = 'https://images.unsplash.com/photo-1737071371043-761e02b1ef95?q=80&w=1400&auto=format&fit=crop';
export const portrait = '/suchit.png';

/**
 * Where the door sits, as percentages of the viewport on the window where you originally calibrated it.
 * DoorWork converts this into video coordinates, so it stays glued to the real door at any screen size.
 */
export const door = { l: 42.5, t: 19, w: 13.4, h: 50.7 };

/**
 * Width / height of the window `door` was calibrated on (your desktop recording was about 2544 x 1342 = 1.9).
 * If the door overlay looks slightly off on desktop, set this to innerWidth / innerHeight of the window
 * where it used to line up perfectly.
 */
export const doorRefAspect = 1.9;

export const links = {
  email: 'mailto:suchitks48@gmail.com',
  linkedin: 'https://www.linkedin.com/in/suchitks/',
  github: 'https://github.com/SuchitKS',
  resume: '#',
};

export const videos = {
  hero: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260908_125738_eb584080-9f98-489e-adb2-014760aa34da.mp4',
  heroPoster: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260908_122011_59c97465-4d23-4fdc-ac40-f6832f573e28.png&w=1920&q=85',
  man: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
  door: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260819_212700_3bb9329b-5c50-4257-a09b-ca85cf3654a3.mp4',
  footer: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_144832_2b6b23aa-4416-4fcb-9df4-132349c59edc.mp4',
};