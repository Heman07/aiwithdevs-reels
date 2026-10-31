import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #14 — Cyclops */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", FIRE = "#ff8a2a", BONE = "#ddd5c0";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const CaveBg: React.FC<{ id: string; glow?: string }> = ({ id, glow = FIRE }) => (
  <g>
    <defs><radialGradient id={id} cx="0.5" cy="0.7" r="0.7"><stop offset="0" stopColor={glow} stopOpacity="0.25" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient></defs>
    <rect width={W} height={H} fill="#070504" />
    <rect width={W} height={H} fill={`url(#${id})`} />
    <path d="M0 0 H1080 V420 Q800 300 540 380 Q280 300 0 420 Z" fill="#010101" />
    <path d="M0 1350 Q540 1290 1080 1350 V1920 H0 Z" fill="#0c0806" />
  </g>
);

export const Cyclops: React.FC<{ f: number; blind?: boolean; scream?: boolean; arm?: number; s?: number }> = ({ f, blind, scream, arm = 0, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <path d="M-220 0 L-180 -520 Q0 -600 180 -520 L220 0 Z" fill={INK} stroke="#c87a3a" strokeOpacity={0.5} strokeWidth={5} />
    <path d="M-140 0 L-150 300 M140 0 L150 300" stroke={INK} strokeWidth={90} />
    <path d={`M-180 -460 L${-300 - arm * 40} ${-160 - arm * 200} M180 -460 L${300 + arm * 40} ${-160 - arm * 200}`} stroke={INK} strokeWidth={70} strokeLinecap="round" />
    <ellipse cx={0} cy={-700} rx={150} ry={170} fill={INK} stroke="#c87a3a" strokeOpacity={0.5} strokeWidth={5} />
    {!blind && <><ellipse cx={0} cy={-730} rx={60} ry={44} fill="#ffcf3a" /><ellipse cx={0} cy={-730} rx={14} ry={40} fill="#000" /><circle cx={0} cy={-730} r={110} fill="#ffcf3a" opacity={0.12} /></>}
    {blind && <><ellipse cx={0} cy={-730} rx={56} ry={30} fill="#1a0404" /><path d="M-10 -705 L-14 -620 M10 -705 L18 -600" stroke={BLOOD} strokeWidth={10} /></>}
    <path d={`M-70 ${-620} Q0 ${scream ? -540 : -600} 70 -620 Z`} fill="#000" />
    {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${-56 + i * 22} -618 l8 18 l8 -18`} fill={BONE} />)}
  </g>
);

const CEye: React.FC<ShotProps> = ({ f }) => {
  const open = clamp((f - 10) / 15);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#030201" />
      <g transform="translate(540 820)">
        <ellipse rx={420} ry={320} fill="#0a0604" />
        <ellipse rx={240} ry={150 * open} fill="#ffcf3a" />
        <ellipse rx={50} ry={140 * open} fill="#000" />
        <ellipse rx={480} ry={300 * open} fill="#ffcf3a" opacity={0.08} />
        {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M${-230 + i * 50} ${-40 * open} l${10} ${80 * open}`} stroke="#c8902a" strokeWidth={4} opacity={0.5} />)}
      </g>
      {Array.from({ length: 8 }).map((_, i) => <g key={i} transform={`translate(${120 + i * 120} 1500) rotate(${random(`cb${i}`) * 180})`}><rect x={-40} y={-6} width={80} height={12} rx={6} fill={BONE} opacity={0.7} /></g>)}
    </svg>
  );
};

const CIsland: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#3a4a5a" bottom="#0a1018" id="cy1" />
    <Moon x={800} y={340} r={70} f={f} />
    <path d="M100 1100 L300 600 L520 760 L760 520 L1000 1100 Z" fill="#141a18" />
    <path d="M420 1100 C420 900 500 800 600 800 C700 800 780 900 780 1100 Z" fill="#000" />
    <circle cx={600} cy={1000} r={60} fill={FIRE} opacity={0.15} />
    {Array.from({ length: 6 }).map((_, i) => <ellipse key={i} cx={260 + i * 50} cy={1120} rx={26} ry={16} fill="#d8d0c0" />)}
    <path d="M0 1120 Q540 1100 1080 1130 V1920 H0 Z" fill="#081218" />
    <g transform={`translate(${200 + Math.min(f, 40) * 2} ${1180 + Math.sin(f / 9) * 6}) scale(0.5)`}><path d="M-260 0 L260 0 L200 80 L-200 80 Z" fill={INK} /><line x1={0} y1={0} x2={0} y2={-400} stroke={INK} strokeWidth={14} /><path d="M10 -380 Q160 -280 10 -120 Z" fill="#0b1416" /></g>
  </svg>
);

const Boulder: React.FC<ShotProps> = ({ f }) => {
  const roll = clamp(f / 40);
  return (
    <svg width={W} height={H}>
      <CaveBg id="cy2" />
      <circle cx={540} cy={900} r={260} fill="#7a8a9a" opacity={0.25 * (1 - roll)} />
      <g transform="translate(520 1350) scale(0.8)"><Cyclops f={f} arm={0.5} /></g>
      <g transform={`translate(${1000 - roll * 420} ${940}) rotate(${-roll * 200})`}><circle r={260} fill="#2a2420" stroke="#5a4a3a" strokeWidth={8} /><path d="M-120 -60 L40 -140 M-60 80 L120 40" stroke="#1a1410" strokeWidth={10} /></g>
      {[160, 240, 320].map((x, i) => <g key={i} transform={`translate(${x} 1360) scale(0.35)`}><path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill={INK} stroke="#c8a060" strokeOpacity={0.6} strokeWidth={6} /><circle cx={0} cy={-300} r={36} fill={INK} stroke="#c8a060" strokeOpacity={0.6} strokeWidth={6} /></g>)}
    </svg>
  );
};

const CEat: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <CaveBg id="cy3" glow={BLOOD} />
    <g transform="translate(540 1500) scale(0.95)"><Cyclops f={f} arm={1} /></g>
    {[[-1, 0], [1, 1]].map(([d, i]) => (
      <g key={i} transform={`translate(${540 + d * 330} ${560 + Math.sin(f / 4 + i) * 20}) rotate(${d * 20 + Math.sin(f / 3 + i) * 15}) scale(0.4)`}>
        <path d="M-40 0 L-30 -180 Q0 -200 30 -180 L40 0 Z" fill="#1a0a08" /><circle cx={0} cy={-210} r={30} fill="#1a0a08" />
        <path d={`M-30 -150 L${-90 - Math.sin(f / 2) * 20} -220 M30 -150 L${90 + Math.sin(f / 2) * 20} -220 M-20 0 L-50 120 M20 0 L50 120`} stroke="#1a0a08" strokeWidth={18} />
      </g>
    ))}
    {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={300 + random(`ce${i}`) * 480} cy={900 + ((f * 6 + i * 50) % 500)} r={6 + random(`cf${i}`) * 8} fill={BLOOD} />)}
  </svg>
);

const Wine: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <CaveBg id="cy4" />
    <g transform="translate(700 1500) scale(0.85)"><Cyclops f={f} arm={0.3} /></g>
    <g transform="translate(260 1340)">
      <path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill={INK} stroke="#c8a060" strokeOpacity={0.6} strokeWidth={3} />
      <circle cx={0} cy={-300} r={36} fill={INK} stroke="#c8a060" strokeOpacity={0.6} strokeWidth={3} />
      <path d="M40 -230 L150 -300" stroke={INK} strokeWidth={18} strokeLinecap="round" />
      <path d="M130 -320 L220 -320 Q220 -270 175 -262 Q130 -270 130 -320 Z" fill="#8a6a3a" /><ellipse cx={175} cy={-320} rx={45} ry={10} fill="#5a0a20" />
    </g>
    <text x={300} y={820} fontFamily="Fell" fontSize={70} fill="#ece4d0" opacity={clamp((f - 40) / 10)}>“Nobody.”</text>
  </svg>
);

const CStake: React.FC<ShotProps> = ({ f }) => {
  const thrust = clamp((f - 30) / 8);
  return (
    <svg width={W} height={H}>
      <CaveBg id="cy5" glow={BLOOD} />
      <g transform="translate(540 1650) scale(1.1)"><Cyclops f={f} blind={thrust >= 1} /></g>
      <g transform={`translate(${-200 + thrust * 520} ${1100 - thrust * 280}) rotate(-28)`}>
        <rect x={-500} y={-18} width={500} height={36} fill="#5a3a20" />
        <path d="M0 -18 L60 0 L0 18 Z" fill={FIRE} /><circle cx={30} cy={0} r={50 + 10 * Math.sin(f)} fill={FIRE} opacity={0.35} />
      </g>
      {thrust >= 1 && Array.from({ length: 20 }).map((_, i) => {
        const a = random(`cs${i}`) * Math.PI * 2, d = (f - 38) * (6 + random(`cd${i}`) * 10);
        return <circle key={i} cx={540 + Math.cos(a) * d} cy={850 + Math.sin(a) * d} r={6 + random(`cr${i}`) * 10} fill={BLOOD} />;
      })}
    </svg>
  );
};

const CScream: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a1214" bottom="#040203" id="cy6" />
    <path d="M200 1300 L360 700 L720 700 L880 1300 Z" fill="#0a0806" />
    <g transform="translate(540 1500) scale(0.85)"><Cyclops f={f} blind scream arm={Math.sin(f / 3) * 0.5 + 0.5} /></g>
    {[0, 1, 2, 3].map((i) => { const p = ((f / 14 + i / 4) % 1); return <circle key={i} cx={540} cy={860} r={80 + p * 500} fill="none" stroke={BLOOD} strokeWidth={10 * (1 - p)} opacity={1 - p} />; })}
    {[120, 960].map((x, i) => <g key={i} transform={`translate(${x} 1320) scale(0.4)`} opacity={0.8}><Cyclops f={f} /></g>)}
  </svg>
);

const Sheep: React.FC<{ x: number; f: number; man?: boolean }> = ({ x, f, man }) => (
  <g transform={`translate(${x} 1300)`}>
    <ellipse cx={0} cy={0} rx={130} ry={70} fill="#d8d0c0" />
    {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={-110 + i * 24} cy={-50 + (i % 2) * 10} r={28} fill="#e8e0d0" />)}
    <ellipse cx={-140} cy={-20} rx={34} ry={26} fill="#1a1a1a" />
    {[-80, -40, 50, 90].map((lx, i) => <rect key={i} x={lx} y={50} width={14} height={70} fill="#1a1a1a" />)}
    {man && <g><path d="M-90 74 L90 74" stroke={INK} strokeWidth={30} strokeLinecap="round" /><circle cx={-100} cy={74} r={22} fill={INK} /></g>}
  </g>
);

const CSheep: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <CaveBg id="cy7" glow="#aab8c8" />
    <g transform="translate(860 1500) scale(0.75)"><Cyclops f={f} blind arm={0.4} /></g>
    {[0, 1, 2].map((i) => <Sheep key={i} x={((f * 4 + i * 330) % 1500) - 300} f={f} man={i !== 1} />)}
  </svg>
);

const CShip: React.FC<ShotProps> = ({ f }) => {
  const throwP = clamp((f - 30) / 25);
  return (
    <svg width={W} height={H}>
      <Sky top="#2a3040" bottom="#080a10" id="cy8" />
      <path d="M0 1200 L0 600 L300 560 L420 1200 Z" fill="#0c0e0c" />
      <g transform="translate(200 640) scale(0.5)"><Cyclops f={f} blind arm={throwP > 0 ? 1 : 0.2} /></g>
      {throwP > 0 && <circle cx={260 + throwP * 520} cy={300 + Math.pow(throwP - 0.5, 2) * 2400 - 600} r={60} fill="#2a2420" />}
      <g transform={`translate(780 ${1180 + Math.sin(f / 8) * 8}) scale(0.6)`}><path d="M-260 0 L260 0 L200 80 L-200 80 Z" fill={INK} /><line x1={0} y1={0} x2={0} y2={-400} stroke={INK} strokeWidth={14} /><path d="M-60 -10 L-40 -120 Q-20 -140 0 -120 L20 -10 Z" fill={INK} /></g>
      <path d="M300 1200 Q700 1180 1080 1210 V1920 H300 Z" fill="#081218" />
      {throwP >= 1 && <ellipse cx={780} cy={1220} rx={200} ry={30} fill="none" stroke="#cfe" strokeWidth={6} opacity={0.6} />}
    </svg>
  );
};

const CPos: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#0a1a24" bottom="#020608" id="cy9" />
    <g transform="translate(540 760)" opacity={0.75}>
      <ellipse cx={0} cy={0} rx={300} ry={360} fill="#0e3a44" />
      <ellipse cx={-100} cy={-40} rx={40} ry={24} fill="#9affff" /><ellipse cx={100} cy={-40} rx={40} ry={24} fill="#9affff" />
      {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M${-260 + i * 46} 160 q${Math.sin(f / 6 + i) * 30} 160 ${-20 + i * 2} 320`} stroke="#0e3a44" strokeWidth={30} fill="none" />)}
      <path d="M380 -400 L380 400 M330 -440 Q330 -380 380 -380 Q430 -380 430 -440 M380 -460 L380 -380" stroke="#c8d8e0" strokeWidth={14} fill="none" />
    </g>
    <path d={`M-200 1250 ${Array.from({ length: 14 }).map((_, k) => `q50 ${-60 * (0.6 + 0.4 * Math.sin(f / 5 + k))} 100 0`).join(" ")} V1920 H-200 Z`} fill="#06141a" />
    <g transform={`translate(540 ${1230 + Math.sin(f / 4) * 20}) rotate(${Math.sin(f / 5) * 18}) scale(0.5)`}><path d="M-260 0 L260 0 L200 80 L-200 80 Z" fill={INK} /><line x1={0} y1={0} x2={0} y2={-400} stroke={INK} strokeWidth={14} /></g>
  </svg>
);

const SkullC: React.FC<{ glitch?: boolean; f: number }> = ({ f }) => (
  <g>
    <path d="M-300 100 C-340 -200 -180 -380 0 -380 C180 -380 340 -200 300 100 C280 220 180 280 0 290 C-180 280 -280 220 -300 100 Z" fill={BONE} stroke="#8a8270" strokeWidth={6} />
    <ellipse cx={0} cy={-40} rx={110} ry={90} fill="#1a1612" />
    <ellipse cx={-200} cy={60} rx={40} ry={30} fill="#3a3428" /><ellipse cx={200} cy={60} rx={40} ry={30} fill="#3a3428" />
    {[-120, 120].map((x, i) => <path key={i} d={`M${x} 250 L${x + (i ? 20 : -20)} 420`} stroke={BONE} strokeWidth={46} strokeLinecap="round" />)}
  </g>
);

const CSkull: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0806" />
    <circle cx={540} cy={820} r={420} fill="#e8d8b0" opacity={0.08} />
    <g transform={`translate(540 820) scale(${0.9 + Math.min(f, 40) * 0.004})`}><SkullC f={f} /></g>
    <circle cx={540} cy={780} r={150} fill="none" stroke={BLOOD} strokeWidth={6} opacity={0.5 + 0.5 * Math.sin(f / 5)} />
  </svg>
);

const Elephant: React.FC<ShotProps> = ({ f }) => {
  const rev = clamp((f - 15) / 25);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0806" />
      <g transform="translate(540 820)">
        <g opacity={1 - rev * 0.6}><SkullC f={f} /></g>
        <g opacity={rev}>
          <path d="M-320 -100 C-320 -380 320 -380 320 -100 C320 100 200 160 100 180 L60 520 Q40 580 0 560 L-10 200 C-200 180 -320 100 -320 -100 Z" fill="none" stroke="#5ab8ff" strokeWidth={6} strokeDasharray="20 12" />
          <path d="M-320 -60 C-480 -80 -520 160 -380 220 M320 -60 C480 -80 520 160 380 220" stroke="#5ab8ff" strokeWidth={6} fill="none" strokeDasharray="20 12" />
          <path d="M-80 180 Q-120 300 -200 300 M80 180 Q120 300 200 300" stroke="#f4eee0" strokeWidth={14} fill="none" />
        </g>
      </g>
      <text x={540} y={1480} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={44} fill="#5ab8ff" opacity={rev}>PALAEOLOXODON · DWARF ELEPHANT</text>
    </svg>
  );
};

export const SHOTS14: Record<string, React.FC<ShotProps>> = {
  ceye: CEye, cisland: CIsland, boulder: Boulder, ceat: CEat, wine: Wine, cstake: CStake,
  cscream: CScream, csheep: CSheep, cship: CShip, cpos: CPos, cskull: CSkull, elephant: Elephant,
};
