import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #10 — Leprechaun (luchorpáin / King Fergus) */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", GOLD = "#e0b040", GREEN = "#2f6a3a";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const Sprite: React.FC<{ x: number; y: number; s?: number; f: number; eye?: string; hat?: boolean }> = ({ x, y, s = 1, f, eye = "#b8ff6a", hat }) => (
  <g transform={`translate(${x} ${y + Math.sin(f / 6 + x) * 4}) scale(${s})`}>
    <path d="M-22 0 L-14 -60 Q0 -70 14 -60 L22 0 Z" fill="#0a140c" stroke="#8ac08a" strokeOpacity={0.6} strokeWidth={2} />
    <circle cx={0} cy={-78} r={18} fill="#0a140c" stroke="#8ac08a" strokeOpacity={0.6} strokeWidth={2} />
    <path d="M-16 -82 L-30 -96 M16 -82 L30 -96" stroke="#0a140c" strokeWidth={5} />
    {hat && <><rect x={-24} y={-106} width={48} height={6} fill="#0a140c" /><rect x={-14} y={-136} width={28} height={30} fill="#0a140c" /><rect x={-14} y={-114} width={28} height={6} fill={GOLD} /></>}
    <circle cx={-6} cy={-80} r={3} fill={eye} /><circle cx={6} cy={-80} r={3} fill={eye} />
    <path d="M-6 -70 Q0 -66 6 -70" stroke="#000" strokeWidth={2} fill="none" />
  </g>
);

const Rainbow: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a3430" bottom="#060a08" id="l1" />
    {["#8a2a2a", "#8a6a2a", "#7a7a2a", "#2a6a3a", "#2a4a7a", "#4a2a6a"].map((c, i) => <path key={i} d={`M${-100 + i * 26} 1200 A${740 - i * 26} ${740 - i * 26} 0 0 1 ${1180 - i * 26} 1200`} stroke={c} strokeWidth={26} fill="none" opacity={0.35} />)}
    <path d="M0 1150 Q300 1060 540 1120 Q800 1180 1080 1100 V1920 H0 Z" fill="#071209" />
    <g transform="translate(900 1140)"><ellipse cx={0} cy={0} rx={60} ry={20} fill="#1a1a1a" /><path d="M-56 0 Q-60 70 0 74 Q60 70 56 0 Z" fill="#1a1a1a" />{Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={-40 + i * 11} cy={-8 - (i % 3) * 6} r={10} fill={GOLD} />)}<circle r={120} fill={GOLD} opacity={0.12 + 0.05 * Math.sin(f / 5)} /></g>
    {(f % 80) < 60 && <Sprite x={770} y={1150} f={f} hat />}
  </svg>
);

const King: React.FC<{ f: number; lying?: boolean; twisted?: boolean; fill?: string }> = ({ f, lying, twisted, fill = INK }) => (
  <g transform={lying ? "rotate(-90)" : undefined}>
    <path d="M-70 0 L-50 -260 Q0 -300 50 -260 L70 0 Z" fill={fill} stroke="#c8a060" strokeOpacity={0.6} strokeWidth={3} />
    <circle cx={0} cy={-300} r={44} fill={twisted ? "#8a8a78" : fill} stroke="#c8a060" strokeOpacity={0.6} strokeWidth={3} />
    <path d="M-36 -336 L-30 -370 L-12 -344 L0 -376 L12 -344 L30 -370 L36 -336 Z" fill={GOLD} />
    {twisted && <g><ellipse cx={-18} cy={-308} rx={10} ry={16} fill="#000" /><ellipse cx={20} cy={-298} rx={8} ry={10} fill="#000" /><path d="M-24 -270 Q0 -250 28 -280" stroke="#000" strokeWidth={8} fill="#000" /></g>}
  </g>
);

const Beach: React.FC<ShotProps> = ({ f, dur }) => {
  const drag = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <Sky top="#2a3a44" bottom="#0a1014" id="l2" />
      <Moon x={820} y={360} r={80} f={f} />
      <path d="M0 950 L1080 950 L1080 1100 L0 1100 Z" fill="#14242c" />
      {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${-100 + ((f * 2 + i * 200) % 1300)} ${960 + (i % 3) * 30} q60 -18 120 0`} stroke="#bfe" strokeOpacity={0.4} strokeWidth={3} fill="none" />)}
      <path d="M0 1100 Q540 1060 1080 1100 V1920 H0 Z" fill="#3a3428" />
      <g transform={`translate(${560 - drag * 160} ${1180 - drag * 60})`}><King f={f} lying /></g>
      {[0, 1, 2, 3, 4].map((i) => <Sprite key={i} x={300 - drag * 160 + i * 40} y={1110 - drag * 60 + (i % 2) * 30} s={0.9} f={f + i * 5} />)}
    </svg>
  );
};

const Grab: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a1014" />
    <circle cx={540} cy={900} r={400} fill="#5a8a9a" opacity={0.1} />
    <g transform={`translate(540 960) scale(${1 + Math.sin(f / 3) * 0.01})`}>
      <path d="M-300 260 C-320 120 -240 0 -140 -20 L180 -60 C260 -70 300 0 260 40 L60 80 L280 100 C320 104 320 160 280 170 L-60 220 Z" fill="#c8a080" stroke="#5a3a20" strokeWidth={4} />
      {[0, 1, 2].map((i) => <g key={i} transform={`translate(${-120 + i * 110} ${-60 + Math.sin(f / 2 + i) * 6}) rotate(${Math.sin(f / 3 + i) * 15})`}><Sprite x={0} y={0} s={1.6} f={f + i * 9} eye="#ff5a3a" /><path d={`M-20 -40 l${-30 - Math.sin(f / 2 + i) * 14} -20 M20 -40 l${30 + Math.sin(f / 2 + i) * 14} -20`} stroke="#0a140c" strokeWidth={6} /></g>)}
    </g>
    {Array.from({ length: 18 }).map((_, i) => <circle key={i} cx={random(`gw${i}`) * W} cy={600 + random(`gx${i}`) * 700} r={4} fill="#bfe" opacity={0.4} />)}
  </svg>
);

const Wish: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <defs><linearGradient id="lw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a6a6a" /><stop offset="1" stopColor="#020a0a" /></linearGradient></defs>
    <rect width={W} height={H} fill="url(#lw)" />
    <g transform="translate(540 900)">
      <circle r={240 + 20 * Math.sin(f / 5)} fill="#b8ff6a" opacity={0.12} />
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2 + f / 20;
        return <Sprite key={i} x={Math.cos(a) * 180} y={Math.sin(a) * 90 + 60} s={1.4} f={f} />;
      })}
    </g>
    {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={random(`wb${i}`) * W} cy={(1600 - ((f * (3 + random(`wv${i}`) * 3) + i * 60) % 1500))} r={4 + random(`wr${i}`) * 8} fill="none" stroke="#dff" strokeOpacity={0.5} strokeWidth={2} />)}
    <text x={540} y={1460} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={46} fill={BLOOD} opacity={clamp((f - 40) / 10)}>NEVER LOCH RUDRAIGE</text>
  </svg>
);

const Muirdris: React.FC<ShotProps> = ({ f }) => {
  const near = clamp((f - 5) / 40);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#010606" />
      <g transform={`translate(540 ${900}) scale(${0.6 + near * 0.6})`}>
        {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M${-500 + i * 100} ${Math.sin(f / 6 + i) * 40} q50 ${-60 - (i % 3) * 20} 100 0`} stroke="#0a1a14" strokeWidth={120 - i * 4} fill="none" strokeLinecap="round" />)}
        <path d="M-200 -160 C-100 -260 120 -260 220 -160 C260 -60 200 80 0 100 C-200 80 -260 -60 -200 -160 Z" fill="#0a1a14" stroke="#5aff9a" strokeOpacity={0.3} strokeWidth={4} />
        {[-120, -40, 40, 120].map((x, i) => <g key={i}><circle cx={x} cy={-120 + Math.abs(x) * 0.2} r={18} fill="#c8ff4a" opacity={0.9} /><ellipse cx={x} cy={-120 + Math.abs(x) * 0.2} rx={5} ry={16} fill="#000" /></g>)}
        <path d={`M-160 20 Q0 ${80 + 40 * Math.abs(Math.sin(f / 5))} 160 20 Z`} fill="#000" />
        {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M${-140 + i * 25} 26 l10 34 l10 -34`} fill="#e8e2d0" />)}
      </g>
      <g transform="translate(540 1500) scale(0.4)"><King f={f} twisted={near > 0.6} /></g>
    </svg>
  );
};

const Mirrors: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0806" />
    <path d="M0 1350 L1080 1350 L1080 1920 L0 1920 Z" fill="#140e08" />
    {[180, 540, 900].map((x, i) => (
      <g key={i} transform={`translate(${x} 860)`}>
        <ellipse cx={0} cy={0} rx={150} ry={250} fill="#c8a040" />
        <ellipse cx={0} cy={0} rx={130} ry={230} fill="#3a4a50" />
        <path d={`M-160 -250 Q0 -280 160 -250 L170 ${240 + Math.sin(f / 15 + i) * 8} Q0 ${270} -170 ${240 - Math.sin(f / 15 + i) * 8} Z`} fill="#2a1a14" stroke="#5a3a28" strokeWidth={3} />
        {[0, 1, 2, 3].map((k) => <path key={k} d={`M${-120 + k * 80} -240 Q${-110 + k * 80} 0 ${-125 + k * 80} 230`} stroke="#1a100c" strokeWidth={4} fill="none" />)}
      </g>
    ))}
    {[260, 820].map((x, i) => <g key={i}><rect x={x - 8} y={1280} width={16} height={70} fill="#e8d8b0" /><path d={`M${x - 10} 1280 Q${x} ${1250 - Math.sin(f / 3 + i) * 8} ${x + 10} 1280 Z`} fill="#ffb43a" /></g>)}
  </svg>
);

const Servant: React.FC<ShotProps> = ({ f }) => {
  const rev = clamp((f - 30) / 15);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0806" />
      <circle cx={540} cy={900} r={420} fill="#ffb43a" opacity={0.1} />
      <g transform="translate(300 1300)"><path d="M-50 0 L-36 -220 Q0 -250 36 -220 L50 0 Z" fill={INK} stroke="#c8a060" strokeOpacity={0.5} strokeWidth={3} /><circle cx={0} cy={-260} r={34} fill={INK} stroke="#c8a060" strokeOpacity={0.5} strokeWidth={3} /><path d="M36 -200 L180 -240" stroke={INK} strokeWidth={18} strokeLinecap="round" /></g>
      <g transform="translate(720 1300) scale(1.1)"><King f={f} twisted={rev > 0.3} /></g>
      <g transform="translate(720 600)" opacity={rev}><ellipse rx={130} ry={200} fill="#c8a040" /><ellipse rx={112} ry={182} fill="#3a4a50" /><g transform="translate(0 90) scale(0.9)"><King f={f} twisted /></g></g>
    </svg>
  );
};

const Fight: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#020808" />
    <g transform={`translate(560 900) rotate(${Math.sin(f / 5) * 10})`}>
      {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${-400 + i * 100} ${Math.sin(f / 4 + i) * 60} q50 -70 100 0`} stroke="#0a1a14" strokeWidth={110} fill="none" strokeLinecap="round" />)}
      {[-60, 20].map((x, i) => <circle key={i} cx={x} cy={-60} r={14} fill="#c8ff4a" />)}
    </g>
    <g transform={`translate(${460 + Math.sin(f / 3) * 30} ${1000 + Math.cos(f / 4) * 30}) rotate(${-30 + Math.sin(f / 3) * 20}) scale(0.7)`}><King f={f} twisted /><path d="M50 -200 L220 -420" stroke="#c8d0d8" strokeWidth={12} /></g>
    {Array.from({ length: 20 }).map((_, i) => <circle key={i} cx={500 + (random(`fb${i}`) - 0.5) * 500} cy={900 + (random(`fc${i}`) - 0.5) * 400 - (f * 3) % 200} r={6 + random(`fd${i}`) * 14} fill={BLOOD} opacity={0.5} />)}
  </svg>
);

const Cobbler: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0604" />
    <circle cx={700} cy={900} r={300} fill="#ffb43a" opacity={0.16 + 0.04 * Math.sin(f / 2)} />
    <path d="M100 1150 L980 1150 L980 1210 L100 1210 Z" fill="#2a1a0c" />
    <g transform="translate(700 1150)"><rect x={-8} y={-90} width={16} height={90} fill="#e8d8b0" /><path d={`M-10 -90 Q0 ${-130 - Math.sin(f / 3) * 10} 10 -90 Z`} fill="#ffb43a" /></g>
    <g transform="translate(420 1150) scale(2.6)"><Sprite x={0} y={0} f={f} hat eye={(f % 50) < 46 ? "#ffcf3a" : "#0a140c"} /></g>
    <g transform="translate(560 1110)"><path d="M-40 0 Q-40 -30 0 -30 L40 -30 Q60 -30 60 0 Z" fill="#3a2414" /></g>
    <g transform="translate(860 1100)"><path d="M-56 0 Q-60 70 0 74 Q60 70 56 0 Z" fill="#1a1a1a" />{Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={-40 + i * 11} cy={-8 - (i % 3) * 6} r={10} fill={GOLD} />)}</g>
  </svg>
);

const Carlingford: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#3a4a48" bottom="#0a100e" id="l3" />
    <path d="M0 1000 L300 600 L560 760 L760 560 L1080 900 V1100 H0 Z" fill="#1a2a20" />
    <path d="M0 1100 Q540 1040 1080 1100 V1920 H0 Z" fill="#0a140c" />
    {[[120, 200], [340, 240], [560, 210], [780, 250]].map(([x, h], i) => <g key={i}><rect x={x} y={1100 - h} width={180} height={h} fill="#1a1a18" /><path d={`M${x - 10} ${1100 - h} L${x + 90} ${1100 - h - 90} L${x + 190} ${1100 - h} Z`} fill="#121210" /><rect x={x + 70} y={1100 - h + 50} width={40} height={40} fill="#ffb43a" opacity={0.5} /></g>)}
    <g transform="translate(540 1380)">
      <rect x={-200} y={-60} width={400} height={140} rx={12} fill="#3a2a1a" />
      {Array.from({ length: 5 }).map((_, i) => <rect key={i} x={-160 + i * 70} y={-30} width={40} height={10} rx={5} fill="#e8e0cc" transform={`rotate(${i * 20 - 40} ${-140 + i * 70} -25)`} />)}
      <path d="M100 -40 L140 -40 L150 30 L90 30 Z" fill={GREEN} />
    </g>
  </svg>
);

const LepEyes: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#010302" />
    <g transform="translate(540 1050)"><ellipse cx={0} cy={0} rx={90} ry={30} fill="#1a1a1a" /><path d="M-84 0 Q-90 100 0 106 Q90 100 84 0 Z" fill="#1a1a1a" />{Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={-60 + i * 13} cy={-10 - (i % 3) * 8} r={13} fill={GOLD} />)}<circle r={200} fill={GOLD} opacity={0.12} /></g>
    {Array.from({ length: 40 }).map((_, i) => <path key={i} d={`M${i * 28} 1200 q6 -60 ${(i % 2 ? 10 : -10)} -120`} stroke="#0a1a0c" strokeWidth={8} fill="none" />)}
    {[[200, 980], [860, 1000], [380, 880], [700, 860], [120, 1140], [960, 1160]].map(([x, y], i) => {
      const on = (f + i * 17) % 80 < 64;
      return on ? <g key={i}><circle cx={x} cy={y} r={6} fill="#b8ff6a" /><circle cx={x + 22} cy={y} r={6} fill="#b8ff6a" /></g> : null;
    })}
  </svg>
);

export const SHOTS10: Record<string, React.FC<ShotProps>> = {
  rainbow: Rainbow, beach: Beach, grab: Grab, wish: Wish, muirdris: Muirdris, mirrors: Mirrors,
  servant: Servant, fight: Fight, cobbler: Cobbler, carlingford: Carlingford, lepeyes: LepEyes,
};
