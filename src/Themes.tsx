import React from "react";
import { AbsoluteFill, random, staticFile, useCurrentFrame } from "remotion";

type Particle = "dust" | "stars" | "embers" | "fireflies" | "petals" | "bubbles";
type Land = "temple" | "hills" | "palms" | "rocks" | "waves" | "clouds" | "none";

export type ThemeSpec = { bg: [string, string, string]; accent: string; particle: Particle; pColor: string; land: Land; landColor: string; glow: string };

export const THEMES: Record<string, ThemeSpec> = {
  royal: { bg: ["#4a3220", "#24170e", "#0f0906"], accent: "#e0ac4a", particle: "dust", pColor: "#e0ac4a", land: "temple", landColor: "#1a1009", glow: "#e0ac4a" },
  night: { bg: ["#25336a", "#111a40", "#060920"], accent: "#c9d4f0", particle: "stars", pColor: "#f4ecd0", land: "hills", landColor: "#0a1130", glow: "#8fa8ff" },
  forest: { bg: ["#2a5a3a", "#12301f", "#06150d"], accent: "#d8c46a", particle: "fireflies", pColor: "#e8f070", land: "palms", landColor: "#071a10", glow: "#b8e070" },
  ember: { bg: ["#7a2414", "#3a100a", "#140403"], accent: "#f0a040", particle: "embers", pColor: "#ff9a3a", land: "rocks", landColor: "#1a0603", glow: "#ff6a2a" },
  ocean: { bg: ["#16606a", "#0a323c", "#031418"], accent: "#a8e0d8", particle: "bubbles", pColor: "#c8f0ea", land: "waves", landColor: "#04222a", glow: "#6ad8d0" },
  dawn: { bg: ["#a04a30", "#552236", "#1c0c1c"], accent: "#ffc070", particle: "petals", pColor: "#ffb0a0", land: "temple", landColor: "#200c1a", glow: "#ffa060" },
  cosmic: { bg: ["#4a2a7a", "#1e1040", "#09051a"], accent: "#e8c8ff", particle: "stars", pColor: "#fff0d0", land: "clouds", landColor: "#140a30", glow: "#c890ff" },
  himalaya: { bg: ["#4a6a8a", "#1f3048", "#0a1220"], accent: "#e8f0f8", particle: "petals", pColor: "#ffffff", land: "hills", landColor: "#0c1828", glow: "#cfe4ff" },
};

const W = 1080, H = 1920;

const Particles: React.FC<{ t: ThemeSpec; frame: number }> = ({ t, frame }) => (
  <svg width={W} height={H} style={{ position: "absolute" }}>
    {Array.from({ length: 30 }).map((_, i) => {
      const rx = random(`x${i}`), ry = random(`y${i}`), rs = random(`s${i}`), ro = random(`o${i}`);
      const x0 = rx * W;
      switch (t.particle) {
        case "stars": {
          const y = ry * 1100;
          const tw = 0.3 + 0.7 * Math.abs(Math.sin(frame / (10 + rs * 20) + i));
          const r = 1.5 + rs * 3;
          return <path key={i} d={`M${x0} ${y - r * 3} L${x0 + r} ${y} L${x0} ${y + r * 3} L${x0 - r} ${y} Z`} fill={t.pColor} opacity={tw * 0.9} />;
        }
        case "embers": {
          const y = H - ((ry * H + frame * (2 + rs * 3)) % H);
          return <circle key={i} cx={x0 + Math.sin(frame / 12 + i) * 20} cy={y} r={2 + rs * 3} fill={t.pColor} opacity={0.3 + ro * 0.6} />;
        }
        case "fireflies": {
          const x = x0 + Math.sin(frame / (25 + rs * 20) + i) * 60;
          const y = 300 + ry * 1300 + Math.cos(frame / (30 + rs * 15) + i) * 50;
          const pulse = 0.2 + 0.8 * Math.abs(Math.sin(frame / 14 + i * 2));
          return <circle key={i} cx={x} cy={y} r={3 + rs * 2} fill={t.pColor} opacity={pulse} />;
        }
        case "petals": {
          const y = (ry * H + frame * (1 + rs * 1.5)) % H;
          const x = x0 + Math.sin(frame / 20 + i) * 40;
          return <ellipse key={i} cx={x} cy={y} rx={6 + rs * 4} ry={3 + rs * 2} fill={t.pColor} opacity={0.35 + ro * 0.4} transform={`rotate(${frame * 2 + i * 40} ${x} ${y})`} />;
        }
        case "bubbles": {
          const y = H - ((ry * H + frame * (1 + rs * 2)) % H);
          return <circle key={i} cx={x0 + Math.sin(frame / 15 + i) * 15} cy={y} r={3 + rs * 6} fill="none" stroke={t.pColor} strokeWidth={1.5} opacity={0.25 + ro * 0.4} />;
        }
        default: {
          const y = (ry * H - frame * (0.4 + rs * 1.2) + H * 10) % H;
          return <circle key={i} cx={x0 + Math.sin(frame / 30 + i) * 14} cy={y} r={1.5 + rs * 3.5} fill={t.pColor} opacity={0.15 + ro * 0.35} />;
        }
      }
    })}
  </svg>
);

const LandShape: React.FC<{ t: ThemeSpec; frame: number }> = ({ t, frame }) => {
  const c = t.landColor;
  const base = 1150;
  let d: React.ReactNode = null;
  switch (t.land) {
    case "hills":
      d = <>
        <path d={`M0 ${base - 140} Q180 ${base - 330} 380 ${base - 180} Q560 ${base - 380} 760 ${base - 200} Q940 ${base - 300} 1080 ${base - 170} V${H} H0 Z`} fill={c} opacity={0.6} />
        <path d={`M0 ${base - 60} Q240 ${base - 200} 520 ${base - 80} Q800 ${base - 220} 1080 ${base - 70} V${H} H0 Z`} fill={c} />
      </>;
      break;
    case "palms":
      d = <>
        <path d={`M0 ${base - 40} Q540 ${base - 110} 1080 ${base - 40} V${H} H0 Z`} fill={c} />
        {[90, 260, 830, 990].map((x, i) => {
          const sway = Math.sin(frame / 30 + i) * 4;
          const h = 360 + (i % 2) * 90;
          return (
            <g key={i} transform={`rotate(${sway} ${x} ${base - 40})`}>
              <path d={`M${x - 8} ${base - 40} Q${x + 10} ${base - h / 2} ${x} ${base - h}`} stroke={c} strokeWidth={18} fill="none" />
              {[-70, -35, 0, 35, 70, 110, -110].map((a, j) => (
                <path key={j} d={`M${x} ${base - h} q60 -20 120 40 q-60 -10 -120 -40`} fill={c} transform={`rotate(${a} ${x} ${base - h})`} />
              ))}
            </g>
          );
        })}
      </>;
      break;
    case "rocks":
      d = <path d={`M0 ${base - 80} L90 ${base - 190} L170 ${base - 120} L260 ${base - 240} L340 ${base - 110} L700 ${base - 100} L780 ${base - 230} L870 ${base - 150} L960 ${base - 260} L1080 ${base - 130} V${H} H0 Z`} fill={c} />;
      break;
    case "waves":
      d = <>
        {[0, 1, 2].map((r) => (
          <path key={r} d={`M${-200 + ((frame * (1 + r * 0.5)) % 200)} ${base - 120 + r * 50} ${Array.from({ length: 10 }).map((_, k) => `q50 -40 100 0 q50 40 100 0`).join(" ")} V${H} H-200 Z`}
            fill={c} opacity={0.5 + r * 0.25} />
        ))}
      </>;
      break;
    case "clouds":
      d = <>
        {[0, 1].map((r) => (
          <g key={r} transform={`translate(${((frame * (0.6 + r * 0.4)) % 300) - 300} ${base - 160 + r * 90})`}>
            {Array.from({ length: 7 }).map((_, k) => <ellipse key={k} cx={k * 260} cy={0} rx={190} ry={90} fill={c} opacity={0.55 + r * 0.3} />)}
          </g>
        ))}
        <rect x={0} y={base} width={W} height={H - base} fill={c} />
      </>;
      break;
    case "temple":
      d = <>
        <path d={`M0 ${base - 60} H1080 V${H} H0 Z`} fill={c} />
        {[{ x: 70, w: 120, h: 300 }, { x: 860, w: 150, h: 380 }, { x: 980, w: 90, h: 240 }, { x: 200, w: 80, h: 200 }].map((tw, i) => (
          <g key={i}>
            <rect x={tw.x} y={base - 60 - tw.h + tw.w * 0.6} width={tw.w} height={tw.h - tw.w * 0.6} fill={c} />
            <path d={`M${tw.x - 8} ${base - 60 - tw.h + tw.w * 0.6} Q${tw.x + tw.w / 2} ${base - 60 - tw.h - tw.w * 0.3} ${tw.x + tw.w + 8} ${base - 60 - tw.h + tw.w * 0.6} Z`} fill={c} />
            <line x1={tw.x + tw.w / 2} y1={base - 60 - tw.h - tw.w * 0.1} x2={tw.x + tw.w / 2} y2={base - 60 - tw.h - tw.w * 0.1 - 50} stroke={c} strokeWidth={5} />
          </g>
        ))}
      </>;
      break;
    default:
      d = null;
  }
  return <svg width={W} height={H} style={{ position: "absolute" }}>{d}</svg>;
};

export const ThemeBackground: React.FC<{ name: string; opacity?: number }> = ({ name, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const t = THEMES[name] ?? THEMES.royal;
  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 35%, ${t.bg[0]} 0%, ${t.bg[1]} 55%, ${t.bg[2]} 100%)` }} />
      <div style={{ position: "absolute", left: 140, top: 250, width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle, ${t.glow}30 0%, transparent 65%)` }} />
      <LandShape t={t} frame={frame} />
      <AbsoluteFill style={{ background: `linear-gradient(to bottom, transparent 58%, ${t.bg[2]}ee 72%, ${t.bg[2]} 100%)` }} />
      <Particles t={t} frame={frame} />
      <AbsoluteFill style={{ backgroundImage: `url(${staticFile("grain.png")})`, backgroundSize: "540px 960px", backgroundPosition: `${(frame % 3) * 7}px ${(frame % 2) * 5}px`, opacity: 0.1, mixBlendMode: "overlay" }} />
      <div style={{ position: "absolute", inset: 36, border: `3px solid ${t.accent}55`, borderRadius: 18 }} />
      <div style={{ position: "absolute", inset: 50, border: `1.5px solid ${t.accent}33`, borderRadius: 12 }} />
    </AbsoluteFill>
  );
};
