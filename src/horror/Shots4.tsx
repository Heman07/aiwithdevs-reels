import React from "react";
import { random } from "remotion";
import { ShotProps, Sky } from "./Shots";

/* Creature #4 — Dragon (Fafnir) */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#d0202a", GOLD = "#e0b040", GLINT = "#fff1b0";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const Cave: React.FC<{ glow?: string; id: string }> = ({ glow = "#e0b040", id }) => (
  <g>
    <defs><radialGradient id={id} cx="0.5" cy="0.65" r="0.7"><stop offset="0" stopColor={glow} stopOpacity="0.28" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient></defs>
    <rect width={W} height={H} fill="#060403" />
    <rect width={W} height={H} fill={`url(#${id})`} />
    <path d="M0 0 H1080 V500 Q900 380 760 460 Q620 300 470 420 Q330 330 200 470 Q90 400 0 520 Z" fill="#010101" />
    <path d="M0 1920 V1250 Q120 1300 160 1500 L0 1920 Z M1080 1920 V1220 Q960 1280 930 1500 L1080 1920 Z" fill="#010101" />
    {[150, 320, 560, 780, 950].map((x, i) => <path key={i} d={`M${x - 20} ${420 + (i % 2) * 60} L${x} ${560 + (i % 3) * 40} L${x + 20} ${420 + (i % 2) * 60} Z`} fill="#010101" />)}
  </g>
);

const Hoard: React.FC<{ f: number; y?: number }> = ({ f, y = 1200 }) => (
  <g>
    <path d={`M80 ${y + 200} Q300 ${y - 60} 540 ${y - 120} Q780 ${y - 60} 1000 ${y + 200} Z`} fill="#8a6418" />
    {Array.from({ length: 70 }).map((_, i) => {
      const x = 140 + random(`hx${i}`) * 800, yy = y - 60 + random(`hy${i}`) * 240;
      return <ellipse key={i} cx={x} cy={yy} rx={20} ry={11} fill={GOLD} stroke="#7a5410" strokeWidth={2} />;
    })}
    {Array.from({ length: 8 }).map((_, i) => {
      const t = (f + i * 17) % 50;
      const x = 160 + random(`gl${i}`) * 760, yy = y - 40 + random(`gm${i}`) * 200;
      return t < 8 ? <path key={i} d={`M${x} ${yy - 22} L${x + 5} ${yy} L${x} ${yy + 22} L${x - 5} ${yy} Z M${x - 22} ${yy} L${x} ${yy - 5} L${x + 22} ${yy} L${x} ${yy + 5} Z`} fill={GLINT} opacity={1 - t / 8} /> : null;
    })}
  </g>
);

export const DragonFig: React.FC<{ f: number; fill?: string; eye?: string; wings?: number }> = ({ f, fill = INK, eye = "#ffcf3a", wings = 1 }) => {
  const st = { stroke: "#c8803a", strokeOpacity: 0.75, strokeWidth: 4 } as const;
  const flap = Math.sin(f / 10) * 6;
  return (
    <g>
      {[-1, 1].map((d) => (
        <g key={d} transform={`scale(${d} 1) rotate(${-flap} 60 -160)`}>
          <path d={`M60 -160 L${300 * wings} ${-520 * wings} L${330 * wings} ${-470 * wings} L${420 * wings} ${-430 * wings} L${380 * wings} -300 L${430 * wings} -250 L${330 * wings} -170 L${300 * wings} -60 L160 -90 Z`} fill={fill} {...st} />
          {[0, 1, 2].map((k) => <line key={k} x1={60} y1={-160} x2={(330 + k * 40) * wings} y2={(-470 + k * 110) * wings} stroke="#c8803a" strokeOpacity={0.35} strokeWidth={3} />)}
        </g>
      ))}
      <ellipse cx={0} cy={-60} rx={190} ry={140} fill={fill} {...st} />
      <path d={`M150 20 C300 60 420 ${-20 + Math.sin(f / 9) * 30} 470 80 L440 110 C380 40 280 100 140 80 Z`} fill={fill} {...st} />
      <path d="M-80 -170 C-120 -300 -170 -380 -250 -420 L-300 -380 C-230 -340 -190 -280 -150 -150 Z" fill={fill} {...st} />
      <path d="M-240 -440 L-400 -400 L-420 -360 L-300 -350 L-250 -370 Z" fill={fill} {...st} />
      <path d="M-250 -440 L-230 -500 L-270 -445 Z M-280 -430 L-275 -490 L-300 -432 Z" fill={fill} {...st} />
      {Array.from({ length: 7 }).map((_, i) => <path key={i} d={`M${-120 - i * 18} ${-200 - i * 32} l-14 -24 l28 4 Z`} fill={fill} {...st} />)}
      <circle cx={-310} cy={-405} r={9} fill={eye} />
      <circle cx={-310} cy={-405} r={26} fill={eye} opacity={0.25} />
      {[-120, 100].map((x, i) => <path key={i} d={`M${x} 40 L${x - 30} 140 L${x - 70} 150 M${x - 30} 140 L${x - 20} 160 M${x - 30} 140 L${x + 10} 155`} stroke={fill === INK ? "#0a0a0a" : fill} strokeWidth={26} strokeLinecap="round" fill="none" />)}
    </g>
  );
};

const HoardShot: React.FC<ShotProps> = ({ f, scene }) => {
  const open = clamp((f - 20) / 15);
  return (
    <svg width={W} height={H}>
      <Cave id="dh1" />
      <Hoard f={f} y={1150} />
      <g transform="translate(540 700)">
        <ellipse cx={0} cy={0} rx={130} ry={50 * open} fill="#ffcf3a" opacity={0.9} />
        <ellipse cx={0} cy={0} rx={16} ry={48 * open} fill="#000" />
        <ellipse cx={0} cy={0} rx={300} ry={130 * open} fill="#ffcf3a" opacity={0.08} />
      </g>
      {scene > 5 && <path d="M200 700 Q540 560 880 700" stroke="#c8803a" strokeOpacity={0.3} strokeWidth={6} fill="none" />}
    </svg>
  );
};

const Otter: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a3a30" bottom="#060806" id="d2" />
    <circle cx={800} cy={420} r={90} fill="#e8e0c0" opacity={0.6} />
    <path d="M0 1050 Q540 980 1080 1060 V1920 H0 Z" fill="#0a1410" />
    {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${((i * 160 + f * 3) % 1300) - 100} ${1120 + i * 40} q50 -10 100 0`} stroke="#8ab" strokeOpacity={0.3} strokeWidth={3} fill="none" />)}
    <path d="M260 1000 L300 920 L420 900 L500 960 L520 1010 Z" fill="#1a1a14" />
    <g transform="translate(400 915)">
      <ellipse cx={0} cy={0} rx={70} ry={26} fill="#3a2a1a" />
      <circle cx={-60} cy={-12} r={20} fill="#3a2a1a" /><circle cx={-68} cy={-16} r={4} fill="#000" />
      <path d="M60 0 Q110 10 140 -10" stroke="#3a2a1a" strokeWidth={14} fill="none" />
    </g>
    <g transform={`translate(${900 - Math.min(f, 30) * 16} ${700 + Math.pow(Math.min(f, 30) / 30, 2) * 200})`}><circle r={18} fill="#6a6a60" /></g>
    {f > 30 && <circle cx={400} cy={915} r={(f - 30) * 6} fill="none" stroke={BLOOD} strokeOpacity={Math.max(0, 1 - (f - 30) / 20)} strokeWidth={6} />}
    <g transform="translate(860 1080)"><path d="M-50 0 L-30 -260 Q0 -300 30 -260 L50 0 Z" fill={INK} /><circle cx={0} cy={-300} r={34} fill={INK} /><path d="M-30 -320 L-50 -380 L-10 -330 M30 -320 L50 -380 L10 -330" stroke={INK} strokeWidth={10} /></g>
  </svg>
);

const Ransom: React.FC<ShotProps> = ({ f, dur }) => {
  const fill = clamp(f / (dur * 0.8));
  return (
    <svg width={W} height={H}>
      <Cave id="dh2" />
      <g transform="translate(540 1150)">
        <path d="M-260 60 Q-200 -40 0 -50 Q200 -40 260 60 Z" fill="#3a2a1a" />
        {Array.from({ length: Math.floor(fill * 90) }).map((_, i) => <ellipse key={i} cx={(random(`rx${i}`) - 0.5) * 520 * (1 - i / 140)} cy={50 - i * 2.4 - random(`ry${i}`) * 30} rx={20} ry={11} fill={GOLD} stroke="#7a5410" strokeWidth={2} />)}
      </g>
      <g transform="translate(860 1200)"><path d="M-80 0 L-60 -220 Q0 -270 60 -220 L80 0 Z" fill={INK} stroke="#c8803a" strokeOpacity={0.5} strokeWidth={3} /><circle cx={0} cy={-260} r={42} fill={INK} stroke="#c8803a" strokeOpacity={0.5} strokeWidth={3} /><path d="M-30 -240 Q0 -160 30 -240" fill="#6a6a60" /><circle cx={-14} cy={-268} r={5} fill="#ffcf3a" /><circle cx={14} cy={-268} r={5} fill="#ffcf3a" /></g>
    </svg>
  );
};

const Curse: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Cave id="dh3" glow={BLOOD} />
    <g transform="translate(540 800)">
      <circle r={260 + Math.sin(f / 4) * 20} fill={BLOOD} opacity={0.18} />
      <circle r={110} fill="none" stroke={GOLD} strokeWidth={34} />
      <circle r={110} fill="none" stroke="#ff4a2a" strokeWidth={6} opacity={0.5 + 0.5 * Math.sin(f / 3)} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2 + f / 40;
        return <text key={i} x={Math.cos(a) * 320} y={Math.sin(a) * 320} textAnchor="middle" fontFamily="serif" fontSize={64} fill={BLOOD} opacity={0.8} transform={`rotate(${(a * 180) / Math.PI + 90} ${Math.cos(a) * 320} ${Math.sin(a) * 320})`}>{"ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ"[i]}</text>;
      })}
    </g>
    <g transform="translate(540 1420)"><path d="M-110 0 Q-100 -150 0 -170 Q100 -150 110 0 Z" fill={INK} /><circle cx={0} cy={-210} r={50} fill={INK} /><path d="M-40 -180 Q0 -80 40 -180" fill="#8a8a80" /><circle cx={-16} cy={-216} r={6} fill={BLOOD} /><circle cx={16} cy={-216} r={6} fill={BLOOD} /><path d={`M80 -120 L${180 + Math.sin(f / 4) * 10} -300`} stroke={INK} strokeWidth={22} strokeLinecap="round" /></g>
  </svg>
);

const Murder: React.FC<ShotProps> = ({ f, dur }) => {
  const p = clamp(f / (dur * 0.7));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#100604" />
      <circle cx={180} cy={1100} r={260} fill="#ff8a3a" opacity={0.2 + 0.05 * Math.sin(f / 2)} />
      <path d={`M150 1180 Q160 ${1120 - Math.sin(f / 2) * 10} 180 ${1060 - Math.sin(f / 3) * 14} Q200 1120 210 1180 Z`} fill="#ffb43a" />
      {/* shadow on wall */}
      <g transform={`translate(640 1000) scale(${1.6 + p * 0.4})`} opacity={0.85}>
        <path d="M-60 300 L-40 0 Q0 -40 40 0 L60 300 Z" fill="#000" />
        <circle cx={0} cy={-40} r={40} fill="#000" />
        <path d={`M30 20 L${80 + p * 40} ${-80 - p * 60} L${100 + p * 40} ${-260 - p * 60}`} stroke="#000" strokeWidth={22} fill="none" strokeLinecap="round" />
        <path d={`M${92 + p * 40} ${-250 - p * 60} L${110 + p * 40} ${-400 - p * 60} L${120 + p * 40} ${-250 - p * 60} Z`} fill="#000" />
      </g>
      <path d="M200 1500 L880 1500 L880 1560 L200 1560 Z" fill="#050202" />
      <g transform="translate(540 1480)"><ellipse cx={0} cy={0} rx={240} ry={40} fill="#0a0503" /><circle cx={-220} cy={-20} r={40} fill="#0a0503" /><path d="M-240 0 Q-200 30 -180 0" stroke="#ece4d0" strokeOpacity={0.4} strokeWidth={3} fill="none" /></g>
    </svg>
  );
};

const Change: React.FC<ShotProps> = ({ f, dur }) => {
  const p = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <Cave id="dh4" glow="#6aa040" />
      <Hoard f={f} y={1250} />
      <g transform="translate(540 1080)">
        <ellipse cx={0} cy={0} rx={200 + p * 120} ry={90 + p * 40} fill={INK} stroke="#8ac040" strokeOpacity={0.5} strokeWidth={4} />
        {Array.from({ length: Math.floor(p * 40) }).map((_, i) => <path key={i} d="M0 0 l16 -14 l16 14 Z" fill="#1a2a12" stroke="#8ac040" strokeOpacity={0.6} strokeWidth={2} transform={`translate(${(random(`cs${i}`) - 0.5) * 380} ${(random(`ct${i}`) - 0.5) * 140})`} />)}
        <circle cx={-200 - p * 80} cy={-40} r={50 + p * 20} fill={INK} stroke="#8ac040" strokeOpacity={0.5} strokeWidth={4} />
        <circle cx={-220 - p * 80} cy={-50} r={7} fill={p > 0.5 ? "#ffcf3a" : "#ece4d0"} />
      </g>
      {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M${340 + i * 10} ${1020 - ((f * 2 + i * 30) % 300)} q20 -20 0 -40`} stroke="#8ac040" strokeWidth={10} fill="none" opacity={p * 0.4} />)}
    </svg>
  );
};

const DragonShot: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Cave id="dh5" glow="#ff7a2a" />
    <Hoard f={f} y={1120} />
    <g transform="translate(600 930) scale(1.15)"><DragonFig f={f} /></g>
    {Array.from({ length: 16 }).map((_, i) => <circle key={i} cx={300 + (random(`ds${i}`) - 0.5) * 300} cy={560 - ((f * 3 + i * 30) % 400)} r={20 + random(`dr${i}`) * 30} fill="#3a3a30" opacity={0.25} />)}
  </svg>
);

const Pit: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#030201" />
    <path d="M0 0 H1080 V560 L800 600 L280 600 L0 560 Z" fill="#14100a" />
    <rect x={280} y={560} width={520} height={60} fill="#1f1810" />
    <path d="M280 600 L320 1600 L760 1600 L800 600 Z" fill="#080604" />
    {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={320 + random(`px${i}`) * 440} cy={700 + random(`py${i}`) * 800} r={10 + random(`pr${i}`) * 20} fill="#120e08" />)}
    <g transform="translate(540 1180)">
      <path d="M-60 0 L-40 -220 Q0 -260 40 -220 L60 0 Z" fill={INK} stroke="#8a7a5a" strokeOpacity={0.5} strokeWidth={3} />
      <circle cx={0} cy={-260} r={36} fill={INK} stroke="#8a7a5a" strokeOpacity={0.5} strokeWidth={3} />
      <line x1={50} y1={-120} x2={70} y2={-520} stroke="#b8c0c8" strokeWidth={10} />
      <circle cx={-12} cy={-262} r={4} fill="#ece4d0" opacity={(f % 40) < 36 ? 1 : 0} /><circle cx={12} cy={-262} r={4} fill="#ece4d0" opacity={(f % 40) < 36 ? 1 : 0} />
    </g>
    {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={300 + random(`pd${i}`) * 480} cy={(f * 6 + i * 120) % 1000 + 600} r={3} fill="#4a3a2a" />)}
  </svg>
);

const Stab: React.FC<ShotProps> = ({ f }) => {
  const thrust = clamp((f - 14) / 6);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#050201" />
      <g transform={`translate(${1400 - Math.min(f, 14) * 50} 520) scale(1.3)`}>
        <ellipse cx={0} cy={0} rx={600} ry={200} fill="#0a0806" stroke="#c8803a" strokeOpacity={0.5} strokeWidth={4} />
        {Array.from({ length: 24 }).map((_, i) => <path key={i} d={`M${-560 + i * 48} 120 q24 30 48 0`} stroke="#3a2a1a" strokeWidth={6} fill="none" />)}
      </g>
      <line x1={540} y1={1600} x2={540} y2={1100 - thrust * 480} stroke="#c8d0d8" strokeWidth={22} />
      <path d={`M520 ${1100 - thrust * 480} L540 ${1030 - thrust * 480} L560 ${1100 - thrust * 480} Z`} fill="#e8eef4" />
      {thrust > 0.9 && Array.from({ length: 18 }).map((_, i) => {
        const a = random(`sa${i}`) * Math.PI, d = (f - 20) * (6 + random(`sd${i}`) * 10);
        return <circle key={i} cx={540 + Math.cos(a) * d} cy={600 + Math.sin(a) * d * 0.6 + (f - 20) * 4} r={8 + random(`sr${i}`) * 12} fill={BLOOD} />;
      })}
      <path d="M380 1600 L380 1920 M700 1600 L700 1920" stroke="#140e08" strokeWidth={30} />
    </svg>
  );
};

const Birds: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a2a30" bottom="#070606" id="d6" />
    <path d="M0 520 Q300 480 560 540 L1080 500" stroke={INK} strokeWidth={26} fill="none" />
    <path d="M700 520 L760 300 M400 520 L380 350" stroke={INK} strokeWidth={14} />
    {[220, 420, 640, 860].map((x, i) => {
      const bob = Math.sin(f / 7 + i) * 6, talk = (f + i * 11) % 30 < 8;
      return (
        <g key={i} transform={`translate(${x} ${500 + bob - (i % 2) * 20})`}>
          <ellipse cx={0} cy={0} rx={40} ry={28} fill={INK} /><circle cx={-34} cy={-24} r={20} fill={INK} />
          <path d={`M-52 -26 L-80 ${talk ? -34 : -24} L-52 -18 Z`} fill={INK} /><path d="M30 0 L80 16 L40 10 Z" fill={INK} />
          <circle cx={-38} cy={-28} r={4} fill="#ffcf3a" />
        </g>
      );
    })}
    <g transform="translate(540 1000)">
      <path d="M-160 120 L160 120 L120 60 L-120 60 Z" fill="#1a1008" />
      {[-60, -20, 20, 60].map((x, i) => <path key={i} d={`M${x - 24} 60 Q${x - 28} ${-10 - Math.sin(f / 3 + i) * 14} ${x} ${-60 - Math.sin(f / 3 + i) * 20} Q${x + 28} -10 ${x + 24} 60 Z`} fill="#ff8a2a" />)}
      <line x1={-260} y1={-40} x2={260} y2={-40} stroke="#3a2a1a" strokeWidth={10} />
      <path d="M-40 -40 C-60 -110 40 -130 50 -60 C55 -30 20 -10 0 0 C-20 -10 -40 -20 -40 -40 Z" fill="#6a0a10" />
    </g>
  </svg>
);

const Ring: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#030101" />
    <g transform={`translate(540 860) rotate(${Math.sin(f / 30) * 10}) scale(${1 + 0.03 * Math.sin(f / 6)})`}>
      <circle r={420} fill={BLOOD} opacity={0.08} />
      <ellipse rx={200} ry={200} fill="none" stroke={GOLD} strokeWidth={56} />
      <ellipse rx={200} ry={200} fill="none" stroke={GLINT} strokeWidth={6} strokeDasharray={`60 ${1200}`} strokeDashoffset={-f * 12} />
      {Array.from({ length: 8 }).map((_, i) => <text key={i} x={Math.cos((i / 8) * 6.28) * 200} y={Math.sin((i / 8) * 6.28) * 200 + 16} textAnchor="middle" fontFamily="serif" fontSize={40} fill={BLOOD}>{"ᚨᚾᛞᚹᚨᚱᛁ"[i % 7]}</text>)}
    </g>
    {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={random(`rg${i}`) * W} cy={(random(`rh${i}`) * H - f * 1.5 + H * 4) % H} r={2} fill="#ff6a4a" opacity={0.4} />)}
  </svg>
);

export const SHOTS4: Record<string, React.FC<ShotProps>> = {
  hoard: HoardShot, otter: Otter, ransom: Ransom, curse: Curse, murder: Murder, change: Change,
  dragon: DragonShot, pit: Pit, stab: Stab, birds: Birds, ring: Ring,
};
