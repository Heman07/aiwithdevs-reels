import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #27 — Krampus */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BONE = "#ddd5c0", SNOW = "#e8eef4", FIRE = "#ff8a1a";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const Snow: React.FC<{ f: number; n?: number }> = ({ f, n = 70 }) => (
  <g>{Array.from({ length: n }).map((_, i) => <circle key={i} cx={(random(`sx${i}`) * W + Math.sin(f / 20 + i) * 30) % W} cy={(random(`sy${i}`) * H + f * (2 + random(`sz${i}`) * 3)) % H} r={2 + random(`sr${i}`) * 4} fill={SNOW} opacity={0.7} />)}</g>
);

export const KrampusFig: React.FC<{ f: number; s?: number; fill?: string; eye?: string; walk?: boolean; birch?: number; basket?: boolean; tongue?: number; chains?: boolean }> =
  ({ f, s = 1, fill = "#0a0806", eye = "#ff3a1a", walk, birch, basket = true, tongue = 1, chains = true }) => {
  const st = { stroke: "#6a5a4a", strokeOpacity: 0.55, strokeWidth: 4 } as const;
  const w = walk ? Math.sin(f / 5) : 0;
  return (
    <g transform={`scale(${s})`}>
      {basket && <g transform="translate(60 -420)"><path d="M-60 0 L140 -20 L120 200 L-40 210 Z" fill="#3a2a14" stroke="#6a4a24" strokeWidth={4} />{Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M-55 ${20 + i * 40} L135 ${i * 40}`} stroke="#6a4a24" strokeWidth={4} />)}<g transform="translate(40 -20)"><path d="M-30 0 L-60 -60 M0 0 L0 -70 M30 0 L50 -60" stroke="#3a3a44" strokeWidth={12} strokeLinecap="round" /></g></g>}
      <path d={`M-40 -200 L${-70 - w * 40} -80 L${-60 - w * 40} 0 L${-110 - w * 40} 10 M40 -200 L${60 + w * 40} -80 L${40 + w * 40} 0 L${90 + w * 40} 10`} stroke={fill} strokeWidth={46} fill="none" strokeLinejoin="round" />
      {[-1, 1].map((d) => <path key={d} d={`M${d * (85 + w * 40 * d)} 6 l${d * 20} 10 l${d * -20} 6`} fill="#1a1410" />)}
      <path d="M-120 -540 C-160 -420 -130 -260 -80 -180 L80 -180 C130 -260 160 -420 120 -540 Z" fill={fill} {...st} />
      {Array.from({ length: 16 }).map((_, i) => <path key={i} d={`M${-130 + i * 17} -200 l${(random(`kf${i}`) - 0.5) * 20} 30`} stroke={fill} strokeWidth={8} />)}
      <path d={`M-110 -500 C-200 -400 -220 -300 -210 -180`} stroke={fill} strokeWidth={34} fill="none" strokeLinecap="round" />
      <path d="M-210 -180 l-20 40 M-210 -180 l0 46 M-210 -180 l20 40" stroke={BONE} strokeWidth={6} strokeLinecap="round" />
      <g transform={`rotate(${birch ?? 0} 110 -500)`}>
        <path d="M110 -500 C200 -460 230 -380 240 -300" stroke={fill} strokeWidth={34} fill="none" strokeLinecap="round" />
        {birch !== undefined && <g transform="translate(240 -300)">{Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M0 0 Q${(i - 4) * 14} 120 ${(i - 4) * 30} ${220 + (i % 3) * 20}`} stroke="#6a4a2a" strokeWidth={5} fill="none" />)}<rect x={-16} y={-10} width={32} height={30} fill="#8a1a10" /></g>}
      </g>
      {chains && <g>{Array.from({ length: 12 }).map((_, i) => <ellipse key={i} cx={-100 + i * 20} cy={-380 + Math.abs(i - 6) * 14 + Math.sin(f / 4 + i) * 3} rx={12} ry={7} fill="none" stroke="#8a8a90" strokeWidth={5} />)}<circle cx={-140} cy={-300} r={18} fill="#b89a3a" /><circle cx={130} cy={-300} r={18} fill="#b89a3a" /></g>}
      <g transform="translate(0 -600)">
        <path d="M-60 -60 C-160 -140 -200 -260 -140 -360 C-170 -260 -120 -170 -40 -110 Z" fill="#1a1410" stroke="#6a5a4a" strokeWidth={4} />
        <path d="M60 -60 C160 -140 200 -260 140 -360 C170 -260 120 -170 40 -110 Z" fill="#1a1410" stroke="#6a5a4a" strokeWidth={4} />
        {[-1, 1].map((d) => <path key={d} d={`M${d * 70} -10 L${d * 130} -30 L${d * 80} 20 Z`} fill={fill} />)}
        <path d="M-80 -40 C-90 -110 -40 -130 0 -130 C40 -130 90 -110 80 -40 C80 40 50 120 0 140 C-50 120 -80 40 -80 -40 Z" fill={fill} {...st} />
        <ellipse cx={-34} cy={-30} rx={16} ry={10} fill={eye} /><ellipse cx={34} cy={-30} rx={16} ry={10} fill={eye} />
        <circle cx={-34} cy={-30} r={34} fill={eye} opacity={0.18} /><circle cx={34} cy={-30} r={34} fill={eye} opacity={0.18} />
        <path d="M-50 -54 L-14 -40 M50 -54 L14 -40" stroke="#000" strokeWidth={8} />
        <path d="M-44 70 Q0 100 44 70 L30 110 Q0 124 -30 110 Z" fill="#2a0404" />
        {[-30, -10, 10, 30].map((x, i) => <path key={i} d={`M${x} 74 l4 14 l4 -14`} fill={BONE} />)}
        {tongue > 0 && <path d={`M-8 100 C-12 ${160 * tongue} ${10 + Math.sin(f / 4) * 20} ${220 * tongue} ${-6 + Math.sin(f / 3) * 30} ${300 * tongue} L${-20 + Math.sin(f / 3) * 30} ${320 * tongue} M${-6 + Math.sin(f / 3) * 30} ${300 * tongue} L${10 + Math.sin(f / 3) * 30} ${322 * tongue} M8 100 C12 ${160 * tongue} ${16 + Math.sin(f / 4) * 20} ${220 * tongue} ${-6 + Math.sin(f / 3) * 30} ${300 * tongue}`} stroke={BLOOD} strokeWidth={14} fill="none" strokeLinecap="round" />}
      </g>
    </g>
  );
};

const Saint: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <path d="M-90 0 L-60 -460 L60 -460 L90 0 Z" fill="#8a1a1a" />
    <path d="M-60 -460 L60 -460 L40 -300 L-40 -300 Z" fill="#a8a8a0" opacity={0.2} />
    <path d="M-40 -380 Q0 -260 40 -380 L30 -300 Q0 -230 -30 -300 Z" fill={SNOW} />
    <circle cx={0} cy={-500} r={44} fill="#d8b89a" />
    <path d="M-50 -520 L0 -640 L50 -520 Z" fill="#8a1a1a" stroke="#d8b040" strokeWidth={6} />
    <path d="M70 -380 L80 0" stroke="#d8b040" strokeWidth={10} /><path d="M80 -380 Q130 -420 100 -460 Q70 -440 90 -410" stroke="#d8b040" strokeWidth={10} fill="none" />
  </g>
);

const Village: React.FC<{ f: number; id: string }> = ({ f, id }) => (
  <>
    <Sky top="#14202e" bottom="#04060a" id={id} />
    <Moon x={800} y={340} r={90} f={f} />
    <path d="M0 900 L200 600 L380 820 L600 520 L820 800 L1080 620 V1150 H0 Z" fill="#0c1420" />
    <path d="M200 600 L240 660 L170 650 Z M600 520 L650 590 L560 580 Z" fill={SNOW} opacity={0.6} />
    {[[120, 1150], [380, 1150], [700, 1150], [960, 1150]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y}) scale(${0.7 + (i % 2) * 0.15})`}>
      <rect x={-110} y={-200} width={220} height={200} fill="#140e0a" /><path d="M-140 -200 L0 -330 L140 -200 Z" fill="#0a0806" /><path d="M-140 -200 L0 -330 L140 -200 L120 -200 L0 -310 L-120 -200 Z" fill={SNOW} opacity={0.8} />
      <rect x={-60} y={-150} width={50} height={50} fill="#ffb43a" opacity={0.75} /><rect x={20} y={-150} width={50} height={50} fill="#ffb43a" opacity={0.75} />
    </g>)}
    <rect y={1150} width={W} height={H} fill="#c8d0dc" />
    <rect y={1150} width={W} height={H} fill="#0a1020" opacity={0.6} />
  </>
);

const KVillage: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Village f={f} id="kr1" />
    {Array.from({ length: 10 }).map((_, i) => <ellipse key={i} cx={1040 - i * 70} cy={1160 + (i % 2) * 12} rx={14} ry={7} fill="#0a1020" opacity={0.8} />)}
    <g transform={`translate(${1100 - f * 1.2} 1150) scale(0.4)`} opacity={0.85}><KrampusFig f={f} walk /></g>
    <Snow f={f} />
  </svg>
);

const Nicholas: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Village f={f} id="kr2" />
    <g transform="translate(380 1150) scale(0.75)"><Saint f={f} /></g>
    <g transform="translate(720 1150) scale(0.65)" opacity={0.95}><KrampusFig f={f} birch={10} /></g>
    <Snow f={f} />
  </svg>
);

const KReveal: React.FC<ShotProps> = ({ f, dur }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#060302" />
    <circle cx={540} cy={640} r={480} fill={BLOOD} opacity={0.1 + Math.sin(f / 5) * 0.04} />
    <g transform={`translate(540 ${1700 - clamp(f / (dur * 0.4)) * 60}) scale(1.35)`}><KrampusFig f={f} basket={false} tongue={clamp((f - 10) / 20)} /></g>
    <Snow f={f} n={40} />
  </svg>
);

const KPagan: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#0a1a20" bottom="#020406" id="kr3" />
    {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M${i * 100 - 50} 1150 L${i * 100} ${700 + (i % 3) * 60} L${i * 100 + 50} 1150 Z`} fill="#06100c" />)}
    <rect y={1150} width={W} height={H} fill="#1a2028" />
    <circle cx={540} cy={1050} r={300} fill={FIRE} opacity={0.12 + Math.sin(f / 3) * 0.05} />
    {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M${460 + i * 18} 1150 Q${470 + i * 18 + Math.sin(f / 2 + i) * 20} ${1000 - (i % 3) * 50} ${480 + i * 18} 1150 Z`} fill={i % 2 ? FIRE : "#ffcf3a"} opacity={0.8} />)}
    {[-1, 1].map((d, k) => <g key={k} transform={`translate(${540 + d * 280} 1150) scale(${0.32 * d} 0.32)`} opacity={0.9}><KrampusFig f={f + k * 7} basket={false} chains={false} tongue={0.6} /></g>)}
    <g transform="translate(540 380)" opacity={0.55}><ellipse cx={-60} cy={0} rx={50} ry={20} fill="#9ad8ff" /><ellipse cx={60} cy={0} rx={50} ry={20} fill="#9ad8ff" /><text y={120} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={60} fill="#9ad8ff">HEL</text></g>
  </svg>
);

const KChain: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0806" />
    {[200, 880].map((x, i) => <rect key={i} x={x - 50} y={200} width={100} height={950} fill="#14100c" />)}
    <path d="M150 200 Q540 0 930 200" stroke="#14100c" strokeWidth={60} fill="none" />
    <path d="M520 260 L560 260 L560 340 L620 340 L620 380 L560 380 L560 520 L520 520 L520 380 L460 380 L460 340 L520 340 Z" fill="#d8b040" opacity={0.6} />
    <g transform="translate(540 1150) scale(0.75)"><KrampusFig f={f} basket={false} chains={false} tongue={0.4} /></g>
    {[-1, 1].map((d) => <g key={d}>{Array.from({ length: 14 }).map((_, i) => <ellipse key={i} cx={540 + d * (60 + i * 28)} cy={830 + i * 10 + Math.sin(f / 3) * (d * 4)} rx={14} ry={8} fill="none" stroke="#a8a8b0" strokeWidth={6} transform={`rotate(${i % 2 ? 90 : 0} ${540 + d * (60 + i * 28)} ${830 + i * 10})`} />)}</g>)}
  </svg>
);

const KDoor: React.FC<ShotProps> = ({ f, dur }) => {
  const open = clamp((f - dur * 0.3) / (dur * 0.3));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#1a1008" />
      <circle cx={540} cy={700} r={500} fill="#ffb43a" opacity={0.08} />
      <rect x={300} y={440} width={480} height={710} fill="#000" />
      <g transform={`translate(540 1150) scale(0.75)`} opacity={open}><KrampusFig f={f} birch={0} tongue={0.8} /></g>
      <g transform={`translate(300 440) scale(${1 - open * 0.85} 1)`}><rect width={480} height={710} fill="#4a2a14" stroke="#2a1608" strokeWidth={10} />{[120, 360].map((y) => <rect key={y} x={60} y={y - 80} width={360} height={200} fill="none" stroke="#2a1608" strokeWidth={8} />)}<circle cx={420} cy={380} r={16} fill="#d8b040" /></g>
      <rect x={290} y={430} width={500} height={720} fill="none" stroke="#2a1608" strokeWidth={20} />
      {open < 0.1 && <g opacity={(f % 20) < 6 ? 1 : 0}><text x={540} y={380} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={60} fill={BONE}>KNOCK</text></g>}
    </svg>
  );
};

const KBirch: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Village f={f} id="kr4" />
    <g transform="translate(600 1150) scale(0.72)"><KrampusFig f={f} birch={-30 + Math.abs(Math.sin(f / 3)) * 80} tongue={0.8} /></g>
    <g transform="translate(260 1150)">
      <path d="M-14 0 L-20 -80 M14 0 L20 -80" stroke="#3a3a44" strokeWidth={16} strokeLinecap="round" />
      <path d="M-30 -80 L30 -80 L24 -190 L-24 -190 Z" fill="#3a3a44" /><circle cx={0} cy={-220} r={30} fill="#3a3a44" />
      <path d="M-24 -170 L-70 -250 M24 -170 L70 -250" stroke="#3a3a44" strokeWidth={14} strokeLinecap="round" />
    </g>
    {(f % 18) < 3 && <rect width={W} height={H} fill={BLOOD} opacity={0.15} />}
    <Snow f={f} />
  </svg>
);

const KBasket: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#0a1018" bottom="#020304" id="kr5" />
    <rect y={1150} width={W} height={H} fill="#1a2028" />
    {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M${i * 110} 1150 L${i * 110 + 20} ${600 + (i % 3) * 80} L${i * 110 + 40} 1150`} fill="#06080a" />)}
    <g transform={`translate(${700 - f * 2} 1150) scale(0.85)`}><KrampusFig f={f} walk tongue={0.6} /></g>
    <g transform={`translate(${700 - f * 2} 1150) scale(0.85)`}>
      {[[80, -460], [130, -470], [180, -460]].map(([x, y], i) => <path key={i} d={`M${x} ${y} l${-14 + Math.sin(f / 2 + i) * 14} -50`} stroke="#3a3a44" strokeWidth={14} strokeLinecap="round" />)}
    </g>
    <Snow f={f} />
  </svg>
);

const KBan: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#100c08" />
    <g transform="rotate(-4 540 780)">
      <rect x={180} y={360} width={720} height={840} fill="#e0d4b4" />
      <text x={540} y={470} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={60} fill="#2a1a0a">VERBOTEN</text>
      <path d="M240 500 L840 500" stroke="#2a1a0a" strokeWidth={4} />
      {Array.from({ length: 9 }).map((_, i) => <rect key={i} x={240} y={540 + i * 40} width={420 + (i % 3) * 120} height={12} fill="#6a5a3a" />)}
      <g transform="translate(540 1110) scale(0.22)"><KrampusFig f={0} basket={false} tongue={0.5} fill="#2a1a0a" eye="#2a1a0a" /></g>
    </g>
    <g transform={`translate(540 760) scale(${1.4 - clamp((f - 8) / 6) * 0.4}) rotate(-14)`} opacity={clamp((f - 8) / 6)}>
      <rect x={-300} y={-80} width={600} height={160} fill="none" stroke={BLOOD} strokeWidth={14} />
      <text y={40} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={110} fill={BLOOD}>BANNED</text>
    </g>
  </svg>
);

const KLauf: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a0c08" bottom="#040202" id="kr6" />
    {[0, 1].map((side) => Array.from({ length: 5 }).map((_, i) => <g key={`${side}${i}`} transform={`translate(${side ? 900 : 0} ${400 + i * 160})`}><rect x={0} y={0} width={180} height={160} fill="#140a06" /><rect x={50} y={40} width={60} height={60} fill="#ffb43a" opacity={0.4} /></g>))}
    <rect y={1150} width={W} height={H} fill="#2a2a30" />
    {Array.from({ length: 5 }).map((_, i) => { const x = ((i * 260 + f * 6) % 1400) - 200; const sc = 0.32 + (i % 3) * 0.06; return (
      <g key={i} transform={`translate(${x} ${1150 + (i % 3) * 10}) scale(${-sc} ${sc})`}><KrampusFig f={f + i * 5} walk basket={false} tongue={0.5} birch={10} /></g>); })}
    {Array.from({ length: 5 }).map((_, i) => { const x = ((i * 260 + f * 6) % 1400) - 200 - 70; return <g key={i}><path d={`M${x} ${1000} l0 -60`} stroke="#5a3a20" strokeWidth={8} /><path d={`M${x - 14} 940 Q${x} ${880 - Math.sin(f + i) * 20} ${x + 14} 940 Z`} fill={FIRE} /><circle cx={x} cy={920} r={50} fill={FIRE} opacity={0.2} /></g>; })}
    <Snow f={f} n={40} />
  </svg>
);

const KEyes: React.FC<ShotProps> = ({ f }) => {
  const o = clamp((f - 10) / 15);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#06080c" />
      <rect x={220} y={300} width={640} height={820} fill="#0a1424" stroke="#3a2a1a" strokeWidth={30} />
      <path d="M540 300 V1120 M220 710 H860" stroke="#3a2a1a" strokeWidth={20} />
      <g opacity={o} transform="translate(540 760) scale(1.1)"><g transform="translate(0 600)"><KrampusFig f={f} basket={false} chains={false} tongue={0} /></g></g>
      <path d="M220 300 L860 300 L860 1120 L220 1120 Z" fill="#9ad8ff" opacity={0.05} />
      {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={240 + random(`ke${i}`) * 600} cy={320 + ((random(`kf${i}`) * 780 + f * 3) % 780)} r={3} fill={SNOW} opacity={0.7} />)}
      <rect x={180} y={1120} width={720} height={40} fill="#2a1a0a" />
    </svg>
  );
};

export const SHOTS27: Record<string, React.FC<ShotProps>> = {
  kvillage: KVillage, nicholas: Nicholas, kreveal: KReveal, kpagan: KPagan, kchain: KChain, kdoor: KDoor,
  kbirch: KBirch, kbasket: KBasket, kban: KBan, klauf: KLauf, keyes: KEyes,
};
