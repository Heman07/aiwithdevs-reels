import React from "react";
import { random } from "remotion";
import { ShotProps, Sky } from "./Shots";

/* Creature #25 — Thunderbird */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BOLT = "#cfe8ff", BONE = "#ddd5c0";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const TBird: React.FC<{ f: number; s?: number; fill?: string; eye?: string; flap?: number; claws?: boolean }> = ({ f, s = 1, fill = INK, eye = BOLT, flap = 1, claws = true }) => {
  const a = Math.sin(f / 6) * 18 * flap;
  return (
    <g transform={`scale(${s})`}>
      {[-1, 1].map((d) => (
        <g key={d} transform={`scale(${d} 1) rotate(${-a} 60 -40)`}>
          <path d="M60 -60 C220 -160 420 -200 640 -170 L600 -120 L650 -100 L590 -60 L630 -40 L560 -10 L590 10 L500 30 L510 50 L400 50 L410 70 L300 60 L200 40 L60 30 Z" fill={fill} stroke="#6a8aa0" strokeOpacity={0.5} strokeWidth={4} />
          {Array.from({ length: 7 }).map((_, i) => <path key={i} d={`M${160 + i * 60} ${-110 - i * 4} L${200 + i * 60} ${40 - i * 6}`} stroke="#6a8aa0" strokeOpacity={0.3} strokeWidth={4} />)}
        </g>
      ))}
      <path d="M-70 -60 C-80 60 -50 180 0 260 C50 180 80 60 70 -60 Z" fill={fill} stroke="#6a8aa0" strokeOpacity={0.5} strokeWidth={4} />
      <path d="M-40 250 L-80 330 L0 300 L80 330 L40 250 Z" fill={fill} />
      {claws && [-1, 1].map((d) => <g key={d} transform={`translate(${d * 30} 200)`}><path d={`M0 0 L${d * 10} 90`} stroke={fill} strokeWidth={14} /><path d={`M${d * 10} 90 l-20 30 M${d * 10} 90 l0 36 M${d * 10} 90 l20 30`} stroke="#c8c0a8" strokeWidth={6} strokeLinecap="round" /></g>)}
      <circle cx={0} cy={-110} r={70} fill={fill} stroke="#6a8aa0" strokeOpacity={0.5} strokeWidth={4} />
      {[-1, 1].map((d) => <path key={d} d={`M${d * 30} -170 Q${d * 70} -260 ${d * 40} -300`} stroke={fill} strokeWidth={16} fill="none" strokeLinecap="round" />)}
      <path d="M-24 -90 L0 -10 Q30 -40 24 -90 Z" fill="#d8b040" />
      <ellipse cx={-30} cy={-120} rx={14} ry={9} fill={eye} /><ellipse cx={30} cy={-120} rx={14} ry={9} fill={eye} />
      <circle cx={-30} cy={-120} r={30} fill={eye} opacity={0.2} /><circle cx={30} cy={-120} r={30} fill={eye} opacity={0.2} />
    </g>
  );
};

const Bolt: React.FC<{ x: number; y: number; len: number; seed: string; o?: number }> = ({ x, y, len, seed, o = 1 }) => {
  let d = `M${x} ${y}`, cx = x, cy = y;
  for (let i = 0; i < 8; i++) { cx += (random(`${seed}${i}`) - 0.5) * 120; cy += len / 8; d += ` L${cx} ${cy}`; }
  return <g opacity={o}><path d={d} stroke={BOLT} strokeWidth={14} opacity={0.3} fill="none" /><path d={d} stroke="#fff" strokeWidth={5} fill="none" /></g>;
};

const Storm: React.FC<{ f: number; id: string }> = ({ f, id }) => (
  <>
    <Sky top="#1a2230" bottom="#06080c" id={id} />
    {Array.from({ length: 7 }).map((_, i) => <ellipse key={i} cx={((i * 220 + f * (1 + i % 3)) % 1500) - 200} cy={200 + (i % 4) * 110} rx={320} ry={80} fill="#2a3448" opacity={0.6} />)}
  </>
);

const Kid: React.FC<{ f: number; up?: number; fill?: string }> = ({ f, up = 0, fill = "#3a3a44" }) => (
  <g>
    <path d={`M-12 0 L${-20 - up * 10} 70 M12 0 L${20 + up * 10} 70`} stroke={fill} strokeWidth={14} strokeLinecap="round" />
    <path d="M-24 -100 L24 -100 L18 0 L-18 0 Z" fill={fill} />
    <path d={`M-22 -90 L${-60 - up * 10} ${-60 + Math.sin(f / 2) * 20 * up} M22 -90 L${60 + up * 10} ${-60 - Math.sin(f / 2) * 20 * up}`} stroke={fill} strokeWidth={12} strokeLinecap="round" />
    <circle cx={0} cy={-130} r={26} fill={fill} />
  </g>
);

const House: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-200} y={-240} width={400} height={240} fill="#14161c" />
    <path d="M-230 -240 L0 -400 L230 -240 Z" fill="#0c0e12" />
    <rect x={-140} y={-180} width={70} height={70} fill="#ffd27a" opacity={0.7} /><rect x={70} y={-180} width={70} height={70} fill="#ffd27a" opacity={0.7} />
    <rect x={-30} y={-130} width={60} height={130} fill="#0a0a0a" />
  </g>
);

const Lawndale: React.FC<ShotProps> = ({ f, dur }) => {
  const sw = clamp(f / (dur * 0.6));
  return (
    <svg width={W} height={H}>
      <Sky top="#7a8aa0" bottom="#2a3240" id="tb1" />
      <House x={780} y={1120} />
      <rect y={1120} width={W} height={H} fill="#1a2418" />
      <path d="M0 1080 L1080 1080" stroke="#2a2a2a" strokeWidth={6} />
      {Array.from({ length: 12 }).map((_, i) => <line key={i} x1={i * 90} y1={1040} x2={i * 90} y2={1120} stroke="#2a2a2a" strokeWidth={8} />)}
      <g transform={`translate(380 ${1100 - Math.max(0, sw - 0.75) * 400})`}><Kid f={f} up={sw > 0.75 ? 1 : 0} /></g>
      <g transform={`translate(${-200 + sw * 580} ${200 + sw * 620}) scale(0.4)`}><TBird f={f} /></g>
      <g transform={`translate(${1200 - sw * 500} ${300 + sw * 300}) scale(0.3)`}><TBird f={f + 9} /></g>
    </svg>
  );
};

const Totem: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a3a3a" bottom="#08100e" id="tb2" />
    {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${i * 150 - 40} 1150 L${i * 150 + 40} 500 L${i * 150 + 120} 1150 Z`} fill="#0a1410" />)}
    <g transform="translate(540 1150)">
      <rect x={-90} y={-700} width={180} height={700} fill="#4a2a1a" />
      {[0, 1, 2].map((k) => <g key={k} transform={`translate(0 ${-120 - k * 220})`}>
        <ellipse cx={-40} cy={-20} rx={30} ry={20} fill="#0a0a0a" /><ellipse cx={40} cy={-20} rx={30} ry={20} fill="#0a0a0a" />
        <circle cx={-40} cy={-20} r={8} fill="#e8e0cc" /><circle cx={40} cy={-20} r={8} fill="#e8e0cc" />
        <rect x={-50} y={30} width={100} height={20} fill={k === 1 ? "#a01a10" : "#1a4a5a"} />
      </g>)}
      <g transform="translate(0 -760)">
        {[-1, 1].map((d) => <path key={d} d={`M0 0 L${d * 300} -60 L${d * 280} 0 L${d * 260} 20 Z`} fill="#4a2a1a" stroke="#1a4a5a" strokeWidth={10} />)}
        <circle r={70} fill="#4a2a1a" /><path d="M-20 10 L0 70 L20 10 Z" fill="#a01a10" />
        <ellipse cx={-26} cy={-10} rx={16} ry={10} fill="#0a0a0a" /><ellipse cx={26} cy={-10} rx={16} ry={10} fill="#0a0a0a" />
      </g>
    </g>
    {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={random(`tf${i}`) * W} cy={(random(`tg${i}`) * 900 + f * 2) % 1150} r={2} fill="#ffd27a" opacity={0.4} />)}
  </svg>
);

const TBSky: React.FC<ShotProps> = ({ f }) => {
  const flash = (f % 50) < 4;
  return (
    <svg width={W} height={H}>
      <Storm f={f} id="tb3" />
      {flash && <rect width={W} height={H} fill="#cfe8ff" opacity={0.25} />}
      <g transform={`translate(540 ${640 + Math.sin(f / 12) * 20}) scale(0.95)`}><TBird f={f} /></g>
      {flash && <Bolt x={200} y={700} len={480} seed={`b${Math.floor(f / 50)}`} />}
      {flash && <Bolt x={880} y={680} len={500} seed={`c${Math.floor(f / 50)}`} />}
      <path d="M0 1180 L180 1080 L340 1140 L520 1060 L720 1130 L900 1070 L1080 1120 V1920 H0 Z" fill="#05070a" />
    </svg>
  );
};

const TBEyes: React.FC<ShotProps> = ({ f }) => {
  const blink = (f % 36) < 6;
  return (
    <svg width={W} height={H}>
      <Storm f={f} id="tb4" />
      <g transform="translate(540 900) scale(2.4)"><TBird f={f} flap={0.3} claws={false} eye={blink ? "#fff" : BOLT} /></g>
      {blink && <><Bolt x={468} y={630} len={560} seed={`e${Math.floor(f / 36)}`} /><Bolt x={612} y={630} len={560} seed={`g${Math.floor(f / 36)}`} /><rect width={W} height={H} fill="#cfe8ff" opacity={0.2} /></>}
    </svg>
  );
};

const HornSerpent: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <path d={`M-400 0 C-250 ${-80 + Math.sin(f / 8) * 40} -100 ${80 - Math.sin(f / 8) * 40} 50 0 S300 ${-60 + Math.sin(f / 7) * 30} 380 0`} stroke="#1e4a3a" strokeWidth={70} fill="none" strokeLinecap="round" />
    <g transform="translate(400 0)"><ellipse rx={70} ry={45} fill="#1e4a3a" /><path d="M-10 -40 Q10 -120 60 -130 M30 -40 Q60 -100 100 -100" stroke="#c8b070" strokeWidth={10} fill="none" /><circle cx={30} cy={-10} r={9} fill="#ff4a2a" /></g>
  </g>
);

const TBSerpent: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Storm f={f} id="tb5" />
    <rect y={760} width={W} height={H} fill="#061418" />
    {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M0 ${780 + i * 4} Q270 ${770 + Math.sin(f / 10 + i) * 10} 540 ${780 + i * 4} T1080 ${780 + i * 4}`} stroke="#2a5a6a" strokeOpacity={0.3} strokeWidth={3} fill="none" />)}
    <g transform="translate(540 380) scale(0.5)"><TBird f={f} /></g>
    <g transform="translate(500 920)"><HornSerpent f={f} /></g>
  </svg>
);

const TBWhale: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <Storm f={f} id="tb6" />
      <rect y={900 + Math.sin(f / 3) * 20} width={W} height={H} fill="#061418" />
      {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${i * 200 - 100} ${920 + Math.sin(f / 3 + i) * 30} q60 -100 120 0`} fill="#0a2a34" />)}
      <g transform={`translate(560 ${760 - t * 120}) rotate(${Math.sin(f / 4) * 8})`}>
        <path d="M-300 0 C-260 -120 160 -140 280 -40 C320 0 300 60 260 70 C100 110 -200 100 -300 0 Z" fill="#2e3e4e" stroke="#6a8a9a" strokeWidth={4} />
        <path d="M-300 0 L-420 -80 L-400 0 L-420 80 Z" fill="#2e3e4e" />
        <circle cx={200} cy={-10} r={10} fill="#e8e0cc" />
        {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={(random(`wb${i}`) - 0.5) * 300} cy={60 + ((f * 6 + i * 40) % 220)} r={8} fill={BLOOD} />)}
      </g>
      <g transform={`translate(560 ${420 - t * 120}) scale(0.65)`}><TBird f={f} flap={2} eye="#fff" /></g>
      {(f % 30) < 4 && <><Bolt x={120} y={400} len={500} seed={`w${Math.floor(f / 30)}`} /><rect width={W} height={H} fill="#fff" opacity={0.15} /></>}
    </svg>
  );
};

const TBQuake: React.FC<ShotProps> = ({ f, dur }) => {
  const wave = clamp((f - dur * 0.4) / (dur * 0.5));
  return (
    <svg width={W} height={H}>
      <Sky top="#3a3a40" bottom="#14141a" id="tb7" />
      <g transform={`translate(${Math.sin(f * 2) * 8} 0)`}>
        <path d="M0 1080 L1080 1080 V1920 H0 Z" fill="#1a1c18" />
        {[160, 360, 560].map((x, i) => <g key={i} transform={`translate(${x} 1080) rotate(${Math.sin(f / 2 + i) * 4})`}><rect x={-70} y={-140} width={140} height={140} fill="#3a2a1a" /><path d="M-90 -140 L0 -220 L90 -140 Z" fill="#2a1a10" /></g>)}
        <path d="M640 1080 L700 1200 L660 1320 L720 1500" stroke="#000" strokeWidth={10} fill="none" />
      </g>
      <path d={`M${1080 - wave * 1300} 1100 C${1180 - wave * 1300} 500 ${1500 - wave * 1300} 400 ${1700 - wave * 1300} 600 L1700 1920 L${1080 - wave * 1300} 1920 Z`} fill="#0a3a4a" opacity={0.95} />
      <path d={`M${1180 - wave * 1300} 640 q80 -120 200 -60`} stroke="#cfe8ff" strokeWidth={10} fill="none" />
    </svg>
  );
};

const TBJapan: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / (dur * 0.6));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#e8dcc0" />
      <rect width={W} height={H} fill="#000" opacity={0.25} />
      <path d="M80 600 Q200 520 260 640 Q230 760 120 740 Z" fill="#8a7a5a" />
      <path d="M820 500 Q940 560 960 720 Q900 820 840 760 Z" fill="#8a7a5a" />
      <text x={140} y={800} fontFamily="Cinzel" fontWeight={900} fontSize={34} fill="#3a2a1a">CASCADIA</text>
      <text x={840} y={480} fontFamily="Cinzel" fontWeight={900} fontSize={34} fill="#3a2a1a">JAPAN</text>
      <path d={`M260 660 Q540 ${560} ${260 + t * 580} ${660 - t * 120}`} stroke={BLOOD} strokeWidth={8} fill="none" strokeDasharray="20 14" />
      {[1, 2, 3].map((k) => <circle key={k} cx={260} cy={660} r={((f * 4 + k * 60) % 300)} fill="none" stroke="#0a3a4a" strokeWidth={4} opacity={0.5} />)}
      <g opacity={clamp((f - dur * 0.55) / 10)} transform="translate(540 920)">
        <rect x={-180} y={0} width={360} height={260} fill="#f4ecd8" stroke="#3a2a1a" strokeWidth={4} />
        {Array.from({ length: 7 }).map((_, i) => <path key={i} d={`M${140 - i * 46} 30 L${140 - i * 46} 230`} stroke="#1a1a1a" strokeWidth={6} strokeDasharray="14 10" />)}
      </g>
    </svg>
  );
};

const Drop: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / dur);
  const fall = t > 0.5 ? (t - 0.5) * 2 : 0;
  return (
    <svg width={W} height={H}>
      <Sky top="#7a8aa0" bottom="#2a3240" id="tb8" />
      <rect y={1120} width={W} height={H} fill="#1a2418" />
      <g transform={`translate(${300 + t * 400} ${520 - t * 80}) scale(0.5)`}><TBird f={f} flap={1.5} /></g>
      <g transform={`translate(${300 + Math.min(t, 0.5) * 400} ${720 - Math.min(t, 0.5) * 80 + fall * fall * 380}) rotate(${fall * 40})`}><Kid f={f} up={1} /></g>
      <g transform="translate(140 1110)">
        <path d="M-30 0 L-40 -150 L40 -150 L30 0 Z" fill="#3a2a3a" /><circle cx={0} cy={-190} r={34} fill="#3a2a3a" />
        <path d="M-30 -140 L-80 -230 M30 -140 L80 -230" stroke="#3a2a3a" strokeWidth={16} strokeLinecap="round" />
        <ellipse cx={0} cy={-180} rx={10} ry={14} fill="#000" />
      </g>
    </svg>
  );
};

const Wingspan: React.FC<ShotProps> = ({ f }) => {
  const m = clamp((f - 10) / 20);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0c10" />
      {Array.from({ length: 12 }).map((_, i) => <line key={i} x1={0} y1={300 + i * 70} x2={W} y2={300 + i * 70} stroke="#1a2230" strokeWidth={2} />)}
      <g transform="translate(540 600) scale(0.75)"><TBird f={f} flap={0.2} /></g>
      <g opacity={m}><path d="M70 900 L1010 900" stroke={BLOOD} strokeWidth={6} /><path d="M70 880 v40 M1010 880 v40" stroke={BLOOD} strokeWidth={6} />
        <text x={540} y={980} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={60} fill={BLOOD}>~ 10 FEET</text></g>
      <g transform="translate(960 1080) scale(0.7)" opacity={m}><Kid f={0} fill="#5a5a66" /></g>
    </svg>
  );
};

const TBPhoto: React.FC<ShotProps> = ({ f }) => {
  const g = (f % 40) < 3;
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0806" />
      <g transform={`translate(${g ? 12 : 0} 0) rotate(-3 540 800)`}>
        <rect x={110} y={460} width={860} height={640} fill="#d8c8a0" />
        <rect x={140} y={490} width={800} height={580} fill="#6a5a40" />
        <rect x={140} y={490} width={800} height={260} fill="#9a8a68" />
        <rect x={160} y={620} width={760} height={360} fill="#4a3a28" />
        <g transform="translate(540 700) scale(0.6)"><TBird f={0} flap={0} fill="#1a140c" eye="#1a140c" claws={false} /></g>
        {[220, 330, 750, 860].map((x, i) => <g key={i} transform={`translate(${x} 1050)`}><path d="M-22 0 L-26 -130 L26 -130 L22 0 Z" fill="#1a140c" /><circle cx={0} cy={-150} r={20} fill="#1a140c" /><rect x={-24} y={-176} width={48} height={14} fill="#1a140c" /></g>)}
        <rect x={140} y={490} width={800} height={580} fill="#ffeacc" opacity={0.15} />
      </g>
      <text x={540} y={380} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={46} fill={BLOOD} opacity={0.5 + Math.sin(f / 4) * 0.3}>FILE NOT FOUND</text>
    </svg>
  );
};

export const SHOTS25: Record<string, React.FC<ShotProps>> = {
  lawndale: Lawndale, tbtotem: Totem, tbsky: TBSky, tbeyes: TBEyes, tbserpent: TBSerpent, tbwhale: TBWhale,
  tbquake: TBQuake, tbjapan: TBJapan, drop: Drop, wingspan: Wingspan, tbphoto: TBPhoto,
};
