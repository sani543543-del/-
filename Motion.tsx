import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

type SpringName = keyof typeof theme.spring;

// Entrance: opacity + rise + scale together (never a lone fade)
export const Entrance: React.FC<{ delay?: number; y?: number; from?: number; cfg?: SpringName; style?: React.CSSProperties; children: React.ReactNode }> = ({ delay = 0, y = 40, from = 0.94, cfg = "smooth", style, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: theme.spring[cfg] });
  return (
    <div style={{ opacity: Math.min(1, p), transform: `translateY(${interpolate(p, [0, 1], [y, 0])}px) scale(${interpolate(p, [0, 1], [from, 1])})`, ...style }}>{children}</div>
  );
};

// Idle breathing for anything on screen > 2s
export const Breathe: React.FC<{ amp?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ amp = 1, children, style }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ transform: `translateY(${Math.sin(frame / 30) * 5 * amp}px) scale(${1 + Math.sin(frame / 22) * 0.012 * amp})`, ...style }}>{children}</div>
  );
};

// Still image with Ken Burns. multiply = white/cream backdrop melts into the cream background
export const Still: React.FC<{ src: string; height: number; aspect: number; zoomTo?: number; reverse?: boolean; feather?: boolean }> = ({ src, height, aspect, zoomTo = 1.07, reverse = false, feather = false }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const k = interpolate(frame, [0, durationInFrames], reverse ? [zoomTo, 1] : [1, zoomTo], { easing: theme.ease.inOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pan = interpolate(frame, [0, durationInFrames], [0, reverse ? 14 : -14], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ height, width: height * aspect, mixBlendMode: "multiply", WebkitMaskImage: feather ? "radial-gradient(ellipse at center, #000 52%, transparent 76%)" : undefined, maskImage: feather ? "radial-gradient(ellipse at center, #000 52%, transparent 76%)" : undefined }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "contain", transform: `scale(${k}) translateX(${pan}px)` }} />
    </div>
  );
};

// Word-by-word text (Bengali-safe: only splits on spaces, letterSpacing 0, pixel gaps)
export const Words: React.FC<{ text: string; delay?: number; per?: number; size?: number; color?: string; weight?: number; hi?: number[]; align?: "left" | "center"; style?: React.CSSProperties }> = ({ text, delay = 0, per = 4, size = 100, color = theme.colors.ink, weight = 700, hi = [], align = "left", style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", columnGap: Math.round(size * 0.26), rowGap: Math.round(size * 0.06), justifyContent: align === "center" ? "center" : "flex-start", fontFamily: theme.fonts.display, fontSize: size, fontWeight: weight, lineHeight: 1.3, color, letterSpacing: 0, ...style }}>
      {text.split(" ").map((w, i) => {
        const d = delay + i * per;
        const p = spring({ frame: frame - d, fps, config: theme.spring.snappy });
        const isHi = hi.includes(i);
        const sweep = isHi ? spring({ frame: frame - d - 8, fps, config: theme.spring.smooth }) : 0;
        return (
          <span key={i} style={{ position: "relative", display: "inline-block", opacity: Math.min(1, p), transform: `translateY(${interpolate(p, [0, 1], [34, 0])}px) scale(${interpolate(p, [0, 1], [0.94, 1])})` }}>
            {isHi && <span style={{ position: "absolute", left: -Math.round(size * 0.14), right: -Math.round(size * 0.14), top: "16%", bottom: "6%", borderRadius: Math.round(size * 0.2), background: theme.colors.hero, transformOrigin: "left center", transform: `scaleX(${Math.min(1, sweep)})`, zIndex: 0 }} />}
            <span style={{ position: "relative", zIndex: 1 }}>{w}</span>
          </span>
        );
      })}
    </div>
  );
};

// SFX helper: `at` is a scene-local frame (start 2-3 frames BEFORE the visual lands)
export const SfxContext = React.createContext(true);
export const Sfx: React.FC<{ file: string; at: number; volume?: number; rate?: number }> = ({ file, at, volume = 0.5, rate = 1 }) => {
  const on = React.useContext(SfxContext);
  if (!on) return null;
  return (
    <Sequence from={Math.max(0, at)} layout="none">
      <Audio src={staticFile(`sfx/${file}`)} volume={volume} playbackRate={rate} />
    </Sequence>
  );
};

// Scene content wrapper: exit is ~10f (faster than entrances), applied to the whole scene
export const SceneShell: React.FC<{ exit?: boolean; children: React.ReactNode }> = ({ exit = true, children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const r = exit ? { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const } : null;
  const o = r ? interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [1, 0], r) : 1;
  const y = r ? interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -30], { ...r, easing: theme.ease.in }) : 0;
  const b = r ? interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, 6], r) : 0;
  return (
    <AbsoluteFill style={{ opacity: o, transform: `translateY(${y}px)`, filter: b ? `blur(${b}px)` : undefined, justifyContent: "center", alignItems: "center" }}>{children}</AbsoluteFill>
  );
};
