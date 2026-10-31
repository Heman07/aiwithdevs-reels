import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { useFontsOnce } from "../fonts";
import { SHOTS } from "./registry";

export type HWord = { w: string; s: number; e: number };
export type HScene = {
  text: string; shot: string; stamp?: string; big?: string; camera?: string; fx?: string[]; highlight?: string[];
  startMs: number; endMs: number; words: HWord[];
};
export type HTimeline = { handle: string; series?: string; episode?: number; durationMs: number; music?: string; theme?: string; scenes: HScene[] };

export const BONE = "#ece4d0";
export const BLOOD = "#d0202a";
export const GOLD = "#f2b544";
const HI = (t?: string) => /[\u0900-\u097F]/.test(t ?? "");
const norm = (s: string) => s.replace(/[.,!?;:"'“”‘’—।-]/g, "").toLowerCase();

const Camera: React.FC<{ kind?: string; f: number; dur: number; children: React.ReactNode }> = ({ kind, f, dur, children }) => {
  const p = Math.min(1, f / Math.max(1, dur));
  let t = "";
  switch (kind) {
    case "push": t = `scale(${1 + 0.14 * p})`; break;
    case "pull": t = `scale(${1.16 - 0.14 * p})`; break;
    case "descend": t = `scale(1.12) translateY(${70 - 150 * p}px)`; break;
    case "pan": t = `scale(1.14) translateX(${60 - 120 * p}px)`; break;
    case "shake": {
      const a = 9;
      t = `scale(1.08) translate(${(random(`sx${f}`) - 0.5) * a * 2}px, ${(random(`sy${f}`) - 0.5) * a * 2}px) rotate(${(random(`sr${f}`) - 0.5) * 0.8}deg)`;
      break;
    }
    default: t = `scale(${1 + 0.06 * p})`;
  }
  return <AbsoluteFill style={{ transform: t }}>{children}</AbsoluteFill>;
};

const FxOverlay: React.FC<{ fx: string[]; f: number }> = ({ fx, f }) => {
  const has = (k: string) => fx.includes(k);
  const els: React.ReactNode[] = [];
  if (has("flicker")) {
    const r = random(`fl${Math.floor(f / 2)}`);
    els.push(<AbsoluteFill key="fl" style={{ background: "#000", opacity: r > 0.86 ? 0.55 : r > 0.7 ? 0.2 : 0 }} />);
  }
  if (has("lightning")) {
    const flashes = [6, 9, 38];
    const o = Math.max(...flashes.map((s) => (f >= s && f < s + 5 ? (1 - (f - s) / 5) * 0.85 : 0)));
    els.push(<AbsoluteFill key="li" style={{ background: "#dfe8ff", opacity: o, mixBlendMode: "screen" }} />);
  }
  if (has("stinger")) {
    const o = f < 4 ? 0.9 - f * 0.22 : 0;
    els.push(<AbsoluteFill key="st" style={{ background: "#fff", opacity: o }} />);
  }
  if (has("red")) {
    els.push(<AbsoluteFill key="rd" style={{ background: BLOOD, opacity: 0.16 + 0.1 * Math.sin(f / 6), mixBlendMode: "multiply" }} />);
    els.push(<AbsoluteFill key="rd2" style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 30%, #5a0006aa 100%)" }} />);
  }
  if (has("heartbeat")) {
    const beat = f % 26;
    const o = beat < 3 ? 0.45 : beat < 8 ? 0.45 - (beat - 3) * 0.08 : beat >= 9 && beat < 11 ? 0.3 : 0;
    els.push(<AbsoluteFill key="hb" style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 35%, #000 100%)", opacity: o }} />);
  }
  if (has("glitch")) {
    const g = random(`g${Math.floor(f / 2)}`);
    if (g > 0.55) {
      const bars = Array.from({ length: 5 }).map((_, i) => {
        const y = random(`gy${f}${i}`) * 1920, h = 10 + random(`gh${f}${i}`) * 70;
        return <div key={i} style={{ position: "absolute", left: 0, right: 0, top: y, height: h, background: i % 2 ? "#00ffe140" : "#ff003c55", transform: `translateX(${(random(`gx${f}${i}`) - 0.5) * 120}px)` }} />;
      });
      els.push(<AbsoluteFill key="gl">{bars}</AbsoluteFill>);
    }
    els.push(<AbsoluteFill key="scan" style={{ backgroundImage: "repeating-linear-gradient(0deg, #00000055 0px, #00000055 2px, transparent 2px, transparent 5px)" }} />);
  }
  return <>{els}</>;
};

const Stamp: React.FC<{ text: string; f: number; acc?: string }> = ({ text, f, acc = BLOOD }) => {
  const n = Math.min(text.length, Math.floor(f / 2));
  const o = interpolate(f, [0, 4, 70, 85], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 250, left: 90, opacity: o }}>
      <div style={{ fontFamily: "Cinzel, Rozha", fontWeight: 900, fontSize: 64, letterSpacing: HI(text) ? 0 : 10, color: acc, textShadow: `0 0 18px ${acc}88` }}>
        {text.slice(0, n)}<span style={{ opacity: f % 10 < 5 ? 1 : 0 }}>▌</span>
      </div>
      <div style={{ height: 4, width: Math.min(1, f / 14) * 300, background: acc, marginTop: 4 }} />
    </div>
  );
};

const BigTitle: React.FC<{ text: string; f: number; dev?: boolean }> = ({ text, f, dev }) => {
  const o = interpolate(f, [0, 6, 55, 75], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const j = !dev && f < 20 ? (random(`bt${f}`) - 0.5) * 16 : 0;
  return (
    <div style={{ position: "absolute", top: 430, width: "100%", textAlign: "center", opacity: o }}>
      <div style={{ fontFamily: "Cinzel, Rozha", fontWeight: 900, fontSize: HI(text) ? 150 : 170, letterSpacing: HI(text) ? 0 : 12, color: BONE, transform: `translateX(${j}px) scale(${1.15 - 0.15 * Math.min(1, f / 30)})`,
        textShadow: dev ? `0 0 40px ${GOLD}, 0 6px 0 #3a1a00, 0 0 80px #000` : `${-j / 2}px 0 0 #ff003c, ${j / 2}px 0 0 #00ffe1, 0 0 50px #000` }}>{text}</div>
    </div>
  );
};

const Captions: React.FC<{ scene: HScene; frame: number; fps: number; acc?: string; dev?: boolean }> = ({ scene, frame, fps, acc = BLOOD, dev }) => {
  const ms = (frame / fps) * 1000;
  const tokens = scene.text.split(/\s+/).filter((t) => norm(t));
  const useText = tokens.length === scene.words.length;
  const words = scene.words.map((w, i) => ({ ...w, label: useText ? tokens[i] : w.w }));
  const hl = new Set((scene.highlight ?? []).map(norm));
  const chunks: typeof words[] = [];
  let cur: typeof words = [];
  words.forEach((w) => { cur.push(w); if (cur.length === 3 || /[,.!?]$/.test(w.label)) { chunks.push(cur); cur = []; } });
  if (cur.length) chunks.push(cur);
  if (!chunks.length) return null;
  const idx = Math.max(0, chunks.findIndex((c, i) => ms < (chunks[i + 1]?.[0].s ?? Infinity)));
  const chunk = chunks[idx];
  const pop = spring({ frame: frame - (chunk[0].s / 1000) * fps, fps, config: { damping: 14, stiffness: 200 } });
  return (
    <div style={{ position: "absolute", top: 1230, left: 70, right: 70, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "4px 34px", opacity: pop, transform: `translateY(${(1 - pop) * 20}px)` }}>
      {chunk.map((w, i) => {
        const spoken = ms >= w.s, active = ms >= w.s && ms < w.e + 100;
        const isHl = hl.has(norm(w.label));
        const jit = !dev && isHl && active ? (random(`cj${frame}${i}`) - 0.5) * 6 : 0;
        return (
          <span key={i} style={{
            fontFamily: "Fell, Tiro", fontSize: 104, lineHeight: 1.2, display: "inline-block",
            color: isHl ? (spoken ? acc : `${acc}55`) : spoken ? BONE : "#ece4d044",
            textShadow: isHl && spoken ? `0 0 24px ${acc}aa, 0 5px 0 #000` : "0 5px 0 #000, 0 0 20px #000",
            transform: `translate(${jit}px, ${jit / 2}px) scale(${active ? 1.04 : 1})`,
          }}>{w.label}</span>
        );
      })}
    </div>
  );
};

export const HorrorReel: React.FC<{ slug: string; timeline: HTimeline | null }> = ({ slug, timeline }) => {
  useFontsOnce();
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  if (!timeline) return null;
  const ms = (frame / fps) * 1000;
  const scenes = timeline.scenes;
  const si = Math.max(0, scenes.findIndex((s, i) => ms < (scenes[i + 1]?.startMs ?? Infinity)));
  const sc = scenes[si];
  const start = Math.round((sc.startMs / 1000) * fps);
  const nextStart = scenes[si + 1] ? Math.round((scenes[si + 1].startMs / 1000) * fps) : durationInFrames;
  const f = frame - start, dur = nextStart - start;
  const Shot = SHOTS[sc.shot] ?? SHOTS.loch;
  const fx = sc.fx ?? [];
  // fade between scenes via black dip
  const dip = interpolate(f, [0, 6], [1, 0], { extrapolateRight: "clamp" }) * (si === 0 ? 0 : 0.9) + interpolate(f, [dur - 5, dur], [0, 0.9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * (si === scenes.length - 1 ? 0 : 1);
  const dev = timeline.theme === "devotional";
  const acc = dev ? GOLD : BLOOD;
  const glitchInvert = fx.includes("glitch") && random(`inv${Math.floor(frame / 3)}`) > 0.9;

  return (
    <AbsoluteFill style={{ background: "#020405" }}>
      <AbsoluteFill style={{ filter: glitchInvert ? "invert(1) hue-rotate(180deg)" : undefined }}>
        <Camera kind={fx.includes("shake") && sc.camera !== "shake" ? "shake" : sc.camera} f={f} dur={dur}>
          <Shot f={f} dur={dur} fx={fx} scene={si} />
        </Camera>
      </AbsoluteFill>
      {/* fog */}
      {!dev && <>
      <AbsoluteFill style={{ backgroundImage: `url(${staticFile("fog.png")})`, backgroundSize: "1080px 1920px", backgroundPosition: `${(frame * 1.2) % 1080}px 0`, opacity: 0.16, mixBlendMode: "screen" }} />
      <AbsoluteFill style={{ backgroundImage: `url(${staticFile("fog.png")})`, backgroundSize: "1620px 2880px", backgroundPosition: `${-(frame * 0.7) % 1620}px 300px`, opacity: 0.1, mixBlendMode: "screen" }} />
      </>}
      {dev && <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 35%, #ffb44a22 0%, transparent 60%)", mixBlendMode: "screen" }} />}
      <FxOverlay fx={fx} f={f} />
      {/* vignette + grain */}
      <AbsoluteFill style={{ background: dev ? "radial-gradient(ellipse at 50% 42%, transparent 45%, #1a0800b0 100%)" : "radial-gradient(ellipse at 50% 42%, transparent 38%, #000000d0 100%)" }} />
      {!dev && <AbsoluteFill style={{ backgroundImage: `url(${staticFile("grain.png")})`, backgroundSize: "540px 960px", backgroundPosition: `${(frame % 4) * 13}px ${(frame % 3) * 9}px`, opacity: 0.22, mixBlendMode: "overlay" }} />}
      <AbsoluteFill style={{ background: "#000", opacity: dip }} />

      {sc.big && <BigTitle text={sc.big} f={f} dev={dev} />}
      {sc.stamp && <Stamp text={sc.stamp} f={f} acc={acc} />}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1150, height: 380, background: "radial-gradient(ellipse 70% 50% at 50% 50%, #000000b0 0%, #00000066 55%, transparent 100%)" }} />
      <Captions scene={sc} frame={frame} fps={fps} acc={acc} dev={dev} />

      {/* series + progress */}
      <div style={{ position: "absolute", top: 70, left: 90, right: 90, height: 5, background: "#ffffff18" }}>
        <div style={{ width: `${(frame / durationInFrames) * 100}%`, height: "100%", background: acc, boxShadow: `0 0 12px ${acc}` }} />
      </div>
      <div style={{ position: "absolute", top: 110, width: "100%", textAlign: "center", fontFamily: "Cinzel, Rozha", fontWeight: 900, fontSize: 36, letterSpacing: HI(timeline.series) ? 0 : 9, color: BONE, opacity: 0.85 }}>
        <span style={{ color: acc }}>●</span> {timeline.series ?? "MYTHOLOGICAL CREATURES"}{timeline.episode ? ` · #${timeline.episode}` : ""}
      </div>
      <div style={{ position: "absolute", top: 1640, width: "100%", textAlign: "center", fontFamily: "Fell, Tiro", fontSize: 38, color: "#ece4d088", letterSpacing: 3 }}>{timeline.handle}</div>

      {/* audio */}
      <Audio src={staticFile(`${slug}/voice.mp3`)} />
      {timeline.music ? <Audio src={staticFile(`${slug}/${timeline.music}`)} volume={0.5} /> : <Audio src={staticFile("sfx/drone.mp3")} volume={0.32} loop />}
      {scenes.map((s, i) => {
        const a = Math.round((s.startMs / 1000) * fps);
        const b = scenes[i + 1] ? Math.round((scenes[i + 1].startMs / 1000) * fps) : durationInFrames;
        const sfx = s.fx ?? [];
        return (
          <React.Fragment key={i}>
            {i > 0 && <Sequence from={Math.max(0, a - 8)} durationInFrames={40}><Audio src={staticFile("sfx/whoosh.mp3")} volume={0.35} /></Sequence>}
            {sfx.includes("stinger") && <Sequence from={a} durationInFrames={75}><Audio src={staticFile("sfx/stinger.mp3")} volume={0.55} /></Sequence>}
            {sfx.includes("thunder") && <Sequence from={a + 6} durationInFrames={120}><Audio src={staticFile("sfx/thunder.mp3")} volume={0.8} /></Sequence>}
            {sfx.includes("heartbeat") && <Sequence from={a} durationInFrames={b - a}><Audio src={staticFile("sfx/heartbeat.mp3")} volume={0.9} loop playbackRate={1.15} /></Sequence>}
            {sfx.includes("ping") && <Sequence from={a} durationInFrames={b - a}><Audio src={staticFile("sfx/ping.mp3")} volume={0.6} loop /></Sequence>}
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
