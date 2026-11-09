import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { Entrance, SceneShell, Sfx, Words } from "../components/Motion";

// Cue 6: "তার decision সম্পূর্ণটাই আপনার হাতে" -> Statement Card with expanding gold rings
const Ring: React.FC<{ delay: number; size: number }> = ({ delay, size }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame - delay, [0, 50], [0, 1], { easing: theme.ease.out, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ position: "absolute", width: size * (0.6 + 0.4 * t), height: size * (0.6 + 0.4 * t), borderRadius: "50%", border: `4px solid ${theme.colors.hero}`, opacity: (1 - t) * 0.7 }} />;
};

export const SceneF: React.FC = () => (
  <SceneShell>
    <Sfx file="swipe.wav" at={0} volume={0.4} rate={0.92} />
    <Sfx file="pop.wav" at={7} volume={0.45} rate={0.95} />
    <Sfx file="whoosh.wav" at={22} volume={0.35} />
    <Sfx file="click.wav" at={46} volume={0.45} />
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Ring delay={6} size={1100} />
      <Ring delay={22} size={900} />
    </AbsoluteFill>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: 30 }}>
      <Entrance delay={10} cfg="bouncy" y={30} from={0.8}>
        <div style={{ fontFamily: theme.fonts.display, fontWeight: 700, fontSize: 60, color: theme.colors.bg, background: theme.colors.ink, borderRadius: 60, padding: "6px 52px", lineHeight: 1.4 }}>decision</div>
      </Entrance>
      <Words text="সম্পূর্ণটাই" delay={22} size={140} align="center" />
      <Words text="আপনার হাতে" delay={34} size={140} hi={[0]} align="center" />
    </div>
  </SceneShell>
);
