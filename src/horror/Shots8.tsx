import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";
import { Squatch } from "./Shots5";

/* Creature #8 — Yeti */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", SNOW = "#dfe8ee", YETI = "#c8d0d4";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const Snowfall: React.FC<{ f: number; n?: number; wind?: number }> = ({ f, n = 70, wind = 1 }) => (
  <g>
    {Array.from({ length: n }).map((_, i) => {
      const x = (random(`sn${i}`) * W + f * (2 + random(`sw${i}`) * 3) * wind) % W;
      const y = (random(`sy${i}`) * H + f * (3 + random(`sv${i}`) * 4)) % H;
      return <circle key={i} cx={x} cy={y} r={2 + random(`sr${i}`) * 4} fill={SNOW} opacity={0.6} />;
    })}
  </g>
);

const Peaks: React.FC<{ y?: number }> = ({ y = 1100 }) => (
  <g>
    <path d={`M0 ${y - 200} L180 ${y - 560} L300 ${y - 420} L520 ${y - 820} L700 ${y - 480} L840 ${y - 620} L1080 ${y - 300} V${y} H0 Z`} fill="#3a4a58" />
    <path d={`M520 ${y - 820} L460 ${y - 700} L500 ${y - 710} L530 ${y - 660} L570 ${y - 720} L600 ${y - 690} Z M180 ${y - 560} L150 ${y - 490} L190 ${y - 500} L210 ${y - 470} Z M840 ${y - 620} L810 ${y - 560} L850 ${y - 570} L870 ${y - 540} Z`} fill={SNOW} />
    <path d={`M0 ${y - 60} L240 ${y - 260} L420 ${y - 140} L640 ${y - 300} L860 ${y - 150} L1080 ${y - 240} V${y} H0 Z`} fill="#1c2630" />
    <path d={`M0 ${y} Q540 ${y - 80} 1080 ${y} V1920 H0 Z`} fill="#b8c4cc" />
  </g>
);

const YSnow: React.FC<ShotProps> = ({ f, scene }) => (
  <svg width={W} height={H}>
    <Sky top="#1a2a3a" bottom="#05080c" id="y1" />
    <Moon x={800} y={360} r={80} f={f} />
    <Peaks />
    <g transform={`translate(${scene === 0 ? 900 - f * 1.2 : 760} 1060) scale(0.5)`}><Squatch f={f} walk={scene === 0} turn={1} fill={YETI} eyes={BLOOD} /></g>
    <Snowfall f={f} />
  </svg>
);

const Yaks: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a2a34" bottom="#08080a" id="y2" />
    <Peaks y={1000} />
    {[[300, 1180, 0], [720, 1250, 1]].map(([x, y, k], i) => (
      <g key={i} transform={`translate(${x} ${y}) rotate(${k ? 8 : -6})`}>
        <ellipse cx={0} cy={0} rx={170} ry={70} fill="#1a1410" />
        <circle cx={-170} cy={30} r={48} fill="#1a1410" transform={`rotate(${k ? 70 : -60} -170 30)`} />
        <path d="M-200 -10 Q-250 -60 -220 -100 M-150 -10 Q-110 -60 -140 -100" stroke="#d8d0b8" strokeWidth={10} fill="none" />
        {[-100, -40, 60, 120].map((lx, j) => <line key={j} x1={lx} y1={40} x2={lx + 40} y2={100} stroke="#1a1410" strokeWidth={18} />)}
        <ellipse cx={-160} cy={80} rx={140} ry={30} fill={BLOOD} opacity={0.7} />
      </g>
    ))}
    {Array.from({ length: 12 }).map((_, i) => <ellipse key={i} cx={200 + i * 60} cy={1380 + (i % 3) * 20} rx={18} ry={10} fill="#5a6a72" />)}
    <Snowfall f={f} n={40} />
  </svg>
);

const Expedition: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#4a6a8a" bottom="#c8d4dc" id="y3" />
    <path d="M0 1300 L540 420 L1080 1300 Z" fill="#e8eef2" />
    <path d="M540 420 L380 700 L460 680 L540 760 L620 680 L700 700 Z" fill="#8a9aa8" opacity={0.5} />
    {[0, 1, 2].map((i) => <g key={i} transform={`translate(${560 + i * 30 + f * 0.4} ${560 + i * 26})`}><circle r={7} fill={INK} /><path d="M-6 6 L6 6 L4 30 L-4 30 Z" fill={INK} /></g>)}
    {[0, 1, 2, 3].map((i) => <g key={i} transform={`translate(${160 + i * 60} ${1260 - i * 14}) scale(1.8)`}><circle cx={0} cy={-60} r={10} fill="#2a2420" /><path d="M-12 -50 L12 -50 L10 0 L-10 0 Z" fill="#3a2a20" /><line x1={14} y1={-40} x2={30} y2={0} stroke="#3a2a20" strokeWidth={3} /></g>)}
    <path d="M150 1200 Q220 1180 360 1170" stroke="#5a4a3a" strokeWidth={3} fill="none" />
    <Snowfall f={f} n={30} />
  </svg>
);

const YPaper: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0806" />
    <g transform={`translate(540 860) rotate(${4 - f * 0.04})`}>
      <rect x={-420} y={-540} width={840} height={1080} fill="#ddd2b8" />
      <text x={0} y={-440} textAnchor="middle" fontFamily="Fell" fontSize={50} fill="#2a2018">The Daily Chronicle · 1921</text>
      <line x1={-380} y1={-410} x2={380} y2={-410} stroke="#2a2018" strokeWidth={4} />
      <text x={0} y={-290} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={96} fill="#1a0e08">ABOMINABLE</text>
      <text x={0} y={-180} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={96} fill="#1a0e08">SNOWMAN</text>
      <text x={0} y={-110} textAnchor="middle" fontFamily="Fell" fontSize={40} fill="#5a4a38">“metoh-kangmi” — man-bear snowman</text>
      {Array.from({ length: 18 }).map((_, i) => <line key={i} x1={-380} y1={-40 + i * 30} x2={i % 4 === 3 ? 100 : 380} y2={-40 + i * 30} stroke="#5a4a38" strokeWidth={8} strokeDasharray="22 6 40 6" />)}
    </g>
  </svg>
);

const Shipton: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0b0a09" />
    <g transform={`translate(540 860) rotate(${-2 + Math.sin(f / 40)})`}>
      <rect x={-400} y={-470} width={800} height={940} fill="#e8e0cc" />
      <rect x={-370} y={-440} width={740} height={760} fill="#b0b4b4" />
      {Array.from({ length: 30 }).map((_, i) => <ellipse key={i} cx={(random(`sp${i}`) - 0.5) * 700} cy={(random(`sq${i}`) - 0.5) * 700 - 60} rx={20 + random(`sr${i}`) * 40} ry={8} fill="#9a9e9e" />)}
      <g transform="translate(-40 -60)">
        <path d="M0 -200 C80 -200 110 -100 100 0 C92 120 80 200 0 220 C-80 200 -92 120 -100 0 C-110 -100 -80 -200 0 -200 Z" fill="#6a6e70" />
        {[-70, -30, 10, 50, 80].map((tx, i) => <ellipse key={i} cx={tx} cy={-230 + Math.abs(i - 1.5) * 10} rx={22 - Math.abs(i - 1) * 2} ry={26} fill="#6a6e70" />)}
      </g>
      <g transform="translate(220 -60) rotate(8)"><rect x={-10} y={-260} width={20} height={480} fill="#5a3a20" /><path d="M-10 -260 L-90 -250 L-90 -230 L10 -236 Z M10 -260 L60 -280 L60 -260 Z" fill="#7a7a7a" /></g>
      <text x={0} y={400} textAnchor="middle" fontFamily="Fell" fontSize={42} fill="#3a3630">Menlung Glacier · Eric Shipton · 1951</text>
    </g>
  </svg>
);

const Monastery: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0c0604" />
    <circle cx={540} cy={860} r={360} fill="#ffb43a" opacity={0.12} />
    {Array.from({ length: 10 }).map((_, i) => <rect key={i} x={60 + i * 100} y={300 + Math.sin(f / 10 + i) * 8} width={70} height={90} fill={["#c0302a", "#e8c040", "#2a6ab0", "#3a9a5a", "#f0f0e8"][i % 5]} opacity={0.6} />)}
    <path d="M40 300 Q540 360 1040 300" stroke="#8a7a5a" strokeWidth={3} fill="none" />
    <g transform="translate(540 960)">
      <rect x={-260} y={-200} width={520} height={360} fill="#2a1a10" stroke="#c8902a" strokeWidth={8} />
      <rect x={-230} y={-170} width={460} height={300} fill="#140c06" />
      <g transform="rotate(-10)">
        <path d="M-160 20 C-170 -30 -120 -60 -60 -50 L120 -40 C150 -38 160 -10 140 10 L-100 50 C-140 56 -160 40 -160 20 Z" fill="#4a3a28" />
        {[0, 1, 2, 3].map((i) => <path key={i} d={`M120 ${-40 + i * 16} C190 ${-60 + i * 22} 230 ${-50 + i * 26} 250 ${-30 + i * 30}`} stroke="#4a3a28" strokeWidth={16} strokeLinecap="round" fill="none" />)}
        <path d="M-40 -46 C-70 -100 -40 -140 -10 -130" stroke="#4a3a28" strokeWidth={18} strokeLinecap="round" fill="none" />
      </g>
    </g>
    {[200, 880].map((x, i) => <g key={i}><rect x={x - 8} y={1250} width={16} height={60} fill="#e8d8b0" /><path d={`M${x - 10} 1250 Q${x} ${1220 - Math.sin(f / 3 + i) * 8} ${x + 10} 1250 Z`} fill="#ffb43a" /></g>)}
  </svg>
);

const Finger: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#100a08" />
    <g transform="translate(540 820) scale(2)">
      <path d="M-160 20 C-170 -30 -120 -60 -60 -50 L120 -40 C150 -38 160 -10 140 10 L-100 50 C-140 56 -160 40 -160 20 Z" fill="#4a3a28" />
      {[0, 1, 2].map((i) => <path key={i} d={`M120 ${-40 + i * 16} C190 ${-60 + i * 22} 230 ${-50 + i * 26} 250 ${-30 + i * 30}`} stroke="#4a3a28" strokeWidth={16} strokeLinecap="round" fill="none" />)}
      <g transform={`translate(${clamp((f - 15) / 20) * 80} ${clamp((f - 15) / 20) * 120})`}><path d="M120 8 C190 20 230 40 250 60" stroke="#4a3a28" strokeWidth={16} strokeLinecap="round" fill="none" /></g>
    </g>
    <g transform="translate(540 1540) scale(0.7)" opacity={clamp((f - 30) / 10)}>
      <rect x={-260} y={-90} width={520} height={180} rx={20} fill="#3a2a40" stroke="#c8a0d0" strokeWidth={4} />
      <text x={0} y={16} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={44} fill="#e8d8f0">LUGGAGE · 1959</text>
    </g>
  </svg>
);

const YDna: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#030a10" />
    <g transform="translate(540 820)">
      {Array.from({ length: 22 }).map((_, i) => {
        const y = -600 + i * 56, a = f / 8 + i * 0.5;
        const x1 = Math.sin(a) * 160, x2 = -Math.sin(a) * 160;
        return <g key={i}><line x1={x1} y1={y} x2={x2} y2={y} stroke="#5ab8ff" strokeOpacity={0.35} strokeWidth={4} /><circle cx={x1} cy={y} r={10} fill="#5ab8ff" /><circle cx={x2} cy={y} r={10} fill="#ff5a8a" /></g>;
      })}
    </g>
    {["FINGER → HUMAN", "HAIR → HIMALAYAN BEAR", "SCALP → GOAT HIDE"].map((t, i) => <text key={i} x={540} y={1460 + i * 50} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={36} fill="#5ab8ff" opacity={clamp((f - 10 - i * 18) / 10)}>{t}</text>)}
  </svg>
);

const Blizzard: React.FC<ShotProps> = ({ f }) => {
  const eyes = clamp((f - 15) / 15);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#8a96a0" />
      <rect width={W} height={H} fill="#2a343c" opacity={0.6} />
      <g transform={`translate(540 ${1000}) scale(1.4)`} opacity={0.35 + eyes * 0.5}><Squatch f={f} walk={false} turn={1} fill={YETI} eyes={BLOOD} /></g>
      <g opacity={eyes}><circle cx={510} cy={640} r={14} fill={BLOOD} /><circle cx={590} cy={640} r={14} fill={BLOOD} /><circle cx={550} cy={640} r={90} fill={BLOOD} opacity={0.15} /></g>
      <Snowfall f={f * 2} n={140} wind={3} />
      <rect width={W} height={H} fill={SNOW} opacity={0.12 + 0.08 * Math.sin(f / 5)} />
    </svg>
  );
};

const YCave: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a3a4a" bottom="#0a0e12" id="y4" />
    <path d="M0 0 H1080 V1300 H0 Z" fill="#3a4a58" />
    <path d="M200 1300 C200 900 340 700 540 700 C740 700 880 900 880 1300 Z" fill="#000" />
    <path d="M0 1300 Q540 1240 1080 1300 V1920 H0 Z" fill="#c8d2d8" />
    {Array.from({ length: 8 }).map((_, i) => {
      const p = i / 8;
      return <g key={i} transform={`translate(${540 + (i % 2 ? 40 : -40) * (1 - p)} ${1700 - p * 420}) scale(${1 - p * 0.7})`}><path d="M0 -60 C30 -60 40 -20 36 10 C32 40 24 56 0 60 C-24 56 -32 40 -36 10 C-40 -20 -30 -60 0 -60 Z" fill="#7a8a94" /></g>;
    })}
    {(f % 70) < 50 && <g><circle cx={510} cy={1000} r={8} fill={BLOOD} /><circle cx={560} cy={1000} r={8} fill={BLOOD} /></g>}
    <Snowfall f={f} n={50} />
  </svg>
);

export const SHOTS8: Record<string, React.FC<ShotProps>> = {
  ysnow: YSnow, yaks: Yaks, expedition: Expedition, ypaper: YPaper, shipton: Shipton, monastery: Monastery,
  finger: Finger, ydna: YDna, blizzard: Blizzard, ycave: YCave,
};
