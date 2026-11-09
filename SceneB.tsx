import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { Entrance, SceneShell, Sfx, Words } from "../components/Motion";
import { Card } from "./Card";

// Cue 2: "বাজারের সস্তা, chemical, flavor দেওয়া ঘি" -> headline + two struck-out chips
const Chip: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const strike = interpolate(spring({ frame: frame - delay - 16, fps, config: theme.spring.smooth }), [0, 1], [0, 100]);
  return (
    <Entrance delay={delay} cfg="bouncy" y={36} from={0.8}>
      <Card width={520} height={210} border={theme.colors.maroon}>
        <div style={{ position: "relative", fontFamily: theme.fonts.display, fontWeight: 700, fontSize: 96, color: theme.colors.ink, lineHeight: 1.3 }}>
          {label}
          <div style={{ position: "absolute", left: -18, top: "52%", height: 9, width: `calc(${strike}% + 36px)`, borderRadius: 6, background: theme.colors.maroon }} />
        </div>
      </Card>
    </Entrance>
  );
};

export const SceneB: React.FC = () => (
  <SceneShell>
    <Sfx file="swipe.wav" at={0} volume={0.4} />
    <Sfx file="whoosh.wav" at={9} volume={0.35} rate={0.95} />
    <Sfx file="pop.wav" at={58} volume={0.5} rate={0.95} />
    <Sfx file="click.wav" at={72} volume={0.4} />
    <Sfx file="pop.wav" at={70} volume={0.5} rate={1.1} />
    <Sfx file="click.wav" at={86} volume={0.4} rate={1.1} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: 60 }}>
      <Words text="বাজারের সস্তা ঘি" delay={12} size={132} hi={[1]} align="center" />
      <div style={{ display: "flex", columnGap: 70 }}>
        <Chip label="chemical" delay={60} />
        <Chip label="flavor" delay={72} />
      </div>
    </div>
  </SceneShell>
);
