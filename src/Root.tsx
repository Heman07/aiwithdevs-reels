import React from "react";
import { Composition, staticFile } from "remotion";
import { Reel, Timeline } from "./Reel";
import { Cast } from "./Cast";
import { Cover } from "./Cover";
import { HorrorReel } from "./horror/Horror";
import { HorrorCover } from "./horror/HorrorCover";
import { useFontsOnce } from "./fonts";

const FPS = 30;

const CoverRoot: React.FC<{ slug: string; timeline: any }> = ({ timeline }) => {
  useFontsOnce();
  if (!timeline?.cover) return null;
  return <Cover cover={timeline.cover} series={timeline.series} episode={timeline.episode} handle={timeline.handle} />;
};

export const Root: React.FC = () => (
  <>
  <Composition
    id="Cover" component={CoverRoot} fps={FPS} width={1080} height={1920} durationInFrames={1}
    defaultProps={{ slug: "kc1-veeravati", timeline: null as any }}
    calculateMetadata={async ({ props }) => {
      const res = await fetch(staticFile(`${props.slug}/timeline.json`));
      return { props: { ...props, timeline: await res.json() } };
    }}
  />
  <Composition
    id="Horror" component={HorrorReel} fps={FPS} width={1080} height={1920} durationInFrames={300}
    defaultProps={{ slug: "creature01-lochness", timeline: null as any }}
    calculateMetadata={async ({ props }) => {
      const res = await fetch(staticFile(`${props.slug}/timeline.json`));
      const timeline = await res.json();
      return { durationInFrames: Math.ceil((timeline.durationMs / 1000) * FPS), props: { ...props, timeline } };
    }}
  />
  <Composition
    id="HorrorCover" component={HorrorCover} fps={FPS} width={1080} height={1920} durationInFrames={1}
    defaultProps={{ slug: "creature01-lochness", timeline: null as any }}
    calculateMetadata={async ({ props }) => {
      const res = await fetch(staticFile(`${props.slug}/timeline.json`));
      return { props: { ...props, timeline: await res.json() } };
    }}
  />
  <Composition id="Cast" component={Cast} fps={FPS} width={2040} height={1720} durationInFrames={90} defaultProps={{}} />
  <Composition
    id="Reel"
    component={Reel}
    fps={FPS}
    width={1080}
    height={1920}
    durationInFrames={300}
    defaultProps={{ slug: "lanka", timeline: null as Timeline | null }}
    calculateMetadata={async ({ props }) => {
      const res = await fetch(staticFile(`${props.slug}/timeline.json`));
      const timeline: Timeline = await res.json();
      return {
        durationInFrames: Math.ceil((timeline.durationMs / 1000) * FPS),
        props: { ...props, timeline },
      };
    }}
  />
  </>
);
