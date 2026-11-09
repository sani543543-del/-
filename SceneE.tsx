import React from "react";
import { theme } from "../theme";
import { Breathe, Entrance, SceneShell, Sfx, Still, Words } from "../components/Motion";
import { Card } from "./Card";

// Cue 5: "বাজারের সস্তা ঘি নাকি Sanshuv Foods থেকে খাঁটি গাওয়া ঘি" -> split comparison
export const SceneE: React.FC = () => (
  <SceneShell>
    <Sfx file="swipe.wav" at={0} volume={0.4} />
    <Sfx file="pop.wav" at={8} volume={0.45} rate={0.9} />
    <Sfx file="pop.wav" at={48} volume={0.45} rate={1.05} />
    <Sfx file="chime.wav" at={64} volume={0.4} />
    <div style={{ position: "relative", display: "flex", alignItems: "center", columnGap: 64 }}>
      <Entrance delay={10} cfg="smooth" y={50} from={0.92}>
        <Card width={600} height={520} muted border={theme.colors.mute}>
          <Words text="বাজারের সস্তা ঘি" delay={16} size={72} color={theme.colors.mute} align="center" style={{ padding: "0 30px" }} />
          <div style={{ height: 16 }} />
          <Words text="chemical flavor" delay={30} size={50} weight={500} color={theme.colors.mute} align="center" />
        </Card>
      </Entrance>
      <Entrance delay={46} cfg="bouncy" y={50} from={0.9}>
        <Breathe amp={0.7}>
          <Card width={880} height={600} glow border={theme.colors.hero} style={{ flexDirection: "row", columnGap: 40, padding: "0 40px" }}>
            <Still src="jar-500g.png" height={420} aspect={0.75} zoomTo={1.05} reverse />
            <div style={{ display: "flex", flexDirection: "column", rowGap: 14 }}>
              <Words text="Sanshuv Foods" delay={54} size={62} color={theme.colors.heroDeep} />
              <Words text="খাঁটি গাওয়া ঘি" delay={62} size={86} hi={[2]} />
            </div>
          </Card>
        </Breathe>
      </Entrance>
      <Entrance delay={36} cfg="bouncy" y={0} from={0.6} style={{ position: "absolute", left: 600 + 64 - 70 + 4, top: 230 }}>
        <div style={{ width: 140, height: 140, borderRadius: 70, background: theme.colors.ink, color: theme.colors.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: theme.fonts.display, fontWeight: 700, fontSize: 44, boxShadow: `0 20px 40px -10px ${theme.colors.shadow}` }}>নাকি</div>
      </Entrance>
    </div>
  </SceneShell>
);
