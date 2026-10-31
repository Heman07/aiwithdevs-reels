import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { useFontsOnce } from "../fonts";
import { SHOTS } from "./registry";
import { BLOOD, BONE } from "./Horror";
const HI = (t?: string) => /[\u0900-\u097F]/.test(t ?? "");

/** Cover: key frame of the creature + huge title. Important content kept inside the 3:4 grid crop (y 240–1680). */
export const HorrorCover: React.FC<{ slug: string; timeline: any }> = ({ timeline }) => {
  useFontsOnce();
  if (!timeline?.cover) return null;
  const c = timeline.cover;
  const Shot = SHOTS[c.shot] ?? SHOTS.loch;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {c.image
        ? <AbsoluteFill><Img src={staticFile(c.image)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: c.imagePos ?? "50% 40%", filter: "contrast(1.08) saturate(0.85)" }} /></AbsoluteFill>
        : <AbsoluteFill style={{ transform: `scale(${c.zoom ?? 1.05})` }}><Shot f={c.frame ?? 60} dur={120} fx={c.fx ?? []} scene={c.scene ?? 99} /></AbsoluteFill>}
      {c.image && <AbsoluteFill style={{ background: "linear-gradient(to bottom, #000000aa 0%, transparent 22%, transparent 55%, #000000ee 82%)" }} />}
      <AbsoluteFill style={{ backgroundImage: `url(${staticFile("fog.png")})`, backgroundSize: "1080px 1920px", opacity: 0.16, mixBlendMode: "screen" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 35%, #000000e0 100%)" }} />
      <AbsoluteFill style={{ backgroundImage: `url(${staticFile("grain.png")})`, backgroundSize: "540px 960px", opacity: 0.25, mixBlendMode: "overlay" }} />
      <div style={{ position: "absolute", top: 280, width: "100%", textAlign: "center", fontFamily: "Cinzel, Rozha", fontWeight: 900, fontSize: 40, letterSpacing: HI(timeline.series) ? 0 : 10, color: BONE }}>
        <span style={{ color: BLOOD }}>●</span> {timeline.series} · #{timeline.episode}
      </div>
      <div style={{ position: "absolute", top: 1250, left: 40, right: 40, textAlign: "center", fontFamily: "Cinzel, Rozha", fontWeight: 900, fontSize: c.size ?? 150, lineHeight: HI(c.title) ? 1.3 : 1.0, color: BONE,
        textShadow: timeline.theme === "devotional" ? `0 0 40px #f2b544, 0 8px 0 #3a1a00, 0 0 60px #000` : `-5px 0 0 #ff003c, 5px 0 0 #00ffe1, 0 0 60px #000, 0 10px 0 #000` }}>{c.title}</div>
      {c.sub && <div style={{ position: "absolute", top: 1500, width: "100%", textAlign: "center" }}>
        <span style={{ fontFamily: "Fell, Tiro", fontSize: 66, color: BONE, background: "#000000b0", padding: "4px 28px", borderBottom: `5px solid ${timeline.theme === "devotional" ? "#f2b544" : BLOOD}` }}>{c.sub}</span>
      </div>}
    </AbsoluteFill>
  );
};
