import React from "react";
import { Composition } from "remotion";
import { Main } from "./Main";
import { FPS, WIDTH, HEIGHT, TOTAL_FRAMES } from "./theme";
import "./fonts";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Main"
    component={Main}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
    defaultProps={{ voiceover: true, sfx: true }}
  />
);
