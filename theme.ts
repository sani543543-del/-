// Single source of truth: colors, easings, springs, fonts, timing (all derived from the SRT).
import { Easing } from "remotion";

export const theme = {
  colors: {
    bg: "#FFF6D9",
    bgAlt: "#F8E7B0",
    ink: "#4A1D0B", // deep brown text
    inkDim: "#8B6444",
    hero: "#E9AE2C", // THE gold: one highlighted element per frame
    heroDeep: "#B8780F",
    maroon: "#7A1E1E",
    mute: "#A89C8C",
    card: "rgba(255,251,238,0.88)",
    line: "rgba(74,29,11,0.14)",
    glow: "rgba(233,174,44,0.45)",
    shadow: "rgba(74,29,11,0.22)",
  },
  fonts: {
    display: '"Hind Siliguri", "Noto Sans Bengali", sans-serif',
  },
  ease: {
    out: Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.83, 0, 0.17, 1),
    in: Easing.bezier(0.7, 0, 0.84, 0),
  },
  spring: {
    snappy: { damping: 14, stiffness: 160, mass: 0.6 },
    smooth: { damping: 20, stiffness: 90, mass: 1 },
    bouncy: { damping: 11, stiffness: 170, mass: 0.7 },
  },
} as const;

// ---- Timing: every scene boundary comes from elevenlabs.srt cue times ----
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const sec = (s: number) => Math.round(s * FPS);

// [startSec, endSec]  (SRT cues: 1 / 2 / 3 / 4 / 5 / 6 / 7+8)
export const SCENE_TIME = {
  A: [0, 5.32], //  cue 1: "ঘি এমন essential product না"
  B: [5.32, 9.72], //  cue 2: সস্তা chemical, flavor
  C: [9.72, 15.14], //  cue 3: liver, kidney (cue 4 starts at 15.14)
  D: [15.14, 19.78], //  cue 4: খাঁটি ঘিয়ের ঘ্রাণ
  E: [19.78, 24.1], //  cue 5: সস্তা ঘি নাকি Sanshuv খাঁটি ঘি
  F: [24.1, 29.12], //  cue 6: decision আপনার হাতে
  G: [29.12, 35.2], //  cue 7+8: ভেজালের নামগন্ধ পাবেন না, ইনশাআল্লাহ (SRT ends 34.72)
} as const;

export const TOTAL_FRAMES = sec(35.2);
