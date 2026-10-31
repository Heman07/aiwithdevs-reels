import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #9 — Kraken */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", SQ = "#6a1a24", RIM = "#ff8a7a";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const Waves: React.FC<{ y: number; f: number; rough?: number }> = ({ y, f, rough = 1 }) => (
  <g>
    {[0, 1, 2].map((r) => (
      <path key={r} fill={["#0a1a22", "#071218", "#03080c"][r]}
        d={`M-200 ${y + r * 50} ${Array.from({ length: 14 }).map((_, k) => `q50 ${-(26 + r * 8) * rough * (0.7 + 0.3 * Math.sin(f / 8 + k + r))} 100 0`).join(" ")} V${H} H-200 Z`}
        transform={`translate(${((f * (1.5 + r)) % 200) - 100} 0)`} stroke="#8ab8c8" strokeOpacity={0.2} strokeWidth={2} />
    ))}
  </g>
);

const Boat: React.FC<{ x: number; y: number; s: number; f: number }> = ({ x, y, s, f }) => (
  <g transform={`translate(${x} ${y + Math.sin(f / 9) * 8}) rotate(${Math.sin(f / 12) * 5}) scale(${s})`}>
    <path d="M-150 0 L150 0 L110 50 L-110 50 Z" fill={INK} stroke="#8ab8c8" strokeOpacity={0.6} strokeWidth={3} />
    {[-60, 0, 60].map((x0, i) => <g key={i}><circle cx={x0} cy={-34} r={14} fill={INK} /><path d={`M${x0 - 12} -20 L${x0 + 12} -20 L${x0 + 10} 0 L${x0 - 10} 0 Z`} fill={INK} /></g>)}
    <line x1={-140} y1={20} x2={-240} y2={80} stroke={INK} strokeWidth={6} /><line x1={140} y1={20} x2={240} y2={80} stroke={INK} strokeWidth={6} />
  </g>
);

export const Tentacle: React.FC<{ x: number; y: number; h: number; f: number; phase?: number; w?: number; curl?: number }> = ({ x, y, h, f, phase = 0, w = 60, curl = 1 }) => {
  const pts = Array.from({ length: 16 }).map((_, i) => {
    const t = i / 15;
    return [x + Math.sin(f / 10 + phase + t * 4) * 60 * t * curl, y - t * h];
  });
  const left = pts.map(([px, py], i) => `${px - (w * (1 - i / 16)) / 2},${py}`).join(" ");
  const right = pts.slice().reverse().map(([px, py], i) => `${px + (w * (i / 16)) / 2},${py}`).join(" ");
  return (
    <g>
      <polygon points={`${left} ${right}`} fill={SQ} stroke={RIM} strokeOpacity={0.6} strokeWidth={3} />
      {pts.filter((_, i) => i % 2 === 0 && i < 14).map(([px, py], i) => <circle key={i} cx={px + (w * (1 - (i * 2) / 16)) / 3} cy={py} r={Math.max(3, 10 - i)} fill="#e8b8a8" opacity={0.8} />)}
    </g>
  );
};

const KStorm: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a2a34" bottom="#03070a" id="k1" />
    <Moon x={760} y={380} r={80} f={f} />
    <Boat x={480} y={1120} s={1} f={f} />
    <Waves y={1160} f={f} />
    <ellipse cx={540} cy={1500} rx={500 + Math.sin(f / 10) * 30} ry={160} fill="#000" opacity={0.45} />
  </svg>
);

const Shallow: React.FC<ShotProps> = ({ f, dur }) => {
  const rise = clamp(f / (dur * 0.9));
  return (
    <svg width={W} height={H}>
      <defs><linearGradient id="kw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1a4a5a" /><stop offset="1" stopColor="#000" /></linearGradient></defs>
      <rect width={W} height={H} fill="url(#kw)" />
      <rect x={0} y={0} width={W} height={520} fill="#1a2a34" />
      <Boat x={540} y={520} s={0.9} f={f} />
      <path d={`M0 540 ${Array.from({ length: 12 }).map((_, k) => `q45 ${-10 - 6 * Math.sin(f / 6 + k)} 90 0`).join(" ")}`} stroke="#bfe" strokeOpacity={0.6} strokeWidth={4} fill="none" />
      <g transform={`translate(540 ${1700 - rise * 700})`}>
        <ellipse cx={0} cy={0} rx={520} ry={220} fill="#14080a" stroke={RIM} strokeOpacity={0.4} strokeWidth={4} />
        <ellipse cx={-180} cy={-30} rx={70} ry={46} fill="#ffcf3a" opacity={0.9} /><ellipse cx={-180} cy={-30} rx={12} ry={42} fill="#000" />
        {[-400, -200, 200, 400].map((x, i) => <path key={i} d={`M${x} 160 q${(i - 1.5) * 60} 200 ${(i - 1.5) * 120} 420`} stroke={SQ} strokeWidth={50} fill="none" strokeLinecap="round" />)}
      </g>
      <text x={90} y={1460} fontFamily="Cinzel" fontWeight={900} fontSize={44} fill="#bfe" opacity={0.8}>DEPTH {Math.max(4, Math.floor(200 - rise * 196))} M</text>
    </svg>
  );
};

const KIsland: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a3238" bottom="#05080a" id="k2" />
    {[[260, 1080, 160], [560, 1060, 220], [840, 1090, 150]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={70} fill="#2a1418" stroke={RIM} strokeOpacity={0.35} strokeWidth={3} />)}
    <ellipse cx={560} cy={1050} rx={60} ry={36 * (0.5 + 0.5 * Math.abs(Math.sin(f / 25)))} fill="#ffcf3a" />
    <ellipse cx={560} cy={1050} rx={10} ry={30} fill="#000" />
    <Tentacle x={140} y={1120} h={700} f={f} w={70} />
    <Tentacle x={950} y={1120} h={760} f={f} phase={2} w={70} />
    <Tentacle x={420} y={1120} h={480} f={f} phase={4} w={50} />
    <g transform="translate(720 1000) scale(0.4)"><path d="M-260 0 L260 0 L200 80 L-200 80 Z" fill={INK} /><line x1={0} y1={0} x2={0} y2={-400} stroke={INK} strokeWidth={14} /></g>
    <Waves y={1100} f={f} />
  </svg>
);

const Whirlpool: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#03080c" />
    <g transform={`translate(540 1000) scale(1 0.55) rotate(${f * 3})`}>
      {Array.from({ length: 14 }).map((_, i) => <circle key={i} r={60 + i * 50} fill="none" stroke="#8ab8c8" strokeOpacity={0.5 - i * 0.03} strokeWidth={8} strokeDasharray={`${80 + i * 20} ${40 + i * 10}`} />)}
      <circle r={70} fill="#000" />
    </g>
    <g transform={`translate(${540 + Math.cos(f / 8) * (300 - f * 2)} ${1000 + Math.sin(f / 8) * (160 - f)}) rotate(${f * 5}) scale(${Math.max(0.2, 0.6 - f * 0.004)})`}>
      <path d="M-260 0 L260 0 L200 80 L-200 80 Z" fill={INK} stroke="#8ab8c8" strokeOpacity={0.6} strokeWidth={4} /><line x1={0} y1={0} x2={0} y2={-400} stroke={INK} strokeWidth={14} />
    </g>
    <Tentacle x={180} y={1500} h={600} f={f} w={60} />
    <Tentacle x={900} y={1500} h={640} f={f} phase={3} w={60} />
  </svg>
);

const Hafgufa: React.FC<ShotProps> = ({ f }) => {
  const open = 0.5 + 0.5 * Math.sin(f / 15);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0806" />
      <g transform="translate(540 860) rotate(-2)">
        <rect x={-430} y={-560} width={860} height={1120} fill="#c9b48a" />
        <rect x={-400} y={-530} width={800} height={1060} fill="none" stroke="#8a2a1a" strokeWidth={8} />
        <text x={0} y={-440} textAnchor="middle" fontFamily="Fell" fontSize={52} fill="#4a2a10">Konungs skuggsjá · c. 1250</text>
        <path d="M-400 200 Q0 160 400 200 V530 H-400 Z" fill="#5a7a8a" opacity={0.5} />
        <g transform="translate(0 160)">
          <path d={`M-300 0 Q-200 -200 0 -${180 + open * 80} Q200 -200 300 0 Z`} fill="#3a2a20" />
          <path d={`M-300 0 Q0 ${80 + open * 120} 300 0 Z`} fill="#3a2a20" />
          {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M${-250 + i * 44} ${-30 - open * 20} l12 34 l12 -34`} fill="#e8e0c8" />)}
          {Array.from({ length: 7 }).map((_, i) => {
            const t = (f * 2 + i * 30) % 200;
            return <path key={i} d="M0 0 q20 -12 40 0 q-20 12 -40 0 l-14 -10 l0 20 Z" fill="#8a9aa8" transform={`translate(${-260 + i * 80 + t * (i % 2 ? -0.6 : 0.6)} ${120 - t * 0.6})`} />;
          })}
        </g>
      </g>
    </svg>
  );
};

const Engraving: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#e0d6c0" />
    {Array.from({ length: 80 }).map((_, i) => <line key={i} x1={0} y1={i * 24} x2={W} y2={i * 24 + 10} stroke="#3a3020" strokeOpacity={0.12} strokeWidth={2} />)}
    <g transform="translate(540 820)">
      <path d="M-180 -60 L180 -60 L140 20 L-140 20 Z" fill="#2a2018" />
      {[-100, 0, 100].map((x, i) => <g key={i}><line x1={x} y1={-60} x2={x} y2={-520} stroke="#2a2018" strokeWidth={10} /><path d={`M${x + 6} -500 Q${x + 120} -400 ${x + 6} -260 Z`} fill="#c8bca0" stroke="#2a2018" strokeWidth={3} /></g>)}
      {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${-300 + i * 120} 300 C${-300 + i * 120} 100 ${-200 + i * 80} ${-200 - Math.sin(f / 10 + i) * 40} ${-60 + i * 30} -460`} stroke="#2a2018" strokeWidth={36 - i * 2} fill="none" strokeLinecap="round" />)}
      <ellipse cx={0} cy={420} rx={420} ry={180} fill="#2a2018" />
      <circle cx={-120} cy={380} r={36} fill="#e0d6c0" /><circle cx={-120} cy={380} r={14} fill="#2a2018" />
    </g>
    <text x={540} y={1460} textAnchor="middle" fontFamily="Fell" fontSize={46} fill="#2a2018">“Le Poulpe Colossal” — Montfort, 1801</text>
  </svg>
);

const Alecton: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#4a5a60" bottom="#10181c" id="k3" />
    <g transform={`translate(380 ${980 + Math.sin(f / 10) * 8})`}>
      <path d="M-320 0 L300 0 L250 100 L-280 100 Z" fill={INK} stroke="#8ab8c8" strokeOpacity={0.5} strokeWidth={3} />
      {[-200, 0, 180].map((x, i) => <line key={i} x1={x} y1={0} x2={x} y2={-460 + i * 40} stroke={INK} strokeWidth={12} />)}
      <rect x={-60} y={-160} width={60} height={160} fill={INK} /><circle cx={-30} cy={-200 - (f % 40)} r={30} fill="#3a3a3a" opacity={0.5} />
      {[0, 1, 2].map((i) => <line key={i} x1={250 - i * 40} y1={40} x2={560} y2={260 + i * 20} stroke="#c8b890" strokeWidth={3} />)}
    </g>
    <g transform={`translate(720 ${1250 + Math.sin(f / 4) * 14}) rotate(${-10 + Math.sin(f / 5) * 8})`}>
      <ellipse cx={0} cy={0} rx={260} ry={70} fill={SQ} stroke={RIM} strokeOpacity={0.6} strokeWidth={4} />
      <path d="M240 -30 L340 0 L240 30 Z" fill={SQ} />
      {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M-250 ${-30 + i * 12} C-350 ${-60 + i * 24 + Math.sin(f / 6 + i) * 30} -420 ${-20 + i * 20} -500 ${i * 24}`} stroke={SQ} strokeWidth={16} fill="none" strokeLinecap="round" />)}
      <circle cx={-170} cy={-10} r={18} fill="#ffcf3a" />
    </g>
    <Waves y={1180} f={f} rough={1.3} />
  </svg>
);

const Whale: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <defs><linearGradient id="kw2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1a4a5a" /><stop offset="1" stopColor="#020608" /></linearGradient></defs>
    <rect width={W} height={H} fill="url(#kw2)" />
    <g transform={`translate(${560 - f * 0.8} ${900 + Math.sin(f / 15) * 10})`}>
      <path d="M-420 -150 C-200 -230 300 -200 420 -60 C460 20 400 120 300 140 C0 190 -360 150 -420 60 Z" fill="#3a3a40" stroke="#9ab" strokeOpacity={0.5} strokeWidth={3} />
      <path d="M420 -40 L560 -140 L520 0 L560 120 Z" fill="#3a3a40" />
      <circle cx={-330} cy={-40} r={10} fill="#000" />
      {Array.from({ length: 18 }).map((_, i) => <circle key={i} cx={-300 + random(`ws${i}`) * 600} cy={-150 + random(`wt${i}`) * 260} r={10 + random(`wr${i}`) * 26} fill="none" stroke="#e8d8d0" strokeOpacity={0.7} strokeWidth={4} />)}
    </g>
    {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={random(`wb${i}`) * W} cy={(random(`wq${i}`) * H - f * 2 + H * 4) % H} r={3} fill="#dff" opacity={0.3} />)}
  </svg>
);

const DeepCam: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#000" />
    <g transform="translate(0 300)">
      <rect x={60} y={0} width={960} height={1100} fill="#020a10" stroke="#3a5a6a" strokeWidth={6} />
      <circle cx={540} cy={550} r={400} fill="#2a6a8a" opacity={0.15} />
      <g transform={`translate(${540 + Math.sin(f / 20) * 30} 560) rotate(${-30 + Math.sin(f / 30) * 6})`}>
        <ellipse cx={0} cy={0} rx={220} ry={60} fill="#a85a4a" opacity={0.85} />
        <path d="M200 -30 L300 0 L200 30 Z" fill="#a85a4a" />
        {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M-210 ${-24 + i * 7} C-320 ${-60 + i * 18 + Math.sin(f / 7 + i) * 20} -400 ${-20 + i * 14} -480 ${-40 + i * 14}`} stroke="#a85a4a" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.85} />)}
      </g>
      <text x={100} y={60} fontFamily="Cinzel" fontWeight={900} fontSize={34} fill="#ff4040">● REC</text>
      <text x={980} y={60} textAnchor="end" fontFamily="Cinzel" fontWeight={900} fontSize={34} fill="#9ac">DEPTH 900 M</text>
      <text x={100} y={1070} fontFamily="Cinzel" fontWeight={900} fontSize={30} fill="#9ac">OGASAWARA · 30.09.2004</text>
    </g>
  </svg>
);

const SquidEye: React.FC<ShotProps> = ({ f }) => {
  const open = clamp((f - 8) / 20);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#010203" />
      <g transform="translate(540 840)">
        <ellipse rx={460} ry={360} fill="#2a0a10" />
        {Array.from({ length: 40 }).map((_, i) => <circle key={i} cx={(random(`ce${i}`) - 0.5) * 860} cy={(random(`cf${i}`) - 0.5) * 640} r={6 + random(`cg${i}`) * 16} fill="#6a1a24" opacity={0.6 * (0.5 + 0.5 * Math.sin(f / 5 + i))} />)}
        <ellipse rx={300} ry={260 * open} fill="#0a1a20" stroke="#c8d8e0" strokeOpacity={0.4} strokeWidth={6} />
        <ellipse rx={150} ry={150 * open} fill="#000" />
        <circle cx={-60} cy={-60 * open} r={30 * open} fill="#fff" opacity={0.7} />
      </g>
    </svg>
  );
};

const Tentacles: React.FC<ShotProps> = ({ f, dur }) => {
  const rise = clamp(f / (dur * 0.6));
  return (
    <svg width={W} height={H}>
      <Sky top="#1a1218" bottom="#040204" id="k4" />
      <Moon x={540} y={360} r={70} f={f} />
      {[[120, 0], [320, 1.5], [760, 3], [960, 4.5], [540, 2.2]].map(([x, p], i) => <Tentacle key={i} x={x} y={1260} h={(500 + (i % 3) * 200) * rise} f={f} phase={p} w={70} />)}
      <Boat x={540} y={1180} s={0.8} f={f} />
      <Waves y={1220} f={f} rough={1.2} />
    </svg>
  );
};

export const SHOTS9: Record<string, React.FC<ShotProps>> = {
  kstorm: KStorm, shallow: Shallow, kisland: KIsland, whirlpool: Whirlpool, hafgufa: Hafgufa, engraving: Engraving,
  alecton: Alecton, whale: Whale, deepcam: DeepCam, squideye: SquidEye, tentacles: Tentacles,
};
