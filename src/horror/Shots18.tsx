import React from "react";
import { random } from "remotion";
import { ShotProps, Sky } from "./Shots";

/* Creature #18 — Phoenix */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", FIRE = "#ff6a1a", GOLD = "#ffc84a";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const Bird: React.FC<{ f: number; fill?: string; eye?: string; spread?: number; scream?: boolean }> = ({ f, fill = "#c8301a", eye = GOLD, spread = 1, scream }) => {
  const flap = Math.sin(f / 6) * 14 * spread;
  return (
    <g>
      {[-1, 1].map((d) => (
        <g key={d} transform={`scale(${d} 1) rotate(${-flap} 30 -40)`}>
          <path d={`M30 -40 C120 ${-160 * spread} 280 ${-260 * spread} ${420 * spread} ${-200 * spread} C340 -150 300 -100 260 -60 C300 -40 280 -10 240 0 C200 20 120 10 30 0 Z`} fill={fill} stroke={GOLD} strokeOpacity={0.7} strokeWidth={4} />
          {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${80 + i * 50 * spread} ${-40 - i * 24 * spread} l${40 * spread} ${70}`} stroke={GOLD} strokeOpacity={0.5} strokeWidth={4} />)}
        </g>
      ))}
      <path d="M-40 -60 C-50 40 -20 120 0 200 C20 120 50 40 40 -60 Z" fill={fill} stroke={GOLD} strokeOpacity={0.7} strokeWidth={4} />
      {[-30, 0, 30].map((x, i) => <path key={i} d={`M${x} 160 C${x - 20 + Math.sin(f / 8 + i) * 20} 280 ${x + 40} 360 ${x + Math.sin(f / 6 + i) * 30} 460`} stroke={i === 1 ? GOLD : fill} strokeWidth={14} fill="none" strokeLinecap="round" />)}
      <circle cx={0} cy={-100} r={44} fill={fill} stroke={GOLD} strokeOpacity={0.7} strokeWidth={4} />
      <path d={`M-30 -100 L-90 ${scream ? -110 : -90} L-30 -84 Z`} fill={GOLD} />
      {scream && <path d="M-30 -96 L-86 -96 L-30 -90 Z" fill="#000" />}
      <path d="M0 -140 C-10 -200 30 -230 50 -210 C30 -200 20 -170 20 -140 Z" fill={GOLD} />
      <circle cx={-12} cy={-108} r={7} fill={eye} />
    </g>
  );
};

const Flames: React.FC<{ x: number; y: number; w: number; h: number; f: number; n?: number }> = ({ x, y, w, h, f, n = 9 }) => (
  <g>
    {Array.from({ length: n }).map((_, i) => {
      const fx = x - w / 2 + (i / (n - 1)) * w, fh = h * (0.6 + 0.4 * Math.abs(Math.sin(f / 3 + i * 1.7)));
      return <g key={i}><path d={`M${fx - 40} ${y} Q${fx - 50} ${y - fh * 0.5} ${fx} ${y - fh} Q${fx + 50} ${y - fh * 0.5} ${fx + 40} ${y} Z`} fill={FIRE} opacity={0.9} /><path d={`M${fx - 20} ${y} Q${fx - 24} ${y - fh * 0.35} ${fx} ${y - fh * 0.6} Q${fx + 24} ${y - fh * 0.35} ${fx + 20} ${y} Z`} fill={GOLD} /></g>;
    })}
  </g>
);

const Embers: React.FC<{ f: number; cx?: number; cy?: number; n?: number }> = ({ f, cx = 540, cy = 1200, n = 30 }) => (
  <g>{Array.from({ length: n }).map((_, i) => <circle key={i} cx={cx + (random(`em${i}`) - 0.5) * 700 + Math.sin(f / 10 + i) * 20} cy={cy - ((f * (4 + random(`ev${i}`) * 5) + i * 40) % 1100)} r={2 + random(`er${i}`) * 4} fill={GOLD} opacity={0.8} />)}</g>
);

const Pyre: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a0a04" bottom="#050101" id="ph1" />
    <circle cx={540} cy={900} r={520} fill={FIRE} opacity={0.18 + 0.05 * Math.sin(f / 3)} />
    <g transform="translate(540 1200)">{Array.from({ length: 7 }).map((_, i) => <rect key={i} x={-260 + i * 10} y={-i * 30} width={520 - i * 20} height={26} fill="#2a1a0c" transform={`rotate(${(i % 2 ? 4 : -4)})`} />)}</g>
    <Flames x={540} y={1050} w={520} h={300} f={f} />
    <g transform={`translate(540 ${760 + Math.sin(f / 8) * 10}) scale(0.9)`}><Bird f={f} spread={1} scream={(f % 40) < 10} /></g>
    <Embers f={f} />
  </svg>
);

const SunTemple: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#4a2a14" bottom="#140804" id="ph2" />
    <circle cx={540} cy={560} r={220} fill={GOLD} opacity={0.85} />
    <circle cx={540} cy={560} r={360} fill={GOLD} opacity={0.15} />
    <path d="M0 1150 L1080 1150 L1080 1920 L0 1920 Z" fill="#2a1a0c" />
    <path d="M160 1150 L200 700 L240 1150 Z M840 1150 L880 640 L920 1150 Z" fill="#1a0e06" />
    <path d="M340 1150 L340 860 L740 860 L740 1150 Z" fill="#1a0e06" /><path d="M300 860 L780 860 L760 820 L320 820 Z" fill="#1a0e06" />
    <g transform={`translate(540 ${760 + Math.sin(f / 10) * 8}) scale(0.5)`}>
      <ellipse cx={0} cy={0} rx={80} ry={60} fill="#1a2a30" /><path d="M-60 -20 C-100 -120 -60 -200 -20 -220 C0 -200 -10 -140 0 -80" stroke="#1a2a30" strokeWidth={30} fill="none" />
      <path d="M-20 -220 L-120 -200" stroke="#1a2a30" strokeWidth={14} /><path d="M-10 -230 l-10 -60 M0 -230 l10 -60" stroke="#1a2a30" strokeWidth={6} />
      <path d="M-20 60 L-30 200 M20 60 L30 200" stroke="#1a2a30" strokeWidth={10} />
    </g>
  </svg>
);

const PhScroll: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0806" />
    <g transform="translate(540 860) rotate(-2)">
      <rect x={-430} y={-560} width={860} height={1120} fill="#c9b48a" />
      {Array.from({ length: 8 }).map((_, i) => <line key={i} x1={-380} y1={-500 + i * 30} x2={380 - (i % 3) * 60} y2={-500 + i * 30} stroke="#4a3a20" strokeWidth={6} strokeDasharray="14 5 30 5" />)}
      <g transform="translate(0 100) scale(0.75)" opacity={clamp(f / 40)}><Bird f={0} fill="#a8502a" eye="#4a2a10" /></g>
      <text x={0} y={490} textAnchor="middle" fontFamily="Fell" fontSize={46} fill="#4a2a10">Herodotus · Histories II.73</text>
    </g>
  </svg>
);

const Nest: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a1a14" bottom="#070403" id="ph3" />
    <path d="M300 1250 L540 1100 L780 1250 Z" fill="#1a1410" />
    <g transform="translate(540 1130)">
      {Array.from({ length: 30 }).map((_, i) => <rect key={i} x={-220 + random(`ns${i}`) * 440} y={-20 + random(`nt${i}`) * 60} width={140} height={14} rx={7} fill={["#8a4a1a", "#6a3a14", "#a8602a"][i % 3]} transform={`rotate(${(random(`nu${i}`) - 0.5) * 50} 0 0)`} />)}
      <g transform={`translate(0 -60) rotate(80) scale(0.6)`}><Bird f={0} spread={0.4} eye="#3a1a0a" /></g>
    </g>
    {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${440 + i * 25} ${1060 - ((f * 1.5 + i * 30) % 300)} q15 -20 0 -40`} stroke="#c8b8a0" strokeWidth={6} fill="none" opacity={0.3} />)}
  </svg>
);

const PhBurn: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0c0202" />
    <circle cx={540} cy={900} r={600} fill={FIRE} opacity={0.25 + 0.08 * Math.sin(f / 2)} />
    <g transform={`translate(540 ${820 + Math.sin(f / 3) * 14}) scale(1.05)`}><Bird f={f * 2} spread={1.1} scream eye="#fff" /></g>
    <Flames x={540} y={1250} w={760} h={720} f={f} n={12} />
    <Embers f={f * 1.5} n={50} />
  </svg>
);

const Ash: React.FC<ShotProps> = ({ f, dur }) => {
  const grow = clamp((f - 20) / (dur * 0.6));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#060404" />
      <ellipse cx={540} cy={1180} rx={340} ry={70} fill="#3a3430" />
      {Array.from({ length: 50 }).map((_, i) => <circle key={i} cx={240 + random(`as${i}`) * 600} cy={1150 + random(`at${i}`) * 60} r={4 + random(`au${i}`) * 10} fill={i % 7 === 0 ? FIRE : "#5a524a"} opacity={0.8} />)}
      <g transform={`translate(540 ${1140 - grow * 80})`}>
        {grow < 0.6 ? (
          <path d={`M-60 0 ${Array.from({ length: 6 }).map((_, i) => `q10 ${(i % 2 ? -1 : 1) * 14 * Math.sin(f / 3 + i)} 20 0`).join(" ")}`} stroke="#c8b8a0" strokeWidth={18 + grow * 20} fill="none" strokeLinecap="round" />
        ) : (
          <g transform={`scale(${(grow - 0.5) * 0.8})`}><Bird f={f} spread={0.5} fill="#8a2a1a" eye={BLOOD} /></g>
        )}
      </g>
    </svg>
  );
};

const Myrrh: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#5a3a1a" bottom="#1a0e06" id="ph4" />
    <circle cx={880} cy={480} r={140} fill={GOLD} opacity={0.8} />
    <path d="M0 1200 Q300 1100 600 1160 Q850 1210 1080 1120 V1920 H0 Z" fill="#6a4a24" />
    <g transform="translate(900 1120)"><path d="M-120 0 L-120 -220 L120 -220 L120 0 Z" fill="#2a1a0c" /><path d="M-160 -220 L160 -220 L140 -260 L-140 -260 Z" fill="#2a1a0c" /><circle cx={0} cy={-330} r={50} fill={GOLD} opacity={0.6} /></g>
    <g transform={`translate(${-200 + f * 6} ${700 + Math.sin(f / 8) * 30}) scale(0.5)`}><Bird f={f} /><ellipse cx={0} cy={260} rx={80} ry={100} fill="#8a5a2a" stroke={GOLD} strokeWidth={4} /></g>
  </svg>
);

const Claudius: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#4a4a5a" bottom="#14141a" id="ph5" />
    {[-360, -200, 200, 360].map((x, i) => <rect key={i} x={540 + x - 30} y={420} width={60} height={760} fill="#d8d0c0" opacity={0.7} />)}
    <path d="M100 420 L980 420 L940 360 L140 360 Z" fill="#d8d0c0" opacity={0.7} />
    <g transform="translate(540 900)">
      <rect x={-160} y={-200} width={320} height={300} fill="none" stroke="#c8a040" strokeWidth={8} />
      {Array.from({ length: 8 }).map((_, i) => <line key={i} x1={-160 + i * 45} y1={-200} x2={-160 + i * 45} y2={100} stroke="#c8a040" strokeWidth={6} />)}
      <g transform="translate(0 -20) scale(0.4)"><Bird f={f} spread={0.5} /></g>
    </g>
    <path d="M0 1180 L1080 1180 L1080 1920 L0 1920 Z" fill="#1a1814" />
    {Array.from({ length: 12 }).map((_, i) => <g key={i} transform={`translate(${60 + i * 88} ${1300 + (i % 2) * 30})`}><path d="M-24 0 L-16 -110 Q0 -126 16 -110 L24 0 Z" fill={INK} /><circle cx={0} cy={-126} r={15} fill={INK} /></g>)}
  </svg>
);

const FakeBird: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#1a1612" />
    <g transform="translate(540 820) scale(1.1)"><Bird f={0} spread={0.6} fill="#c8603a" eye="#000" /></g>
    {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M${420 + i * 25} 700 l10 ${40 + i * 6}`} stroke="#e8c070" strokeWidth={6} opacity={0.6} />)}
    <text x={540} y={1460} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={110} fill={BLOOD} transform="rotate(-8 540 1460)" opacity={clamp((f - 10) / 8)}>FAKE</text>
  </svg>
);

const PhCycle: React.FC<ShotProps> = ({ f }) => {
  const t = (f % 90) / 90;
  const burning = t > 0.5;
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#080202" />
      <g transform={`translate(540 860) rotate(${f * 2})`}>
        <circle r={380} fill="none" stroke={FIRE} strokeWidth={6} strokeDasharray="40 30" opacity={0.6} />
        {Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={Math.cos(i * 0.785) * 380} cy={Math.sin(i * 0.785) * 380} r={14} fill={i % 2 ? GOLD : FIRE} />)}
      </g>
      <g transform={`translate(540 ${880 - (burning ? 0 : t * 200)}) scale(${burning ? 0.8 - (t - 0.5) : 0.3 + t})`}><Bird f={f} scream={burning} /></g>
      {burning && <Flames x={540} y={1150} w={500} h={500 * (t - 0.5) * 2} f={f} />}
    </svg>
  );
};

const PhEyes: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#050101" />
    <Flames x={540} y={1500} w={1100} h={700} f={f} n={14} />
    <g transform="translate(540 820)">
      <ellipse cx={-130} cy={0} rx={80} ry={40 * clamp((f - 8) / 12) + 2} fill={GOLD} /><ellipse cx={130} cy={0} rx={80} ry={40 * clamp((f - 8) / 12) + 2} fill={GOLD} />
      <ellipse cx={-130} cy={0} rx={12} ry={36 * clamp((f - 8) / 12)} fill="#000" /><ellipse cx={130} cy={0} rx={12} ry={36 * clamp((f - 8) / 12)} fill="#000" />
      <circle cx={0} cy={0} r={400} fill={GOLD} opacity={0.06} />
    </g>
    <Embers f={f} cy={1500} n={40} />
  </svg>
);

export const SHOTS18: Record<string, React.FC<ShotProps>> = {
  pyre: Pyre, suntemple: SunTemple, phscroll: PhScroll, nest: Nest, phburn: PhBurn, ash: Ash,
  myrrh: Myrrh, claudius: Claudius, fakebird: FakeBird, phcycle: PhCycle, pheyes: PhEyes,
};
