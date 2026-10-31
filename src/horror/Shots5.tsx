import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #5 — Bigfoot / Sasquatch */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#d0202a", RIM = "#7fc8be";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const Pines: React.FC<{ f: number; tint?: string; n?: number; y?: number; seed?: string }> = ({ f, tint = "#040a08", n = 8, y = 1250, seed = "p" }) => (
  <g>
    {Array.from({ length: n }).map((_, i) => {
      const x = (i / (n - 1)) * 1200 - 60 + (random(`${seed}x${i}`) - 0.5) * 90;
      const h = 900 + random(`${seed}h${i}`) * 500, w = 170 + random(`${seed}w${i}`) * 90;
      const sway = Math.sin(f / 40 + i) * 4;
      return (
        <g key={i} transform={`rotate(${sway} ${x} ${y})`}>
          {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M${x} ${y - h + k * h * 0.18} L${x - w * (0.35 + k * 0.16)} ${y - h + k * h * 0.18 + h * 0.3} L${x + w * (0.35 + k * 0.16)} ${y - h + k * h * 0.18 + h * 0.3} Z`} fill={tint} />)}
          <rect x={x - 12} y={y - 120} width={24} height={140} fill={tint} />
        </g>
      );
    })}
  </g>
);

export const Squatch: React.FC<{ f: number; walk?: boolean; turn?: number; eyes?: string; fill?: string }> = ({ f, walk = true, turn = 0, eyes = "#ff5a2a", fill = INK }) => {
  const sw = walk ? Math.sin(f / 7) : 0;
  const st = { stroke: RIM, strokeOpacity: 0.55, strokeWidth: 4 } as const;
  const fur = (x: number, y: number, n: number, key: string) => Array.from({ length: n }).map((_, i) => <path key={key + i} d={`M${x + i * 14} ${y} l-6 18 l12 0 Z`} fill={fill} />);
  return (
    <g>
      <path d={`M-90 150 C-110 260 ${-110 - sw * 30} 360 ${-100 - sw * 30} 420 L${-20 - sw * 30} 430 C-10 330 -10 240 -5 170 Z M90 150 C110 260 ${110 + sw * 30} 360 ${100 + sw * 30} 420 L${20 + sw * 30} 430 C10 330 10 240 5 170 Z`} fill={fill} {...st} />
      <path d={`M${-110 - sw * 30} 420 L${-130 - sw * 30} 450 L${-10 - sw * 30} 450 L${-20 - sw * 30} 425 Z M${110 + sw * 30} 420 L${130 + sw * 30} 450 L${10 + sw * 30} 450 L${20 + sw * 30} 425 Z`} fill={fill} />
      <path d="M-170 -150 C-200 -40 -140 140 -95 200 L95 200 C140 140 200 -40 170 -150 C100 -215 -100 -215 -170 -150 Z" fill={fill} {...st} />
      <path d="M-120 -190 Q0 -250 120 -190 L60 -150 L-60 -150 Z" fill={fill} />
      <path d={`M-140 -140 C-190 -40 ${-200 + sw * 40} 60 ${-190 + sw * 50} 170 L${-160 + sw * 50} 175 C-150 60 -120 -40 -110 -100 Z`} fill={fill} {...st} />
      <path d={`M140 -140 C190 -40 ${200 - sw * 40} 60 ${190 - sw * 50} 170 L${160 - sw * 50} 175 C150 60 120 -40 110 -100 Z`} fill={fill} {...st} />
      <path d={`M${-70 + turn * 20} -170 C-80 -260 -40 -320 ${10 + turn * 20} -330 C60 -320 80 -260 ${70 + turn * 20} -170 Z`} fill={fill} {...st} />
      {fur(-170, -60, 5, "a")}{fur(110, -60, 5, "b")}{fur(-90, 180, 13, "c")}{fur(-150, 60, 3, "d")}{fur(120, 60, 3, "e")}
      {turn > 0.5 && <><circle cx={-6 + turn * 20} cy={-260} r={6} fill={eyes} /><circle cx={26 + turn * 20} cy={-260} r={6} fill={eyes} /><circle cx={10 + turn * 20} cy={-260} r={40} fill={eyes} opacity={0.12} /></>}
    </g>
  );
};

const BForest: React.FC<ShotProps> = ({ f, scene }) => (
  <svg width={W} height={H}>
    <Sky top="#132a24" bottom="#020504" id="b1" />
    <Moon x={760} y={380} r={90} f={f} />
    <Pines f={f} tint="#071410" n={7} seed="a" />
    <path d="M0 1240 Q540 1180 1080 1240 V1920 H0 Z" fill="#030806" />
    {scene === 0 && [8, 12, 40].map((s, i) => f >= s && f < s + 3 ? <circle key={i} cx={180} cy={1050} r={60} fill="#fff2b0" opacity={0.8} /> : null)}
    <g transform={`translate(${720 - (scene === 0 ? f * 0.6 : 0)} 1000) scale(0.75)`} opacity={0.95}><Squatch f={f} walk={scene === 0} turn={1} /></g>
    <Pines f={f} tint="#010303" n={4} y={1400} seed="b" />
  </svg>
);

const Cabin: React.FC<ShotProps> = ({ f }) => {
  const hit = (f % 22) < 3;
  return (
    <svg width={W} height={H}>
      <Sky top="#0e1a20" bottom="#020304" id="b2" />
      <Pines f={f} tint="#050c0a" n={7} seed="c" />
      <g transform={`translate(${540 + (hit ? (random(`ch${f}`) - 0.5) * 20 : 0)} 1150)`}>
        <path d="M-320 0 L-320 -300 L0 -480 L320 -300 L320 0 Z" fill="#0a0806" stroke="#4a3a2a" strokeWidth={4} />
        {Array.from({ length: 8 }).map((_, i) => <line key={i} x1={-320} y1={-30 - i * 34} x2={320} y2={-30 - i * 34} stroke="#1a140c" strokeWidth={6} />)}
        <rect x={-220} y={-220} width={130} height={110} fill="#ffb43a" opacity={0.7 + 0.2 * Math.sin(f / 2)} />
        <rect x={60} y={-260} width={150} height={260} fill="#140e08" stroke="#4a3a2a" strokeWidth={6} transform={hit ? "translate(0 0) skewX(-3)" : undefined} />
        {hit && <path d="M210 -200 L260 -220 M210 -120 L270 -110 M210 -60 L250 -40" stroke="#ece4d0" strokeWidth={5} />}
        <path d="M-220 -220 L-160 -220 L-160 -110" stroke="#000" strokeWidth={6} />
      </g>
      {/* shadow hands at window */}
      <path d={`M300 ${930 - (f % 60 < 30 ? 0 : 20)} l-10 -50 l10 0 l6 40 l6 -50 l10 0 l2 50 l8 -46 l10 2 l-4 50 Q310 980 300 ${930 - (f % 60 < 30 ? 0 : 20)} Z`} fill="#000" opacity={0.85} />
      {Array.from({ length: 6 }).map((_, i) => {
        const t = (f * 2 + i * 40) % 240;
        return <circle key={i} cx={260 + i * 100} cy={240 + t * 2.6} r={18 + (i % 3) * 8} fill="#3a3a34" opacity={t < 160 ? 1 : 0} />;
      })}
    </svg>
  );
};

const Dawn: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#4a3a4a" bottom="#2a1a14" id="b3" />
    <circle cx={540} cy={1000} r={220} fill="#ffb07a" opacity={0.5} />
    <path d="M0 1050 L200 760 L360 900 L540 600 L700 880 L860 740 L1080 1000 V1920 H0 Z" fill="#1a1414" />
    <path d="M440 700 L540 600 L640 700 L600 1100 L480 1100 Z" fill="#0a0808" />
    <Pines f={f} tint="#0a0808" n={8} y={1350} seed="d" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i} transform={`translate(${200 + i * 70 + f * 3} ${1380 + (i % 2) * 20}) scale(0.4)`}>
        <circle cx={0} cy={-300} r={36} fill={INK} /><path d="M-40 -260 L40 -260 L30 0 L-30 0 Z" fill={INK} />
        <path d={`M-20 0 L${-40 - Math.sin(f / 3 + i) * 30} 160 M20 0 L${40 + Math.sin(f / 3 + i) * 30} 160`} stroke={INK} strokeWidth={22} />
      </g>
    ))}
    <text x={540} y={1560} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={60} fill="#ece4d0" opacity={clamp((f - 20) / 20) * 0.8}>APE CANYON</text>
  </svg>
);

const Totem: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#20141a" bottom="#050304" id="b4" />
    <circle cx={540} cy={820} r={320} fill="#e06a2a" opacity={0.18} />
    <g transform="translate(300 1250)">
      {[0, 1, 2, 3].map((k) => (
        <g key={k} transform={`translate(0 ${-k * 210})`}>
          <rect x={-90} y={-200} width={180} height={200} fill="#2a1410" stroke="#e06a2a" strokeOpacity={0.6} strokeWidth={4} />
          <circle cx={-40} cy={-120} r={22} fill="#e8dcc0" /><circle cx={40} cy={-120} r={22} fill="#e8dcc0" />
          <circle cx={-40} cy={-120} r={9} fill="#000" /><circle cx={40} cy={-120} r={9} fill="#000" />
          <rect x={-50} y={-60} width={100} height={26} fill="#8a2a1a" />
        </g>
      ))}
      <path d="M-200 -860 L200 -860 L90 -800 L-90 -800 Z" fill="#2a1410" />
    </g>
    <g transform="translate(760 1150) scale(0.85)"><Squatch f={f} walk={false} turn={1} /></g>
    {Array.from({ length: 20 }).map((_, i) => <circle key={i} cx={540 + (random(`te${i}`) - 0.5) * 600} cy={1300 - ((f * 3 + i * 40) % 700)} r={3} fill="#ff8a3a" opacity={0.6} />)}
  </svg>
);

const Foot: React.FC<{ x: number; y: number; r: number; s?: number; fill?: string }> = ({ x, y, r, s = 1, fill = "#0a0604" }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M0 -120 C40 -120 56 -60 50 0 C46 70 40 110 0 120 C-40 110 -46 70 -50 0 C-56 -60 -40 -120 0 -120 Z" fill={fill} />
    {[-38, -18, 2, 22, 40].map((tx, i) => <ellipse key={i} cx={tx} cy={-140 + Math.abs(i - 1.5) * 6} rx={12 - Math.abs(i - 1) * 1.2} ry={15} fill={fill} />)}
  </g>
);

const Prints: React.FC<ShotProps> = ({ f, dur }) => {
  const n = Math.floor(clamp(f / (dur * 0.7)) * 7);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#3a2a1c" />
      {Array.from({ length: 50 }).map((_, i) => <ellipse key={i} cx={random(`mx${i}`) * W} cy={random(`my${i}`) * H} rx={20 + random(`mr${i}`) * 60} ry={8 + random(`mr${i}`) * 20} fill="#2a1e14" opacity={0.6} />)}
      <g transform="translate(760 560) rotate(-12)">
        <rect x={-260} y={-120} width={520} height={240} rx={20} fill="#c89a2a" stroke="#000" strokeWidth={6} />
        <rect x={-300} y={100} width={600} height={80} rx={40} fill="#1a1410" />
        <rect x={-340} y={-60} width={100} height={200} fill="#8a6a1a" />
      </g>
      {Array.from({ length: n }).map((_, i) => <Foot key={i} x={180 + (i % 2) * 140 + i * 70} y={1500 - i * 150} r={-10 + (i % 2) * 8} s={1.1} />)}
      <g transform="translate(860 1350)"><rect x={-10} y={-160} width={20} height={300} fill="#c8c0a0" />{Array.from({ length: 6 }).map((_, i) => <line key={i} x1={-10} y1={-140 + i * 50} x2={10} y2={-140 + i * 50} stroke="#000" strokeWidth={3} />)}<text x={30} y={-120} fontFamily="Cinzel" fontWeight={900} fontSize={36} fill="#ece4d0">16″</text></g>
    </svg>
  );
};

const WoodFeet: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#1a120a" />
    {Array.from({ length: 14 }).map((_, i) => <line key={i} x1={0} y1={i * 140} x2={W} y2={i * 140 + 40} stroke="#2a1e12" strokeWidth={40} />)}
    <g transform={`rotate(${Math.sin(f / 20) * 2} 540 860)`}>
      <Foot x={400} y={860} r={-8} s={2.2} fill="#a87a4a" />
      <Foot x={700} y={900} r={10} s={2.2} fill="#9a6a3a" />
      {[400, 700].map((x, i) => <g key={i}><rect x={x - 20} y={540} width={40} height={-260} fill="#6a4a2a" /><rect x={x - 70} y={280} width={140} height={30} fill="#6a4a2a" /></g>)}
    </g>
    <text x={540} y={1440} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={70} fill={BLOOD} opacity={clamp((f - 30) / 10)} transform="rotate(-6 540 1440)">“IT WAS A PRANK”</text>
  </svg>
);

const Film: React.FC<ShotProps> = ({ f, scene }) => {
  const turn = scene === 6 ? clamp((f - 40) / 15) : 1;
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#000" />
      <g transform="translate(0 260)">
        <rect x={60} y={0} width={960} height={1200} fill="#5a5040" />
        <rect x={60} y={0} width={960} height={1200} fill="#000" opacity={0.25 + 0.08 * random(`ff${Math.floor(f / 2)}`)} />
        <path d="M60 760 Q540 700 1020 780 V1200 H60 Z" fill="#3a3428" />
        {[200, 380, 860].map((x, i) => <path key={i} d={`M${x} 760 L${x - 30} 200 L${x + 30} 200 Z`} fill="#2a2620" />)}
        <g transform={`translate(${620 - (scene === 6 ? f * 1.2 : 30)} 760) scale(0.55)`}><Squatch f={f} turn={turn} fill="#14100c" eyes="#14100c" /></g>
        {Array.from({ length: 5 }).map((_, i) => <line key={i} x1={random(`fs${Math.floor(f / 3)}${i}`) * 960 + 60} y1={0} x2={random(`fs${Math.floor(f / 3)}${i}`) * 960 + 64} y2={1200} stroke="#ece4d0" strokeOpacity={0.15} strokeWidth={2} />)}
        {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={random(`fd${Math.floor(f / 2)}${i}`) * 960 + 60} cy={random(`fe${Math.floor(f / 2)}${i}`) * 1200} r={2 + random(`fr${i}`) * 4} fill="#ece4d0" opacity={0.3} />)}
      </g>
      {Array.from({ length: 14 }).map((_, i) => <g key={i}><rect x={14} y={((i * 140 + f * 10) % 1960) - 40} width={32} height={60} rx={6} fill="#1a1a1a" /><rect x={1034} y={((i * 140 + f * 10) % 1960) - 40} width={32} height={60} rx={6} fill="#1a1a1a" /></g>)}
      <text x={90} y={1430} fontFamily="Cinzel" fontWeight={900} fontSize={40} fill="#ece4d0" opacity={0.7}>BLUFF CREEK · OCT 20 1967 · 16MM</text>
    </svg>
  );
};

const Giganto: React.FC<ShotProps> = ({ f }) => {
  const grow = clamp(f / 30);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0806" />
      <circle cx={540} cy={860} r={460} fill="#e0b080" opacity={0.08} />
      {Array.from({ length: 11 }).map((_, i) => <g key={i}><line x1={120} y1={1250 - i * 90} x2={960} y2={1250 - i * 90} stroke="#ece4d0" strokeOpacity={0.08} /><text x={110} y={1256 - i * 90} textAnchor="end" fontFamily="Cinzel" fontWeight={900} fontSize={22} fill="#ece4d0" opacity={0.4}>{i}ft</text></g>)}
      <g transform="translate(300 1250) scale(0.5)">
        <circle cx={0} cy={-680} r={70} fill="#1a1612" stroke="#ece4d0" strokeOpacity={0.5} strokeWidth={4} />
        <path d="M-80 -600 L80 -600 L60 -260 L-60 -260 Z M-50 -260 L-60 0 M50 -260 L60 0" fill="#1a1612" stroke="#1a1612" strokeWidth={50} />
      </g>
      <g transform={`translate(680 1250) scale(${0.7 + 0.45 * grow})`}><g transform="translate(0 -430)"><Squatch f={f} walk={false} turn={1} eyes={BLOOD} /></g></g>
      <text x={540} y={1360} textAnchor="middle" fontFamily="Fell" fontSize={52} fill="#ece4d0" opacity={0.8}>Gigantopithecus blacki</text>
    </svg>
  );
};

const BEyes: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#010202" />
    <Pines f={f} tint="#040807" n={8} seed="e" y={1300} />
    {[[300, 900], [760, 1020], [520, 760]].map(([x, y], i) => {
      const on = (f + i * 31) % 90 < 70;
      return on ? <g key={i}><circle cx={x} cy={y} r={7} fill="#ff6a2a" /><circle cx={x + 30} cy={y} r={7} fill="#ff6a2a" /><circle cx={x + 15} cy={y} r={46} fill="#ff6a2a" opacity={0.1} /></g> : null;
    })}
    {[[18, 200, 600], [44, 820, 520], [70, 460, 700]].map(([s, x, y], i) => f >= s && f < s + 14 ? (
      <g key={i}><text x={x} y={y} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={70} fill="#ece4d0" opacity={1 - (f - s) / 14}>KNOCK</text></g>
    ) : null)}
    {Array.from({ length: 4 }).map((_, i) => {
      const t = (f * 3 + i * 60) % 260;
      return <circle key={i} cx={200 + i * 220} cy={200 + t * 4} r={20} fill="#2a2a24" opacity={t < 220 ? 1 : 0} />;
    })}
  </svg>
);

const Shadow: React.FC<ShotProps> = ({ f, dur }) => {
  const near = clamp(f / (dur * 0.9));
  return (
    <svg width={W} height={H}>
      <Sky top="#0e1e1a" bottom="#010202" id="b6" />
      <Moon x={540} y={360} r={70} f={f} />
      <Pines f={f} tint="#040a08" n={6} seed="f" y={1300} />
      <g transform={`translate(540 ${900 + near * 40}) scale(${0.5 + near * 0.6})`}><Squatch f={f} walk turn={1} eyes={BLOOD} /></g>
      <Pines f={f} tint="#000" n={3} seed="g" y={1500} />
    </svg>
  );
};

export const SHOTS5: Record<string, React.FC<ShotProps>> = {
  bforest: BForest, cabin: Cabin, dawn: Dawn, totem: Totem, prints: Prints, woodfeet: WoodFeet,
  film: Film, giganto: Giganto, beyes: BEyes, shadow: Shadow,
};
