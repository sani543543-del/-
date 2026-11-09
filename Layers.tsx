import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { theme } from "../theme";

// Layer 1: animated warm mesh (never flat)
export const BgMesh: React.FC = () => {
  const frame = useCurrentFrame();
  const d1 = Math.sin(frame / 55) * 60;
  const d2 = Math.cos(frame / 70) * 50;
  return (
    <AbsoluteFill style={{ background: theme.colors.bg }}>
      <div style={{ position: "absolute", width: 1300, height: 1300, borderRadius: "50%", top: -560, left: -320 + d1, filter: "blur(60px)", background: "radial-gradient(circle, rgba(243,201,105,0.55), transparent 62%)" }} />
      <div style={{ position: "absolute", width: 1100, height: 1100, borderRadius: "50%", bottom: -520, right: -300 - d2, filter: "blur(70px)", background: "radial-gradient(circle, rgba(231,160,90,0.38), transparent 65%)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 55%, ${theme.colors.bgAlt}88)` }} />
    </AbsoluteFill>
  );
};

// Layer 4: colour grade (above content)
export const Grade: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <AbsoluteFill style={{ backgroundColor: theme.colors.hero, mixBlendMode: "soft-light", opacity: 0.12 }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(74,29,11,0.06), transparent 28%, transparent 72%, rgba(74,29,11,0.10))" }} />
  </AbsoluteFill>
);

// Layer 5a: procedural grain
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", backgroundImage: noise, backgroundSize: "220px", backgroundPosition: `${(frame * 7) % 220}px ${(frame * 13) % 220}px`, opacity: 0.05, mixBlendMode: "multiply" }} />
  );
};

// Layer 5b: vignette (topmost)
export const Vignette: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 58%, rgba(74,29,11,0.20) 100%)" }} />
);
