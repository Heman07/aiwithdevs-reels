import React from "react";
import { random } from "remotion";
import { ShotProps, Sky } from "./Shots";
import { Hero } from "./Shots24";

/* Creature #31 — Basilisk / Cockatrice */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BONE = "#ddd5c0", VENOM = "#9aff3a", GOLD = "#e0b040";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const BasiliskFig: React.FC<{ f: number; s?: number; fill?: string; eye?: string; glare?: number }> = ({ f, s = 1, fill = "#1a2a14", eye = VENOM, glare = 0 }) => (
  <g transform={`scale(${s})`}>
    <path d={`M-260 120 C-120 200 120 200 240 120 C320 60 260 -20 160 20 C40 70 -80 60 -120 -20 C-150 -100 -60 -180 ${Math.sin(f / 10) * 20} -220`} stroke={fill} strokeWidth={70} fill="none" strokeLinecap="round" />
    <path d={`M-260 120 C-120 200 120 200 240 120 C320 60 260 -20 160 20 C40 70 -80 60 -120 -20 C-150 -100 -60 -180 ${Math.sin(f / 10) * 20} -220`} stroke="#4a6a2a" strokeOpacity={0.6} strokeWidth={74} fill="none" strokeDasharray="4 22" />
    <g transform={`translate(${Math.sin(f / 10) * 20} -240)`}>
      <path d="M-70 20 C-80 -40 -40 -80 0 -84 C40 -80 80 -40 70 20 C50 50 -50 50 -70 20 Z" fill={fill} stroke="#4a6a2a" strokeWidth={4} />
      {[-50, -25, 0, 25, 50].map((x, i) => <path key={i} d={`M${x - 10} -70 L${x} ${-120 - (i === 2 ? 30 : i % 2 ? 0 : 14)} L${x + 10} -70 Z`} fill={GOLD} />)}
      <ellipse cx={-28} cy={-20} rx={18} ry={12} fill={eye} /><ellipse cx={28} cy={-20} rx={18} ry={12} fill={eye} />
      <ellipse cx={-28} cy={-20} rx={4} ry={11} fill="#000" /><ellipse cx={28} cy={-20} rx={4} ry={11} fill="#000" />
      <circle cx={-28} cy={-20} r={28 + glare * 26} fill={eye} opacity={0.12 + glare * 0.1} /><circle cx={28} cy={-20} r={28 + glare * 26} fill={eye} opacity={0.12 + glare * 0.1} />
      <path d="M-36 38 Q0 18 36 38 L30 44 Q0 30 -30 44 Z" fill="#200404" /><path d="M-22 32 l4 16 l4 -14 M14 30 l4 14 l4 -16" fill={BONE} />
      <path d={`M0 40 l-10 ${30 + Math.abs(Math.sin(f / 3)) * 20} M0 40 l10 ${30 + Math.abs(Math.sin(f / 3)) * 20}`} stroke={BLOOD} strokeWidth={5} />
    </g>
  </g>
);

export const CockatriceFig: React.FC<{ f: number; s?: number; fill?: string; eye?: string; wings?: boolean }> = ({ f, s = 1, fill = "#2a1a10", eye = BLOOD, wings = true }) => (
  <g transform={`scale(${s})`}>
    <path d={`M60 40 C200 80 260 ${180 + Math.sin(f / 8) * 30} 160 260 C80 320 -40 290 -60 220`} stroke="#1a2a14" strokeWidth={40} fill="none" strokeLinecap="round" />
    <path d="M-60 220 l-30 -20 l10 30 Z" fill="#1a2a14" />
    {wings && [-1, 1].map((d) => <path key={d} transform={`scale(${d} 1) rotate(${-Math.sin(f / 4) * 14} 20 -40)`} d="M20 -40 C100 -180 220 -220 300 -180 L270 -140 L300 -110 L240 -90 L260 -60 L180 -50 L100 -10 Z" fill="#1a1010" stroke="#6a3a3a" strokeOpacity={0.6} strokeWidth={4} />)}
    <path d="M-40 -60 C-80 20 -50 100 20 110 C90 100 110 20 70 -60 Z" fill={fill} stroke="#8a5a3a" strokeOpacity={0.6} strokeWidth={4} />
    {[-20, 30].map((x, i) => <g key={i}><path d={`M${x} 100 L${x - 6} 170`} stroke="#c8a040" strokeWidth={10} /><path d={`M${x - 6} 170 l-24 10 M${x - 6} 170 l0 20 M${x - 6} 170 l24 10`} stroke="#c8a040" strokeWidth={6} /></g>)}
    <path d="M-20 -50 C-40 -110 -20 -160 20 -170 C50 -160 60 -120 50 -60 Z" fill={fill} stroke="#8a5a3a" strokeOpacity={0.6} strokeWidth={4} />
    <g transform="translate(14 -180)">
      <circle r={44} fill={fill} />
      {[-30, -10, 10, 30].map((x, i) => <circle key={i} cx={x} cy={-44 - (i % 2) * 10} r={16} fill={BLOOD} />)}
      <path d="M-40 0 L-90 14 L-40 22 Z" fill={GOLD} />
      <path d="M-34 24 Q-40 60 -20 60 Q-10 40 -20 24 Z" fill={BLOOD} />
      <circle cx={-14} cy={-6} r={10} fill={eye} /><circle cx={-14} cy={-6} r={3} fill="#000" />
    </g>
  </g>
);

const Cellar: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0c0a08" />
    {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={240 + i * 10} y={300 + i * 100} width={600 - i * 20} height={30} fill="#2a2018" opacity={1 - i * 0.1} />)}
    <path d="M240 300 L540 1150 L840 300 Z" fill="#000" opacity={0.6} />
    <rect x={300} y={160} width={480} height={140} fill="#3a3020" />
    <rect x={320} y={180} width={440} height={120} fill="#ffcf7a" opacity={0.25} />
    <ellipse cx={540} cy={1120} rx={360} ry={60} fill="#000" />
    <g opacity={0.4 + Math.sin(f / 8) * 0.3}><ellipse cx={500} cy={1080} rx={10} ry={6} fill={VENOM} /><ellipse cx={540} cy={1080} rx={10} ry={6} fill={VENOM} /></g>
    {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={360 + i * 70 + Math.sin(f / 20 + i) * 30} cy={900 + Math.cos(f / 15 + i) * 40} r={70} fill="#4a5a2a" opacity={0.07} />)}
  </svg>
);

const BsReveal: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#040604" />
    <circle cx={540} cy={680} r={480} fill={VENOM} opacity={0.06 + Math.sin(f / 4) * 0.02} />
    <g transform="translate(540 1000) scale(1.6)"><BasiliskFig f={f} glare={clamp((f - 15) / 20)} /></g>
  </svg>
);

const Wither: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <Sky top="#3a3a2a" bottom="#14140c" id="bs1" />
      <rect y={1100} width={W} height={H} fill={`rgb(${40 + t * 40},${60 - t * 20},${20})`} />
      {Array.from({ length: 30 }).map((_, i) => { const x = random(`gr${i}`) * W; const dead = Math.abs(x - 540) < t * 600; return <path key={i} d={`M${x} 1100 q${dead ? 30 : 6} ${dead ? -30 : -60} ${dead ? 50 : 10} ${dead ? 0 : -90}`} stroke={dead ? "#6a5a3a" : "#3a6a2a"} strokeWidth={6} fill="none" />; })}
      <path d={`M300 1100 L${380 + t * 40} ${1050} L420 1100`} stroke="#000" strokeWidth={4} fill="none" />
      <path d="M700 1100 L700 960 Q780 940 820 1000 L820 1100 Z" fill="#4a4a40" />
      {t > 0.3 && <path d="M760 960 L740 1010 L770 1040 L750 1100" stroke="#000" strokeWidth={5} fill="none" />}
      <g transform="translate(520 1080) scale(0.55)"><BasiliskFig f={f} /></g>
      {[0, 1, 2].map((i) => { const bt = clamp(t * 2 - i * 0.3); return <g key={i} transform={`translate(${300 + i * 220} ${300 + bt * bt * 780}) rotate(${bt * 180})`}><path d="M-30 0 Q0 -20 30 0 Q0 -6 -30 0 Z" fill="#14100c" /><circle cx={-6} cy={-6} r={8} fill="#14100c" /></g>; })}
    </svg>
  );
};

const Spear: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp((f - 10) / (dur * 0.6));
  return (
    <svg width={W} height={H}>
      <Sky top="#2a2a1e" bottom="#0a0a06" id="bs2" />
      <rect y={1150} width={W} height={H} fill="#1a1a10" />
      <g transform="translate(820 1150) scale(0.5)"><BasiliskFig f={f} /></g>
      <g transform={`translate(400 1150) rotate(${t > 0.7 ? (t - 0.7) * 120 : 0} 0 0)`}>
        <path d="M-150 -220 C-60 -260 120 -260 180 -200 C200 -150 160 -120 120 -120 L-120 -120 C-170 -130 -180 -190 -150 -220 Z" fill={`rgb(${42 - t * 10},${30 + t * 40},${20})`} />
        <path d="M150 -220 L230 -320 L260 -300 L200 -200 Z" fill={`rgb(${42 - t * 10},${30 + t * 40},${20})`} />
        {[-110, -60, 90, 140].map((x, i) => <path key={i} d={`M${x} -130 L${x} 0`} stroke={`rgb(${42 - t * 10},${30 + t * 40},${20})`} strokeWidth={24} />)}
        <g transform="translate(0 -230)"><path d="M-30 0 L-30 -160 L30 -160 L30 0 Z" fill={`rgb(${30},${30 + t * 60},${30})`} /><circle cx={0} cy={-190} r={30} fill={`rgb(${30},${30 + t * 60},${30})`} /></g>
        <path d="M30 -340 L420 -60" stroke="#8a6a3a" strokeWidth={10} />
        <path d={`M420 -60 L${420 - t * 390} ${-60 - t * 280}`} stroke={VENOM} strokeWidth={14} opacity={0.8} />
      </g>
    </svg>
  );
};

const Egg: React.FC<ShotProps> = ({ f, dur }) => {
  const c = clamp((f - dur * 0.4) / (dur * 0.4));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0806" />
      <circle cx={540} cy={800} r={400} fill="#4a5a2a" opacity={0.1} />
      <ellipse cx={540} cy={1060} rx={320} ry={60} fill="#2a2014" />
      {Array.from({ length: 20 }).map((_, i) => <path key={i} d={`M${260 + i * 28} 1060 l${(random(`st${i}`) - 0.5) * 60} -40`} stroke="#5a4a2a" strokeWidth={6} />)}
      <g transform={`translate(${540 + Math.sin(f) * c * 4} 900)`}>
        <ellipse rx={110} ry={150} fill="#d8d0b8" />
        <ellipse rx={110} ry={150} fill="#6a7a3a" opacity={0.2} />
        {c > 0 && <path d={`M-90 -20 L-50 ${10 * c} L-10 -30 L30 ${20 * c} L70 -10 L100 10`} stroke="#000" strokeWidth={5} fill="none" />}
        {c > 0.6 && <g opacity={(c - 0.6) * 2.5}><ellipse cx={-14} cy={-10} rx={12} ry={8} fill={BLOOD} /><ellipse cx={20} cy={-10} rx={12} ry={8} fill={BLOOD} /></g>}
      </g>
      <g transform="translate(250 1040)"><ellipse rx={80} ry={50} fill="#3a4a2a" /><circle cx={-40} cy={-40} r={20} fill="#3a4a2a" /><circle cx={40} cy={-40} r={20} fill="#3a4a2a" /><circle cx={-40} cy={-42} r={9} fill="#ffcf3a" /><circle cx={40} cy={-42} r={9} fill="#ffcf3a" /></g>
      <g transform="translate(840 1040) scale(0.8)"><path d="M-40 0 C-60 -80 -20 -140 20 -140 C60 -120 70 -60 40 0 Z" fill="#3a2414" /><circle cx={10} cy={-170} r={40} fill="#3a2414" />{[-14, 6, 26].map((x, i) => <circle key={i} cx={x} cy={-210} r={14} fill={BLOOD} />)}<path d="M-26 -170 L-60 -160 L-26 -152 Z" fill={GOLD} /></g>
    </svg>
  );
};

const Cockatrice: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#080404" />
    <circle cx={540} cy={760} r={460} fill={BLOOD} opacity={0.09} />
    <g transform="translate(560 960) scale(1.7)"><CockatriceFig f={f} /></g>
  </svg>
);

const Trial: React.FC<ShotProps> = ({ f, dur }) => {
  const burn = clamp((f - dur * 0.5) / (dur * 0.3));
  return (
    <svg width={W} height={H}>
      <Sky top="#1a1210" bottom="#060402" id="bs3" />
      {[0, 1, 2, 3].map((i) => <g key={i} transform={`translate(${130 + i * 270} 1150)`}><rect x={-100} y={-380} width={200} height={380} fill="#140e0a" /><path d="M-120 -380 L0 -500 L120 -380 Z" fill="#0e0a06" /></g>)}
      <rect y={1150} width={W} height={H} fill="#1a1410" />
      <path d="M540 1150 L540 760" stroke="#3a2a1a" strokeWidth={22} />
      {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M${440 + i * 20} 1150 L${470 + i * 16} 1080`} stroke="#3a2a1a" strokeWidth={14} />)}
      <g transform="translate(540 900) scale(0.55)"><path d="M-40 0 C-60 -80 -20 -140 20 -140 C60 -120 70 -60 40 0 Z" fill="#3a2414" /><circle cx={10} cy={-170} r={40} fill="#3a2414" />{[-14, 6, 26].map((x, i) => <circle key={i} cx={x} cy={-210} r={14} fill={BLOOD} />)}<path d="M-26 -170 L-60 -160 L-26 -152 Z" fill={GOLD} /></g>
      {burn > 0 && Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M${440 + i * 18} 1150 Q${450 + i * 18 + Math.sin(f / 2 + i) * 20} ${1150 - burn * (200 + (i % 3) * 80)} ${460 + i * 18} 1150 Z`} fill={i % 2 ? "#ff8a1a" : "#ffcf3a"} opacity={0.85} />)}
      {[180, 900].map((x, i) => <g key={i} transform={`translate(${x} 1150) scale(${i ? -0.6 : 0.6} 0.6)`}><path d="M-60 0 L-50 -380 L50 -380 L60 0 Z" fill="#0a0806" /><circle cx={0} cy={-420} r={40} fill="#0a0806" /></g>)}
    </svg>
  );
};

const Weapons: React.FC<ShotProps> = ({ f, dur }) => {
  const t = f / dur;
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0c08" />
      {[
        <g key="w"><ellipse rx={90} ry={34} fill="#8a6a4a" /><circle cx={-90} cy={-14} r={30} fill="#8a6a4a" /><path d="M80 0 Q140 -10 160 -50" stroke="#8a6a4a" strokeWidth={16} fill="none" /><circle cx={-100} cy={-20} r={5} fill="#000" /></g>,
        <g key="r"><path d="M-40 40 C-60 -40 -20 -100 20 -100 C60 -80 70 -20 40 40 Z" fill="#c84a1a" /><circle cx={10} cy={-130} r={36} fill="#c84a1a" />{[-14, 6, 26].map((x, i) => <circle key={i} cx={x} cy={-166} r={12} fill={BLOOD} />)}<path d="M-24 -130 L-60 -120 L-24 -112 Z" fill={GOLD} />{[0, 1, 2].map((k) => <path key={k} d={`M-70 -120 q-${30 + k * 20} -10 -${30 + k * 20} -${30 + k * 10}`} stroke="#fff" strokeWidth={3} fill="none" opacity={0.6} />)}</g>,
        <g key="m"><ellipse rx={80} ry={110} fill="#b8c8d8" stroke={GOLD} strokeWidth={14} /><ellipse cx={-20} cy={-30} rx={20} ry={40} fill="#fff" opacity={0.5} /><path d="M0 110 L0 200" stroke={GOLD} strokeWidth={16} /></g>,
      ].map((el, i) => <g key={i} transform={`translate(${200 + i * 340} 820)`} opacity={clamp((t - i * 0.28) * 5)}>{el}</g>)}
    </svg>
  );
};

const MirrorSuit: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0806" />
    {Array.from({ length: 7 }).map((_, i) => <rect key={i} x={300 + i * 6} y={240 + i * 110} width={480 - i * 12} height={26} fill="#2a2018" />)}
    <path d="M540 300 L340 1150 L740 1150 Z" fill="#ffcf7a" opacity={0.05} />
    <g transform={`translate(540 ${1000 + Math.min(f, 40) * 3})`}>
      <path d="M-60 0 L-50 -300 L50 -300 L60 0 Z" fill="#3a3a40" /><circle cx={0} cy={-340} r={44} fill="#3a3a40" />
      {Array.from({ length: 30 }).map((_, i) => { const x = -50 + (i % 5) * 25, y = -300 + Math.floor(i / 5) * 50; return <rect key={i} x={x} y={y} width={20} height={36} fill="#cfe0f0" opacity={0.4 + Math.sin(f / 3 + i) * 0.4} />; })}
      {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={-34 + (i % 3) * 24} y={-370 + Math.floor(i / 3) * 30} width={18} height={22} fill="#cfe0f0" opacity={0.5 + Math.sin(f / 2 + i) * 0.4} />)}
    </g>
  </svg>
);

const Caught: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0806" />
    <circle cx={540} cy={760} r={440} fill={VENOM} opacity={0.06} />
    <g transform="translate(540 760) scale(0.9)"><CockatriceFig f={f} wings={false} eye="#ffcf3a" /></g>
    <path d="M400 1050 L460 960 M680 1050 L620 960" stroke="#3a3a40" strokeWidth={40} strokeLinecap="round" />
  </svg>
);

const Gas: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0c0a08" />
    <rect x={120} y={300} width={840} height={850} fill="#14100c" stroke="#2a2018" strokeWidth={20} />
    {Array.from({ length: 14 }).map((_, i) => <circle key={i} cx={200 + (i % 5) * 170 + Math.sin(f / 20 + i) * 40} cy={900 + Math.floor(i / 5) * 80 - Math.cos(f / 25 + i) * 30} r={130} fill="#6a8a2a" opacity={0.08} />)}
    <text x={540} y={700} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={90} fill={VENOM} opacity={0.5}>CO₂</text>
    <g opacity={0.5 + Math.sin(f / 6) * 0.4}><ellipse cx={520} cy={1100} rx={10} ry={6} fill={BLOOD} /><ellipse cx={560} cy={1100} rx={10} ry={6} fill={BLOOD} /></g>
  </svg>
);

export const SHOTS31: Record<string, React.FC<ShotProps>> = {
  cellar: Cellar, bsreveal: BsReveal, wither: Wither, spear: Spear, egg: Egg, cockatrice: Cockatrice,
  trial: Trial, weapons: Weapons, mirrorsuit: MirrorSuit, caught: Caught, gas: Gas,
};
