import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #6 — Vampire */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BONE = "#ddd5c0";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const Cross: React.FC<{ x: number; y: number; s: number; tilt: number }> = ({ x, y, s, tilt }) => (
  <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}><rect x={-12} y={-160} width={24} height={180} fill={INK} stroke="#5a6a70" strokeOpacity={0.6} strokeWidth={3} /><rect x={-60} y={-120} width={120} height={22} fill={INK} stroke="#5a6a70" strokeOpacity={0.6} strokeWidth={3} /></g>
);

const Graveyard: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a1820" bottom="#040204" id="v1" />
    <Moon x={540} y={420} r={130} f={f} />
    <path d="M0 1050 Q540 960 1080 1050 V1920 H0 Z" fill="#070407" />
    <path d="M820 1050 L820 640 Q820 560 900 560 L1080 560 L1080 1050 Z" fill="#050305" />
    <path d="M760 660 L880 520 L1000 660 Z" fill="#050305" />
    {[[150, 1120, 1.1, -6], [330, 1080, 0.9, 4], [520, 1140, 1.2, -2], [700, 1090, 0.85, 8], [900, 1150, 1.15, -4]].map(([x, y, s, t], i) => <Cross key={i} x={x} y={y} s={s} tilt={t} />)}
    {[[250, 1220], [620, 1250], [860, 1230]].map(([x, y], i) => <path key={i} d={`M${x - 60} ${y} L${x - 60} ${y - 110} Q${x} ${y - 170} ${x + 60} ${y - 110} L${x + 60} ${y} Z`} fill="#0a080a" stroke="#5a6a70" strokeOpacity={0.5} strokeWidth={3} />)}
    {Array.from({ length: 6 }).map((_, i) => {
      const t = (f * 2 + i * 50) % 300;
      return <path key={i} d={`M${((i * 190) % 1100)} ${400 - t * 0.3} q20 -14 40 0 q-20 6 -40 0 M${((i * 190) % 1100) + 40} ${400 - t * 0.3} q20 -14 40 0`} stroke={INK} strokeWidth={6} fill="none" transform={`translate(${t * 3} 0)`} />;
    })}
  </svg>
);

const Village: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a1a24" bottom="#030304" id="v2" />
    <Moon x={820} y={330} r={70} f={f} />
    <path d="M0 1150 Q540 1080 1080 1150 V1920 H0 Z" fill="#060506" />
    {[[60, 260, 260], [340, 220, 300], [600, 260, 240], [860, 230, 280]].map(([x, w, h], i) => (
      <g key={i}>
        <rect x={x} y={1150 - h} width={w} height={h} fill="#0a0708" stroke="#4a3a40" strokeOpacity={0.5} strokeWidth={3} />
        <path d={`M${x - 20} ${1150 - h} L${x + w / 2} ${1150 - h - 140} L${x + w + 20} ${1150 - h} Z`} fill="#070506" />
        <rect x={x + w / 2 - 30} y={1150 - h + 60} width={60} height={60} fill={i === 2 ? "#ffb43a" : "#1a1214"} opacity={i === 2 ? 0.6 + 0.3 * Math.sin(f / 3) : 1} />
      </g>
    ))}
    {Array.from({ length: 9 }).map((_, i) => <g key={i} transform={`translate(${120 + i * 105} 1320)`}><path d="M-24 0 L-16 -90 Q0 -110 16 -90 L24 0 Z" fill={INK} /><circle cx={0} cy={-108} r={14} fill={INK} /></g>)}
    <text x={540} y={1450} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={54} fill={BLOOD} opacity={clamp((f - 20) / 15)}>9 DEAD · 8 DAYS</text>
  </svg>
);

export const VampFig: React.FC<{ f: number; eyes?: string; fill?: string }> = ({ f, eyes = "#ff2a2a", fill = INK }) => (
  <g>
    <path d={`M-160 400 C-140 100 -120 -60 -70 -120 L70 -120 C120 -60 140 100 160 400 Z`} fill={fill} stroke="#6a1a20" strokeOpacity={0.7} strokeWidth={4} />
    <path d="M-150 -60 L-90 -200 L0 -150 L90 -200 L150 -60 L80 -110 L-80 -110 Z" fill={fill} stroke="#6a1a20" strokeOpacity={0.7} strokeWidth={4} />
    <ellipse cx={0} cy={-210} rx={56} ry={70} fill="#c8c0b8" />
    <path d="M-56 -230 Q0 -310 56 -230 L40 -250 L0 -235 L-40 -250 Z" fill={fill} />
    <path d="M-30 -220 L-10 -212 M30 -220 L10 -212" stroke={fill} strokeWidth={6} />
    <circle cx={-22} cy={-205} r={7} fill={eyes} /><circle cx={22} cy={-205} r={7} fill={eyes} />
    <path d="M-22 -170 Q0 -160 22 -170" stroke="#4a0a10" strokeWidth={4} fill="none" />
    <path d="M-14 -168 l4 16 l4 -15 M6 -167 l4 15 l4 -16" fill="#f4eee0" />
    <path d={`M-160 400 L-200 ${420 + Math.sin(f / 9) * 10} M160 400 L200 ${420 + Math.sin(f / 9 + 1) * 10}`} stroke={fill} strokeWidth={20} />
  </g>
);

const VWindow: React.FC<ShotProps> = ({ f, scene }) => {
  const appear = clamp((f - 8) / 20);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#060405" />
      <g transform="translate(540 820)">
        <rect x={-330} y={-460} width={660} height={860} fill="#1a2030" />
        <circle cx={160} cy={-280} r={90} fill="#dfe0e8" opacity={0.7} />
        <g transform={`translate(${-40} ${120}) scale(${0.95 + appear * 0.25})`} opacity={appear}><VampFig f={f} /></g>
        <rect x={-340} y={-470} width={680} height={880} fill="none" stroke="#0a0607" strokeWidth={40} />
        <line x1={0} y1={-460} x2={0} y2={400} stroke="#0a0607" strokeWidth={22} />
        <line x1={-330} y1={-30} x2={330} y2={-30} stroke="#0a0607" strokeWidth={22} />
        {scene === 2 && <path d={`M-200 ${300 - f} l-10 -60 l10 0 l6 40 l6 -50 l10 0 l2 50 l8 -46 l10 2 l-4 50 Z`} fill="#000" />}
      </g>
      <rect x={0} y={1300} width={W} height={620} fill="#050304" />
    </svg>
  );
};

const Exhume: React.FC<ShotProps> = ({ f }) => {
  const open = clamp((f - 10) / 30);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#070405" />
      <circle cx={540} cy={420} r={300} fill="#ffb43a" opacity={0.12} />
      <path d="M90 520 L990 520 L1000 1350 L80 1350 Z" fill="#140c08" />
      <g transform="translate(540 940)">
        <path d="M-200 -380 L200 -380 L250 -100 L170 380 L-170 380 L-250 -100 Z" fill="#2a1a10" stroke="#5a3a20" strokeWidth={6} />
        <path d="M-170 -340 L170 -340 L210 -100 L140 340 L-140 340 L-210 -100 Z" fill="#0a0604" />
        <ellipse cx={0} cy={-240} rx={70} ry={86} fill="#a8a094" />
        <circle cx={-26} cy={-250} r={9} fill="#2a0a0a" /><circle cx={26} cy={-250} r={9} fill="#2a0a0a" />
        <path d="M-30 -190 Q0 -176 30 -190" stroke={BLOOD} strokeWidth={8} fill="none" />
        <path d="M-10 -186 L-14 -150 M10 -186 L16 -140" stroke={BLOOD} strokeWidth={6} />
        <path d="M-110 -150 L110 -150 L120 300 L-120 300 Z" fill="#1a1414" />
        {[-1, 1].map((d) => <g key={d}>{[0, 1, 2, 3].map((k) => <path key={k} d={`M${d * 60 + k * 10 * d} 40 l${d * 6} 40`} stroke="#a8a094" strokeWidth={6} />)}</g>)}
        <g transform={`translate(${open * 380} ${-open * 60}) rotate(${open * 25})`}>
          <path d="M-200 -380 L200 -380 L250 -100 L170 380 L-170 380 L-250 -100 Z" fill="#3a2414" stroke="#5a3a20" strokeWidth={6} opacity={0.95} />
          <path d="M0 -300 L0 200 M-90 -150 L90 -150" stroke="#1a0e06" strokeWidth={14} />
        </g>
      </g>
      {Array.from({ length: 5 }).map((_, i) => <g key={i} transform={`translate(${130 + i * 200} 380)`}><path d="M-20 0 L-14 -100 Q0 -116 14 -100 L20 0 Z" fill={INK} /><circle cx={0} cy={-118} r={13} fill={INK} /></g>)}
    </svg>
  );
};

const Stake: React.FC<ShotProps> = ({ f }) => {
  const hits = Math.floor(f / 18);
  const sink = Math.min(4, hits) * 30;
  const impact = f % 18 < 3;
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#050203" />
      <path d="M240 1300 Q540 1200 840 1300 L840 1500 L240 1500 Z" fill="#1a1414" />
      <ellipse cx={540} cy={1260} rx={260} ry={90} fill="#2a2020" />
      <g transform={`translate(540 ${700 + sink})`}>
        <path d="M-26 0 L26 0 L14 520 L0 580 L-14 520 Z" fill="#8a6a4a" stroke="#3a2a1a" strokeWidth={4} />
      </g>
      <g transform={`translate(560 ${impact ? 640 + sink : 420 + sink}) rotate(${impact ? 0 : -30})`}>
        <rect x={-14} y={-20} width={28} height={300} fill="#5a3a20" transform="rotate(70)" />
        <rect x={-90} y={-60} width={180} height={90} rx={10} fill="#3a3a40" />
      </g>
      {impact && hits > 0 && Array.from({ length: 16 }).map((_, i) => {
        const a = random(`sk${hits}${i}`) * Math.PI * 2, d = 40 + random(`sd${hits}${i}`) * 220;
        return <circle key={i} cx={540 + Math.cos(a) * d} cy={1250 + Math.sin(a) * d * 0.4} r={6 + random(`sr${i}`) * 12} fill={BLOOD} />;
      })}
      {hits > 1 && <ellipse cx={540} cy={1280} rx={120 + hits * 30} ry={30 + hits * 8} fill={BLOOD} opacity={0.75} />}
    </svg>
  );
};

const Newspaper: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0806" />
    <g transform={`translate(540 860) rotate(${-5 + f * 0.05}) scale(${0.9 + Math.min(f, 40) * 0.004})`}>
      <rect x={-420} y={-560} width={840} height={1120} fill="#d8ccb0" />
      <text x={0} y={-450} textAnchor="middle" fontFamily="Fell" fontSize={58} fill="#2a2018">Wienerisches Diarium</text>
      <line x1={-380} y1={-420} x2={380} y2={-420} stroke="#2a2018" strokeWidth={4} />
      <text x={0} y={-300} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={120} fill="#1a0e08">VAMPYRI</text>
      <text x={0} y={-230} textAnchor="middle" fontFamily="Fell" fontSize={40} fill="#2a2018">Kisiljevo · Anno 1725</text>
      {Array.from({ length: 22 }).map((_, i) => <line key={i} x1={-380} y1={-170 + i * 30} x2={i % 5 === 4 ? 120 : 380} y2={-170 + i * 30} stroke="#5a4a38" strokeWidth={8} strokeDasharray="20 6 40 6" />)}
      <rect x={-380} y={500} width={760} height={6} fill="#2a2018" />
    </g>
  </svg>
);

const VCat: React.FC<ShotProps> = ({ f, dur }) => {
  const p = clamp(f / (dur * 0.6));
  const x = -200 + p * 1480, y = 1080 - Math.sin(p * Math.PI) * 260;
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#060405" />
      {[300, 780].map((x0, i) => <g key={i}><rect x={x0 - 6} y={700} width={12} height={160} fill="#3a2a1a" /><path d={`M${x0 - 14} ${700} Q${x0} ${660 - Math.sin(f / 3 + i) * 10} ${x0 + 14} 700 Z`} fill="#ffb43a" /><circle cx={x0} cy={690} r={70} fill="#ffb43a" opacity={0.15} /></g>)}
      <rect x={160} y={1060} width={760} height={120} fill="#1a1414" />
      <path d="M220 1060 Q540 960 860 1060 Z" fill="#c8c0b0" />
      <ellipse cx={240} cy={1030} rx={50} ry={40} fill="#a8a094" />
      <g transform={`translate(${x} ${y}) rotate(${(p - 0.5) * 30})`}>
        <path d="M-80 0 Q0 -50 80 0 Q60 30 -60 30 Z" fill={INK} />
        <circle cx={90} cy={-14} r={30} fill={INK} />
        <path d="M76 -38 L84 -60 L96 -40 Z M100 -40 L112 -58 L116 -34 Z" fill={INK} />
        <circle cx={100} cy={-16} r={5} fill="#c8ff4a" />
        <path d={`M-80 0 Q-140 -40 -130 -100`} stroke={INK} strokeWidth={12} fill="none" />
        <path d="M-40 20 L-90 60 M40 20 L90 60" stroke={INK} strokeWidth={12} />
      </g>
      {p > 0.5 && <path d="M260 1010 l0 20" stroke={BLOOD} strokeWidth={6} opacity={clamp((p - 0.5) * 4)} />}
    </svg>
  );
};

const Sickle: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#1a120c" />
    {Array.from({ length: 40 }).map((_, i) => <circle key={i} cx={random(`sx${i}`) * W} cy={random(`sy${i}`) * H} r={10 + random(`sr${i}`) * 30} fill="#2a1e14" opacity={0.6} />)}
    <g transform="translate(540 900)">
      <ellipse cx={0} cy={-470} rx={80} ry={96} fill={BONE} />
      <ellipse cx={-28} cy={-480} rx={20} ry={24} fill="#1a120c" /><ellipse cx={28} cy={-480} rx={20} ry={24} fill="#1a120c" />
      <path d="M-30 -410 L30 -410" stroke="#1a120c" strokeWidth={6} strokeDasharray="6 4" />
      <line x1={0} y1={-370} x2={0} y2={120} stroke={BONE} strokeWidth={18} />
      {Array.from({ length: 7 }).map((_, i) => <path key={i} d={`M-120 ${-300 + i * 50} Q0 ${-270 + i * 50} 120 ${-300 + i * 50}`} stroke={BONE} strokeWidth={10} fill="none" />)}
      <path d="M-140 -320 L-200 0 L-180 160 M140 -320 L200 0 L180 160" stroke={BONE} strokeWidth={16} fill="none" />
      <path d="M-80 140 L-100 560 L-110 680 M80 140 L100 560 L110 680" stroke={BONE} strokeWidth={20} fill="none" />
      <path d="M-300 -380 Q-60 -460 140 -340 Q60 -420 -120 -420 L-300 -390 Z" fill="#6a6a6a" stroke="#2a2a2a" strokeWidth={4} />
      <rect x={-420} y={-400} width={140} height={22} fill="#5a3a20" transform="rotate(-8 -350 -390)" />
      <g transform="translate(110 700)"><rect x={-24} y={-10} width={48} height={40} rx={6} fill="#5a5a5a" stroke="#2a2a2a" strokeWidth={4} /><path d="M-14 -10 Q-14 -40 0 -40 Q14 -40 14 -10" stroke="#5a5a5a" strokeWidth={8} fill="none" /></g>
    </g>
    <circle cx={540} cy={460} r={150} fill="none" stroke={BLOOD} strokeWidth={6} opacity={0.5 + 0.5 * Math.sin(f / 6)} />
  </svg>
);

const Science: React.FC<ShotProps> = ({ f }) => {
  const bloat = 1 + 0.15 * clamp(f / 40);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#06100e" />
      {Array.from({ length: 20 }).map((_, i) => <line key={i} x1={0} y1={i * 100} x2={W} y2={i * 100} stroke="#1fd17a" strokeOpacity={0.08} />)}
      {Array.from({ length: 12 }).map((_, i) => <line key={i} x1={i * 100} y1={0} x2={i * 100} y2={H} stroke="#1fd17a" strokeOpacity={0.08} />)}
      <g transform={`translate(540 900) scale(${bloat} 1)`}>
        <ellipse cx={0} cy={-360} rx={90} ry={110} fill="none" stroke="#1fd17a" strokeWidth={5} />
        <path d="M-130 -240 L130 -240 L150 300 L-150 300 Z" fill="none" stroke="#1fd17a" strokeWidth={5} />
        <path d="M-40 -290 Q0 -270 40 -290" stroke={BLOOD} strokeWidth={8} fill="none" />
        {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={(random(`gb${i}`) - 0.5) * 220} cy={(random(`gc${i}`) - 0.3) * 400 - ((f * 2 + i * 20) % 200)} r={10 + random(`gd${i}`) * 14} fill="none" stroke="#9affc8" strokeWidth={3} opacity={0.6} />)}
      </g>
      {["GAS → BLOATING", "BLOOD → MOUTH", "SKIN SHRINKS → NAILS LOOK LONGER"].map((t, i) => <text key={i} x={90} y={1460 + i * 48} fontFamily="Cinzel" fontWeight={900} fontSize={32} fill="#1fd17a" opacity={clamp((f - 10 - i * 20) / 10)}>{t}</text>)}
    </svg>
  );
};

const Garlic: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#070505" />
    <rect x={260} y={420} width={560} height={1000} fill="#2a1a10" stroke="#140c06" strokeWidth={30} />
    {Array.from({ length: 6 }).map((_, i) => <line key={i} x1={260 + i * 112} y1={420} x2={260 + i * 112} y2={1420} stroke="#1a0e06" strokeWidth={6} />)}
    <circle cx={760} cy={940} r={20} fill="#8a7a5a" />
    <g transform={`translate(540 ${400 + Math.sin(f / 15) * 6}) rotate(${Math.sin(f / 20) * 4})`}>
      <line x1={0} y1={-200} x2={0} y2={-20} stroke="#8a7a5a" strokeWidth={4} />
      {[-70, 0, 70].map((x, i) => <g key={i} transform={`translate(${x} ${20 + (i % 2) * 30})`}><path d="M0 -40 C40 -40 50 10 0 50 C-50 10 -40 -40 0 -40 Z" fill="#e8e0cc" stroke="#a89878" strokeWidth={3} /><path d="M0 -40 L0 -70" stroke="#8a7a5a" strokeWidth={6} /><path d="M-14 -20 Q0 40 0 48 M14 -20 Q0 40 0 48" stroke="#a89878" strokeWidth={2} fill="none" /></g>)}
    </g>
    <path d="M0 1500 L1080 1500" stroke="#000" strokeWidth={4} />
    <rect x={260} y={1420} width={560} height={30} fill="#000" />
    {f > 30 && <g opacity={clamp((f - 30) / 6)}><path d="M420 1435 l-10 0 l2 -6 Z" fill="#fff" />{[0, 1].map((i) => <ellipse key={i} cx={470 + i * 140} cy={1436} rx={20} ry={6} fill="#ff2a2a" />)}</g>}
  </svg>
);

export const SHOTS6: Record<string, React.FC<ShotProps>> = {
  graveyard: Graveyard, village: Village, vwindow: VWindow, exhume: Exhume, stake: Stake,
  newspaper: Newspaper, vcat: VCat, sickle: Sickle, science: Science, garlic: Garlic,
};
