import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #28 — Harpies */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BONE = "#ddd5c0", FLESH = "#b8a898";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const HarpyFig: React.FC<{ f: number; s?: number; fill?: string; eye?: string; flap?: number; scream?: boolean; crown?: boolean }> = ({ f, s = 1, fill = "#14100e", eye = "#ffe23a", flap = 1, scream, crown }) => {
  const a = Math.sin(f / 3.5) * 24 * flap;
  const st = { stroke: "#7a6a5a", strokeOpacity: 0.5, strokeWidth: 4 } as const;
  return (
    <g transform={`scale(${s})`}>
      {[-1, 1].map((d) => (
        <g key={d} transform={`scale(${d} 1) rotate(${-a} 50 -60)`}>
          <path d="M50 -60 C150 -200 320 -280 480 -260 L440 -200 L490 -180 L420 -130 L460 -110 L380 -70 L400 -50 L300 -20 L310 0 L200 0 L60 20 Z" fill={fill} {...st} />
          {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${140 + i * 50} ${-150 - i * 12} L${170 + i * 50} ${-10 - i * 6}`} stroke="#7a6a5a" strokeOpacity={0.3} strokeWidth={4} />)}
        </g>
      ))}
      <path d="M-70 -60 C-90 60 -60 150 0 200 C60 150 90 60 70 -60 Z" fill={fill} {...st} />
      <path d="M-30 190 L-60 280 L0 250 L60 280 L30 190 Z" fill={fill} />
      {[-1, 1].map((d) => <g key={d} transform={`translate(${d * 34} 160)`}><path d={`M0 0 L${d * 14} 110`} stroke="#4a4038" strokeWidth={14} /><path d={`M${d * 14} 110 q-30 10 -36 44 M${d * 14} 110 q0 20 0 48 M${d * 14} 110 q30 10 36 44`} stroke="#9a9aa4" strokeWidth={7} fill="none" strokeLinecap="round" /></g>)}
      <path d="M-56 -60 C-100 -100 -110 -40 -120 40 M56 -60 C100 -100 110 -40 120 40 M-40 -150 C-120 -150 -130 -40 -110 60 M40 -150 C120 -150 130 -40 110 60" stroke="#1a1612" strokeWidth={10} fill="none" />
      <ellipse cx={0} cy={-110} rx={48} ry={62} fill={FLESH} />
      <path d="M-46 -112 Q-30 -160 0 -170 Q30 -160 46 -112 Q30 -150 0 -150 Q-30 -150 -46 -112 Z" fill="#1a1612" />
      <path d="M-30 -80 Q-20 -70 -26 -50 M30 -80 Q20 -70 26 -50" stroke="#6a5a50" strokeWidth={4} fill="none" />
      <ellipse cx={-18} cy={-110} rx={11} ry={8} fill="#1a0a0a" /><ellipse cx={18} cy={-110} rx={11} ry={8} fill="#1a0a0a" />
      <circle cx={-18} cy={-110} r={4} fill={eye} /><circle cx={18} cy={-110} r={4} fill={eye} />
      {scream ? <g><ellipse cx={0} cy={-70} rx={14} ry={20} fill="#200404" /><path d="M-8 -86 l2 8 M8 -86 l-2 8" stroke={BONE} strokeWidth={3} /></g> : <path d="M-14 -74 L14 -74" stroke="#4a2020" strokeWidth={4} />}
      {crown && <path d="M-40 -168 L-30 -200 L-14 -176 L0 -210 L14 -176 L30 -200 L40 -168 Z" fill="#8a7a3a" />}
    </g>
  );
};

const Thin: React.FC<{ f: number; fill?: string; blind?: boolean; thin?: number; reach?: number; crown?: boolean }> = ({ f, fill = "#2a2420", blind = true, thin = 0, reach = 0, crown = true }) => (
  <g>
    <path d={`M-${50 - thin * 20} 0 L-${40 - thin * 16} -300 L${40 - thin * 16} -300 L${50 - thin * 20} 0 Z`} fill={fill} />
    <path d={`M${30 - thin * 10} -280 L${120 + reach * 80} ${-240 - reach * 40}`} stroke={fill} strokeWidth={22 - thin * 8} strokeLinecap="round" />
    <path d={`M-${30 - thin * 10} -280 L-80 -170`} stroke={fill} strokeWidth={22 - thin * 8} strokeLinecap="round" />
    <ellipse cx={0} cy={-340} rx={40 - thin * 8} ry={46} fill={fill} />
    {blind && <path d="M-34 -350 L34 -350" stroke="#e8e0cc" strokeWidth={12} />}
    {crown && <path d="M-30 -380 L-24 -404 L-10 -388 L0 -410 L10 -388 L24 -404 L30 -380 Z" fill="#d8b040" />}
    {thin > 0.5 && [0, 1, 2].map((i) => <path key={i} d={`M-20 ${-260 + i * 20} L20 ${-260 + i * 20}`} stroke="#5a4a40" strokeWidth={3} />)}
  </g>
);

const Table: React.FC<{ eaten?: number }> = ({ eaten = 0 }) => (
  <g>
    <rect x={-300} y={-20} width={600} height={30} fill="#4a2a14" />
    <path d="M-280 10 L-280 170 M280 10 L280 170" stroke="#4a2a14" strokeWidth={24} />
    {eaten < 1 && <g opacity={1 - eaten}>
      <ellipse cx={-150} cy={-30} rx={80} ry={20} fill="#ddd" /><ellipse cx={-150} cy={-50} rx={60} ry={30} fill="#a8501a" />
      <path d="M-20 -20 L0 -110 L20 -20 Z" fill="#8a1a3a" /><circle cx={0} cy={-110} r={10} fill="#d8b040" />
      {[100, 150, 200].map((x, i) => <circle key={i} cx={x} cy={-40} r={24} fill={["#8a2a5a", "#c8a030", "#5a8a2a"][i]} />)}
    </g>}
  </g>
);

const HPStorm: React.FC<ShotProps> = ({ f }) => {
  const fl = (f % 45) < 4;
  return (
    <svg width={W} height={H}>
      <Sky top="#1a1c24" bottom="#060608" id="hp1" />
      {Array.from({ length: 8 }).map((_, i) => <ellipse key={i} cx={((i * 200 + f * 3) % 1500) - 200} cy={200 + (i % 4) * 100} rx={300} ry={70} fill="#2a2c34" opacity={0.7} />)}
      {fl && <rect width={W} height={H} fill="#dfe6ff" opacity={0.2} />}
      <rect y={1100} width={W} height={H} fill="#0a0c10" />
      <path d="M0 1100 Q270 1060 540 1100 T1080 1100" stroke="#2a3040" strokeWidth={6} fill="none" />
      {[[300, 560, 0.4, 0], [700, 460, 0.35, 9], [860, 700, 0.28, 4]].map(([x, y, s, o], i) => <g key={i} transform={`translate(${x + Math.sin((f + o) / 12) * 60} ${y + Math.sin((f + o) / 8) * 30}) scale(${s})`}><HarpyFig f={f + o} scream /></g>)}
      {Array.from({ length: 60 }).map((_, i) => <path key={i} d={`M${(random(`ra${i}`) * W + f * 8) % W} ${(random(`rb${i}`) * H + f * 30) % H} l-10 40`} stroke="#8a9ab0" strokeWidth={2} opacity={0.4} />)}
    </svg>
  );
};

const HPReveal: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#060404" />
    <circle cx={540} cy={700} r={480} fill={BLOOD} opacity={0.08} />
    <g transform={`translate(540 ${720 + Math.sin(f / 10) * 14}) scale(1.4)`}><HarpyFig f={f} scream={(f % 40) > 20} /></g>
  </svg>
);

const HPZeus: React.FC<ShotProps> = ({ f }) => {
  const fl = (f % 30) < 4;
  return (
    <svg width={W} height={H}>
      <Sky top="#14182a" bottom="#04050a" id="hp2" />
      {fl && <rect width={W} height={H} fill="#dfe6ff" opacity={0.2} />}
      <g transform="translate(540 380)" opacity={0.6}>
        <ellipse cx={-70} cy={0} rx={50} ry={18} fill="#dfe6ff" /><ellipse cx={70} cy={0} rx={50} ry={18} fill="#dfe6ff" />
        <path d="M-200 140 Q0 20 200 140" stroke="#8a9ab0" strokeWidth={12} fill="none" />
      </g>
      {[-1, 1].map((d, k) => <g key={k} transform={`translate(${540 + d * 260} ${760 + Math.sin(f / 7 + k) * 20}) scale(0.5)`}><HarpyFig f={f + k * 5} /></g>)}
      <g transform="translate(540 1100) scale(0.9)" opacity={0.7}><Thin f={f} blind={false} crown={false} fill="#3a3440" /></g>
    </svg>
  );
};

const Hall: React.FC<{ id: string; f: number }> = ({ id, f }) => (
  <>
    <rect width={W} height={H} fill="#0c0806" />
    {[160, 920].map((x, i) => <rect key={i} x={x - 50} y={220} width={100} height={930} fill="#1a140e" />)}
    <path d="M100 220 L980 220 L940 160 L140 160 Z" fill="#1a140e" />
    <circle cx={540} cy={700} r={420} fill="#ffb43a" opacity={0.06 + Math.sin(f / 4) * 0.02} />
    <rect y={1150} width={W} height={H} fill="#0a0604" />
  </>
);

const Phineus: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Hall id="hp3" f={f} />
    <g transform="translate(540 1150)"><Thin f={f} blind={false} /></g>
    <g transform="translate(540 600)" opacity={0.5 + Math.sin(f / 6) * 0.2}>
      <circle r={120} fill="none" stroke="#ffcf3a" strokeWidth={4} /><ellipse rx={60} ry={30} fill="#ffcf3a" opacity={0.6} /><circle r={18} fill="#000" />
    </g>
  </svg>
);

const Feast: React.FC<ShotProps> = ({ f, dur }) => (
  <svg width={W} height={H}>
    <Hall id="hp4" f={f} />
    <g transform="translate(540 1000)"><Table /></g>
    <g transform="translate(280 1150)"><Thin f={f} reach={clamp(f / dur)} /></g>
  </svg>
);

const HPAttack: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <Hall id="hp5" f={f} />
      <g transform="translate(540 1000)"><Table eaten={t} /></g>
      <g transform="translate(280 1150)"><Thin f={f} reach={0.3} /></g>
      {[[620, 760, 0.45, 0], [820, 600, 0.38, 6], [420, 520, 0.34, 11]].map(([x, y, s, o], i) => <g key={i} transform={`translate(${x + Math.sin((f + o) / 4) * 40} ${y + Math.sin((f + o) / 3) * 30}) scale(${s})`}><HarpyFig f={f + o} scream flap={1.6} /></g>)}
      {Array.from({ length: 14 }).map((_, i) => <ellipse key={i} cx={300 + random(`fe${i}`) * 500} cy={600 + ((f * 7 + i * 60) % 500)} rx={18} ry={6} fill="#4a3a2a" transform={`rotate(${f * 6 + i * 30} ${300 + random(`fe${i}`) * 500} ${600 + ((f * 7 + i * 60) % 500)})`} />)}
      {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${420 + i * 50} 980 q20 -40 0 -80 q-20 -40 0 -80`} stroke="#6a8a2a" strokeWidth={6} fill="none" opacity={0.4 * t} />)}
    </svg>
  );
};

const Starve: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Hall id="hp6" f={f} />
    <g transform="translate(540 1000)"><Table eaten={1} /></g>
    <g transform="translate(540 1150) scale(1.1)"><Thin f={f} thin={1} fill="#4a3e36" /></g>
    {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M${200 + i * 160} 230 L${200 + i * 160} ${300 + Math.sin(f / 10 + i) * 20}`} stroke="#3a3a3a" strokeWidth={2} />)}
  </svg>
);

const Boread: React.FC<{ f: number }> = ({ f }) => (
  <g>
    {[-1, 1].map((d) => <path key={d} d={`M0 -200 C${d * 80} ${-320 - Math.sin(f / 3) * 40} ${d * 220} ${-360 - Math.sin(f / 3) * 60} ${d * 300} ${-300 - Math.sin(f / 3) * 60} C${d * 200} -260 ${d * 100} -220 0 -160 Z`} fill="#cfe0f0" opacity={0.85} />)}
    <path d="M-30 0 L-40 -260 L40 -260 L30 0 Z" fill="#2a3440" transform="rotate(-60)" />
    <circle cx={-260} cy={-140} r={34} fill="#2a3440" />
    <path d="M-170 -110 L-380 -60" stroke="#c8c8d0" strokeWidth={10} />
  </g>
);

const Boreads: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a3a5a" bottom="#0a1020" id="hp7" />
    {Array.from({ length: 6 }).map((_, i) => <ellipse key={i} cx={((i * 260 - f * 6) % 1500 + 1500) % 1500 - 200} cy={300 + (i % 3) * 300} rx={260} ry={60} fill="#dfe6ee" opacity={0.25} />)}
    {[[300, 520, 0.42, 0], [140, 820, 0.36, 7]].map(([x, y, s, o], i) => <g key={i} transform={`translate(${x + Math.sin((f + o) / 6) * 30} ${y}) scale(${s})`}><HarpyFig f={f + o} scream flap={2} /></g>)}
    {[[800, 600], [880, 940]].map(([x, y], i) => <g key={i} transform={`translate(${x + Math.sin(f / 5 + i) * 20} ${y}) scale(0.7)`}><Boread f={f + i * 4} /></g>)}
  </svg>
);

const Islands: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a1a20" bottom="#0a0608" id="hp8" />
    <circle cx={540} cy={780} r={140} fill="#ff6a3a" opacity={0.5} />
    <rect y={900} width={W} height={H} fill="#0a1218" />
    <path d="M100 920 Q260 760 420 920 Z" fill="#06080a" /><path d="M620 920 Q800 700 980 920 Z" fill="#06080a" />
    {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M0 ${960 + i * 40} Q540 ${950 + i * 40 + Math.sin(f / 10 + i) * 6} 1080 ${960 + i * 40}`} stroke="#2a3a44" strokeWidth={2} fill="none" />)}
    {Array.from({ length: 6 }).map((_, i) => <g key={i} transform={`translate(${200 + (i % 3) * 330 + Math.sin(f / 15 + i) * 40} ${560 + (i % 2) * 90}) scale(0.1)`}><HarpyFig f={f + i * 3} fill="#000" /></g>)}
  </svg>
);

const Celaeno: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#060304" />
    <circle cx={540} cy={640} r={460} fill={BLOOD} opacity={0.1 + Math.sin(f / 4) * 0.04} />
    <g transform={`translate(540 ${760 + Math.sin(f / 9) * 10}) scale(1.5)`}><HarpyFig f={f} flap={0.4} scream={(f % 24) < 14} crown eye={BLOOD} /></g>
  </svg>
);

const Tables: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / (dur * 0.8));
  return (
    <svg width={W} height={H}>
      <Sky top="#3a2a20" bottom="#0c0806" id="hp9" />
      <rect y={1100} width={W} height={H} fill="#1a140c" />
      <g transform="translate(540 960)">
        <ellipse rx={300} ry={70} fill="#c8a060" />
        <path d={`M300 0 A300 70 0 0 1 ${300 - t * 600} 0`} fill="#1a140c" opacity={t > 0 ? 0.9 : 0} />
        {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={(random(`cr${i}`) - 0.5) * 400} cy={(random(`cs${i}`) - 0.5) * 80} r={8} fill="#8a6a3a" />)}
      </g>
      {[-1, 1].map((d, k) => <g key={k} transform={`translate(${540 + d * 330} 1100) scale(${0.65 * d} 0.65)`}><Thin f={f} blind={false} crown={false} thin={0.7} reach={Math.abs(Math.sin(f / 4)) * 0.5} /></g>)}
      <text x={540} y={420} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={64} fill={BLOOD} opacity={clamp((f - dur * 0.5) / 12)}>THE CURSE CAME TRUE</text>
    </svg>
  );
};

export const SHOTS28: Record<string, React.FC<ShotProps>> = {
  hpstorm: HPStorm, hpreveal: HPReveal, hpzeus: HPZeus, phineus: Phineus, hpfeast: Feast, hpattack: HPAttack,
  starve: Starve, boreads: Boreads, islands: Islands, celaeno: Celaeno, tables: Tables,
};
