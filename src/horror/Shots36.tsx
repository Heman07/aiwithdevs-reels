import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #36 — Banshee */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BONE = "#ddd5c0", GHOST = "#c8d8e0", SILVER = "#d8dce4";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const BansheeFig: React.FC<{ f: number; s?: number; wail?: number; hag?: boolean; op?: number; eye?: string }> = ({ f, s = 1, wail = 0, hag, op = 0.85, eye = BLOOD }) => {
  const fl = Math.sin(f / 8) * 10;
  return (
    <g transform={`scale(${s}) translate(0 ${fl})`} opacity={op}>
      <path d={`M-90 -420 C-130 -200 -160 -60 -200 60 C-120 40 -80 90 -40 50 C0 100 40 40 80 80 C120 30 160 70 200 50 C150 -60 130 -200 90 -420 Z`} fill={hag ? "#4a4a50" : GHOST} opacity={0.9} />
      {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${-150 + i * 60} ${40 + Math.sin(f / 5 + i) * 10} q10 40 ${(i % 2 ? 1 : -1) * 20} 80`} stroke={hag ? "#4a4a50" : GHOST} strokeWidth={14} opacity={0.5} fill="none" />)}
      <path d={`M-80 -400 L${-170 - wail * 40} ${-560 - wail * 80} M80 -400 L${170 + wail * 40} ${-560 - wail * 80}`} stroke={hag ? "#4a4a50" : GHOST} strokeWidth={24} strokeLinecap="round" />
      {[-1, 1].map((d) => <path key={d} d={`M${d * (170 + wail * 40)} ${-560 - wail * 80} l${d * 10} -30 M${d * (170 + wail * 40)} ${-560 - wail * 80} l${d * 24} -18 M${d * (170 + wail * 40)} ${-560 - wail * 80} l${d * 28} 0`} stroke={hag ? "#4a4a50" : GHOST} strokeWidth={6} strokeLinecap="round" />)}
      <g transform="translate(0 -500)">
        <path d={`M-70 -40 C-110 60 -150 200 ${-180 + Math.sin(f / 6) * 20} 360 M70 -40 C110 60 150 200 ${180 + Math.sin(f / 6 + 1) * 20} 360 M-40 -80 C-90 40 -100 200 ${-120 + Math.sin(f / 7) * 16} 380 M40 -80 C90 40 100 200 ${120 + Math.sin(f / 7 + 1) * 16} 380`} stroke={SILVER} strokeWidth={16} fill="none" opacity={0.85} />
        <ellipse cx={0} cy={-20} rx={56} ry={72} fill={hag ? "#8a8a80" : "#e8eef2"} />
        <path d="M-60 -50 Q0 -120 60 -50 Q30 -80 0 -80 Q-30 -80 -60 -50 Z" fill={SILVER} />
        <ellipse cx={-22} cy={-26} rx={12} ry={wail > 0.3 ? 14 : 8} fill="#1a0a0a" /><ellipse cx={22} cy={-26} rx={12} ry={wail > 0.3 ? 14 : 8} fill="#1a0a0a" />
        <circle cx={-22} cy={-26} r={4} fill={eye} /><circle cx={22} cy={-26} r={4} fill={eye} />
        <path d="M-24 -14 Q-26 20 -22 40 M24 -14 Q26 20 22 40" stroke={BLOOD} strokeWidth={3} opacity={0.6} fill="none" />
        <ellipse cx={0} cy={22 + wail * 14} rx={12 + wail * 8} ry={4 + wail * 34} fill="#120404" />
        {hag && <path d="M-40 0 Q-30 10 -40 20 M40 0 Q30 10 40 20 M-20 -60 L20 -60" stroke="#4a4a40" strokeWidth={3} fill="none" />}
      </g>
    </g>
  );
};

const Waves: React.FC<{ f: number; x: number; y: number; on: number }> = ({ f, x, y, on }) => (
  <g opacity={on}>{[0, 1, 2, 3].map((k) => { const r = ((f * 8 + k * 80) % 320) + 40; return <ellipse key={k} cx={x} cy={y} rx={r} ry={r * 0.6} fill="none" stroke={GHOST} strokeWidth={4} opacity={(1 - r / 360) * 0.6} />; })}</g>
);

const Hills: React.FC<{ f: number; id: string; top?: string; bottom?: string }> = ({ f, id, top = "#1a2230", bottom = "#04060a" }) => (
  <>
    <Sky top={top} bottom={bottom} id={id} />
    <Moon x={780} y={320} r={90} f={f} />
    <path d="M0 980 Q200 860 420 940 Q640 1010 820 900 Q960 840 1080 900 V1150 H0 Z" fill="#0c1410" />
    <rect y={1150} width={W} height={H} fill="#06100a" />
    {Array.from({ length: 6 }).map((_, i) => <ellipse key={i} cx={((i * 260 + f * 1.2) % 1500) - 200} cy={1080 + (i % 3) * 30} rx={300} ry={40} fill="#9aa8b0" opacity={0.08} />)}
  </>
);

const Comb: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Hills f={f} id="bn1" />
    <g transform="translate(540 1110) rotate(-8) scale(1.6)">
      <path d="M-120 -30 Q0 -70 120 -30 L120 0 L-120 0 Z" fill={SILVER} stroke="#8a8a90" strokeWidth={3} />
      {Array.from({ length: 22 }).map((_, i) => <rect key={i} x={-116 + i * 10.6} y={0} width={5} height={50} fill={SILVER} />)}
      <circle cx={0} cy={-34} r={8} fill={BLOOD} opacity={0.7} />
      {Array.from({ length: 4 }).map((_, i) => <path key={i} d={`M${-80 + i * 40} 10 q${20 + i * 6} 30 ${40 + i * 10} 50`} stroke={SILVER} strokeWidth={2} fill="none" opacity={0.5} />)}
    </g>
    <g transform="translate(900 1100) scale(0.4)" opacity={0.2 + Math.sin(f / 9) * 0.1}><BansheeFig f={f} /></g>
  </svg>
);

const Mound: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Hills f={f} id="bn2" top="#141c2a" />
    <path d="M200 1150 Q540 760 880 1150 Z" fill="#14201a" />
    <path d="M480 1150 L480 1040 Q540 1000 600 1040 L600 1150 Z" fill="#000" />
    {[300, 760].map((x, i) => <rect key={i} x={x - 18} y={1000} width={36} height={150} fill="#4a4a48" />)}
    <path d="M280 1000 L800 1000 L800 970 L280 970 Z" fill="#4a4a48" opacity={0} />
    <g transform="translate(540 1050) scale(0.55)"><BansheeFig f={f} op={0.5 + Math.sin(f / 10) * 0.2} /></g>
  </svg>
);

const House: React.FC<{ x: number; y: number; light?: boolean }> = ({ x, y, light = true }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-200} y={-260} width={400} height={260} fill="#14161a" />
    <path d="M-230 -260 L0 -380 L230 -260 Z" fill="#2a2a1e" />
    <rect x={-150} y={-200} width={80} height={90} fill={light ? "#ffcf7a" : "#0a0a0a"} opacity={light ? 0.7 : 1} />
    <rect x={70} y={-200} width={80} height={90} fill={light ? "#ffcf7a" : "#0a0a0a"} opacity={light ? 0.7 : 1} />
    <rect x={-35} y={-140} width={70} height={140} fill="#0a0806" />
  </g>
);

const BWail: React.FC<ShotProps> = ({ f, dur }) => {
  const w = clamp((f - 10) / 20);
  return (
    <svg width={W} height={H}>
      <Hills f={f} id="bn3" />
      <House x={820} y={1150} />
      <g transform="translate(400 1060) scale(1.15)"><BansheeFig f={f} wail={w} /></g>
      <Waves f={f} x={400} y={1060 - 1.15 * 470} on={w} />
    </svg>
  );
};

const BFaces: React.FC<ShotProps> = ({ f, dur }) => {
  const m = clamp((f - dur * 0.45) / 15);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#06080c" />
      <circle cx={540} cy={760} r={460} fill={GHOST} opacity={0.05} />
      <g transform="translate(540 1500) scale(1.6)" opacity={1 - m}><BansheeFig f={f} wail={0.1} /></g>
      <g transform="translate(540 1500) scale(1.6)" opacity={m}><BansheeFig f={f} hag eye="#ffcf3a" /></g>
    </svg>
  );
};

const Washer: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a2028" bottom="#06080a" id="bn4" />
    <Moon x={260} y={340} r={70} f={f} />
    <path d="M0 900 L1080 900 L1080 1150 L0 1150 Z" fill="#0a1418" />
    {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M0 ${920 + i * 28} Q540 ${910 + i * 28 + Math.sin(f / 8 + i) * 8} 1080 ${920 + i * 28}`} stroke="#2a3a44" strokeWidth={3} fill="none" />)}
    <path d={`M560 1040 Q660 ${1060 + Math.sin(f / 5) * 10} 820 1050 Q980 1060 1080 1040`} stroke={BLOOD} strokeWidth={22} fill="none" opacity={0.6} />
    <rect y={1150} width={W} height={H} fill="#060a08" />
    <path d="M0 1150 L200 1120 L400 1150 Z M600 1150 L800 1110 L1080 1150 Z" fill="#1a1a1a" />
    <g transform="translate(440 1080) scale(0.75)">
      <path d="M-120 0 C-140 -100 -100 -200 -40 -220 L60 -220 C120 -180 140 -80 140 0 Z" fill="#4a4a50" />
      <circle cx={-40} cy={-260} r={44} fill="#4a4a50" />
      <path d="M-80 -260 Q-60 -340 0 -300" fill="#3a3a40" />
      <path d={`M100 -100 L${200 + Math.sin(f / 3) * 20} -20`} stroke="#4a4a50" strokeWidth={22} strokeLinecap="round" />
      <path d={`M${180 + Math.sin(f / 3) * 20} -40 Q${240 + Math.sin(f / 3) * 30} -10 ${260 + Math.sin(f / 3) * 20} 40 L${200 + Math.sin(f / 3) * 20} 40 Z`} fill="#e8e0d0" />
      <path d={`M${200 + Math.sin(f / 3) * 20} 0 L${240 + Math.sin(f / 3) * 20} 30`} stroke={BLOOD} strokeWidth={10} />
    </g>
  </svg>
);

const Families: React.FC<ShotProps> = ({ f, dur }) => {
  const names = ["O'NEILL", "O'BRIEN", "O'CONNOR", "O'GRADY", "KAVANAGH"];
  const n = Math.min(5, Math.floor(clamp(f / (dur * 0.8)) * 6));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#080a08" />
      {names.map((nm, i) => (
        <g key={i} transform={`translate(${200 + (i % 3) * 340 - (i >= 3 ? -170 : 0)} ${500 + Math.floor(i / 3) * 420})`} opacity={i < n ? 1 : 0.12}>
          <path d="M-110 120 L-110 -100 Q0 -180 110 -100 L110 120 Z" fill="#3a3c3a" stroke="#5a5c58" strokeWidth={6} />
          <path d="M0 -130 L0 -40 M-40 -90 L40 -90" stroke="#5a5c58" strokeWidth={10} />
          <circle cx={0} cy={-90} r={30} fill="none" stroke="#5a5c58" strokeWidth={6} />
          <text y={50} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={30} fill={BONE}>{nm}</text>
        </g>
      ))}
      <g transform="translate(540 1150) scale(0.5)" opacity={0.25}><BansheeFig f={f} /></g>
    </svg>
  );
};

const Mourner: React.FC<{ x: number; f: number; i: number; ghost?: boolean }> = ({ x, f, i, ghost }) => (
  <g transform={`translate(${x} 1150)`} opacity={ghost ? 0.6 : 1}>
    <path d="M-60 0 L-40 -250 L40 -250 L60 0 Z" fill={ghost ? GHOST : "#1a1a20"} />
    <circle cx={0} cy={-280} r={34} fill={ghost ? GHOST : "#1a1a20"} />
    <path d={`M-40 -230 L${-90 - Math.sin(f / 4 + i) * 20} ${-360 - Math.sin(f / 4 + i) * 30} M40 -230 L${90 + Math.sin(f / 4 + i) * 20} ${-360 - Math.sin(f / 4 + i) * 30}`} stroke={ghost ? GHOST : "#1a1a20"} strokeWidth={16} strokeLinecap="round" />
  </g>
);

const Keeners: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0e0a08" />
    <circle cx={540} cy={800} r={360} fill="#ffb43a" opacity={0.06} />
    <rect x={340} y={960} width={400} height={120} fill="#3a2414" />
    <rect x={320} y={940} width={440} height={30} fill="#4a3020" />
    {[280, 800].map((x, i) => <g key={i}><rect x={x - 8} y={860} width={16} height={100} fill="#e8d8b0" /><path d={`M${x - 10} 860 Q${x} ${826 - Math.sin(f / 3 + i) * 8} ${x + 10} 860 Z`} fill="#ffb43a" /></g>)}
    {[140, 940].map((x, i) => <Mourner key={i} x={x} f={f} i={i} />)}
    <Waves f={f} x={540} y={600} on={0.5} />
  </svg>
);

const BCurse: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp((f - dur * 0.3) / (dur * 0.4));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#06060a" />
      <circle cx={540} cy={760} r={460} fill={BLOOD} opacity={0.06 + t * 0.05} />
      <g transform="translate(540 1150) scale(1.5)" opacity={1 - t}><Mourner x={0} f={f} i={0} /><g transform="translate(70 -220)"><path d="M-14 0 L14 0 L10 50 L-10 50 Z" fill="#6a4a2a" /></g></g>
      <g transform="translate(540 1100) scale(1.2)" opacity={t}><BansheeFig f={f} wail={0.8} /></g>
      <Waves f={f} x={540} y={540} on={t} />
    </svg>
  );
};

const Fanshawe: React.FC<ShotProps> = ({ f, dur }) => {
  const o = clamp((f - dur * 0.25) / 15) * (f > dur * 0.85 ? clamp((dur - f) / 8) : 1);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0806" />
      <rect x={260} y={300} width={560} height={760} fill="#0e1828" stroke="#3a2a1a" strokeWidth={30} />
      <path d="M540 300 V1060 M260 680 H820" stroke="#3a2a1a" strokeWidth={16} />
      <circle cx={680} cy={420} r={50} fill="#e8e0c8" opacity={0.6} />
      <clipPath id="fwin"><rect x={275} y={315} width={530} height={730} /></clipPath>
      <g clipPath="url(#fwin)"><g transform="translate(540 1500) scale(1.3)" opacity={o}><BansheeFig f={f} wail={0.6} /></g></g>
      <rect x={60} y={1060} width={960} height={90} fill="#3a2a1a" />
      <path d="M120 1150 L120 900 Q160 860 200 900 L200 1150" fill="#2a1a10" />
    </svg>
  );
};

const Morning: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#8a9aa8" bottom="#3a4250" id="bn5" />
    <path d="M0 980 Q300 900 600 960 Q860 1010 1080 940 V1150 H0 Z" fill="#3a4a3a" />
    <g transform="translate(540 1150)">
      <rect x={-300} y={-500} width={600} height={500} fill="#4a4a48" />
      {[-240, -80, 80, 240].map((x, i) => <rect key={i} x={x - 40} y={-420} width={80} height={110} fill="#1a1a1a" />)}
      <path d="M-300 -500 L-300 -560 L-240 -560 L-240 -520 L-180 -520 L-180 -560 L-120 -560 L-120 -520 L-60 -520 L-60 -560 L0 -560 L0 -520 L60 -520 L60 -560 L120 -560 L120 -520 L180 -520 L180 -560 L240 -560 L240 -520 L300 -520 L300 -500 Z" fill="#4a4a48" />
      <rect x={-60} y={-160} width={120} height={160} fill="#1a1208" />
      <path d="M-50 -470 L-50 -360" stroke="#000" strokeWidth={6} />
      <rect x={-70} y={-480} width={10} height={140} fill="#1a1a1a" />
      <path d="M-60 -480 L40 -470 L-60 -450 Z" fill="#000" />
    </g>
    <rect y={1150} width={W} height={H} fill="#2a3a2a" />
  </svg>
);

const BEyes: React.FC<ShotProps> = ({ f }) => {
  const o = clamp((f - 10) / 15);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#04060a" />
      <g opacity={o} transform="translate(540 2150) scale(2.6)"><BansheeFig f={f} wail={0.5 + Math.sin(f / 4) * 0.4} /></g>
      <Waves f={f} x={540} y={740} on={o} />
    </svg>
  );
};

export const SHOTS36: Record<string, React.FC<ShotProps>> = {
  comb: Comb, mound: Mound, bwail: BWail, bfaces: BFaces, washer: Washer, families: Families,
  keeners: Keeners, bcurse: BCurse, fanshawe: Fanshawe, morning: Morning, bneyes: BEyes,
};
