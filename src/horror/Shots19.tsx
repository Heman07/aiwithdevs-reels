import React from "react";
import { random } from "remotion";
import { ShotProps, Sky } from "./Shots";
import { Wolf } from "./Shots11";

/* Creature #19 — Cerberus */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", FIRE = "#ff5a1a", SOUL = "#9ad8ff";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const Cerberus: React.FC<{ f: number; sleep?: boolean; snarl?: boolean; eye?: string; fill?: string }> = ({ f, sleep, snarl, eye = BLOOD, fill = INK }) => {
  const st = { stroke: "#ff8a5a", strokeOpacity: 0.55, strokeWidth: 4 } as const;
  const head = (dx: number, rot: number, ph: number) => (
    <g transform={`translate(${dx} 0) rotate(${rot + (sleep ? 25 : Math.sin(f / 9 + ph) * 6)} 0 -120)`}>
      <path d="M-45 -60 C-55 -130 -45 -170 -25 -190 L40 -180 C55 -130 55 -100 50 -60 Z" fill={fill} {...st} />
      <ellipse cx={-10} cy={-205} rx={64} ry={52} fill={fill} {...st} />
      <path d="M-55 -228 L-165 -206 Q-176 -190 -165 -176 L-58 -166 Z" fill={fill} {...st} />
      <circle cx={-168} cy={-196} r={9} fill="#000" />
      <path d="M-30 -248 L-46 -300 L-6 -254 Z M14 -250 L22 -300 L36 -246 Z" fill={fill} {...st} />
      {sleep ? <path d="M-70 -218 q12 6 24 0" stroke={eye} strokeWidth={4} fill="none" /> : <><circle cx={-58} cy={-220} r={8} fill={eye} /><circle cx={-58} cy={-220} r={26} fill={eye} opacity={0.2} /></>}
      {snarl && !sleep && Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${-160 + i * 17} -176 l6 14 l6 -14`} fill="#e8e2d0" />)}
    </g>
  );
  return (
    <g>
      {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M${-160 + i * 36} -140 q${Math.sin(f / 6 + i) * 30} -50 ${-10 + Math.sin(f / 5 + i) * 20} -100`} stroke="#2a3a1a" strokeWidth={12} fill="none" strokeLinecap="round" />)}
      <path d={`M220 0 C300 20 340 ${-60 + Math.sin(f / 8) * 30} 380 ${-140 + Math.sin(f / 8) * 30}`} stroke="#2a3a1a" strokeWidth={22} fill="none" strokeLinecap="round" />
      {[[-170, 0], [-110, 8], [150, 0], [210, 8]].map(([lx, o], i) => <path key={i} d={`M${lx} 60 L${lx - 20 + o} 260 L${lx + 20 + o} 270 L${lx + 30} 60 Z`} fill={fill} {...st} />)}
      <path d="M-230 -60 C-150 -170 180 -160 260 -40 C280 30 220 80 150 80 L-160 80 C-240 70 -270 0 -230 -60 Z" fill={fill} {...st} />
      {head(-260, -20, 0)}{head(-130, 0, 2)}{head(10, 20, 4)}
    </g>
  );
};

const Gates: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#080202" />
    <circle cx={540} cy={800} r={460} fill={FIRE} opacity={0.15 + 0.05 * Math.sin(f / 3)} />
    <path d="M140 1250 L140 520 Q540 200 940 520 L940 1250 Z" fill="#000" stroke="#3a1a10" strokeWidth={30} />
    {Array.from({ length: 9 }).map((_, i) => <line key={i} x1={200 + i * 85} y1={1250} x2={200 + i * 85} y2={460 + Math.abs(i - 4) * 30} stroke="#2a1a14" strokeWidth={14} />)}
    {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M${190 + i * 85} ${470 + Math.abs(i - 4) * 30} l10 -36 l10 36`} fill="#2a1a14" />)}
    <g transform="translate(560 1180) scale(0.75)"><Cerberus f={f} snarl /></g>
    {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={random(`gf${i}`) * W} cy={1500 - ((f * (3 + random(`gv${i}`) * 4) + i * 50) % 1200)} r={3} fill={FIRE} opacity={0.7} />)}
  </svg>
);

const Parents: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a1420" bottom="#050306" id="cb1" />
    <g transform="translate(320 1300) scale(1.1)">
      {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${-60 + i * 24} 0 C${-80 + i * 30 + Math.sin(f / 6 + i) * 30} 120 ${-140 + i * 40} 200 ${-100 + i * 40 + Math.sin(f / 5 + i) * 40} 300`} stroke="#14201a" strokeWidth={30} fill="none" strokeLinecap="round" />)}
      <path d="M-90 0 L-70 -420 Q0 -480 70 -420 L90 0 Z" fill="#0c0e14" stroke="#9ab" strokeOpacity={0.4} strokeWidth={4} />
      <circle cx={0} cy={-480} r={60} fill="#0c0e14" stroke="#9ab" strokeOpacity={0.4} strokeWidth={4} />
      {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${Math.cos(i * 0.8) * 50} ${-480 + Math.sin(i * 0.8) * 50} l${Math.cos(i * 0.8) * 60} ${Math.sin(i * 0.8) * 60 - 20}`} stroke="#0c0e14" strokeWidth={14} />)}
      <circle cx={-20} cy={-488} r={8} fill="#ffcf3a" /><circle cx={20} cy={-488} r={8} fill="#ffcf3a" />
    </g>
    <path d="M200 0 L180 300 L240 320 L160 600" stroke="#e8f0ff" strokeWidth={8} fill="none" opacity={(f % 16) < 4 ? 1 : 0.2} />
    <g transform="translate(780 1300)">
      <path d={`M0 0 C80 120 -40 200 60 300 C120 360 40 420 100 480`} stroke="#1a2a14" strokeWidth={70} fill="none" strokeLinecap="round" transform={`translate(${Math.sin(f / 8) * 10} 0)`} />
      <path d="M-60 0 Q-50 -200 -30 -260 L30 -260 Q50 -200 60 0 Z" fill="#14100c" stroke="#9ab" strokeOpacity={0.4} strokeWidth={3} />
      <circle cx={0} cy={-300} r={40} fill="#14100c" stroke="#9ab" strokeOpacity={0.4} strokeWidth={3} />
      <path d="M-36 -320 C-80 -260 -70 -180 -90 -120 M36 -320 C80 -260 70 -180 90 -120" stroke="#14100c" strokeWidth={18} fill="none" />
      <circle cx={-14} cy={-306} r={5} fill={BLOOD} /><circle cx={14} cy={-306} r={5} fill={BLOOD} />
    </g>
  </svg>
);

const Heads: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#060203" />
    <circle cx={540} cy={860} r={460} fill={BLOOD} opacity={0.1} />
    <g transform="translate(600 1080) scale(1.2)"><Cerberus f={f} snarl /></g>
  </svg>
);

const Styx: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#040608" />
    <path d="M0 980 Q540 920 1080 990 L1080 1260 Q540 1200 0 1260 Z" fill="#0a1a1e" />
    {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${((i * 170 + f * 2) % 1300) - 100} ${1040 + (i % 3) * 50} q50 -10 100 0`} stroke="#3a6a70" strokeOpacity={0.5} strokeWidth={3} fill="none" />)}
    <g transform={`translate(${300 + Math.sin(f / 20) * 30} 1000)`}><path d="M-160 0 L160 0 L130 40 L-130 40 Z" fill={INK} /><g transform="translate(-100 0)"><path d="M-30 0 L-20 -200 Q0 -230 20 -200 L30 0 Z" fill={INK} /><circle cx={0} cy={-226} r={24} fill={INK} /><line x1={20} y1={-150} x2={140} y2={60} stroke={INK} strokeWidth={8} /></g>{[0, 60, 110].map((x, i) => <g key={i} transform={`translate(${x} 0) scale(0.6)`} opacity={0.6}><path d="M-30 0 L-20 -180 Q0 -200 20 -180 L30 0 Z" fill={SOUL} /><circle cx={0} cy={-206} r={22} fill={SOUL} /></g>)}</g>
    <path d="M0 1260 Q540 1200 1080 1260 V1920 H0 Z" fill="#0a0606" />
    <g transform="translate(820 1220) scale(0.45)"><Cerberus f={f} /></g>
    {[0, 1, 2].map((i) => <g key={i} transform={`translate(${560 + i * 50 + Math.sin(f / 10 + i) * 6} 1220) scale(0.4)`} opacity={0.6}><path d="M-30 0 L-20 -180 Q0 -200 20 -180 L30 0 Z" fill={SOUL} /><circle cx={0} cy={-206} r={22} fill={SOUL} /></g>)}
  </svg>
);

const Devour: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0102" />
    <g transform={`translate(620 1180) scale(1.3) rotate(${Math.sin(f / 2) * 3})`}><Cerberus f={f * 2} snarl /></g>
    {Array.from({ length: 16 }).map((_, i) => { const a = random(`dv${i}`) * Math.PI * 2, d = 40 + f * (4 + random(`dw${i}`) * 6); return <path key={i} d="M0 0 q10 -20 0 -40" stroke={SOUL} strokeWidth={10} fill="none" opacity={Math.max(0, 1 - f / 40)} transform={`translate(${380 + Math.cos(a) * d} ${700 + Math.sin(a) * d}) rotate(${a * 57})`} />; })}
    <rect width={W} height={H} fill={BLOOD} opacity={0.15 + 0.1 * Math.sin(f)} />
  </svg>
);

const Orpheus: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#060408" />
    <circle cx={540} cy={900} r={420} fill="#c8a0ff" opacity={0.08} />
    <g transform="translate(700 1200) scale(0.8)"><Cerberus f={f} sleep eye="#ff8a5a" /></g>
    <g transform="translate(250 1250)">
      <path d="M-50 0 L-36 -240 Q0 -270 36 -240 L50 0 Z" fill={INK} stroke="#e8e0c8" strokeOpacity={0.5} strokeWidth={3} />
      <circle cx={0} cy={-270} r={32} fill={INK} stroke="#e8e0c8" strokeOpacity={0.5} strokeWidth={3} />
      <g transform="translate(70 -170)"><path d="M-30 60 Q-50 -20 -20 -80 M30 60 Q50 -20 20 -80 M-20 -80 L20 -80 M-30 60 L30 60" stroke="#e0b040" strokeWidth={8} fill="none" />{[-14, 0, 14].map((x, i) => <line key={i} x1={x} y1={-76} x2={x} y2={56} stroke="#e8e0c8" strokeWidth={2} />)}</g>
    </g>
    {Array.from({ length: 6 }).map((_, i) => { const p = ((f / 40 + i / 6) % 1); return <text key={i} x={320 + p * 400} y={900 - p * 200 + Math.sin(p * 6) * 30} fontFamily="serif" fontSize={56} fill="#c8a0ff" opacity={1 - p}>♪</text>; })}
    {[0, 1, 2].map((i) => { const p = ((f / 50 + i / 3) % 1); return <text key={i} x={520 + i * 100 + p * 40} y={760 - p * 160} fontFamily="serif" fontSize={40 + p * 20} fill="#ece4d0" opacity={1 - p}>z</text>; })}
  </svg>
);

const HoneyCake: React.FC<ShotProps> = ({ f }) => {
  const p = clamp(f / 25);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#070304" />
      <g transform="translate(700 1200) scale(0.85)"><Cerberus f={f} snarl={p < 1} sleep={f > 60} /></g>
      <g transform={`translate(${200 + p * 300} ${900 - Math.sin(p * Math.PI) * 300 + p * 80}) rotate(${f * 8})`} opacity={p < 1 ? 1 : 0}><ellipse rx={50} ry={34} fill="#c8902a" /><ellipse rx={36} ry={20} fill="#e8b84a" /><circle cx={10} cy={-6} r={8} fill="#7aff7a" opacity={0.7} /></g>
      <g transform="translate(160 1300)"><path d="M-60 0 Q-50 -200 -30 -260 L30 -260 Q50 -200 60 0 Z" fill={INK} stroke="#e8e0c8" strokeOpacity={0.4} strokeWidth={3} /><circle cx={0} cy={-300} r={36} fill={INK} stroke="#e8e0c8" strokeOpacity={0.4} strokeWidth={3} /><path d={`M40 -220 L${140 - p * 40} ${-300 + p * 40}`} stroke={INK} strokeWidth={16} /></g>
    </svg>
  );
};

const Wrestle: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0302" />
    <circle cx={540} cy={900} r={480} fill={FIRE} opacity={0.12} />
    <g transform={`translate(620 1200) scale(1.0) rotate(${Math.sin(f / 3) * 6})`}><Cerberus f={f * 1.5} snarl /></g>
    <g transform={`translate(${300 + Math.sin(f / 3) * 14} 1250)`}>
      <path d="M-90 0 L-70 -320 Q0 -370 70 -320 L90 0 Z" fill="#1a1008" stroke="#c8a060" strokeOpacity={0.6} strokeWidth={4} />
      <circle cx={0} cy={-370} r={46} fill="#1a1008" stroke="#c8a060" strokeOpacity={0.6} strokeWidth={4} />
      <path d="M-60 -400 Q0 -460 60 -400 L50 -360 L-50 -360 Z" fill="#c8902a" />
      <path d={`M60 -280 L${220 + Math.sin(f / 2) * 20} ${-420} M60 -220 L${240 + Math.sin(f / 2 + 1) * 20} -340`} stroke="#1a1008" strokeWidth={34} strokeLinecap="round" />
    </g>
    {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={420 + random(`wr${i}`) * 300} cy={760 + random(`ws${i}`) * 300} r={6} fill={BLOOD} opacity={0.6} />)}
  </svg>
);

const Daylight: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#e8e0c0" bottom="#a89870" id="cb2" />
    <circle cx={800} cy={360} r={150} fill="#fff8e0" />
    <path d="M0 1200 L1080 1200 L1080 1920 L0 1920 Z" fill="#6a5a3a" />
    <path d="M100 1200 Q300 1000 500 1200 Z" fill="#000" />
    <g transform={`translate(600 1180) scale(0.9) rotate(${Math.sin(f / 4) * 4})`}><Cerberus f={f * 1.5} snarl eye="#ffffff" /></g>
    {Array.from({ length: 14 }).map((_, i) => <circle key={i} cx={260 + random(`dl${i}`) * 260} cy={950 + ((f * 6 + i * 40) % 300)} r={8 + random(`dm${i}`) * 8} fill="#e8f0e0" opacity={0.85} />)}
  </svg>
);

const Aconite: React.FC<ShotProps> = ({ f, dur }) => {
  const g = clamp(f / (dur * 0.7));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#06040a" />
      <path d="M0 1250 L1080 1250 L1080 1920 L0 1920 Z" fill="#1a1410" />
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 100 + i * 110, h = (300 + (i % 3) * 120) * g;
        return (
          <g key={i}>
            <line x1={x} y1={1250} x2={x + Math.sin(f / 20 + i) * 10} y2={1250 - h} stroke="#2a5a2a" strokeWidth={8} />
            {Array.from({ length: 5 }).map((_, k) => k / 5 < g ? <path key={k} d={`M${x} ${1250 - h + k * 50} q-22 -10 -26 -36 q18 6 26 22 q8 -16 26 -22 q-4 26 -26 36 Z`} fill="#6a3ab8" stroke="#c8a0ff" strokeOpacity={0.5} strokeWidth={2} /> : null)}
          </g>
        );
      })}
      <text x={540} y={1470} textAnchor="middle" fontFamily="Fell" fontSize={52} fill="#c8a0ff" opacity={clamp((f - 30) / 10)}>Aconitum · Wolfsbane</text>
    </svg>
  );
};

const CerEyes: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#020101" />
    {[[300, 760], [540, 700], [780, 760]].map(([x, y], i) => {
      const o = clamp((f - 10 - i * 6) / 10);
      return <g key={i}><ellipse cx={x - 50} cy={y} rx={30} ry={14 * o + 1} fill={BLOOD} /><ellipse cx={x + 50} cy={y} rx={30} ry={14 * o + 1} fill={BLOOD} /><circle cx={x} cy={y} r={160} fill={BLOOD} opacity={0.05 * o} /></g>;
    })}
    {Array.from({ length: 20 }).map((_, i) => <circle key={i} cx={random(`ce${i}`) * W} cy={1400 - ((f * 3 + i * 60) % 900)} r={3} fill={FIRE} opacity={0.5} />)}
  </svg>
);

export const SHOTS19: Record<string, React.FC<ShotProps>> = {
  gates: Gates, parents: Parents, heads: Heads, styx: Styx, devour: Devour, orpheus: Orpheus,
  honeycake: HoneyCake, wrestle: Wrestle, daylight: Daylight, aconite: Aconite, cereyes: CerEyes,
};
// keep Wolf import used for tree-shaking safety
export const _w = Wolf;
