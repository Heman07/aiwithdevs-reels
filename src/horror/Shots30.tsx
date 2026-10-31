import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";
import { PegasusFig } from "./Shots12";
import { Hero } from "./Shots24";

/* Creature #30 — Chimera */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BONE = "#ddd5c0", FIRE = "#ff8a1a", GOLD = "#e0b040";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const Flame: React.FC<{ f: number; len: number; w?: number; seed?: number }> = ({ f, len, w = 80, seed = 0 }) => (
  <g>
    {Array.from({ length: 7 }).map((_, i) => { const L = len * (0.6 + random(`fl${seed}${i}`) * 0.4) * (0.85 + Math.sin(f / 2 + i) * 0.15); return <path key={i} d={`M0 0 Q${-L * 0.5} ${-w * 0.6 + i * w * 0.2 + Math.sin(f + i) * 14} ${-L} ${-w * 0.5 + i * (w / 6)} Q${-L * 0.5} ${w * 0.4 - i * 6} 0 0 Z`} fill={i % 3 === 0 ? "#ffcf3a" : i % 3 === 1 ? FIRE : "#c83a10"} opacity={0.85} />; })}
    <circle cx={-len * 0.4} r={len * 0.4} fill={FIRE} opacity={0.15} />
  </g>
);

const Mane: React.FC<{ f: number }> = ({ f }) => {
  const n = 22; let d = "";
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 ? 105 : 165 + random(`mn${i}`) * 40 + Math.sin(f / 8 + i) * 6;
    const sweep = i % 2 ? 0 : 0.25;
    d += `${i ? "L" : "M"}${Math.cos(a + sweep) * r + 30} ${Math.sin(a + sweep) * r} `;
  }
  return <g><path d={d + "Z"} fill="#4a2408" stroke="#c8904a" strokeOpacity={0.5} strokeWidth={4} /><circle cx={10} r={110} fill="#5a3010" /></g>;
};

export const ChimeraFig: React.FC<{ f: number; s?: number; fill?: string; eye?: string; fire?: number; walk?: boolean; dead?: boolean }> = ({ f, s = 1, fill = "#3a2414", eye = "#ffcf3a", fire = 0, walk, dead }) => {
  const st = { stroke: "#c8904a", strokeOpacity: 0.5, strokeWidth: 4 } as const;
  const w = walk ? Math.sin(f / 5) * 18 : 0;
  return (
    <g transform={`scale(${s})`}>
      <path d={`M220 -60 C320 -80 360 ${-180 + Math.sin(f / 8) * 30} 300 -260 C260 -310 300 -360 340 -340`} stroke="#1e3a24" strokeWidth={30} fill="none" strokeLinecap="round" />
      <g transform={`translate(340 -340) rotate(${-30 + Math.sin(f / 6) * 20})`}>
        <ellipse cx={20} rx={40} ry={24} fill="#1e3a24" /><circle cx={30} cy={-8} r={6} fill="#9aff4a" />
        <path d={`M58 4 l${20 + Math.abs(Math.sin(f / 2)) * 10} -6 M58 4 l${20 + Math.abs(Math.sin(f / 2)) * 10} 8`} stroke={BLOOD} strokeWidth={4} />
      </g>
      {[[-150, w], [-80, -w], [140, -w], [210, w]].map(([x, o], i) => <path key={i} d={`M${x} 0 L${x - 10 + o} 140 L${x + 30 + o} 140 L${x + 34} 0 Z`} fill={fill} {...st} />)}
      {[[-150, w], [-80, -w]].map(([x, o], i) => <path key={i} d={`M${x - 14 + o} 140 l-10 14 M${x + o} 140 l-2 16 M${x + 14 + o} 140 l4 14`} stroke={BONE} strokeWidth={5} />)}
      <ellipse cx={40} cy={-30} rx={250} ry={95} fill={fill} {...st} />
      {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${-40 + i * 40} -110 q10 30 0 60`} stroke="#2a180c" strokeWidth={4} fill="none" />)}
      <g transform="translate(110 -110)">
        <path d="M-20 0 C-30 -60 -10 -110 20 -130 L40 -40 Z" fill="#5a5048" {...st} />
        <path d="M0 -150 C-20 -170 -10 -200 30 -200 C60 -200 70 -170 60 -140 C70 -110 50 -90 40 -80 L0 -100 Z" fill="#6a6058" {...st} />
        <path d="M10 -190 C-40 -240 -80 -230 -90 -190 M40 -195 C60 -260 100 -270 120 -240" stroke="#2a2420" strokeWidth={12} fill="none" strokeLinecap="round" />
        <path d="M40 -90 l6 30 l8 -26" fill="#5a5048" />
        <ellipse cx={14} cy={-160} rx={9} ry={4} fill="#ffcf3a" /><rect x={10} y={-162} width={8} height={3} fill="#000" />
      </g>
      <g transform="translate(-200 -80)">
        <Mane f={f} />
        <path d="M-90 -40 C-110 20 -100 70 -60 90 L20 70 C40 30 40 -30 20 -60 Z" fill={fill} {...st} />
        <path d="M-108 30 L-150 34 L-140 60 L-96 64 Z" fill={fill} />
        <ellipse cx={-50} cy={-20} rx={14} ry={9} fill={dead ? "#333" : eye} />
        {dead ? <path d="M-60 -30 l20 20 M-40 -30 l-20 20" stroke="#000" strokeWidth={5} /> : <circle cx={-50} cy={-20} r={4} fill="#000" />}
        <path d="M-148 52 L-96 70" stroke="#2a0404" strokeWidth={10} />
        {[-140, -126, -112].map((x, i) => <path key={i} d={`M${x} 46 l4 12 l4 -12`} fill={BONE} />)}
        {fire > 0 && <g transform="translate(-150 52)"><Flame f={f} len={460 * fire} w={130} /></g>}
      </g>
    </g>
  );
};

const Mountains: React.FC<{ f: number; id: string; top?: string; bottom?: string }> = ({ f, id, top = "#2a1a1a", bottom = "#080404" }) => (
  <>
    <Sky top={top} bottom={bottom} id={id} />
    <path d="M0 1000 L200 640 L380 860 L600 520 L820 820 L1080 600 V1150 H0 Z" fill="#1a1210" />
    <rect y={1150} width={W} height={H} fill="#0e0a08" />
  </>
);

const Yanartas: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Mountains f={f} id="ch1" top="#141020" bottom="#040306" />
    {Array.from({ length: 40 }).map((_, i) => <circle key={i} cx={random(`st${i}`) * W} cy={random(`su${i}`) * 500} r={2} fill="#fff" opacity={0.5} />)}
    <path d="M100 1150 L300 900 L760 880 L980 1150 Z" fill="#2a2420" />
    {[[260, 1040], [420, 960], [560, 1000], [700, 940], [840, 1060], [500, 1100]].map(([x, y], i) => (
      <g key={i} transform={`translate(${x} ${y}) rotate(90)`}><Flame f={f + i * 3} len={90 + (i % 3) * 30} w={40} seed={i} /></g>
    ))}
    {Array.from({ length: 20 }).map((_, i) => <circle key={i} cx={260 + random(`em${i}`) * 600} cy={1000 - ((f * 3 + i * 40) % 500)} r={3} fill="#ffcf3a" />)}
  </svg>
);

const ChReveal: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#080404" />
    <circle cx={540} cy={800} r={480} fill={FIRE} opacity={0.08} />
    <g transform="translate(520 980) scale(1.3)"><ChimeraFig f={f} /></g>
    {[["LION", 180, 600], ["GOAT", 640, 420], ["SERPENT", 940, 420]].map(([t, x, y], i) => <text key={i} x={x as number} y={y as number} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={44} fill="#ffcf3a" opacity={clamp((f - 10 - i * 18) / 10)}>{t}</text>)}
  </svg>
);

const ChFire: React.FC<ShotProps> = ({ f, dur }) => (
  <svg width={W} height={H}>
    <Mountains f={f} id="ch2" />
    <circle cx={300} cy={900} r={420} fill={FIRE} opacity={0.12 + Math.sin(f / 2) * 0.04} />
    <g transform="translate(720 1000) scale(1.05)"><ChimeraFig f={f} fire={clamp((f - 8) / 10)} /></g>
  </svg>
);

const Lycia: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Mountains f={f} id="ch3" top="#3a1408" bottom="#0a0402" />
    {[150, 400, 650, 900].map((x, i) => <g key={i} transform={`translate(${x} 1150)`}>
      <rect x={-90} y={-160} width={180} height={160} fill="#1a100a" /><path d="M-110 -160 L0 -240 L110 -160 Z" fill="#140a06" />
      {Array.from({ length: 6 }).map((_, k) => <path key={k} d={`M${-90 + k * 36} -150 Q${-80 + k * 36 + Math.sin(f / 2 + k + i) * 20} ${-300 - (k % 3) * 50} ${-70 + k * 36} -150 Z`} fill={k % 2 ? FIRE : "#ffcf3a"} opacity={0.8} />)}
    </g>)}
    {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={100 + i * 90} cy={700 - ((f * 3 + i * 60) % 400)} r={40 + i * 4} fill="#2a2020" opacity={0.3} />)}
    <g transform={`translate(${1200 - f * 2} 1150) scale(0.35)`}><ChimeraFig f={f} walk eye={BLOOD} /></g>
  </svg>
);

const Belle: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0c0806" />
    {[180, 900].map((x, i) => <rect key={i} x={x - 45} y={260} width={90} height={890} fill="#1a140e" />)}
    <g transform="translate(720 1150)"><Hero f={f} pelt={false} swing={-40} fill="#1a1e2a" /></g>
    <g transform="translate(340 1150)"><path d="M-80 0 L-60 -380 L60 -380 L80 0 Z" fill="#2a1a10" /><circle cx={0} cy={-420} r={44} fill="#2a1a10" /><path d="M-36 -456 L-26 -484 L0 -466 L26 -484 L36 -456 Z" fill={GOLD} /><ellipse cx={-14} cy={-424} rx={8} ry={4} fill={BLOOD} /><ellipse cx={14} cy={-424} rx={8} ry={4} fill={BLOOD} /><path d="M50 -300 L160 -260" stroke="#2a1a10" strokeWidth={26} strokeLinecap="round" /></g>
    <g transform="translate(560 1000)" opacity={0.6}><rect x={-60} y={-40} width={120} height={80} fill="#e8dcc0" /><path d="M-60 -40 L0 10 L60 -40" stroke="#8a6a3a" strokeWidth={4} fill="none" /><circle cy={10} r={10} fill={BLOOD} /></g>
  </svg>
);

const Bridle: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a2a4a" bottom="#060a14" id="ch4" />
    <circle cx={540} cy={640} r={380} fill={GOLD} opacity={0.08 + Math.sin(f / 6) * 0.03} />
    <g transform="translate(560 1050) scale(0.85)"><PegasusFig f={f} rider /></g>
    <g transform="translate(540 360)"><ellipse rx={90} ry={50} fill="none" stroke={GOLD} strokeWidth={10} /><path d="M90 0 L180 40" stroke={GOLD} strokeWidth={8} />{Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={Math.cos(i + f / 10) * 130} cy={Math.sin(i + f / 10) * 70} r={4} fill="#fff" opacity={0.7} />)}</g>
  </svg>
);

const ChSky: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Mountains f={f} id="ch5" top="#2a1a20" bottom="#0a0606" />
    <g transform={`translate(${540 + Math.sin(f / 10) * 160} ${380 + Math.sin(f / 7) * 30}) scale(0.5)`}><PegasusFig f={f} rider /></g>
    <g transform="translate(620 1130) scale(0.8) rotate(-12)"><ChimeraFig f={f} fire={0.9} /></g>
    {Array.from({ length: 4 }).map((_, i) => { const t = ((f + i * 10) % 40) / 40; return <path key={i} d={`M${560 + i * 30} ${460 + t * 500} l10 40`} stroke="#c8c0a8" strokeWidth={4} opacity={t < 0.9 ? 1 : 0} transform={`rotate(${t > 0.8 ? 120 : 0} ${560 + i * 30} ${460 + t * 500})`} />; })}
  </svg>
);

const Lead: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp((f - dur * 0.25) / (dur * 0.5));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#080402" />
      <circle cx={540} cy={760} r={480} fill={FIRE} opacity={0.12} />
      <g transform="translate(800 1060) scale(2.1)">
        <g transform="translate(-200 -80)">
          <Mane f={f} />
          <path d="M-90 -40 C-110 20 -100 70 -60 90 L20 70 C40 30 40 -30 20 -60 Z" fill="#3a2414" />
          <path d="M-108 30 L-150 34 L-140 60 L-96 64 Z" fill="#3a2414" />
          <ellipse cx={-50} cy={-20} rx={14} ry={9 - t * 6} fill="#ffcf3a" />
          <path d="M-148 52 L-96 70" stroke="#2a0404" strokeWidth={10} />
          <g transform="translate(-150 52)" opacity={1 - t}><Flame f={f} len={200} w={80} /></g>
          <g transform={`translate(${-420 + t * 300} 50) rotate(8)`}><path d="M-300 0 L0 0" stroke="#6a4a2a" strokeWidth={10} /><ellipse cx={10} rx={26} ry={18} fill={t > 0.6 ? "#d8d8e0" : "#6a6a74"} /></g>
          {t > 0.6 && Array.from({ length: 5 }).map((_, i) => <circle key={i} cx={-110 + i * 6} cy={70 + ((f * 4 + i * 20) % 120)} r={6} fill="#d8d8e0" />)}
        </g>
      </g>
    </svg>
  );
};

const Fall: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <Sky top="#2a3a5a" bottom="#0a0e18" id="ch6" />
      <path d="M380 0 L540 0 L700 0 L640 260 L440 260 Z" fill="#fff" opacity={0.06} />
      {(f % 30) < 3 && <rect width={W} height={H} fill="#dfe6ff" opacity={0.2} />}
      <g transform={`translate(${540 + t * 200} ${400 - t * 200}) scale(0.45)`}><PegasusFig f={f} rear={1} /></g>
      <g transform={`translate(${520 - t * 60} ${560 + t * t * 700}) rotate(${t * 200}) scale(0.4)`}><Hero f={f} pelt={false} swing={-120} fill="#1a1e2a" /></g>
      <g transform={`translate(${600 + Math.sin(f / 2) * 30} ${470 + Math.cos(f / 2) * 20})`}><ellipse rx={10} ry={6} fill="#000" /><path d="M-6 -4 l-10 -10 M6 -4 l10 -10" stroke="#aaa" strokeWidth={2} /></g>
      <path d="M0 1150 L1080 1150 L1080 1920 L0 1920 Z" fill="#06080c" />
    </svg>
  );
};

const Dna: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#04060a" />
    {[0, 1].map((k) => <g key={k} transform={`translate(${380 + k * 320} 0)`}>
      {Array.from({ length: 22 }).map((_, i) => { const y = 280 + i * 38; const p = Math.sin(i / 2.2 + f / 10 + k * 2) * 90; return <g key={i}><line x1={-p} y1={y} x2={p} y2={y} stroke={k ? "#ff4a6a" : "#4ab8ff"} strokeWidth={4} opacity={0.6} /><circle cx={-p} cy={y} r={9} fill={k ? "#ff4a6a" : "#4ab8ff"} /><circle cx={p} cy={y} r={9} fill={k ? "#ff8aa0" : "#8ad8ff"} /></g>; })}
    </g>)}
    <text x={380} y={1180} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={40} fill="#4ab8ff">DNA 1</text>
    <text x={700} y={1180} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={40} fill="#ff4a6a" opacity={clamp((f - 20) / 10)}>DNA 2</text>
  </svg>
);

const Test: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0c10" />
    <g transform="rotate(-3 540 760)">
      <rect x={200} y={340} width={680} height={820} fill="#e8e4dc" />
      <text x={540} y={430} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={40} fill="#1a1a2a">DNA TEST RESULT</text>
      <path d="M260 460 L820 460" stroke="#1a1a2a" strokeWidth={3} />
      {Array.from({ length: 10 }).map((_, i) => <g key={i}><rect x={300} y={500 + i * 30} width={20} height={16} fill="#2a2a3a" opacity={0.5 + random(`ba${i}`) * 0.5} /><rect x={420} y={500 + i * 30} width={20} height={16} fill="#2a2a3a" opacity={random(`bb${i}`) * 0.8} /><rect x={540} y={500 + i * 30} width={20} height={16} fill="#2a2a3a" opacity={random(`bc${i}`) * 0.8} /></g>)}
      <text x={540} y={880} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={36} fill="#1a1a2a">MATERNITY: </text>
      <g transform={`translate(540 1000) scale(${1.3 - clamp((f - 20) / 6) * 0.3}) rotate(-10)`} opacity={clamp((f - 20) / 6)}>
        <rect x={-260} y={-60} width={520} height={120} fill="none" stroke={BLOOD} strokeWidth={10} />
        <text y={26} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={64} fill={BLOOD}>EXCLUDED</text>
      </g>
    </g>
  </svg>
);

export const SHOTS30: Record<string, React.FC<ShotProps>> = {
  yanartas: Yanartas, chreveal: ChReveal, chfire: ChFire, lycia: Lycia, belle: Belle, bridle: Bridle,
  chsky: ChSky, lead: Lead, fall: Fall, dna: Dna, test: Test,
};
