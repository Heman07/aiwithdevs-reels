import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #2 — Sirens / Mermaids */
const W = 1080, H = 1920, INK = "#020304", RIM = "#7fc8be", MOON = "#dfe9e4", BLOOD = "#d0202a";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const Sea: React.FC<{ y: number; f: number; rough?: number; color?: string }> = ({ y, f, rough = 1, color = "#03090b" }) => (
  <g>
    {[0, 1, 2, 3].map((r) => (
      <path key={r} fill={r === 3 ? color : "#071518"} opacity={0.6 + r * 0.13}
        d={`M-200 ${y + r * 40} ${Array.from({ length: 14 }).map((_, k) => `q50 ${-(30 + r * 6) * rough * (0.7 + 0.3 * Math.sin(f / 9 + k + r))} 100 0`).join(" ")} V${H} H-200 Z`}
        transform={`translate(${((f * (1.5 + r)) % 200) - 100} 0)`} stroke={RIM} strokeOpacity={0.25} strokeWidth={2} />
    ))}
  </g>
);

const Ship: React.FC<{ x: number; y: number; s: number; f: number; tilt?: number }> = ({ x, y, s, f, tilt = 4 }) => (
  <g transform={`translate(${x} ${y + Math.sin(f / 10) * 10}) rotate(${Math.sin(f / 13) * tilt}) scale(${s})`}>
    <path d="M-260 0 L260 0 L200 80 L-200 80 Z" fill={INK} stroke={RIM} strokeOpacity={0.6} strokeWidth={3} />
    <path d="M-260 0 L-300 -40 L-240 -10 Z" fill={INK} />
    <line x1={0} y1={0} x2={0} y2={-420} stroke={INK} strokeWidth={14} />
    <path d="M10 -400 Q160 -300 10 -120 Z" fill="#0b1416" stroke={RIM} strokeOpacity={0.4} strokeWidth={3} />
    {[-200, -140, -80, 80, 140, 200].map((ox, i) => <line key={i} x1={ox} y1={60} x2={ox - 40} y2={130} stroke={INK} strokeWidth={8} />)}
  </g>
);

/** Bird-woman siren silhouette */
const SirenFigure: React.FC<{ f: number; wing?: number; sing?: boolean; eye?: string }> = ({ f, wing = 1, sing, eye = "#c8ff6a" }) => {
  const flap = Math.sin(f / 8) * 10 * wing;
  const st = { stroke: RIM, strokeOpacity: 0.8, strokeWidth: 4 } as const;
  return (
    <g>
      {[-1, 1].map((d) => (
        <g key={d} transform={`scale(${d} 1) rotate(${-flap} 30 -150)`}>
          <path d={`M30 -170 C120 -${260 + 60 * wing} 260 -${300 + 80 * wing} ${320 * wing + 40} -${240 + 60 * wing} C250 -170 200 -120 150 -60 C120 -90 70 -110 30 -100 Z`} fill={INK} {...st} />
          {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${60 + i * 40 * wing} ${-140 + i * 6} l${20 * wing} ${70 - i * 6}`} stroke={RIM} strokeOpacity={0.35} strokeWidth={3} />)}
        </g>
      ))}
      <path d="M-40 -160 C-60 -60 -50 20 -30 80 L30 80 C50 20 60 -60 40 -160 Z" fill={INK} {...st} />
      <path d="M-30 80 L-50 170 L-80 200 M-50 170 L-40 205 M-50 170 L-20 200 M30 80 L50 170 L80 200 M50 170 L40 205 M50 170 L20 200" stroke={INK} strokeWidth={10} fill="none" strokeLinecap="round" />
      <circle cx={0} cy={-210} r={42} fill={INK} {...st} />
      <path d={`M-40 -230 C-90 -150 -80 -60 -110 ${-10 + Math.sin(f / 9) * 10} M40 -230 C90 -150 80 -60 110 ${-10 + Math.sin(f / 9 + 1) * 10}`} stroke={INK} strokeWidth={22} fill="none" />
      <circle cx={-14} cy={-214} r={5} fill={eye} /><circle cx={14} cy={-214} r={5} fill={eye} />
      {sing && <ellipse cx={0} cy={-188} rx={8} ry={6 + 4 * Math.abs(Math.sin(f / 4))} fill="#000" />}
    </g>
  );
};

const SeaShot: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a2a33" bottom="#03070a" id="s2a" />
    {Array.from({ length: 6 }).map((_, i) => <ellipse key={i} cx={((i * 260 + f * 2) % 1400) - 160} cy={300 + (i % 3) * 120} rx={300} ry={70} fill="#0a1418" opacity={0.9} />)}
    <Ship x={560} y={1060} s={1} f={f} tilt={7} />
    <Sea y={1120} f={f} rough={1.6} />
    {Array.from({ length: 60 }).map((_, i) => <line key={i} x1={random(`r${i}`) * W} y1={(random(`ry${i}`) * H + f * 40) % H} x2={random(`r${i}`) * W - 12} y2={(random(`ry${i}`) * H + f * 40) % H + 40} stroke="#9ab" strokeOpacity={0.25} strokeWidth={2} />)}
  </svg>
);

const Bones: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1d3a40" bottom="#040809" id="s2b" />
    <Moon x={780} y={360} r={80} f={f} />
    <path d="M60 1300 L180 900 L260 1000 L360 760 L470 980 L560 840 L660 1040 L760 880 L880 1080 L1000 940 L1080 1300 Z" fill={INK} stroke={RIM} strokeOpacity={0.6} strokeWidth={4} />
    {Array.from({ length: 16 }).map((_, i) => {
      const x = 150 + random(`bx${i}`) * 800, y = 1000 + random(`by${i}`) * 250, r = random(`br${i}`) * 180;
      return <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}><rect x={-40} y={-6} width={80} height={12} rx={6} fill="#cfc6b0" /><circle cx={-42} cy={-6} r={9} fill="#cfc6b0" /><circle cx={-42} cy={6} r={9} fill="#cfc6b0" /><circle cx={42} cy={-6} r={9} fill="#cfc6b0" /><circle cx={42} cy={6} r={9} fill="#cfc6b0" /></g>;
    })}
    {[[300, 1080], [700, 1150], [520, 980]].map(([x, y], i) => (
      <g key={i} transform={`translate(${x} ${y}) scale(${0.9 + i * 0.15})`}>
        <path d="M-40 0 C-44 -50 44 -50 40 0 L30 30 L-30 30 Z" fill="#d8cfb8" />
        <circle cx={-16} cy={-6} r={11} fill="#000" /><circle cx={16} cy={-6} r={11} fill="#000" />
        <path d="M-20 22 L20 22" stroke="#000" strokeWidth={4} strokeDasharray="4 4" />
      </g>
    ))}
    <Sea y={1260} f={f} rough={1} />
  </svg>
);

const Meadow: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#4a5a52" bottom="#121a14" id="s2c" />
    <circle cx={540} cy={560} r={240} fill="#f0e6c0" opacity={0.25} />
    <path d="M0 1150 Q540 1060 1080 1150 V1920 H0 Z" fill="#0c140e" />
    {Array.from({ length: 40 }).map((_, i) => <circle key={i} cx={random(`fx${i}`) * W} cy={1120 + random(`fy${i}`) * 200} r={6} fill={i % 3 ? "#e8d0d8" : "#f0e6a0"} opacity={0.7} />)}
    {[[220, 0.9], [420, 1.05], [640, 0.95], [840, 0.9]].map(([x, s], i) => (
      <g key={i} transform={`translate(${x} 1180) scale(${s})`}>
        <path d="M-60 0 L-30 -220 Q0 -250 30 -220 L60 0 Z" fill="#0a100c" stroke="#e8e0c8" strokeOpacity={0.5} strokeWidth={3} />
        <circle cx={0} cy={-260} r={34} fill="#0a100c" stroke="#e8e0c8" strokeOpacity={0.5} strokeWidth={3} />
        <path d={`M-30 -270 Q-60 -200 -50 ${-140 + Math.sin(f / 10 + i) * 8}`} stroke="#0a100c" strokeWidth={16} fill="none" />
        <path d={`M30 -200 L${80 + Math.sin(f / 12 + i) * 10} -140`} stroke="#0a100c" strokeWidth={12} />
      </g>
    ))}
    {i18n(f)}
  </svg>
);
// subtle falling petals
const i18n = (f: number) => Array.from({ length: 14 }).map((_, i) => <ellipse key={i} cx={(random(`p${i}`) * W + Math.sin(f / 20 + i) * 40)} cy={(random(`pq${i}`) * 1100 + f * 1.5) % 1100} rx={7} ry={4} fill="#f0d0d8" opacity={0.5} />);

const Underworld: React.FC<ShotProps> = ({ f }) => {
  const open = clamp(f / 30);
  return (
    <svg width={W} height={H}>
      <Sky top="#2a0a08" bottom="#050101" id="s2d" />
      <path d="M0 1050 Q540 990 1080 1050 V1920 H0 Z" fill="#0c0606" />
      <path d={`M540 1060 L${540 - 160 * open} 1200 L${540 - 60 * open} 1260 L${540 - 220 * open} 1500 L${540 + 40 * open} 1350 L${540 + 200 * open} 1520 L${540 + 90 * open} 1240 L${540 + 170 * open} 1150 Z`} fill="#ff4a1a" opacity={0.9} />
      <ellipse cx={540} cy={1300} rx={320 * open} ry={200 * open} fill="#ff3a10" opacity={0.25} />
      {/* black chariot horses bursting */}
      <g transform={`translate(540 ${1450 - open * 380}) scale(${0.6 + 0.4 * open})`}>
        {[-140, 140].map((x, i) => (
          <g key={i} transform={`translate(${x} 0) scale(${i ? -1 : 1} 1)`}>
            <path d="M0 0 C-30 -120 -60 -220 -120 -280 L-200 -250 L-190 -220 L-120 -220 C-90 -150 -80 -80 -60 20 Z" fill={INK} stroke="#ff6a2a" strokeOpacity={0.8} strokeWidth={4} />
            <circle cx={-150} cy={-250} r={7} fill="#ff4a1a" />
          </g>
        ))}
      </g>
      {/* dragged figure: a reaching hand */}
      <path d={`M700 ${1250 + open * 80} l-10 -120 l12 0 l6 80 l6 -100 l12 0 l2 100 l10 -90 l12 2 l-6 92 l14 -70 l12 4 l-14 104 Q700 ${1320 + open * 80} 700 ${1250 + open * 80} Z`} fill="#1a0a08" stroke="#ff9a6a" strokeOpacity={0.6} strokeWidth={2} />
      {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={540 + (random(`e${i}`) - 0.5) * 500} cy={1300 - ((f * (3 + random(`ev${i}`) * 4) + i * 40) % 700)} r={3} fill="#ff8a3a" opacity={0.7} />)}
    </svg>
  );
};

const Transform: React.FC<ShotProps> = ({ f }) => {
  const w = clamp((f - 10) / 40);
  return (
    <svg width={W} height={H}>
      <Sky top="#20101a" bottom="#040204" id="s2e" />
      <circle cx={540} cy={820} r={380} fill={BLOOD} opacity={0.12 + 0.06 * Math.sin(f / 5)} />
      <g transform={`translate(540 1060) scale(${1.4 + 0.1 * w})`}><SirenFigure f={f} wing={w} eye="#ff3a3a" /></g>
      {Array.from({ length: 24 }).map((_, i) => {
        const a = random(`fa${i}`) * Math.PI * 2, d = (f * 3 + i * 25) % 600;
        return <path key={i} d="M0 0 q10 -14 0 -34 q-10 14 0 34" fill="#0a0a0a" stroke={RIM} strokeOpacity={0.4} transform={`translate(${540 + Math.cos(a) * d} ${820 + Math.sin(a) * d}) rotate(${f * 4 + i * 30})`} />;
      })}
    </svg>
  );
};

const SirenShot: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1d3a40" bottom="#040809" id="s2f" />
    <Moon x={300} y={380} r={90} f={f} />
    <Ship x={880} y={1080} s={0.45} f={f} />
    <path d="M200 1250 L300 1020 L420 980 L560 1060 L640 1250 Z" fill={INK} stroke={RIM} strokeOpacity={0.6} strokeWidth={4} />
    <g transform="translate(420 980) scale(0.95)"><SirenFigure f={f} wing={0.7} sing /></g>
    {[0, 1, 2, 3, 4].map((i) => {
      const p = ((f / 30 + i / 5) % 1);
      return <path key={i} d={`M${440 + p * 400} ${760 - p * 80} q30 -30 60 0 q30 30 60 0`} stroke="#c8ff6a" strokeWidth={4} fill="none" opacity={1 - p} />;
    })}
    <Sea y={1180} f={f} rough={0.8} />
  </svg>
);

const SirenFall: React.FC<ShotProps> = ({ f, dur }) => {
  const p = clamp(f / (dur * 0.8));
  return (
    <svg width={W} height={H}>
      <Sky top="#162a30" bottom="#030607" id="s2g" />
      <path d="M0 700 L360 700 L420 1920 L0 1920 Z" fill={INK} stroke={RIM} strokeOpacity={0.6} strokeWidth={4} />
      {[0, 1, 2].map((i) => {
        const q = clamp(p * 1.4 - i * 0.2);
        return <g key={i} transform={`translate(${380 + i * 90 + q * 200} ${680 + q * q * 760}) rotate(${q * 160}) scale(0.6)`} opacity={q < 1 ? 1 : 0}><SirenFigure f={f} wing={0.4} /></g>;
      })}
      <Sea y={1450} f={f} rough={1.2} />
      {p > 0.6 && [0, 1, 2].map((i) => <ellipse key={i} cx={650 + i * 90} cy={1460} rx={(p - 0.6) * 500} ry={(p - 0.6) * 60} fill="none" stroke="#cfe" strokeOpacity={1 - p} strokeWidth={4} />)}
    </svg>
  );
};

const Drown: React.FC<ShotProps> = ({ f, dur }) => {
  const sink = f / dur;
  return (
    <svg width={W} height={H}>
      <defs><linearGradient id="dw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a6a6a" /><stop offset="0.5" stopColor="#06201f" /><stop offset="1" stopColor="#000" /></linearGradient></defs>
      <rect width={W} height={H} fill="url(#dw)" />
      {[260, 520, 780].map((x, i) => <path key={i} d={`M${x} 0 L${x - 100} 1300 L${x + 20} 1300 Z`} fill="#bff" opacity={0.06} />)}
      <g transform={`translate(${540 + Math.sin(f / 20) * 30} ${600 + sink * 600}) rotate(${20 + sink * 40})`}>
        <circle cx={0} cy={-150} r={36} fill={INK} />
        <path d="M-40 -110 L40 -110 L30 60 L-30 60 Z" fill={INK} />
        <path d={`M-40 -100 L-140 ${-200 + Math.sin(f / 6) * 20} M40 -100 L140 ${-190 + Math.sin(f / 6 + 1) * 20} M-20 60 L-50 220 M20 60 L60 210`} stroke={INK} strokeWidth={22} strokeLinecap="round" />
      </g>
      {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={500 + (random(`dx${i}`) - 0.5) * 200} cy={(1300 - ((f * (4 + random(`ds${i}`) * 4) + i * 50) % 1300))} r={4 + random(`dr${i}`) * 8} fill="none" stroke="#dff" strokeOpacity={0.5} strokeWidth={2} />)}
    </svg>
  );
};

const Mast: React.FC<ShotProps> = ({ f, scene }) => {
  const struggle = scene === 8;
  const pull = struggle ? Math.sin(f / 3) * 14 : Math.sin(f / 12) * 3;
  return (
    <svg width={W} height={H}>
      <Sky top="#1a2a33" bottom="#03070a" id="s2h" />
      <rect x={510} y={0} width={60} height={H} fill={INK} stroke={RIM} strokeOpacity={0.5} strokeWidth={3} />
      <path d="M570 160 Q900 420 570 820 Z" fill="#0b1416" stroke={RIM} strokeOpacity={0.4} strokeWidth={3} />
      <g transform={`translate(${540 + pull} 1180)`}>
        <circle cx={0} cy={-330} r={50} fill={INK} stroke={RIM} strokeOpacity={0.7} strokeWidth={4} />
        <path d="M-70 -270 L70 -270 L60 40 L-60 40 Z" fill={INK} stroke={RIM} strokeOpacity={0.7} strokeWidth={4} />
        <path d={`M-70 -250 L${-150 - pull} ${-160} L${-120 - pull} -40 M70 -250 L${150 - pull} -160 L${120 - pull} -40`} stroke={INK} strokeWidth={26} fill="none" strokeLinecap="round" />
        {[-200, -120, -40].map((y, i) => <path key={i} d={`M-90 ${y} Q0 ${y + 24} 90 ${y}`} stroke="#c8a060" strokeWidth={9} fill="none" />)}
        <path d="M-40 40 L-50 300 M40 40 L50 300" stroke={INK} strokeWidth={28} />
        {struggle && <path d="M-20 -315 Q0 -300 20 -315" stroke={BLOOD} strokeWidth={6} fill="none" />}
        {struggle && <ellipse cx={0} cy={-300} rx={14} ry={10 + 6 * Math.abs(Math.sin(f / 3))} fill="#000" />}
      </g>
      <Sea y={1420} f={f} rough={1.4} />
    </svg>
  );
};

const Columbus: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#4a3a40" bottom="#0a0606" id="s2i" />
    <circle cx={540} cy={1000} r={200} fill="#e0805a" opacity={0.45} />
    <Ship x={300} y={1040} s={0.85} f={f} />
    <Sea y={1080} f={f} rough={0.6} color="#06080a" />
    {[640, 760, 880].map((x, i) => {
      const up = clamp((f - 20 - i * 12) / 20);
      return (
        <g key={i} transform={`translate(${x} ${1140 - up * 40})`} opacity={up}>
          <ellipse cx={0} cy={0} rx={30} ry={36} fill={INK} stroke="#e0805a" strokeOpacity={0.7} strokeWidth={3} />
          <circle cx={-10} cy={-6} r={4} fill="#c8ff6a" /><circle cx={10} cy={-6} r={4} fill="#c8ff6a" />
          <ellipse cx={0} cy={34} rx={60} ry={8} fill="none" stroke="#e0b090" strokeOpacity={0.6} strokeWidth={3} />
        </g>
      );
    })}
  </svg>
);

const Face: React.FC<ShotProps> = ({ f }) => {
  const up = clamp((f - 5) / 35);
  const open = clamp((f - 30) / 10);
  return (
    <svg width={W} height={H}>
      <defs><radialGradient id="fc"><stop offset="0" stopColor="#9fb8b2" /><stop offset="1" stopColor="#1a2624" /></radialGradient></defs>
      <rect width={W} height={H} fill="#010505" />
      {Array.from({ length: 14 }).map((_, i) => <path key={i} d={`M${540 + (i - 7) * 30} ${760 - 300 * up} C${540 + (i - 7) * 60 + Math.sin(f / 10 + i) * 40} ${1000} ${540 + (i - 7) * 70} 1300 ${540 + (i - 7) * 50 + Math.sin(f / 8 + i) * 60} 1600`} stroke="#050b0a" strokeWidth={30} fill="none" opacity={up} />)}
      <g transform={`translate(540 ${1100 - 340 * up})`} opacity={up}>
        <ellipse cx={0} cy={0} rx={190} ry={250} fill="url(#fc)" />
        <ellipse cx={-75} cy={-30} rx={48} ry={30 * (0.2 + 0.8 * open)} fill="#000" />
        <ellipse cx={75} cy={-30} rx={48} ry={30 * (0.2 + 0.8 * open)} fill="#000" />
        <circle cx={-75} cy={-30} r={9 * open} fill="#c8ff4a" /><circle cx={75} cy={-30} r={9 * open} fill="#c8ff4a" />
        <path d={`M-80 120 Q0 ${140 + 60 * open} 80 120`} stroke="#000" strokeWidth={10} fill={open > 0.5 ? "#000" : "none"} />
        {open > 0.5 && Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${-60 + i * 17} 124 l7 ${18 + (i % 2) * 8} l7 ${-18 - (i % 2) * 8}`} fill="#e8e2d0" />)}
      </g>
      {Array.from({ length: 24 }).map((_, i) => <circle key={i} cx={random(`fb${i}`) * W} cy={(random(`fq${i}`) * H - f * 3 + H * 4) % H} r={3 + random(`fr${i}`) * 5} fill="none" stroke="#bfe" strokeOpacity={0.35} />)}
    </svg>
  );
};

export const SHOTS2: Record<string, React.FC<ShotProps>> = {
  sea: SeaShot, bones: Bones, meadow: Meadow, underworld: Underworld, transform: Transform, siren: SirenShot,
  sirenfall: SirenFall, drown: Drown, mast: Mast, columbus: Columbus, face: Face,
};
