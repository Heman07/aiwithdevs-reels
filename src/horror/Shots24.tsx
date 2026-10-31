import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";
import { Cerberus } from "./Shots19";

/* Creature #24 — Hydra */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", VENOM = "#7aff4a", BONE = "#ddd5c0", FIRE = "#ff8a1a";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

/* serpent head on a neck rooted at (0,0) */
const Neck: React.FC<{ f: number; ang: number; len: number; ph: number; fill: string; eye: string; stump?: boolean; burn?: boolean; grow?: number }> = ({ f, ang, len, ph, fill, eye, stump, burn, grow = 1 }) => {
  const L = len * grow;
  const sw = Math.sin(f / 9 + ph) * 40;
  const ex = Math.sin(ang) * L + sw, ey = -Math.cos(ang) * L;
  const cx = Math.sin(ang) * L * 0.5 - sw, cy = -Math.cos(ang) * L * 0.5;
  const a = Math.atan2(ey - cy, ex - cx) * 180 / Math.PI;
  return (
    <g>
      <path d={`M0 0 Q${cx} ${cy} ${ex} ${ey}`} stroke={fill} strokeWidth={56} fill="none" strokeLinecap="round" />
      <path d={`M0 0 Q${cx} ${cy} ${ex} ${ey}`} stroke="#4a6a4a" strokeOpacity={0.5} strokeWidth={60} fill="none" strokeDasharray="6 24" />
      {stump ? (
        <g transform={`translate(${ex} ${ey})`}>
          <circle r={34} fill={burn ? "#3a1a0a" : BLOOD} />
          {burn ? <circle r={24} fill={FIRE} opacity={0.5 + Math.sin(f) * 0.3} /> : Array.from({ length: 4 }).map((_, i) => <circle key={i} cx={(random(`st${ph}${i}`) - 0.5) * 40} cy={((f * 7 + i * 30) % 160)} r={8} fill={BLOOD} />)}
        </g>
      ) : (
        <g transform={`translate(${ex} ${ey}) rotate(${a + 90}) scale(${grow})`}>
          <path d="M-46 30 C-60 -20 -40 -90 0 -110 C40 -90 60 -20 46 30 Z" fill={fill} stroke="#4a6a4a" strokeOpacity={0.6} strokeWidth={3} />
          <path d="M-30 -90 L-50 -130 L-18 -100 M30 -90 L50 -130 L18 -100" stroke={fill} strokeWidth={8} />
          <ellipse cx={-22} cy={-50} rx={10} ry={6} fill={eye} /><ellipse cx={22} cy={-50} rx={10} ry={6} fill={eye} />
          <path d="M-30 -110 L0 -150 L30 -110 Z" fill="#300" opacity={0.9} />
          <path d={`M0 -150 l-8 ${-30 - Math.abs(Math.sin(f / 3 + ph)) * 20} M0 -150 l8 ${-30 - Math.abs(Math.sin(f / 3 + ph)) * 20}`} stroke={BLOOD} strokeWidth={4} />
          <path d="M-16 -120 L-12 -140 M16 -120 L12 -140" stroke={BONE} strokeWidth={4} />
        </g>
      )}
    </g>
  );
};

export const HydraFig: React.FC<{ f: number; heads?: number; s?: number; fill?: string; eye?: string; stumps?: number[]; burn?: boolean; growing?: number[]; g?: number }> =
  ({ f, heads = 7, s = 1, fill = "#0a120c", eye = VENOM, stumps = [], burn, growing = [], g = 1 }) => {
  const span = 1.6;
  return (
    <g transform={`scale(${s})`}>
      <path d={`M120 80 C300 120 380 ${200 + Math.sin(f / 10) * 30} 260 300 C200 340 120 300 80 260`} stroke={fill} strokeWidth={70} fill="none" strokeLinecap="round" />
      {Array.from({ length: heads }).map((_, i) => {
        const ang = -span / 2 + (span * i) / Math.max(1, heads - 1);
        return <Neck key={i} f={f} ang={ang} len={i === Math.floor(heads / 2) ? 520 : 380 + (i % 2) * 60} ph={i * 1.3} fill={fill} eye={i === Math.floor(heads / 2) ? "#ffcf3a" : eye} stump={stumps.includes(i)} burn={burn} grow={growing.includes(i) ? g : 1} />;
      })}
      <ellipse cx={0} cy={80} rx={230} ry={150} fill={fill} stroke="#4a6a4a" strokeOpacity={0.5} strokeWidth={4} />
      {[-150, 150].map((x, i) => <path key={i} d={`M${x} 160 L${x - 30} 260 L${x - 70} 280 M${x - 30} 260 L${x} 290`} stroke={fill} strokeWidth={30} strokeLinecap="round" />)}
    </g>
  );
};

export const Hero: React.FC<{ f: number; s?: number; fill?: string; swing?: number; bow?: boolean; torch?: boolean; pelt?: boolean }> = ({ f, s = 1, fill = INK, swing = 0, bow, torch, pelt = true }) => (
  <g transform={`scale(${s})`}>
    <path d="M-30 0 L-40 -110 L40 -110 L30 0 Z" fill={fill} />
    <path d="M-34 -110 L-28 0 M34 -110 L28 0" stroke={fill} strokeWidth={30} />
    <path d="M-70 -280 L70 -280 L50 -110 L-50 -110 Z" fill={fill} />
    <circle cx={0} cy={-320} r={42} fill={fill} />
    {pelt && <path d="M-60 -350 Q0 -400 60 -350 L80 -280 L60 -200 L-60 -200 L-80 -280 Z" fill="#6a4a1a" opacity={0.9} />}
    {pelt && <path d="M-40 -370 l-14 -24 l26 12 M40 -370 l14 -24 l-26 12" fill="#6a4a1a" />}
    <g transform={`rotate(${swing} 60 -260)`}>
      <path d="M60 -260 L150 -340" stroke={fill} strokeWidth={30} strokeLinecap="round" />
      {!bow && !torch && <path d="M150 -340 L300 -520" stroke="#c8c8d0" strokeWidth={14} strokeLinecap="round" />}
      {torch && <g><path d="M150 -340 L190 -460" stroke="#5a3a20" strokeWidth={14} /><path d={`M175 -460 Q190 ${-540 - Math.sin(f) * 20} 205 -460 Z`} fill={FIRE} /><circle cx={190} cy={-480} r={50} fill={FIRE} opacity={0.25} /></g>}
    </g>
    {bow && <g><path d="M-60 -260 L-160 -300" stroke={fill} strokeWidth={30} strokeLinecap="round" /><path d="M-170 -420 Q-110 -300 -170 -180" stroke="#8a6a3a" strokeWidth={10} fill="none" /><path d="M-170 -420 L-60 -300 L-170 -180" stroke="#ddd" strokeWidth={2} fill="none" /></g>}
  </g>
);

const Reeds: React.FC<{ y: number; f: number; n?: number }> = ({ y, f, n = 30 }) => (
  <g>{Array.from({ length: n }).map((_, i) => { const x = random(`rd${i}`) * W, h = 120 + random(`rh${i}`) * 200; return <path key={i} d={`M${x} ${y} Q${x + Math.sin(f / 20 + i) * 14} ${y - h / 2} ${x + Math.sin(f / 15 + i) * 24} ${y - h}`} stroke="#0e1a10" strokeWidth={6} fill="none" />; })}</g>
);

const Swamp: React.FC<{ f: number; id: string }> = ({ f, id }) => (
  <>
    <Sky top="#1a2a1e" bottom="#040805" id={id} />
    <rect y={1150} width={W} height={H - 1150} fill="#0a140c" />
    {Array.from({ length: 8 }).map((_, i) => <ellipse key={i} cx={(i * 160 + f * 0.7) % 1200 - 60} cy={1170 + (i % 3) * 30} rx={140} ry={10} fill={VENOM} opacity={0.06} />)}
  </>
);

const HSwamp: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Swamp f={f} id="hy1" />
    <Moon x={800} y={360} r={90} f={f} />
    <g transform="translate(540 900) scale(0.8)"><HydraFig f={f} /></g>
    <Reeds y={1200} f={f} />
  </svg>
);

const HBirth: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#080404" />
    <circle cx={540} cy={700} r={480} fill={BLOOD} opacity={0.08} />
    <g transform="translate(540 380)">
      <path d="M-300 120 Q-200 -60 0 -20 Q200 -60 300 120" stroke="#1a0a0a" strokeWidth={60} fill="none" />
      {[-1, 1].map((d) => <g key={d} transform={`translate(${d * 230} 60)`}><circle r={60} fill="#1a0a0a" /><circle cx={-14} cy={-8} r={8} fill={BLOOD} /><circle cx={14} cy={-8} r={8} fill={BLOOD} /></g>)}
    </g>
    <g transform="translate(220 1060) scale(0.32)"><Cerberus f={f} snarl /></g>
    <g transform="translate(540 1060) scale(0.35)"><HydraFig f={f} /></g>
    <g transform="translate(860 1000) scale(0.5)">
      <circle r={80} fill="#1a1208" /><circle cx={-20} cy={-10} r={8} fill="#ffcf3a" /><circle cx={20} cy={-10} r={8} fill="#ffcf3a" />
      <path d="M-40 -60 Q-100 -150 -60 -170 M40 -60 Q100 -150 60 -170" stroke="#1a1208" strokeWidth={18} fill="none" />
      <path d={`M60 40 Q160 ${80 + Math.sin(f / 6) * 30} 140 160`} stroke="#0a1a0a" strokeWidth={22} fill="none" />
    </g>
  </svg>
);

const HeraShot: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0608" />
    <circle cx={540} cy={560} r={400} fill="#8a6aa0" opacity={0.12} />
    <g transform="translate(540 1100)">
      <path d="M-160 0 L-90 -460 L90 -460 L160 0 Z" fill="#3a2e48" />
      <circle cx={0} cy={-520} r={70} fill="#3a2e48" />
      <path d="M-70 -590 L-50 -640 L-20 -600 L0 -660 L20 -600 L50 -640 L70 -590 Z" fill="#d8b040" />
      <ellipse cx={-26} cy={-525} rx={12} ry={5} fill="#e8d0ff" /><ellipse cx={26} cy={-525} rx={12} ry={5} fill="#e8d0ff" />
      <path d="M90 -380 Q200 -300 260 -200" stroke="#3a2e48" strokeWidth={34} fill="none" strokeLinecap="round" />
    </g>
    <g transform="translate(820 960) scale(0.22)"><HydraFig f={f} heads={5} /></g>
  </svg>
);

const Lerna: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Swamp f={f} id="hy2" />
    <path d="M380 1150 Q540 860 700 1150 Z" fill="#000" />
    <path d="M380 1150 Q540 860 700 1150" stroke="#2a3a2a" strokeWidth={14} fill="none" />
    <circle cx={540} cy={1080} r={60} fill={VENOM} opacity={0.08 + Math.sin(f / 10) * 0.04} />
    {[[160, 1120], [260, 1060], [380, 1110], [520, 1050], [640, 1120]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`} opacity={0.7}><path d="M0 0 l-30 -40 M0 0 l0 -50 M0 0 l30 -40" stroke={VENOM} strokeWidth={8} /><ellipse rx={24} ry={10} fill={VENOM} opacity={0.3} /></g>)}
    {Array.from({ length: 4 }).map((_, i) => <g key={i} transform={`translate(${120 + i * 260} 1130) rotate(-90) scale(0.6)`} opacity={0.5}><path d="M0 0 L120 0" stroke={BONE} strokeWidth={10} /><circle cx={140} cy={0} r={22} fill="none" stroke={BONE} strokeWidth={8} /></g>)}
    <Reeds y={1180} f={f} n={20} />
  </svg>
);

const HArrows: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Swamp f={f} id="hy3" />
    <path d="M520 1150 Q760 820 1000 1150 Z" fill="#000" />
    {Array.from({ length: 4 }).map((_, i) => { const t = ((f + i * 12) % 40) / 40; return <g key={i} transform={`translate(${260 + t * 520} ${940 - Math.sin(t * Math.PI) * 220 + t * 120}) rotate(${20 + t * 30})`}><path d="M-60 0 L40 0" stroke="#c8a060" strokeWidth={5} /><circle cx={44} r={14} fill={FIRE} /><circle cx={44} r={30} fill={FIRE} opacity={0.3} /></g>; })}
    {[[760, 1110], [820, 1130], [700, 1120]].map(([x, y], i) => <path key={i} d={`M${x - 20} ${y} Q${x} ${y - 60 - Math.sin(f / 2 + i) * 20} ${x + 20} ${y} Z`} fill={FIRE} />)}
    <g transform="translate(220 1170) scale(0.85)"><Hero f={f} bow /></g>
    <Reeds y={1200} f={f} n={14} />
  </svg>
);

const HRegrow: React.FC<ShotProps> = ({ f, dur }) => {
  const g = clamp((f - dur * 0.35) / (dur * 0.4));
  const cut = f > dur * 0.15;
  return (
    <svg width={W} height={H}>
      <Swamp f={f} id="hy4" />
      <g transform="translate(620 930) scale(0.75)">
        <HydraFig f={f} heads={7} stumps={cut && g < 0.05 ? [1] : []} />
        {cut && g >= 0.05 && <g transform={`rotate(${-0.6 * 57}) `}>
          {[-0.25, 0.25].map((d, i) => <g key={i} transform={`rotate(${d * 57})`}><Neck f={f} ang={0} len={380} ph={7 + i} fill="#0a120c" eye={VENOM} grow={g} /></g>)}
        </g>}
      </g>
      {cut && f < dur * 0.5 && <g transform={`translate(${260 + f * 2} ${600 + f * 8}) rotate(${f * 10})`}><path d="M-40 20 C-50 -20 -30 -80 0 -90 C30 -80 50 -20 40 20 Z" fill="#0a120c" /></g>}
      <g transform="translate(200 1180) scale(0.8)"><Hero f={f} swing={cut ? 60 : -20} /></g>
      {cut && Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={380 + random(`hb${i}`) * 140} cy={760 + ((f * 9 + i * 50) % 500)} r={8} fill={BLOOD} />)}
    </svg>
  );
};

const HCrab: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Swamp f={f} id="hy5" />
    <g transform="translate(650 920) scale(0.65)"><HydraFig f={f} heads={11} /></g>
    <g transform="translate(220 1180) scale(0.8)"><Hero f={f} swing={Math.sin(f / 3) * 50} /></g>
    <g transform={`translate(${120 + Math.min(f, 30) * 2} 1110)`}>
      <ellipse rx={90} ry={50} fill="#5a1a10" stroke="#ff6a3a" strokeOpacity={0.5} strokeWidth={4} />
      {[-1, 1].map((d) => <g key={d}>{[0, 1, 2].map((k) => <path key={k} d={`M${d * 70} ${10 + k * 12} l${d * 50} ${20 + k * 6}`} stroke="#5a1a10" strokeWidth={10} />)}<path d={`M${d * 60} -30 L${d * 110} -80`} stroke="#5a1a10" strokeWidth={16} /><path d={`M${d * 110} -80 l${d * 30} ${-20 - Math.abs(Math.sin(f / 2)) * 20} M${d * 110} -80 l${d * 40} 10`} stroke="#5a1a10" strokeWidth={14} /></g>)}
      <circle cx={-20} cy={-40} r={8} fill="#ffcf3a" /><circle cx={20} cy={-40} r={8} fill="#ffcf3a" />
    </g>
  </svg>
);

const HBurn: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Swamp f={f} id="hy6" />
    <circle cx={320} cy={800} r={360} fill={FIRE} opacity={0.08 + Math.sin(f / 2) * 0.03} />
    <g transform="translate(650 930) scale(0.7)"><HydraFig f={f} heads={7} stumps={[0, 1, 2, 4, 5, 6]} burn /></g>
    <g transform="translate(180 1180) scale(0.75)"><Hero f={f} swing={40} /></g>
    <g transform="translate(360 1190) scale(0.65)"><Hero f={f} torch pelt={false} swing={Math.sin(f / 4) * 20} /></g>
    {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={480 + random(`sm${i}`) * 320} cy={700 - ((f * 4 + i * 60) % 500)} r={20 + i * 2} fill="#3a3a3a" opacity={0.15} />)}
  </svg>
);

const HRock: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a1a1a" bottom="#050505" id="hy7" />
    <path d="M0 1050 L1080 1050 V1920 H0 Z" fill="#0c0c0c" />
    <path d="M240 1050 Q260 700 540 640 Q820 700 840 1050 Z" fill="#2a2826" stroke="#4a4844" strokeWidth={6} />
    <path d="M300 900 L420 820 M640 760 L700 880" stroke="#141210" strokeWidth={6} />
    <g transform={`translate(${540 + Math.sin(f / 2) * 4} 1100)`}>
      <ellipse cx={0} cy={20} rx={60} ry={14} fill="#000" />
      <ellipse cx={-22} cy={14} rx={12} ry={6} fill="#ffcf3a" opacity={0.6 + Math.sin(f / 5) * 0.4} /><ellipse cx={22} cy={14} rx={12} ry={6} fill="#ffcf3a" opacity={0.6 + Math.sin(f / 5) * 0.4} />
    </g>
    {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={400 + i * 50} cy={1050 - ((f * 2 + i * 30) % 120)} r={4} fill="#888" opacity={0.5} />)}
  </svg>
);

const HShirt: React.FC<ShotProps> = ({ f, dur }) => {
  const s = clamp(f / (dur * 0.7));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0806" />
      <circle cx={540} cy={800} r={420} fill={VENOM} opacity={0.05} />
      <g transform="translate(540 820)">
        <path d="M-220 -260 L-90 -320 Q0 -280 90 -320 L220 -260 L180 -120 L120 -150 L120 260 L-120 260 L-120 -150 L-180 -120 Z" fill="#e8e0cc" />
        <clipPath id="shirtclip"><path d="M-220 -260 L-90 -320 Q0 -280 90 -320 L220 -260 L180 -120 L120 -150 L120 260 L-120 260 L-120 -150 L-180 -120 Z" /></clipPath>
        <g clipPath="url(#shirtclip)">
          {Array.from({ length: 14 }).map((_, i) => <circle key={i} cx={(random(`sh${i}`) - 0.5) * 440} cy={(random(`si${i}`) - 0.5) * 600} r={20 + random(`sj${i}`) * 90 * s} fill={i % 3 ? "#5a7a2a" : BLOOD} opacity={0.75} />)}
        </g>
      </g>
      <g transform="translate(540 340)">
        <path d="M-20 0 L-10 -120 L10 -120 L20 0 Z" fill="#3a2a1a" />
        <path d="M-6 0 L6 0 L0 60 Z" fill="#c8c8d0" />
        {Array.from({ length: 3 }).map((_, i) => <circle key={i} cx={0} cy={80 + ((f * 6 + i * 50) % 300)} r={10} fill={VENOM} />)}
      </g>
    </svg>
  );
};

const HPyre: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a0a04" bottom="#050101" id="hy8" />
    <circle cx={540} cy={900} r={500} fill={FIRE} opacity={0.12 + Math.sin(f / 3) * 0.04} />
    {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={300 + (i % 2) * 20} y={1060 - i * 30} width={480} height={26} fill="#2a1a0a" transform={`rotate(${i % 2 ? 2 : -2} 540 ${1060 - i * 30})`} />)}
    <g transform="translate(540 890) scale(0.7)"><Hero f={f} swing={-120} fill="#140a04" /></g>
    {Array.from({ length: 16 }).map((_, i) => { const x = 300 + (i / 15) * 480, h = 200 + random(`fl${i}`) * 300; return <path key={i} d={`M${x - 40} 1100 Q${x + Math.sin(f / 2 + i) * 40} ${1100 - h} ${x + 40} 1100 Z`} fill={i % 2 ? FIRE : "#ffcf3a"} opacity={0.75} />; })}
    {Array.from({ length: 20 }).map((_, i) => <circle key={i} cx={300 + random(`em${i}`) * 480} cy={1000 - ((f * 6 + i * 70) % 900)} r={4} fill="#ffcf3a" />)}
  </svg>
);

export const SHOTS24: Record<string, React.FC<ShotProps>> = {
  hswamp: HSwamp, hbirth: HBirth, hera: HeraShot, lerna: Lerna, harrows: HArrows, hregrow: HRegrow,
  hcrab: HCrab, hburn: HBurn, hrock: HRock, hshirt: HShirt, hpyre: HPyre,
};
