import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #12 — Pegasus */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", PALE = "#eef4f4", GOLD = "#e0b040";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const PegasusFig: React.FC<{ f: number; fill?: string; rider?: boolean; rear?: number; eye?: string }> = ({ f, fill = PALE, rider, rear = 0, eye = "#5ab8ff" }) => {
  const st = { stroke: "#bfe8ff", strokeWidth: 4, strokeOpacity: 0.9 } as const;
  const flap = Math.sin(f / 5) * 25;
  return (
    <g transform={`rotate(${-rear * 35} 100 60)`}>
      <g transform={`rotate(${flap} 20 -40)`}>
        <path d="M20 -40 C80 -260 280 -420 480 -440 C420 -380 400 -320 440 -300 C380 -260 360 -200 400 -180 C320 -150 280 -100 300 -60 C200 -60 100 -40 60 0 Z" fill={fill} {...st} />
        {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M${120 + i * 60} ${-120 - i * 50} l${80} ${40}`} stroke="#bfe8ff" strokeOpacity={0.5} strokeWidth={3} />)}
      </g>
      <path d={`M280 0 C350 20 380 ${130 + Math.sin(f / 9) * 18} 340 240 C320 150 300 80 270 30 Z`} fill={fill} {...st} />
      {[[-150, 0], [-95, 8], [170, 0], [225, 8]].map(([lx, o], i) => <path key={i} d={`M${lx} 60 L${lx - 6 + o + (i < 2 ? -rear * 60 : 0)} 310 L${lx + 26 + o + (i < 2 ? -rear * 60 : 0)} 310 L${lx + 34} 60 Z`} fill={fill} {...st} />)}
      <ellipse cx={40} cy={30} rx={260} ry={105} fill={fill} {...st} />
      <g transform={`rotate(${Math.sin(f / 14) * 3} -120 -40)`}>
        <path d="M-60 -50 L-120 60 L-250 -260 L-170 -310 Z" fill={fill} {...st} />
        <path d="M-160 -320 L-250 -330 L-400 -200 L-390 -160 L-330 -165 L-240 -220 Z" fill={fill} {...st} />
        <path d="M-200 -330 L-214 -372 L-176 -326 Z" fill={fill} {...st} />
        {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M${-175 + i * 12} ${-305 + i * 26} q${30 + Math.sin(f / 7 + i) * 10} 6 44 40`} stroke={fill === PALE ? "#cfe4ff" : INK} strokeWidth={14} fill="none" strokeLinecap="round" />)}
        <circle cx={-300} cy={-262} r={9} fill={eye} />
      </g>
      {rider && <g transform="translate(-20 -130)"><path d="M-30 60 L-20 -80 Q0 -100 20 -80 L30 60 Z" fill={INK} /><circle cx={0} cy={-110} r={26} fill={INK} /><path d="M-20 -60 L-140 -180" stroke={INK} strokeWidth={14} /><path d="M-140 -190 L-150 -230 L-130 -194 Z" fill="#c8d0d8" /></g>}
    </g>
  );
};

const PegStorm: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a1e2a" bottom="#040508" id="pg1" />
    {Array.from({ length: 6 }).map((_, i) => <ellipse key={i} cx={((i * 260 + f * 2) % 1400) - 160} cy={300 + (i % 3) * 160} rx={320} ry={80} fill="#0c0e14" opacity={0.9} />)}
    <g transform={`translate(${200 + f * 3} ${800 + Math.sin(f / 8) * 30}) scale(0.7)`}><PegasusFig f={f} fill={INK} eye="#ff5a5a" /></g>
    <path d="M0 1300 L1080 1300 L1080 1920 L0 1920 Z" fill="#030406" />
  </svg>
);

export const Statue: React.FC<{ x: number; y: number; s: number; pose?: number }> = ({ x, y, s, pose = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-50 0 L-36 -220 Q0 -250 36 -220 L50 0 Z" fill="#6a6a64" stroke="#3a3a36" strokeWidth={3} />
    <circle cx={0} cy={-260} r={32} fill="#6a6a64" stroke="#3a3a36" strokeWidth={3} />
    <path d={`M36 -200 L${110 + pose * 20} ${-260 - pose * 60}`} stroke="#6a6a64" strokeWidth={18} strokeLinecap="round" />
    <path d="M-36 -200 L-90 -160" stroke="#6a6a64" strokeWidth={18} strokeLinecap="round" />
    <path d="M-10 -250 l6 14 M10 -252 l-4 16" stroke="#3a3a36" strokeWidth={3} />
  </g>
);

export const GorgonHead: React.FC<{ f: number; eye?: string }> = ({ f, eye = "#c8ff4a" }) => (
  <g>
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return <path key={i} d={`M${Math.cos(a) * 60} ${Math.sin(a) * 60 - 20} q${Math.cos(a + Math.sin(f / 6 + i)) * 80} ${Math.sin(a) * 80} ${Math.cos(a) * 140} ${Math.sin(a) * 140 - 20}`} stroke="#2a4a2a" strokeWidth={18} fill="none" strokeLinecap="round" />;
    })}
    <ellipse cx={0} cy={0} rx={80} ry={100} fill="#5a7a5a" />
    <ellipse cx={-28} cy={-10} rx={16} ry={10} fill={eye} /><ellipse cx={28} cy={-10} rx={16} ry={10} fill={eye} />
    <path d="M-34 56 Q0 38 34 56" stroke="#1a2a1a" strokeWidth={7} fill="none" /><path d="M-20 50 l4 10 l4 -9 M12 49 l4 9 l4 -10" fill="#e8e2d0" />
  </g>
);

const Lair: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#050806" />
    <path d="M0 0 H1080 V500 Q800 380 540 460 Q280 380 0 500 Z" fill="#010201" />
    <circle cx={540} cy={800} r={360} fill="#5aff7a" opacity={0.06 + 0.03 * Math.sin(f / 5)} />
    <Statue x={200} y={1200} s={1.1} pose={1} /><Statue x={420} y={1160} s={0.9} /><Statue x={760} y={1220} s={1.2} pose={0.5} /><Statue x={940} y={1150} s={0.85} pose={1} />
    <g transform={`translate(540 ${760 + Math.sin(f / 15) * 10}) scale(1.2)`} opacity={0.85}><GorgonHead f={f} /></g>
    <path d="M0 1250 Q540 1200 1080 1250 V1920 H0 Z" fill="#030503" />
  </svg>
);

const Shield: React.FC<ShotProps> = ({ f }) => {
  const swing = clamp((f - 25) / 6);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#060504" />
      <g transform="translate(540 820)">
        <circle r={340} fill="#a8905a" stroke="#6a5030" strokeWidth={20} />
        <circle r={300} fill="#c8c0a8" />
        <g transform="scale(-1.3 1.3)" opacity={1 - swing * 0.5}><GorgonHead f={f} /></g>
      </g>
      <path d={`M${100 + swing * 200} ${1400 - swing * 500} L${980 - (1 - swing) * 600} ${400 + swing * 800}`} stroke="#e8f0f8" strokeWidth={swing > 0 && swing < 1 ? 14 : 0} />
      {swing >= 1 && Array.from({ length: 22 }).map((_, i) => {
        const a = random(`sh${i}`) * Math.PI * 2, d = (f - 31) * (8 + random(`sd${i}`) * 10);
        return <circle key={i} cx={540 + Math.cos(a) * d} cy={820 + Math.sin(a) * d} r={8 + random(`sr${i}`) * 14} fill={BLOOD} />;
      })}
    </svg>
  );
};

const PBirth: React.FC<ShotProps> = ({ f }) => {
  const rise = clamp((f - 10) / 40);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#060203" />
      <ellipse cx={540} cy={1080} rx={420} ry={100} fill={BLOOD} opacity={0.85} />
      <ellipse cx={540} cy={1080} rx={420 + Math.sin(f / 4) * 20} ry={100} fill="none" stroke="#ff5a4a" strokeWidth={4} opacity={0.6} />
      <circle cx={540} cy={900} r={200 + rise * 300} fill="#fff4e0" opacity={0.15 * rise} />
      <g transform={`translate(560 ${1150 - rise * 380}) scale(${0.3 + rise * 0.5})`} opacity={rise}><PegasusFig f={f} eye={BLOOD} /></g>
      {Array.from({ length: 20 }).map((_, i) => <circle key={i} cx={540 + (random(`pb${i}`) - 0.5) * 600} cy={1080 - ((f * 5 + i * 40) % 700)} r={6} fill={BLOOD} opacity={0.6} />)}
    </svg>
  );
};

const PWild: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a3a50" bottom="#0a1018" id="pg2" />
    <Moon x={800} y={360} r={80} f={f} />
    <path d="M0 1200 L240 860 L420 980 L620 760 L820 940 L1080 820 V1920 H0 Z" fill="#0a1018" />
    <g transform={`translate(${-200 + f * 7} ${700 + Math.sin(f / 8) * 40}) scale(0.6)`}><PegasusFig f={f} /></g>
    <g transform="translate(200 1240)"><path d="M-30 0 L-20 -160 Q0 -180 20 -160 L30 0 Z" fill={INK} /><circle cx={0} cy={-180} r={22} fill={INK} /></g>
  </svg>
);

const Chimera: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a120a" bottom="#060202" id="pg3" />
    <g transform="translate(520 1250)">
      <ellipse cx={0} cy={-120} rx={240} ry={110} fill={INK} stroke="#ff8a3a" strokeOpacity={0.6} strokeWidth={4} />
      {[-160, -80, 100, 170].map((x, i) => <rect key={i} x={x} y={-40} width={36} height={140} fill={INK} />)}
      <circle cx={-250} cy={-180} r={90} fill={INK} stroke="#ff8a3a" strokeOpacity={0.6} strokeWidth={4} />
      {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M${-250 + Math.cos(i * 0.63) * 90} ${-180 + Math.sin(i * 0.63) * 90} l${Math.cos(i * 0.63) * 40} ${Math.sin(i * 0.63) * 40}`} stroke={INK} strokeWidth={16} />)}
      <circle cx={-280} cy={-200} r={9} fill="#ffcf3a" />
      <path d="M40 -220 L60 -320 L100 -320 L100 -240 Z" fill={INK} /><path d="M60 -320 L30 -380 M100 -320 L130 -380" stroke={INK} strokeWidth={10} />
      <path d={`M240 -120 C320 -160 360 ${-260 + Math.sin(f / 6) * 30} 300 -320`} stroke={INK} strokeWidth={26} fill="none" />
      <path d={`M-330 -170 L${-700} ${-260 + Math.sin(f / 3) * 40} L-700 ${-80 + Math.sin(f / 3) * 40} Z`} fill="#ff6a1a" opacity={0.8} />
      <path d={`M-330 -170 L${-600} ${-220 + Math.sin(f / 3) * 30} L-600 ${-120 + Math.sin(f / 3) * 30} Z`} fill="#ffd04a" opacity={0.9} />
    </g>
    <g transform={`translate(${700 + Math.sin(f / 10) * 40} ${560}) scale(0.5)`}><PegasusFig f={f} rider /></g>
  </svg>
);

const Olympus: React.FC<ShotProps> = ({ f, dur }) => {
  const up = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <Sky top="#4a5a7a" bottom="#1a2030" id="pg4" />
      <circle cx={540} cy={260} r={260} fill="#fff4d0" opacity={0.4} />
      <g transform="translate(540 380)">{[-240, -120, 0, 120, 240].map((x, i) => <rect key={i} x={x - 18} y={-60} width={36} height={180} fill="#e8e0cc" />)}<path d="M-300 -60 L0 -180 L300 -60 Z" fill="#e8e0cc" /><rect x={-300} y={120} width={600} height={30} fill="#e8e0cc" /></g>
      {Array.from({ length: 5 }).map((_, i) => <ellipse key={i} cx={((i * 300 + f * 1.5) % 1400) - 160} cy={620 + (i % 2) * 80} rx={300} ry={60} fill="#dfe6ee" opacity={0.6} />)}
      <g transform={`translate(${540 + Math.sin(f / 10) * 40} ${1500 - up * 600}) rotate(-60) scale(0.5)`}><PegasusFig f={f} rider /></g>
    </svg>
  );
};

const Gadfly: React.FC<ShotProps> = ({ f }) => {
  const sting = clamp((f - 25) / 5);
  return (
    <svg width={W} height={H}>
      <Sky top="#3a3a50" bottom="#0a0a14" id="pg5" />
      <g transform={`translate(520 1000) scale(0.75)`}><PegasusFig f={f} rider rear={sting} eye={sting > 0 ? BLOOD : "#5ab8ff"} /></g>
      <g transform={`translate(${900 - sting * 280} ${500 + sting * 380}) scale(${2.4 - sting * 1.6})`}>
        <ellipse cx={0} cy={0} rx={40} ry={22} fill="#1a1410" /><circle cx={-40} cy={-4} r={16} fill="#1a1410" />
        <circle cx={-46} cy={-8} r={7} fill="#c83a2a" />
        <ellipse cx={10} cy={-26} rx={36} ry={14} fill="#bfe8ff" opacity={0.4} transform={`rotate(${Math.sin(f * 2) * 30} 0 -20)`} />
        <path d="M40 4 L64 10" stroke="#1a1410" strokeWidth={6} />
      </g>
    </svg>
  );
};

const PFall: React.FC<ShotProps> = ({ f, dur }) => {
  const p = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <Sky top="#1a2030" bottom="#3a2018" id="pg6" />
      {Array.from({ length: 8 }).map((_, i) => <ellipse key={i} cx={(i * 170) % 1080} cy={((i * 260 - f * 18) % 2200 + 2200) % 2200 - 140} rx={240} ry={50} fill="#dfe6ee" opacity={0.5} />)}
      <g transform={`translate(${540 + Math.sin(f / 6) * 60} ${400 + p * 700}) rotate(${f * 6})`}>
        <path d="M-30 60 L-20 -80 Q0 -100 20 -80 L30 60 Z" fill={INK} /><circle cx={0} cy={-110} r={26} fill={INK} />
        <path d="M-20 -60 L-90 -130 M20 -60 L90 -120 M-14 60 L-40 160 M14 60 L50 150" stroke={INK} strokeWidth={14} strokeLinecap="round" />
      </g>
      <path d="M0 1500 L300 1380 L600 1460 L1080 1360 V1920 H0 Z" fill="#0a0806" />
    </svg>
  );
};

const PStars: React.FC<ShotProps> = ({ f }) => {
  const pts: [number, number][] = [[300, 700], [520, 640], [560, 900], [320, 960], [200, 560], [120, 480], [760, 560], [880, 480], [620, 1080], [700, 1200]];
  const lines = [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [4, 5], [1, 6], [6, 7], [2, 8], [8, 9]];
  const draw = clamp(f / 40);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#03040a" />
      {Array.from({ length: 120 }).map((_, i) => <circle key={i} cx={random(`st${i}`) * W} cy={random(`su${i}`) * 1500} r={1 + random(`sv${i}`) * 2} fill="#fff" opacity={0.3 + 0.5 * Math.abs(Math.sin(f / 20 + i))} />)}
      {lines.slice(0, Math.ceil(draw * lines.length)).map(([a, b], i) => <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="#9ab8ff" strokeWidth={3} opacity={0.6} />)}
      {pts.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r={9} fill="#fff" /><circle cx={x} cy={y} r={26} fill="#9ab8ff" opacity={0.25} /></g>)}
      <g transform="translate(540 820) scale(0.65)" opacity={0.12 * draw}><PegasusFig f={f} /></g>
    </svg>
  );
};

export const SHOTS12: Record<string, React.FC<ShotProps>> = {
  pegstorm: PegStorm, lair: Lair, shield: Shield, pbirth: PBirth, pwild: PWild, chimera: Chimera,
  olympus: Olympus, gadfly: Gadfly, pfall: PFall, pstars: PStars,
};
