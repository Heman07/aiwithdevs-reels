import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";
import { Hero } from "./Shots24";

/* Creature #39 — Nemean Lion */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BONE = "#ddd5c0", GOLD = "#d8a030", FUR = "#b8801a";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const LionFig: React.FC<{ f: number; s?: number; eye?: string; walk?: boolean; roar?: number; glow?: boolean }> = ({ f, s = 1, eye = "#ffe23a", walk, roar = 0, glow = true }) => {
  const w = walk ? Math.sin(f / 5) * 18 : 0;
  const st = { stroke: "#ffd27a", strokeOpacity: 0.5, strokeWidth: 4 } as const;
  return (
    <g transform={`scale(${s})`}>
      {glow && <ellipse cx={0} cy={-40} rx={380} ry={220} fill={GOLD} opacity={0.08} />}
      <path d={`M230 -40 C320 -60 360 ${-10 + Math.sin(f / 8) * 20} 380 50`} stroke={FUR} strokeWidth={22} fill="none" strokeLinecap="round" />
      <ellipse cx={384} cy={58} rx={18} ry={26} fill="#5a3a10" />
      {[[-150, w], [-80, -w], [140, -w], [210, w]].map(([x, o], i) => <path key={i} d={`M${x} 0 L${x - 8 + o} 150 L${x + 32 + o} 150 L${x + 34} 0 Z`} fill={FUR} {...st} />)}
      {[[-150, w], [-80, -w]].map(([x, o], i) => <path key={i} d={`M${x - 10 + o} 150 l-12 16 M${x + 4 + o} 150 l-4 18 M${x + 18 + o} 150 l4 16`} stroke={BONE} strokeWidth={6} />)}
      <ellipse cx={40} cy={-30} rx={250} ry={95} fill={FUR} {...st} />
      <g transform="translate(-210 -80)">
        {Array.from({ length: 24 }).map((_, i) => { const a = (i / 24) * Math.PI * 2; const r = 150 + random(`nm${i}`) * 50 + Math.sin(f / 8 + i) * 5; return <path key={i} d={`M${Math.cos(a) * 60} ${Math.sin(a) * 60} L${Math.cos(a + 0.1) * r} ${Math.sin(a + 0.1) * r} L${Math.cos(a + 0.26) * 80} ${Math.sin(a + 0.26) * 80} Z`} fill="#7a4a0a" />; })}
        <circle r={125} fill="#7a4a0a" />
        <path d="M-80 -60 C-90 -100 -40 -120 0 -110 C50 -100 80 -60 70 0 C70 60 30 110 -20 120 C-70 110 -100 60 -80 -60 Z" fill="#c8901e" {...st} />
        <path d="M-40 -110 L-60 -150 L-20 -120 M30 -110 L50 -150 L10 -116" fill="#c8901e" stroke="#c8901e" strokeWidth={10} />
        <ellipse cx={-40} cy={-30} rx={14} ry={9} fill={eye} /><ellipse cx={20} cy={-30} rx={14} ry={9} fill={eye} />
        <ellipse cx={-40} cy={-30} rx={4} ry={8} fill="#000" /><ellipse cx={20} cy={-30} rx={4} ry={8} fill="#000" />
        <path d="M-58 -46 L-24 -40 M38 -46 L4 -40" stroke="#3a1a04" strokeWidth={6} />
        <path d="M-30 10 L-10 10 L-20 24 Z" fill="#3a1a0a" />
        <path d={`M-60 40 Q-20 ${50 + roar * 10} 20 40 Q0 ${80 + roar * 60} -20 ${84 + roar * 60} Q-50 ${80 + roar * 50} -60 40 Z`} fill="#2a0404" />
        {[-50, -36, 4, 14].map((x, i) => <path key={i} d={`M${x} 42 l5 ${16 + roar * 10} l5 ${-16 - roar * 10}`} fill={BONE} />)}
        {roar > 0.3 && [-44, 4].map((x, i) => <path key={i} d={`M${x} ${84 + roar * 56} l5 -20 l5 20`} fill={BONE} />)}
      </g>
    </g>
  );
};

const Hills: React.FC<{ f: number; id: string; top?: string; bottom?: string; moon?: boolean }> = ({ f, id, top = "#3a2a1a", bottom = "#0c0804", moon }) => (
  <>
    <Sky top={top} bottom={bottom} id={id} />
    {moon && <Moon x={800} y={320} r={90} f={f} />}
    <path d="M0 960 L180 800 L360 900 L560 740 L780 880 L1080 780 V1150 H0 Z" fill="#2a1e10" />
    <rect y={1150} width={W} height={H} fill="#1a1208" />
  </>
);

const Cave: React.FC<{ x?: number; dark?: boolean }> = ({ x = 760, dark }) => (
  <g transform={`translate(${x} 1150)`}>
    <path d="M-280 0 C-260 -300 -60 -420 120 -380 C260 -340 300 -160 300 0 Z" fill="#3a2a1a" />
    <path d="M-120 0 C-110 -160 -20 -220 60 -200 C130 -180 150 -80 150 0 Z" fill="#000" opacity={dark ? 1 : 0.95} />
  </g>
);

const NlReveal: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0602" />
    <circle cx={540} cy={800} r={480} fill={GOLD} opacity={0.1 + Math.sin(f / 5) * 0.03} />
    <g transform="translate(620 1020) scale(1.2)"><LionFig f={f} roar={Math.abs(Math.sin(f / 10))} /></g>
    {Array.from({ length: 5 }).map((_, i) => { const t = ((f + i * 9) % 30) / 30; return <g key={i} transform={`translate(${100 + t * 260} ${600 + i * 60 - (t > 0.8 ? (t - 0.8) * 400 : 0)}) rotate(${t > 0.8 ? -60 : 10})`} opacity={t < 0.95 ? 1 : 0}><path d="M-50 0 L30 0" stroke="#5a3a20" strokeWidth={5} /><path d="M30 -6 L46 0 L30 6 Z" fill="#aaa" /></g>; })}
  </svg>
);

const MoonFall: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / (dur * 0.7));
  return (
    <svg width={W} height={H}>
      <Hills f={f} id="nl1" top="#0e1426" bottom="#04060c" />
      <circle cx={760} cy={300} r={130} fill="#e8e0c8" />
      <circle cx={720} cy={270} r={20} fill="#c8c0a8" /><circle cx={800} cy={340} r={14} fill="#c8c0a8" />
      <g transform={`translate(${760 - t * 340} ${300 + t * 820})`}>
        <circle r={60 - t * 20} fill={GOLD} /><circle r={120 - t * 40} fill={GOLD} opacity={0.3} />
        <path d={`M0 0 L${t * 340 * 0.6} ${-t * 820 * 0.6}`} stroke={GOLD} strokeWidth={30} opacity={0.3} />
      </g>
      {t >= 1 && <g transform="translate(420 1140) scale(0.45)"><LionFig f={f} /></g>}
      {t >= 1 && <circle cx={420} cy={1100} r={220} fill={GOLD} opacity={Math.max(0, 0.4 - (f - dur * 0.7) / 40)} />}
    </svg>
  );
};

const Nemea: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Hills f={f} id="nl2" moon top="#1a1a2a" bottom="#06060a" />
    {[200, 420, 860].map((x, i) => <g key={i} transform={`translate(${x} 1150) scale(0.8)`}><rect x={-90} y={-150} width={180} height={150} fill="#1a1410" /><path d="M-110 -150 L0 -230 L110 -150 Z" fill="#2a1a10" /><rect x={-26} y={-100} width={52} height={100} fill="#000" /></g>)}
    {Array.from({ length: 5 }).map((_, i) => <g key={i} transform={`translate(${560 + i * 60} ${1170 + (i % 2) * 14}) rotate(180)`} opacity={0.7}><ellipse rx={24} ry={14} fill="#c8c0b0" /></g>)}
    <path d="M640 1150 L660 1060 L700 1150" stroke="#3a2a1a" strokeWidth={6} fill="none" />
    <g opacity={0.5 + Math.sin(f / 5) * 0.3}><ellipse cx={600} cy={1000} rx={14} ry={8} fill="#ffe23a" /><ellipse cx={644} cy={1000} rx={14} ry={8} fill="#ffe23a" /></g>
    {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${540 + i * 40} 1200 l20 -10 M${544 + i * 40} 1210 l20 -10`} stroke={BLOOD} strokeWidth={4} opacity={0.5} />)}
  </svg>
);

const Labour: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0806" />
    <circle cx={540} cy={760} r={420} fill={BLOOD} opacity={0.08} />
    {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2 - Math.PI / 2; return <g key={i} transform={`translate(${540 + Math.cos(a) * 360} ${700 + Math.sin(a) * 360})`}><circle r={40} fill={i === 0 ? GOLD : "#2a2018"} stroke={GOLD} strokeWidth={3} opacity={i === 0 ? 1 : 0.5} /><text y={14} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={36} fill={i === 0 ? "#000" : GOLD}>{i + 1}</text></g>; })}
    <g transform="translate(540 1000) scale(1.1)"><Hero f={f} pelt={false} swing={-20} fill="#1a1410" /></g>
    <g transform="translate(540 420)" opacity={0.4}><ellipse cx={-50} cy={0} rx={40} ry={14} fill="#e8d0ff" /><ellipse cx={50} cy={0} rx={40} ry={14} fill="#e8d0ff" /></g>
  </svg>
);

const Bounce: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Hills f={f} id="nl3" />
    <Cave x={800} />
    <g transform="translate(760 1150) scale(0.65)"><LionFig f={f} /></g>
    <g transform="translate(200 1150) scale(0.9)"><Hero f={f} pelt={false} bow fill="#1a1410" /></g>
    {Array.from({ length: 4 }).map((_, i) => { const t = ((f + i * 10) % 40) / 40; const hit = t > 0.6; return <g key={i} transform={`translate(${hit ? 560 - (t - 0.6) * 300 : 260 + t * 500} ${880 + i * 30 - (hit ? (t - 0.6) * 500 : 0)}) rotate(${hit ? -120 + t * 200 : 0})`}><path d="M-50 0 L30 0" stroke="#5a3a20" strokeWidth={5} /><path d="M30 -6 L46 0 L30 6 Z" fill="#aaa" /></g>; })}
    {(f % 40) > 23 && (f % 40) < 27 && <circle cx={560} cy={900} r={30} fill="#fff" opacity={0.6} />}
  </svg>
);

const Club: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp((f - dur * 0.35) / 10);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0602" />
      <circle cx={540} cy={800} r={460} fill={GOLD} opacity={0.1} />
      <g transform="translate(700 1080) scale(0.95)"><LionFig f={f} roar={0.6 + Math.sin(f / 3) * 0.3} /></g>
      <g transform="translate(240 1150) scale(1.05)">
        <path d="M-50 0 L-60 -280 L60 -280 L50 0 Z" fill="#1a1410" /><circle cx={0} cy={-320} r={42} fill="#1a1410" />
        <g transform={`rotate(${-60 + t * 100} 50 -260)`}>
          <path d="M50 -260 L150 -330" stroke="#1a1410" strokeWidth={28} strokeLinecap="round" />
          <path d="M150 -330 L200 -420" stroke="#6a4a24" strokeWidth={30} strokeLinecap="round" />
          <g transform={`translate(${t * 60} ${-t * 40}) rotate(${t * 90} 210 -440)`} opacity={1 - t * 0.3}><path d="M200 -420 L250 -520" stroke="#6a4a24" strokeWidth={40} strokeLinecap="round" /></g>
        </g>
      </g>
      {t > 0 && t < 1 && Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M440 760 l${(random(`sp${i}`) - 0.5) * 200} ${(random(`sq${i}`) - 0.5) * 200}`} stroke="#8a6a3a" strokeWidth={6} />)}
      <g transform="translate(150 1180) rotate(-20)" opacity={clamp(f / 10)}><path d="M-60 0 L80 0" stroke="#c8c8d0" strokeWidth={12} /><path d="M80 0 Q140 -10 180 -60" stroke="#c8c8d0" strokeWidth={12} fill="none" /></g>
    </svg>
  );
};

const DarkCave: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#020100" />
    <path d="M0 0 L1080 0 L1080 1920 L0 1920 Z" fill="#0a0604" />
    <path d="M120 1150 C140 700 300 500 540 480 C780 500 940 700 960 1150 Z" fill="#000" />
    <g transform="translate(140 1150)"><path d="M-80 0 L-40 -100 L40 -120 L90 -40 L80 0 Z" fill="#3a2a1a" /><path d="M-40 -100 L0 -180 L50 -120" fill="#2a1e10" /></g>
    <g opacity={0.6 + Math.sin(f / 5) * 0.4}><ellipse cx={600} cy={860} rx={18} ry={10} fill="#ffe23a" /><ellipse cx={660} cy={860} rx={18} ry={10} fill="#ffe23a" /></g>
    <g transform={`translate(${940 - Math.min(f, 60) * 3} 1150) scale(0.8)`}><Hero f={f} pelt={false} swing={20} fill="#140e0a" /></g>
    <rect y={1150} width={W} height={H} fill="#060402" />
  </svg>
);

const Wrestle: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / dur);
  const sh = Math.sin(f * 1.4) * 8 * (1 - t);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#060302" />
      <circle cx={540} cy={800} r={480} fill={BLOOD} opacity={0.1} />
      <g transform={`translate(${540 + sh} 1000) rotate(${-10 + t * 30})`}>
        <g transform="scale(1.1)"><LionFig f={f} roar={1 - t} eye={t > 0.8 ? "#666" : "#ffe23a"} glow={false} /></g>
        <g transform="translate(-60 -80)">
          <path d="M-40 0 L-60 -260 L60 -260 L40 0 Z" fill="#1a1410" />
          <circle cx={0} cy={-300} r={42} fill="#1a1410" />
          <path d="M-50 -220 C-200 -200 -280 -120 -240 -60 M50 -220 C-40 -100 -150 -40 -220 -40" stroke="#1a1410" strokeWidth={34} fill="none" strokeLinecap="round" />
        </g>
      </g>
      {Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={540 + (random(`dw${i}`) - 0.5) * 600} cy={1150 - ((f * 4 + i * 40) % 200)} r={10} fill="#5a4a2a" opacity={0.4} />)}
    </svg>
  );
};

const Claw: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0806" />
    <circle cx={540} cy={500} r={300} fill="#9ad8ff" opacity={0.08 + Math.sin(f / 6) * 0.03} />
    <g transform="translate(540 440)" opacity={0.7}>
      <path d="M-50 160 L-40 -40 L40 -40 L50 160 Z" fill="#5a6a8a" opacity={0.6} />
      <circle cy={-80} r={40} fill="#5a6a8a" opacity={0.6} />
      <path d="M-50 -110 Q0 -200 50 -110 L40 -100 Q0 -170 -40 -100 Z" fill={GOLD} />
      <circle cx={70} cy={-150} r={20} fill="#9ad8ff" opacity={0.5} />
    </g>
    <g transform="translate(540 960) scale(2.2)">
      <path d="M-60 40 C-60 -20 60 -20 60 40 Z" fill={FUR} />
      {[-40, -14, 14, 40].map((x, i) => <path key={i} d={`M${x} 0 Q${x + 4} -40 ${x - 6} -70`} stroke={BONE} strokeWidth={10} fill="none" strokeLinecap="round" />)}
      <path d="M-6 -70 L-10 -110" stroke="#fff" strokeWidth={3} opacity={0.6 + Math.sin(f / 3) * 0.3} />
    </g>
  </svg>
);

const Leo: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / (dur * 0.6));
  const stars: [number, number][] = [[260, 420], [360, 360], [460, 380], [500, 470], [440, 560], [600, 600], [760, 620], [860, 560], [820, 700]];
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#02030a" />
      {Array.from({ length: 80 }).map((_, i) => <circle key={i} cx={random(`ls${i}`) * W} cy={random(`lt${i}`) * 1100} r={1.5} fill="#fff" opacity={0.4} />)}
      <g transform="translate(560 640) scale(0.85)" opacity={0.15 + t * 0.15}><LionFig f={f} glow={false} eye="#9ad8ff" /></g>
      <path d={stars.slice(0, Math.ceil(t * stars.length)).map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ")} stroke="#9ad8ff" strokeWidth={3} fill="none" opacity={0.7} />
      {stars.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r={8} fill="#fff" /><circle cx={x} cy={y} r={20} fill="#9ad8ff" opacity={0.2 + Math.sin(f / 5 + i) * 0.1} /></g>)}
      <g transform="translate(540 1150) scale(0.9)"><Hero f={f} pelt swing={-60} fill="#14100c" /></g>
      <rect y={1150} width={W} height={H} fill="#06060a" />
    </svg>
  );
};

const RealLions: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Hills f={f} id="nl4" top="#4a3a2a" bottom="#1a120a" />
    {Array.from({ length: 6 }).map((_, i) => <g key={i} transform={`translate(${120 + i * 160} 1080) scale(0.35)`}><path d="M-200 0 C-180 -120 160 -120 200 0 Z" fill="#c8a870" /><path d="M-40 -80 Q0 -180 40 -80 Z M60 -80 Q100 -160 140 -80 Z" fill="#c8a870" /></g>)}
    {[[-1, 300], [1, 500]].map(([d, y], i) => <g key={i} transform={`translate(${d < 0 ? 200 + f * 2 : 900 - f * 2} ${1130}) scale(${0.4 * (d < 0 ? -1 : 1)} 0.4)`}><LionFig f={f + i * 5} walk glow={false} /></g>)}
    {[180, 300, 820, 940].map((x, i) => <g key={i} transform={`translate(${x} 1150)`}><path d="M-20 0 L-24 -160 L24 -160 L20 0 Z" fill="#3a2a1a" /><circle cx={0} cy={-180} r={22} fill="#3a2a1a" /><path d="M24 -140 L60 -220" stroke="#5a4a3a" strokeWidth={6} /></g>)}
    <text x={540} y={400} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={70} fill={GOLD}>480 BC</text>
  </svg>
);

export const SHOTS39: Record<string, React.FC<ShotProps>> = {
  nlreveal: NlReveal, moonfall: MoonFall, nemea: Nemea, labour: Labour, bounce: Bounce, club: Club,
  darkcave: DarkCave, nlwrestle: Wrestle, claw: Claw, leo: Leo, realions: RealLions,
};
