import React from "react";
import { AbsoluteFill } from "remotion";
import { theme } from "../theme";
import { Breathe, Entrance, SceneShell, Sfx, Still, Words } from "../components/Motion";

// Cue 1: "ঘি এমন কোনো essential product না যেটা আপনাকে খাওয়াই লাগবে। প্রয়োজনে খায়েন না।"
// Style: Minimal Clean + Statement Card. Logo left, statement right.
export const SceneA: React.FC = () => (
  <SceneShell>
    <Sfx file="chime.wav" at={2} volume={0.45} />
    <Sfx file="whoosh.wav" at={12} volume={0.4} rate={1.05} />
    <Sfx file="click.wav" at={44} volume={0.45} />
    <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingLeft: 140, paddingRight: 140 }}>
      <Entrance cfg="bouncy" y={0} from={0.82}>
        <Breathe amp={0.8}><Still src="logo.png" height={780} aspect={0.75} feather /></Breathe>
      </Entrance>
      <div style={{ width: 90 }} />
      <div style={{ display: "flex", flexDirection: "column", rowGap: 22, width: 960 }}>
        <Words text="ঘি এমন কোনো" delay={15} size={108} />
        <Words text="essential product না" delay={27} size={108} hi={[2]} />
        <div style={{ height: 14 }} />
        <Entrance delay={62} y={26}>
          <Words text="প্রয়োজনে খায়েন না" delay={62} size={56} weight={500} color={theme.colors.inkDim} />
        </Entrance>
      </div>
    </AbsoluteFill>
  </SceneShell>
);
