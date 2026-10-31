import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #23 — Griffin */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", GOLD = "#e0b040", BONE = "#ddd5c0";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const Griffin: React.FC<{ f: number; s?: number; fill?: string; eye?: string; fly?: boolean }> = ({ f, s = 1, fill = INK, eye = "#ffcf3a", fly }) => {
  const st = { stroke: "#c8a060", strokeOpacity: 0.6, strokeWidth: 4 } as const;
  const flap = fly ? Math.sin(f / 4) * 25 : Math.sin(f / 15) * 5;
  return (
    <g transform={`scale(${s})`}>
      {[-1, 1].map((d) => (
        <g key={d} transform={`scale(${d} 1) rotate(${-flap} 40 -120)`}>
          <path d="M40 -120 C140 -300 320 -420 520 -430 L480 -350 L520 -340 L450 -260 L490 -250 L410 -180 L440 -170 L340 -110 L360 -90 L250 -60 L260 -40 L150 -40 L60 -40 Z" fill={fill} {...st} />
          {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${140 + i * 55} ${-180 - i * 36} l70 50`} stroke="#c8a060" strokeOpacity={0.4} strokeWidth={4} />)}
        </g>
      ))}
      <path d={`M200 20 C280 40 320 ${100 + Math.sin(f / 8) * 20} 300 180 L320 200 L280 200 C270 140 250 90 190 60 Z`} fill={fill} {...st} />
      {[[-120, 0], [-70, 6], [140, 0], [190, 6]].map(([lx, o], i) => <path key={i} d={`M${lx} 60 L${lx - 10 + o} 250 L${lx + 30 + o} 250 L${lx + 30} 60 Z`} fill={fill} {...st} />)}
      {[-120, -70].map((lx, i) => <path key={i} d={`M${lx - 14} 250 l-16 26 M${lx} 250 l0 30 M${lx + 14} 250 l16 26`} stroke={fill} strokeWidth={8} strokeLinecap="round" />)}
      <ellipse cx={30} cy={20} rx={220} ry={95} fill={fill} {...st} />
      <g transform="translate(-110 -60) scale(1.35) translate(110 60)"><path d="M-150 -40 C-200 -120 -210 -200 -170 -260 C-130 -290 -80 -270 -60 -220 C-40 -160 -60 -80 -100 -20 Z" fill={fill} {...st} />
      <path d="M-190 -250 L-260 -220 Q-250 -190 -210 -200 Z" fill={GOLD} />
      {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M${-150 + i * 18} ${-280 + i * 8} l-14 -26`} stroke={fill} strokeWidth={8} />)}
      <circle cx={-170} cy={-235} r={8} fill={eye} /><circle cx={-170} cy={-235} r={22} fill={eye} opacity={0.2} /></g>
    </g>
  );
};

const GMountain: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#3a2a20" bottom="#0c0806" id="gr1" />
    <circle cx={800} cy={420} r={110} fill="#ffd8a0" opacity={0.6} />
    <path d="M0 1200 L240 720 L420 900 L620 560 L860 860 L1080 700 V1920 H0 Z" fill="#2a1e14" />
    {Array.from({ length: 30 }).map((_, i) => <ellipse key={i} cx={460 + random(`gm${i}`) * 320} cy={900 + random(`gn${i}`) * 200} rx={14} ry={8} fill={GOLD} opacity={0.8} />)}
    <g transform={`translate(${620 + Math.sin(f / 20) * 60} ${520 + Math.sin(f / 12) * 20}) scale(0.5)`}><Griffin f={f} fly /></g>
    <path d="M0 1250 Q540 1200 1080 1250 V1920 H0 Z" fill="#140e08" />
  </svg>
);

const OneEye: React.FC<{ x: number; f: number; sack?: boolean }> = ({ x, f, sack }) => (
  <g transform={`translate(${x} 1250)`}>
    <path d="M-50 0 L-36 -240 Q0 -270 36 -240 L50 0 Z" fill="#4a3a2c" />
    <circle cx={0} cy={-280} r={36} fill="#4a3a2c" />
    <ellipse cx={0} cy={-284} rx={12} ry={9} fill="#ece4d0" /><circle cx={0} cy={-284} r={5} fill="#000" />
    {sack && <g transform="translate(40 -180)"><ellipse rx={40} ry={50} fill="#5a4a2a" /><circle cx={0} cy={-40} r={10} fill={GOLD} /></g>}
  </g>
);

const Arimasp: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#4a3a2a" bottom="#140c06" id="gr2" />
    <path d="M0 1250 L1080 1250 L1080 1920 L0 1920 Z" fill="#2a1e12" />
    {[200, 380, 560].map((x, i) => <OneEye key={i} x={x + f * 1.5} f={f} sack />)}
    <g transform={`translate(${900 - f * 2} ${560 + Math.sin(f / 10) * 20}) scale(0.45)`}><Griffin f={f} fly eye={BLOOD} /></g>
  </svg>
);

const GAttack: React.FC<ShotProps> = ({ f, dur }) => {
  const lift = clamp((f - 20) / (dur * 0.6));
  return (
    <svg width={W} height={H}>
      <Sky top="#2a1a14" bottom="#060403" id="gr3" />
      <path d="M0 1250 L1080 1250 L1080 1920 L0 1920 Z" fill="#1a120a" />
      <g transform={`translate(560 ${760 - lift * 300}) scale(0.75)`}><Griffin f={f} fly eye={BLOOD} /></g>
      <g transform={`translate(${560 - lift * 20} ${1020 - lift * 300}) scale(${lift > 0 ? -0.5 : -0.5} 0.5) rotate(${lift * 20})`}>
        <path d="M280 0 C350 20 380 130 340 240 C320 150 300 80 270 30 Z" fill="#4a3a2c" />
        {[[-150, 0], [-95, 8], [170, 0], [225, 8]].map(([lx, o], k) => <path key={k} d={`M${lx} 60 L${lx - 6 + o + Math.sin(f / 2 + k) * 30 * lift} 300 L${lx + 26 + o + Math.sin(f / 2 + k) * 30 * lift} 300 L${lx + 34} 60 Z`} fill="#4a3a2c" />)}
        <ellipse cx={40} cy={30} rx={260} ry={105} fill="#4a3a2c" />
        <path d="M-160 -320 L-250 -330 L-400 -200 L-390 -160 L-330 -165 L-240 -220 Z M-60 -50 L-120 60 L-250 -260 L-170 -310 Z" fill="#4a3a2c" />
        <path d="M-40 -60 L-20 -300 Q20 -330 60 -300 L80 -60 Z" fill="#4a3a2c" /><circle cx={20} cy={-350} r={40} fill="#4a3a2c" />
      </g>
      {lift > 0.2 && Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={540 + (random(`ga${i}`) - 0.5) * 200} cy={1050 - lift * 300 + ((f * 6 + i * 40) % 400)} r={6} fill={BLOOD} />)}
    </svg>
  );
};

const GNest: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#3a2a20" bottom="#0c0806" id="gr4" />
    <path d="M100 1250 L200 900 L900 900 L980 1250 Z" fill="#2a1e14" />
    <g transform="translate(540 960)">
      <ellipse rx={300} ry={80} fill="#8a6418" />
      {Array.from({ length: 50 }).map((_, i) => <ellipse key={i} cx={(random(`gs${i}`) - 0.5) * 540} cy={(random(`gt${i}`) - 0.5) * 120} rx={18} ry={10} fill={GOLD} stroke="#7a5410" strokeWidth={2} />)}
      {[-60, 0, 60].map((x, i) => <ellipse key={i} cx={x} cy={-30} rx={34} ry={44} fill={["#8a3a5a", "#5a7a8a", "#8a5a3a"][i]} stroke="#e8e0cc" strokeOpacity={0.5} strokeWidth={3} />)}
    </g>
    <g transform="translate(860 880) scale(0.55)"><Griffin f={f} eye={BLOOD} /></g>
  </svg>
);

const GMate: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a2030" bottom="#05060a" id="gr5" />
    <Moon x={540} y={460} r={180} f={f} />
    <path d="M100 1250 L300 900 L760 900 L980 1250 Z" fill="#0a0c10" />
    <g transform="translate(420 840) scale(0.5)"><Griffin f={f} /></g>
    <g transform="translate(720 880) scale(0.35) rotate(80)" opacity={0.5}>{Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${-100 + i * 30} -40 Q${-90 + i * 30} 0 ${-100 + i * 30} 40`} stroke={BONE} strokeWidth={10} fill="none" />)}<circle cx={-180} cy={0} r={40} fill="none" stroke={BONE} strokeWidth={10} /></g>
  </svg>
);

const Relic: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0604" />
    <path d="M300 0 L300 400 Q540 200 780 400 L780 0 Z" fill="#14100a" />
    <path d="M360 120 Q540 0 720 120 L720 400 L360 400 Z" fill="#2a4a6a" opacity={0.4} />
    <circle cx={540} cy={900} r={400} fill="#ffb43a" opacity={0.1} />
    <rect x={240} y={1100} width={600} height={60} fill="#3a2a1a" />
    <g transform={`translate(540 980) rotate(-30) scale(1.4)`}>
      <path d="M-20 100 C-40 0 -10 -120 60 -200 C40 -120 30 -20 30 100 Z" fill="#5a3a20" stroke={GOLD} strokeWidth={6} />
      <rect x={-34} y={90} width={80} height={30} rx={8} fill={GOLD} />
      <rect x={-20} y={120} width={50} height={40} fill={GOLD} />
    </g>
    {[300, 780].map((x, i) => <g key={i}><rect x={x - 8} y={1000} width={16} height={100} fill="#e8d8b0" /><path d={`M${x - 10} 1000 Q${x} ${966 - Math.sin(f / 3 + i) * 8} ${x + 10} 1000 Z`} fill="#ffb43a" /></g>)}
  </svg>
);

const GHorns: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#1a1612" />
    <g transform="translate(540 860)">
      <g transform="rotate(-30) scale(1.6)"><path d="M-20 100 C-40 0 -10 -120 60 -200 C40 -120 30 -20 30 100 Z" fill="#5a3a20" stroke={GOLD} strokeWidth={6} /></g>
      <g opacity={clamp((f - 10) / 15)}><path d="M-200 300 C-260 0 -160 -300 40 -420" stroke="#5ab8ff" strokeWidth={6} fill="none" strokeDasharray="20 12" /><ellipse cx={-210} cy={330} rx={80} ry={50} fill="none" stroke="#5ab8ff" strokeWidth={6} strokeDasharray="20 12" /></g>
    </g>
    <text x={540} y={1460} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={54} fill="#5ab8ff" opacity={clamp((f - 20) / 10)}>IBEX HORN</text>
  </svg>
);

const Alexander: React.FC<ShotProps> = ({ f, dur }) => {
  const up = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <Sky top="#3a4a6a" bottom="#1a1a24" id="gr6" />
      {Array.from({ length: 5 }).map((_, i) => <ellipse key={i} cx={((i * 300 + f * 1.5) % 1400) - 160} cy={1200 + i * 60 - up * 400} rx={300} ry={60} fill="#dfe6ee" opacity={0.5} />)}
      <g transform={`translate(540 ${1000 - up * 300})`}>
        {[-1, 1].map((d) => <g key={d} transform={`translate(${d * 220} -250) scale(${0.35 * d} 0.35)`}><Griffin f={f} fly /></g>)}
        <line x1={-200} y1={-200} x2={-60} y2={-20} stroke="#8a7a5a" strokeWidth={4} /><line x1={200} y1={-200} x2={60} y2={-20} stroke="#8a7a5a" strokeWidth={4} />
        <path d="M-100 -20 L100 -20 L80 80 L-80 80 Z" fill="#5a3a20" stroke="#c8a060" strokeWidth={4} />
        <path d="M-20 -20 L-14 -140 Q0 -156 14 -140 L20 -20 Z" fill={INK} /><circle cx={0} cy={-160} r={20} fill={INK} /><path d="M-16 -176 L-12 -196 L0 -182 L12 -196 L16 -176 Z" fill={GOLD} />
        <line x1={10} y1={-110} x2={20} y2={-460} stroke="#c8c0a0" strokeWidth={6} /><ellipse cx={20} cy={-470} rx={26} ry={16} fill={BLOOD} />
      </g>
    </svg>
  );
};

const Bones: React.FC<{ f: number; draw?: number }> = ({ f, draw = 1 }) => (
  <g opacity={draw}>
    <path d="M-260 -60 C-280 -160 -200 -220 -120 -200 L-60 -280 C0 -320 80 -300 100 -240 C160 -160 140 -60 80 0" fill="none" stroke={BONE} strokeWidth={10} />
    <path d="M-260 -60 L-320 -20 L-280 -10 Z" fill={BONE} />
    <circle cx={-180} cy={-120} r={30} fill="none" stroke={BONE} strokeWidth={8} />
    {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M${-40 + i * 36} -40 Q${-30 + i * 36} 20 ${-40 + i * 36} 80`} stroke={BONE} strokeWidth={8} fill="none" />)}
    <path d="M-60 -20 L340 -20" stroke={BONE} strokeWidth={10} />
    <path d="M340 -20 C420 0 480 40 520 100" stroke={BONE} strokeWidth={8} fill="none" />
    {[-40, 20, 240, 300].map((x, i) => <path key={i} d={`M${x} 80 L${x - 20} 220 L${x - 50} 240`} stroke={BONE} strokeWidth={10} fill="none" />)}
  </g>
);

const Gobi: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#c89a6a" bottom="#6a4a2a" id="gr7" />
    <path d="M0 1050 Q300 950 600 1020 Q850 1080 1080 990 V1920 H0 Z" fill="#a8784a" />
    <g transform="translate(480 900) scale(1.0)"><Bones f={f} draw={clamp(f / 30)} /></g>
    {[[220, 1100], [840, 1060]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y}) scale(0.4)`} opacity={0.6}><Bones f={f} /></g>)}
  </svg>
);

const Proto: React.FC<ShotProps> = ({ f, dur }) => {
  const m = clamp((f - 20) / (dur * 0.5));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#140e08" />
      <g transform="translate(480 900) scale(1.2)"><Bones f={f} draw={1 - m * 0.5} /></g>
      <g transform="translate(560 880) scale(0.85)" opacity={m}><Griffin f={f} fill="none" eye="#5ab8ff" /></g>
      <text x={540} y={1470} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={44} fill="#5ab8ff" opacity={m}>PROTOCERATOPS → GRIFFIN?</text>
    </svg>
  );
};

const GEyes: React.FC<ShotProps> = ({ f }) => {
  const o = clamp((f - 8) / 12);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#020101" />
      <g transform="translate(540 820)">
        <path d="M-300 120 C-320 -60 -200 -220 0 -240 C200 -220 320 -60 300 120 Z" fill="#0a0806" opacity={o} />
        <path d="M-60 120 L0 360 L60 120 Z" fill={GOLD} opacity={o * 0.8} />
        <ellipse cx={-130} cy={0} rx={70} ry={40 * o + 2} fill="#ffcf3a" /><ellipse cx={130} cy={0} rx={70} ry={40 * o + 2} fill="#ffcf3a" />
        <circle cx={-130} cy={0} r={24 * o} fill="#000" /><circle cx={130} cy={0} r={24 * o} fill="#000" />
        <path d="M-220 -70 L-60 -30 M220 -70 L60 -30" stroke="#000" strokeWidth={20} />
      </g>
    </svg>
  );
};

export const SHOTS23: Record<string, React.FC<ShotProps>> = {
  gmountain: GMountain, arimasp: Arimasp, gattack: GAttack, gnest: GNest, gmate: GMate, relic: Relic,
  ghorns: GHorns, alexander: Alexander, gobi: Gobi, proto: Proto, geyes: GEyes,
};
