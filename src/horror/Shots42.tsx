import React from "react";
import { random } from "remotion";
import { ShotProps, Sky } from "./Shots";
import { Diya, Woman, Child, Haveli } from "./Shots40";
import { Figure } from "./Shots41";

/* Govardhan Puja + Bhai Dooj — warm devotional */
const W = 1080, H = 1920, GOLD = "#f2b544", FIRE = "#ff8a1a", BLUE = "#3a6ad0";
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const ease = (v: number) => { const c = clamp(v); return c * c * (3 - 2 * c); };

export const Cow: React.FC<{ s?: number; c?: string; flip?: boolean; f?: number }> = ({ s = 1, c = "#f4efe6", flip, f = 0 }) => (
  <g transform={`scale(${flip ? -s : s} ${s})`}>
    {[-70, -40, 50, 80].map((x, i) => <rect key={i} x={x - 9} y={-80 + (i % 2 ? Math.sin(f / 6) * 3 : 0)} width={18} height={80} fill={c} stroke="#8a7a6a" strokeWidth={2} />)}
    <ellipse cx={0} cy={-110} rx={120} ry={56} fill={c} stroke="#8a7a6a" strokeWidth={3} />
    <ellipse cx={30} cy={-120} rx={34} ry={22} fill="#8a5a3a" opacity={0.7} />
    <path d="M118 -120 Q160 -130 150 -190 L120 -180 Z" fill={c} stroke="#8a7a6a" strokeWidth={3} />
    <ellipse cx={150} cy={-190} rx={34} ry={26} fill={c} stroke="#8a7a6a" strokeWidth={3} />
    <ellipse cx={168} cy={-180} rx={16} ry={12} fill="#e8b0a0" />
    <circle cx={146} cy={-198} r={4} fill="#1a0a0a" />
    <path d="M130 -212 Q118 -240 128 -252 M160 -214 Q166 -244 156 -254" stroke="#c8a060" strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M124 -204 L104 -214" stroke={c} strokeWidth={10} strokeLinecap="round" />
    <path d="M-118 -120 Q-150 -90 -140 -40" stroke={c} strokeWidth={6} fill="none" />
    <circle cx={140} cy={-160} r={8} fill={GOLD} />
  </g>
);

/* Govardhan hill: wide, green, trees on top, rocky underside */
const Hill: React.FC<{ s?: number; under?: boolean }> = ({ s = 1, under }) => (
  <g transform={`scale(${s})`}>
    <path d="M-460 0 Q-380 -150 -220 -210 Q-80 -320 60 -260 Q220 -330 340 -190 Q440 -120 460 0 Z" fill="#4a7a3a" stroke="#2a4a20" strokeWidth={6} />
    <path d="M-300 -150 Q-120 -230 60 -180 Q220 -240 330 -130" stroke="#6a9a4a" strokeWidth={14} fill="none" opacity={0.6} />
    {[-320, -200, -60, 80, 220, 330].map((x, i) => <g key={i} transform={`translate(${x} ${-170 - (i % 3) * 50 + (i === 0 || i === 5 ? 40 : 0)})`}><rect x={-8} y={-50} width={16} height={60} fill="#5a3a1a" /><circle cy={-70} r={40 + (i % 2) * 12} fill={i % 2 ? "#2a5a1a" : "#1e4a1a"} /></g>)}
    {under && <path d="M-460 0 Q0 90 460 0 Q0 40 -460 0 Z" fill="#6a5a44" stroke="#3a2a1a" strokeWidth={5} />}
    {under && Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M${-380 + i * 95} 10 l18 ${26 + (i % 3) * 10} l20 -${22 + (i % 2) * 8}`} fill="#5a4a34" />)}
  </g>
);

const Cloud: React.FC<{ x: number; y: number; s?: number; c?: string; o?: number }> = ({ x, y, s = 1, c = "#3a3a4a", o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={0} rx={180} ry={60} fill={c} /><circle cx={-70} cy={-40} r={70} fill={c} /><circle cx={40} cy={-60} r={90} fill={c} /><circle cx={130} cy={-20} r={60} fill={c} />
  </g>
);

const Rain: React.FC<{ f: number; n?: number; x0?: number; x1?: number; y0?: number; y1?: number; seed?: string }> = ({ f, n = 90, x0 = 0, x1 = W, y0 = 0, y1 = 1300, seed = "r" }) => (
  <g>{Array.from({ length: n }).map((_, i) => {
    const x = x0 + random(`${seed}x${i}`) * (x1 - x0); const y = y0 + ((random(`${seed}y${i}`) * (y1 - y0) + f * 38) % (y1 - y0));
    return <path key={i} d={`M${x} ${y} l-10 46`} stroke="#9ab8d8" strokeWidth={3} opacity={0.6} />;
  })}</g>
);

const Bolt: React.FC<{ f: number; x: number; every?: number }> = ({ f, x, every = 36 }) => (f % every) < 4 ? (
  <g><rect width={W} height={H} fill="#fff" opacity={0.18} /><path d={`M${x} 160 L${x - 50} 420 L${x + 10} 420 L${x - 60} 720`} stroke="#fff6c0" strokeWidth={10} fill="none" /></g>
) : null;

const Elephant: React.FC<{ s?: number; f: number }> = ({ s = 1, f }) => (
  <g transform={`scale(${s})`}>
    {[-90, -40, 50, 100].map((x, i) => <rect key={i} x={x - 22} y={-130} width={44} height={130} rx={12} fill="#eceaf2" stroke="#9a98a8" strokeWidth={3} />)}
    <ellipse cx={0} cy={-200} rx={170} ry={110} fill="#f4f2fa" stroke="#9a98a8" strokeWidth={4} />
    <path d="M-140 -290 L140 -290 L120 -200 L-120 -200 Z" fill="#c0281a" /><path d="M-140 -290 L140 -290" stroke={GOLD} strokeWidth={10} />
    <ellipse cx={170} cy={-250} rx={80} ry={86} fill="#f4f2fa" stroke="#9a98a8" strokeWidth={4} />
    <path d={`M220 -220 Q260 -120 ${230 + Math.sin(f / 8) * 14} -40`} stroke="#f4f2fa" strokeWidth={36} fill="none" strokeLinecap="round" />
    <path d="M200 -200 Q250 -180 250 -150" stroke="#fffaf0" strokeWidth={10} fill="none" />
    <ellipse cx={120} cy={-250} rx={50} ry={70} fill="#e4e2ec" stroke="#9a98a8" strokeWidth={3} />
    <circle cx={190} cy={-272} r={7} fill="#1a0a0a" />
    <path d="M150 -330 L190 -330 L170 -300 Z" fill={GOLD} />
  </g>
);

const Buffalo: React.FC<{ s?: number; f: number }> = ({ s = 1, f }) => (
  <g transform={`scale(${s})`}>
    {[-80, -40, 50, 90].map((x, i) => <rect key={i} x={x - 16} y={-110} width={32} height={110} fill="#1e1e26" />)}
    <ellipse cx={0} cy={-170} rx={150} ry={80} fill="#24242e" />
    <ellipse cx={160} cy={-200} rx={56} ry={50} fill="#24242e" />
    <path d="M130 -240 Q80 -290 110 -320 M190 -240 Q240 -290 210 -320" stroke="#5a5a64" strokeWidth={14} fill="none" strokeLinecap="round" />
    <circle cx={150} cy={-210} r={6} fill="#ff4a2a" opacity={0.6 + Math.sin(f / 5) * 0.3} /><circle cx={180} cy={-210} r={6} fill="#ff4a2a" opacity={0.6 + Math.sin(f / 5) * 0.3} />
    <path d="M-120 -230 L120 -230 L110 -180 L-110 -180 Z" fill="#5a1a1a" /><path d="M-120 -230 L120 -230" stroke={GOLD} strokeWidth={8} />
  </g>
);

const River: React.FC<{ f: number; y?: number; c?: string }> = ({ f, y = 1150, c = "#2a5a9a" }) => (
  <g>
    <rect y={y} width={W} height={H - y} fill={c} />
    {Array.from({ length: 14 }).map((_, i) => <path key={i} d={`M${((i * 140 + f * 3) % 1300) - 120} ${y + 30 + (i % 5) * 50} q30 -10 60 0 t60 0`} stroke="#9ad0ff" strokeWidth={4} fill="none" opacity={0.5} />)}
  </g>
);

const Sun: React.FC<{ x: number; y: number; r?: number; f: number }> = ({ x, y, r = 120, f }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r * 2.4} fill={GOLD} opacity={0.12} />
    <g transform={`rotate(${f * 0.6})`}>{Array.from({ length: 16 }).map((_, i) => <path key={i} transform={`rotate(${i * 22.5})`} d={`M-14 ${-r - 10} L0 ${-r - 70} L14 ${-r - 10} Z`} fill={i % 2 ? FIRE : GOLD} />)}</g>
    <circle r={r} fill="#ffcf3a" stroke={FIRE} strokeWidth={8} />
    <path d={`M${-r * 0.4} ${-r * 0.1} l${r * 0.2} 0 M${r * 0.2} ${-r * 0.1} l${r * 0.2} 0`} stroke="#a8541c" strokeWidth={6} strokeLinecap="round" />
    <path d={`M${-r * 0.3} ${r * 0.3} Q0 ${r * 0.5} ${r * 0.3} ${r * 0.3}`} stroke="#a8541c" strokeWidth={6} fill="none" />
  </g>
);

const Braj: React.FC<{ id: string; storm?: boolean }> = ({ id, storm }) => (
  <>
    <Sky top={storm ? "#1a1e2a" : "#7ab0e0"} bottom={storm ? "#3a4050" : "#f0e0b0"} id={id} />
    <path d="M0 980 Q270 940 540 970 T1080 950 V1150 H0 Z" fill={storm ? "#2a3a2a" : "#7aa04a"} />
    <rect y={1150} width={W} height={H} fill={storm ? "#2a2a24" : "#a88a50"} />
  </>
);

const Hut: React.FC<{ x: number; y?: number; s?: number }> = ({ x, y = 1150, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-130} width={180} height={130} fill="#c8a070" stroke="#7a5a30" strokeWidth={4} />
    <path d="M-120 -130 L0 -230 L120 -130 Z" fill="#a8843a" stroke="#6a4a1a" strokeWidth={4} />
    <rect x={-26} y={-80} width={52} height={80} fill="#5a3a1a" />
  </g>
);

const Pakwan: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={300} ry={50} fill={GOLD} stroke="#a87010" strokeWidth={4} />
    {[[-200, "#e8a020"], [-120, "#f4f0e0"], [-40, "#c8501a"], [40, "#f0d060"], [120, "#8a4a1a"], [200, "#f4c0a0"]].map(([dx, c], i) => (
      <g key={i}><path d={`M${(dx as number) - 36} -10 Q${dx} -${70 + (i % 2) * 20} ${(dx as number) + 36} -10 Z`} fill={c as string} stroke="#7a4a1a" strokeWidth={2} /></g>
    ))}
    {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={-240 + i * 54} cy={18} r={12} fill={i % 2 ? "#f0a030" : "#fff4d0"} />)}
  </g>
);

/* ---------- GOVARDHAN ---------- */
const GvHook: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#2a1408" />
    <circle cx={540} cy={860} r={520} fill={GOLD} opacity={0.12 + Math.sin(f / 8) * 0.03} />
    <rect x={120} y={1060} width={840} height={90} fill="#7a3a1a" />
    <g transform="translate(540 1070)">
      <path d="M-280 0 Q-200 -160 -60 -220 Q60 -280 160 -200 Q260 -140 280 0 Z" fill="#7a5a30" stroke="#4a3018" strokeWidth={6} />
      {[-160, -40, 80, 180].map((x, i) => <g key={i}><path d={`M${x} ${-150 - (i % 2) * 40} l0 -40`} stroke="#3a7a2a" strokeWidth={8} /><circle cx={x} cy={-195 - (i % 2) * 40} r={14} fill="#3a8a2a" /></g>)}
      <circle cx={-20} cy={-120} r={10} fill="#c0101a" /><circle cx={30} cy={-120} r={10} fill="#c0101a" />
    </g>
    {Array.from({ length: 8 }).map((_, i) => <Diya key={i} x={150 + i * 110} y={1160} f={f} i={i} s={1.1} />)}
    {Array.from({ length: 14 }).map((_, i) => <circle key={i} cx={random(`gh${i}`) * W} cy={(random(`gk${i}`) * 900 + f * 2) % 1000} r={4} fill={GOLD} opacity={0.5} />)}
  </svg>
);

const GvBraj: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Braj id="gv1" />
    <circle cx={840} cy={300} r={90} fill="#fff4c0" opacity={0.9} />
    {[140, 400, 940].map((x, i) => <Hut key={i} x={x} y={1000} s={0.7} />)}
    <g transform="translate(540 760) scale(0.7)"><Cloud x={0} y={0} c="#f0f0f8" /></g>
    <g transform="translate(540 600)"><path d="M0 0 L0 -60" stroke={GOLD} strokeWidth={8} /><circle cy={-80} r={24} fill={GOLD} /></g>
    {[260, 460, 660, 840].map((x, i) => <g key={i} transform={`translate(${x} 1160) scale(0.62)`}>{i % 2 ? <Woman f={f} pose="pray" saree={["#c0281a", "#e88a1a"][i % 2]} /> : <Figure f={f} cloth="#e8d8b0" crown={false} weapon="pray" />}</g>)}
  </svg>
);

const GvKrishna: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Braj id="gv2" />
    <g transform="translate(560 1000) scale(0.8)"><Hill /></g>
    <g transform="translate(160 1160) scale(0.7)"><Cow f={f} /></g>
    <g transform="translate(940 1160) scale(0.6)"><Cow f={f} flip c="#e8d8c0" /></g>
    <g transform="translate(400 1160) scale(0.62)"><Figure f={f} skin={BLUE} cloth="#f0c020" feather weapon="flute" /></g>
    <g transform="translate(640 1160) scale(0.85)"><Figure f={f} cloth="#e8d8b0" crown={false} /></g>
    <g transform={`translate(${470 + Math.sin(f / 10) * 6} 760)`} opacity={0.85}><ellipse rx={40} ry={30} fill="#fff" /><path d="M-10 26 L-30 50 L10 28 Z" fill="#fff" /><text x={0} y={14} textAnchor="middle" fontSize={44} fill="#3a2a1a" fontWeight={700}>?</text></g>
  </svg>
);

const GvAnnakut: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#2a1608" />
    <circle cx={540} cy={800} r={520} fill={GOLD} opacity={0.14} />
    <g transform="translate(540 900) scale(0.9)"><Hill /></g>
    <Pakwan x={540} y={1060} s={1.2} />
    {Array.from({ length: 7 }).map((_, i) => <Diya key={i} x={140 + i * 133} y={1160} f={f} i={i} s={1.1} />)}
    {Array.from({ length: 20 }).map((_, i) => <path key={i} d={`M${random(`pf${i}`) * W} ${(random(`pg${i}`) * 900 + f * 3) % 1000} l8 8 l-8 8 l-8 -8 Z`} fill={i % 2 ? "#ff7a1a" : "#ffcf3a"} opacity={0.7} />)}
  </svg>
);

const GvIndra: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#0e1020" bottom="#3a3050" id="gv3" />
    <Bolt f={f} x={860} every={30} />
    {[[150, 300, 1.2], [880, 260, 1.4], [520, 180, 1.1]].map(([x, y, s], i) => <Cloud key={i} x={x + Math.sin(f / 20 + i) * 20} y={y} s={s} c="#2a2a3a" />)}
    <g transform={`translate(420 ${1000 + Math.sin(f / 12) * 8})`}>
      <Cloud x={20} y={-10} s={1.6} c="#4a4a5a" />
      <Elephant s={0.85} f={f} />
      <g transform="translate(-10 -250) scale(0.55)"><Figure f={f} skin="#e0b080" cloth="#c0281a" /></g>
      <g transform="translate(60 -470) rotate(20)"><path d="M0 0 L0 -90" stroke={GOLD} strokeWidth={10} /><path d="M-20 -90 L0 -130 L20 -90 Z M-20 0 L0 40 L20 0 Z" fill={GOLD} /></g>
    </g>
  </svg>
);

const GvStorm: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Braj id="gv4" storm />
    {[[200, 220], [700, 180], [1000, 300], [420, 340]].map(([x, y], i) => <Cloud key={i} x={x} y={y} s={1.4} c="#1e1e28" />)}
    <Bolt f={f} x={300} every={24} />
    <Rain f={f} n={140} />
    {[150, 480, 860].map((x, i) => <Hut key={i} x={x} y={1080 + Math.sin(f / 8 + i) * 4} s={0.8} />)}
    <rect y={1040 - Math.min(f, 80) * 0.8} width={W} height={H} fill="#3a5a7a" opacity={0.75} />
    {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M${((i * 120 + f * 6) % 1200) - 60} ${1040 - Math.min(f, 80) * 0.8 + 20 + (i % 4) * 40} q40 -16 80 0`} stroke="#c0d8ef" strokeWidth={5} fill="none" opacity={0.6} />)}
  </svg>
);

const GvFlee: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Braj id="gv5" storm />
    {[[300, 260], [800, 220]].map(([x, y], i) => <Cloud key={i} x={x} y={y} s={1.5} c="#1e1e28" />)}
    <Rain f={f} n={110} seed="fl" />
    <g transform={`translate(${120 + f * 1.4} 0)`}>
      <g transform="translate(0 1160) scale(0.55)"><Cow f={f * 2} /></g>
      <g transform="translate(220 1160) scale(0.7)"><Woman f={f} saree="#c0281a" /></g>
      <g transform="translate(320 1160) scale(0.9)"><Child c="#e8a020" /></g>
      <g transform="translate(470 1160) scale(0.75)"><Figure f={f} cloth="#e8d8b0" crown={false} /></g>
      <g transform="translate(640 1160) scale(0.5)"><Cow f={f * 2} c="#d8c8b0" /></g>
    </g>
    <rect y={1120} width={W} height={H} fill="#3a5a7a" opacity={0.5} />
  </svg>
);

const GvLift: React.FC<ShotProps> = ({ f, dur }) => {
  const up = ease(f / Math.max(20, dur * 0.35));
  const hy = 1160 - 0.8 * 680 - 30 - (1 - up) * -380;
  return (
    <svg width={W} height={H}>
      <Braj id="gv6" storm />
      {[[180, 200], [620, 160], [980, 260]].map(([x, y], i) => <Cloud key={i} x={x} y={y} s={1.5} c="#1e1e28" />)}
      <Bolt f={f} x={920} every={40} />
      <Rain f={f} n={70} x0={0} x1={120} seed="l1" />
      <Rain f={f} n={70} x0={960} x1={W} seed="l2" />
      <Rain f={f} n={80} y1={hy - 60} seed="l3" />
      <circle cx={588} cy={hy} r={300 * up} fill={GOLD} opacity={0.12} />
      <g transform={`translate(588 ${hy})`}><Hill s={1.05} under /></g>
      <g transform="translate(540 1160) scale(0.8)"><Figure f={f} skin={BLUE} cloth="#f0c020" feather weapon="lift" aura={up} /></g>
      <g transform="translate(250 1160) scale(0.5)"><Cow f={f} /></g>
      <g transform="translate(830 1160) scale(0.5)"><Cow f={f} flip /></g>
    </svg>
  );
};

const GvShelter: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Braj id="gv7" storm />
    <Rain f={f} n={60} x0={0} x1={90} seed="s1" />
    <Rain f={f} n={60} x0={990} x1={W} seed="s2" />
    <Rain f={f} n={60} y1={420} seed="s3" />
    <g transform="translate(540 560)"><Hill s={1.12} under /></g>
    <rect x={60} y={640} width={960} height={520} fill={GOLD} opacity={0.08} />
    <g transform="translate(540 1160) scale(0.62)"><Figure f={f} skin={BLUE} cloth="#f0c020" feather weapon="lift" aura={1} /></g>
    {[[170, "c"], [300, "w"], [390, "k"], [700, "m"], [820, "w"], [930, "c"]].map(([x, t], i) => (
      <g key={i} transform={`translate(${x} 1160)`}>{t === "c" ? <g transform="scale(0.42)"><Cow f={f} flip={i > 2} /></g> : t === "w" ? <g transform="scale(0.55)"><Woman f={f} pose="pray" saree={i > 3 ? "#e88a1a" : "#c0281a"} /></g> : t === "k" ? <g transform="scale(0.8)"><Child c="#3a8a5a" /></g> : <g transform="scale(0.6)"><Figure f={f} cloth="#e8d8b0" crown={false} weapon="pray" /></g>}</g>
    ))}
    <rect x={40} y={1150} width={60} height={20} fill="#5a7a9a" opacity={0.5} /><rect x={980} y={1150} width={60} height={20} fill="#5a7a9a" opacity={0.5} />
  </svg>
);

const GvSorry: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#6a9ad0" bottom="#f4e0b0" id="gv8" />
    <circle cx={540} cy={420} r={160} fill="#fff4c0" opacity={0.8} />
    {Array.from({ length: 12 }).map((_, i) => <path key={i} transform={`translate(540 420) rotate(${i * 30 + f * 0.3})`} d="M-8 -180 L0 -320 L8 -180 Z" fill="#fff4c0" opacity={0.5} />)}
    <path d="M0 1000 Q540 960 1080 1000 V1150 H0 Z" fill="#7aa04a" /><rect y={1150} width={W} height={H} fill="#a88a50" />
    <g transform="translate(360 1160) scale(0.7)"><Figure f={f} skin={BLUE} cloth="#f0c020" feather weapon="flute" aura={1} /></g>
    <g transform="translate(700 1160) scale(0.8)"><Figure f={f} skin="#e0b080" cloth="#c0281a" weapon="pray" /></g>
    <g transform="translate(900 1160) scale(0.38)"><Elephant f={f} /></g>
    {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={300 + random(`fl${i}`) * 500} cy={(random(`fm${i}`) * 600 + f * 3) % 700 + 300} r={7} fill={i % 2 ? "#ffcf3a" : "#f07aa0"} />)}
  </svg>
);

const GvParikrama: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#f0a060" bottom="#f8e0b0" id="gv9" />
    <circle cx={820} cy={420} r={110} fill="#fff0c0" />
    <g transform="translate(540 960)"><Hill s={1.1} /></g>
    <path d="M-40 1100 Q540 1000 1120 1100 L1120 1150 L-40 1150 Z" fill="#c8a060" />
    <rect y={1150} width={W} height={H} fill="#8a6a3a" />
    {Array.from({ length: 9 }).map((_, i) => { const x = ((i * 140 + f * 2) % 1300) - 110; return <g key={i} transform={`translate(${x} ${1150 - Math.sin((x / W) * Math.PI) * 30}) scale(0.42)`}>{i % 3 === 1 ? <Woman f={f} pose="stand" saree={["#c0281a", "#e88a1a", "#f0c020"][i % 3]} /> : <Figure f={f} cloth={["#f4f0e8", "#e8d8b0", "#f0a040"][i % 3]} crown={false} weapon="pray" />}</g>; })}
    {[140, 940].map((x, i) => <g key={i} transform={`translate(${x} 900)`}><path d="M0 0 L0 -220" stroke="#7a4a1a" strokeWidth={6} /><path d="M0 -220 L90 -190 L0 -160 Z" fill="#ff7a1a" /></g>)}
  </svg>
);

/* ---------- BHAI DOOJ ---------- */
const Yama: React.FC<{ f: number; s?: number }> = ({ f, s = 1 }) => <Figure f={f} s={s} skin="#4a5a7a" cloth="#5a1a2a" weapon="gada" />;
const Yamuna: React.FC<{ f: number; s?: number; weapon?: string }> = ({ f, s = 1, weapon = "none" }) => <Figure f={f} s={s} fem crown skin="#c8906a" cloth="#2a6ac0" weapon={weapon} />;

const BdHook: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#24100a" />
    <circle cx={540} cy={820} r={500} fill={GOLD} opacity={0.12 + Math.sin(f / 8) * 0.03} />
    <rect x={160} y={1060} width={760} height={90} fill="#7a2a1a" />
    <g transform="translate(540 1040)"><ellipse rx={260} ry={46} fill={GOLD} stroke="#a87010" strokeWidth={5} /><circle cx={-130} cy={-10} r={30} fill="#c0101a" /><circle cx={-50} cy={-14} r={26} fill="#f4f0e8" /><circle cx={40} cy={-12} r={24} fill="#f0c020" /><path d="M120 -10 Q150 0 180 -10 L170 -24 L130 -24 Z" fill="#b8541c" /><path d={`M150 -26 Q${144 + Math.sin(f / 3) * 4} -60 150 -84 Q${156 + Math.sin(f / 3) * 4} -60 150 -26`} fill="#ffcf3a" /><circle cx={150} cy={-56} r={44} fill={FIRE} opacity={0.25} /></g>
    <g transform="translate(540 760)" opacity={0.25 + Math.sin(f / 10) * 0.08}><Buffalo f={f} s={1.4} /></g>
    {[180, 900].map((x, i) => <Diya key={i} x={x} y={1160} f={f} i={i} s={1.5} />)}
  </svg>
);

const BdSiblings: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#f0a040" bottom="#f8e8c0" id="bd1" />
    <Sun x={540} y={380} r={130} f={f} />
    <path d="M0 1050 Q540 1010 1080 1050 V1150 H0 Z" fill="#c8a060" /><rect y={1150} width={W} height={H} fill="#a8804a" />
    <g transform="translate(390 1160) scale(0.55)"><Figure f={f} skin="#4a5a7a" cloth="#5a1a2a" crown={false} /></g>
    <g transform="translate(690 1160) scale(0.55)"><Figure f={f} fem crown={false} skin="#c8906a" cloth="#2a6ac0" /></g>
    <path d="M430 860 Q540 820 650 860" stroke={GOLD} strokeWidth={4} strokeDasharray="10 10" fill="none" />
    <path d="M540 818 C520 790 490 810 540 850 C590 810 560 790 540 818 Z" fill="#e8304a" transform={`translate(0 ${Math.sin(f / 6) * 6})`} />
  </svg>
);

const BdYama: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#140a10" />
    <rect x={0} width={540} height={H} fill="#1e0e14" />
    <circle cx={270} cy={760} r={340} fill="#8a1a2a" opacity={0.18} />
    <g transform="translate(230 1160) scale(0.75)"><Buffalo f={f} /></g>
    <g transform="translate(250 960) scale(0.62)"><Yama f={f} /></g>
    <rect x={540} width={540} height={H} fill="#1a3a5a" />
    <circle cx={810} cy={700} r={320} fill="#3a8ad0" opacity={0.2} />
    <River f={f} y={1080} c="#2a5a9a" />
    <g transform="translate(810 1080) scale(0.75)"><Yamuna f={f} /></g>
    <rect x={536} width={8} height={H} fill={GOLD} opacity={0.6} />
  </svg>
);

const BdCall: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#f0b060" bottom="#f8e8c8" id="bd2" />
    <River f={f} y={1150} />
    <Haveli x={760} s={0.9} />
    <g transform="translate(400 1160) scale(0.8)"><Yamuna f={f} /></g>
    {Array.from({ length: 4 }).map((_, i) => { const t = ((f + i * 12) % 48) / 48; return <path key={i} d={`M${470 + t * 280} ${730 - t * 300} q20 -30 0 -60`} stroke={GOLD} strokeWidth={5} fill="none" opacity={1 - t} />; })}
    {[620, 900].map((x, i) => <Diya key={i} x={x} y={1150} f={f} i={i} s={1.1} />)}
  </svg>
);

const BdBusy: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#100810" />
    <circle cx={540} cy={760} r={480} fill="#5a1020" opacity={0.2} />
    {Array.from({ length: 8 }).map((_, i) => { const t = ((f * 1.2 + i * 40) % 320) / 320; return <g key={i} opacity={(1 - t) * 0.7}><ellipse cx={200 + (i % 4) * 230 + Math.sin(f / 10 + i) * 20} cy={1100 - t * 800} rx={26} ry={40} fill="#cfe0ff" /><circle cx={200 + (i % 4) * 230 + Math.sin(f / 10 + i) * 20} cy={1060 - t * 800} r={12} fill="#fff" /></g>; })}
    <g transform="translate(540 1160) scale(0.8)"><Buffalo f={f} /></g>
    <g transform="translate(560 960) scale(0.62)"><Yama f={f} /></g>
    <g transform="translate(860 360)"><circle r={90} fill="none" stroke={GOLD} strokeWidth={6} opacity={0.7} /><path d={`M0 0 L0 -70`} stroke={GOLD} strokeWidth={6} transform={`rotate(${f * 12})`} /><path d="M0 0 L40 0" stroke={GOLD} strokeWidth={6} transform={`rotate(${f})`} /></g>
  </svg>
);

const BdArrive: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#f0a050" bottom="#f8e0b8" id="bd3" />
    <rect y={1150} width={W} height={H} fill="#a8804a" />
    <Haveli x={760} s={1.1} />
    {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M${560 + i * 50} 790 l0 ${40 + (i % 2) * 20}`} stroke="#2aa86a" strokeWidth={10} />)}
    <g transform={`translate(${-120 + Math.min(f * 5, 460)} 1160) scale(0.55)`}><Buffalo f={f} /></g>
    <g transform={`translate(${-80 + Math.min(f * 5, 460)} 1030) scale(0.48)`}><Yama f={f} /></g>
    <g transform="translate(760 1160) scale(0.62)"><Yamuna f={f} weapon="pray" /></g>
  </svg>
);

const Courtyard: React.FC<{ f: number; id: string }> = ({ f, id }) => (
  <>
    <rect width={W} height={H} fill="#2a1408" />
    <circle cx={540} cy={800} r={520} fill={FIRE} opacity={0.12} />
    <rect x={80} y={300} width={920} height={850} fill="#5a2a14" />
    {[200, 880].map((x) => <g key={x}><rect x={x - 30} y={300} width={60} height={850} fill="#7a3a1a" /><circle cx={x} cy={360} r={40} fill={GOLD} opacity={0.4} /></g>)}
    {Array.from({ length: 14 }).map((_, i) => <circle key={i} cx={200 + i * 52} cy={320 + Math.sin((i / 13) * Math.PI) * 60} r={12} fill={i % 2 ? "#ff7a1a" : "#ffcf3a"} />)}
    <rect y={1150} width={W} height={H} fill="#3a1a0c" />
  </>
);

const BdTilak: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Courtyard f={f} id="bd4" />
    <g transform="translate(360 1160) scale(0.85)"><Yama f={f} /></g>
    <g transform="translate(660 1160) scale(0.85)"><Yamuna f={f} weapon="thali" /></g>
    <g transform={`translate(${660 + 0.85 * 110} ${1160 - 0.85 * 380})`}><circle r={40 + Math.sin(f / 4) * 6} fill="#ffcf3a" opacity={0.2} /></g>
    <path d="M354 772 L354 744" stroke="#c0101a" strokeWidth={7} strokeLinecap="round" />
    {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={300 + random(`pt${i}`) * 500} cy={(random(`pu${i}`) * 500 + f * 3) % 600 + 400} r={6} fill={i % 2 ? "#ffcf3a" : "#f07aa0"} />)}
    {[160, 920].map((x, i) => <Diya key={i} x={x} y={1160} f={f} i={i} s={1.4} />)}
  </svg>
);

const BdFeast: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Courtyard f={f} id="bd5" />
    <g transform="translate(300 1160) scale(0.8)"><Figure f={f} skin="#4a5a7a" cloth="#5a1a2a" /></g>
    <g transform="translate(800 1160) scale(0.8)"><Yamuna f={f} /></g>
    <Pakwan x={550} y={1100} s={0.75} />
    {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M${420 + i * 60} ${1050 - ((f * 2 + i * 20) % 80)} q10 -20 0 -40`} stroke="#fff" strokeWidth={3} fill="none" opacity={0.4} />)}
  </svg>
);

const BdBoon: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Courtyard f={f} id="bd6" />
    <circle cx={380} cy={700} r={280} fill={GOLD} opacity={0.15 + Math.sin(f / 6) * 0.05} />
    <g transform="translate(380 1160) scale(0.9)"><Figure f={f} skin="#4a5a7a" cloth="#5a1a2a" weapon="gada" aura={1} /></g>
    <g transform="translate(720 1160) scale(0.85)"><Yamuna f={f} weapon="pray" /></g>
    {Array.from({ length: 10 }).map((_, i) => { const a = (i / 10) * Math.PI * 2 + f / 20; return <circle key={i} cx={380 + Math.cos(a) * 200} cy={700 + Math.sin(a) * 200} r={6} fill={GOLD} />; })}
  </svg>
);

const BdWish: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#2a1408" />
    <circle cx={540} cy={760} r={540} fill={GOLD} opacity={0.12} />
    {[0, 1, 2].map((r) => [0, 1].map((c) => (
      <g key={`${r}${c}`} transform={`translate(${290 + c * 500} ${560 + r * 300})`} opacity={clamp((f - (r * 2 + c) * 8) / 12)}>
        <g transform="translate(-60 0) scale(0.32)"><Figure f={f} cloth={["#2a5a9a", "#5a1a2a", "#1a6a4a"][r]} crown={false} /></g>
        <g transform="translate(60 0) scale(0.32)"><Figure f={f} fem crown={false} cloth={["#c0281a", "#e88a1a", "#a02a8a"][r]} weapon="thali" /></g>
      </g>
    )))}
    {Array.from({ length: 6 }).map((_, i) => <Diya key={i} x={140 + i * 160} y={1300} f={f} i={i} s={1} />)}
  </svg>
);

const BdGhat: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#f09050" bottom="#f8d8a0" id="bd7" />
    <circle cx={540} cy={560} r={120} fill="#fff0c0" />
    {Array.from({ length: 5 }).map((_, i) => <rect key={i} x={0} y={820 + i * 40} width={W} height={40} fill={i % 2 ? "#d8b078" : "#c8a068"} />)}
    {[140, 940].map((x) => <g key={x}><rect x={x - 70} y={520} width={140} height={300} fill="#e8c890" /><path d={`M${x - 80} 520 L${x} 440 L${x + 80} 520 Z`} fill="#c8743a" /><path d={`M${x} 440 L${x} 400 L${x + 40} 412 L${x} 424`} fill="#ff7a1a" stroke="#7a4a1a" strokeWidth={2} /></g>)}
    <River f={f} y={1020} c="#3a6aa0" />
    {[[300, 1], [460, 0], [640, 1], [800, 0]].map(([x, fem], i) => <g key={i} transform={`translate(${x} ${1200 + (i % 2) * 20})`}><g transform="scale(0.42)">{fem ? <Figure f={f} fem crown={false} cloth={["#c0281a", "#e88a1a"][i % 2]} weapon="pray" /> : <Figure f={f} crown={false} cloth="#f4f0e8" weapon="pray" />}</g><rect x={-60} y={-100} width={120} height={200} fill="#3a6aa0" opacity={0.85} /></g>)}
    {Array.from({ length: 6 }).map((_, i) => <g key={i} transform={`translate(${((i * 190 + f * 1.5) % 1200) - 60} ${1080 + (i % 3) * 30})`}><path d="M-14 0 Q0 10 14 0 L10 -6 L-10 -6 Z" fill="#c8743a" /><path d="M0 -8 Q-4 -20 0 -28 Q4 -20 0 -8" fill="#ffcf3a" /></g>)}
  </svg>
);

export const SHOTS42: Record<string, React.FC<ShotProps>> = {
  gvhook: GvHook, gvbraj: GvBraj, gvkrishna: GvKrishna, gvannakut: GvAnnakut, gvindra: GvIndra, gvstorm: GvStorm, gvflee: GvFlee, gvlift: GvLift, gvshelter: GvShelter, gvsorry: GvSorry, gvparikrama: GvParikrama,
  bdhook: BdHook, bdsiblings: BdSiblings, bdyama: BdYama, bdcall: BdCall, bdbusy: BdBusy, bdarrive: BdArrive, bdtilak: BdTilak, bdfeast: BdFeast, bdboon: BdBoon, bdwish: BdWish, bdghat: BdGhat,
};
