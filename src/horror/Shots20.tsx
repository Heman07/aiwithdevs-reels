import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #20 — Minotaur */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", FIRE = "#ff8a2a", STONE = "#3a3430";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const Minotaur: React.FC<{ f: number; s?: number; eye?: string; fill?: string; axe?: boolean }> = ({ f, s = 1, eye = BLOOD, fill = INK, axe = true }) => {
  const st = { stroke: "#c87a3a", strokeOpacity: 0.55, strokeWidth: 4 } as const;
  const breathe = 1 + Math.sin(f / 8) * 0.02;
  return (
    <g transform={`scale(${s * breathe} ${s})`}>
      <path d="M-120 0 L-150 300 L-60 300 L-30 40 M120 0 L150 300 L60 300 L30 40" fill={fill} {...st} />
      <path d="M-200 -380 C-240 -200 -160 -40 -120 20 L120 20 C160 -40 240 -200 200 -380 C120 -440 -120 -440 -200 -380 Z" fill={fill} {...st} />
      <path d="M-200 -360 L-300 -100 L-260 -90 M200 -360 L300 -100 L260 -90" stroke={fill} strokeWidth={60} strokeLinecap="round" fill="none" />
      <path d="M-90 -420 C-110 -500 -70 -560 0 -570 C70 -560 110 -500 90 -420 Z" fill={fill} {...st} />
      <path d="M-50 -470 Q-60 -420 0 -400 Q60 -420 50 -470 Z" fill={fill} {...st} />
      <path d="M-80 -540 C-160 -560 -220 -620 -200 -690 C-180 -630 -130 -600 -70 -580 Z M80 -540 C160 -560 220 -620 200 -690 C180 -630 130 -600 70 -580 Z" fill="#d8d0b8" />
      <path d="M-100 -520 L-150 -500 L-96 -490 Z M100 -520 L150 -500 L96 -490 Z" fill={fill} />
      <circle cx={-34} cy={-500} r={9} fill={eye} /><circle cx={34} cy={-500} r={9} fill={eye} />
      <circle cx={-34} cy={-500} r={30} fill={eye} opacity={0.2} /><circle cx={34} cy={-500} r={30} fill={eye} opacity={0.2} />
      <circle cx={-14} cy={-420} r={6} fill="#000" /><circle cx={14} cy={-420} r={6} fill="#000" />
      <ellipse cx={0} cy={-406} rx={20} ry={8} fill="none" stroke="#c8a040" strokeWidth={5} />
      {axe && <g transform="translate(290 -100)"><rect x={-8} y={-300} width={16} height={420} fill="#4a3020" /><path d="M8 -300 Q90 -280 90 -200 Q90 -120 8 -110 Z M-8 -300 Q-90 -280 -90 -200 Q-90 -120 -8 -110 Z" fill="#8a8a88" stroke="#3a3a38" strokeWidth={3} /></g>}
      {[0, 1].map((i) => { const p = ((f / 30 + i / 2) % 1); return <circle key={i} cx={(i ? 14 : -14) + (i ? 1 : -1) * p * 40} cy={-410 + p * 20} r={10 + p * 20} fill="#c8c8c8" opacity={0.3 * (1 - p)} />; })}
    </g>
  );
};

const MazeGrid: React.FC<{ f: number; glow?: boolean }> = ({ f, glow }) => {
  const cells = 9, size = 100, ox = 90, oy = 400;
  return (
    <g>
      {Array.from({ length: cells + 1 }).map((_, r) => Array.from({ length: cells }).map((_, c) => random(`mh${r}${c}`) > 0.45 ? <line key={`h${r}${c}`} x1={ox + c * size} y1={oy + r * size} x2={ox + (c + 1) * size} y2={oy + r * size} stroke={glow ? "#c8a070" : STONE} strokeWidth={14} strokeLinecap="round" /> : null))}
      {Array.from({ length: cells }).map((_, r) => Array.from({ length: cells + 1 }).map((_, c) => random(`mv${r}${c}`) > 0.5 ? <line key={`v${r}${c}`} x1={ox + c * size} y1={oy + r * size} x2={ox + c * size} y2={oy + (r + 1) * size} stroke={glow ? "#c8a070" : STONE} strokeWidth={14} strokeLinecap="round" /> : null))}
    </g>
  );
};

const Maze: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#050403" />
    <g transform={`rotate(${f * 0.3} 540 850)`}><MazeGrid f={f} glow /></g>
    <circle cx={540} cy={850} r={60 + 10 * Math.sin(f / 5)} fill={BLOOD} opacity={0.5} />
    <circle cx={520} cy={840} r={7} fill="#ff4a2a" /><circle cx={560} cy={840} r={7} fill="#ff4a2a" />
    {Array.from({ length: 14 }).map((_, i) => <g key={i} transform={`translate(${140 + random(`my${i}`) * 800} ${440 + random(`mz${i}`) * 820})`}><circle r={6} fill="#ece4d0" opacity={0.6} /></g>)}
  </svg>
);

const BullFig: React.FC<{ f: number; fill?: string; glow?: boolean }> = ({ f, fill = "#eef0f0", glow }) => (
  <g>
    {glow && <ellipse cx={0} cy={-40} rx={420} ry={260} fill="#fff" opacity={0.12 + 0.05 * Math.sin(f / 6)} />}
    {[-160, -100, 120, 180].map((x, i) => <rect key={i} x={x} y={40} width={36} height={180} fill={fill} />)}
    <path d="M-220 -40 C-200 -160 200 -170 240 -50 C260 30 200 80 120 80 L-160 80 C-240 70 -250 10 -220 -40 Z" fill={fill} />
    <path d="M240 -50 C320 -40 360 0 380 80" stroke={fill} strokeWidth={18} fill="none" />
    <path d="M-200 -100 C-260 -140 -320 -140 -360 -100 L-360 -20 C-320 0 -260 -10 -220 -20 Z" fill={fill} />
    <path d="M-330 -130 C-380 -170 -400 -220 -380 -260 C-370 -210 -340 -180 -310 -150 Z M-250 -130 C-220 -180 -180 -200 -150 -220 C-170 -180 -200 -150 -230 -120 Z" fill="#d8c890" />
    <circle cx={-310} cy={-90} r={8} fill={glow ? "#5ab8ff" : "#000"} />
  </g>
);

const WhiteBull: React.FC<ShotProps> = ({ f, dur }) => {
  const rise = clamp(f / (dur * 0.6));
  return (
    <svg width={W} height={H}>
      <Sky top="#2a3a4a" bottom="#0a1018" id="mn1" />
      <Moon x={540} y={380} r={90} f={f} />
      <g transform={`translate(560 ${1300 - rise * 260}) scale(0.9)`}><BullFig f={f} glow /></g>
      <path d={`M-200 1180 ${Array.from({ length: 14 }).map((_, k) => `q50 ${-30 * (0.6 + 0.4 * Math.sin(f / 6 + k))} 100 0`).join(" ")} V1920 H-200 Z`} fill="#0a1a24" />
      <g transform="translate(160 1200)"><path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill={INK} /><circle cx={0} cy={-300} r={36} fill={INK} /><path d="M-30 -330 L-24 -360 L0 -340 L24 -360 L30 -330 Z" fill="#e0b040" /></g>
    </svg>
  );
};

const MKeep: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#3a2a20" bottom="#0a0604" id="mn2" />
    <path d="M0 1150 L1080 1150 L1080 1920 L0 1920 Z" fill="#1a120a" />
    {Array.from({ length: 10 }).map((_, i) => <rect key={i} x={140 + i * 85} y={950} width={14} height={220} fill="#3a2414" />)}
    <rect x={140} y={980} width={780} height={14} fill="#3a2414" /><rect x={140} y={1060} width={780} height={14} fill="#3a2414" />
    <g transform="translate(600 1000) scale(0.75)"><BullFig f={f} glow /></g>
    <g transform="translate(220 1300)"><path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill={INK} /><circle cx={0} cy={-300} r={36} fill={INK} /><path d="M-30 -330 L-24 -360 L0 -340 L24 -360 L30 -330 Z" fill="#e0b040" /><path d="M40 -220 L120 -260" stroke={INK} strokeWidth={16} /></g>
    <g transform="translate(860 1320) scale(0.7)" opacity={0.7}><BullFig f={f} fill="#2a1a10" /></g>
    <path d="M760 1260 L960 1260" stroke={BLOOD} strokeWidth={6} opacity={0.6} />
  </svg>
);

const Pasiphae: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#06040a" />
    <circle cx={540} cy={820} r={420} fill="#5a8aff" opacity={0.08} />
    <g transform="translate(540 820)" opacity={0.6}><ellipse rx={300} ry={360} fill="#0e2a3a" /><ellipse cx={-90} cy={-40} rx={36} ry={18} fill="#9affff" /><ellipse cx={90} cy={-40} rx={36} ry={18} fill="#9affff" /></g>
    <g transform="translate(540 1300)">
      <path d="M-80 0 Q-70 -200 -40 -300 L40 -300 Q70 -200 80 0 Z" fill="#1a1420" stroke="#e8e0c8" strokeOpacity={0.5} strokeWidth={3} />
      <circle cx={0} cy={-340} r={42} fill="#1a1420" stroke="#e8e0c8" strokeOpacity={0.5} strokeWidth={3} />
      <path d="M-34 -370 L-28 -400 L0 -380 L28 -400 L34 -370 Z" fill="#e0b040" />
      <circle cx={-14} cy={-344} r={6} fill="#9affff" /><circle cx={14} cy={-344} r={6} fill="#9affff" />
    </g>
    {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M${540 + Math.cos(i * 0.52) * 160} ${960 + Math.sin(i * 0.52) * 160} q${Math.cos(i) * 30} -30 ${Math.cos(i * 0.52) * 60} -60`} stroke="#9affff" strokeWidth={4} opacity={0.4 + 0.4 * Math.sin(f / 4 + i)} fill="none" />)}
  </svg>
);

const MBirth: React.FC<ShotProps> = ({ f, dur }) => {
  const grow = clamp(f / (dur * 0.8));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#080203" />
      <circle cx={540} cy={900} r={480} fill={BLOOD} opacity={0.12} />
      <g transform={`translate(540 ${1120}) scale(${0.35 + grow * 0.6})`}><Minotaur f={f} axe={grow > 0.7} /></g>
      {Array.from({ length: 12 }).map((_, i) => <g key={i} transform={`translate(${120 + i * 80} 1400) rotate(${random(`mb${i}`) * 180})`}><rect x={-30} y={-5} width={60} height={10} rx={5} fill="#d8d0c0" opacity={0.6} /></g>)}
    </svg>
  );
};

const Daedalus: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a1424" />
    {Array.from({ length: 20 }).map((_, i) => <line key={i} x1={0} y1={i * 100} x2={W} y2={i * 100} stroke="#3a5a8a" strokeOpacity={0.25} />)}
    {Array.from({ length: 12 }).map((_, i) => <line key={i} x1={i * 100} y1={0} x2={i * 100} y2={H} stroke="#3a5a8a" strokeOpacity={0.25} />)}
    <g opacity={clamp(f / 40)}><MazeGrid f={f} glow /></g>
    <text x={540} y={1460} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={56} fill="#c8d8ff">ΛΑΒΥΡΙΝΘΟΣ</text>
  </svg>
);

const Tribute: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a3040" bottom="#0a0c12" id="mn3" />
    <path d="M0 1120 Q540 1080 1080 1130 V1920 H0 Z" fill="#081218" />
    <g transform={`translate(${200 + f * 2} ${1080 + Math.sin(f / 9) * 6})`}>
      <path d="M-260 0 L260 0 L200 80 L-200 80 Z" fill={INK} stroke="#8ab" strokeOpacity={0.4} strokeWidth={3} />
      <line x1={0} y1={0} x2={0} y2={-460} stroke={INK} strokeWidth={14} />
      <path d="M10 -440 Q220 -320 10 -100 Z" fill="#000" stroke="#3a3a3a" strokeWidth={3} />
      {Array.from({ length: 7 }).map((_, i) => <g key={i} transform={`translate(${-210 + i * 60} 0) scale(0.35)`}><path d="M-40 0 L-30 -180 Q0 -200 30 -180 L40 0 Z" fill="#14181c" /><circle cx={0} cy={-210} r={30} fill="#14181c" /></g>)}
    </g>
  </svg>
);

const Corridor: React.FC<ShotProps> = ({ f, dur }) => {
  const near = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#030201" />
      {Array.from({ length: 6 }).map((_, i) => { const s = 1 - i * 0.15; return <rect key={i} x={540 - 480 * s} y={860 - 760 * s} width={960 * s} height={1520 * s} fill="none" stroke={STONE} strokeWidth={30 * s} opacity={1 - i * 0.12} />; })}
      <path d="M60 100 L320 650 L320 1180 L60 1620 Z" fill="#1a1612" /><path d="M1020 100 L760 650 L760 1180 L1020 1620 Z" fill="#1a1612" />
      {[[80, 500], [1000, 500]].map(([x, y], i) => <g key={i}><rect x={x - 8} y={y} width={16} height={60} fill="#3a2414" /><path d={`M${x - 12} ${y} Q${x} ${y - 40 - Math.sin(f / 2 + i) * 10} ${x + 12} ${y} Z`} fill={FIRE} /><circle cx={x} cy={y - 20} r={90} fill={FIRE} opacity={0.12} /></g>)}
      <g transform={`translate(540 ${1080 + near * 120}) scale(${0.2 + near * 0.55})`} opacity={0.4 + near * 0.6}><Minotaur f={f} /></g>
    </svg>
  );
};

const Thread: React.FC<ShotProps> = ({ f, dur }) => {
  const p = clamp(f / dur);
  const pts = [[150, 1300], [150, 1100], [350, 1100], [350, 900], [550, 900], [550, 700], [750, 700], [750, 500], [550, 500]];
  const n = Math.max(2, Math.ceil(p * pts.length));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#060504" />
      <MazeGrid f={f} />
      <polyline points={pts.slice(0, n).map((q) => q.join(",")).join(" ")} fill="none" stroke={BLOOD} strokeWidth={6} />
      <g transform={`translate(${pts[n - 1][0]} ${pts[n - 1][1]}) scale(0.25)`}><path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill="#c8a070" /><circle cx={0} cy={-300} r={36} fill="#c8a070" /></g>
      <g transform="translate(140 1360)"><circle r={30} fill={BLOOD} /><path d="M-20 -10 Q0 10 20 -10" stroke="#ff8a8a" strokeWidth={3} fill="none" /></g>
    </svg>
  );
};

const MFight: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#080202" />
    <circle cx={540} cy={900} r={480} fill={FIRE} opacity={0.1} />
    <g transform={`translate(${640 + Math.sin(f / 3) * 20} 1150) scale(0.7) rotate(${Math.sin(f / 4) * 8})`}><Minotaur f={f} /></g>
    <g transform={`translate(${300 + Math.sin(f / 3 + 1) * 20} 1150)`}>
      <path d="M-70 0 L-50 -300 Q0 -340 50 -300 L70 0 Z" fill="#1a1008" stroke="#c8a060" strokeOpacity={0.6} strokeWidth={4} />
      <circle cx={0} cy={-340} r={40} fill="#1a1008" stroke="#c8a060" strokeOpacity={0.6} strokeWidth={4} />
      <path d={`M50 -260 L${200 + Math.sin(f / 2) * 30} -420`} stroke="#1a1008" strokeWidth={28} strokeLinecap="round" />
      <path d={`M${200 + Math.sin(f / 2) * 30} -420 L${300 + Math.sin(f / 2) * 30} -520`} stroke="#c8d0d8" strokeWidth={10} />
    </g>
    {Array.from({ length: 14 }).map((_, i) => <circle key={i} cx={400 + random(`mf${i}`) * 300} cy={700 + ((f * 5 + i * 40) % 500)} r={6 + random(`mg${i}`) * 8} fill={BLOOD} />)}
  </svg>
);

const Sails: React.FC<ShotProps> = ({ f, dur }) => {
  const jump = clamp((f - dur * 0.55) / (dur * 0.3));
  return (
    <svg width={W} height={H}>
      <Sky top="#4a4a5a" bottom="#1a1a24" id="mn4" />
      <path d="M0 1000 L0 600 L380 560 L420 1000 Z" fill="#141210" />
      <g transform={`translate(${340 + jump * 120} ${560 + jump * jump * 560}) rotate(${jump * 120})`}><path d="M-40 0 L-30 -180 Q0 -200 30 -180 L40 0 Z" fill={INK} /><circle cx={0} cy={-210} r={30} fill={INK} /><path d="M-24 -236 L-20 -260 L0 -244 L20 -260 L24 -236 Z" fill="#e0b040" /></g>
      <path d="M0 1000 Q540 960 1080 1010 V1920 H0 Z" fill="#14242c" />
      <g transform={`translate(${900 - f * 1.2} ${960 + Math.sin(f / 9) * 6}) scale(0.6)`}><path d="M-260 0 L260 0 L200 80 L-200 80 Z" fill={INK} /><line x1={0} y1={0} x2={0} y2={-460} stroke={INK} strokeWidth={14} /><path d="M10 -440 Q220 -320 10 -100 Z" fill="#000" /></g>
      {jump >= 1 && <ellipse cx={460} cy={1010} rx={120} ry={20} fill="none" stroke="#cfe" strokeWidth={5} opacity={0.6} />}
    </svg>
  );
};

const Knossos: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#c8b090" bottom="#6a5a40" id="mn5" />
    <path d="M0 1100 L1080 1100 L1080 1920 L0 1920 Z" fill="#8a7a5a" />
    {[200, 380, 700, 880].map((x, i) => <g key={i}><path d={`M${x - 30} 1100 L${x - 40} 700 L${x + 40} 700 L${x + 30} 1100 Z`} fill="#a02a1a" /><rect x={x - 54} y={670} width={108} height={36} fill="#1a1410" /></g>)}
    <rect x={160} y={640} width={760} height={34} fill="#d8c8a0" />
    <g transform="translate(540 420)">
      <rect x={-300} y={-140} width={600} height={260} fill="#d8b880" stroke="#5a3a1a" strokeWidth={6} />
      <g transform={`translate(${Math.sin(f / 20) * 6} 40) scale(0.4)`}><BullFig f={f} fill="#5a3a2a" /></g>
      <g transform={`translate(-20 ${-60 + Math.sin(f / 10) * 4}) rotate(${-20 + f}) scale(0.18)`}><path d="M-40 0 L-30 -180 Q0 -200 30 -180 L40 0 Z" fill="#a0402a" /><circle cx={0} cy={-210} r={30} fill="#a0402a" /></g>
    </g>
  </svg>
);

export const SHOTS20: Record<string, React.FC<ShotProps>> = {
  maze: Maze, whitebull: WhiteBull, mkeep: MKeep, pasiphae: Pasiphae, mbirth: MBirth, daedalus: Daedalus,
  tribute: Tribute, corridor: Corridor, thread: Thread, mfight: MFight, sails: Sails, knossos: Knossos,
};
