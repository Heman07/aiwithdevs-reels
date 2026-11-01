import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";
import { Diya, Woman } from "./Shots40";
import { Figure, Palace } from "./Shots41";

/* Vetal (horror) + Barbarik (devotional) */
const W = 1080, H = 1920, GOLD = "#f2b544", FIRE = "#ff8a1a", BLUE = "#3a6ad0", PALE = "#b8c4b0";
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const ease = (v: number) => { const c = clamp(v); return c * c * (3 - 2 * c); };

/* ---------- VETAL helpers ---------- */
const Shmashan: React.FC<{ f: number; id: string; moon?: boolean }> = ({ f, id, moon = true }) => (
  <>
    <Sky top="#06100e" bottom="#1a2a24" id={id} />
    {moon && <Moon x={820} y={330} r={90} f={f} />}
    <path d="M0 1010 Q300 980 540 1000 T1080 990 V1150 H0 Z" fill="#0c1614" />
    <rect y={1150} width={W} height={H} fill="#080e0c" />
  </>
);

const DeadTree: React.FC<{ x?: number; s?: number }> = ({ x = 330, s = 1 }) => (
  <g transform={`translate(${x} 1150) scale(${s})`}>
    <path d="M-60 0 Q-40 -300 -30 -560 Q-20 -640 -60 -720 M-30 -560 Q60 -620 140 -700 M-36 -420 Q-160 -480 -230 -600 M-40 -620 Q-10 -700 20 -790" stroke="#141a16" strokeWidth={48} fill="none" strokeLinecap="round" />
    <path d="M-30 -560 Q160 -560 440 -600" stroke="#141a16" strokeWidth={30} fill="none" strokeLinecap="round" />
    <path d="M-60 0 Q-30 -300 -16 -560" stroke="#202a24" strokeWidth={16} fill="none" />
    {[[-230, -600], [140, -700], [20, -790], [-60, -720]].map(([a, b], i) => <path key={i} d={`M${a} ${b} l${-30 + i * 20} -60 M${a} ${b} l40 -40`} stroke="#141a16" strokeWidth={10} strokeLinecap="round" />)}
    {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${-110 + i * 40} 0 Q${-90 + i * 40} 30 ${-140 + i * 50} 40`} stroke="#141a16" strokeWidth={12} fill="none" />)}
  </g>
);

/* corpse hanging upside down: origin = feet at branch */
const Vetal: React.FC<{ f: number; s?: number; eyes?: number; grin?: number; upright?: boolean; sway?: boolean }> = ({ f, s = 1, eyes = 0, grin = 0, upright, sway = true }) => (
  <g transform={`scale(${s}) rotate(${sway ? Math.sin(f / 14) * 5 : 0}) ${upright ? "rotate(180) translate(0 -400)" : ""}`}>
    <path d="M0 -30 L0 0" stroke="#5a4a30" strokeWidth={6} />
    <path d="M-16 0 L-12 140 M16 0 L12 140" stroke={PALE} strokeWidth={22} strokeLinecap="round" />
    <path d="M-40 140 L40 140 L48 300 L-48 300 Z" fill="#d8d0c0" opacity={0.9} />
    <path d="M-30 180 L-64 360 M30 180 L64 360" stroke={PALE} strokeWidth={18} strokeLinecap="round" />
    <path d="M-64 360 l-10 26 M-64 360 l6 28 M64 360 l10 26 M64 360 l-6 28" stroke={PALE} strokeWidth={5} />
    <circle cx={0} cy={340} r={46} fill={PALE} />
    {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M${-40 + i * 10} 360 Q${-46 + i * 12 + Math.sin(f / 10 + i) * 6} 430 ${-40 + i * 10} ${470 + (i % 3) * 16}`} stroke="#1a1414" strokeWidth={7} fill="none" />)}
    <ellipse cx={-16} cy={350} rx={9} ry={7} fill={eyes > 0 ? "#cfff6a" : "#3a3a30"} opacity={0.4 + eyes * 0.6} />
    <ellipse cx={16} cy={350} rx={9} ry={7} fill={eyes > 0 ? "#cfff6a" : "#3a3a30"} opacity={0.4 + eyes * 0.6} />
    {eyes > 0 && <><circle cx={-16} cy={350} r={22} fill="#cfff6a" opacity={0.25 * eyes} /><circle cx={16} cy={350} r={22} fill="#cfff6a" opacity={0.25 * eyes} /></>}
    <path d={`M-18 ${322} Q0 ${322 - 18 * grin} 18 322`} stroke="#2a0a0a" strokeWidth={5} fill={grin > 0.3 ? "#2a0a0a" : "none"} />
    {grin > 0.3 && <path d="M-12 320 l3 -8 l3 8 M6 320 l3 -8 l3 8" fill="#eee" />}
  </g>
);

const Pyre: React.FC<{ x: number; f: number; s?: number; i?: number }> = ({ x, f, s = 1, i = 0 }) => (
  <g transform={`translate(${x} 1150) scale(${s})`}>
    <circle cy={-90} r={150} fill={FIRE} opacity={0.15 + Math.sin(f / 3 + i) * 0.05} />
    {[0, 1, 2].map((r) => <rect key={r} x={-110 + r * 10} y={-24 - r * 22} width={220 - r * 20} height={20} fill="#3a2010" transform={`rotate(${r % 2 ? 4 : -4})`} />)}
    {Array.from({ length: 7 }).map((_, k) => <path key={k} d={`M${-80 + k * 26} -60 Q${-90 + k * 26 + Math.sin(f / 2 + k + i) * 14} ${-150 - (k % 3) * 40} ${-70 + k * 26} -60 Z`} fill={k % 2 ? FIRE : "#ffcf3a"} opacity={0.85} />)}
    {Array.from({ length: 5 }).map((_, k) => { const t = ((f + k * 9 + i * 5) % 45) / 45; return <circle key={k} cx={Math.sin(k * 3 + t * 6) * 40} cy={-160 - t * 300} r={3} fill="#ffcf3a" opacity={1 - t} />; })}
  </g>
);

const Tantrik: React.FC<{ f: number; s?: number; evil?: number; bow?: number }> = ({ f, s = 1, evil = 0, bow = 0 }) => (
  <g transform={`scale(${s})`}>
    <g transform={`rotate(${bow * 50} 0 -230)`}>
      <Figure f={f} skin="#8a8078" cloth="#1a1414" crown={false} weapon="none" />
      <path d="M-40 -440 Q0 -330 40 -440 Q20 -380 0 -370 Q-20 -380 -40 -440 Z" fill="#d8d0c8" />
      <path d="M-30 -476 L30 -476 M-30 -470 L30 -470 M-30 -464 L30 -464" stroke="#e8e0d8" strokeWidth={3} />
      <circle cx={0} cy={-476} r={6} fill="#c0101a" />
      <path d="M-46 -480 Q-40 -530 0 -540 Q40 -530 46 -480" fill="#3a3030" />
      <ellipse cx={-16} cy={-452} rx={6} ry={4} fill={evil > 0 ? "#ff2a1a" : "#1a0a0a"} /><ellipse cx={16} cy={-452} rx={6} ry={4} fill={evil > 0 ? "#ff2a1a" : "#1a0a0a"} />
      {Array.from({ length: 9 }).map((_, i) => <circle key={i} cx={-36 + i * 9} cy={-330 + Math.abs(i - 4) * -6} r={6} fill="#5a3a1a" />)}
    </g>
  </g>
);

const Jackals: React.FC<{ f: number }> = ({ f }) => (
  <g>{[[120, 1110], [960, 1100], [800, 1130]].map(([x, y], i) => (f + i * 20) % 60 < 50 ? <g key={i}><circle cx={x} cy={y} r={5} fill="#ffd040" /><circle cx={x + 16} cy={y} r={5} fill="#ffd040" /></g> : null)}</g>
);

const Sword: React.FC<{ x: number; y: number; a?: number; glow?: number }> = ({ x, y, a = 0, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${a})`}>
    {glow > 0 && <path d="M0 0 L0 -300" stroke="#fff" strokeWidth={30} opacity={0.2 * glow} />}
    <path d="M-8 0 L-8 -280 L0 -310 L8 -280 L8 0 Z" fill="#d8dce8" stroke="#8a8a98" strokeWidth={2} />
    <rect x={-34} y={-4} width={68} height={12} fill={GOLD} /><rect x={-7} y={8} width={14} height={50} fill="#5a2a1a" />
  </g>
);

/* ---------- VETAL shots ---------- */
const VtHook: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Shmashan f={f} id="vt1" />
    <DeadTree x={300} />
    <g transform={`translate(${300 + 380} ${1150 - 590})`}><Vetal f={f} s={0.95} eyes={clamp((f - 30) / 15)} grin={clamp((f - 60) / 15)} /></g>
    <Pyre x={160} f={f} s={0.7} />
    <Jackals f={f} />
  </svg>
);

const VtWhat: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#050a08" />
    <circle cx={540} cy={800} r={460} fill="#4a7a3a" opacity={0.08 + Math.sin(f / 6) * 0.03} />
    <g transform="translate(540 1150)"><path d="M-260 0 L260 0 L230 -40 L-230 -40 Z" fill="#2a2a24" /><g transform="rotate(-90) translate(70 -40)"><Vetal f={f} s={0.9} sway={false} /></g></g>
    {Array.from({ length: 30 }).map((_, i) => { const t = ((f * 1.4 + i * 11) % 120) / 120; return <circle key={i} cx={540 + Math.sin(i * 2 + t * 4) * (200 - t * 160)} cy={500 + t * 560} r={5 + (i % 3) * 3} fill="#cfff6a" opacity={(1 - Math.abs(t - 0.5) * 2) * 0.6} />; })}
    <g transform={`translate(540 ${640 + Math.sin(f / 10) * 10})`} opacity={0.5 - clamp(f / 80) * 0.3}><ellipse rx={70} ry={110} fill="#cfe8c0" opacity={0.4} /><circle cy={-70} r={40} fill="#e0f0d0" opacity={0.5} /><circle cx={-14} cy={-74} r={6} fill="#cfff6a" /><circle cx={14} cy={-74} r={6} fill="#cfff6a" /></g>
  </svg>
);

const VtCourt: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Palace f={f} id="vt2" />
    <rect x={380} y={820} width={320} height={60} fill={GOLD} /><path d="M400 820 L400 600 Q540 520 680 600 L680 820" fill="#7a1a2a" stroke={GOLD} strokeWidth={8} />
    <g transform="translate(540 1150) scale(0.85)"><Figure f={f} cloth="#8a1a2a" skin="#c8906a" weapon="none" aura={0.4} /></g>
    <g transform={`translate(${1100 - Math.min(f * 4, 300)} 1150) scale(0.85)`}><Tantrik f={f} /></g>
    {[200, 880].map((x, i) => <Diya key={i} x={x} y={1150} f={f} i={i} s={1.3} />)}
  </svg>
);

const VtRequest: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0808" />
    <circle cx={540} cy={760} r={420} fill="#5a1010" opacity={0.18} />
    <g transform="translate(540 1200) scale(1.6)"><Tantrik f={f} evil={clamp((f - 20) / 10)} /></g>
    <g opacity={0.35 + Math.sin(f / 8) * 0.1}><DeadTree x={540} s={0.5} /><g transform="translate(730 855)"><Vetal f={f} s={0.45} /></g></g>
  </svg>
);

const VtCremation: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Shmashan f={f} id="vt3" />
    <DeadTree x={700} s={0.9} />
    <g transform={`translate(${700 + 0.9 * 380} ${1150 - 0.9 * 590})`}><Vetal f={f} s={0.8} /></g>
    {[[140, 0.8], [400, 0.6], [560, 0.5]].map(([x, s], i) => <Pyre key={i} x={x} f={f} s={s} i={i} />)}
    <Jackals f={f} />
    <g transform={`translate(${-60 + Math.min(f * 3, 300)} 1170) scale(0.7)`}><Figure f={f} cloth="#5a1a2a" weapon="none" /><Sword x={-80} y={-260} a={-10} /></g>
  </svg>
);

const VtCarry: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Shmashan f={f} id="vt4" />
    <Pyre x={900} f={f} s={0.7} />
    <g transform={`translate(${380 + f * 1.2} 1170)`}>
      <g transform="scale(0.95)"><Figure f={f} cloth="#5a1a2a" weapon="none" /></g>
      <g transform="translate(-140 -380) rotate(-90)"><Vetal f={f} s={0.62} sway={false} eyes={clamp((f - 25) / 8)} grin={clamp((f - 30) / 8)} /></g>
    </g>
    {f > 30 && Array.from({ length: 3 }).map((_, i) => <text key={i} x={180 + i * 80 + (f % 6)} y={700 - i * 40 - ((f - 30) % 40)} fontSize={50 - i * 8} fill="#cfff6a" opacity={0.6} fontFamily="serif">हा</text>)}
  </svg>
);

const VtCurse: React.FC<ShotProps> = ({ f, dur }) => {
  const crack = clamp((f - dur * 0.55) / 20);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0404" />
      <circle cx={540} cy={760} r={480} fill="#8a1010" opacity={0.2 + crack * 0.15} />
      <g transform="translate(540 1500) scale(1.9)">
        <Figure f={f} cloth="#5a1a2a" weapon="none" />
      </g>
      {crack > 0 && Array.from({ length: 7 }).map((_, i) => { const a = (i / 7) * Math.PI * 2; return <path key={i} d={`M540 ${1500 - 1.9 * 450} l${Math.cos(a) * 120 * crack} ${Math.sin(a) * 120 * crack}`} stroke="#ff3a1a" strokeWidth={6} />; })}
      <g transform="translate(860 520) scale(0.9)"><Vetal f={f} eyes={1} grin={1} /></g>
    </svg>
  );
};

const VtFlyback: React.FC<ShotProps> = ({ f, dur }) => {
  const t = ease(f / Math.max(10, dur * 0.6));
  const x = 640 - t * 0 + Math.sin(t * Math.PI) * -260, y = 1000 - t * 440;
  return (
    <svg width={W} height={H}>
      <Shmashan f={f} id="vt5" />
      <DeadTree x={300} />
      <g transform="translate(820 1170) scale(0.8)"><Figure f={f} cloth="#5a1a2a" weapon="none" /></g>
      {Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={x + i * 30 * (1 - t)} cy={y + i * 40 * (1 - t)} r={20 - i * 2} fill="#cfff6a" opacity={0.15} />)}
      <g transform={`translate(${x + 40 * t} ${y})`}><Vetal f={f} s={0.8} eyes={1} grin={0.6} /></g>
    </svg>
  );
};

const VtLoop: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Shmashan f={f} id="vt6" moon={false} />
    <circle cx={540} cy={780} r={380} fill="none" stroke="#cfff6a" strokeWidth={4} strokeDasharray="14 22" opacity={0.4} transform={`rotate(${f} 540 780)`} />
    {Array.from({ length: 24 }).map((_, i) => { const a = (i / 24) * Math.PI * 2 - Math.PI / 2; const lit = i < Math.min(24, Math.floor(f / 3)); return <circle key={i} cx={540 + Math.cos(a) * 380} cy={780 + Math.sin(a) * 380} r={lit ? 14 : 8} fill={lit ? "#cfff6a" : "#2a3a2a"} />; })}
    <DeadTree x={420} s={0.55} />
    <g transform={`translate(${420 + 0.55 * 380} ${1150 - 0.55 * 590})`}><Vetal f={f} s={0.5} eyes={1} /></g>
    <g transform={`translate(${740 - ((f * 3) % 200)} 1170) scale(0.5)`}><Figure f={f} cloth="#5a1a2a" weapon="none" /></g>
  </svg>
);

const VtSecret: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#060808" />
    <circle cx={540} cy={820} r={460} fill="#cfff6a" opacity={0.05} />
    <g transform="translate(330 1170) scale(0.9)"><Figure f={f} cloth="#5a1a2a" weapon="none" /></g>
    <g transform="translate(470 560) rotate(-90)"><Vetal f={f} s={0.55} sway={false} eyes={1} /></g>
    <g transform="translate(800 1170) scale(0.9)" opacity={0.5 + Math.sin(f / 5) * 0.2}><Tantrik f={f} evil={1} /></g>
    <g transform="translate(870 700)" opacity={0.8}><path d="M-60 0 L60 0 L40 30 L-40 30 Z" fill="#3a2a2a" /><circle cy={-20} r={24} fill="#d8d0c0" /><circle cx={-8} cy={-22} r={5} fill="#000" /><circle cx={8} cy={-22} r={5} fill="#000" /></g>
    <Pyre x={1000} f={f} s={0.5} />
  </svg>
);

const VtEnd: React.FC<ShotProps> = ({ f, dur }) => {
  const sw = ease((f - dur * 0.35) / 10);
  return (
    <svg width={W} height={H}>
      <Shmashan f={f} id="vt7" />
      {[160, 940].map((x, i) => <Pyre key={i} x={x} f={f} s={0.7} i={i} />)}
      <g transform="translate(700 1170) scale(0.9)"><Tantrik f={f} evil={1} bow={1 - sw * 0.3} /></g>
      <g transform="translate(360 1170) scale(0.95)"><Figure f={f} cloth="#5a1a2a" weapon="none" aura={sw} /></g>
      <Sword x={420} y={820} a={-60 + sw * 140} glow={sw} />
      {sw > 0.5 && <rect width={W} height={H} fill="#ff2a1a" opacity={(1 - sw) * 0.5 + 0.05} />}
      <g transform={`translate(540 ${400 + Math.sin(f / 10) * 10})`} opacity={sw}><Vetal f={f} s={0.5} eyes={1} grin={1} /></g>
    </svg>
  );
};

/* ---------- BARBARIK helpers ---------- */
const BARB = { skin: "#7a5a44", cloth: "#2a2a6a" };
const Barbarik: React.FC<{ f: number; s?: number; draw?: number; headless?: boolean; weapon?: string }> = ({ f, s = 1, draw = 0, weapon = "bow" }) => (
  <g transform={`scale(${s})`}>
    <g transform="translate(70 -420) rotate(20)"><rect x={-20} y={-90} width={40} height={170} rx={10} fill="#5a3014" stroke={GOLD} strokeWidth={3} />{[-10, 0, 10].map((dx, i) => <g key={i}><path d={`M${dx} -90 L${dx} -150`} stroke="#c8a060" strokeWidth={4} /><path d={`M${dx - 7} -150 L${dx} -170 L${dx + 7} -150 Z`} fill={i === 1 ? "#ff3a2a" : GOLD} /><circle cx={dx} cy={-160} r={12} fill={GOLD} opacity={0.35 + Math.sin(f / 4 + i) * 0.2} /></g>)}</g>
    <Figure f={f} skin={BARB.skin} cloth={BARB.cloth} weapon={weapon} drawBow={draw} />
  </g>
);

const Arrow: React.FC<{ x: number; y: number; a?: number; glow?: number }> = ({ x, y, a = 0, glow = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${a})`}>
    <path d="M-120 0 L40 0" stroke={GOLD} strokeWidth={60} opacity={0.15 * glow} strokeLinecap="round" />
    <path d="M-120 0 L40 0" stroke="#e8c070" strokeWidth={6} />
    <path d="M40 -14 L76 0 L40 14 Z" fill="#ff3a2a" />
    <path d="M-120 0 l-20 -16 M-120 0 l-20 16 M-104 0 l-20 -16 M-104 0 l-20 16" stroke="#c0281a" strokeWidth={5} />
  </g>
);

const Kuru: React.FC<{ id: string; dusk?: boolean }> = ({ id, dusk }) => (
  <>
    <Sky top={dusk ? "#3a1a2a" : "#e09050"} bottom={dusk ? "#c8603a" : "#f8d8a0"} id={id} />
    <path d="M0 1000 Q540 960 1080 1000 V1150 H0 Z" fill={dusk ? "#5a3020" : "#c8a060"} />
    <rect y={1150} width={W} height={H} fill={dusk ? "#3a2014" : "#a8804a"} />
  </>
);

const Army: React.FC<{ x: number; y: number; c: string; n?: number; f: number; flip?: boolean; o?: number }> = ({ x, y, c, n = 18, f, flip, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`} opacity={o}>
    {Array.from({ length: n }).map((_, i) => { const cx = (i % 6) * 48 + Math.floor(i / 6) * 22, cy = -Math.floor(i / 6) * 34; return <g key={i} transform={`translate(${cx} ${cy + Math.sin(f / 5 + i) * 2})`}><rect x={-8} y={-40} width={16} height={40} fill={c} /><circle cy={-50} r={10} fill="#c8906a" /><path d="M10 -60 L10 10" stroke="#8a8a90" strokeWidth={3} /></g>; })}
    <g transform="translate(110 -170)"><path d="M0 0 L0 -90" stroke="#5a3a1a" strokeWidth={5} /><path d="M0 -90 L60 -76 L0 -60 Z" fill={c} /></g>
  </g>
);

const Peepal: React.FC<{ f: number; pierced?: number; x?: number; s?: number }> = ({ f, pierced = 0, x = 540, s = 1 }) => {
  const leaves = Array.from({ length: 34 }).map((_, i) => ({ x: -280 + random(`lx${i}`) * 560, y: -760 + random(`ly${i}`) * 400, a: random(`la${i}`) * 360 }));
  return (
    <g transform={`translate(${x} 1150) scale(${s})`}>
      <path d="M-40 0 Q-30 -250 -10 -460 M-14 -380 Q-140 -460 -220 -560 M-10 -440 Q120 -520 200 -620 M-10 -460 Q0 -600 -20 -720" stroke="#5a3a1a" strokeWidth={36} fill="none" strokeLinecap="round" />
      <ellipse cx={0} cy={-580} rx={340} ry={230} fill="#2a6a2a" opacity={0.45} />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y + Math.sin(f / 10 + i) * 3}) rotate(${l.a})`}>
          <path d="M0 -28 C22 -18 22 18 0 30 C-22 18 -22 -18 0 -28 Z" fill={i % 3 ? "#3a8a3a" : "#4aa04a"} />
          {i / leaves.length < pierced && <circle r={6} fill="#1a0a04" stroke={GOLD} strokeWidth={2} />}
        </g>
      ))}
    </g>
  );
};

/* ---------- BARBARIK shots ---------- */
const BbHook: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Kuru id="bb1" dusk />
    <Army x={60} y={1150} c="#c0281a" f={f} />
    <Army x={1020} y={1150} c="#2a5a9a" f={f} flip />
    <circle cx={540} cy={640} r={240} fill={GOLD} opacity={0.12 + Math.sin(f / 6) * 0.04} />
    <path d="M380 1150 L460 1020 L620 1020 L700 1150 Z" fill="#4a2a1a" />
    <g transform="translate(540 1030) scale(0.9)"><Barbarik f={f} draw={clamp(f / 40)} /></g>
  </svg>
);

const BbIntro: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a1a3a" bottom="#8a4a3a" id="bb2" />
    <path d="M0 1050 Q540 1000 1080 1050 V1150 H0 Z" fill="#4a2a20" /><rect y={1150} width={W} height={H} fill="#2a1810" />
    <g transform="translate(220 1160) scale(0.9)" opacity={0.8}><Figure f={f} skin="#a8785a" cloth="#6a3a1a" weapon="gada" /></g>
    <g transform="translate(540 1160) scale(1.05)" opacity={0.9}><Figure f={f} skin="#5a3a2a" cloth="#3a1a1a" crown /></g>
    <g transform="translate(850 1160) scale(0.85)"><Barbarik f={f} weapon="none" /></g>
    {[[300, 500], [600, 470]].map(([x, y], i) => <path key={i} d={`M${x} ${y} l70 0`} stroke={GOLD} strokeWidth={4} strokeDasharray="8 8" opacity={0.6} />)}
  </svg>
);

const BbArrows: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#120a14" />
    <circle cx={540} cy={760} r={480} fill={GOLD} opacity={0.12 + Math.sin(f / 5) * 0.04} />
    {[-1, 0, 1].map((k, i) => <g key={i} transform={`translate(540 ${760 + k * 170})`} opacity={clamp((f - i * 10) / 10)}><Arrow x={0} y={0} a={-10 + k * 4} glow={1} /></g>)}
    {Array.from({ length: 30 }).map((_, i) => { const a = (i / 30) * Math.PI * 2 + f / 30; return <circle key={i} cx={540 + Math.cos(a) * (330 + Math.sin(f / 8 + i) * 20)} cy={760 + Math.sin(a) * 330} r={4} fill={GOLD} opacity={0.7} />; })}
    <g transform="translate(540 1300) scale(0.5)" opacity={0.5}><Barbarik f={f} weapon="pray" /></g>
  </svg>
);

const BbVow: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#24120a" />
    <circle cx={540} cy={820} r={480} fill={FIRE} opacity={0.12} />
    <rect x={120} y={1060} width={840} height={90} fill="#5a2a14" />
    <g transform="translate(360 1160) scale(0.85)"><Woman f={f} saree="#8a1a3a" /></g>
    <g transform="translate(680 1160) scale(0.85)"><Barbarik f={f} weapon="pray" /></g>
    <g transform="translate(520 640)"><path d="M-40 0 Q0 -40 40 0" stroke={GOLD} strokeWidth={6} fill="none" /><circle r={10} fill={GOLD} cy={-14} opacity={0.6 + Math.sin(f / 4) * 0.3} /></g>
    {[180, 900].map((x, i) => <Diya key={i} x={x} y={1160} f={f} i={i} s={1.4} />)}
  </svg>
);

const BbKrishna: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Kuru id="bb3" />
    {Array.from({ length: 5 }).map((_, i) => <g key={i} transform={`translate(${80 + i * 240} 1000)`}><rect x={-10} y={-160} width={20} height={160} fill="#5a3a1a" /><circle cy={-200} r={70} fill="#4a7a3a" /></g>)}
    <g transform={`translate(${-100 + Math.min(f * 4, 400)} 1170) scale(0.8)`}><Barbarik f={f} weapon="none" /></g>
    <g transform="translate(780 1170) scale(0.8)">
      <Figure f={f} skin="#c8906a" cloth="#f4f0e8" crown={false} weapon="none" />
      <circle cx={0} cy={-450} r={70} fill={BLUE} opacity={0.12 + Math.sin(f / 6) * 0.08} />
      <path d="M90 -250 L90 -560" stroke="#8a6a2a" strokeWidth={8} />
    </g>
  </svg>
);

const BbTree: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp((f - dur * 0.55) / (dur * 0.3));
  return (
    <svg width={W} height={H}>
      <Kuru id="bb4" />
      <Peepal f={f} x={640} s={0.95} pierced={t} />
      <g transform="translate(180 1170) scale(0.7)"><Barbarik f={f} draw={clamp(f / (dur * 0.5))} /></g>
      {t > 0 && t < 1 && <Arrow x={300 + t * 600} y={560 + Math.sin(t * 12) * 120} a={Math.cos(t * 12) * 30} />}
      <g transform="translate(900 1170) scale(0.6)"><Figure f={f} skin="#c8906a" cloth="#f4f0e8" crown={false} weapon="none" /></g>
    </svg>
  );
};

const BbLeaf: React.FC<ShotProps> = ({ f }) => {
  const a = f / 6, SK = "#c8906a";
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#e8b878" />
      <circle cx={540} cy={520} r={260} fill={BLUE} opacity={0.08 + Math.sin(f / 6) * 0.04} />
      <rect y={1150} width={W} height={H} fill="#a8804a" />
      <g transform="translate(400 1150) rotate(-15)"><path d="M0 -50 C70 -30 70 30 0 56 C-70 30 -70 -30 0 -50 Z" fill="#3a8a3a" stroke="#1e5a1e" strokeWidth={3} /><path d="M0 -50 L0 56" stroke="#1e5a1e" strokeWidth={3} /></g>
      <path d="M440 300 L640 300 L660 900 L420 900 Z" fill="#f4f0e8" stroke="#c8c0b0" strokeWidth={4} />
      <path d="M420 900 L660 900 L650 930 L430 930 Z" fill={GOLD} />
      <path d="M470 930 L610 930 L620 1060 L480 1060 Z" fill={SK} />
      <path d="M470 1050 Q450 1150 470 1150 L800 1150 Q840 1150 830 1110 Q800 1070 720 1060 L620 1040 Z" fill={SK} stroke="#a8704a" strokeWidth={3} />
      {[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={760 + i * 16} cy={1140 - i * 4} rx={12} ry={10} fill="#d8a07a" stroke="#a8704a" strokeWidth={2} />)}
      <path d="M520 990 Q545 1000 570 990" stroke={GOLD} strokeWidth={6} fill="none" />
      <ellipse cx={600} cy={1100} rx={320} ry={90} fill="none" stroke={GOLD} strokeWidth={3} strokeDasharray="10 14" opacity={0.6} />
      <Arrow x={600 + Math.cos(a) * 320} y={1100 + Math.sin(a) * 90} a={(a * 180) / Math.PI + 90} />
    </svg>
  );
};

const BbParadox: React.FC<ShotProps> = ({ f }) => {
  const tilt = Math.sin(f / 14) * 18;
  return (
    <svg width={W} height={H}>
      <Kuru id="bb5" dusk />
      <g transform="translate(540 760)">
        <path d="M0 0 L0 380" stroke={GOLD} strokeWidth={14} />
        <path d="M-120 380 L120 380" stroke={GOLD} strokeWidth={16} />
        <g transform={`rotate(${tilt})`}>
          <path d="M-380 0 L380 0" stroke={GOLD} strokeWidth={12} />
          {[-1, 1].map((k) => <g key={k} transform={`translate(${k * 360} 0) rotate(${-tilt})`}><path d="M0 0 L-90 160 M0 0 L90 160" stroke={GOLD} strokeWidth={3} /><path d="M-110 160 Q0 220 110 160 Z" fill={GOLD} /><g transform="translate(-60 160) scale(0.7)"><Army x={0} y={0} c={k < 0 ? "#c0281a" : "#2a5a9a"} n={6} f={f} /></g></g>)}
        </g>
        <circle cy={0} r={18} fill={GOLD} />
      </g>
      <g transform={`translate(${540 + Math.sin(f / 14) * -300} 640) scale(0.32)`}><Barbarik f={f} weapon="none" /></g>
    </svg>
  );
};

const BbSacrifice: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#140a08" />
    <circle cx={540} cy={700} r={500} fill={GOLD} opacity={0.08 + clamp(f / 60) * 0.12} />
    <g transform="translate(360 1170) scale(0.9)"><Barbarik f={f} weapon="pray" /></g>
    <g transform="translate(740 1170) scale(0.9)"><Figure f={f} skin={BLUE} cloth="#f0c020" feather aura={clamp(f / 30)} weapon="chakra" /></g>
    {Array.from({ length: 24 }).map((_, i) => <circle key={i} cx={random(`sf${i}`) * W} cy={(random(`sg${i}`) * 900 + f * 3) % 1000 + 100} r={6} fill={i % 2 ? "#f07aa0" : "#ffcf3a"} opacity={0.7} />)}
  </svg>
);

const BbHill: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Kuru id="bb6" dusk />
    <path d="M560 1150 L800 560 L1080 520 L1080 1150 Z" fill="#3a2418" />
    <g transform="translate(880 520)">
      <circle cy={-60} r={110} fill={GOLD} opacity={0.2 + Math.sin(f / 6) * 0.06} />
      <circle cy={-60} r={56} fill={BARB.skin} />
      <path d="M-56 -100 L-50 -150 L-26 -126 L0 -170 L26 -126 L50 -150 L56 -100 Z" fill={GOLD} stroke="#a87010" strokeWidth={3} />
      <path d="M-22 -64 L-8 -62 M22 -64 L8 -62" stroke="#1a0a0a" strokeWidth={4} />
      <circle cx={0} cy={-90} r={6} fill="#c0101a" />
      {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={-60 + i * 13} cy={0} r={9} fill={i % 2 ? "#ff7a1a" : "#ffcf3a"} />)}
    </g>
    <Army x={40} y={1150} c="#c0281a" f={f} n={12} />
    <Army x={260} y={1220} c="#2a5a9a" f={f} n={12} />
    {Array.from({ length: 6 }).map((_, i) => { const t = ((f + i * 10) % 60) / 60; return <path key={i} d={`M${60 + t * 400} ${1100 - Math.sin(t * Math.PI) * 300} l30 -8`} stroke={GOLD} strokeWidth={4} />; })}
    <text x={540} y={420} textAnchor="middle" fontSize={80} fill={GOLD} opacity={0.5} fontWeight={700}>{Math.min(18, 1 + Math.floor(f / 6))}</text>
  </svg>
);

const BbKhatu: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#f09040" bottom="#f8e0b0" id="bb7" />
    <circle cx={540} cy={560} r={360} fill={GOLD} opacity={0.18} />
    <g transform="translate(540 1000)">
      <rect x={-320} y={-260} width={640} height={260} fill="#f4ecdc" stroke="#c8a070" strokeWidth={6} />
      {[-240, 240].map((x) => <g key={x}><path d={`M${x - 70} -260 Q${x - 60} -400 ${x} -470 Q${x + 60} -400 ${x + 70} -260 Z`} fill="#f8f0e0" stroke="#c8a070" strokeWidth={5} />{[0, 1, 2].map((k) => <path key={k} d={`M${x - 60 + k * 6} ${-300 - k * 50} L${x + 60 - k * 6} ${-300 - k * 50}`} stroke="#d8c0a0" strokeWidth={3} />)}<ellipse cx={x} cy={-478} rx={22} ry={10} fill="#e8d8c0" /><path d={`M${x} -488 L${x} -520`} stroke={GOLD} strokeWidth={8} /></g>)}
      <path d="M-150 -260 Q-140 -520 0 -680 Q140 -520 150 -260 Z" fill="#fbf4e6" stroke="#c8a070" strokeWidth={6} />
      {[0, 1, 2, 3, 4, 5].map((k) => <path key={k} d={`M${-140 + k * 12} ${-320 - k * 55} L${140 - k * 12} ${-320 - k * 55}`} stroke="#d8c0a0" strokeWidth={4} />)}
      <path d="M-40 -680 L40 -680 L0 -700 Z" fill="#e8d8c0" /><ellipse cx={0} cy={-690} rx={40} ry={16} fill="#e8d8c0" stroke="#c8a070" strokeWidth={3} />
      <path d="M-14 -706 Q0 -740 14 -706 Z" fill={GOLD} />
      <path d="M0 -740 L0 -820" stroke="#7a4a1a" strokeWidth={6} /><path d={`M0 -820 L${80 + Math.sin(f / 4) * 6} -800 L0 -780 Z`} fill="#ff7a1a" />
      <path d="M-70 0 L-70 -170 Q0 -230 70 -170 L70 0 Z" fill="#c8743a" />
      <circle cy={-110} r={34} fill={GOLD} opacity={0.6 + Math.sin(f / 5) * 0.2} />
      {Array.from({ length: 16 }).map((_, i) => <circle key={i} cx={-300 + i * 40} cy={-260 + Math.sin((i / 15) * Math.PI) * 30} r={10} fill={i % 2 ? "#ff7a1a" : "#ffcf3a"} />)}
    </g>
    <rect y={1150} width={W} height={H} fill="#c8a060" />
    {Array.from({ length: 8 }).map((_, i) => { const x = ((i * 150 + f * 2) % 1250) - 80; return <g key={i} transform={`translate(${x} 1200)`}><g transform="scale(0.36)">{i % 2 ? <Woman f={f} saree={["#c0281a", "#e88a1a"][i % 2]} /> : <Figure f={f} crown={false} cloth="#f4f0e8" />}</g><path d="M30 -140 L30 -300" stroke="#7a4a1a" strokeWidth={4} /><path d={`M30 -300 L${90 + Math.sin(f / 4 + i) * 6} -280 L30 -260 Z`} fill={i % 3 ? "#ff7a1a" : "#2a8a3a"} /></g>; })}
  </svg>
);

export const SHOTS43: Record<string, React.FC<ShotProps>> = {
  vthook: VtHook, vtwhat: VtWhat, vtcourt: VtCourt, vtrequest: VtRequest, vtcremation: VtCremation, vtcarry: VtCarry, vtcurse: VtCurse, vtflyback: VtFlyback, vtloop: VtLoop, vtsecret: VtSecret, vtend: VtEnd,
  bbhook: BbHook, bbintro: BbIntro, bbarrows: BbArrows, bbvow: BbVow, bbkrishna: BbKrishna, bbtree: BbTree, bbleaf: BbLeaf, bbparadox: BbParadox, bbsacrifice: BbSacrifice, bbhill: BbHill, bbkhatu: BbKhatu,
};
