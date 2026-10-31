import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #13 — Elves */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", ELF = "#9affd8";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const ElfFig: React.FC<{ f: number; s?: number; eye?: string; fill?: string }> = ({ f, s = 1, eye = ELF, fill = INK }) => (
  <g transform={`scale(${s})`}>
    <path d="M-50 0 L-30 -380 Q0 -420 30 -380 L50 0 Z" fill={fill} stroke={ELF} strokeOpacity={0.35} strokeWidth={3} />
    <ellipse cx={0} cy={-440} rx={34} ry={52} fill={fill} stroke={ELF} strokeOpacity={0.35} strokeWidth={3} />
    <path d="M-30 -450 L-80 -500 L-28 -430 Z M30 -450 L80 -500 L28 -430 Z" fill={fill} />
    <path d={`M-40 -470 C-70 -400 -60 -300 -80 ${-200 + Math.sin(f / 10) * 8} M40 -470 C70 -400 60 -300 80 ${-200 + Math.sin(f / 10) * 8}`} stroke={fill} strokeWidth={14} fill="none" />
    <ellipse cx={-12} cy={-444} rx={7} ry={4} fill={eye} /><ellipse cx={12} cy={-444} rx={7} ry={4} fill={eye} />
    <path d="M-30 -340 L-70 -120 M30 -340 L70 -120" stroke={fill} strokeWidth={12} />
  </g>
);

const Rocks: React.FC<{ y: number; seed: string }> = ({ y, seed }) => (
  <g>
    {Array.from({ length: 12 }).map((_, i) => {
      const x = random(`${seed}x${i}`) * W, r = 40 + random(`${seed}r${i}`) * 110;
      return <path key={i} d={`M${x - r} ${y + (i % 3) * 60} Q${x - r * 0.8} ${y - r + (i % 3) * 60} ${x} ${y - r * 1.1 + (i % 3) * 60} Q${x + r * 0.9} ${y - r * 0.7 + (i % 3) * 60} ${x + r} ${y + (i % 3) * 60} Z`} fill="#141816" stroke="#3a4a44" strokeOpacity={0.6} strokeWidth={3} />;
    })}
  </g>
);

const Lava: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#203a40" bottom="#040808" id="e1" />
    <path d={`M0 420 Q300 ${360 + Math.sin(f / 20) * 20} 600 420 T1080 400`} stroke="#5aff9a" strokeWidth={60} fill="none" opacity={0.12} />
    <path d={`M0 520 Q400 ${460 + Math.sin(f / 25) * 30} 800 520 T1200 500`} stroke="#9a5aff" strokeWidth={40} fill="none" opacity={0.1} />
    <Moon x={820} y={300} r={60} f={f} />
    <path d="M0 1000 L300 880 L560 940 L820 860 L1080 960 V1920 H0 Z" fill="#0a0e0c" />
    <Rocks y={1220} seed="la" />
    <g transform="translate(560 1150)"><path d="M-120 0 Q-110 -200 0 -230 Q120 -200 120 0 Z" fill="#1a201c" stroke="#3a4a44" strokeWidth={3} /><path d="M-26 0 L-26 -60 Q0 -84 26 -60 L26 0 Z" fill={(f % 60) < 40 ? "#ffcf6a" : "#3a2a10"} /></g>
  </svg>
);

const Eve: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0c0806" />
    <circle cx={540} cy={900} r={420} fill="#ffb43a" opacity={0.1} />
    <path d="M0 1250 L1080 1250 L1080 1920 L0 1920 Z" fill="#1a120a" />
    <g transform="translate(320 1250)"><path d="M-70 0 L-50 -280 Q0 -320 50 -280 L70 0 Z" fill={INK} stroke="#c8a060" strokeOpacity={0.5} strokeWidth={3} /><circle cx={0} cy={-320} r={40} fill={INK} stroke="#c8a060" strokeOpacity={0.5} strokeWidth={3} /><path d="M50 -230 L140 -180" stroke={INK} strokeWidth={18} /></g>
    <ellipse cx={500} cy={1210} rx={110} ry={34} fill="#3a2a1a" /><ellipse cx={500} cy={1200} rx={90} ry={20} fill="#6a8a9a" />
    {[440, 520].map((x, i) => <g key={i} transform={`translate(${x} 1220) scale(0.45)`}><path d="M-40 0 L-30 -180 Q0 -200 30 -180 L40 0 Z" fill={INK} /><circle cx={0} cy={-210} r={30} fill={INK} /></g>)}
    <rect x={720} y={760} width={260} height={490} fill="#060404" stroke="#3a2a1a" strokeWidth={8} />
    {[780, 860, 920].map((x, i) => <g key={i} transform={`translate(${x} ${1240 - (i % 2) * 20}) scale(0.4)`} opacity={0.8}><path d="M-40 0 L-30 -180 Q0 -200 30 -180 L40 0 Z" fill="#000" /><circle cx={0} cy={-210} r={30} fill="#000" /><circle cx={-10} cy={-212} r={5} fill={ELF} /><circle cx={10} cy={-212} r={5} fill={ELF} /></g>)}
  </svg>
);

const GodLight: React.FC<ShotProps> = ({ f, dur }) => {
  const fade = clamp(f / (dur * 0.8));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#060404" />
      <path d="M440 0 L640 0 L900 1400 L180 1400 Z" fill="#fff4d0" opacity={0.18} />
      <circle cx={540} cy={200} r={160} fill="#fff4d0" opacity={0.4} />
      {[300, 440, 600, 760].map((x, i) => (
        <g key={i} transform={`translate(${x} 1280) scale(0.6)`} opacity={1 - fade * (0.6 + i * 0.12)}>
          <path d="M-40 0 L-30 -180 Q0 -200 30 -180 L40 0 Z" fill={INK} stroke={ELF} strokeOpacity={0.5} strokeWidth={4} /><circle cx={0} cy={-210} r={30} fill={INK} stroke={ELF} strokeOpacity={0.5} strokeWidth={4} />
        </g>
      ))}
      {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={260 + random(`gl${i}`) * 560} cy={1200 - ((f * 4 + i * 30) % 700)} r={3} fill={ELF} opacity={fade * 0.8} />)}
    </svg>
  );
};

const DarkElves: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#030504" />
    <path d="M0 0 H1080 V600 Q800 480 540 560 Q260 480 0 600 Z" fill="#010201" />
    {[150, 380, 640, 900].map((x, i) => <path key={i} d={`M${x - 20} 580 L${x} ${700 + (i % 2) * 60} L${x + 20} 580 Z`} fill="#010201" />)}
    <g transform="translate(540 1300)"><rect x={-140} y={-60} width={280} height={60} fill="#2a2420" /><ellipse cx={0} cy={-70} rx={70} ry={20} fill={BLOOD} opacity={0.7} />{[-100, 100].map((x, i) => <g key={i}><rect x={x - 8} y={-140} width={16} height={80} fill="#e8d8b0" /><path d={`M${x - 10} -140 Q${x} ${-170 - Math.sin(f / 3 + i) * 8} ${x + 10} -140 Z`} fill="#ffb43a" /></g>)}</g>
    {[[200, 1260, 0.95], [880, 1260, 1.0], [360, 1200, 0.8], [720, 1200, 0.82]].map(([x, y, s], i) => <g key={i} transform={`translate(${x} ${y})`}><ElfFig f={f + i * 9} s={s} /></g>)}
  </svg>
);

const ElfShot: React.FC<ShotProps> = ({ f }) => {
  const hit = f > 20;
  return (
    <svg width={W} height={H}>
      <Sky top="#2a2e2a" bottom="#080908" id="e2" />
      <path d="M0 1200 Q540 1150 1080 1200 V1920 H0 Z" fill="#0c0e0c" />
      {!hit && <g transform={`translate(${1100 - f * 30} ${760 + f * 2})`} opacity={0.35}><line x1={0} y1={0} x2={160} y2={-10} stroke={ELF} strokeWidth={4} /><path d="M0 0 L20 -10 L20 10 Z" fill={ELF} /></g>}
      <g transform={`translate(480 1200) rotate(${hit ? Math.min(30, (f - 20) * 3) : 0} 0 0)`}>
        <path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill={INK} stroke="#8a9a8a" strokeOpacity={0.5} strokeWidth={3} />
        <circle cx={0} cy={-300} r={36} fill={INK} stroke="#8a9a8a" strokeOpacity={0.5} strokeWidth={3} />
        <path d={`M40 -220 L${hit ? 10 : 110} ${hit ? -180 : -260}`} stroke={INK} strokeWidth={18} strokeLinecap="round" />
        {hit && <circle cx={0} cy={-190} r={30 + (f % 10) * 3} fill="none" stroke={BLOOD} strokeWidth={6} opacity={1 - (f % 10) / 10} />}
      </g>
      {[[860, 900], [920, 940]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y + Math.sin(f / 8 + i) * 6}) scale(0.4)`} opacity={0.5}><ElfFig f={f} /></g>)}
    </svg>
  );
};

const Charm: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0806" />
    <g transform="translate(540 860) rotate(-2)">
      <rect x={-420} y={-560} width={840} height={1120} fill="#c9b48a" />
      <rect x={-380} y={-520} width={140} height={160} fill="#8a2a1a" />
      <text x={-310} y={-400} textAnchor="middle" fontFamily="Fell" fontSize={140} fill="#e8d8a0">W</text>
      {Array.from({ length: 20 }).map((_, i) => <line key={i} x1={i < 5 ? -220 : -380} y1={-500 + i * 44} x2={380 - (i % 4) * 30} y2={-500 + i * 44} stroke="#4a3a20" strokeWidth={8} strokeDasharray="14 5 30 5 8 5" opacity={clamp((f - i * 2) / 6)} />)}
      <text x={0} y={480} textAnchor="middle" fontFamily="Fell" fontSize={46} fill="#4a2a10">“Wið færstice” · c. 1000 AD</text>
    </g>
  </svg>
);

const Alp: React.FC<ShotProps> = ({ f, scene }) => {
  const press = scene === 7 ? 1 : clamp((f - 15) / 30);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#05060a" />
      <rect x={700} y={300} width={260} height={360} fill="#141c2a" /><path d="M700 480 L960 480 M830 300 L830 660" stroke="#05060a" strokeWidth={14} />
      <path d="M700 660 L380 1300 L900 1300 L960 660 Z" fill="#9ab" opacity={0.05} />
      <g transform="translate(540 1020)">
        <rect x={-380} y={-40} width={760} height={120} fill="#1a1414" />
        <rect x={-380} y={-200} width={60} height={280} fill="#2a1a10" /><rect x={320} y={-130} width={60} height={210} fill="#2a1a10" />
        <path d="M-300 -40 Q0 -120 320 -40 Z" fill="#c8c0b8" opacity={0.7} />
        <ellipse cx={-250} cy={-70} rx={56} ry={40} fill="#a8a094" />
        <ellipse cx={-262} cy={-76} rx={10} ry={8} fill="#fff" /><circle cx={-262} cy={-76} r={4} fill="#000" />
        <g transform={`translate(-80 ${-90 - (1 - press) * 300}) scale(${1.0 + press * 0.35})`} opacity={0.3 + press * 0.7}>
          <ellipse cx={0} cy={-60} rx={110} ry={90} fill="#000" />
          <circle cx={-20} cy={-170} r={60} fill="#000" />
          <path d="M-60 -200 L-100 -260 L-40 -215 Z M20 -200 L60 -260 L0 -215 Z" fill="#000" />
          <circle cx={-40} cy={-176} r={8} fill={BLOOD} /><circle cx={0} cy={-176} r={8} fill={BLOOD} />
          <path d="M-100 -20 L-200 40 L-260 30 M-200 40 L-250 70 M-200 40 L-220 90 M100 -20 L200 40 L260 30 M200 40 L250 70 M200 40 L220 90" stroke="#000" strokeWidth={16} strokeLinecap="round" fill="none" />
          <path d="M-40 -140 Q-20 -120 0 -140" stroke={BLOOD} strokeWidth={4} fill="none" />{Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M${-36 + i * 8} -140 l3 10 l3 -10`} fill="#e8e2d0" />)}
        </g>
      </g>
    </svg>
  );
};

const Paralysis: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#06100e" />
    <g transform="translate(540 700)">
      <path d="M-260 0 Q-260 -220 0 -240 Q260 -220 260 0 Q260 180 60 220 L-60 220 Q-260 180 -260 0 Z" fill="none" stroke="#1fd17a" strokeWidth={5} />
      {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${-200 + i * 50} -150 q20 60 0 ${120 + (i % 3) * 30}`} stroke="#1fd17a" strokeOpacity={0.4} strokeWidth={3} fill="none" />)}
      <circle cx={-80} cy={-60} r={20 + 6 * Math.sin(f / 4)} fill="#1fd17a" opacity={0.6} />
    </g>
    <text x={540} y={1100} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={40} fill="#1fd17a">MIND: AWAKE · BODY: ASLEEP</text>
    <g transform="translate(860 1500)" opacity={0.5 + 0.3 * Math.sin(f / 6)}><path d="M-60 0 L-40 -300 Q0 -340 40 -300 L60 0 Z" fill="#000" /><circle cx={0} cy={-340} r={40} fill="#000" /><circle cx={-12} cy={-344} r={5} fill={BLOOD} /><circle cx={12} cy={-344} r={5} fill={BLOOD} /></g>
  </svg>
);

const ElfRoad: React.FC<ShotProps> = ({ f, dur }) => {
  const lift = clamp((f - 20) / (dur * 0.6));
  return (
    <svg width={W} height={H}>
      <Sky top="#4a5a60" bottom="#141a1c" id="e3" />
      <path d="M0 1100 L1080 1100 L1080 1920 L0 1920 Z" fill="#1a1e1c" />
      <path d="M200 1920 L460 1100 L620 1100 L880 1920 Z" fill="#2a2e2e" />
      <path d="M540 1100 L540 1920" stroke="#e8e0a0" strokeWidth={8} strokeDasharray="40 40" />
      <Rocks y={1300} seed="er" />
      <g transform="translate(860 1100)"><rect x={-20} y={-700} width={40} height={700} fill="#d8a020" /><rect x={-340} y={-700} width={360} height={30} fill="#d8a020" /><line x1={-320} y1={-670} x2={-320} y2={-460 + lift * -200} stroke="#2a2a2a" strokeWidth={4} /></g>
      <g transform={`translate(540 ${1180 - lift * 420})`}><path d="M-180 0 Q-170 -230 0 -260 Q170 -230 180 0 Z" fill="#3a3e3a" stroke="#6a7a74" strokeWidth={4} /><path d="M-30 0 L-30 -70 Q0 -96 30 -70 L30 0 Z" fill="#141616" /></g>
      {[160, 260].map((x, i) => <g key={i} transform={`translate(${x} 1240)`}><path d="M-24 0 L-16 -120 Q0 -136 16 -120 L24 0 Z" fill={INK} /><circle cx={0} cy={-136} r={15} fill={INK} /><rect x={-40} y={-200} width={80} height={44} fill="#e8e0cc" /></g>)}
    </svg>
  );
};

const RockEyes: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#020403" />
    <Rocks y={1200} seed="ry" />
    <Rocks y={1450} seed="rz" />
    {Array.from({ length: 9 }).map((_, i) => {
      const x = 100 + random(`re${i}`) * 880, y = 950 + random(`rf${i}`) * 500, on = (f + i * 19) % 90 < 70;
      return on ? <g key={i}><ellipse cx={x} cy={y} rx={9} ry={5} fill={ELF} /><ellipse cx={x + 28} cy={y} rx={9} ry={5} fill={ELF} /></g> : null;
    })}
    {Array.from({ length: 4 }).map((_, i) => {
      const p = ((f / 40 + i / 4) % 1);
      return <text key={i} x={200 + i * 220} y={900 - p * 200} fontFamily="serif" fontSize={50} fill={ELF} opacity={(1 - p) * 0.7}>♪</text>;
    })}
  </svg>
);

export const SHOTS13: Record<string, React.FC<ShotProps>> = {
  lava: Lava, eve: Eve, godlight: GodLight, darkelves: DarkElves, elfshot: ElfShot, charm: Charm,
  alp: Alp, paralysis: Paralysis, elfroad: ElfRoad, rockeyes: RockEyes,
};
