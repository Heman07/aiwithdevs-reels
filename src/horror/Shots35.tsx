import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #35 — Wendigo */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BONE = "#ddd5c0", SNOW = "#e8eef4", ICE = "#9ad8ff", ASH = "#8a8a84";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const Snow: React.FC<{ f: number; n?: number; wind?: number }> = ({ f, n = 80, wind = 3 }) => (
  <g>{Array.from({ length: n }).map((_, i) => <circle key={i} cx={((random(`ws${i}`) * W + f * wind * (1 + random(`wv${i}`))) % W + W) % W} cy={(random(`wt${i}`) * H + f * (2 + random(`wu${i}`) * 3)) % H} r={2 + random(`wr${i}`) * 4} fill={SNOW} opacity={0.7} />)}</g>
);

const Pines: React.FC<{ f: number; n?: number; c?: string; y?: number }> = ({ f, n = 10, c = "#060a0e", y = 1150 }) => (
  <g>{Array.from({ length: n }).map((_, i) => { const x = i * (W / (n - 1)); const h = 600 + (i % 3) * 120; return <g key={i}><rect x={x - 8} y={y - h * 0.3} width={16} height={h * 0.3} fill={c} />{[0, 1, 2, 3].map((k) => <path key={k} d={`M${x} ${y - h + k * h * 0.18} L${x - 70 - k * 22} ${y - h * 0.55 + k * h * 0.18} L${x + 70 + k * 22} ${y - h * 0.55 + k * h * 0.18} Z`} fill={c} />)}<path d={`M${x} ${y - h} L${x - 30} ${y - h + 60} L${x + 30} ${y - h + 60} Z`} fill={SNOW} opacity={0.12} /></g>; })}</g>
);

export const WendigoFig: React.FC<{ f: number; s?: number; fill?: string; eye?: string; reach?: number; tall?: number }> = ({ f, s = 1, fill = ASH, eye = "#cfe8ff", reach = 0.15, tall = 1 }) => {
  const st = { stroke: "#4a4a44", strokeWidth: 3 } as const;
  const sway = Math.sin(f / 14) * 4;
  return (
    <g transform={`scale(${s}) rotate(${sway})`}>
      <path d={`M-30 0 L-40 ${-200 * tall} M30 0 L40 ${-200 * tall}`} stroke={fill} strokeWidth={22} strokeLinecap="round" />
      <path d={`M-30 0 l-30 10 M30 0 l30 10`} stroke={fill} strokeWidth={14} strokeLinecap="round" />
      <path d={`M-40 ${-200 * tall} C-70 ${-300 * tall} -60 ${-480 * tall} -40 ${-560 * tall} L40 ${-560 * tall} C60 ${-480 * tall} 70 ${-300 * tall} 40 ${-200 * tall} Z`} fill={fill} {...st} />
      {Array.from({ length: 4 }).map((_, i) => [-1, 1].map((d) => <path key={`${i}${d}`} d={`M${d * 4} ${(-470 + i * 30) * tall} Q${d * 30} ${(-480 + i * 30) * tall} ${d * 44} ${(-450 + i * 30) * tall}`} stroke="#4a4a44" strokeWidth={4} fill="none" opacity={0.7} />))}<path d={`M0 ${-500 * tall} L0 ${-330 * tall}`} stroke="#4a4a44" strokeWidth={4} opacity={0.6} />
      <path d={`M-30 ${-420 * tall} l0 -60 M30 ${-420 * tall} l0 -60`} stroke="#4a4a44" strokeWidth={3} />
      {[-1, 1].map((d) => (
        <g key={d} transform={`rotate(${d * (8 + reach * 50)} ${d * 40} ${-540 * tall})`}>
          <path d={`M${d * 40} ${-540 * tall} L${d * 90} ${-300 * tall} L${d * 100} ${-60 * tall}`} stroke={fill} strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {[-2, -1, 0, 1, 2].map((k) => <path key={k} d={`M${d * 100} ${-60 * tall} l${k * 10} 70`} stroke={fill} strokeWidth={6} strokeLinecap="round" />)}
          {[-2, -1, 0, 1, 2].map((k) => <path key={k} d={`M${d * 100 + k * 10} ${-60 * tall + 70} l${k * 2} 16`} stroke="#1a1a1a" strokeWidth={4} />)}
        </g>
      ))}
      <g transform={`translate(0 ${-620 * tall})`}>
        <path d="M-40 60 C-60 0 -50 -60 0 -70 C50 -60 60 0 40 60 C30 90 -30 90 -40 60 Z" fill={fill} {...st} />
        <path d="M-34 -16 L-6 -10 L-10 8 L-30 6 Z M34 -16 L6 -10 L10 8 L30 6 Z" fill="#0a0a0a" />
        <circle cx={-18} cy={-4} r={4} fill={eye} /><circle cx={18} cy={-4} r={4} fill={eye} />
        <circle cx={-18} cy={-4} r={12} fill={eye} opacity={0.2} /><circle cx={18} cy={-4} r={12} fill={eye} opacity={0.2} />
        <path d="M-4 20 L0 30 L4 20" stroke="#2a2a2a" strokeWidth={3} fill="none" />
        <path d="M-30 38 Q0 30 30 38 L26 76 Q0 84 -26 76 Z" fill="#1a0404" />
        <path d="M-26 40 L-22 56 L-16 42 L-10 60 L-4 42 L2 62 L8 42 L14 58 L20 42 L26 52 L28 40 Z" fill={BONE} />
        <path d="M-24 76 L-20 62 L-14 76 L-8 60 L-2 78 L4 62 L10 78 L16 64 L22 76 Z" fill={BONE} />
        <path d="M-40 -40 Q-60 -80 -50 -120 M40 -40 Q60 -80 50 -120" stroke="#2a2a26" strokeWidth={6} fill="none" opacity={0.7} />
      </g>
    </g>
  );
};

const Person: React.FC<{ fill?: string; s?: number; kneel?: boolean }> = ({ fill = "#3a2a1a", s = 1, kneel }) => (
  <g transform={`scale(${s})`}>
    {kneel ? <path d="M-30 0 L-40 -60 L30 -60 L40 0 Z M-30 -60 L-30 -180 L30 -180 L30 -60 Z" fill={fill} /> : <path d="M-36 0 L-40 -200 L40 -200 L36 0 Z" fill={fill} />}
    <circle cx={0} cy={kneel ? -210 : -230} r={30} fill={fill} />
    <path d={`M-40 ${kneel ? -200 : -220} Q0 ${kneel ? -260 : -280} 40 ${kneel ? -200 : -220}`} fill="#5a4a3a" />
  </g>
);

const WForest: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#0e1622" bottom="#020406" id="wd1" />
    <Moon x={800} y={300} r={80} f={f} />
    <Pines f={f} n={8} c="#0a1218" y={1100} />
    <Pines f={f} n={11} c="#04080a" />
    <rect y={1150} width={W} height={H} fill="#c8d0dc" /><rect y={1150} width={W} height={H} fill="#060a14" opacity={0.6} />
    <g transform="translate(700 1100) scale(0.45)" opacity={0.3 + Math.sin(f / 10) * 0.15}><WendigoFig f={f} /></g>
    <g transform="translate(260 1170)"><Person fill="#2a1e14" /></g>
    {Array.from({ length: 10 }).map((_, i) => <ellipse key={i} cx={270 + i * 50} cy={1190 + (i % 2) * 14} rx={10} ry={5} fill="#060a14" opacity={0.8} />)}
    <Snow f={f} />
  </svg>
);

const WCamp: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#14202e" bottom="#04060a" id="wd2" />
    <Pines f={f} n={10} />
    <rect y={1150} width={W} height={H} fill="#b8c0cc" /><rect y={1150} width={W} height={H} fill="#060a14" opacity={0.55} />
    {[300, 760].map((x, i) => <g key={i} transform={`translate(${x} 1150)`}><path d="M-150 0 L0 -320 L150 0 Z" fill="#6a5a44" /><path d="M-30 0 L0 -80 L30 0 Z" fill="#ffb43a" opacity={0.5} /><path d="M-20 -300 L-40 -360 M20 -300 L40 -360 M0 -320 L0 -370" stroke="#3a2a1a" strokeWidth={6} /></g>)}
    <circle cx={540} cy={1130} r={140} fill="#ff8a1a" opacity={0.15 + Math.sin(f / 3) * 0.05} />
    {Array.from({ length: 7 }).map((_, i) => <path key={i} d={`M${510 + i * 10} 1150 Q${515 + i * 10 + Math.sin(f / 2 + i) * 10} ${1080 - (i % 3) * 30} ${520 + i * 10} 1150 Z`} fill={i % 2 ? "#ff8a1a" : "#ffcf3a"} />)}
    <Snow f={f} n={50} />
  </svg>
);

const Famine: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0c10" />
    <circle cx={540} cy={1100} r={300} fill="#ff8a1a" opacity={0.05} />
    <path d="M140 1150 L540 400 L940 1150 Z" fill="#2a2018" />
    <path d="M200 1150 L540 500 L880 1150 Z" fill="#14100c" />
    {[-1, 0, 1].map((k) => <g key={k} transform={`translate(${540 + k * 170} 1150)`}><Person fill="#3a3028" kneel /></g>)}
    {Array.from({ length: 3 }).map((_, i) => <path key={i} d={`M${500 + i * 30} 1150 l-4 -20 l8 0 Z`} fill="#3a2a1a" />)}
    <rect x={0} y={0} width={W} height={400} fill="#0a0c10" />
    <Snow f={f} n={120} wind={8} />
  </svg>
);

const WTurn: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp((f - 10) / (dur * 0.7));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#060404" />
      <circle cx={540} cy={760} r={460} fill={BLOOD} opacity={0.1 + t * 0.06} />
      <g transform="translate(540 1150)" opacity={1 - t}><Person fill="#3a2a1a" s={1.8} /></g>
      <g transform={`translate(540 1150) scale(${0.6 + t * 0.6})`} opacity={t}><WendigoFig f={f} tall={0.9} /></g>
    </svg>
  );
};

const WReveal: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#0a1018" bottom="#020304" id="wd3" />
    <Pines f={f} n={9} c="#04070a" />
    <rect y={1150} width={W} height={H} fill="#0a0e14" />
    <g transform="translate(540 1180) scale(1.45)"><WendigoFig f={f} /></g>
    <Snow f={f} n={60} />
  </svg>
);

const WGrow: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <Sky top="#0e1622" bottom="#020406" id="wd4" />
      <Pines f={f} n={9} />
      <rect y={1150} width={W} height={H} fill="#0a0e14" />
      <g transform={`translate(540 1160) scale(${0.6 + t * 0.9})`}><WendigoFig f={f} reach={0.5} /></g>
      {[0.33, 0.66].map((m, i) => t > m && <rect key={i} width={W} height={H} fill={BLOOD} opacity={Math.max(0, 0.25 - (t - m) * 3)} />)}
      <Snow f={f} n={50} />
    </svg>
  );
};

const WHeart: React.FC<ShotProps> = ({ f, dur }) => {
  const melt = clamp((f - dur * 0.5) / (dur * 0.4));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#04060a" />
      <circle cx={540} cy={760} r={400} fill={ICE} opacity={0.08 * (1 - melt)} />
      <circle cx={540} cy={1000} r={400} fill="#ff8a1a" opacity={0.12 * melt} />
      <g transform={`translate(540 760) scale(${1 + Math.sin(f / 4) * 0.04})`}>
        <path d="M0 160 C-200 40 -220 -120 -110 -160 C-50 -180 -10 -140 0 -100 C10 -140 50 -180 110 -160 C220 -120 200 40 0 160 Z" fill={ICE} opacity={0.85 - melt * 0.5} stroke="#fff" strokeWidth={6} />
        <path d="M-80 -100 L-30 -20 L-60 40 M60 -110 L20 -30 L60 30" stroke="#fff" strokeWidth={4} opacity={0.6} fill="none" />
        {melt > 0 && Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={-60 + i * 24} cy={150 + ((f * 4 + i * 30) % 200)} r={8} fill={ICE} />)}
      </g>
      {melt > 0 && Array.from({ length: 14 }).map((_, i) => <path key={i} d={`M${340 + i * 30} 1150 Q${350 + i * 30 + Math.sin(f / 2 + i) * 20} ${1150 - melt * (180 + (i % 3) * 80)} ${360 + i * 30} 1150 Z`} fill={i % 2 ? "#ff8a1a" : "#ffcf3a"} opacity={0.85} />)}
    </svg>
  );
};

const Fiddler: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#3a4a5a" bottom="#0e141a" id="wd5" />
    <path d="M0 1000 Q540 900 1080 1000 V1150 H0 Z" fill="#9aa6b4" opacity={0.6} />
    <Pines f={f} n={10} c="#0a1218" y={1020} />
    <rect y={1150} width={W} height={H} fill="#c8d0dc" /><rect y={1150} width={W} height={H} fill="#060a14" opacity={0.5} />
    <g transform="translate(540 1150) scale(1.3)">
      <path d="M-50 0 L-60 -260 L60 -260 L50 0 Z" fill="#4a3424" />
      <circle cx={0} cy={-300} r={40} fill="#7a5a44" />
      <path d="M-44 -320 Q-50 -250 -40 -200 M44 -320 Q50 -250 40 -200" stroke="#0a0a0a" strokeWidth={14} fill="none" />
      <path d="M50 -230 L120 -150" stroke="#4a3424" strokeWidth={22} strokeLinecap="round" />
      <g transform="translate(130 -150)"><ellipse rx={24} ry={30} fill="#c8a070" /><path d="M0 30 L0 70" stroke="#5a3a20" strokeWidth={6} />{[-1, 1].map((d) => <path key={d} d={`M${d * 20} 0 l${d * 20} 20`} stroke="#c0101a" strokeWidth={4} />)}</g>
    </g>
    <Snow f={f} n={40} />
  </svg>
);

const Arrest: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#4a5a6a" bottom="#141a20" id="wd6" />
    <Pines f={f} n={9} c="#0a1218" />
    <rect y={1150} width={W} height={H} fill="#b8c0cc" /><rect y={1150} width={W} height={H} fill="#060a14" opacity={0.5} />
    <g transform="translate(540 1150)"><Person fill="#4a3424" s={1.2} /></g>
    {[-1, 1].map((d) => <g key={d} transform={`translate(${540 + d * 240} 1150) scale(1.2)`}><path d="M-36 0 L-40 -200 L40 -200 L36 0 Z" fill="#8a1a1a" /><circle cx={0} cy={-230} r={28} fill="#c8a080" /><ellipse cx={0} cy={-256} rx={50} ry={10} fill="#5a4a2a" /><path d="M-20 -262 L-14 -300 L14 -300 L20 -262 Z" fill="#5a4a2a" /></g>)}
    <Snow f={f} n={40} />
  </svg>
);

const Antlers: React.FC<ShotProps> = ({ f, dur }) => {
  const x = clamp((f - dur * 0.4) / 10);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#06080a" />
      <g transform="translate(300 1100) scale(0.85)">
        <path d="M-30 0 L-40 -500 L40 -500 L30 0 Z" fill="#3a3a3a" />
        <g transform="translate(0 -560)"><path d="M-50 0 C-60 -60 -30 -100 0 -100 C30 -100 60 -60 50 0 L20 80 L-20 80 Z" fill={BONE} /><ellipse cx={-20} cy={-30} rx={14} ry={18} fill="#000" /><ellipse cx={20} cy={-30} rx={14} ry={18} fill="#000" />
          {[-1, 1].map((d) => <path key={d} d={`M${d * 40} -80 Q${d * 120} -160 ${d * 100} -260 M${d * 90} -140 L${d * 170} -170 M${d * 106} -200 L${d * 60} -260`} stroke="#c8b898" strokeWidth={12} fill="none" strokeLinecap="round" />)}</g>
        <g opacity={x}><path d="M-200 -900 L200 -300 M200 -900 L-200 -300" stroke={BLOOD} strokeWidth={20} /></g>
      </g>
      <text x={300} y={260} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={40} fill={BLOOD} opacity={x}>MODERN MYTH</text>
      <g transform="translate(780 1120) scale(0.95)" opacity={clamp((f - dur * 0.55) / 15)}><WendigoFig f={f} /></g>
      <text x={780} y={260} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={40} fill={ICE} opacity={clamp((f - dur * 0.55) / 15)}>ORIGINAL</text>
    </svg>
  );
};

const WEyes: React.FC<ShotProps> = ({ f }) => {
  const o = clamp((f - 10) / 15);
  return (
    <svg width={W} height={H}>
      <Sky top="#060a10" bottom="#010203" id="wd7" />
      <Pines f={f} n={9} c="#020406" />
      <g opacity={o} transform="translate(540 2240) scale(2.4)"><WendigoFig f={f} /></g>
      <Snow f={f} n={60} />
    </svg>
  );
};

export const SHOTS35: Record<string, React.FC<ShotProps>> = {
  wforest: WForest, wcamp: WCamp, famine: Famine, wturn: WTurn, wreveal: WReveal, wgrow: WGrow,
  wheart: WHeart, fiddler: Fiddler, arrest: Arrest, antlers: Antlers, weyes: WEyes,
};
