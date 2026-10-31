import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #3 — Unicorn */
const W = 1080, H = 1920, INK = "#020304", PALE = "#e8f2f0", BLOOD = "#d0202a";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const Trees: React.FC<{ f: number; tint?: string; dense?: number }> = ({ f, tint = "#04090a", dense = 9 }) => (
  <g>
    {Array.from({ length: dense }).map((_, i) => {
      const x = (i / (dense - 1)) * 1180 - 50 + (random(`tx${i}`) - 0.5) * 80;
      const w = 50 + random(`tw${i}`) * 60;
      return (
        <g key={i}>
          <path d={`M${x - w / 2} 1920 L${x - w / 3} 0 L${x + w / 3} 0 L${x + w / 2} 1920 Z`} fill={tint} />
          {[0, 1, 2, 3].map((b) => {
            const by = 300 + b * 240 + random(`tb${i}${b}`) * 100, dir = b % 2 ? 1 : -1;
            return <path key={b} d={`M${x} ${by} q${dir * 90} -60 ${dir * (160 + Math.sin(f / 30 + i) * 6)} -140`} stroke={tint} strokeWidth={14 - b * 2} fill="none" />;
          })}
        </g>
      );
    })}
  </g>
);

export const UnicornFig: React.FC<{ f: number; fill?: string; glow?: boolean; kneel?: boolean; eyes?: string }> = ({ f, fill = PALE, glow = true, kneel, eyes = "#5ab8ff" }) => {
  const st = { stroke: glow ? "#bfe8ff" : "#7fc8be", strokeWidth: 4, strokeOpacity: 0.9 } as const;
  const legs = kneel ? [[-150, 0], [-95, 8], [170, 0], [225, 8]].map(([lx, o]) => [lx, o, 120]) : [[-150, 0, 310], [-95, 8, 310], [170, 0, 310], [225, 8, 310]];
  return (
    <g>
      {glow && <ellipse cx={-40} cy={-40} rx={420} ry={340} fill="#9fd8ff" opacity={0.1 + 0.04 * Math.sin(f / 8)} />}
      <path d={`M280 0 C350 20 380 ${130 + Math.sin(f / 9) * 18} 340 240 C320 150 300 80 270 30 Z`} fill={fill} {...st} />
      {legs.map(([lx, o, len], i) => <path key={i} d={`M${lx} 60 L${lx - 6 + o} ${len} L${lx + 26 + o} ${len} L${lx + 34} 60 Z`} fill={fill} {...st} />)}
      <ellipse cx={40} cy={30} rx={260} ry={105} fill={fill} {...st} />
      <g transform={kneel ? "rotate(28 -120 -40)" : `rotate(${Math.sin(f / 14) * 3} -120 -40)`}>
        <path d="M-60 -50 L-120 60 L-250 -260 L-170 -310 Z" fill={fill} {...st} />
        <path d="M-160 -320 L-250 -330 L-400 -200 L-390 -160 L-330 -165 L-240 -220 Z" fill={fill} {...st} />
        <path d="M-232 -326 L-330 -520 L-206 -330 Z" fill="#f4e8c0" stroke="#c8a060" strokeWidth={3} />
        {Array.from({ length: 6 }).map((_, i) => <line key={i} x1={-240 - i * 14} y1={-345 - i * 30} x2={-218 - i * 14} y2={-352 - i * 30} stroke="#c8a060" strokeWidth={2} />)}
        {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M${-175 + i * 12} ${-305 + i * 26} q${30 + Math.sin(f / 7 + i) * 10} 6 44 40`} stroke={fill === PALE ? "#cfe4ff" : INK} strokeWidth={14} fill="none" strokeLinecap="round" />)}
        <circle cx={-300} cy={-262} r={kneel ? 0 : 9} fill={eyes} />
        {kneel && <path d="M-312 -262 q12 6 24 0" stroke="#456" strokeWidth={4} fill="none" />}
      </g>
    </g>
  );
};

const UForest: React.FC<ShotProps> = ({ f, scene }) => (
  <svg width={W} height={H}>
    <Sky top="#14302e" bottom="#020505" id="u1" />
    <Moon x={540} y={420} r={110} f={f} />
    <Trees f={f} tint="#071312" dense={7} />
    <path d="M0 1200 Q540 1120 1080 1200 V1920 H0 Z" fill="#030807" />
    <g transform={`translate(${scene === 0 ? 300 + f * 1.5 : 560} 960) scale(0.75)`} opacity={scene === 0 ? clamp(f / 40) : 1}><UnicornFig f={f} /></g>
    <Trees f={f} tint="#010303" dense={4} />
  </svg>
);

const Scroll: React.FC<ShotProps> = ({ f }) => {
  const draw = clamp(f / 60);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0806" />
      <g transform={`translate(540 860) rotate(${-3 + Math.sin(f / 50)})`}>
        <rect x={-430} y={-480} width={860} height={960} fill="#c9b48a" />
        <rect x={-430} y={-480} width={860} height={960} fill="url(#grainS)" opacity={0} />
        {Array.from({ length: 10 }).map((_, i) => <line key={i} x1={-360} y1={-420 + i * 28} x2={360 - (i % 3) * 60} y2={-420 + i * 28} stroke="#5a4a30" strokeWidth={4} strokeDasharray="12 8" opacity={0.6} />)}
        <g transform="translate(40 200) scale(0.62)" opacity={draw}><UnicornFig f={0} fill="none" glow={false} eyes="#5a4a30" /></g>
        <text x={0} y={440} textAnchor="middle" fontFamily="Fell" fontSize={46} fill="#4a3a20">Κτησίας · Indica · c. 400 BC</text>
        {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={(random(`sc${i}`) - 0.5) * 860} cy={(random(`sy${i}`) - 0.5) * 960} r={4 + random(`sr${i}`) * 14} fill="#6a5030" opacity={0.15} />)}
      </g>
    </svg>
  );
};

const Goblet: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#060404" />
    <circle cx={540} cy={820} r={340} fill="#d8a040" opacity={0.12} />
    <g transform="translate(540 980)">
      <path d="M-160 -300 L160 -300 Q160 -60 20 0 L20 220 L120 260 L-120 260 L-20 220 L-20 0 Q-160 -60 -160 -300 Z" fill="#b8892a" stroke="#f0d080" strokeWidth={4} />
      <ellipse cx={0} cy={-300} rx={160} ry={30} fill="#3a0a20" />
      {Array.from({ length: 6 }).map((_, i) => {
        const p = ((f / 50 + i / 6) % 1);
        return <path key={i} d={`M${-40 + i * 16} ${-310 - p * 400} q${30 * Math.sin(i + f / 10)} -40 0 -80`} stroke="#7aff5a" strokeWidth={10} fill="none" opacity={(1 - p) * 0.5} />;
      })}
    </g>
    <g transform={`translate(780 ${700 + Math.sin(f / 12) * 10}) rotate(-38)`}>
      <path d="M0 0 L-30 -520 L30 0 Z" fill="#f4e8c0" stroke="#c8a060" strokeWidth={3} />
      {Array.from({ length: 10 }).map((_, i) => <line key={i} x1={-26 + i * 2.6} y1={-40 - i * 48} x2={26 - i * 2.6} y2={-60 - i * 48} stroke="#c8a060" strokeWidth={3} />)}
      <circle cx={0} cy={-260} r={180} fill="#fff" opacity={0.06 + 0.04 * Math.sin(f / 6)} />
    </g>
  </svg>
);

const Hunter: React.FC<{ x: number; f: number; s?: number; torch?: boolean; spear?: boolean }> = ({ x, f, s = 1, torch = true, spear = true }) => (
  <g transform={`translate(${x} 1210) scale(${s})`}>
    <path d="M-60 0 L-40 -280 Q0 -330 40 -280 L60 0 Z" fill={INK} />
    <circle cx={0} cy={-320} r={36} fill={INK} />
    <path d="M-36 -330 L0 -380 L36 -330 Z" fill={INK} />
    {spear && <line x1={60} y1={40} x2={120} y2={-520} stroke={INK} strokeWidth={10} />}
    {spear && <path d="M112 -520 L130 -580 L136 -516 Z" fill="#9ab" />}
    {torch && (
      <g>
        <line x1={-50} y1={-200} x2={-90} y2={-360} stroke={INK} strokeWidth={12} />
        <path d={`M-104 -360 Q-112 ${-400 - Math.sin(f / 2) * 14} -90 ${-440 - Math.sin(f / 3) * 18} Q-70 -400 -76 -360 Z`} fill="#ffb43a" />
        <circle cx={-90} cy={-390} r={120} fill="#ff9a2a" opacity={0.18} />
      </g>
    )}
  </g>
);

const Hunters: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a1208" bottom="#030202" id="u2" />
    <Trees f={f} tint="#0a0805" dense={8} />
    <path d="M0 1200 Q540 1140 1080 1200 V1920 H0 Z" fill="#050403" />
    <Hunter x={200 + f * 0.8} f={f} s={0.9} />
    <Hunter x={500 + f * 0.6} f={f + 7} s={1.05} spear={false} />
    <Hunter x={820 + f * 0.7} f={f + 13} s={0.95} />
    {Array.from({ length: 20 }).map((_, i) => <circle key={i} cx={random(`hx${i}`) * W} cy={1000 - ((f * 3 + i * 60) % 800)} r={3} fill="#ffb43a" opacity={0.6} />)}
  </svg>
);

const Maiden: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <path d="M-120 0 Q-100 -120 -60 -180 L60 -180 Q100 -120 120 0 Z" fill="#0a0d10" stroke="#e8e0c8" strokeOpacity={0.6} strokeWidth={3} />
    <path d="M-50 -180 L-40 -340 Q0 -370 40 -340 L50 -180 Z" fill="#0a0d10" stroke="#e8e0c8" strokeOpacity={0.6} strokeWidth={3} />
    <circle cx={0} cy={-390} r={42} fill="#0a0d10" stroke="#e8e0c8" strokeOpacity={0.6} strokeWidth={3} />
    <path d={`M-40 -400 C-80 -320 -70 -240 -90 ${-170 + Math.sin(f / 12) * 6} M40 -400 C80 -320 70 -240 90 ${-170 + Math.sin(f / 12 + 1) * 6}`} stroke="#0a0d10" strokeWidth={22} fill="none" />
  </g>
);

const MaidenShot: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#14302e" bottom="#020505" id="u3" />
    <Moon x={760} y={360} r={80} f={f} />
    <Trees f={f} tint="#061110" dense={7} />
    <path d="M0 1200 Q540 1130 1080 1200 V1920 H0 Z" fill="#030807" />
    <circle cx={540} cy={1000} r={300} fill="#dfe9e4" opacity={0.08} />
    <g transform="translate(540 1190)"><Maiden f={f} /></g>
    {Array.from({ length: 4 }).map((_, i) => {
      const x = 120 + i * 270, show = (f + i * 23) % 70 < 10;
      return show ? <g key={i}><circle cx={x} cy={1000 + (i % 2) * 120} r={5} fill="#ffeeaa" /><circle cx={x + 18} cy={1000 + (i % 2) * 120} r={5} fill="#ffeeaa" /></g> : null;
    })}
  </svg>
);

const Lap: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#14302e" bottom="#020505" id="u4" />
    <Moon x={300} y={360} r={80} f={f} />
    <Trees f={f} tint="#061110" dense={6} />
    <path d="M0 1200 Q540 1130 1080 1200 V1920 H0 Z" fill="#030807" />
    <g transform="translate(330 1190)"><Maiden f={f} /></g>
    <g transform="translate(700 1110) scale(0.7)"><UnicornFig f={f} kneel /></g>
  </svg>
);

const Ambush: React.FC<ShotProps> = ({ f }) => {
  const p = clamp(f / 12);
  return (
    <svg width={W} height={H}>
      <Sky top="#2a0a08" bottom="#050101" id="u5" />
      <Trees f={f} tint="#0a0303" dense={8} />
      <path d="M0 1200 Q540 1130 1080 1200 V1920 H0 Z" fill="#070202" />
      <g transform="translate(600 1000) scale(0.7)"><UnicornFig f={f} glow={false} eyes={BLOOD} /></g>
      <g transform={`translate(${-200 + p * 200} 0)`}><Hunter x={140} f={f} s={1.1} torch /></g>
      <g transform={`translate(${200 - p * 200} 0)`}><Hunter x={960} f={f + 5} s={1.1} /></g>
      {[[-1, 300], [1, 780]].map(([d, x], i) => <line key={i} x1={x - d * 600 * (1 - p)} y1={500} x2={x + d * 80} y2={980} stroke="#9ab" strokeWidth={8} opacity={p} />)}
    </svg>
  );
};

const Tapestry: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#140806" />
    <g transform="translate(540 880)">
      <rect x={-460} y={-600} width={920} height={1200} fill="#2a3a22" stroke="#8a6a3a" strokeWidth={18} />
      {Array.from({ length: 60 }).map((_, i) => <circle key={i} cx={(random(`tp${i}`) - 0.5) * 860} cy={(random(`tq${i}`) - 0.5) * 1120} r={10 + random(`tr${i}`) * 10} fill={["#8a2a2a", "#d8c890", "#5a7a4a"][i % 3]} opacity={0.6} />)}
      <path d="M-300 380 L300 380 M-300 380 L-300 -50 M300 380 L300 -50 M-300 -50 L300 -50" stroke="#6a4a2a" strokeWidth={14} />
      {Array.from({ length: 13 }).map((_, i) => <line key={i} x1={-300 + i * 50} y1={-50} x2={-300 + i * 50} y2={380} stroke="#6a4a2a" strokeWidth={10} />)}
      <g transform="translate(40 280) scale(0.55)"><UnicornFig f={f} fill="#e8e2d0" glow={false} eyes={BLOOD} /></g>
      {Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={-60 + i * 12} cy={150 + i * 18 + (f % 40) * (i % 3)} r={8} fill={BLOOD} />)}
    </g>
  </svg>
);

const Gold: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0404" />
    <rect x={120} y={500} width={840} height={760} rx={20} fill="#4a0a14" />
    <g transform={`translate(540 880) rotate(-12)`}>
      <path d="M-30 340 L0 -400 L30 340 Z" fill="#f4e8c0" stroke="#c8a060" strokeWidth={3} />
      {Array.from({ length: 14 }).map((_, i) => <line key={i} x1={-28 + i * 2} y1={300 - i * 50} x2={28 - i * 2} y2={280 - i * 50} stroke="#c8a060" strokeWidth={3} />)}
    </g>
    {Array.from({ length: 22 }).map((_, i) => <ellipse key={i} cx={200 + random(`gx${i}`) * 680} cy={1150 + random(`gy${i}`) * 90} rx={34 * Math.abs(Math.cos(f / 10 + i))} ry={34} fill="#e0b040" stroke="#8a6020" strokeWidth={3} />)}
    <path d="M380 470 L420 400 L470 450 L540 380 L610 450 L660 400 L700 470 Z" fill="#e0b040" />
  </svg>
);

const Narwhal: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <defs><linearGradient id="nw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bcd8e0" /><stop offset="0.25" stopColor="#3a6a7a" /><stop offset="1" stopColor="#020a10" /></linearGradient></defs>
    <rect width={W} height={H} fill="url(#nw)" />
    {[[0, 380, 300], [600, 420, 420]].map(([x, y, w], i) => <path key={i} d={`M${x} ${y} L${x + w} ${y} L${x + w - 40} ${y + 70} L${x + 30} ${y + 60} Z`} fill="#eef6f8" opacity={0.9} />)}
    <g transform={`translate(${300 + f * 3} ${1000 + Math.sin(f / 12) * 20})`}>
      <path d="M-260 0 C-240 -90 160 -110 260 -20 C300 10 300 40 260 60 C160 120 -240 100 -260 0 Z" fill="#5a7a84" stroke="#eef" strokeWidth={4} />
      <path d="M-260 0 L-360 -60 L-330 0 L-360 60 Z" fill="#5a7a84" />
      <path d="M270 10 L760 -90 L272 30 Z" fill="#f4e8c0" stroke="#c8a060" strokeWidth={2} />
      <circle cx={200} cy={-10} r={8} fill="#000" />
    </g>
    {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={random(`nb${i}`) * W} cy={(random(`nq${i}`) * H - f * 2 + H * 4) % H} r={3} fill="#dff" opacity={0.3} />)}
  </svg>
);

const UEyes: React.FC<ShotProps> = ({ f }) => {
  const step = clamp(f / 60);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#000" />
      <Trees f={f} tint="#050a0a" dense={7} />
      <g transform={`translate(560 ${1010}) scale(${0.6 + 0.35 * step})`} opacity={0.9}>
        <UnicornFig f={f} fill={INK} glow={false} eyes={BLOOD} />
      </g>
      <circle cx={540} cy={900} r={420} fill="#000" opacity={0.3} />
    </svg>
  );
};

export const SHOTS3: Record<string, React.FC<ShotProps>> = {
  uforest: UForest, scroll: Scroll, goblet: Goblet, hunters: Hunters, maiden: MaidenShot, lap: Lap,
  ambush: Ambush, tapestry: Tapestry, gold: Gold, narwhal: Narwhal, ueyes: UEyes,
};
