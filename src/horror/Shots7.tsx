import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #7 — Fairies */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", FAE = "#b8ffcf";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const Wisps: React.FC<{ f: number; n?: number; color?: string; y0?: number; spread?: number }> = ({ f, n = 14, color = FAE, y0 = 700, spread = 700 }) => (
  <g>
    {Array.from({ length: n }).map((_, i) => {
      const x = random(`wx${i}`) * W + Math.sin(f / (20 + i) + i) * 60;
      const y = y0 + random(`wy${i}`) * spread + Math.cos(f / (25 + i) + i) * 40;
      const p = 0.4 + 0.6 * Math.abs(Math.sin(f / 12 + i));
      return <g key={i}><circle cx={x} cy={y} r={30} fill={color} opacity={0.12 * p} /><circle cx={x} cy={y} r={6} fill={color} opacity={p} /></g>;
    })}
  </g>
);

const Oaks: React.FC<{ tint?: string }> = ({ tint = "#050a08" }) => (
  <g>
    {[60, 300, 820, 1040].map((x, i) => (
      <g key={i}>
        <path d={`M${x - 50} 1920 C${x - 40} 1200 ${x - 80} 900 ${x - 20} 400 L${x + 30} 400 C${x + 60} 900 ${x + 40} 1200 ${x + 60} 1920 Z`} fill={tint} />
        {[500, 700, 900].map((y, k) => <path key={k} d={`M${x} ${y} C${x + (k % 2 ? 120 : -120)} ${y - 80} ${x + (k % 2 ? 200 : -200)} ${y - 60} ${x + (k % 2 ? 260 : -260)} ${y - 160}`} stroke={tint} strokeWidth={22 - k * 4} fill="none" />)}
      </g>
    ))}
  </g>
);

const FGlow: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#0f2a22" bottom="#020504" id="fa1" />
    <Moon x={540} y={380} r={90} f={f} />
    <Oaks />
    <path d="M0 1220 Q540 1160 1080 1220 V1920 H0 Z" fill="#030806" />
    <Wisps f={f} n={18} y0={600} spread={600} />
  </svg>
);

const Fallen: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#3a2a40" bottom="#050308" id="fa2" />
    <circle cx={540} cy={200} r={300} fill="#fff4d0" opacity={0.25} />
    {Array.from({ length: 7 }).map((_, i) => {
      const t = ((f * (4 + i % 3) + i * 120) % 1600);
      const x = 120 + i * 140 + Math.sin(i) * 40;
      return (
        <g key={i} transform={`translate(${x} ${t - 200}) rotate(${150 + i * 10})`} opacity={0.9}>
          <path d="M0 0 C-60 -20 -120 -80 -150 -160 C-90 -120 -40 -100 0 -60 Z M0 0 C60 -20 120 -80 150 -160 C90 -120 40 -100 0 -60 Z" fill={INK} stroke="#ffb07a" strokeOpacity={0.6} strokeWidth={3} />
          <circle cx={0} cy={20} r={18} fill={INK} /><path d="M-14 36 L14 36 L10 110 L-10 110 Z" fill={INK} />
          <path d="M-150 -160 l-30 -40 M150 -160 l30 -40" stroke="#ff7a2a" strokeWidth={6} opacity={0.6} />
        </g>
      );
    })}
    <path d="M0 1500 L1080 1500 L1080 1920 L0 1920 Z" fill="#050305" />
  </svg>
);

const FRing: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#102a24" bottom="#020504" id="fa3" />
    <Moon x={800} y={360} r={80} f={f} />
    <Oaks tint="#061210" />
    <path d="M0 1050 Q540 990 1080 1050 V1920 H0 Z" fill="#05100c" />
    <g transform="translate(540 1110)">
      <ellipse rx={360} ry={110} fill={FAE} opacity={0.06 + 0.04 * Math.sin(f / 6)} />
      {Array.from({ length: 22 }).map((_, i) => {
        const a = (i / 22) * Math.PI * 2;
        return <g key={i} transform={`translate(${Math.cos(a) * 340} ${Math.sin(a) * 100})`}><rect x={-5} y={-30} width={10} height={30} fill="#d8d0b8" /><path d="M-26 -28 Q0 -60 26 -28 Z" fill="#c0402a" /></g>;
      })}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2 + f / 20;
        return <g key={i} transform={`translate(${Math.cos(a) * 200} ${Math.sin(a) * 60 - 60 + Math.sin(f / 4 + i) * 10})`}><circle r={24} fill={FAE} opacity={0.18} /><circle r={7} fill={FAE} /><path d="M-6 -2 q-20 -24 -10 -30 q10 6 10 30 M6 -2 q20 -24 10 -30 q-10 6 -10 30" fill={FAE} opacity={0.6} /></g>;
      })}
    </g>
    {Array.from({ length: 5 }).map((_, i) => {
      const p = ((f / 40 + i / 5) % 1);
      return <text key={i} x={540 + (i - 2) * 120 + p * 30} y={900 - p * 260} fontFamily="serif" fontSize={56} fill={FAE} opacity={1 - p}>♪</text>;
    })}
  </svg>
);

const Feast: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#040806" />
    <circle cx={540} cy={900} r={420} fill={FAE} opacity={0.06} />
    <path d="M120 1100 L960 1100 L1000 1180 L80 1180 Z" fill="#1a1410" />
    <g transform="translate(400 980)"><path d="M-70 -120 L70 -120 Q70 0 10 20 L10 110 L60 130 L-60 130 L-10 110 L-10 20 Q-70 0 -70 -120 Z" fill="#b8c0a0" stroke={FAE} strokeOpacity={0.5} strokeWidth={3} /><ellipse cx={0} cy={-120} rx={70} ry={14} fill="#6a1a3a" /></g>
    <g transform="translate(700 1060)">
      {[[-60, 0], [0, -40], [60, 0], [-30, -70], [30, -70]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={34} fill={["#a02040", "#c03050", "#8a1a40"][i % 3]} stroke={FAE} strokeOpacity={0.4} strokeWidth={2} />)}
      <circle cx={0} cy={-40} r={120 + 10 * Math.sin(f / 5)} fill={FAE} opacity={0.08} />
    </g>
    <path d={`M${560 + Math.sin(f / 10) * 10} 1300 l-10 -120 l12 0 l6 80 l6 -100 l12 0 l2 100 l10 -90 l12 2 l-6 92 l14 -70 l12 4 l-14 104 Z`} fill="#0a100c" stroke="#e8e0c8" strokeOpacity={0.4} strokeWidth={2} transform="rotate(180 600 1250)" />
    <Wisps f={f} n={8} y0={500} spread={400} />
  </svg>
);

const Cradle: React.FC<ShotProps> = ({ f }) => {
  const reach = clamp((f - 20) / 30);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#06070a" />
      <rect x={640} y={300} width={300} height={420} fill="#1a2030" /><circle cx={790} cy={420} r={70} fill="#dfe0e8" opacity={0.6} />
      <path d="M640 510 L940 510 M790 300 L790 720" stroke="#06070a" strokeWidth={16} />
      <path d="M640 720 L300 1400 L900 1400 L940 720 Z" fill="#dfe0e8" opacity={0.05} />
      <g transform={`translate(540 1120) rotate(${Math.sin(f / 10) * 4})`}>
        <path d="M-260 0 Q0 160 260 0 L240 -120 L-240 -120 Z" fill="#2a1a10" stroke="#5a3a20" strokeWidth={4} />
        {Array.from({ length: 9 }).map((_, i) => <line key={i} x1={-220 + i * 55} y1={-120} x2={-210 + i * 52} y2={30} stroke="#3a2414" strokeWidth={8} />)}
        <path d="M-300 120 Q0 200 300 120" stroke="#2a1a10" strokeWidth={16} fill="none" />
        <ellipse cx={-60} cy={-110} rx={60} ry={40} fill="#e8e0d0" />
      </g>
      <g opacity={reach}>
        <path d={`M${1080 - reach * 480} 900 C${1000 - reach * 400} 880 ${950 - reach * 380} 960 ${900 - reach * 400} 980 L${880 - reach * 400} 1020 L${1080} 1060 Z`} fill="#000" />
        {[0, 1, 2, 3].map((i) => <path key={i} d={`M${900 - reach * 400} ${985 + i * 10} l-90 ${-20 + i * 14}`} stroke="#000" strokeWidth={10} strokeLinecap="round" />)}
      </g>
    </svg>
  );
};

const Changeling: React.FC<ShotProps> = ({ f }) => {
  const eye = clamp((f - 15) / 10);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#040404" />
      <circle cx={540} cy={860} r={360} fill="#4a5a50" opacity={0.15} />
      <g transform="translate(540 980)">
        <path d="M-320 160 Q0 300 320 160 L300 0 L-300 0 Z" fill="#1a1410" />
        <path d="M-260 20 Q0 160 260 20 Q200 -60 0 -70 Q-200 -60 -260 20 Z" fill="#c8c0b0" />
        <ellipse cx={0} cy={-180} rx={150} ry={170} fill="#8a9a88" />
        <path d="M-150 -220 Q-210 -260 -190 -330 Q-150 -270 -120 -270 Z M150 -220 Q210 -260 190 -330 Q150 -270 120 -270 Z" fill="#8a9a88" />
        <ellipse cx={-55} cy={-190} rx={36} ry={30 * eye + 2} fill="#000" /><ellipse cx={55} cy={-190} rx={36} ry={30 * eye + 2} fill="#000" />
        <circle cx={-55} cy={-190} r={8 * eye} fill={FAE} /><circle cx={55} cy={-190} r={8 * eye} fill={FAE} />
        <path d={`M-50 -90 Q0 ${-70 + 20 * Math.abs(Math.sin(f / 4))} 50 -90`} stroke="#000" strokeWidth={8} fill="#000" />
        {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${-36 + i * 14} -86 l5 12 l5 -12`} fill="#e8e2d0" />)}
      </g>
    </svg>
  );
};

const Cottage: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a2024" bottom="#030405" id="fa4" />
    <Moon x={260} y={360} r={70} f={f} />
    <path d="M0 1150 Q540 1080 1080 1150 V1920 H0 Z" fill="#060807" />
    <g transform="translate(540 1150)">
      <rect x={-330} y={-320} width={660} height={320} fill="#d8d0c0" opacity={0.15} />
      <rect x={-330} y={-320} width={660} height={320} fill="none" stroke="#8a8270" strokeOpacity={0.5} strokeWidth={4} />
      <path d="M-380 -320 L0 -560 L380 -320 Z" fill="#2a2418" />
      {Array.from({ length: 12 }).map((_, i) => <line key={i} x1={-360 + i * 60} y1={-330} x2={-330 + i * 50} y2={-500 + Math.abs(i - 6) * 30} stroke="#3a3020" strokeWidth={4} />)}
      <rect x={-230} y={-230} width={110} height={110} fill="#ff9a3a" opacity={0.65 + 0.2 * Math.sin(f / 2)} />
      <rect x={60} y={-260} width={130} height={260} fill="#0a0806" />
      <rect x={200} y={-620} width={60} height={160} fill="#1a1410" />
      {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={230 + Math.sin(f / 10 + i) * 30} cy={-660 - ((f * 2 + i * 40) % 300)} r={20 + i * 6} fill="#4a4a48" opacity={0.25} />)}
    </g>
  </svg>
);

const Hearth: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0302" />
    <circle cx={540} cy={1100} r={600} fill="#ff5a1a" opacity={0.22 + 0.06 * Math.sin(f / 2)} />
    <path d="M200 1300 L200 700 L880 700 L880 1300 Z" fill="#140806" stroke="#3a1a0a" strokeWidth={20} />
    {Array.from({ length: 9 }).map((_, i) => {
      const x = 260 + i * 70, h = 240 + Math.sin(f / 2.5 + i * 1.7) * 80 + (i % 3) * 40;
      return <g key={i}><path d={`M${x - 40} 1280 Q${x - 50} ${1280 - h * 0.5} ${x} ${1280 - h} Q${x + 50} ${1280 - h * 0.5} ${x + 40} 1280 Z`} fill="#c0201a" /><path d={`M${x - 20} 1280 Q${x - 24} ${1280 - h * 0.35} ${x} ${1280 - h * 0.6} Q${x + 24} ${1280 - h * 0.35} ${x + 20} 1280 Z`} fill="#ffb43a" /></g>;
    })}
    {Array.from({ length: 24 }).map((_, i) => <circle key={i} cx={260 + random(`hx${i}`) * 560} cy={1200 - ((f * (6 + random(`hv${i}`) * 6) + i * 50) % 900)} r={3} fill="#ffb43a" />)}
    <g transform="translate(870 1500) scale(1.6)" opacity={0.9}><path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill="#000" /><circle cx={0} cy={-300} r={36} fill="#000" /></g>
  </svg>
);

const Rhyme: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a2420" bottom="#030504" id="fa5" />
    <path d="M0 1150 Q540 1090 1080 1150 V1920 H0 Z" fill="#050806" />
    <g transform="translate(540 1150)">
      {Array.from({ length: 7 }).map((_, i) => {
        const a = (i / 7) * Math.PI * 2 + f / 40;
        const x = Math.cos(a) * 300, y = Math.sin(a) * 70, s = 0.75 + (Math.sin(a) + 1) * 0.12;
        return <g key={i} transform={`translate(${x} ${y}) scale(${s})`}><path d="M-40 0 L-26 -170 Q0 -196 26 -170 L40 0 Z" fill={INK} stroke="#8ab0a0" strokeOpacity={0.4} strokeWidth={3} /><circle cx={0} cy={-200} r={30} fill={INK} stroke="#8ab0a0" strokeOpacity={0.4} strokeWidth={3} /></g>;
      })}
      <circle cx={0} cy={-60} r={60 + 10 * Math.sin(f / 4)} fill={BLOOD} opacity={0.15} />
    </g>
    <Wisps f={f} n={6} y0={600} spread={300} />
  </svg>
);

const FairyCut: React.FC<{ x: number; y: number; s: number; f: number; pin?: boolean }> = ({ x, y, s, f, pin }) => (
  <g transform={`translate(${x} ${y + Math.sin(f / 10 + x) * 6}) scale(${s})`}>
    <path d="M0 0 C-50 -30 -90 -90 -80 -130 C-40 -110 -20 -70 0 -40 Z M0 0 C50 -30 90 -90 80 -130 C40 -110 20 -70 0 -40 Z" fill="#e8f0f0" opacity={0.85} />
    <circle cx={0} cy={-60} r={16} fill="#f0e0d0" /><path d="M-14 -44 L14 -44 L20 30 L-20 30 Z" fill="#f0e8f0" />
    {pin && <line x1={0} y1={30} x2={0} y2={200} stroke="#c8c8c8" strokeWidth={3} />}
  </g>
);

const Cottingley: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0b0a09" />
    <g transform={`translate(540 860) rotate(${-3 + Math.sin(f / 40)})`}>
      <rect x={-400} y={-480} width={800} height={960} fill="#e8e0cc" />
      <rect x={-370} y={-450} width={740} height={780} fill="#6e675c" />
      <path d="M-370 120 Q0 60 370 140 V330 H-370 Z" fill="#4a4438" />
      <g transform="translate(-140 330)"><circle cx={0} cy={-470} r={60} fill="#2a2620" /><path d="M-90 -400 L90 -400 L120 0 L-120 0 Z" fill="#2a2620" /><path d={`M-60 -420 Q-20 -380 10 -400`} stroke="#2a2620" strokeWidth={20} /></g>
      {[[60, -230], [180, -170], [120, -60], [250, -100]].map(([x, y], i) => <FairyCut key={i} x={x} y={y} s={0.9} f={f} />)}
      <text x={0} y={420} textAnchor="middle" fontFamily="Fell" fontSize={44} fill="#3a3630">Cottingley · 1917</text>
    </g>
  </svg>
);

const Cutout: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#1a1612" />
    <g transform="translate(540 760) scale(3)"><FairyCut x={0} y={0} s={1} f={f} pin /></g>
    <path d="M300 1300 L780 1300" stroke="#c8c8c8" strokeWidth={4} strokeDasharray="10 10" />
    <text x={540} y={1440} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={64} fill={BLOOD} opacity={clamp((f - 20) / 10)} transform="rotate(-5 540 1440)">PAPER + HATPINS</text>
  </svg>
);

export const SHOTS7: Record<string, React.FC<ShotProps>> = {
  fglow: FGlow, fallen: Fallen, fring: FRing, feast: Feast, cradle: Cradle, changeling: Changeling,
  cottage: Cottage, hearth: Hearth, rhyme: Rhyme, cottingley: Cottingley, cutout: Cutout,
};
