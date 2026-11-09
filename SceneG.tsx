import React from "react";
import { AbsoluteFill } from "remotion";
import { theme } from "../theme";
import { Breathe, Entrance, SceneShell, Sfx, Still, Words } from "../components/Motion";

// Cue 7+8: "আমাদের ঘিতে ভেজালের নামগন্ধ পাবেন না, ইনশাআল্লাহ।" (ইনশাআল্লাহ cue starts 34.18s = frame 152 here)
export const SceneG: React.FC = () => (
  <SceneShell exit={false}>
    <Sfx file="swipe.wav" at={0} volume={0.4} />
    <Sfx file="whoosh.wav" at={30} volume={0.35} rate={1.05} />
    <Sfx file="click.wav" at={64} volume={0.45} />
    <Sfx file="chime_low.wav" at={149} volume={0.5} />
    <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingLeft: 150, paddingRight: 150 }}>
      <Entrance cfg="smooth" y={60} from={0.9}>
        <Breathe><Still src="jar-500g.png" height={760} aspect={0.75} zoomTo={1.06} reverse /></Breathe>
      </Entrance>
      <div style={{ width: 100 }} />
      <div style={{ display: "flex", flexDirection: "column", rowGap: 22, width: 900 }}>
        <Words text="আমাদের ঘিতে" delay={20} size={70} weight={500} color={theme.colors.inkDim} />
        <Words text="ভেজালের নামগন্ধ" delay={32} size={118} hi={[1]} />
        <Words text="পাবেন না" delay={46} size={118} />
        <div style={{ height: 18 }} />
        <Entrance delay={150} cfg="bouncy" y={26} from={0.8} style={{ alignSelf: "flex-start" }}>
          <div style={{ fontFamily: theme.fonts.display, fontWeight: 700, fontSize: 68, color: theme.colors.heroDeep, lineHeight: 1.4 }}>ইনশাআল্লাহ।</div>
        </Entrance>
      </div>
    </AbsoluteFill>
  </SceneShell>
);
