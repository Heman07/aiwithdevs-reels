import React from "react";

// All visuals: 600x600 viewBox, gold-on-dark folk style. `f` = frames since scene start.
const GOLD = "#e0ac4a";
const GOLD_D = "#a8742a";
const RED = "#c2452d";
const CREAM = "#f4e4c1";
const TEAL = "#3f6f6a";

const Sun: React.FC<{ f: number }> = ({ f }) => {
  const rays = Array.from({ length: 24 });
  return (
    <g transform="translate(300 300)">
      <g transform={`rotate(${f * 0.25})`}>
        {rays.map((_, i) => (
          <path key={i} d="M0 -270 L14 -200 L-14 -200 Z" fill={i % 2 ? GOLD : GOLD_D} transform={`rotate(${(i * 360) / 24})`} />
        ))}
      </g>
      <g transform={`rotate(${-f * 0.4})`}>
        {Array.from({ length: 16 }).map((_, i) => (
          <ellipse key={i} cx={0} cy={-150} rx={18} ry={42} fill="none" stroke={GOLD} strokeWidth={4} transform={`rotate(${(i * 360) / 16})`} />
        ))}
      </g>
      <circle r={115} fill={RED} stroke={GOLD} strokeWidth={8} />
      <circle r={90} fill="none" stroke={GOLD} strokeWidth={3} strokeDasharray="6 10" />
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={i} d="M0 -70 Q22 -35 0 0 Q-22 -35 0 -70" fill={GOLD} transform={`rotate(${i * 45})`} />
      ))}
      <circle r={16} fill={CREAM} />
    </g>
  );
};

const Palace: React.FC<{ f: number }> = ({ f }) => {
  const towers = [
    { x: 80, w: 70, h: 260 }, { x: 160, w: 90, h: 340 }, { x: 255, w: 110, h: 430 },
    { x: 370, w: 90, h: 330 }, { x: 465, w: 70, h: 250 },
  ];
  return (
    <g>
      {towers.map((t, i) => {
        const rise = Math.min(1, Math.max(0, (f - i * 4) / 20));
        const h = t.h * (0.6 + 0.4 * rise);
        const base = 540;
        const top = base - h;
        return (
          <g key={i} opacity={0.4 + 0.6 * rise}>
            <rect x={t.x} y={top + t.w * 0.6} width={t.w} height={h - t.w * 0.6} fill={i === 2 ? GOLD : GOLD_D} stroke={GOLD} strokeWidth={3} />
            <path d={`M${t.x - 6} ${top + t.w * 0.6} Q${t.x + t.w / 2} ${top - t.w * 0.2} ${t.x + t.w + 6} ${top + t.w * 0.6} Z`} fill={GOLD} />
            <line x1={t.x + t.w / 2} y1={top + 4} x2={t.x + t.w / 2} y2={top - 40} stroke={GOLD} strokeWidth={4} />
            <path d={`M${t.x + t.w / 2} ${top - 40} l26 8 l-26 8 Z`} fill={RED} />
            {Array.from({ length: Math.floor(h / 70) }).map((_, j) => (
              <path key={j} d={`M${t.x + t.w / 2 - 12} ${top + t.w * 0.6 + 40 + j * 62} v-14 q12 -16 24 0 v14 Z`} fill="#2a1d12" />
            ))}
          </g>
        );
      })}
      <rect x={40} y={540} width={520} height={14} fill={GOLD} />
    </g>
  );
};

const Crown: React.FC<{ f: number }> = ({ f }) => {
  const bob = Math.sin(f / 12) * 8;
  return (
    <g transform={`translate(300 ${320 + bob})`}>
      <path d="M-200 80 L-220 -90 L-120 0 L-60 -150 L0 -30 L60 -150 L120 0 L220 -90 L200 80 Z" fill={GOLD} stroke={GOLD_D} strokeWidth={6} />
      <rect x={-205} y={70} width={410} height={50} rx={10} fill={GOLD_D} stroke={GOLD} strokeWidth={5} />
      {[-150, -75, 0, 75, 150].map((x, i) => (
        <circle key={i} cx={x} cy={95} r={14} fill={i % 2 ? TEAL : RED} stroke={CREAM} strokeWidth={3} />
      ))}
      {[-220, -60, 60, 220].map((x, i) => (
        <circle key={i} cx={x} cy={i === 0 || i === 3 ? -100 : -160} r={16} fill={RED} stroke={GOLD} strokeWidth={4} />
      ))}
      <circle cx={0} cy={-45} r={22} fill={TEAL} stroke={CREAM} strokeWidth={4} />
    </g>
  );
};

const Vimana: React.FC<{ f: number }> = ({ f }) => {
  const bob = Math.sin(f / 10) * 14;
  const tilt = Math.sin(f / 17) * 2;
  return (
    <g transform={`translate(300 ${330 + bob}) rotate(${tilt})`}>
      {/* clouds */}
      <g opacity={0.8} transform={`translate(${-(f * 1.5) % 120} 150)`}>
        {[-280, -100, 80, 260].map((x, i) => (
          <path key={i} d={`M${x} 0 q20 -40 55 -20 q25 -35 60 -5 q35 -10 40 25 Z`} fill={TEAL} stroke={CREAM} strokeWidth={3} />
        ))}
      </g>
      <path d="M-230 40 Q-250 -10 -270 -30 L-200 30 L200 30 L270 -30 Q250 -10 230 40 Q0 110 -230 40 Z" fill={GOLD} stroke={GOLD_D} strokeWidth={5} />
      {[-150, -50, 50, 150].map((x, i) => (
        <circle key={i} cx={x} cy={58} r={16} fill={RED} stroke={GOLD} strokeWidth={4} />
      ))}
      <rect x={-170} y={-150} width={10} height={180} fill={GOLD_D} />
      <rect x={160} y={-150} width={10} height={180} fill={GOLD_D} />
      <path d="M-200 -150 L200 -150 L170 -185 L-170 -185 Z" fill={RED} stroke={GOLD} strokeWidth={4} />
      <path d="M-110 -185 Q0 -330 110 -185 Z" fill={GOLD} stroke={GOLD_D} strokeWidth={4} />
      <line x1={0} y1={-300} x2={0} y2={-345} stroke={GOLD} strokeWidth={5} />
      <path d="M0 -345 l34 10 l-34 10 Z" fill={RED} />
      {/* wings */}
      <g transform={`translate(-60 -10) rotate(${-10 + Math.sin(f / 5) * 6})`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M0 0 L-${150 - i * 10} -${30 + i * 18} L-${130 - i * 12} -${10 + i * 14} Z`} fill={CREAM} stroke={GOLD_D} strokeWidth={2} />
        ))}
      </g>
    </g>
  );
};

const Lotus: React.FC<{ f: number }> = ({ f }) => {
  const open = Math.min(1, f / 30);
  return (
    <g transform="translate(300 380)">
      {[-1, 1].map((s) =>
        [0, 1, 2].map((i) => (
          <path key={`${s}${i}`} d="M0 0 Q40 -110 0 -230 Q-40 -110 0 0" fill={i === 0 ? GOLD : i === 1 ? RED : GOLD_D} stroke={CREAM} strokeWidth={3}
            transform={`rotate(${s * (20 + i * 25) * open})`} />
        ))
      )}
      <path d="M0 0 Q48 -120 0 -250 Q-48 -120 0 0" fill={RED} stroke={GOLD} strokeWidth={4} />
      <path d="M-260 30 Q0 -20 260 30 Q0 80 -260 30 Z" fill={TEAL} stroke={CREAM} strokeWidth={3} />
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={i} cx={-200 + i * 80} cy={110 + Math.sin(f / 9 + i) * 6} r={5} fill={GOLD} opacity={0.7} />
      ))}
    </g>
  );
};

const Flame: React.FC<{ f: number }> = ({ f }) => {
  const flames = [-130, -65, 0, 65, 130];
  return (
    <g transform="translate(300 470)">
      {flames.map((x, i) => {
        const sy = 1 + Math.sin(f / 3 + i * 1.7) * 0.12;
        const h = i === 2 ? 340 : i % 2 ? 250 : 190;
        return (
          <g key={i} transform={`translate(${x} 0) scale(1 ${sy})`}>
            <path d={`M-48 0 Q-60 -${h * 0.5} 0 -${h} Q60 -${h * 0.5} 48 0 Z`} fill={RED} />
            <path d={`M-28 0 Q-34 -${h * 0.4} 0 -${h * 0.7} Q34 -${h * 0.4} 28 0 Z`} fill={GOLD} />
          </g>
        );
      })}
      <rect x={-220} y={0} width={440} height={36} rx={8} fill={GOLD_D} stroke={GOLD} strokeWidth={4} />
      {Array.from({ length: 10 }).map((_, i) => {
        const y = -((f * 4 + i * 47) % 420);
        return <circle key={i} cx={-180 + ((i * 97) % 360) + Math.sin(f / 8 + i) * 12} cy={y} r={4} fill={GOLD} opacity={1 + y / 420} />;
      })}
    </g>
  );
};

const Swords: React.FC<{ f: number }> = ({ f }) => {
  const clash = Math.min(1, f / 14);
  const a = 60 - 25 * clash;
  const shake = f > 14 && f < 22 ? Math.sin(f * 3) * 6 : 0;
  const sword = (
    <g>
      <path d="M-12 -260 L0 -300 L12 -260 L12 60 L-12 60 Z" fill={CREAM} stroke={GOLD_D} strokeWidth={3} />
      <rect x={-60} y={60} width={120} height={20} rx={8} fill={GOLD} />
      <rect x={-12} y={80} width={24} height={80} fill={RED} />
      <circle cx={0} cy={172} r={16} fill={GOLD} />
    </g>
  );
  return (
    <g transform={`translate(${300 + shake} 330)`}>
      <g transform={`rotate(${-a})`}>{sword}</g>
      <g transform={`rotate(${a})`}>{sword}</g>
      {f > 14 && (
        <g opacity={Math.max(0, 1 - (f - 14) / 20)}>
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={i} x1={0} y1={-150} x2={Math.cos(i * 0.63) * (60 + (f - 14) * 6)} y2={-150 + Math.sin(i * 0.63) * (60 + (f - 14) * 6)} stroke={GOLD} strokeWidth={5} />
          ))}
        </g>
      )}
    </g>
  );
};

const Moon: React.FC<{ f: number }> = ({ f }) => (
  <g>
    {Array.from({ length: 18 }).map((_, i) => {
      const x = (i * 137) % 560 + 20, y = (i * 89) % 380 + 20;
      return <path key={i} d={`M${x} ${y - 9} L${x + 3} ${y} L${x} ${y + 9} L${x - 3} ${y} Z`} fill={CREAM} opacity={0.4 + 0.5 * Math.abs(Math.sin(f / 15 + i))} />;
    })}
    <g transform="translate(300 260)">
      <circle r={150} fill={GOLD} opacity={0.12} />
      <path d="M-40 -120 A125 125 0 1 0 90 90 A100 100 0 1 1 -40 -120 Z" fill={CREAM} stroke={GOLD} strokeWidth={5} />
    </g>
    <g opacity={0.85} transform={`translate(${-(f * 0.8) % 200} 470)`}>
      {[-200, 0, 200, 400, 600].map((x, i) => (
        <path key={i} d={`M${x} 0 q25 -45 65 -22 q30 -38 70 -6 q40 -12 46 28 Z`} fill={TEAL} stroke={CREAM} strokeWidth={3} />
      ))}
    </g>
  </g>
);

const Mountain: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <path d="M-20 560 L150 250 L230 360 L320 120 L420 300 L480 230 L620 560 Z" fill="#5a6f78" stroke={CREAM} strokeWidth={4} />
    <path d="M320 120 L280 200 L300 190 L320 215 L345 185 L362 200 Z" fill={CREAM} />
    <path d="M150 250 L125 296 L150 285 L168 300 Z" fill={CREAM} />
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M${60 + i * 170} ${470 - i * 25} q30 -12 60 0 q30 12 60 0`} stroke={CREAM} strokeWidth={3} fill="none" opacity={0.5} />
    ))}
    <g opacity={0.8} transform={`translate(${-(f * 1.2) % 240} 140)`}>
      {[0, 240, 480, 720].map((x, i) => (
        <path key={i} d={`M${x} 0 q20 -40 55 -20 q25 -35 60 -5 q35 -10 40 25 Z`} fill={TEAL} stroke={CREAM} strokeWidth={3} />
      ))}
    </g>
    <circle cx={480} cy={110} r={40} fill={GOLD} opacity={0.9} />
  </g>
);

const Waves: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <circle cx={300} cy={220} r={110} fill={RED} opacity={0.85} />
    <circle cx={300} cy={220} r={140} fill="none" stroke={GOLD} strokeWidth={3} strokeDasharray="8 12" />
    {[0, 1, 2, 3, 4].map((row) => (
      <g key={row} transform={`translate(${((f * (1 + row * 0.4)) % 120) - 120 + (row % 2) * 60} ${320 + row * 55})`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d={`M${i * 120} 40 q30 -50 60 -10 q-20 -10 -25 10 q30 -10 50 0 q20 10 35 0`} fill={row % 2 ? TEAL : "#2f5a5a"} stroke={CREAM} strokeWidth={2.5} />
        ))}
      </g>
    ))}
  </g>
);

const MAP: Record<string, React.FC<{ f: number }>> = {
  sun: Sun, palace: Palace, crown: Crown, vimana: Vimana, lotus: Lotus, flame: Flame, swords: Swords,
  moon: Moon, mountain: Mountain, waves: Waves,
};

export const Visual: React.FC<{ name: string; f: number }> = ({ name, f }) => {
  if (name === "none") return null;
  const C = MAP[name] ?? Sun;
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%">
      <C f={f} />
    </svg>
  );
};
