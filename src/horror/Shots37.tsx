import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #37 — Leviathan */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BONE = "#ddd5c0", SEA = "#04121a", FIRE = "#ff8a1a", SCALE = "#1a3a3a";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const serpentPath = (f: number, x0: number, y0: number, len: number, amp: number, ph = 0) => {
  let d = `M${x0} ${y0}`;
  for (let i = 1; i <= 20; i++) { const t = i / 20; d += ` L${x0 + t * len} ${y0 + Math.sin(t * 6 + f / 10 + ph) * amp}`; }
  return d;
};

export const LevHead: React.FC<{ f: number; s?: number; jaw?: number; fire?: number; eye?: string }> = ({ f, s = 1, jaw = 0.2, fire = 0, eye = "#ffcf3a" }) => (
  <g transform={`scale(${s})`}>
    <path d={`M0 0 C40 -80 160 -120 300 -100 L420 -60 L300 ${-40 + jaw * 10} C200 -30 80 -10 0 0 Z`} fill={SCALE} stroke="#4a8a8a" strokeOpacity={0.6} strokeWidth={4} />
    <g transform={`rotate(${jaw * 22} 20 0)`}><path d="M0 0 C80 20 200 30 300 10 L400 30 L290 50 C180 60 60 40 0 0 Z" fill="#14302e" stroke="#4a8a8a" strokeOpacity={0.6} strokeWidth={4} />
      {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M${80 + i * 30} ${16 + i * 1.4} l8 -24 l8 24`} fill={BONE} />)}</g>
    {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M${80 + i * 30} ${-34 - i * 1} l8 26 l8 -26`} fill={BONE} />)}
    {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${60 + i * 40} ${-80 - i * 3} l20 -60 l20 50`} fill="#0e2422" stroke="#4a8a8a" strokeOpacity={0.5} strokeWidth={3} />)}
    <ellipse cx={240} cy={-74} rx={22} ry={12} fill={eye} /><ellipse cx={240} cy={-74} rx={5} ry={11} fill="#000" />
    <circle cx={240} cy={-74} r={44} fill={eye} opacity={0.15} />
    <circle cx={390} cy={-62} r={6} fill="#000" />
    {fire > 0 && <g transform="translate(400 0)">{Array.from({ length: 7 }).map((_, i) => { const L = (300 + random(`lf${i}`) * 200) * fire; return <path key={i} d={`M0 0 Q${L * 0.5} ${-60 + i * 20 + Math.sin(f + i) * 14} ${L} ${-50 + i * 16} Q${L * 0.5} ${40 - i * 6} 0 0 Z`} fill={i % 3 === 0 ? "#ffcf3a" : i % 3 === 1 ? FIRE : "#c83a10"} opacity={0.85} />; })}</g>}
  </g>
);

const Ocean: React.FC<{ f: number; id: string; y?: number; storm?: boolean }> = ({ f, id, y = 860, storm }) => (
  <>
    <Sky top={storm ? "#14181e" : "#0e1a24"} bottom="#04080c" id={id} />
    {storm && Array.from({ length: 6 }).map((_, i) => <ellipse key={i} cx={((i * 240 + f * 3) % 1500) - 200} cy={200 + (i % 3) * 100} rx={300} ry={70} fill="#2a2e36" opacity={0.7} />)}
    <rect y={y} width={W} height={H} fill={SEA} />
    {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M0 ${y + 10 + i * 30} Q270 ${y + i * 30 + Math.sin(f / 6 + i) * (storm ? 30 : 10)} 540 ${y + 10 + i * 30} T1080 ${y + 10 + i * 30}`} stroke="#1a3a4a" strokeWidth={3} fill="none" />)}
  </>
);

const Bloop: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#020a10" />
    <rect x={80} y={380} width={920} height={500} fill="#041420" stroke="#1a4a5a" strokeWidth={4} />
    {Array.from({ length: 10 }).map((_, i) => <line key={i} x1={80} y1={380 + i * 50} x2={1000} y2={380 + i * 50} stroke="#0a2a3a" strokeWidth={2} />)}
    <path d={Array.from({ length: 92 }).map((_, i) => { const x = 80 + i * 10; const c = Math.abs(i - ((f * 1.5) % 92)); const a = c < 12 ? (12 - c) * 18 : 6; return `${i ? "L" : "M"}${x} ${630 + Math.sin(i * 1.7 + f) * a}`; }).join(" ")} stroke="#5aff9a" strokeWidth={4} fill="none" />
    <text x={540} y={350} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={40} fill="#5aff9a">HYDROPHONE · 1997</text>
    <g transform="translate(540 1080)" opacity={0.15 + Math.sin(f / 8) * 0.1}><ellipse rx={420} ry={60} fill="#1a3a3a" /></g>
  </svg>
);

const LvReveal: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Ocean f={f} id="lv1" storm y={1000} />
    {(f % 50) < 3 && <rect width={W} height={H} fill="#dfe6ff" opacity={0.2} />}
    {[[120, 1000], [420, 1020], [760, 990]].map(([x, y], i) => <path key={i} d={`M${x} ${y} C${x + 30} ${y - 140} ${x + 120} ${y - 160} ${x + 160} ${y}`} fill={SCALE} stroke="#4a8a8a" strokeOpacity={0.5} strokeWidth={4} />)}
    {[[180, 900], [480, 900], [820, 880]].map(([x, y], i) => <path key={i} d={`M${x} ${y} l14 -40 l14 40`} fill="#0e2422" />)}
    <g transform={`translate(${120 + Math.sin(f / 15) * 20} ${820 + Math.sin(f / 10) * 20}) rotate(-25) scale(1.3)`}><LevHead f={f} jaw={0.3 + Math.sin(f / 6) * 0.2} /></g>
    {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={random(`sp${i}`) * W} cy={980 - random(`sq${i}`) * 120 - ((f * 3 + i * 10) % 80)} r={4} fill="#cfe8ff" opacity={0.5} />)}
  </svg>
);

const Job: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0e0a06" />
    <rect x={120} y={300} width={840} height={820} fill="#d8c8a0" />
    <rect x={120} y={300} width={840} height={820} fill="#000" opacity={0.25} />
    {Array.from({ length: 14 }).map((_, i) => <rect key={i} x={180} y={360 + i * 50} width={700 - (i % 3) * 80} height={12} fill="#3a2a1a" opacity={0.5} />)}
    <g transform="translate(340 980) scale(0.9) rotate(-10)"><LevHead f={f} fire={0.7 + Math.sin(f / 4) * 0.2} /></g>
  </svg>
);

const Two: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#020a10" />
    <circle cx={540} cy={760} r={480} fill="#1a4a5a" opacity={0.1} />
    <path d={serpentPath(f, -100, 620, 820, 80)} stroke={SCALE} strokeWidth={70} fill="none" strokeLinecap="round" />
    <path d={serpentPath(f, -100, 960, 820, 80, Math.PI)} stroke="#2a2a3a" strokeWidth={60} fill="none" strokeLinecap="round" />
    <g transform={`translate(700 ${620 + Math.sin(6 + f / 10) * 80}) scale(0.4)`}><LevHead f={f} /></g>
    <g transform={`translate(700 ${960 + Math.sin(6 + f / 10 + Math.PI) * 80}) scale(0.36)`}><LevHead f={f} eye="#9ad8ff" /></g>
  </svg>
);

const LvKill: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp((f - dur * 0.3) / (dur * 0.3));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#020608" />
      <circle cx={540} cy={760} r={480} fill={BLOOD} opacity={0.06 + t * 0.1} />
      {t > 0 && t < 0.4 && <rect width={W} height={H} fill="#fff" opacity={(0.4 - t) * 0.8} />}
      <path d={serpentPath(f * (1 - t), -100, 900 + t * 300, 820, 80 * (1 - t), Math.PI)} stroke="#2a2a3a" strokeWidth={60} fill="none" strokeLinecap="round" opacity={1 - t * 0.6} />
      {t > 0.2 && Array.from({ length: 16 }).map((_, i) => <circle key={i} cx={random(`bl${i}`) * W} cy={900 + t * 300 + ((f * 3 + i * 40) % 300)} r={10 + random(`bm${i}`) * 20} fill={BLOOD} opacity={0.4} />)}
      <path d={serpentPath(f, -100, 520, 820, 60)} stroke={SCALE} strokeWidth={70} fill="none" strokeLinecap="round" />
      <g transform={`translate(700 ${520 + Math.sin(6 + f / 10) * 60}) scale(0.4)`}><LevHead f={f} jaw={0.6} /></g>
      {t > 0 && <path d="M540 0 L500 300 L560 320 L520 640" stroke="#fff" strokeWidth={8} fill="none" opacity={t < 0.5 ? 1 : 0} />}
    </svg>
  );
};

const Wrap: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#02040a" />
    {Array.from({ length: 70 }).map((_, i) => <circle key={i} cx={random(`ws${i}`) * W} cy={random(`wt${i}`) * H} r={1.5} fill="#fff" opacity={0.5} />)}
    <circle cx={540} cy={760} r={260} fill="#1a4a6a" />
    <path d="M360 640 Q440 600 480 680 Q520 760 460 800 Z M620 700 Q720 660 760 760 Q700 860 640 820 Z" fill="#2a5a3a" />
    <g transform={`translate(540 760) rotate(${f * 0.8})`}>
      <circle r={350} fill="none" stroke={SCALE} strokeWidth={70} />
      <circle r={350} fill="none" stroke="#4a8a8a" strokeWidth={74} strokeDasharray="6 30" opacity={0.6} />
      <g transform="translate(0 -350) rotate(-10) scale(0.45) translate(-200 30)"><LevHead f={f} jaw={0.9} /></g>
    </g>
  </svg>
);

const Boil: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Ocean f={f} id="lv2" y={760} />
    {Array.from({ length: 50 }).map((_, i) => { const x = random(`bo${i}`) * W; const r = 8 + random(`bp${i}`) * 20; const y = 1100 - ((f * (3 + random(`bq${i}`) * 4) + i * 37) % 340); return <circle key={i} cx={x} cy={y} r={r} fill="none" stroke="#cfe8ff" strokeWidth={3} opacity={0.5} />; })}
    <path d={`M-100 900 C200 ${860 + Math.sin(f / 8) * 30} 500 ${940 - Math.sin(f / 8) * 30} 1180 900`} stroke="#e8f4f8" strokeWidth={30} fill="none" opacity={0.4} />
    <path d={serpentPath(f, -100, 1060, 1300, 50)} stroke={SCALE} strokeWidth={90} fill="none" opacity={0.6} />
    {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={100 + i * 100} cy={720 - ((f * 2 + i * 30) % 300)} r={40} fill="#cfe8ff" opacity={0.06} />)}
  </svg>
);

const EndOfDays: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Ocean f={f} id="lv3" storm y={1000} />
    <path d="M540 0 L380 1000 L700 1000 Z" fill="#fff" opacity={0.08 + Math.sin(f / 5) * 0.04} />
    {(f % 30) < 4 && <path d="M560 0 L520 300 L580 320 L540 700" stroke="#fff" strokeWidth={10} fill="none" />}
    <g transform="translate(160 960) rotate(-30) scale(1.1)"><LevHead f={f} jaw={0.8} /></g>
    {[[180, 1000], [500, 1020], [820, 990]].map(([x, y], i) => <path key={i} d={`M${x} ${y} C${x + 30} ${y - 120} ${x + 120} ${y - 140} ${x + 160} ${y}`} fill={SCALE} />)}
  </svg>
);

const HellMouth: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0402" />
    <circle cx={540} cy={860} r={460} fill={FIRE} opacity={0.15 + Math.sin(f / 3) * 0.05} />
    <g transform="translate(540 820)">
      <path d="M-460 -200 C-400 -500 400 -500 460 -200 L300 -60 L-300 -60 Z" fill={SCALE} stroke="#4a8a8a" strokeWidth={6} />
      <path d="M-460 300 C-400 500 400 500 460 300 L300 180 L-300 180 Z" fill="#14302e" stroke="#4a8a8a" strokeWidth={6} />
      {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M${-300 + i * 52} -60 l20 80 l20 -80`} fill={BONE} />)}
      {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M${-300 + i * 52} 180 l20 -80 l20 80`} fill={BONE} />)}
      <rect x={-300} y={20} width={600} height={80} fill="#200404" />
      {Array.from({ length: 14 }).map((_, i) => <path key={i} d={`M${-280 + i * 40} 100 Q${-270 + i * 40 + Math.sin(f / 2 + i) * 10} ${10 - (i % 3) * 30} ${-260 + i * 40} 100 Z`} fill={i % 2 ? FIRE : "#ffcf3a"} opacity={0.8} />)}
      {[-1, 1].map((d) => <g key={d} transform={`translate(${d * 220} -330)`}><ellipse rx={50} ry={28} fill="#ffcf3a" /><ellipse rx={10} ry={26} fill="#000" /></g>)}
      {Array.from({ length: 5 }).map((_, i) => <g key={i} transform={`translate(${-200 + i * 100} ${60 + Math.sin(f / 4 + i) * 10})`} opacity={0.8}><circle cx={0} cy={-40} r={14} fill="#1a0a0a" /><path d="M-10 -26 L-14 20 L14 20 L10 -26 Z" fill="#1a0a0a" /><path d={`M-10 -20 L-30 ${-60 - Math.sin(f / 3 + i) * 10} M10 -20 L30 ${-60 - Math.sin(f / 3 + i) * 10}`} stroke="#1a0a0a" strokeWidth={6} /></g>)}
    </g>
  </svg>
);

const Livyatan: React.FC<ShotProps> = ({ f, dur }) => {
  const m = clamp((f - dur * 0.45) / 20);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#1a140c" />
      <path d="M0 1050 Q540 1000 1080 1050 V1920 H0 Z" fill="#6a5034" />
      <g transform="translate(540 820)" opacity={1 - m * 0.7}>
        <path d="M-420 60 C-400 -120 -100 -220 300 -160 C420 -140 460 -60 440 40 C300 100 -200 120 -420 60 Z" fill="#d8c8a0" stroke="#8a7a5a" strokeWidth={6} />
        <path d="M-300 -40 C-200 -140 100 -170 300 -100" stroke="#8a7a5a" strokeWidth={5} fill="none" />
        <circle cx={-260} cy={-30} r={40} fill="#3a2a1a" />
        {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M${-60 + i * 50} 50 l14 -90 l14 90 Z`} fill="#f4ecd8" stroke="#8a7a5a" strokeWidth={3} />)}
      </g>
      <g transform="translate(540 820)" opacity={m}>
        <path d="M-480 40 C-460 -160 -100 -260 380 -140 C460 -100 480 0 440 60 C200 160 -260 160 -480 40 Z" fill="#2a3440" />
        <path d="M-480 40 L-620 -60 L-580 40 L-620 140 Z" fill="#2a3440" />
        <circle cx={300} cy={-60} r={12} fill="#ffcf3a" />
        {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M${0 + i * 46} 70 l12 -50 l12 50 Z`} fill={BONE} />)}
      </g>
      <g opacity={1 - m}><path d="M780 1150 L1000 1150" stroke={BLOOD} strokeWidth={6} /><text x={890} y={1130} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={36} fill={BLOOD}>36 CM</text></g>
    </svg>
  );
};

const Deep: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <defs><linearGradient id="dpg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0a3a5a" /><stop offset="1" stopColor="#000" /></linearGradient></defs>
      <rect width={W} height={H} fill="url(#dpg)" />
      {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={random(`dp${i}`) * W} cy={(random(`dq${i}`) * H + f * 2) % H} r={2} fill="#cfe8ff" opacity={0.4} />)}
      <g transform={`translate(${540} ${400 + t * 60})`}><path d="M-40 0 L40 0 L30 30 L-30 30 Z" fill="#c8a040" /><circle cx={0} cy={-20} r={30} fill="#9ad8ff" opacity={0.6} /><path d="M-10 30 L-60 300 M10 30 L60 300" stroke="#fff" strokeWidth={30} opacity={0.08} /></g>
      <g transform={`translate(${1100 - t * 300} 1100)`} opacity={0.5}>
        <ellipse cx={0} cy={0} rx={22} ry={12} fill="#ffcf3a" opacity={0.6 + Math.sin(f / 5) * 0.3} />
        <path d="M-40 -60 C200 -120 600 -100 900 0 C600 100 200 120 -40 60 Z" fill="#000" opacity={0.6} />
      </g>
      <text x={540} y={820} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={140} fill="#9ad8ff" opacity={0.25}>5%</text>
    </svg>
  );
};

export const SHOTS37: Record<string, React.FC<ShotProps>> = {
  bloop: Bloop, lvreveal: LvReveal, job: Job, two: Two, lvkill: LvKill, wrap: Wrap,
  boil: Boil, endofdays: EndOfDays, hellmouth: HellMouth, livyatan: Livyatan, deep: Deep,
};
