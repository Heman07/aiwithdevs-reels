import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #22 — Satyr / Pan */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", FIRE = "#ff8a2a", FAE = "#b8ffcf";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const SatyrFig: React.FC<{ f: number; s?: number; fill?: string; eye?: string; pipes?: boolean; dance?: boolean; shout?: boolean }> = ({ f, s = 1, fill = INK, eye = "#ffcf3a", pipes, dance, shout }) => {
  const st = { stroke: "#c8a070", strokeOpacity: 0.55, strokeWidth: 4 } as const;
  const k = dance ? Math.sin(f / 4) : 0;
  return (
    <g transform={`scale(${s}) rotate(${k * 6})`}>
      <path d={`M-40 0 C-60 60 ${-90 + k * 20} 120 -60 180 L-80 300 L-50 300 L-30 190 C-10 120 -20 60 -10 10 Z`} fill={fill} {...st} />
      <path d={`M40 0 C60 60 ${90 - k * 20} 120 60 180 L80 300 L50 300 L30 190 C10 120 20 60 10 10 Z`} fill={fill} {...st} />
      <path d="M-90 300 L-50 300 L-56 320 L-94 320 Z M50 300 L90 300 L94 320 L56 320 Z" fill="#000" />
      {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${-60 + i * 16} ${20 + (i % 2) * 10} l-8 22 l14 -4`} fill={fill} />)}
      <path d="M-70 -260 C-90 -150 -70 -40 -50 20 L50 20 C70 -40 90 -150 70 -260 C40 -290 -40 -290 -70 -260 Z" fill={fill} {...st} />
      <path d={`M-70 -230 L${-150 + k * 40} ${-120 - k * 60} M70 -230 L${pipes ? 20 : 150 - k * 40} ${pipes ? -330 : -120 + k * 60}`} stroke={fill} strokeWidth={22} strokeLinecap="round" />
      <ellipse cx={0} cy={-320} rx={46} ry={56} fill={fill} {...st} />
      <path d="M-30 -360 C-70 -400 -80 -450 -50 -480 C-50 -440 -40 -410 -20 -380 Z M30 -360 C70 -400 80 -450 50 -480 C50 -440 40 -410 20 -380 Z" fill="#c8b890" />
      <path d="M-44 -330 L-70 -350 L-44 -316 Z M44 -330 L70 -350 L44 -316 Z" fill={fill} />
      <circle cx={-16} cy={-326} r={6} fill={eye} /><circle cx={16} cy={-326} r={6} fill={eye} />
      <path d="M-20 -280 Q0 -250 20 -280 L0 -230 Z" fill={fill} {...st} />
      {shout && <ellipse cx={0} cy={-292} rx={14} ry={18} fill="#000" />}
      {pipes && <g transform="translate(-30 -300) rotate(-20)">{[0, 1, 2, 3, 4].map((i) => <rect key={i} x={i * 10} y={0} width={9} height={40 + i * 10} fill="#c8a060" />)}</g>}
    </g>
  );
};

const Trees: React.FC<{ tint?: string }> = ({ tint = "#050a06" }) => (
  <g>{[40, 250, 820, 1040].map((x, i) => <path key={i} d={`M${x - 40} 1920 C${x - 30} 1200 ${x - 60} 900 ${x - 10} 300 L${x + 30} 300 C${x + 50} 900 ${x + 30} 1200 ${x + 50} 1920 Z`} fill={tint} />)}</g>
);

const Notes: React.FC<{ f: number; x?: number; y?: number; color?: string }> = ({ f, x = 540, y = 900, color = FAE }) => (
  <g>{Array.from({ length: 5 }).map((_, i) => { const p = ((f / 40 + i / 5) % 1); return <text key={i} x={x + (i - 2) * 110 + p * 40} y={y - p * 260} fontFamily="serif" fontSize={54} fill={color} opacity={(1 - p) * 0.8}>♪</text>; })}</g>
);

const SPipes: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#14241a" bottom="#030604" id="sa1" />
    <Moon x={540} y={400} r={90} f={f} />
    <Trees />
    <path d="M0 1200 Q540 1140 1080 1200 V1920 H0 Z" fill="#040804" />
    <g transform="translate(540 1000) scale(0.6)" opacity={0.85}><SatyrFig f={f} pipes /></g>
    <Notes f={f} y={760} />
  </svg>
);

const Revel: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a1008" bottom="#050302" id="sa2" />
    <circle cx={540} cy={1050} r={400} fill={FIRE} opacity={0.18 + 0.05 * Math.sin(f / 2)} />
    <Trees tint="#0a0604" />
    <g transform="translate(540 1150)">{[-60, -20, 20, 60].map((x, i) => <path key={i} d={`M${x - 34} 0 Q${x - 40} ${-90 - Math.sin(f / 3 + i) * 30} ${x} ${-160 - Math.sin(f / 3 + i) * 30} Q${x + 40} -90 ${x + 34} 0 Z`} fill={i % 2 ? FIRE : "#ffd04a"} />)}</g>
    {[[220, 1060], [380, 1000], [700, 1000], [860, 1060]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y}) scale(0.45)`}><SatyrFig f={f + i * 7} dance eye={FIRE} /></g>)}
    {Array.from({ length: 20 }).map((_, i) => <circle key={i} cx={540 + (random(`rv${i}`) - 0.5) * 500} cy={1100 - ((f * 4 + i * 40) % 700)} r={3} fill="#ffd04a" />)}
  </svg>
);

const PanShot: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#14100a" bottom="#030201" id="sa3" />
    <Trees />
    {[0, 1, 2, 3].map((i) => { const p = ((f / 16 + i / 4) % 1); return <circle key={i} cx={540} cy={640} r={80 + p * 600} fill="none" stroke={BLOOD} strokeWidth={10 * (1 - p)} opacity={1 - p} />; })}
    <g transform={`translate(540 1150) scale(${1.1 + Math.sin(f / 3) * 0.02})`}><SatyrFig f={f} shout eye={BLOOD} /></g>
  </svg>
);

const Marathon: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#5a4a3a" bottom="#1a140c" id="sa4" />
    <path d="M0 1000 Q540 950 1080 1000 V1920 H0 Z" fill="#3a2a1a" />
    {Array.from({ length: 12 }).map((_, i) => <g key={i} transform={`translate(${80 + i * 40 + f * 2} ${1060 + (i % 3) * 30}) scale(0.4)`}><path d="M-30 0 L-20 -180 Q0 -200 20 -180 L30 0 Z" fill="#1a140c" /><circle cx={0} cy={-210} r={28} fill="#1a140c" /><path d="M-30 -230 Q0 -280 30 -230 Z" fill="#c8902a" /><ellipse cx={-40} cy={-120} rx={36} ry={50} fill="#8a6a2a" /></g>)}
    {Array.from({ length: 12 }).map((_, i) => <g key={i} transform={`translate(${620 + i * 40 + f * 5} ${1060 + (i % 3) * 30}) scale(-0.4 0.4)`}><path d="M-30 0 L-20 -180 Q0 -200 20 -180 L30 0 Z" fill="#2a1a2a" /><circle cx={0} cy={-210} r={28} fill="#2a1a2a" /></g>)}
    <g transform="translate(540 700) scale(0.5)" opacity={0.25 + 0.1 * Math.sin(f / 4)}><SatyrFig f={f} shout fill="#3a2a1a" eye={BLOOD} /></g>
  </svg>
);

const Apollo: React.FC<{ f: number; s?: number }> = ({ f, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <circle cx={0} cy={-320} r={160} fill="#ffe8a0" opacity={0.2 + 0.05 * Math.sin(f / 5)} />
    <path d="M-70 0 L-50 -260 Q0 -300 50 -260 L70 0 Z" fill="#e8e0c8" />
    <circle cx={0} cy={-300} r={40} fill="#e8e0c8" />
    {Array.from({ length: 10 }).map((_, i) => <line key={i} x1={Math.cos(i * 0.63) * 50} y1={-300 + Math.sin(i * 0.63) * 50} x2={Math.cos(i * 0.63) * 80} y2={-300 + Math.sin(i * 0.63) * 80} stroke="#ffd04a" strokeWidth={6} />)}
    <g transform="translate(70 -180)"><path d="M-30 60 Q-50 -20 -20 -80 M30 60 Q50 -20 20 -80 M-20 -80 L20 -80 M-30 60 L30 60" stroke="#e0b040" strokeWidth={8} fill="none" /></g>
  </g>
);

const Marsyas: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a2a34" bottom="#08080c" id="sa5" />
    <path d="M0 1200 L1080 1200 L1080 1920 L0 1920 Z" fill="#14120e" />
    <g transform="translate(300 1180) scale(0.75)"><SatyrFig f={f} pipes /></g>
    <g transform="translate(780 1200)"><Apollo f={f} /></g>
    <Notes f={f} x={300} y={760} color="#c8a070" />
    <Notes f={f + 20} x={780} y={720} color="#ffd04a" />
  </svg>
);

const Judges: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#08060a" />
    <g transform="translate(540 1150) scale(1.2)"><Apollo f={f} /></g>
    <g transform="translate(220 1300) scale(0.55) rotate(-10)"><SatyrFig f={f} eye={BLOOD} /></g>
    {[700, 820, 940].map((x, i) => <g key={i} transform={`translate(${x} 1380) scale(0.5)`} opacity={0.7}><path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill="#14121a" /><circle cx={0} cy={-300} r={36} fill="#14121a" /><path d="M40 -230 L80 -340" stroke="#14121a" strokeWidth={16} /></g>)}
  </svg>
);

const Pine: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a0806" bottom="#050101" id="sa6" />
    <rect x={500} y={300} width={80} height={1300} fill="#1a0e08" />
    {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M540 ${260 + k * 140} L${300 - k * 30} ${420 + k * 140} L${780 + k * 30} ${420 + k * 140} Z`} fill="#0e0806" />)}
    <path d="M720 800 L720 900" stroke="#3a2a1a" strokeWidth={6} />
    <g transform={`translate(720 ${1220 + Math.sin(f / 12) * 6}) rotate(${Math.sin(f / 14) * 4} 0 -320) scale(0.6)`}><SatyrFig f={0} fill="#2a0806" eye="#2a0806" /></g>
    {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={700 + random(`pn${i}`) * 40} cy={1300 + ((f * 4 + i * 30) % 300)} r={6} fill={BLOOD} />)}
    <rect width={W} height={H} fill={BLOOD} opacity={0.1} />
  </svg>
);

const Voice: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#0e1820" bottom="#030507" id="sa7" />
    <Moon x={800} y={360} r={60} f={f} />
    <path d="M0 1100 Q540 1060 1080 1110 V1920 H0 Z" fill="#06121a" />
    <g transform={`translate(420 ${1080 + Math.sin(f / 9) * 6}) scale(0.6)`}><path d="M-260 0 L260 0 L200 80 L-200 80 Z" fill={INK} /><line x1={0} y1={0} x2={0} y2={-400} stroke={INK} strokeWidth={14} /><path d="M10 -380 Q160 -280 10 -120 Z" fill="#0b1416" /><g transform="translate(-140 0)"><path d="M-30 0 L-20 -160 Q0 -180 20 -160 L30 0 Z" fill={INK} /><circle cx={0} cy={-186} r={22} fill={INK} /></g></g>
    {[0, 1, 2, 3].map((i) => { const p = ((f / 20 + i / 4) % 1); return <path key={i} d={`M${100 + p * 300} ${700} q40 ${-40 - p * 40} 0 ${-80 - p * 80}`} stroke={FAE} strokeWidth={6 * (1 - p)} fill="none" opacity={1 - p} />; })}
    <text x={540} y={1460} textAnchor="middle" fontFamily="Fell" fontSize={64} fill={FAE} opacity={clamp((f - 30) / 10)}>“The Great Pan is dead.”</text>
  </svg>
);

const Wail: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#030406" />
    <path d="M0 1200 Q540 1150 1080 1200 V1920 H0 Z" fill="#0a0e10" />
    {Array.from({ length: 14 }).map((_, i) => {
      const x = 60 + i * 72, y = 1000 + (i % 3) * 60 + Math.sin(f / 8 + i) * 10;
      return <g key={i} opacity={0.35 + 0.3 * Math.sin(f / 6 + i)}><ellipse cx={x} cy={y} rx={30} ry={42} fill="#9ab8c8" /><ellipse cx={x - 10} cy={y - 8} rx={5} ry={8} fill="#000" /><ellipse cx={x + 10} cy={y - 8} rx={5} ry={8} fill="#000" /><ellipse cx={x} cy={y + 18} rx={8} ry={12 + 6 * Math.abs(Math.sin(f / 4 + i))} fill="#000" /></g>;
    })}
  </svg>
);

const Devil: React.FC<ShotProps> = ({ f, dur }) => {
  const m = clamp(f / (dur * 0.6));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#080202" />
      <circle cx={540} cy={860} r={460} fill={BLOOD} opacity={0.08 + m * 0.12} />
      <g transform="translate(540 1200) scale(1.05)"><SatyrFig f={f} fill={m > 0.5 ? "#2a0606" : INK} eye={m > 0.5 ? "#ff2a2a" : "#ffcf3a"} /></g>
      {m > 0.5 && <g opacity={(m - 0.5) * 2}><line x1={700} y1={500} x2={760} y2={1400} stroke="#3a1a10" strokeWidth={12} /><path d="M690 520 L700 460 L710 520 M720 510 L740 450 L742 516 M676 520 L660 466 L684 518" stroke="#3a1a10" strokeWidth={10} fill="none" /><path d={`M560 1300 C700 1340 760 ${1260 + Math.sin(f / 6) * 20} 820 1200 L840 1180 L820 1220`} stroke="#2a0606" strokeWidth={12} fill="none" /></g>}
    </svg>
  );
};

const SpEyes: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#010201" />
    <Trees tint="#040604" />
    {[[260, 900], [780, 980], [520, 820], [140, 1100], [940, 1120]].map(([x, y], i) => (f + i * 13) % 80 < 60 ? <g key={i}><circle cx={x} cy={y} r={6} fill="#ffcf3a" /><circle cx={x + 24} cy={y} r={6} fill="#ffcf3a" /><path d={`M${x - 8} ${y - 30} q-14 -30 0 -50 M${x + 32} ${y - 30} q14 -30 0 -50`} stroke="#3a3020" strokeWidth={6} fill="none" /></g> : null)}
    <Notes f={f} y={700} />
  </svg>
);

export const SHOTS22: Record<string, React.FC<ShotProps>> = {
  spipes: SPipes, revel: Revel, pan: PanShot, marathon: Marathon, marsyas: Marsyas, judges: Judges,
  pine: Pine, voice: Voice, wail: Wail, devil: Devil, speyes: SpEyes,
};
