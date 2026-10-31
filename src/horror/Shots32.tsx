import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #32 — Manticore */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BONE = "#ddd5c0", GOLD = "#e0b040", RED = "#6a1a10";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const Tail: React.FC<{ f: number; raise?: number }> = ({ f, raise = 1 }) => {
  const segs = 9;
  const pts = Array.from({ length: segs }).map((_, i) => {
    const t = i / (segs - 1);
    const a = -0.2 - t * 2.6 * raise + Math.sin(f / 9 + t * 2) * 0.12;
    return a;
  });
  let x = 0, y = 0; const P: [number, number][] = [];
  pts.forEach((a, i) => { x += Math.cos(a) * 52; y += Math.sin(a) * 52; P.push([x, y]); });
  const [lx, ly] = P[P.length - 1];
  return (
    <g>
      {P.map(([px, py], i) => <ellipse key={i} cx={px} cy={py} rx={34 - i * 2} ry={26 - i * 1.5} fill="#3a1008" stroke="#c86a3a" strokeOpacity={0.6} strokeWidth={4} />)}
      {P.slice(3).map(([px, py], i) => <path key={i} d={`M${px} ${py - 20} l-10 -40 l20 0 Z`} fill={BONE} />)}
      <g transform={`translate(${lx} ${ly}) rotate(${pts[pts.length - 1] * 57 + 90})`}>
        <ellipse rx={30} ry={40} fill="#3a1008" />
        <path d="M0 30 Q30 80 -10 120 Q10 80 -10 40 Z" fill={BONE} />
        <circle cx={-10} cy={120} r={6} fill="#9aff3a" />
      </g>
    </g>
  );
};

export const ManticoreFig: React.FC<{ f: number; s?: number; fill?: string; eye?: string; walk?: boolean; jaw?: number; raise?: number }> = ({ f, s = 1, fill = RED, eye = "#ffcf3a", walk, jaw = 0, raise = 1 }) => {
  const st = { stroke: "#c86a3a", strokeOpacity: 0.5, strokeWidth: 4 } as const;
  const w = walk ? Math.sin(f / 5) * 18 : 0;
  return (
    <g transform={`scale(${s})`}>
      <g transform="translate(260 -60)"><Tail f={f} raise={raise} /></g>
      {[[-150, w], [-80, -w], [140, -w], [210, w]].map(([x, o], i) => <path key={i} d={`M${x} 0 L${x - 10 + o} 150 L${x + 30 + o} 150 L${x + 34} 0 Z`} fill={fill} {...st} />)}
      {[[-150, w], [-80, -w]].map(([x, o], i) => <path key={i} d={`M${x - 14 + o} 150 l-10 14 M${x + o} 150 l-2 16 M${x + 14 + o} 150 l4 14`} stroke={BONE} strokeWidth={5} />)}
      <ellipse cx={40} cy={-30} rx={250} ry={100} fill={fill} {...st} />
      <g transform="translate(-200 -100)">
        {Array.from({ length: 20 }).map((_, i) => { const a = (i / 20) * Math.PI * 2; const r = 150 + random(`mm${i}`) * 40; return <path key={i} d={`M${Math.cos(a) * 60} ${Math.sin(a) * 60} L${Math.cos(a + 0.12) * r} ${Math.sin(a + 0.12) * r} L${Math.cos(a + 0.3) * 80} ${Math.sin(a + 0.3) * 80} Z`} fill="#3a0c06" />; })}
        <circle r={120} fill="#3a0c06" />
        <path d="M-80 -60 C-90 -110 -40 -130 0 -130 C40 -130 90 -110 80 -60 C90 20 60 100 0 120 C-60 100 -90 20 -80 -60 Z" fill="#c8987a" {...st} />
        <path d="M-60 -50 L-20 -36 M60 -50 L20 -36" stroke="#3a1a0a" strokeWidth={8} />
        <ellipse cx={-34} cy={-24} rx={14} ry={9} fill="#fff" /><ellipse cx={34} cy={-24} rx={14} ry={9} fill="#fff" />
        <circle cx={-34} cy={-24} r={6} fill={eye} /><circle cx={34} cy={-24} r={6} fill={eye} />
        <circle cx={-34} cy={-24} r={2.5} fill="#000" /><circle cx={34} cy={-24} r={2.5} fill="#000" />
        <path d="M0 -20 L-10 20 L10 20" stroke="#8a5a3a" strokeWidth={4} fill="none" />
        <path d={`M-60 40 Q0 ${30 - jaw * 10} 60 40 Q50 ${80 + jaw * 40} 0 ${90 + jaw * 50} Q-50 ${80 + jaw * 40} -60 40 Z`} fill="#200404" />
        {[0, 1, 2].map((r) => Array.from({ length: 9 - r }).map((_, i) => { const x = -48 + r * 6 + i * 12; const y = 42 + r * (10 + jaw * 14); return <path key={`${r}${i}`} d={`M${x} ${y} l5 12 l5 -12`} fill={BONE} />; }))}
        {Array.from({ length: 8 }).map((_, i) => { const x = -44 + i * 12; return <path key={i} d={`M${x} ${84 + jaw * 48} l5 -12 l5 12`} fill={BONE} />; })}
      </g>
    </g>
  );
};

const Jungle: React.FC<{ f: number; id: string; night?: boolean }> = ({ f, id, night = true }) => (
  <>
    <Sky top={night ? "#0e1a14" : "#3a4a2a"} bottom={night ? "#020604" : "#0e1a0a"} id={id} />
    {night && <Moon x={820} y={320} r={80} f={f} />}
    {Array.from({ length: 10 }).map((_, i) => <g key={i} transform={`translate(${i * 120 - 20} 1150)`}><path d={`M0 0 Q${10 + Math.sin(f / 30 + i) * 6} -300 0 ${-560 - (i % 3) * 80}`} stroke="#06100a" strokeWidth={26} fill="none" />{[0, 1, 2, 3].map((k) => <path key={k} d={`M0 ${-560 - (i % 3) * 80} q${(k - 1.5) * 90} ${-30 + k * 20} ${(k - 1.5) * 170} ${60 + k * 30}`} stroke="#06100a" strokeWidth={30} fill="none" strokeLinecap="round" />)}</g>)}
    <rect y={1150} width={W} height={H} fill="#040a06" />
  </>
);

const Hut: React.FC<{ x: number; s?: number; light?: boolean }> = ({ x, s = 1, light = true }) => (
  <g transform={`translate(${x} 1150) scale(${s})`}>
    <rect x={-100} y={-150} width={200} height={150} fill="#1a120a" /><path d="M-140 -150 L0 -270 L140 -150 Z" fill="#2a1e0e" />
    <rect x={-30} y={-100} width={60} height={100} fill={light ? "#ffb43a" : "#000"} opacity={light ? 0.6 : 1} />
  </g>
);

const MtVillage: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Jungle f={f} id="mt1" />
    <Hut x={260} /><Hut x={560} s={0.8} light={false} /><Hut x={840} s={0.9} />
    <g opacity={0.5 + Math.sin(f / 6) * 0.3}><ellipse cx={680} cy={1100} rx={10} ry={6} fill="#ffcf3a" /><ellipse cx={710} cy={1100} rx={10} ry={6} fill="#ffcf3a" /></g>
    <g transform="translate(560 1150)"><path d="M-14 0 L-10 -40 L10 -40 L14 0 Z" fill="#3a2a1a" opacity={0.7} /><ellipse cx={0} cy={-46} rx={20} ry={8} fill="#5a4a2a" /></g>
  </svg>
);

const MtName: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0e0806" />
    <circle cx={540} cy={760} r={440} fill={GOLD} opacity={0.06} />
    <rect x={160} y={460} width={760} height={560} fill="#c8a870" />
    <rect x={160} y={460} width={760} height={560} fill="#000" opacity={0.2} />
    {Array.from({ length: 7 }).map((_, i) => <g key={i}>{Array.from({ length: 10 }).map((_, k) => <path key={k} d={`M${220 + k * 66} ${520 + i * 66} l18 0 l-9 22 Z`} fill="#3a2a14" opacity={0.7} />)}</g>)}
    <text x={540} y={1100} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={84} fill={GOLD} opacity={clamp((f - 10) / 15)}>MARTIKHORA</text>
  </svg>
);

const Ctesias: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0c0806" />
    {[180, 900].map((x, i) => <g key={i}><rect x={x - 50} y={260} width={100} height={890} fill="#2a1e14" />{Array.from({ length: 8 }).map((_, k) => <path key={k} d={`M${x - 50} ${300 + k * 110} L${x + 50} ${300 + k * 110}`} stroke="#1a120a" strokeWidth={6} />)}<path d={`M${x - 80} 260 L${x + 80} 260 L${x + 60} 200 L${x - 60} 200 Z`} fill="#3a2a1a" /></g>)}
    <circle cx={540} cy={760} r={380} fill="#ffb43a" opacity={0.08} />
    <g transform="translate(400 1150)"><path d="M-60 0 L-50 -300 L50 -300 L60 0 Z" fill="#e8e0cc" opacity={0.85} /><circle cx={0} cy={-340} r={40} fill="#c8a088" /><path d="M-36 -320 Q0 -270 36 -320 L30 -300 Q0 -280 -30 -300 Z" fill="#6a5a4a" /><rect x={50} y={-260} width={100} height={70} fill="#c8a870" /></g>
    <g transform="translate(720 1150)"><path d="M-70 0 L-50 -280 L50 -280 L70 0 Z" fill="#3a1a3a" /><circle cx={0} cy={-320} r={40} fill="#8a6a4a" /><path d="M-40 -350 L-30 -400 L30 -400 L40 -350 Z" fill="#1a1a1a" /><path d="M-40 -220 L-140 -260" stroke="#3a1a3a" strokeWidth={24} strokeLinecap="round" /></g>
    <g transform="translate(560 600) scale(0.25)" opacity={0.3 + Math.sin(f / 6) * 0.15}><ManticoreFig f={f} /></g>
  </svg>
);

const MtReveal: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#080202" />
    <circle cx={540} cy={760} r={480} fill={BLOOD} opacity={0.1 + Math.sin(f / 4) * 0.03} />
    <g transform="translate(500 1040) scale(1.15)"><ManticoreFig f={f} jaw={Math.abs(Math.sin(f / 8))} /></g>
  </svg>
);

const Spikes: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Jungle f={f} id="mt2" night={false} />
    <g transform="translate(330 1100) scale(0.75)"><ManticoreFig f={f} raise={1.15} /></g>
    {Array.from({ length: 5 }).map((_, i) => { const t = ((f + i * 8) % 40) / 40; return <g key={i} transform={`translate(${520 + t * 420} ${560 + i * 30 + t * 300}) rotate(${30 + t * 10})`}><path d="M-40 0 L40 0 L30 -8 Z" fill={BONE} /><circle cx={40} r={4} fill="#9aff3a" /></g>; })}
    <g transform="translate(900 1150)">
      <ellipse cx={0} cy={-170} rx={130} ry={90} fill="#3a3a40" />
      {[-80, -30, 30, 80].map((x, i) => <rect key={i} x={x - 16} y={-110} width={32} height={110} fill="#3a3a40" />)}
      <path d="M-120 -180 Q-200 -120 -180 -40" stroke="#3a3a40" strokeWidth={26} fill="none" />
      <circle cx={-100} cy={-200} r={6} fill="#000" />
    </g>
  </svg>
);

const MtVoice: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Jungle f={f} id="mt3" />
    {Array.from({ length: 8 }).map((_, i) => { const t = ((f * 1.5 + i * 40) % 320) / 320; return <text key={i} x={800 - t * 500 + Math.sin(t * 12 + i) * 30} y={900 - t * 300} fontSize={60} fill="#ffcf3a" opacity={(1 - t) * 0.8}>♪</text>; })}
    <g transform={`translate(${200 + Math.min(f, 60) * 3} 1150)`}><path d="M-24 0 L-30 -220 L30 -220 L24 0 Z" fill="#2a2a24" /><circle cx={0} cy={-250} r={28} fill="#2a2a24" /><path d="M24 -200 L80 -150" stroke="#2a2a24" strokeWidth={16} strokeLinecap="round" /></g>
    <g opacity={0.5 + Math.sin(f / 5) * 0.3}><ellipse cx={860} cy={940} rx={12} ry={7} fill="#ffcf3a" /><ellipse cx={900} cy={940} rx={12} ry={7} fill="#ffcf3a" /></g>
  </svg>
);

const Devour: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#060202" />
      <circle cx={540} cy={760} r={460} fill={BLOOD} opacity={0.12} />
      <g transform="translate(740 1200) scale(2.6)"><ManticoreFig f={f} jaw={0.6 + Math.sin(f / 2) * 0.4} raise={0.6} /></g>
      {t < 0.6 && <g transform={`translate(${200 + t * 300} ${700 + t * 300}) rotate(${t * 90}) scale(${1 - t})`}><path d="M-20 0 L-24 -150 L24 -150 L20 0 Z" fill="#3a3a44" /><circle cx={0} cy={-180} r={24} fill="#3a3a44" /></g>}
    </svg>
  );
};

const Bestiary: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0e0a06" />
    <rect x={80} y={380} width={920} height={760} fill="#d8c8a0" />
    <path d="M540 380 L540 1140" stroke="#8a7a5a" strokeWidth={6} />
    <rect x={80} y={380} width={920} height={760} fill="#000" opacity={0.15} />
    <g transform="translate(310 760) scale(0.32)"><ManticoreFig f={0} fill="#8a2a1a" /></g>
    <rect x={130} y={430} width={360} height={30} fill="#8a1a10" opacity={0.6} />
    {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={130} y={900 + i * 30} width={360 - (i % 2) * 60} height={10} fill="#3a2a1a" opacity={0.6} />)}
    <g transform="translate(780 700)">
      <circle r={70} fill="#c89a3a" opacity={0.7} /><ellipse cx={60} cy={60} rx={120} ry={50} fill="#c89a3a" opacity={0.7} />
      <g transform="translate(0 260)"><ellipse rx={120} ry={70} fill="#7a7a80" opacity={0.7} /><path d="M-110 -10 Q-170 40 -150 100" stroke="#7a7a80" strokeWidth={20} fill="none" opacity={0.7} /></g>
    </g>
    {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={590} y={430 + i * 26} width={360 - (i % 2) * 60} height={10} fill="#3a2a1a" opacity={0.6} />)}
  </svg>
);

const TigerFig: React.FC<{ f: number; s?: number; eye?: string }> = ({ f, s = 1, eye = "#ffcf3a" }) => (
  <g transform={`scale(${s})`}>
    <path d={`M240 -40 C320 -60 360 ${-20 + Math.sin(f / 8) * 20} 380 40`} stroke="#c8641a" strokeWidth={24} fill="none" strokeLinecap="round" />
    {[-150, -80, 140, 210].map((x, i) => <path key={i} d={`M${x} 0 L${x - 6} 140 L${x + 30} 140 L${x + 34} 0 Z`} fill="#c8641a" />)}
    <ellipse cx={40} cy={-30} rx={250} ry={90} fill="#c8641a" />
    {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M${-100 + i * 40} -110 q14 40 -4 80`} stroke="#1a0a04" strokeWidth={12} fill="none" />)}
    <g transform="translate(-220 -70)">
      <circle r={90} fill="#c8641a" />
      <path d="M-60 -70 L-40 -110 L-20 -80 M60 -70 L40 -110 L20 -80" fill="#c8641a" stroke="#c8641a" strokeWidth={10} />
      <path d="M-40 30 Q0 70 40 30 Q0 50 -40 30 Z" fill="#e8e0cc" />
      {[-50, -20, 20, 50].map((x, i) => <path key={i} d={`M${x} -70 q${x > 0 ? 10 : -10} 20 0 40`} stroke="#1a0a04" strokeWidth={8} fill="none" />)}
      <ellipse cx={-30} cy={-10} rx={12} ry={8} fill={eye} /><ellipse cx={30} cy={-10} rx={12} ry={8} fill={eye} />
      <ellipse cx={-30} cy={-10} rx={3} ry={7} fill="#000" /><ellipse cx={30} cy={-10} rx={3} ry={7} fill="#000" />
      <path d="M-10 20 L10 20 L0 32 Z" fill="#3a1a1a" />
    </g>
  </g>
);

const Tiger: React.FC<ShotProps> = ({ f, dur }) => {
  const m = clamp((f - dur * 0.3) / (dur * 0.4));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0806" />
      <g transform="translate(560 960) scale(1.15)" opacity={1 - m}><ManticoreFig f={f} /></g>
      <g transform="translate(560 960) scale(1.15)" opacity={m}><TigerFig f={f} /></g>
    </svg>
  );
};

const Champawat: React.FC<ShotProps> = ({ f, dur }) => {
  const n = Math.floor(clamp(f / (dur * 0.8)) * 436);
  return (
    <svg width={W} height={H}>
      <Jungle f={f} id="mt4" />
      <Hut x={300} light={false} /><Hut x={780} s={0.9} light={false} />
      <text x={540} y={560} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={200} fill={BLOOD}>{n}</text>
      <text x={540} y={640} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={40} fill={BONE} opacity={0.8}>VICTIMS</text>
      <g transform={`translate(${1200 - f * 3} 1140) scale(0.45)`}><TigerFig f={f} eye={BLOOD} /></g>
    </svg>
  );
};

const MtEyes: React.FC<ShotProps> = ({ f }) => {
  const o = clamp((f - 10) / 15);
  return (
    <svg width={W} height={H}>
      <Jungle f={f} id="mt5" />
      <rect width={W} height={H} fill="#000" opacity={0.5} />
      <g opacity={o} transform="translate(540 820) scale(1.6)">
        <ellipse cx={-34} cy={0} rx={18} ry={11} fill="#ffcf3a" /><ellipse cx={34} cy={0} rx={18} ry={11} fill="#ffcf3a" />
        <ellipse cx={-34} cy={0} rx={4} ry={10} fill="#000" /><ellipse cx={34} cy={0} rx={4} ry={10} fill="#000" />
        <path d="M-60 60 Q0 40 60 60 Q0 90 -60 60 Z" fill="#200404" opacity={0.8} />
        {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M${-48 + i * 12} 58 l5 12 l5 -12`} fill={BONE} />)}
      </g>
    </svg>
  );
};

export const SHOTS32: Record<string, React.FC<ShotProps>> = {
  mtvillage: MtVillage, mtname: MtName, ctesias: Ctesias, mtreveal: MtReveal, spikes: Spikes, mtvoice: MtVoice,
  mtdevour: Devour, bestiary: Bestiary, tiger: Tiger, champawat: Champawat, mteyes: MtEyes,
};
