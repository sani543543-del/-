import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { Entrance, SceneShell, Sfx, Words } from "../components/Motion";
import { Card } from "./Card";

// Cue 3: "liver এবং kidney নষ্ট কইরেন না" -> two organ cards (line-drawn icons) + warning words
const Organ: React.FC<{ label: string; path: string; delay: number }> = ({ label, path, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = spring({ frame: frame - delay - 6, fps, config: theme.spring.smooth });
  const fill = interpolate(draw, [0.6, 1], [0, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Entrance delay={delay} cfg="bouncy" y={44} from={0.85}>
      <Card width={560} height={470} border={theme.colors.line}>
        <svg width="260" height="210" viewBox="0 0 220 190">
          <path d={path} pathLength={1} fill={theme.colors.maroon} fillOpacity={fill} stroke={theme.colors.maroon} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={1} strokeDashoffset={1 - draw} />
        </svg>
        <div style={{ height: 14 }} />
        <div style={{ fontFamily: theme.fonts.display, fontWeight: 700, fontSize: 92, color: theme.colors.ink, lineHeight: 1.3 }}>{label}</div>
      </Card>
    </Entrance>
  );
};

const LIVER = "M12 78 C 38 24 142 20 192 62 C 208 78 192 122 150 136 C 112 150 72 122 52 132 C 26 142 6 112 12 78 Z";
const KIDNEY = "M78 36 C 28 36 12 104 44 146 C 76 188 138 172 146 118 C 150 92 120 86 112 70 C 106 52 98 36 78 36 Z";

export const SceneC: React.FC = () => (
  <SceneShell>
    <Sfx file="swipe.wav" at={0} volume={0.4} rate={1.08} />
    <Sfx file="pop.wav" at={7} volume={0.5} />
    <Sfx file="pop.wav" at={23} volume={0.5} rate={1.12} />
    <Sfx file="whoosh.wav" at={60} volume={0.35} />
    <Sfx file="click.wav" at={72} volume={0.45} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: 52 }}>
      <div style={{ display: "flex", alignItems: "center", columnGap: 56 }}>
        <Organ label="liver" path={LIVER} delay={10} />
        <Entrance delay={20} y={20}>
          <div style={{ fontFamily: theme.fonts.display, fontWeight: 500, fontSize: 60, color: theme.colors.inkDim, lineHeight: 1.3 }}>এবং</div>
        </Entrance>
        <Organ label="kidney" path={KIDNEY} delay={26} />
      </div>
      <Words text="নষ্ট কইরেন না" delay={62} size={116} hi={[0]} align="center" />
    </div>
  </SceneShell>
);
