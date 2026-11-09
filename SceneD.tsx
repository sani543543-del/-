import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { Breathe, Entrance, SceneShell, Sfx, Still, Words } from "../components/Motion";

// Cue 4: "খাঁটি ঘিয়ের সুন্দর একটা ঘ্রাণ থাকবে" -> jar hero + rising aroma curls
const Curl: React.FC<{ x: number; delay: number; d: string }> = ({ x, delay, d }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame - delay, [0, 40], [0, 1], { easing: theme.ease.out, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sway = Math.sin((frame - delay) / 14) * 6;
  return (
    <svg width="90" height="170" viewBox="0 0 60 120" style={{ position: "absolute", left: x, top: -150, transform: `translateX(${sway}px)`, opacity: Math.min(1, t * 1.6) * 0.9 }}>
      <path d={d} pathLength={1} fill="none" stroke={theme.colors.heroDeep} strokeWidth={4} strokeLinecap="round" strokeDasharray={1} strokeDashoffset={1 - t} />
    </svg>
  );
};

export const SceneD: React.FC = () => (
  <SceneShell>
    <Sfx file="swipe.wav" at={0} volume={0.4} rate={0.95} />
    <Sfx file="whoosh.wav" at={26} volume={0.35} rate={1.1} />
    <Sfx file="chime.wav" at={42} volume={0.4} rate={1.12} />
    <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingLeft: 150, paddingRight: 150 }}>
      <Entrance cfg="smooth" y={70} from={0.88}>
        <Breathe>
          <div style={{ position: "relative" }}>
            <Still src="jar-500g.png" height={800} aspect={0.75} zoomTo={1.06} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 0 }}>
              <Curl x={190} delay={30} d="M30 118 C 6 92 54 70 30 44 C 14 26 36 12 30 2" />
              <Curl x={300} delay={38} d="M30 118 C 54 92 6 70 30 44 C 46 26 24 12 30 2" />
              <Curl x={410} delay={46} d="M30 118 C 8 92 52 70 30 44 C 14 26 36 12 30 2" />
            </div>
          </div>
        </Breathe>
      </Entrance>
      <div style={{ width: 90 }} />
      <div style={{ display: "flex", flexDirection: "column", rowGap: 24, width: 880 }}>
        <Words text="খাঁটি ঘিয়ের" delay={22} size={112} />
        <Words text="সুন্দর ঘ্রাণ" delay={34} size={124} hi={[1]} />
      </div>
    </AbsoluteFill>
  </SceneShell>
);
