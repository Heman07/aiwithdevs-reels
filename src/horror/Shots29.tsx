import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #29 — Gremlins */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BONE = "#ddd5c0", SKIN = "#5a6a4a", METAL = "#8a929c";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const GremlinFig: React.FC<{ f: number; s?: number; skin?: string; eye?: string; tool?: boolean; grin?: boolean; hop?: boolean }> = ({ f, s = 1, skin = SKIN, eye = "#ffe23a", tool = true, grin = true, hop }) => {
  const b = hop ? -Math.abs(Math.sin(f / 4)) * 30 : 0;
  const arm = Math.sin(f / 2.5) * 30;
  return (
    <g transform={`translate(0 ${b}) scale(${s})`}>
      <path d="M-30 -10 L-50 60 L-80 70 M30 -10 L50 60 L80 70" stroke={skin} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <ellipse cx={0} cy={-60} rx={50} ry={60} fill={skin} stroke="#2a3020" strokeWidth={4} />
      <path d="M-46 -90 L-110 -40 L-120 -10" stroke={skin} strokeWidth={14} fill="none" strokeLinecap="round" />
      <g transform={`rotate(${arm} 46 -90)`}>
        <path d="M46 -90 L110 -60 L130 -110" stroke={skin} strokeWidth={14} fill="none" strokeLinecap="round" />
        {tool && <g transform="translate(130 -110) rotate(-30)"><rect x={-6} y={-70} width={12} height={70} fill={METAL} /><path d="M-22 -70 L-22 -96 L-8 -82 L8 -82 L22 -96 L22 -70 Z" fill={METAL} /></g>}
      </g>
      <g transform="translate(0 -150)">
        <path d="M-50 -10 L-150 -70 L-60 -40 Z M50 -10 L150 -70 L60 -40 Z" fill={skin} stroke="#2a3020" strokeWidth={4} />
        <path d="M-60 -20 C-70 -80 -30 -100 0 -100 C30 -100 70 -80 60 -20 C60 30 30 50 0 50 C-30 50 -60 30 -60 -20 Z" fill={skin} stroke="#2a3020" strokeWidth={4} />
        <path d="M-58 -50 Q0 -110 58 -50 L58 -60 Q0 -130 -58 -60 Z" fill="#4a3020" />
        <rect x={-50} y={-56} width={100} height={12} fill="#3a2a1a" />
        <circle cx={-24} cy={-50} r={18} fill="#2a2a30" stroke={METAL} strokeWidth={5} /><circle cx={24} cy={-50} r={18} fill="#2a2a30" stroke={METAL} strokeWidth={5} />
        <ellipse cx={-22} cy={-4} rx={12} ry={14} fill={eye} /><ellipse cx={22} cy={-4} rx={12} ry={14} fill={eye} />
        <ellipse cx={-22} cy={-2} rx={3} ry={10} fill="#000" /><ellipse cx={22} cy={-2} rx={3} ry={10} fill="#000" />
        {grin ? <g><path d="M-36 22 Q0 52 36 22 Q0 36 -36 22 Z" fill="#200404" />{[-26, -14, -2, 10, 22].map((x, i) => <path key={i} d={`M${x} ${26 + Math.abs(x) * -0.1} l4 8 l4 -8`} fill={BONE} />)}</g> : <path d="M-20 26 L20 26" stroke="#200404" strokeWidth={4} />}
      </g>
    </g>
  );
};

const Plane: React.FC<{ f: number; s?: number; fill?: string; smoke?: boolean }> = ({ f, s = 1, fill = "#2a3038", smoke }) => (
  <g transform={`scale(${s})`}>
    <path d="M-300 0 C-260 -40 200 -40 300 -10 C320 0 320 20 300 24 C200 40 -260 40 -300 0 Z" fill={fill} />
    <path d="M-60 -10 L-160 -220 L-100 -220 L60 -10 Z M-60 20 L-160 220 L-100 220 L60 20 Z" fill={fill} />
    <path d="M-280 -10 L-330 -100 L-290 -100 L-240 -10 Z" fill={fill} />
    {[-120, -70].map((y, i) => <circle key={i} cx={-110} cy={y} r={20} fill="#1a1a1a" />)}
    <path d="M220 -20 Q250 -30 270 -14" stroke="#9ab8d0" strokeWidth={10} fill="none" />
    {smoke && Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={-110 - i * 40 - (f * 4) % 40} cy={-100 - i * 10} r={16 + i * 6} fill="#3a3a3a" opacity={0.5 - i * 0.07} />)}
  </g>
);

const Clouds: React.FC<{ f: number; y?: number; speed?: number; c?: string }> = ({ f, y = 1000, speed = 6, c = "#dfe6ee" }) => (
  <g>{Array.from({ length: 6 }).map((_, i) => <ellipse key={i} cx={((i * 260 - f * speed) % 1600 + 1600) % 1600 - 260} cy={y + (i % 3) * 60} rx={260} ry={50} fill={c} opacity={0.35} />)}</g>
);

const GrWing: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#0a1428" bottom="#2a3a5a" id="gw1" />
    <Moon x={800} y={300} r={80} f={f} />
    <Clouds f={f} y={1050} speed={10} />
    <path d="M-40 700 L1120 920 L1120 1020 L-40 860 Z" fill="#3a4250" stroke="#5a6470" strokeWidth={4} />
    <path d="M200 760 L200 860 M500 816 L500 912 M800 872 L800 966" stroke="#2a3038" strokeWidth={4} />
    <g transform={`translate(${640 + Math.sin(f / 30) * 20} ${890 + Math.sin(f) * 2})`}><GremlinFig f={f} s={0.9} /></g>
    {Array.from({ length: 4 }).map((_, i) => <path key={i} d={`M${700 + i * 20} 930 l${10 + random(`gs${i}`) * 30} ${30 + ((f * 4 + i * 20) % 60)}`} stroke="#ffb43a" strokeWidth={4} />)}
    <rect x={0} y={0} width={W} height={H} fill="none" stroke="#0a0c10" strokeWidth={180} rx={300} />
    <rect x={90} y={90} width={W - 180} height={H - 180} rx={220} fill="none" stroke="#1a1e24" strokeWidth={20} />
  </svg>
);

const Raf: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#4a5a6a" bottom="#1a2028" id="gw2" />
    <path d="M60 1150 L60 560 Q540 300 1020 560 L1020 1150 Z" fill="#14181c" />
    <path d="M200 1150 L200 700 Q540 500 880 700 L880 1150 Z" fill="#06080a" />
    <g transform="translate(540 980) scale(0.9)"><Plane f={f} fill="#3a4a3a" /></g>
    {[200, 880].map((x, i) => <g key={i} transform={`translate(${x} 1150)`}><path d="M-26 0 L-30 -210 L30 -210 L26 0 Z" fill="#2a2a2a" /><circle cx={0} cy={-240} r={30} fill="#2a2a2a" /><path d="M-30 -260 Q0 -290 30 -260 L30 -240 L-30 -240 Z" fill="#4a3020" /></g>)}
    <rect y={1150} width={W} height={H} fill="#1a1c1e" />
  </svg>
);

const Gauge: React.FC<{ x: number; y: number; f: number; sp: number; label: string }> = ({ x, y, f, sp, label }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={120} fill="#0a0a0a" stroke="#4a4a4a" strokeWidth={14} />
    {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M0 -100 L0 -84`} stroke="#e8e0cc" strokeWidth={4} transform={`rotate(${i * 30})`} />)}
    <path d="M0 10 L0 -90" stroke="#ff4a2a" strokeWidth={6} transform={`rotate(${f * sp + Math.sin(f) * 20})`} />
    <circle r={10} fill="#e8e0cc" />
    <text y={60} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={22} fill="#e8e0cc">{label}</text>
  </g>
);

const Gauges: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#14120e" />
    <rect x={80} y={400} width={920} height={700} rx={30} fill="#2a261e" />
    <Gauge x={300} y={600} f={f} sp={9} label="FUEL" />
    <Gauge x={780} y={600} f={f} sp={-14} label="ALT" />
    <Gauge x={540} y={900} f={f} sp={22} label="RPM" />
    {(f % 16) < 8 && <circle cx={540} cy={480} r={20} fill={BLOOD} />}
    <g transform={`translate(${900} ${1020}) scale(0.35)`} opacity={(f % 50) < 10 ? 1 : 0}><GremlinFig f={f} /></g>
  </svg>
);

const GrReveal: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#060806" />
    <circle cx={540} cy={700} r={460} fill="#6a8a2a" opacity={0.08} />
    <g transform="translate(540 1000) scale(2.6)"><GremlinFig f={f} /></g>
  </svg>
);

const GrWar: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#06080e" bottom="#141a24" id="gw3" />
    {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${200 + i * 140} 1150 L${100 + i * 180 + Math.sin(f / 30 + i) * 200} 200`} stroke="#dfe6ff" strokeWidth={20} opacity={0.06} />)}
    {[[300, 500, 0.6], [700, 640, 0.5], [500, 800, 0.45]].map(([x, y, s], i) => <g key={i} transform={`translate(${((x + f * 3) % 1400) - 160} ${y}) scale(${s})`}><Plane f={f} fill="#4a5462" smoke={i === 0} /></g>)}
    <g transform={`translate(${((300 + f * 3) % 1400) - 160 - 70} ${500 - 80})`}><GremlinFig f={f} s={0.25} hop /></g>
    {(f % 22) < 3 && <circle cx={200 + random(`fl${Math.floor(f / 22)}`) * 700} cy={400 + random(`fm${Math.floor(f / 22)}`) * 500} r={60} fill="#ffb43a" opacity={0.6} />}
  </svg>
);

const Dahl: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0e0a06" />
    <circle cx={720} cy={600} r={260} fill="#ffcf7a" opacity={0.12} />
    <path d="M700 380 L760 380 L800 520 L660 520 Z" fill="#3a3020" /><path d="M730 520 L730 1000" stroke="#3a3020" strokeWidth={10} />
    <rect x={160} y={1000} width={760} height={30} fill="#3a2414" />
    <g transform="translate(560 980)"><rect x={-160} y={-80} width={320} height={80} rx={14} fill="#1a1a1a" /><rect x={-120} y={-200} width={240} height={140} fill="#e8e0cc" />{Array.from({ length: 5 }).map((_, i) => <rect key={i} x={-100} y={-180 + i * 22} width={(f * 4 + i * 60) % 200} height={6} fill="#2a2a2a" />)}</g>
    <g transform="translate(300 1000)"><path d="M-60 0 L-50 -260 L50 -260 L60 0 Z" fill="#1a1e24" /><circle cx={0} cy={-310} r={50} fill="#1a1e24" /><path d="M40 -220 L180 -120" stroke="#1a1e24" strokeWidth={26} strokeLinecap="round" /></g>
    <g transform="translate(860 960) scale(0.3)"><GremlinFig f={f} hop /></g>
  </svg>
);

const GrForest: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a4a3a" bottom="#0a1a12" id="gw4" />
    {Array.from({ length: 9 }).map((_, i) => <g key={i} transform={`translate(${i * 130 + 20} 1150)`}><rect x={-14} y={-200} width={28} height={200} fill="#2a1a10" /><path d={`M0 ${-520 - (i % 3) * 60} L-110 -180 L110 -180 Z`} fill="#0e2a18" /></g>)}
    <rect y={1150} width={W} height={H} fill="#0e1a10" />
    {Array.from({ length: 24 }).map((_, i) => <circle key={i} cx={random(`ff${i}`) * W} cy={600 + random(`fg${i}`) * 500 + Math.sin(f / 10 + i) * 20} r={4} fill="#d8ff8a" opacity={0.5 + Math.sin(f / 5 + i) * 0.4} />)}
    {[-1, 0, 1].map((k) => <g key={k} transform={`translate(${540 + k * 250} 1150) scale(0.45)`}><GremlinFig f={f + k * 4} skin="#7a9a5a" tool={false} grin={false} hop /></g>)}
  </svg>
);

const Factory: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <Sky top="#3a3030" bottom="#141010" id="gw5" />
      {Array.from({ length: 8 }).map((_, i) => <g key={i} transform={`translate(${i * 140 + 30} 1150) rotate(${i < t * 9 ? 90 : 0})`}><rect x={-14} y={-200} width={28} height={200} fill="#2a1a10" /><path d="M0 -480 L-90 -180 L90 -180 Z" fill="#14201a" opacity={i < t * 9 ? 0.5 : 1} /></g>)}
      <g opacity={t}>
        <rect x={160} y={760} width={760} height={390} fill="#1a1a1e" />
        {[0, 1, 2, 3].map((i) => <path key={i} d={`M${160 + i * 190} 760 L${260 + i * 190} 680 L${350 + i * 190} 760 Z`} fill="#1a1a1e" />)}
        {[300, 520].map((x, i) => <g key={i}><rect x={x} y={460} width={50} height={300} fill="#1a1a1e" />{Array.from({ length: 4 }).map((_, k) => <circle key={k} cx={x + 25 + k * 20} cy={430 - k * 60 - (f * 2) % 60} r={30 + k * 12} fill="#3a3a3a" opacity={0.5} />)}</g>)}
        {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={200 + i * 120} y={880} width={60} height={60} fill="#ffb43a" opacity={0.6} />)}
      </g>
      <rect y={1150} width={W} height={H} fill="#0e0c0a" />
    </svg>
  );
};

const Revenge: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#080404" />
    <circle cx={540} cy={760} r={480} fill={BLOOD} opacity={0.12 + Math.sin(f / 3) * 0.05} />
    {Array.from({ length: 7 }).map((_, i) => { const a = (i / 7) * Math.PI * 2 + f / 60; return <g key={i} transform={`translate(${540 + Math.cos(a) * 340} ${760 + Math.sin(a) * 340}) scale(0.4)`}><GremlinFig f={f + i * 3} eye={BLOOD} /></g>; })}
    <g transform="translate(540 760) scale(0.5) rotate(-30)"><Plane f={f} fill="#3a4250" smoke /></g>
  </svg>
);

const Hangar: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0e1014" />
    {[300, 780].map((x, i) => <g key={i}><path d={`M${x - 20} 200 L${x - 120} 560 L${x + 80} 560 Z`} fill="#dfe6ff" opacity={0.06} /><rect x={x - 40} y={190} width={80} height={20} fill="#3a3a3a" /></g>)}
    <g transform="translate(540 900) scale(1.4)"><Plane f={f} fill="#3a4250" /></g>
    <g transform="translate(300 1150)"><path d="M-30 0 L-36 -220 L36 -220 L30 0 Z" fill="#2a3a4a" /><circle cx={0} cy={-250} r={30} fill="#2a2a2a" /><path d="M30 -200 L80 -120" stroke="#2a3a4a" strokeWidth={18} /><rect x={74} y={-130} width={30} height={14} fill={METAL} /></g>
    <g transform="translate(720 980) scale(0.28)" opacity={(f % 60) < 20 ? 0.9 : 0}><GremlinFig f={f} /></g>
    <rect y={1150} width={W} height={H} fill="#1a1c20" />
  </svg>
);

const GrEyes: React.FC<ShotProps> = ({ f }) => {
  const o = clamp((f - 15) / 12);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#06080c" />
      <rect x={240} y={320} width={600} height={780} rx={240} fill="#0a1428" stroke="#3a3e46" strokeWidth={30} />
      <Clouds f={f} y={900} speed={14} c="#5a6a8a" />
      <clipPath id="gwin"><rect x={240} y={320} width={600} height={780} rx={240} /></clipPath>
      <g clipPath="url(#gwin)"><g opacity={o} transform="translate(540 1060) scale(2.2)"><GremlinFig f={f} eye={BLOOD} tool={false} /></g></g>
      <rect x={240} y={320} width={600} height={780} rx={240} fill="none" stroke="#3a3e46" strokeWidth={30} />
    </svg>
  );
};

export const SHOTS29: Record<string, React.FC<ShotProps>> = {
  grwing: GrWing, raf: Raf, gauges: Gauges, grreveal: GrReveal, grwar: GrWar, dahl: Dahl,
  grforest: GrForest, factory: Factory, revenge: Revenge, hangar: Hangar, greyes: GrEyes,
};
