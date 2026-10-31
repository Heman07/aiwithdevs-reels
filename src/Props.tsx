import React from "react";

/** Story props placed on the 1080x1920 stage. x,y are 0..1 of frame. `f` = frames since scene start. */
export type StageProp = { type: string; x?: number; y?: number; scale?: number; delay?: number; behind?: boolean };

const INK = "#2a1a10", GOLD = "#e0ac4a", GOLD_D = "#a8742a", RED = "#c2452d", CREAM = "#f4e4c1", TEAL = "#3f6f6a";

const clamp = (v: number) => Math.max(0, Math.min(1, v));

const shapes: Record<string, (f: number) => React.ReactNode> = {
  arrows: (f) => (
    <g>
      {[0, 1, 2].map((i) => {
        const p = clamp((f - i * 8) / 22);
        const x = -600 + p * 1400;
        return (
          <g key={i} transform={`translate(${x} ${-60 + i * 60})`} opacity={p > 0 && p < 1 ? 1 : 0}>
            <line x1={-160} y1={0} x2={60} y2={0} stroke={GOLD} strokeWidth={6} />
            <path d="M60 -14 L100 0 L60 14 Z" fill={CREAM} stroke={INK} strokeWidth={2} />
            <path d="M-160 0 l-20 -14 M-160 0 l-20 14 M-140 0 l-20 -14 M-140 0 l-20 14" stroke={RED} strokeWidth={4} />
            <line x1={-400} y1={0} x2={-170} y2={0} stroke={GOLD} strokeWidth={3} opacity={0.35} />
          </g>
        );
      })}
    </g>
  ),
  chakra: (f) => (
    <g transform={`rotate(${f * 9})`}>
      <circle r={140} fill={GOLD} opacity={0.15} />
      <circle r={92} fill="none" stroke={GOLD} strokeWidth={12} />
      <circle r={26} fill={GOLD} stroke={INK} strokeWidth={3} />
      {Array.from({ length: 16 }).map((_, i) => <path key={i} d="M0 -92 L12 -122 L-12 -122 Z" fill={GOLD} stroke={GOLD_D} strokeWidth={2} transform={`rotate(${i * 22.5})`} />)}
      {Array.from({ length: 8 }).map((_, i) => <line key={i} x1={0} y1={-88} x2={0} y2={88} stroke={GOLD_D} strokeWidth={5} transform={`rotate(${i * 22.5})`} />)}
    </g>
  ),
  gold: (f) => (
    <g>
      {Array.from({ length: 26 }).map((_, i) => {
        const x = ((i * 137) % 700) - 350;
        const y = ((f * (5 + (i % 4)) + i * 70) % 900) - 450;
        return <ellipse key={i} cx={x} cy={y} rx={14 * Math.abs(Math.cos(f / 6 + i))} ry={14} fill={GOLD} stroke={GOLD_D} strokeWidth={2} />;
      })}
    </g>
  ),
  tablet: (f) => {
    const lines = Math.floor(f / 6);
    return (
      <g>
        <path d="M-170 -230 L170 -230 L190 230 L-190 230 Z" fill="#8a8a80" stroke={INK} strokeWidth={5} />
        <path d="M-150 -210 L150 -210 L168 210 L-168 210 Z" fill="#9a9a90" />
        {Array.from({ length: Math.min(lines, 12) }).map((_, i) => (
          <path key={i} d={`M-130 ${-180 + i * 32} ${Array.from({ length: 8 }).map((_, k) => `l16 ${k % 2 ? 8 : -8} l16 0`).join(" ")}`} stroke="#4a4a44" strokeWidth={4} fill="none" />
        ))}
      </g>
    );
  },
  scroll: (f) => {
    const open = clamp(f / 25);
    return (
      <g>
        <rect x={-220 * open} y={-130} width={440 * open} height={260} fill={CREAM} stroke={INK} strokeWidth={3} />
        {open > 0.5 && [0, 1, 2, 3, 4].map((i) => <line key={i} x1={-180 * open} y1={-90 + i * 45} x2={180 * open} y2={-90 + i * 45} stroke={GOLD_D} strokeWidth={4} />)}
        <rect x={-240 * open - 20} y={-150} width={30} height={300} rx={14} fill="#8a5a2a" stroke={INK} strokeWidth={3} />
        <rect x={240 * open - 10} y={-150} width={30} height={300} rx={14} fill="#8a5a2a" stroke={INK} strokeWidth={3} />
      </g>
    );
  },
  kailash: (f) => (
    <g transform={`translate(${Math.sin(f * 1.3) * 5} ${Math.sin(f * 0.9) * 4})`}>
      <path d="M-300 120 L-150 -120 L-80 -40 L0 -230 L90 -60 L160 -140 L300 120 Z" fill="#6a7f88" stroke={CREAM} strokeWidth={5} />
      <path d="M0 -230 L-40 -150 L-15 -160 L5 -135 L30 -165 L45 -150 Z" fill={CREAM} />
      <path d="M-300 120 Q0 160 300 120" stroke="#3a4a50" strokeWidth={14} fill="none" />
    </g>
  ),
  throne: () => (
    <g>
      <path d="M-170 220 L-170 -60 Q-170 -220 0 -250 Q170 -220 170 -60 L170 220 Z" fill={RED} stroke={GOLD} strokeWidth={10} />
      <path d="M-120 200 L-120 -40 Q-120 -170 0 -190 Q120 -170 120 -40 L120 200 Z" fill="#8a2a1c" stroke={GOLD} strokeWidth={4} />
      <rect x={-210} y={200} width={420} height={50} rx={10} fill={GOLD} stroke={INK} strokeWidth={4} />
      <circle cx={0} cy={-200} r={22} fill={GOLD} stroke={INK} strokeWidth={3} />
      {[-150, -75, 0, 75, 150].map((x, i) => <circle key={i} cx={x} cy={225} r={10} fill={i % 2 ? TEAL : RED} />)}
    </g>
  ),
  lotusbig: (f) => (
    <g transform={`scale(${1 + Math.sin(f / 15) * 0.02})`}>
      <circle r={200} fill={GOLD} opacity={0.12} />
      {[-75, -45, -15, 15, 45, 75].map((a, i) => <path key={i} d="M0 0 Q50 -110 0 -220 Q-50 -110 0 0" fill={i % 2 ? "#e88aa0" : "#f4b0c0"} stroke={INK} strokeWidth={3} transform={`rotate(${a})`} />)}
      <path d="M-200 10 Q0 -30 200 10 Q0 60 -200 10 Z" fill={TEAL} stroke={CREAM} strokeWidth={3} />
    </g>
  ),
  boon: (f) => (
    <g opacity={clamp(f / 15)}>
      {Array.from({ length: 9 }).map((_, i) => (
        <path key={i} d={`M${-40 + i * 10} -700 L${-220 + i * 55} 200 L${-180 + i * 55} 200 Z`} fill={GOLD} opacity={0.12 + 0.08 * Math.sin(f / 6 + i)} />
      ))}
      {Array.from({ length: 14 }).map((_, i) => {
        const y = ((f * 6 + i * 70) % 800) - 600;
        return <path key={i} d={`M${((i * 97) % 360) - 180} ${y} l5 12 l12 5 l-12 5 l-5 12 l-5 -12 l-12 -5 l12 -5 Z`} fill={CREAM} />;
      })}
    </g>
  ),
  splash: (f) => {
    const fall = clamp(f / 25);
    const sp = clamp((f - 25) / 20);
    return (
      <g>
        {fall < 1 && <g transform={`translate(${fall * 120} ${-400 + fall * 420}) rotate(${fall * 220})`}><rect x={-60} y={-80} width={120} height={160} fill="#8a8a80" stroke={INK} strokeWidth={4} /></g>}
        {sp > 0 && Array.from({ length: 12 }).map((_, i) => {
          const a = (Math.PI * (i + 0.5)) / 12;
          const r = 40 + sp * 200;
          return <circle key={i} cx={120 + Math.cos(a) * r * -1} cy={20 - Math.sin(a) * r * (1 - sp * 0.4)} r={14 * (1 - sp * 0.6)} fill="#a8e0d8" opacity={1 - sp} />;
        })}
        {sp > 0 && <ellipse cx={120} cy={30} rx={60 + sp * 180} ry={14 + sp * 30} fill="none" stroke={CREAM} strokeWidth={4} opacity={1 - sp} />}
      </g>
    );
  },
  shout: (f) => (
    <g>
      {[0, 1, 2, 3].map((i) => {
        const p = ((f / 18 + i / 4) % 1);
        return <circle key={i} r={60 + p * 380} fill="none" stroke={RED} strokeWidth={8 * (1 - p)} opacity={1 - p} />;
      })}
    </g>
  ),
  fire: (f) => (
    <g>
      <rect x={-110} y={0} width={220} height={40} rx={6} fill={GOLD_D} stroke={INK} strokeWidth={3} />
      {[-60, -20, 20, 60].map((x, i) => {
        const h = 110 + Math.sin(f / 3 + i * 2) * 25;
        return <g key={i}><path d={`M${x - 26} 0 Q${x - 30} ${-h * 0.5} ${x} ${-h} Q${x + 30} ${-h * 0.5} ${x + 26} 0 Z`} fill={RED} /><path d={`M${x - 14} 0 Q${x - 16} ${-h * 0.35} ${x} ${-h * 0.6} Q${x + 16} ${-h * 0.35} ${x + 14} 0 Z`} fill={GOLD} /></g>;
      })}
    </g>
  ),
  pushpak: (f) => {
    const x = -700 + ((f * 9) % 1600);
    return (
      <g transform={`translate(${x} ${Math.sin(f / 8) * 15}) scale(0.7)`}>
        <path d="M-230 40 Q-250 -10 -270 -30 L-200 30 L200 30 L270 -30 Q250 -10 230 40 Q0 110 -230 40 Z" fill={GOLD} stroke={GOLD_D} strokeWidth={5} />
        <path d="M-200 -150 L200 -150 L170 -185 L-170 -185 Z" fill={RED} stroke={GOLD} strokeWidth={4} />
        <rect x={-170} y={-150} width={10} height={180} fill={GOLD_D} /><rect x={160} y={-150} width={10} height={180} fill={GOLD_D} />
        <path d="M-110 -185 Q0 -330 110 -185 Z" fill={GOLD} stroke={GOLD_D} strokeWidth={4} />
      </g>
    );
  },
  crownfloat: (f) => (
    <g transform={`translate(0 ${Math.sin(f / 10) * 12}) scale(0.6)`}>
      <circle r={200} fill={GOLD} opacity={0.15} />
      <path d="M-200 80 L-220 -90 L-120 0 L-60 -150 L0 -30 L60 -150 L120 0 L220 -90 L200 80 Z" fill={GOLD} stroke={GOLD_D} strokeWidth={6} />
      <rect x={-205} y={70} width={410} height={50} rx={10} fill={GOLD_D} stroke={GOLD} strokeWidth={5} />
    </g>
  ),
  tongue: (f) => (
    <g opacity={clamp(f / 10)}>
      {[0, 1, 2].map((i) => <path key={i} d={`M0 0 q${30 + i * 20} -${20 + i * 15} ${60 + i * 40} 0`} stroke={GOLD} strokeWidth={4} fill="none" opacity={0.5 + 0.5 * Math.sin(f / 4 + i)} transform={`translate(0 ${-i * 22})`} />)}
      <text x={20} y={-80} fontFamily="Rozha" fontSize={70} fill={GOLD} opacity={clamp((f - 10) / 15)}>?!</text>
    </g>
  ),
};

Object.assign(shapes, {
  moonrise: (f: number) => {
    const rise = Math.min(1, f / 40);
    return (
      <g transform={`translate(0 ${(1 - rise) * 120})`}>
        <circle r={230} fill={CREAM} opacity={0.08} />
        <circle r={170} fill={CREAM} opacity={0.12} />
        <circle r={120} fill="#fbf1d6" stroke={GOLD} strokeWidth={4} />
        <circle cx={-35} cy={-25} r={18} fill="#e8dcbc" /><circle cx={30} cy={20} r={24} fill="#e8dcbc" /><circle cx={40} cy={-40} r={10} fill="#e8dcbc" />
      </g>
    );
  },
  fakemoon: (f: number) => {
    const flick = 0.8 + 0.2 * Math.sin(f / 2.5);
    return (
      <g>
        <rect x={-30} y={-40} width={60} height={420} fill="#2a1a10" />
        {[[-150, -120], [130, -150], [-60, -260], [70, -270], [0, -180], [-170, -10], [170, -40]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx={120} ry={80} fill="#1a3a22" stroke="#0e2414" strokeWidth={4} />
        ))}
        <g transform="translate(40 -120)">
          <circle r={110 * flick} fill={GOLD} opacity={0.25} />
          <circle r={64} fill="#f8e6a8" opacity={0.9 * flick} />
          <circle r={66} fill="none" stroke="#c8a060" strokeWidth={6} />
          {Array.from({ length: 9 }).map((_, i) => <line key={i} x1={-56 + i * 14} y1={-58} x2={-56 + i * 14} y2={58} stroke="#c8a060" strokeWidth={1.5} opacity={0.7} />)}
          {Array.from({ length: 9 }).map((_, i) => <line key={`h${i}`} x1={-58} y1={-56 + i * 14} x2={58} y2={-56 + i * 14} stroke="#c8a060" strokeWidth={1.5} opacity={0.7} />)}
        </g>
        <text x={150} y={-230} fontFamily="Rozha" fontSize={64} fill={RED} opacity={Math.min(1, Math.max(0, (f - 30) / 15))}>?</text>
      </g>
    );
  },
  thali: (f: number) => (
    <g>
      <ellipse cx={0} cy={0} rx={150} ry={42} fill={GOLD} stroke={GOLD_D} strokeWidth={5} />
      <ellipse cx={0} cy={-6} rx={126} ry={32} fill="#c8202f" opacity={0.85} />
      <path d="M-40 -10 Q-46 -80 -20 -90 L20 -90 Q46 -80 40 -10 Z" fill="#b8642a" stroke={INK} strokeWidth={3} />
      <path d="M-14 -90 L-26 -118 M14 -90 L26 -118" stroke="#b8642a" strokeWidth={7} />
      <path d="M-24 -50 Q0 -40 24 -50" stroke={GOLD} strokeWidth={4} fill="none" />
      {[-95, 85].map((x, i) => (
        <g key={i} transform={`translate(${x} -16)`}>
          <path d="M-22 -4 Q0 14 22 -4 Q14 -10 -14 -10 Z" fill="#c0652a" stroke={INK} strokeWidth={2} />
          <path d={`M0 -10 Q-6 ${-24 - Math.sin(f / 3 + i) * 4} 0 ${-40 - Math.sin(f / 3 + i) * 6} Q6 -24 0 -10`} fill={GOLD} />
          <circle cx={0} cy={-26} r={22} fill={GOLD} opacity={0.2} />
        </g>
      ))}
      {[-60, -30, 30, 60].map((x, i) => <circle key={i} cx={x} cy={8} r={6} fill={i % 2 ? CREAM : "#e88aa0"} />)}
    </g>
  ),
  crocodile: (f: number) => {
    const snap = Math.abs(Math.sin(f / 5)) * 18;
    return (
      <g transform={`translate(0 ${Math.sin(f / 9) * 6})`}>
        <path d="M-260 30 Q-200 -30 -60 -20 L120 -20 Q200 -16 250 -6 L250 4 Q190 2 120 6 L-60 30 Z" fill="#4a6a3a" stroke={INK} strokeWidth={4} />
        <path d={`M120 6 Q190 ${16 + snap} 250 ${20 + snap} L250 ${28 + snap} Q190 ${30 + snap} 110 26 Z`} fill="#4a6a3a" stroke={INK} strokeWidth={4} />
        {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${135 + i * 18} 4 l6 10 l6 -10`} fill={CREAM} />)}
        {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${-200 + i * 40} -24 l12 -16 l12 16`} fill="#3a5a2a" stroke={INK} strokeWidth={2} />)}
        <circle cx={100} cy={-28} r={10} fill="#f0d040" stroke={INK} strokeWidth={2} /><circle cx={102} cy={-28} r={4} fill={INK} />
        <path d="M-300 40 Q-200 20 -100 40 Q0 60 100 40 Q200 20 300 40" stroke="#a8e0d8" strokeWidth={6} fill="none" opacity={0.6} />
      </g>
    );
  },
  thread: (f: number) => {
    const p = Math.min(1, f / 40);
    return (
      <g>
        {Array.from({ length: Math.floor(p * 8) }).map((_, i) => (
          <ellipse key={i} cx={-160 + i * 50} cy={0} rx={24} ry={50} fill="none" stroke={CREAM} strokeWidth={4} opacity={0.9} />
        ))}
        <path d={`M-200 -80 Q-120 -140 ${-160 + p * 380} 0`} stroke={CREAM} strokeWidth={3} fill="none" />
      </g>
    );
  },
  diyas: (f: number) => (
    <g>
      {Array.from({ length: 9 }).map((_, i) => {
        const x = -440 + i * 110;
        const fl = Math.sin(f / 3 + i * 1.3);
        return (
          <g key={i} transform={`translate(${x} 0)`}>
            <circle cx={0} cy={-26} r={30} fill={GOLD} opacity={0.18} />
            <path d="M-26 -4 Q0 18 26 -4 Q18 -12 -18 -12 Z" fill="#c0652a" stroke={INK} strokeWidth={2} />
            <path d={`M0 -12 Q-7 ${-28 - fl * 4} 0 ${-46 - fl * 6} Q7 -28 0 -12`} fill={GOLD} />
            <path d="M0 -16 Q-3 -24 0 -32 Q3 -24 0 -16" fill={CREAM} />
          </g>
        );
      })}
    </g>
  ),
});

export const PropsLayer: React.FC<{ props: StageProp[]; f: number; behind: boolean }> = ({ props, f, behind }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", overflow: "visible" }}>
    {props.filter((p) => !!p.behind === behind).map((p, i) => {
      const draw = shapes[p.type];
      if (!draw) return null;
      const lf = f - (p.delay ?? 0);
      if (lf < 0) return null;
      const appear = clamp(lf / 10);
      return (
        <g key={i} transform={`translate(${(p.x ?? 0.5) * 1080} ${(p.y ?? 0.35) * 1920}) scale(${(p.scale ?? 1) * (0.85 + 0.15 * appear)})`} opacity={appear}>
          {draw(lf)}
        </g>
      );
    })}
  </svg>
);
