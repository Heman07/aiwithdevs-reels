import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Hindi specials — Halloween, Bhoot Chaturdashi (horror) + Ahoi Ashtami (devotional, warm) */
const W = 1080, H = 1920, BLOOD = "#c0101a", BONE = "#ddd5c0", PUMP = "#ff7a1a", FIRE = "#ff8a1a", GOLD = "#f2b544", GERU = "#b8441c", CREAM = "#f1e2c2";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

/* ---------- shared props ---------- */
const JackO: React.FC<{ f: number; s?: number; turnip?: boolean; lit?: number }> = ({ f, s = 1, turnip, lit = 1 }) => {
  const fl = 0.75 + Math.sin(f / 2.3) * 0.15 + random(`jf${Math.floor(f / 3)}`) * 0.1;
  const body = turnip ? "#d8c8a8" : PUMP;
  return (
    <g transform={`scale(${s})`}>
      <circle cx={0} cy={-10} r={260} fill={FIRE} opacity={0.12 * lit * fl} />
      {turnip ? <path d="M-150 0 C-170 -140 -60 -200 0 -200 C60 -200 170 -140 150 0 C140 120 60 170 0 170 C-60 170 -140 120 -150 0 Z" fill={body} stroke="#8a7a5a" strokeWidth={6} />
        : [-110, -40, 40, 110].map((x, i) => <ellipse key={i} cx={x * 0.9} cy={0} rx={90 + (i % 3 === 0 ? 0 : 20)} ry={160} fill={i % 2 ? "#e86a10" : body} stroke="#a8440a" strokeWidth={5} />)}
      {turnip ? <path d="M-10 -200 L-30 -280 M10 -200 L40 -270" stroke="#5a7a2a" strokeWidth={14} strokeLinecap="round" /> : <path d="M-14 -160 Q-10 -220 20 -240 L30 -220 Q10 -200 14 -160 Z" fill="#4a5a1a" />}
      <path d="M-110 -50 L-40 -50 L-75 -110 Z M40 -50 L110 -50 L75 -110 Z" fill="#ffd27a" opacity={lit * fl} />
      <path d="M-20 -10 L20 -10 L0 30 Z" fill="#ffd27a" opacity={lit * fl} />
      <path d="M-130 50 Q0 150 130 50 L100 70 L80 50 L60 80 L30 60 L0 90 L-30 60 L-60 80 L-80 50 L-100 70 Z" fill="#ffd27a" opacity={lit * fl} />
    </g>
  );
};

const Night: React.FC<{ f: number; id: string; top?: string; bottom?: string; moon?: boolean }> = ({ f, id, top = "#1a1030", bottom = "#06040a", moon = true }) => (
  <>
    <Sky top={top} bottom={bottom} id={id} />
    {moon && <Moon x={800} y={330} r={100} f={f} />}
    {Array.from({ length: 40 }).map((_, i) => <circle key={i} cx={random(`ns${i}`) * W} cy={random(`nt${i}`) * 700} r={1.6} fill="#fff" opacity={0.3 + Math.sin(f / 9 + i) * 0.2} />)}
  </>
);

const Ghost: React.FC<{ f: number; s?: number; o?: number; ph?: number }> = ({ f, s = 1, o = 0.6, ph = 0 }) => (
  <g transform={`scale(${s}) translate(0 ${Math.sin(f / 9 + ph) * 14})`} opacity={o}>
    <path d={`M-70 0 C-80 -160 80 -160 70 0 L70 120 L46 ${100 + Math.sin(f / 4 + ph) * 8} L22 120 L0 ${100 - Math.sin(f / 4 + ph) * 8} L-22 120 L-46 100 L-70 120 Z`} fill="#dfe8f0" />
    <ellipse cx={-24} cy={-50} rx={10} ry={16} fill="#0a0a14" /><ellipse cx={24} cy={-50} rx={10} ry={16} fill="#0a0a14" />
    <ellipse cx={0} cy={-6} rx={12} ry={18} fill="#0a0a14" />
  </g>
);

export const Diya: React.FC<{ x: number; y: number; f: number; i?: number; s?: number }> = ({ x, y, f, i = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cy={-30} r={50} fill={FIRE} opacity={0.18 + Math.sin(f / 3 + i) * 0.05} />
    <path d="M-34 0 Q0 26 34 0 L26 -10 L-26 -10 Z" fill="#b8541c" />
    <path d={`M-6 -12 Q0 ${-46 - Math.sin(f / 2 + i) * 6} 6 -12 Z`} fill="#ffcf3a" />
    <path d={`M-3 -14 Q0 ${-32 - Math.sin(f / 2 + i) * 4} 3 -14 Z`} fill="#fff4c0" />
  </g>
);

/* ---------- HALLOWEEN ---------- */
const JLantern: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Night f={f} id="hw1" />
    <path d="M0 1050 Q300 980 600 1030 T1080 1010 V1920 H0 Z" fill="#0a0612" />
    {[[120, 1000], [960, 990]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><path d="M0 0 L0 -400 M0 -300 L-80 -380 M0 -240 L90 -320 M0 -340 L50 -420" stroke="#0a0612" strokeWidth={18} strokeLinecap="round" /></g>)}
    <g transform="translate(540 900) scale(1.25)"><JackO f={f} /></g>
    {Array.from({ length: 5 }).map((_, i) => <g key={i} transform={`translate(${((i * 240 + f * 4) % 1300) - 100} ${300 + (i % 3) * 90 + Math.sin(f / 5 + i) * 20}) scale(${0.5 + (i % 2) * 0.2})`}><path d={`M0 0 Q-30 ${-20 - Math.abs(Math.sin(f / 2 + i)) * 20} -60 0 Q-40 -6 -30 6 Q-14 0 0 10 Q14 0 30 6 Q40 -6 60 0 Q30 ${-20 - Math.abs(Math.sin(f / 2 + i)) * 20} 0 0 Z`} fill="#000" /></g>)}
  </svg>
);

const Samhain: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Night f={f} id="hw2" top="#20142a" />
    <path d="M0 980 L200 860 L420 940 L640 820 L860 920 L1080 860 V1150 H0 Z" fill="#0e0a10" />
    <rect y={1150} width={W} height={H} fill="#0a0806" />
    <circle cx={540} cy={1080} r={340} fill={FIRE} opacity={0.15 + Math.sin(f / 3) * 0.05} />
    {Array.from({ length: 16 }).map((_, i) => <path key={i} d={`M${440 + i * 13} 1150 Q${448 + i * 13 + Math.sin(f / 2 + i) * 18} ${940 - (i % 4) * 50} ${456 + i * 13} 1150 Z`} fill={i % 2 ? FIRE : "#ffcf3a"} opacity={0.85} />)}
    {Array.from({ length: 6 }).map((_, i) => { const x = 200 + i * 140 + (i > 2 ? 120 : 0); return <g key={i} transform={`translate(${x} 1150)`}><path d="M-30 0 L-24 -200 L24 -200 L30 0 Z" fill="#14100c" /><circle cx={0} cy={-230} r={28} fill="#14100c" /><path d={`M-24 -180 L${-60 - Math.sin(f / 4 + i) * 20} ${-280 - Math.sin(f / 4 + i) * 20} M24 -180 L${60 + Math.sin(f / 4 + i) * 20} ${-280 - Math.sin(f / 4 + i) * 20}`} stroke="#14100c" strokeWidth={14} strokeLinecap="round" /></g>; })}
    {Array.from({ length: 20 }).map((_, i) => <circle key={i} cx={460 + random(`se${i}`) * 160} cy={1000 - ((f * 5 + i * 50) % 700)} r={3} fill="#ffcf3a" />)}
  </svg>
);

const Veil: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / (dur * 0.6));
  return (
    <svg width={W} height={H}>
      <Night f={f} id="hw3" top="#0e1426" />
      <rect y={1150} width={W} height={H} fill="#06080c" />
      <rect x={0} y={0} width={W} height={1150} fill="#9ab8d0" opacity={0.08} />
      {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M${i * 130} 0 Q${i * 130 + 40 + Math.sin(f / 10 + i) * 40} 600 ${i * 130 + Math.sin(f / 8 + i) * 30} 1150`} stroke="#cfe0f0" strokeWidth={50} opacity={0.06 * (1 - t * 0.7)} fill="none" />)}
      {[[260, 900, 0.9], [540, 820, 1.1], [820, 920, 0.85], [400, 600, 0.6], [700, 560, 0.55]].map(([x, y, s], i) => <g key={i} transform={`translate(${x} ${y})`}><Ghost f={f} s={s} o={t * 0.6} ph={i} /></g>)}
    </svg>
  );
};

const Masks: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0608" />
    <circle cx={540} cy={760} r={460} fill={FIRE} opacity={0.08} />
    {[[300, 700, -8], [780, 700, 8], [540, 980, 0]].map(([x, y, r], i) => (
      <g key={i} transform={`translate(${x} ${y}) rotate(${r + Math.sin(f / 10 + i) * 3})`}>
        <path d="M-150 -40 C-150 -200 150 -200 150 -40 C150 120 70 200 0 200 C-70 200 -150 120 -150 -40 Z" fill={["#d8c8a8", "#4a3a2a", "#8a2a1a"][i]} stroke="#000" strokeWidth={6} />
        <ellipse cx={-55} cy={-30} rx={34} ry={26} fill="#000" /><ellipse cx={55} cy={-30} rx={34} ry={26} fill="#000" />
        <path d="M-60 90 Q0 60 60 90 Q0 130 -60 90 Z" fill="#000" />
        {i === 1 && <path d="M-110 -140 L-150 -260 L-70 -170 M110 -140 L150 -260 L70 -170" fill="#2a1a0a" stroke="#2a1a0a" strokeWidth={10} />}
        {i === 2 && Array.from({ length: 6 }).map((_, k) => <path key={k} d={`M${-50 + k * 20} 86 l6 18 l6 -18`} fill={BONE} />)}
      </g>
    ))}
  </svg>
);

const Devil: React.FC<{ f: number; s?: number }> = ({ f, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <path d="M-70 0 L-50 -320 L50 -320 L70 0 Z" fill="#3a0606" />
    <circle cx={0} cy={-370} r={56} fill="#5a0a0a" />
    <path d="M-40 -410 Q-80 -470 -60 -500 Q-50 -460 -20 -420 M40 -410 Q80 -470 60 -500 Q50 -460 20 -420" fill="#1a0a0a" stroke="#1a0a0a" strokeWidth={8} />
    <ellipse cx={-20} cy={-376} rx={10} ry={6} fill="#ffcf3a" /><ellipse cx={20} cy={-376} rx={10} ry={6} fill="#ffcf3a" />
    <path d="M-24 -340 Q0 -324 24 -340" stroke="#000" strokeWidth={5} fill="none" />
    <path d={`M60 -40 Q160 ${-20 + Math.sin(f / 5) * 30} 180 -120 L200 -110 L190 -140 Z`} stroke="#3a0606" strokeWidth={12} fill="#3a0606" />
  </g>
);

const Jack: React.FC<{ f: number; s?: number; lantern?: boolean }> = ({ f, s = 1, lantern }) => (
  <g transform={`scale(${s})`}>
    <path d="M-40 0 L-36 -260 L36 -260 L40 0 Z" fill="#2a2a20" />
    <circle cx={0} cy={-300} r={40} fill="#c8a888" />
    <path d="M-50 -320 L50 -320 L40 -350 L-40 -350 Z M-30 -350 L-24 -400 L24 -400 L30 -350 Z" fill="#1a1a14" />
    <path d="M-18 -300 L-6 -298 M18 -300 L6 -298" stroke="#000" strokeWidth={4} />
    <path d="M-14 -280 Q0 -272 14 -284" stroke="#3a1a1a" strokeWidth={4} fill="none" />
    <path d="M36 -220 L100 -150" stroke="#2a2a20" strokeWidth={22} strokeLinecap="round" />
    {lantern && <g transform="translate(110 -120) scale(0.25)"><JackO f={f} turnip /></g>}
  </g>
);

const SJack: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0604" />
    <circle cx={720} cy={760} r={420} fill={BLOOD} opacity={0.12 + Math.sin(f / 4) * 0.04} />
    <rect x={120} y={880} width={840} height={40} fill="#3a2414" />
    <g transform="translate(320 1150)"><Jack f={f} /></g>
    <g transform="translate(760 1150)"><Devil f={f} /></g>
    <g transform="translate(540 860)"><circle r={18} fill={GOLD} /><circle cx={30} cy={6} r={16} fill={GOLD} /></g>
    <path d="M540 360 L540 600 M480 440 L600 440" stroke={GOLD} strokeWidth={12} opacity={0.25 + Math.sin(f / 6) * 0.15} />
  </svg>
);

const Turnip: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Night f={f} id="hw4" top="#0e1018" moon={false} />
    <path d="M0 1150 L1080 1150 V1920 H0 Z" fill="#06080a" />
    {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${i * 140} 1150 L${i * 140 + 30} ${640 + (i % 3) * 90} L${i * 140 + 60} 1150`} fill="#04060a" />)}
    <g transform={`translate(${200 + (f % 300) * 1.4} 1150) scale(1.15)`}><Jack f={f} lantern /></g>
    {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={120 + i * 100} cy={1200 + (i % 2) * 20} r={70} fill="#9ab8d0" opacity={0.05} />)}
  </svg>
);

const Pumpkin: React.FC<ShotProps> = ({ f, dur }) => {
  const m = clamp((f - dur * 0.35) / (dur * 0.3));
  return (
    <svg width={W} height={H}>
      <Night f={f} id="hw5" top="#24142a" />
      <rect y={1100} width={W} height={H} fill="#0a0608" />
      <g transform="translate(540 880)" opacity={1 - m}><JackO f={f} turnip s={1.2} /></g>
      <g transform="translate(540 880)" opacity={m}><JackO f={f} s={1.15} /></g>
      {[[160, 1080], [920, 1070], [300, 1120], [780, 1120]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y}) scale(0.32)`} opacity={m}><JackO f={f + i * 5} /></g>)}
    </svg>
  );
};

const HDoor: React.FC<ShotProps> = ({ f, dur }) => {
  const knock = f < dur * 0.5 && (f % 22) < 6;
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#140c08" />
      <circle cx={540} cy={700} r={480} fill={FIRE} opacity={0.06} />
      <g transform={`translate(${knock ? 4 : 0} 0)`}>
        <rect x={300} y={360} width={480} height={790} fill="#3a2010" stroke="#1a0c06" strokeWidth={14} />
        {[480, 800].map((y) => <rect key={y} x={350} y={y - 90} width={380} height={230} fill="none" stroke="#1a0c06" strokeWidth={8} />)}
        <circle cx={720} cy={780} r={18} fill={GOLD} />
        <rect x={380} y={520} width={140} height={70} fill="#000" />
      </g>
      <g opacity={f > dur * 0.5 ? 0.9 : 0}><ellipse cx={430} cy={556} rx={10} ry={6} fill={BLOOD} /><ellipse cx={470} cy={556} rx={10} ry={6} fill={BLOOD} /></g>
      {knock && <text x={540} y={300} textAnchor="middle" fontFamily="Rozha" fontSize={80} fill={BONE}>ठक! ठक!</text>}
      <g transform="translate(540 1220) scale(0.3)"><JackO f={f} /></g>
    </svg>
  );
};

/* ---------- BHOOT CHATURDASHI ---------- */
const BengalHouse: React.FC<{ x: number; s?: number; f: number }> = ({ x, s = 1, f }) => (
  <g transform={`translate(${x} 1150) scale(${s})`}>
    <rect x={-160} y={-220} width={320} height={220} fill="#2a1a12" />
    <path d="M-200 -220 Q0 -340 200 -220 Z" fill="#1a1008" />
    <rect x={-40} y={-140} width={80} height={140} fill="#0a0604" />
    {[-120, 120].map((dx, i) => <rect key={i} x={dx - 30} y={-170} width={60} height={60} fill="#ffb43a" opacity={0.6} />)}
    {Array.from({ length: 7 }).map((_, i) => <Diya key={i} x={-150 + i * 50} y={4} f={f} i={i} s={0.6} />)}
  </g>
);

const BC14: React.FC<ShotProps> = ({ f, dur }) => {
  const n = Math.min(14, Math.floor(clamp(f / (dur * 0.7)) * 15));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#060304" />
      {Array.from({ length: 14 }).map((_, i) => { const a = (i / 14) * Math.PI * 2 - Math.PI / 2; return i < n ? <Diya key={i} x={540 + Math.cos(a) * 330} y={760 + Math.sin(a) * 330} f={f} i={i} s={1.2} /> : null; })}
      <text x={540} y={820} textAnchor="middle" fontFamily="Rozha" fontSize={200} fill={GOLD} opacity={0.85}>{n}</text>
    </svg>
  );
};

const BCNight: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Night f={f} id="bc1" top="#0a0a1a" moon={false} />
    {Array.from({ length: 9 }).map((_, i) => <g key={i} transform={`translate(${i * 130} 1150)`}><path d={`M0 0 L0 -${300 + (i % 3) * 80}`} stroke="#04060a" strokeWidth={14} />{[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M0 -${300 + (i % 3) * 80} q${(k - 2) * 40} 20 ${(k - 2) * 90} ${70 + Math.abs(k - 2) * 10}`} stroke="#04060a" strokeWidth={18} fill="none" strokeLinecap="round" />)}</g>)}
    <BengalHouse x={540} f={f} />
    <rect y={1150} width={W} height={H} fill="#050304" />
    <path d="M0 1240 Q540 1200 1080 1240 V1300 H0 Z" fill="#0a1418" />
  </svg>
);

const Ancestors: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <Night f={f} id="bc2" top="#0e1426" moon={false} />
      <path d="M540 0 L300 1150 L780 1150 Z" fill="#cfe0f0" opacity={0.06} />
      {Array.from({ length: 14 }).map((_, i) => { const y = 200 + ((i * 80 + t * 600) % 900); return <g key={i} transform={`translate(${540 + Math.sin(i * 1.7) * 220} ${y}) scale(${0.35 + (y / 1150) * 0.4})`} opacity={0.15 + (y / 1150) * 0.4}><path d="M-40 0 L-30 -180 L30 -180 L40 0 Z" fill="#dfe8f0" /><circle cx={0} cy={-210} r={30} fill="#dfe8f0" /></g>; })}
      <BengalHouse x={540} s={0.8} f={f} />
      <rect y={1150} width={W} height={H} fill="#050304" />
    </svg>
  );
};

const BCDiyas: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0604" />
    <rect x={0} y={900} width={W} height={260} fill="#2a1a10" />
    {Array.from({ length: 7 }).map((_, i) => <Diya key={i} x={120 + i * 140} y={900} f={f} i={i} s={1.3} />)}
    {Array.from({ length: 7 }).map((_, i) => <Diya key={i + 7} x={190 + i * 140} y={1150} f={f} i={i + 7} s={1.1} />)}
    <rect x={380} y={300} width={320} height={500} fill="#1a0e08" stroke="#3a2010" strokeWidth={14} />
    <rect x={400} y={320} width={280} height={460} fill="#ffb43a" opacity={0.08} />
  </svg>
);

const Saag: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0e0a06" />
    <circle cx={540} cy={800} r={400} fill="#ffb43a" opacity={0.06} />
    <ellipse cx={540} cy={860} rx={360} ry={110} fill="#c8b8a0" />
    <ellipse cx={540} cy={850} rx={330} ry={90} fill="#e8dcc8" />
    {Array.from({ length: 14 }).map((_, i) => { const a = (i / 14) * Math.PI * 2; return <g key={i} transform={`translate(${540 + Math.cos(a) * 220} ${850 + Math.sin(a) * 55}) rotate(${a * 57})`}><path d="M0 0 Q20 -40 0 -80 Q-20 -40 0 0 Z" fill={["#2a6a2a", "#3a8a3a", "#4a7a1a", "#2a5a3a"][i % 4]} /><path d="M0 0 L0 -70" stroke="#1a3a1a" strokeWidth={2} /></g>; })}
    <text x={540} y={1080} textAnchor="middle" fontFamily="Rozha" fontSize={70} fill={GOLD}>चौदह शाक</text>
  </svg>
);

const BCSpirits: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Night f={f} id="bc3" top="#100a1a" moon={false} />
    <rect y={1100} width={W} height={H} fill="#050304" />
    {Array.from({ length: 6 }).map((_, i) => <g key={i} transform={`translate(${150 + i * 160 + Math.sin(f / 15 + i) * 40} ${500 + (i % 3) * 160})`}><Ghost f={f} s={0.7 + (i % 2) * 0.3} o={0.45} ph={i} /></g>)}
    <g transform="translate(540 1100)"><path d="M-160 0 C-200 -200 -140 -420 0 -460 C140 -420 200 -200 160 0 Z" fill="#000" /><path d="M-90 -380 C-130 -260 -150 -120 -170 40 M90 -380 C130 -260 150 -120 170 40" stroke="#1a1a1a" strokeWidth={14} fill="none" /><ellipse cx={-36} cy={-360} rx={14} ry={8} fill={BLOOD} /><ellipse cx={36} cy={-360} rx={14} ry={8} fill={BLOOD} /></g>
  </svg>
);

const YamaDiya: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Night f={f} id="bc4" top="#0a0a14" moon={false} />
    <rect y={1150} width={W} height={H} fill="#0a0806" />
    <rect x={240} y={500} width={600} height={650} fill="#1a120c" />
    <rect x={440} y={760} width={200} height={390} fill="#0a0604" />
    <g transform="translate(540 1060)"><Diya x={0} y={0} f={f} s={2.2} /></g>
    <g transform="translate(540 1150)" opacity={0.6}>{[0, 1, 2, 3].map((k) => <path key={k} d={`M0 -50 L${(k - 1.5) * 30} -110`} stroke="#ffcf3a" strokeWidth={4} transform={`rotate(${180})`} />)}</g>
    <text x={540} y={420} textAnchor="middle" fontFamily="Rozha" fontSize={70} fill={GOLD} opacity={0.8}>यम दीपक</text>
  </svg>
);

/* ---------- AHOI ASHTAMI (warm, devotional) ---------- */
export const Woman: React.FC<{ f: number; s?: number; pose?: "stand" | "dig" | "pray" | "cry" | "kneel"; saree?: string }> = ({ f, s = 1, pose = "stand", saree = "#c0281a" }) => {
  const skin = "#c8906a";
  const bob = pose === "dig" ? Math.abs(Math.sin(f / 5)) * 20 : 0;
  const k = pose === "kneel" || pose === "pray";
  return (
    <g transform={`scale(${s})`}>
      <path d={k ? "M-90 0 L-60 -180 L60 -180 L90 0 Z" : "M-80 0 L-50 -300 L50 -300 L80 0 Z"} fill={saree} />
      <path d={k ? "M-60 -180 L70 -60 L90 0 L40 0 Z" : "M-50 -300 L80 -60 L80 0 L40 0 L-10 -280 Z"} fill="#e8b030" opacity={0.85} />
      <g transform={`translate(0 ${k ? 120 : 0})`}>
        <path d="M-46 -300 L46 -300 L40 -420 L-40 -420 Z" fill={saree} />
        <circle cx={0} cy={-460} r={40} fill={skin} />
        <path d="M-44 -470 Q0 -530 44 -470 L50 -420 Q30 -440 0 -444 Q-30 -440 -50 -420 Z" fill="#e8b030" opacity={0.9} />
        <circle cx={0} cy={-470} r={5} fill="#c0101a" />
        <path d="M-16 -458 L-6 -456 M16 -458 L6 -456" stroke="#2a1a0a" strokeWidth={3} />
        {pose === "cry" && <path d="M-12 -450 L-14 -430 M12 -450 L14 -430" stroke="#9ad8ff" strokeWidth={3} />}
        {pose === "pray" ? <path d="M-30 -380 L0 -340 L30 -380" stroke={skin} strokeWidth={16} fill="none" strokeLinecap="round" />
          : pose === "dig" ? <g transform={`translate(0 ${bob})`}><path d="M40 -400 L120 -300" stroke={skin} strokeWidth={16} strokeLinecap="round" /><path d="M110 -330 L180 -120" stroke="#6a4a24" strokeWidth={12} /><path d="M160 -140 L210 -100 L190 -80 L150 -120 Z" fill="#8a8a90" /></g>
          : pose === "cry" ? <path d="M-40 -400 L-20 -450 M40 -400 L20 -450" stroke={skin} strokeWidth={16} strokeLinecap="round" />
          : <path d="M-40 -400 L-70 -300 M40 -400 L70 -300" stroke={skin} strokeWidth={16} strokeLinecap="round" />}
      </g>
    </g>
  );
};

export const Child: React.FC<{ s?: number; c?: string; o?: number }> = ({ s = 1, c = "#3a5a9a", o = 1 }) => (
  <g transform={`scale(${s})`} opacity={o}>
    <path d="M-14 0 L-10 -70 M14 0 L10 -70" stroke="#c8906a" strokeWidth={14} strokeLinecap="round" />
    <path d="M-30 -70 L30 -70 L24 -170 L-24 -170 Z" fill={c} />
    <circle cx={0} cy={-200} r={30} fill="#c8906a" />
    <path d="M-30 -210 Q0 -250 30 -210" fill="#1a0a0a" />
  </g>
);

const Saahi: React.FC<{ f: number; s?: number; baby?: boolean; sad?: boolean }> = ({ f, s = 1, baby, sad }) => (
  <g transform={`scale(${s})`}>
    {Array.from({ length: 26 }).map((_, i) => { const a = Math.PI + (i / 25) * Math.PI; const r = baby ? 70 : 120; return <path key={i} d={`M${Math.cos(a) * 40} ${Math.sin(a) * 30} L${Math.cos(a) * (r + (i % 2) * 30)} ${Math.sin(a) * (r * 0.8 + (i % 2) * 24)}`} stroke={i % 2 ? "#e8dcc0" : "#3a2a1a"} strokeWidth={baby ? 4 : 6} />; })}
    <ellipse cx={0} cy={0} rx={baby ? 60 : 100} ry={baby ? 40 : 66} fill="#5a4030" />
    <ellipse cx={baby ? -56 : -94} cy={10} rx={baby ? 24 : 38} ry={baby ? 18 : 28} fill="#7a5a40" />
    <circle cx={baby ? -66 : -110} cy={4} r={baby ? 4 : 6} fill="#000" />
    {sad && <path d="M-110 14 L-112 30" stroke="#9ad8ff" strokeWidth={3} />}
    <circle cx={baby ? -78 : -128} cy={14} r={baby ? 4 : 6} fill="#2a1a10" />
  </g>
);

const Village: React.FC<{ f: number; id: string; dusk?: boolean }> = ({ f, id, dusk }) => (
  <>
    <Sky top={dusk ? "#3a1a3a" : "#f0c080"} bottom={dusk ? "#c86a3a" : "#f8e0b0"} id={id} />
    <circle cx={780} cy={dusk ? 760 : 360} r={110} fill={dusk ? "#ff9a4a" : "#fff0c0"} opacity={0.9} />
    <path d="M0 980 Q270 920 540 960 T1080 940 V1150 H0 Z" fill={dusk ? "#5a3020" : "#c8a060"} />
    <rect y={1150} width={W} height={H} fill={dusk ? "#3a2014" : "#a87a40"} />
  </>
);

export const Haveli: React.FC<{ x: number; s?: number }> = ({ x, s = 1 }) => (
  <g transform={`translate(${x} 1150) scale(${s})`}>
    <rect x={-220} y={-320} width={440} height={320} fill="#e8c890" stroke="#a8743a" strokeWidth={6} />
    <path d="M-250 -320 L250 -320 L220 -360 L-220 -360 Z" fill="#a8541c" />
    {[-140, 0, 140].map((dx, i) => <path key={i} d={`M${dx - 40} -200 L${dx - 40} -270 Q${dx} -310 ${dx + 40} -270 L${dx + 40} -200 Z`} fill="#6a3a1a" />)}
    <path d="M-50 0 L-50 -120 Q0 -170 50 -120 L50 0 Z" fill="#5a2a10" />
    {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M${-200 + i * 50} -320 l25 30 l25 -30`} fill="none" stroke="#c0281a" strokeWidth={4} />)}
  </g>
);

const AhoiStars: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#0a1240" bottom="#3a2a5a" id="ah1" />
    {Array.from({ length: 70 }).map((_, i) => <g key={i}><circle cx={random(`as${i}`) * W} cy={random(`at${i}`) * 900} r={1.5 + random(`au${i}`) * 3} fill="#fff" opacity={0.5 + Math.sin(f / 6 + i) * 0.4} /></g>)}
    <path d="M0 1050 Q540 1000 1080 1050 V1920 H0 Z" fill="#1a1028" />
    <g transform="translate(540 1150)"><Woman f={f} pose="stand" s={1.1} /></g>
    <g transform="translate(640 780)"><path d="M0 0 Q30 -60 0 -120" stroke="#c8906a" strokeWidth={14} fill="none" /><path d="M-30 -130 L30 -130 L20 -170 L-20 -170 Z" fill="#c8a040" />{Array.from({ length: 5 }).map((_, i) => <circle key={i} cx={0} cy={-120 + ((f * 4 + i * 30) % 160)} r={4} fill="#9ad8ff" opacity={0.7} />)}</g>
    {[250, 840].map((x, i) => <Diya key={i} x={x} y={1150} f={f} i={i} s={1.4} />)}
  </svg>
);

const SevenSons: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Village f={f} id="ah2" />
    <Haveli x={540} s={1.1} />
    <g transform="translate(200 1160) scale(0.8)"><Woman f={f} /></g>
    <g transform="translate(330 1160)"><path d="M-40 0 L-36 -280 L36 -280 L40 0 Z" fill="#f4f0e8" /><circle cx={0} cy={-320} r={40} fill="#c8906a" /><path d="M-46 -340 Q0 -390 46 -340 L40 -320 L-40 -320 Z" fill="#e8a020" /></g>
    {Array.from({ length: 7 }).map((_, i) => <g key={i} transform={`translate(${470 + i * 80} ${1160 + Math.abs(Math.sin(f / 6 + i)) * -8})`}><Child s={0.75 + (i % 3) * 0.1} c={["#3a5a9a", "#2a8a5a", "#9a3a5a", "#c8801a", "#5a3a9a", "#1a7a8a", "#8a5a2a"][i]} /></g>)}
  </svg>
);

const AhoiForest: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#9ac8a0" bottom="#e8e0b0" id="ah3" />
    {Array.from({ length: 9 }).map((_, i) => <g key={i} transform={`translate(${i * 130 + 10} 1150)`}><rect x={-16} y={-360} width={32} height={360} fill="#5a3a1a" /><circle cx={0} cy={-420 - (i % 3) * 40} r={110} fill={["#2a6a2a", "#3a7a2a", "#4a8a3a"][i % 3]} /></g>)}
    <rect y={1150} width={W} height={H} fill="#8a6030" />
    <g transform={`translate(${200 + Math.min(f, 60) * 3} 1160)`}><Woman f={f} /></g>
    <g transform={`translate(${290 + Math.min(f, 60) * 3} 900)`}><ellipse rx={50} ry={20} fill="#b8743a" /></g>
  </svg>
);

const AhoiDig: React.FC<ShotProps> = ({ f, dur }) => {
  const hit = f > dur * 0.5;
  return (
    <svg width={W} height={H}>
      <Sky top="#9ac8a0" bottom="#e8e0b0" id="ah4" />
      {Array.from({ length: 6 }).map((_, i) => <g key={i} transform={`translate(${i * 200 + 40} 1150)`}><rect x={-16} y={-300} width={32} height={300} fill="#5a3a1a" /><circle cx={0} cy={-360} r={100} fill="#3a7a2a" /></g>)}
      <rect y={1100} width={W} height={H} fill="#8a6030" />
      <path d="M540 1100 Q640 1060 760 1100 Z" fill="#6a4020" />
      <g transform="translate(400 1150)"><Woman f={hit ? 0 : f} pose={hit ? "cry" : "dig"} /></g>
      <g transform="translate(680 1110)"><ellipse rx={80} ry={30} fill="#3a2010" /></g>
      {hit && <g transform="translate(680 1100) scale(0.9)"><Saahi f={f} baby /></g>}
      {hit && <circle cx={680} cy={1080} r={160} fill="#fff" opacity={0.08 + Math.sin(f / 4) * 0.04} />}
    </svg>
  );
};

const SaahiShot: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#4a3a5a" bottom="#c8906a" id="ah5" />
    <rect y={1100} width={W} height={H} fill="#5a3a20" />
    <circle cx={540} cy={820} r={400} fill="#fff0c0" opacity={0.08} />
    <g transform="translate(540 1000) scale(2.2)"><Saahi f={f} sad /></g>
    <g transform="translate(720 1080) scale(0.9)"><Saahi f={f} baby /></g>
    <g transform="translate(180 1150) scale(0.8)"><Woman f={f} pose="cry" /></g>
  </svg>
);

const SonsGone: React.FC<ShotProps> = ({ f, dur }) => {
  const gone = Math.min(7, Math.floor(clamp(f / (dur * 0.8)) * 8));
  return (
    <svg width={W} height={H}>
      <Village f={f} id="ah6" dusk />
      <Haveli x={540} s={1.1} />
      {Array.from({ length: 7 }).map((_, i) => <g key={i} transform={`translate(${300 + i * 80} 1160)`}><Child s={0.8} c="#5a4a6a" o={i < gone ? 0.08 : 0.9} /></g>)}
      <g transform="translate(180 1160) scale(0.85)"><Woman f={f} pose="cry" saree="#6a2a3a" /></g>
      {Array.from({ length: 7 }).map((_, i) => i < gone ? <Diya key={i} x={300 + i * 80} y={1230} f={f} i={i} s={0.7} /> : null)}
    </svg>
  );
};

const AhoiArt: React.FC<{ f: number; s?: number; glow?: number }> = ({ f, s = 1, glow = 0 }) => (
  <g transform={`scale(${s})`}>
    <circle r={420} fill={GOLD} opacity={glow * 0.15} />
    <path d="M-160 -360 L160 -360 L360 -160 L360 160 L160 360 L-160 360 L-360 160 L-360 -160 Z" fill="none" stroke={GERU} strokeWidth={14} />
    <path d="M-120 -300 L120 -300 L300 -120 L300 120 L120 300 L-120 300 L-300 120 L-300 -120 Z" fill="none" stroke={GERU} strokeWidth={6} />
    {Array.from({ length: 8 }).map((_, i) => { const a = (i / 8) * Math.PI * 2; return <g key={i} transform={`translate(${Math.cos(a) * 330} ${Math.sin(a) * 330})`}><circle r={10} fill={GERU} /></g>; })}
    <g transform="translate(0 -40)" stroke={GERU} strokeWidth={8} fill="none">
      <circle cx={0} cy={-150} r={44} />
      <path d="M-30 -110 L-90 120 L90 120 L30 -110" />
      <path d="M-36 -40 L-110 -80 M36 -40 L110 -80" />
      <path d="M-40 -190 L-20 -230 L0 -200 L20 -230 L40 -190" />
      <circle cx={-14} cy={-152} r={4} fill={GERU} /><circle cx={14} cy={-152} r={4} fill={GERU} />
      {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M${-70 + i * 35} 30 l15 25 l15 -25`} />)}
    </g>
    <g transform="translate(-170 200) scale(0.7)" stroke={GERU} strokeWidth={8} fill="none">
      <ellipse rx={100} ry={60} />
      {Array.from({ length: 9 }).map((_, i) => { const a = Math.PI + (i / 8) * Math.PI; return <path key={i} d={`M${Math.cos(a) * 90} ${Math.sin(a) * 55} L${Math.cos(a) * 150} ${Math.sin(a) * 100}`} />; })}
      <circle cx={-110} cy={0} r={20} />
    </g>
    {[0, 1, 2].map((k) => <g key={k} transform={`translate(${80 + k * 70} 230) scale(0.32)`} stroke={GERU} strokeWidth={14} fill="none"><ellipse rx={100} ry={60} />{Array.from({ length: 7 }).map((_, i) => { const a = Math.PI + (i / 6) * Math.PI; return <path key={i} d={`M${Math.cos(a) * 90} ${Math.sin(a) * 55} L${Math.cos(a) * 150} ${Math.sin(a) * 100}`} />; })}</g>)}
    {[[-230, -230], [230, -230]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`} fill={GERU}>{i ? <path d="M-24 -10 A30 30 0 1 0 10 -30 A22 22 0 1 1 -24 -10 Z" /> : <path d="M0 -30 L8 -8 L30 0 L8 8 L0 30 L-8 8 L-30 0 L-8 -8 Z" />}</g>)}
  </g>
);

const AhoiWall: React.FC<ShotProps> = ({ f, dur }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill={CREAM} />
    <rect width={W} height={H} fill="#c89a5a" opacity={0.15} />
    {Array.from({ length: 40 }).map((_, i) => <circle key={i} cx={random(`wl${i}`) * W} cy={random(`wm${i}`) * 1150} r={6 + random(`wn${i}`) * 14} fill="#c8a070" opacity={0.08} />)}
    <g transform="translate(540 720) scale(1.05)"><AhoiArt f={f} glow={0.5 + Math.sin(f / 8) * 0.3} /></g>
    <rect y={1150} width={W} height={H} fill="#5a3a20" />
    {[200, 380, 700, 880].map((x, i) => <Diya key={i} x={x} y={1150} f={f} i={i} s={1.4} />)}
    <g transform="translate(540 1150)"><ellipse rx={90} ry={20} fill="#c8a040" /><circle cy={-20} r={30} fill="#e8c060" /></g>
  </svg>
);

const AhoiReturn: React.FC<ShotProps> = ({ f, dur }) => {
  const back = Math.min(7, Math.floor(clamp((f - dur * 0.2) / (dur * 0.6)) * 8));
  return (
    <svg width={W} height={H}>
      <Village f={f} id="ah7" />
      <circle cx={540} cy={600} r={500} fill={GOLD} opacity={0.12 + Math.sin(f / 8) * 0.04} />
      {Array.from({ length: 16 }).map((_, i) => { const a = (i / 16) * Math.PI * 2 + f / 80; return <path key={i} d={`M540 600 L${540 + Math.cos(a) * 700} ${600 + Math.sin(a) * 700}`} stroke="#fff4c0" strokeWidth={6} opacity={0.08} />; })}
      <Haveli x={540} s={1.1} />
      <g transform="translate(180 1160) scale(0.85)"><Woman f={f} pose="pray" /></g>
      {Array.from({ length: 7 }).map((_, i) => <g key={i} transform={`translate(${330 + i * 85} 1160)`}><Child s={0.8} c={["#3a5a9a", "#2a8a5a", "#9a3a5a", "#c8801a", "#5a3a9a", "#1a7a8a", "#8a5a2a"][i]} o={i < back ? 1 : 0.06} /></g>)}
      {Array.from({ length: 20 }).map((_, i) => <circle key={i} cx={random(`pf${i}`) * W} cy={(random(`pg${i}`) * 900 + f * 3) % 1100} r={8} fill={["#ff7a1a", "#ffcf3a", "#e83a5a"][i % 3]} opacity={0.8} />)}
    </svg>
  );
};

export const SHOTS40: Record<string, React.FC<ShotProps>> = {
  jlantern: JLantern, samhain: Samhain, veil: Veil, masks: Masks, sjack: SJack, turnip: Turnip, pumpkin: Pumpkin, hdoor: HDoor,
  bc14: BC14, bcnight: BCNight, ancestors: Ancestors, bcdiyas: BCDiyas, saag: Saag, bcspirits: BCSpirits, yamadiya: YamaDiya,
  ahoistars: AhoiStars, sevensons: SevenSons, ahoiforest: AhoiForest, ahoidig: AhoiDig, saahi: SaahiShot, sonsgone: SonsGone, ahoiwall: AhoiWall, ahoireturn: AhoiReturn,
};
