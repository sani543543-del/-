import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { SCENE_TIME, sec } from "./theme";
import { BgMesh, Grade, Grain, Vignette } from "./components/Layers";
import { SfxContext } from "./components/Motion";
import { SceneA } from "./scenes/SceneA";
import { SceneB } from "./scenes/SceneB";
import { SceneC } from "./scenes/SceneC";
import { SceneD } from "./scenes/SceneD";
import { SceneE } from "./scenes/SceneE";
import { SceneF } from "./scenes/SceneF";
import { SceneG } from "./scenes/SceneG";

const SCENES: Record<keyof typeof SCENE_TIME, React.FC> = { A: SceneA, B: SceneB, C: SceneC, D: SceneD, E: SceneE, F: SceneF, G: SceneG };

// Plays public/voiceover.mp3 (toggle with the `voiceover` prop; works in Studio preview and render)
const PreviewAudio: React.FC<{ enabled: boolean }> = ({ enabled }) =>
  enabled ? <Audio src={staticFile("voiceover.mp3")} volume={1} /> : null;

export const Main: React.FC<{ voiceover?: boolean; sfx?: boolean }> = ({ voiceover = true, sfx = true }) => (
  <SfxContext.Provider value={sfx}>
    <AbsoluteFill>
      <BgMesh />
      {(Object.keys(SCENE_TIME) as (keyof typeof SCENE_TIME)[]).map((k) => {
        const [s, e] = SCENE_TIME[k];
        const Scene = SCENES[k];
        return (
          <Sequence key={k} from={sec(s)} durationInFrames={sec(e) - sec(s)} name={`Scene ${k}`}>
            <Scene />
          </Sequence>
        );
      })}
      <Grade />
      <Grain />
      <Vignette />
      <PreviewAudio enabled={voiceover} />
    </AbsoluteFill>
  </SfxContext.Provider>
);
