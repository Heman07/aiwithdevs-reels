import React, { useEffect, useState } from "react";
import {
  AbsoluteFill, Audio, continueRender, delayRender, interpolate, random,
  spring, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { Visual } from "./Visuals";
import { Puppet, Pose, Prop } from "./Puppet";
import { PropsLayer, StageProp } from "./Props";
import { ThemeBackground } from "./Themes";
import { useFontsOnce as useFonts } from "./fonts";

export type Word = { w: string; s: number; e: number };
export type Char = { id: string; pose?: Pose; x?: number; flip?: boolean; prop?: Prop };
export type Scene = { text: string; visual: string; highlight?: string[]; chars?: Char[]; props?: StageProp[]; theme?: string; startMs: number; endMs: number; words: Word[] };
export type Timeline = { handle: string; theme?: string; series?: string; episode?: number; durationMs: number; scenes: Scene[] };

const GOLD = "#e0ac4a";
const CREAM = "#f4e4c1";
const RED = "#e0573a";
const norm = (s: string) => s.replace(/[।,.!?—\-"'“”‘’]/g, "").trim();


const SceneThemes: React.FC<{ timeline: Timeline }> = ({ timeline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const base = timeline.theme ?? "royal";
  return (
    <>
      <ThemeBackground name={base} />
      {timeline.scenes.map((sc, i) => {
        if (!sc.theme || sc.theme === base) return null;
        const a = (sc.startMs / 1000) * fps;
        const nxt = timeline.scenes[i + 1];
        const b = ((nxt ? nxt.startMs : timeline.durationMs) / 1000) * fps;
        if (frame < a - 12 || frame > b + 12) return null;
        const op = interpolate(frame, [a - 12, a + 6, b - 6, b + 12], [0, 1, 1, nxt?.theme === sc.theme ? 1 : 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return <ThemeBackground key={i} name={sc.theme} opacity={op} />;
      })}
    </>
  );
};

const SceneVisual: React.FC<{ scene: Scene; next?: Scene }> = ({ scene, next }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = (scene.startMs / 1000) * fps;
  const end = ((next ? next.startMs : scene.endMs + 500) / 1000) * fps;
  if (frame < start - 2 || frame > end + 8) return null;
  const f = frame - start;
  const inS = spring({ frame: f, fps, config: { damping: 14, mass: 0.8 } });
  const out = interpolate(frame, [end - 4, end + 8], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoom = 1 + f * 0.0012;
  const chars = scene.chars ?? [];
  if (!chars.length) {
    return (
      <AbsoluteFill style={{ opacity: out }}>
      {scene.props && <PropsLayer props={scene.props} f={f} behind />}
      <div style={{
        position: "absolute", left: 140, top: 260, width: 800, height: 800,
        opacity: Math.min(inS, out), transform: `scale(${(0.85 + 0.15 * inS) * zoom}) translateY(${(1 - out) * -40}px)`,
      }}>
        <Visual name={scene.visual} f={f} />
        </div>
        {scene.props && <PropsLayer props={scene.props} f={f} behind={false} />}
      </AbsoluteFill>
    );
  }
  const defaultX = chars.length === 1 ? [0.5] : chars.length === 2 ? [0.3, 0.72] : [0.2, 0.5, 0.8];
  const sc = chars.length > 1 ? 0.82 : 1;
  return (
    <AbsoluteFill style={{ opacity: out }}>
      {scene.visual && scene.visual !== "none" && (
        <div style={{ position: "absolute", left: 170, top: 210, width: 740, height: 740, opacity: 0.55 * inS, transform: `scale(${zoom})` }}>
          <Visual name={scene.visual} f={f} />
        </div>
      )}
      {scene.props && <PropsLayer props={scene.props} f={f} behind />}
      {/* stage floor glow */}
      <div style={{ position: "absolute", left: 140, right: 140, top: 1100, height: 70, borderRadius: "50%", background: "radial-gradient(ellipse, #00000099 0%, transparent 70%)", opacity: inS }} />
      {chars.map((c, i) => {
        const x = (c.x ?? defaultX[i]) * 1080;
        const enter = spring({ frame: f - i * 5, fps, config: { damping: 13, mass: 0.9 } });
        const fromSide = (c.x ?? defaultX[i]) < 0.5 ? -1 : 1;
        const w = 680 * sc, h = 925 * sc;
        return (
          <div key={i} style={{
            position: "absolute", left: x - w / 2, top: 1150 - h * 0.97, width: w, height: h,
            transform: `translateX(${(1 - enter) * 260 * fromSide}px)`, opacity: enter,
          }}>
            <Puppet id={c.id} pose={c.pose} prop={c.prop} f={f + i * 13} flip={c.flip ?? ((c.x ?? defaultX[i]) > 0.5 && c.pose === "point")} />
          </div>
        );
      })}
      {scene.props && <PropsLayer props={scene.props} f={f} behind={false} />}
    </AbsoluteFill>
  );
};

const Captions: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  if (ms < scene.startMs - 50 || ms > scene.endMs + 250) return null;

  const tokens = scene.text.split(/\s+/).filter((t) => norm(t));
  const useText = tokens.length === scene.words.length;
  const hl = new Set((scene.highlight ?? []).map(norm));
  const words = scene.words.map((w, i) => ({ ...w, label: useText ? tokens[i] : w.w }));

  // chunk: max 3 words, break after punctuation
  const chunks: typeof words[] = [];
  let cur: typeof words = [];
  words.forEach((w) => {
    cur.push(w);
    if (cur.length === 3 || /[,।!?]$/.test(w.label)) { chunks.push(cur); cur = []; }
  });
  if (cur.length) chunks.push(cur);

  const idx = Math.max(0, chunks.findIndex((c, i) => ms < (chunks[i + 1]?.[0].s ?? Infinity)));
  const chunk = chunks[idx];
  const chunkStartF = (chunk[0].s / 1000) * fps;
  const pop = spring({ frame: frame - chunkStartF, fps, config: { damping: 12, stiffness: 180 } });

  return (
    <div style={{
      position: "absolute", top: 1185, left: 90, right: 90, display: "flex", flexWrap: "wrap",
      justifyContent: "center", gap: "8px 26px", transform: `scale(${0.9 + 0.1 * pop})`, opacity: pop,
    }}>
      {chunk.map((w, i) => {
        const active = ms >= w.s && ms < w.e + 120;
        const spoken = ms >= w.s;
        const isHl = hl.has(norm(w.label));
        const wp = spring({ frame: frame - (w.s / 1000) * fps, fps, config: { damping: 10, stiffness: 220 } });
        return (
          <span key={i} style={{
            fontFamily: "Rozha", fontSize: 112, lineHeight: 1.35,
            color: isHl ? (spoken ? GOLD : `${GOLD}66`) : spoken ? CREAM : `${CREAM}55`,
            textShadow: active ? `0 0 30px ${isHl ? RED : GOLD}aa, 0 6px 0 #00000088` : "0 6px 0 #00000088",
            transform: `translateY(${(1 - wp) * 18}px) scale(${active ? 1.08 : 1})`,
            display: "inline-block",
            borderBottom: isHl && spoken ? `6px solid ${RED}` : "6px solid transparent",
          }}>{w.label}</span>
        );
      })}
    </div>
  );
};

export const Reel: React.FC<{ slug: string; timeline: Timeline | null }> = ({ slug, timeline }) => {
  useFonts();
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  if (!timeline) return null;
  const progress = frame / durationInFrames;
  const hookIn = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0906" }}>
      <SceneThemes timeline={timeline} />
      {timeline.scenes.map((s, i) => <SceneVisual key={i} scene={s} next={timeline.scenes[i + 1]} />)}
      {timeline.scenes.map((s, i) => <Captions key={i} scene={s} />)}

      {/* series tag */}
      <div style={{
        position: "absolute", top: 150, width: "100%", textAlign: "center", fontFamily: "Tiro",
        fontSize: 44, letterSpacing: 6, color: GOLD, opacity: hookIn,
      }}>✦ {timeline.series ?? "अनसुने किस्से"}{timeline.episode ? ` · #${timeline.episode}` : ""} ✦</div>

      {/* progress */}
      <div style={{ position: "absolute", top: 90, left: 120, right: 120, height: 6, borderRadius: 3, background: `${GOLD}22` }}>
        <div style={{ width: `${progress * 100}%`, height: "100%", borderRadius: 3, background: GOLD }} />
      </div>

      <div style={{ position: "absolute", bottom: 300, width: "100%", textAlign: "center", fontFamily: "Tiro", fontSize: 36, color: `${CREAM}88`, letterSpacing: 3 }}>
        {timeline.handle}
      </div>

      <Audio src={staticFile(`${slug}/voice.mp3`)} />
      <Audio src={staticFile(`${slug}/drone.mp3`)} volume={0.5} />
    </AbsoluteFill>
  );
};
