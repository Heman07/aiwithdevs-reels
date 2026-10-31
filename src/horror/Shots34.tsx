import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #34 — Kitsune */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BONE = "#ddd5c0", GOLD = "#e8b030", FOX = "#e8803a", FIRE = "#7ad8ff";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const FoxFig: React.FC<{ f: number; s?: number; tails?: number; fill?: string; eye?: string; glow?: boolean }> = ({ f, s = 1, tails = 1, fill = FOX, eye = "#ffe23a", glow }) => (
  <g transform={`scale(${s})`}>
    {Array.from({ length: tails }).map((_, i) => {
      const a = tails === 1 ? -0.5 : -1.5 + (i / (tails - 1)) * 1.9;
      const sw = Math.sin(f / 10 + i) * 0.08;
      const ex = 120 + Math.cos(a + sw) * 300, ey = -40 + Math.sin(a + sw) * 300;
      const cx = 120 + Math.cos(a + sw + 0.5) * 160, cy = -40 + Math.sin(a + sw + 0.5) * 160;
      return <g key={i}>
        <path d={`M110 -30 Q${cx} ${cy} ${ex} ${ey}`} stroke={fill} strokeWidth={44} fill="none" strokeLinecap="round" />
        <circle cx={ex} cy={ey} r={30} fill="#f4ecd8" />
        {glow && <circle cx={ex} cy={ey} r={40} fill={FIRE} opacity={0.25 + Math.sin(f / 4 + i) * 0.15} />}
      </g>;
    })}
    {[-100, -60, 60, 100].map((x, i) => <path key={i} d={`M${x} 0 L${x - 4} 110 L${x + 18} 110 L${x + 20} 0 Z`} fill={fill} />)}
    {[-100, -60, 60, 100].map((x, i) => <rect key={i} x={x - 6} y={100} width={26} height={14} fill="#1a0a04" />)}
    <ellipse cx={0} cy={-20} rx={150} ry={62} fill={fill} />
    <path d="M-120 0 Q-60 50 20 30" stroke="#f4ecd8" strokeWidth={30} fill="none" opacity={0.8} />
    <g transform="translate(-150 -80)">
      <path d="M-40 -30 L-60 -120 L-10 -60 Z M30 -40 L40 -130 L60 -50 Z" fill={fill} />
      <path d="M-34 -50 L-48 -100 L-18 -62 Z M34 -54 L42 -110 L52 -56 Z" fill="#1a0a04" />
      <path d="M-60 -20 C-60 -70 50 -80 60 -20 C60 20 0 40 -110 50 C-80 30 -70 10 -60 -20 Z" fill={fill} />
      <path d="M-110 50 C-70 50 -20 40 0 30 L-40 60 Z" fill="#f4ecd8" />
      <circle cx={-114} cy={48} r={8} fill="#1a0a04" />
      <path d="M-40 -20 L-10 -14" stroke="#1a0a04" strokeWidth={4} />
      <ellipse cx={-22} cy={-18} rx={10} ry={5} fill={eye} transform="rotate(-15 -22 -18)" />
      {glow && <circle cx={-22} cy={-18} r={20} fill={eye} opacity={0.3} />}
    </g>
  </g>
);

const Fire: React.FC<{ x: number; y: number; f: number; i: number }> = ({ x, y, f, i }) => (
  <g transform={`translate(${x + Math.sin(f / 10 + i) * 20} ${y + Math.cos(f / 12 + i) * 20})`}>
    <circle r={30} fill={FIRE} opacity={0.2} />
    <path d={`M-12 0 Q0 ${-40 - Math.sin(f / 3 + i) * 10} 12 0 Q0 14 -12 0 Z`} fill={FIRE} opacity={0.8} />
  </g>
);

const Rope: React.FC<{ x1: number; y1: number; x2: number; y2: number; broken?: boolean }> = ({ x1, y1, x2, y2, broken }) => (
  <g>
    <path d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 + 60} ${broken ? (x1 + x2) / 2 - 20 : x2} ${broken ? (y1 + y2) / 2 + 100 : y2}`} stroke="#e8dcb0" strokeWidth={14} fill="none" />
    {Array.from({ length: 4 }).map((_, i) => <path key={i} d={`M${x1 + (x2 - x1) * (0.2 + i * 0.18)} ${y1 + (y2 - y1) * (0.2 + i * 0.18) + 50} l-10 50 l20 -10 l-10 50`} stroke="#f4f0e8" strokeWidth={8} fill="none" opacity={broken && i > 1 ? 0 : 1} />)}
  </g>
);

const Boulder: React.FC<{ split?: number; f: number }> = ({ split = 0, f }) => (
  <g>
    <g transform={`translate(${-split * 60} 0) rotate(${-split * 6})`}><path d="M-260 0 L-280 -160 L-180 -300 L-20 -330 L0 -330 L-10 0 Z" fill="#5a5850" stroke="#3a3830" strokeWidth={6} /></g>
    <g transform={`translate(${split * 60} 0) rotate(${split * 6})`}><path d="M10 0 L0 -330 L140 -310 L260 -200 L280 0 Z" fill="#4e4c44" stroke="#3a3830" strokeWidth={6} /></g>
    {split > 0 && <path d="M0 -330 L-10 -200 L10 -100 L-5 0" stroke="#000" strokeWidth={10 + split * 40} />}
  </g>
);

const Rocks: React.FC<{ id: string; f: number }> = ({ id, f }) => (
  <>
    <Sky top="#3a3a3e" bottom="#121214" id={id} />
    <path d="M0 900 L200 760 L400 860 L640 700 L860 840 L1080 760 V1150 H0 Z" fill="#1a1a1c" />
    <rect y={1150} width={W} height={H} fill="#2a2826" />
    {Array.from({ length: 14 }).map((_, i) => <ellipse key={i} cx={random(`rk${i}`) * W} cy={1170 + random(`rl${i}`) * 60} rx={30 + random(`rm${i}`) * 40} ry={14} fill="#3a3834" />)}
    {Array.from({ length: 8 }).map((_, i) => <g key={i} transform={`translate(${80 + i * 130} 1150)`}><rect x={-4} y={-60} width={8} height={60} fill="#3a2a1a" /><circle cx={0} cy={-70} r={14} fill="#c8a080" opacity={0.8} /></g>)}
  </>
);

const Stone: React.FC<ShotProps> = ({ f, dur }) => (
  <svg width={W} height={H}>
    <Rocks id="ks1" f={f} />
    <g transform="translate(540 1150)"><Boulder split={clamp((f - 20) / 30)} f={f} /></g>
    <Rope x1={300} y1={900} x2={540} y2={860} broken /><Rope x1={540} y1={860} x2={800} y2={900} broken />
    {f > 30 && Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={540 + Math.sin(f / 8 + i) * 40} cy={820 - ((f * 3 + i * 40) % 500)} r={30 + i * 4} fill="#8a5aa0" opacity={0.08} />)}
  </svg>
);

const KFox: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a1430" bottom="#04030a" id="ks2" />
    <Moon x={800} y={340} r={90} f={f} />
    {Array.from({ length: 8 }).map((_, i) => <g key={i} transform={`translate(${i * 140 + 40} 1150)`}><rect x={-30} y={-600} width={60} height={600} fill="#a01a10" /><rect x={-60} y={-640} width={120} height={40} fill="#1a1010" /></g>)}
    <rect y={1150} width={W} height={H} fill="#0a0808" />
    <g transform="translate(560 1060) scale(0.9)"><FoxFig f={f} tails={1} /></g>
    {[0, 1, 2].map((i) => <Fire key={i} x={260 + i * 260} y={760} f={f} i={i} />)}
  </svg>
);

const Tails: React.FC<ShotProps> = ({ f, dur }) => {
  const n = 1 + Math.min(8, Math.floor(clamp(f / (dur * 0.85)) * 9));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#080610" />
      <circle cx={540} cy={800} r={420} fill={FIRE} opacity={0.05 + n * 0.01} />
      <g transform="translate(560 1020) scale(1.05)"><FoxFig f={f} tails={n} glow={n > 4} /></g>
      <text x={540} y={380} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={110} fill={GOLD}>{n * 100}</text>
      <text x={540} y={440} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={36} fill={GOLD} opacity={0.8}>YEARS</text>
    </svg>
  );
};

const Nine: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#06040c" />
    <circle cx={540} cy={760} r={480} fill={FIRE} opacity={0.1 + Math.sin(f / 5) * 0.03} />
    <g transform="translate(470 1060) scale(1.15)"><FoxFig f={f} tails={9} glow eye={BLOOD} /></g>
    {Array.from({ length: 6 }).map((_, i) => <Fire key={i} x={140 + i * 160} y={330 + (i % 2) * 80} f={f} i={i} />)}
  </svg>
);

const Lady: React.FC<{ f: number; s?: number; fill?: string; shadow?: boolean }> = ({ f, s = 1, fill = "#a01a3a", shadow }) => (
  <g transform={`scale(${s})`}>
    <path d="M-120 0 L-80 -300 L80 -300 L120 0 Z" fill={shadow ? "#000" : fill} />
    {!shadow && <path d="M-80 -300 L0 -200 L80 -300" stroke={GOLD} strokeWidth={8} fill="none" />}
    {!shadow && <path d="M-120 0 L-80 -100 L80 -100 L120 0 Z" fill="#5a1030" />}
    <path d="M-80 -300 L-150 -160 M80 -300 L150 -160" stroke={shadow ? "#000" : fill} strokeWidth={40} strokeLinecap="round" />
    <ellipse cx={0} cy={-350} rx={44} ry={52} fill={shadow ? "#000" : "#f0e0d0"} />
    <path d="M-50 -360 Q-60 -440 0 -440 Q60 -440 50 -360 Q60 -260 90 -160 L60 -160 Q40 -260 40 -340 L-40 -340 Q-40 -260 -60 -160 L-90 -160 Q-60 -260 -50 -360 Z" fill="#0a0606" />
    {!shadow && <><path d="M-20 -350 L-6 -346 M20 -350 L6 -346" stroke="#1a0a0a" strokeWidth={4} /><path d="M-8 -320 Q0 -316 8 -320" stroke="#c0203a" strokeWidth={5} /></>}
  </g>
);

const Court: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#140a06" />
    {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={i * 200 - 40} y={260} width={30} height={890} fill="#3a1a0a" />)}
    <path d="M0 260 L1080 260 L1080 220 L0 220 Z" fill="#5a1a0a" />
    {Array.from({ length: 5 }).map((_, i) => <rect key={i} x={i * 220 + 30} y={320} width={180} height={500} fill="#e8dcc0" opacity={0.15} />)}
    <circle cx={540} cy={700} r={400} fill="#ffb43a" opacity={0.06} />
    <rect y={1150} width={W} height={H} fill="#2a1a0a" />
    <g transform="translate(360 1150) scale(0.9)"><Lady f={f} /></g>
    <g transform="translate(760 1150)"><path d="M-110 0 L-80 -300 L80 -300 L110 0 Z" fill="#e8dcc0" /><path d="M-110 0 L-80 -100 L80 -100 L110 0 Z" fill="#3a2a5a" /><ellipse cx={0} cy={-340} rx={40} ry={48} fill="#e8d0b0" /><path d="M-20 -390 L-20 -460 L20 -460 L20 -390 Z" fill="#0a0a0a" /></g>
  </svg>
);

const Ill: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0c0806" />
    <circle cx={540} cy={800} r={300} fill="#ffb43a" opacity={0.06 + Math.sin(f / 8) * 0.02} />
    <rect x={180} y={980} width={720} height={80} fill="#e8dcc0" />
    <rect x={160} y={1060} width={760} height={90} fill="#3a1a0a" />
    <ellipse cx={300} cy={960} rx={70} ry={50} fill="#d8c8b0" />
    <path d="M370 950 Q600 900 860 960 L860 990 L370 990 Z" fill="#c8b8a0" />
    <path d="M280 940 L300 930 M310 945 L330 935" stroke="#3a2a2a" strokeWidth={4} />
    <g transform="translate(860 940) scale(0.6)" opacity={0.85}><Lady f={f} /></g>
    {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={320 + Math.sin(f / 10 + i) * 60} cy={900 - ((f * 1.5 + i * 50) % 300)} r={20} fill="#8a5aa0" opacity={0.1} />)}
  </svg>
);

const Shadow: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp((f - dur * 0.3) / (dur * 0.4));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#1a1208" />
      <rect x={60} y={260} width={960} height={890} fill="#e8dcc0" opacity={0.35} />
      <circle cx={240} cy={1120} r={200} fill="#ffb43a" opacity={0.25} />
      <g transform="translate(620 1150) scale(1.4)" opacity={0.85}>
        <Lady f={f} shadow />
        <g transform="translate(60 -200) scale(0.7)" opacity={t}>
          {Array.from({ length: 9 }).map((_, i) => { const a = -2.2 + (i / 8) * 1.8; const sw = Math.sin(f / 6 + i) * 0.1; return <path key={i} d={`M0 0 Q${Math.cos(a + sw + 0.5) * 220} ${Math.sin(a + sw + 0.5) * 220} ${Math.cos(a + sw) * 420 * t} ${Math.sin(a + sw) * 420 * t}`} stroke="#000" strokeWidth={60} fill="none" strokeLinecap="round" />; })}
        </g>
        <g transform="translate(0 -350)" opacity={t}><path d="M-40 -40 L-60 -110 L-14 -54 Z M40 -40 L60 -110 L14 -54 Z" fill="#000" /></g>
      </g>
      <g transform="translate(200 1150)"><path d="M-70 0 L-50 -280 L50 -280 L70 0 Z" fill="#f4f0e8" /><circle cx={0} cy={-320} r={36} fill="#d8c0a0" /><path d="M-30 -350 L0 -420 L30 -350 Z" fill="#0a0a0a" /><path d="M40 -220 L120 -280" stroke="#f4f0e8" strokeWidth={22} strokeLinecap="round" /><rect x={110} y={-340} width={20} height={70} fill="#f4f0e8" stroke="#a01a10" strokeWidth={3} /></g>
    </svg>
  );
};

const KTrue: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#080406" />
    <circle cx={540} cy={760} r={480} fill={BLOOD} opacity={0.08} />
    {[["CHINA", 220], ["INDIA", 860]].map(([t, x], i) => <g key={i} transform={`translate(${x} 420)`} opacity={0.7}><rect x={-120} y={-60} width={240} height={120} fill="#1a1010" /><path d="M-140 -60 L0 -130 L140 -60 Z" fill="#2a1010" /><text y={110} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={40} fill={BLOOD}>{t}</text>{Array.from({ length: 4 }).map((_, k) => <path key={k} d={`M${-100 + k * 60} -60 Q${-90 + k * 60 + Math.sin(f / 2 + k) * 10} ${-150 - k * 10} ${-80 + k * 60} -60 Z`} fill="#ff8a1a" opacity={0.7} />)}</g>)}
    <g transform="translate(480 1060) scale(1.0)"><FoxFig f={f} tails={9} glow eye={BLOOD} /></g>
  </svg>
);

const KHunt: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#4a3a3a" bottom="#1a1010" id="ks3" />
    <rect y={1080} width={W} height={H} fill="#3a3020" />
    {Array.from({ length: 40 }).map((_, i) => <path key={i} d={`M${random(`gs${i}`) * W} 1100 l${Math.sin(f / 10 + i) * 8} -50`} stroke="#5a4a2a" strokeWidth={4} />)}
    <g transform={`translate(${780 - (f % 80) * 2} 1060) scale(-0.55 0.55)`}><FoxFig f={f * 2} tails={9} /></g>
    {Array.from({ length: 5 }).map((_, i) => { const t = ((f + i * 9) % 30) / 30; return <g key={i} transform={`translate(${120 + t * 700} ${700 + i * 40 + t * 200}) rotate(18)`}><path d="M-60 0 L40 0" stroke="#5a3a20" strokeWidth={5} /><path d="M40 -8 L60 0 L40 8 Z" fill="#aaa" /><path d="M-60 -10 L-40 0 L-60 10" stroke="#fff" strokeWidth={4} fill="none" /></g>; })}
    {[100, 200].map((x, i) => <g key={i} transform={`translate(${x} 1100)`}><path d="M-30 0 L-40 -200 L40 -200 L30 0 Z" fill="#1a1010" /><circle cx={0} cy={-230} r={28} fill="#1a1010" /><path d="M-40 -250 L0 -290 L40 -250" stroke="#3a3a3a" strokeWidth={12} fill="none" /><path d="M40 -160 Q90 -220 40 -280" stroke="#3a2a1a" strokeWidth={6} fill="none" /></g>)}
  </svg>
);

const Sessho: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Rocks id="ks4" f={f} />
    <g transform="translate(540 1150)"><Boulder f={f} /></g>
    <Rope x1={300} y1={900} x2={540} y2={860} /><Rope x1={540} y1={860} x2={800} y2={900} />
    {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={360 + i * 40 + Math.sin(f / 15 + i) * 30} cy={820 - ((f * 2 + i * 50) % 400)} r={40 + i * 5} fill="#9aaa3a" opacity={0.07} />)}
    {[0, 1, 2].map((i) => <g key={i} transform={`translate(${260 + i * 260} ${1150 + (i % 2) * 20}) rotate(180)`}><path d="M-24 0 Q0 -14 24 0 Q0 -4 -24 0 Z" fill="#1a1a1a" /><path d="M-6 0 l-4 14 M6 0 l4 14" stroke="#1a1a1a" strokeWidth={3} /></g>)}
  </svg>
);

const Split: React.FC<ShotProps> = ({ f, dur }) => (
  <svg width={W} height={H}>
    <Rocks id="ks5" f={f} />
    <g transform="translate(540 1150)"><Boulder split={1} f={f} /></g>
    <Rope x1={300} y1={900} x2={540} y2={860} broken /><Rope x1={540} y1={860} x2={800} y2={900} broken />
    <g transform="translate(540 300) scale(0.6)" opacity={0.15 + Math.sin(f / 5) * 0.1}><FoxFig f={f} tails={9} fill="#2a2030" eye={BLOOD} glow /></g>
    <g transform="translate(220 1150) scale(0.7)" opacity={clamp((f - dur * 0.5) / 20)}><path d="M-60 0 L-40 -280 L40 -280 L60 0 Z" fill="#f4f0e8" /><circle cx={0} cy={-310} r={30} fill="#c8a080" /><path d="M-20 -200 L-60 -120 M20 -200 L60 -120" stroke="#f4f0e8" strokeWidth={18} /></g>
  </svg>
);

export const SHOTS34: Record<string, React.FC<ShotProps>> = {
  stone: Stone, kfox: KFox, tails: Tails, nine: Nine, kcourt: Court, ill: Ill,
  kshadow: Shadow, ktrue: KTrue, khunt: KHunt, sessho: Sessho, split: Split,
};
