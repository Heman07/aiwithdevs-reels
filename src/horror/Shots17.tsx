import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";
import { Statue, GorgonHead } from "./Shots12";

/* Creature #17 — Medusa */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", MARBLE = "#d8d2c4", GREEN = "#c8ff4a";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const Temple: React.FC<{ ruined?: boolean }> = ({ ruined }) => (
  <g>
    {[-360, -200, -40, 120, 280].map((x, i) => <rect key={i} x={540 + x} y={ruined && i % 2 ? 520 : 380} width={80} height={ruined && i % 2 ? 680 : 820} fill={MARBLE} opacity={0.75} stroke="#8a8270" strokeWidth={3} />)}
    {!ruined && <path d="M140 380 L540 200 L940 380 Z" fill={MARBLE} opacity={0.75} />}
    <rect x={120} y={1180} width={840} height={40} fill={MARBLE} opacity={0.75} />
  </g>
);

const Woman: React.FC<{ f: number; snakes?: number; fill?: string; eyes?: string }> = ({ f, snakes = 0, fill = INK, eyes }) => (
  <g>
    <path d="M-90 0 Q-80 -160 -40 -300 L40 -300 Q80 -160 90 0 Z" fill={fill} stroke="#e8e0c8" strokeOpacity={0.5} strokeWidth={3} />
    <circle cx={0} cy={-350} r={44} fill={fill} stroke="#e8e0c8" strokeOpacity={0.5} strokeWidth={3} />
    {snakes < 1 && <path d={`M-40 -370 C-100 -280 -80 -160 -120 ${-60 + Math.sin(f / 10) * 10} M40 -370 C100 -280 80 -160 120 ${-60 + Math.sin(f / 10 + 1) * 10}`} stroke={fill === INK ? "#1a140c" : fill} strokeWidth={26} fill="none" opacity={1 - snakes} />}
    {snakes > 0 && Array.from({ length: 10 }).map((_, i) => {
      const a = -Math.PI + (i / 9) * Math.PI;
      const L = 60 + snakes * 60;
      return <path key={i} d={`M${Math.cos(a) * 40} ${-350 + Math.sin(a) * 40} q${Math.cos(a + Math.sin(f / 5 + i)) * L} ${Math.sin(a) * L} ${Math.cos(a) * L * 1.4} ${Math.sin(a) * L * 1.4 - 10}`} stroke="#2a5a2a" strokeWidth={12} fill="none" strokeLinecap="round" opacity={snakes} />;
    })}
    {eyes && <><circle cx={-14} cy={-354} r={6} fill={eyes} /><circle cx={14} cy={-354} r={6} fill={eyes} /></>}
  </g>
);

const MTemple: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a2420" bottom="#040605" id="m1" />
    <Moon x={800} y={300} r={70} f={f} />
    <Temple ruined />
    <Statue x={240} y={1180} s={1.1} pose={1} /><Statue x={820} y={1180} s={1.0} pose={0.6} /><Statue x={540} y={1200} s={0.8} />
    <circle cx={540} cy={800} r={60} fill={GREEN} opacity={0.1 + 0.08 * Math.sin(f / 4)} />
    {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${100 + i * 160} ${1250 + (i % 2) * 30} q30 -20 60 0 q30 20 60 0`} stroke="#2a5a2a" strokeWidth={10} fill="none" transform={`translate(${Math.sin(f / 10 + i) * 20} 0)`} />)}
  </svg>
);

const Priestess: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#4a5a6a" bottom="#1a1e24" id="m2" />
    <circle cx={540} cy={700} r={360} fill="#fff4d0" opacity={0.25} />
    <Temple />
    <g transform="translate(540 1180) scale(1.2)"><Woman f={f} fill="#1a1820" /></g>
    {[220, 860].map((x, i) => <g key={i}><rect x={x - 6} y={1080} width={12} height={100} fill="#e8d8b0" /><path d={`M${x - 10} 1080 Q${x} ${1046 - Math.sin(f / 3 + i) * 8} ${x + 10} 1080 Z`} fill="#ffb43a" /></g>)}
  </svg>
);

const Poseidon: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#03080c" />
    <Temple />
    <g transform={`translate(540 ${700 + Math.sin(f / 6) * 10})`} opacity={0.85}>
      <path d={`M-540 400 C-300 ${-200 - Math.sin(f / 5) * 40} 300 ${-260 - Math.sin(f / 4) * 40} 540 300 L540 1300 L-540 1300 Z`} fill="#0e3a44" />
      <ellipse cx={-80} cy={-60} rx={34} ry={18} fill="#9affff" /><ellipse cx={80} cy={-60} rx={34} ry={18} fill="#9affff" />
      <path d="M300 -500 L300 300 M250 -540 Q250 -480 300 -480 Q350 -480 350 -540 M300 -560 L300 -480" stroke="#c8d8e0" strokeWidth={14} fill="none" />
    </g>
    <g transform="translate(540 1180) scale(1.1)"><Woman f={f} fill="#1a1820" /></g>
  </svg>
);

const Athena: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#06050a" />
    <circle cx={540} cy={760} r={420} fill="#c8d8ff" opacity={0.1} />
    <g transform="translate(540 1300) scale(1.6)">
      <path d="M-110 0 L-80 -400 Q0 -460 80 -400 L110 0 Z" fill="#14121c" stroke="#c8d8ff" strokeOpacity={0.5} strokeWidth={3} />
      <circle cx={0} cy={-460} r={50} fill="#14121c" stroke="#c8d8ff" strokeOpacity={0.5} strokeWidth={3} />
      <path d="M-56 -470 Q0 -560 56 -470 L40 -470 Q0 -520 -40 -470 Z M0 -540 Q60 -620 90 -560 Q40 -560 0 -520 Z" fill="#c8a040" />
      <circle cx={-16} cy={-464} r={6} fill={BLOOD} /><circle cx={16} cy={-464} r={6} fill={BLOOD} />
      <line x1={110} y1={-500} x2={130} y2={60} stroke="#c8c0a0" strokeWidth={8} />
      <circle cx={-130} cy={-220} r={90} fill="#3a3020" stroke="#c8a040" strokeWidth={6} />
    </g>
    <g transform="translate(220 1400) scale(0.6)" opacity={0.9}><Woman f={f} fill="#1a1820" /></g>
  </svg>
);

const MSnakes: React.FC<ShotProps> = ({ f, dur }) => {
  const p = clamp(f / (dur * 0.6));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#040604" />
      <circle cx={540} cy={800} r={420} fill={GREEN} opacity={0.05 + p * 0.08} />
      <g transform="translate(540 1500) scale(2.2)"><Woman f={f} snakes={p} fill="#1a2018" eyes={p > 0.7 ? GREEN : undefined} /></g>
      {p > 0.7 && <circle cx={540} cy={730} r={200} fill={GREEN} opacity={(p - 0.7) * 0.4} />}
    </svg>
  );
};

const MStatues: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a3230" bottom="#060807" id="m3" />
    <path d="M0 1050 L1080 1050 L1080 1920 L0 1920 Z" fill="#141814" />
    {Array.from({ length: 9 }).map((_, i) => <Statue key={i} x={90 + i * 115} y={1150 + (i % 3) * 60} s={0.7 + (i % 3) * 0.15} pose={(i % 2) * 1} />)}
    {Array.from({ length: 10 }).map((_, i) => <path key={i} d="M0 0 l4 -18 l4 18 Z" fill="#6a6a64" transform={`translate(${random(`ms${i}`) * W} ${1300 + random(`mt${i}`) * 200}) rotate(${random(`mu${i}`) * 360})`} />)}
  </svg>
);

const MSleep: React.FC<ShotProps> = ({ f }) => {
  const cut = clamp((f - 35) / 5);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#050605" />
      <g transform="translate(300 1200) rotate(-80) scale(0.9)"><Woman f={0} snakes={1} fill="#1a2018" /></g>
      <g transform="translate(760 1200)">
        <path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill={INK} stroke="#c8a060" strokeOpacity={0.6} strokeWidth={3} />
        <circle cx={0} cy={-300} r={36} fill={INK} stroke="#c8a060" strokeOpacity={0.6} strokeWidth={3} />
        <ellipse cx={-90} cy={-180} rx={70} ry={90} fill="#a8a090" stroke="#6a5a40" strokeWidth={6} />
        <path d={`M40 -220 L${120 - cut * 260} ${-360 + cut * 300}`} stroke="#c8d0d8" strokeWidth={10} />
      </g>
      {cut >= 1 && Array.from({ length: 16 }).map((_, i) => { const a = random(`mc${i}`) * Math.PI * 2, d = (f - 40) * (6 + random(`md${i}`) * 8); return <circle key={i} cx={300 + Math.cos(a) * d} cy={950 + Math.sin(a) * d} r={8} fill={BLOOD} />; })}
    </svg>
  );
};

const Court: React.FC<ShotProps> = ({ f, dur }) => {
  const stone = clamp((f - 20) / (dur * 0.5));
  const col = (c: string) => stone > 0.5 ? "#6a6a64" : c;
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0806" />
      <g transform="translate(540 1100)"><path d="M-160 0 L-160 -400 Q0 -500 160 -400 L160 0 Z" fill={col("#4a0a14")} /></g>
      {[[540, 1150, 1.1, true], [240, 1250, 0.9, false], [380, 1220, 0.85, false], [700, 1220, 0.85, false], [840, 1250, 0.9, false]].map(([x, y, s, king], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill={col("#1a1410")} stroke={stone > 0.5 ? "#3a3a36" : "none"} strokeWidth={3} />
          <circle cx={0} cy={-300} r={36} fill={col("#1a1410")} />
          {king && <path d="M-30 -330 L-24 -360 L0 -340 L24 -360 L30 -330 Z" fill={col("#e0b040")} />}
        </g>
      ))}
      <g transform="translate(540 600)"><GorgonHead f={f} /></g>
      <rect width={W} height={H} fill="#8a8a80" opacity={stone * 0.25} />
    </svg>
  );
};

const MSand: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#4a3020" bottom="#1a0e08" id="m4" />
    <path d="M0 1100 Q300 980 600 1060 Q850 1120 1080 1020 V1920 H0 Z" fill="#6a4a28" />
    <path d="M0 1300 Q400 1200 800 1280 Q950 1310 1080 1260 V1920 H0 Z" fill="#4a3018" />
    <g transform={`translate(${-100 + f * 6} 500)`}><path d="M-40 0 L40 0 L30 120 L-30 120 Z" fill={INK} /><circle cx={0} cy={-20} r={26} fill={INK} /><path d="M-40 20 L-140 -20 M40 20 L140 -20" stroke={INK} strokeWidth={14} /><g transform="translate(60 100)"><circle r={30} fill="#3a2a1a" /></g></g>
    {Array.from({ length: 10 }).map((_, i) => {
      const x0 = 80 + i * 60, t = f - i * 5;
      if (t < 0) return null;
      const y = 620 + Math.min(t, 30) * 22;
      return t < 30 ? <circle key={i} cx={x0} cy={y} r={7} fill={BLOOD} /> : <path key={i} d={`M${x0 - 30} ${1280} q15 -20 30 0 q15 20 30 0`} stroke="#2a3a1a" strokeWidth={10} fill="none" transform={`translate(${Math.sin(f / 4 + i) * 10} 0)`} />;
    })}
  </svg>
);

const Aegis: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#06060a" />
    <circle cx={540} cy={860} r={460} fill="#c8a040" opacity={0.1} />
    <g transform={`translate(540 860) scale(${0.95 + Math.min(f, 40) * 0.003})`}>
      <circle r={400} fill="#3a3020" stroke="#c8a040" strokeWidth={24} />
      <circle r={350} fill="none" stroke="#8a6a20" strokeWidth={6} strokeDasharray="20 14" />
      <g transform="scale(1.5)"><GorgonHead f={f} eye={(f % 30) < 4 ? "#fff" : GREEN} /></g>
    </g>
  </svg>
);

const MDoors: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0c0a08" />
    <rect x={180} y={380} width={720} height={1000} fill="#3a2a1a" stroke="#1a120a" strokeWidth={30} />
    <line x1={540} y1={380} x2={540} y2={1380} stroke="#1a120a" strokeWidth={14} />
    {[[360, 700], [720, 700]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y}) scale(0.9)`}><circle r={140} fill="#8a7a5a" /><g transform="scale(0.9)"><GorgonHead f={f + i * 20} eye="#3a3020" /></g></g>)}
    {[360, 720].map((x, i) => <circle key={i} cx={x} cy={1060} r={30} fill="none" stroke="#c8a040" strokeWidth={10} />)}
  </svg>
);

const MEyes: React.FC<ShotProps> = ({ f }) => {
  const open = clamp((f - 8) / 14);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#020302" />
      <g transform="translate(540 820)">
        {Array.from({ length: 16 }).map((_, i) => { const a = -Math.PI + (i / 15) * Math.PI; return <path key={i} d={`M${Math.cos(a) * 200} ${Math.sin(a) * 160} q${Math.cos(a + Math.sin(f / 5 + i)) * 200} ${Math.sin(a) * 180} ${Math.cos(a) * 440} ${Math.sin(a) * 380}`} stroke="#1a3a1a" strokeWidth={30} fill="none" strokeLinecap="round" />; })}
        <ellipse rx={260} ry={320} fill="#2a3a2a" />
        <ellipse cx={-100} cy={-30} rx={60} ry={34 * open + 2} fill={GREEN} /><ellipse cx={100} cy={-30} rx={60} ry={34 * open + 2} fill={GREEN} />
        <ellipse cx={-100} cy={-30} rx={10} ry={30 * open} fill="#000" /><ellipse cx={100} cy={-30} rx={10} ry={30 * open} fill="#000" />
        <circle cx={0} cy={-30} r={300} fill={GREEN} opacity={0.08 * open} />
        <path d="M-60 160 Q0 180 60 160" stroke="#0a1a0a" strokeWidth={8} fill="none" />
      </g>
    </svg>
  );
};

export const SHOTS17: Record<string, React.FC<ShotProps>> = {
  mtemple: MTemple, priestess: Priestess, poseidon: Poseidon, athena: Athena, msnakes: MSnakes, mstatues: MStatues,
  msleep: MSleep, court: Court, msand: MSand, aegis: Aegis, mdoors: MDoors, meyes: MEyes,
};
