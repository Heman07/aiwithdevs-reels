import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";
import { Diya, Woman, Haveli } from "./Shots40";
import { GarudaFig } from "./Shots33";

/* Deepotsav: Dhanteras, Narak Chaturdashi, Diwali — warm devotional */
const W = 1080, H = 1920, GOLD = "#f2b544", FIRE = "#ff8a1a", SAFF = "#ff9a2a", CREAM = "#f1e2c2", BLUE = "#3a6ad0", NAGA = "#1e3a2a";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

/* Divine / royal figure. weapon: bow | chakra | lotus | flute | none */
export const Figure: React.FC<{ f: number; s?: number; skin?: string; cloth?: string; crown?: boolean; feather?: boolean; weapon?: string; aura?: number; fem?: boolean; drawBow?: number; lie?: boolean }> =
  ({ f, s = 1, skin = "#c8906a", cloth = "#e8b020", crown = true, feather, weapon = "none", aura = 0, fem, drawBow = 0, lie }) => (
  <g transform={`scale(${s}) ${lie ? "rotate(-80)" : ""}`}>
    {aura > 0 && <><circle cx={0} cy={-460} r={110} fill={GOLD} opacity={0.25 * aura} /><circle cx={0} cy={-460} r={80} fill="none" stroke={GOLD} strokeWidth={6} opacity={0.8 * aura} /></>}
    <path d={fem ? "M-90 0 L-50 -300 L50 -300 L90 0 Z" : "M-60 0 L-40 -230 L40 -230 L60 0 Z"} fill={cloth} />
    {fem && <path d="M-50 -300 L80 -60 L80 0 L40 0 L-10 -280 Z" fill={GOLD} opacity={0.8} />}
    {!fem && <path d="M-40 -230 L-46 -380 L46 -380 L40 -230 Z" fill={skin} />}
    {fem && <path d="M-46 -300 L46 -300 L40 -400 L-40 -400 Z" fill={cloth} />}
    {!fem && <path d="M-46 -380 L40 -240" stroke={GOLD} strokeWidth={8} />}
    <path d="M-44 -360 L44 -360" stroke={GOLD} strokeWidth={10} />
    <circle cx={0} cy={-450} r={44} fill={skin} />
    {fem ? <path d="M-48 -470 Q0 -525 48 -470 L58 -370 L42 -370 L40 -462 Q0 -488 -40 -462 L-42 -370 L-58 -370 Z" fill="#1a0a0a" /> : <path d="M-46 -466 Q0 -506 46 -466 Q0 -484 -46 -466 Z" fill="#1a0a0a" />}
    <path d="M-16 -450 L-6 -448 M16 -450 L6 -448" stroke="#1a0a0a" strokeWidth={3} />
    <path d="M-10 -426 Q0 -420 10 -426" stroke="#8a2a1a" strokeWidth={3} fill="none" />
    <path d="M-4 -470 L0 -458 L4 -470" fill="#c0101a" />
    {crown && <path d="M-44 -490 L-40 -540 L-20 -515 L0 -560 L20 -515 L40 -540 L44 -490 Z" fill={GOLD} stroke="#a87010" strokeWidth={3} />}
    {feather && <g transform="translate(26 -560) rotate(20)"><path d="M0 0 Q14 -40 0 -80 Q-14 -40 0 0 Z" fill="#1a7a4a" /><ellipse cx={0} cy={-52} rx={8} ry={12} fill="#1a3a9a" /><circle cx={0} cy={-52} r={4} fill={GOLD} /></g>}
    {/* arms */}
    {weapon === "bow" ? (
      <g>
        <path d={`M-40 -360 L${-150 - drawBow * 20} -380`} stroke={skin} strokeWidth={18} strokeLinecap="round" />
        <path d={`M-170 -520 Q${-100 + drawBow * 30} -380 -170 -240`} stroke="#8a5a2a" strokeWidth={10} fill="none" />
        <path d={`M-170 -520 L${-170 + 60 + drawBow * 110} -380 L-170 -240`} stroke="#eee" strokeWidth={2} fill="none" />
        <path d={`M40 -360 L${-60 + drawBow * 110} -380`} stroke={skin} strokeWidth={18} strokeLinecap="round" />
        {drawBow > 0 && <path d={`M${-60 + drawBow * 110} -380 L-260 -380`} stroke="#c8a060" strokeWidth={4} />}
      </g>
    ) : weapon === "chakra" ? (
      <g><path d="M40 -360 L120 -470" stroke={skin} strokeWidth={18} strokeLinecap="round" /><g transform={`translate(130 -500) rotate(${f * 12})`}><circle r={40} fill="none" stroke={GOLD} strokeWidth={8} />{Array.from({ length: 8 }).map((_, i) => <path key={i} transform={`rotate(${i * 45})`} d="M0 -40 L8 -58 L-8 -58 Z" fill={GOLD} />)}<circle r={60} fill={GOLD} opacity={0.2} /></g><path d="M-40 -360 L-80 -260" stroke={skin} strokeWidth={18} strokeLinecap="round" /></g>
    ) : weapon === "lotus" ? (
      <g><path d="M-40 -360 L-90 -300 L-40 -280" stroke={skin} strokeWidth={16} fill="none" strokeLinecap="round" /><path d="M40 -360 L90 -300 L60 -270" stroke={skin} strokeWidth={16} fill="none" strokeLinecap="round" />{Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={70} cy={-250 + ((f * 4 + i * 40) % 260)} r={10} fill={GOLD} stroke="#a87010" strokeWidth={2} />)}<g transform="translate(-60 -320)">{[-1, 0, 1].map((d) => <path key={d} d={`M0 0 Q${d * 24 - 14} -30 ${d * 18} -50 Q${d * 24 + 14} -30 0 0 Z`} fill="#f07aa0" />)}</g></g>
    ) : weapon === "flute" ? (
      <g><path d="M-40 -360 L20 -430 M40 -360 L60 -440" stroke={skin} strokeWidth={16} strokeLinecap="round" /><path d="M-40 -440 L120 -420" stroke="#8a5a2a" strokeWidth={10} /></g>
    ) : weapon === "lift" ? (
      <g><path d="M-40 -360 L-70 -250" stroke={skin} strokeWidth={18} strokeLinecap="round" /><path d="M40 -360 L58 -500 L60 -630" stroke={skin} strokeWidth={18} strokeLinecap="round" fill="none" /><path d="M60 -630 L60 -680" stroke={skin} strokeWidth={8} strokeLinecap="round" /></g>
    ) : weapon === "gada" ? (
      <g><path d="M-40 -360 L-70 -250" stroke={skin} strokeWidth={18} strokeLinecap="round" /><path d="M40 -360 L90 -290" stroke={skin} strokeWidth={18} strokeLinecap="round" /><path d="M86 -250 L110 -520" stroke="#8a6a2a" strokeWidth={12} /><circle cx={112} cy={-548} r={42} fill={GOLD} stroke="#a87010" strokeWidth={4} /><path d="M112 -590 L112 -606" stroke={GOLD} strokeWidth={10} /></g>
    ) : weapon === "pray" ? (
      <path d="M-40 -360 L-6 -300 L0 -340 M40 -360 L6 -300 L0 -340" stroke={skin} strokeWidth={16} strokeLinecap="round" fill="none" />
    ) : weapon === "thali" ? (
      <g><path d="M-40 -360 L30 -320 M40 -360 L90 -330" stroke={skin} strokeWidth={16} strokeLinecap="round" /><ellipse cx={110} cy={-326} rx={74} ry={16} fill={GOLD} stroke="#a87010" strokeWidth={3} /><circle cx={80} cy={-334} r={8} fill="#c0101a" /><path d="M120 -336 Q130 -330 140 -336 L136 -342 L124 -342 Z" fill="#b8541c" /><path d={`M130 -344 Q${126 + Math.sin(f / 3) * 3} -366 130 -380 Q${134 + Math.sin(f / 3) * 3} -366 130 -344`} fill="#ffcf3a" /><circle cx={130} cy={-360} r={26} fill="#ff9a2a" opacity={0.25} /></g>
    ) : (
      <path d="M-40 -360 L-70 -250 M40 -360 L70 -250" stroke={skin} strokeWidth={18} strokeLinecap="round" />
    )}
  </g>
);

export const Asura: React.FC<{ f: number; s?: number; dead?: boolean }> = ({ f, s = 1, dead }) => (
  <g transform={`scale(${s}) ${dead ? "rotate(80)" : ""}`}>
    <path d="M-110 0 L-80 -360 L80 -360 L110 0 Z" fill="#2a1a2a" />
    <path d="M-80 -360 L-120 -500 L120 -500 L80 -360 Z" fill="#3a2440" />
    <path d="M-120 -480 L-200 -340 M120 -480 L200 -340" stroke="#3a2440" strokeWidth={34} strokeLinecap="round" />
    <g transform="translate(200 -340)"><path d="M0 0 L0 -260" stroke="#8a8a90" strokeWidth={12} /><circle cy={-280} r={40} fill="#5a5a60" />{Array.from({ length: 8 }).map((_, i) => <path key={i} transform={`translate(0 -280) rotate(${i * 45})`} d="M0 -40 L6 -58 L-6 -58 Z" fill="#8a8a90" />)}</g>
    <circle cx={0} cy={-570} r={64} fill="#4a2a4a" />
    <path d="M-60 -620 L-50 -700 L-24 -650 L0 -720 L24 -650 L50 -700 L60 -620 Z" fill="#8a6a2a" />
    <path d="M-40 -590 L-12 -580 M40 -590 L12 -580" stroke="#000" strokeWidth={8} />
    <ellipse cx={-26} cy={-574} rx={10} ry={7} fill="#ff3a1a" /><ellipse cx={26} cy={-574} rx={10} ry={7} fill="#ff3a1a" />
    <path d="M-44 -540 Q0 -560 44 -540 Q30 -520 0 -526 Q-30 -520 -44 -540 Z" fill="#1a0a0a" />
    <path d="M-20 -530 L-16 -510 L-12 -530 M12 -530 L16 -510 L20 -530" fill="#eee" />
  </g>
);

export const Snake: React.FC<{ f: number; s?: number; daze?: number }> = ({ f, s = 1, daze = 0 }) => (
  <g transform={`scale(${s})`}>
    <path d={`M-200 40 C-120 ${-20 + Math.sin(f / 8) * 20} -40 ${80 - Math.sin(f / 8) * 20} 40 20 C90 -20 80 -100 40 -140`} stroke={NAGA} strokeWidth={34} fill="none" strokeLinecap="round" />
    <g transform="translate(40 -170)">
      <path d="M-30 -10 C-70 10 -60 80 -20 100 L20 100 C60 80 70 10 30 -10 Z" fill={NAGA} />
      <ellipse rx={26} ry={30} fill="#2a4a36" />
      <ellipse cx={-10} cy={-4} rx={6} ry={daze > 0.5 ? 2 : 5} fill="#ffcf3a" /><ellipse cx={10} cy={-4} rx={6} ry={daze > 0.5 ? 2 : 5} fill="#ffcf3a" />
      <path d={`M0 28 L0 ${40 + Math.abs(Math.sin(f / 3)) * 10} l-6 10 M0 ${40 + Math.abs(Math.sin(f / 3)) * 10} l6 10`} stroke="#c0101a" strokeWidth={3} />
    </g>
  </g>
);

export const Palace: React.FC<{ f: number; id: string; night?: boolean }> = ({ f, id, night = true }) => (
  <>
    <Sky top={night ? "#0e1240" : "#f0c080"} bottom={night ? "#3a1a3a" : "#f8e0b0"} id={id} />
    {night && Array.from({ length: 40 }).map((_, i) => <circle key={i} cx={random(`ps${i}`) * W} cy={random(`pt${i}`) * 700} r={1.6} fill="#fff" opacity={0.5} />)}
    {[180, 900].map((x, i) => <g key={i}><rect x={x - 40} y={300} width={80} height={850} fill="#5a3020" /><path d={`M${x - 70} 300 L${x + 70} 300 L${x} 220 Z`} fill="#8a4020" /></g>)}
    <path d="M140 300 Q540 120 940 300" stroke="#8a4020" strokeWidth={40} fill="none" />
    <rect y={1150} width={W} height={H} fill="#3a2014" />
    {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M${i * 90} 1150 l45 40 l45 -40`} fill="none" stroke="#a8541c" strokeWidth={4} />)}
  </>
);

/* ---------- DHANTERAS ---------- */
const DhBuy: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#2a1408" />
    <circle cx={540} cy={800} r={520} fill={GOLD} opacity={0.12 + Math.sin(f / 8) * 0.03} />
    <ellipse cx={540} cy={1060} rx={420} ry={70} fill="#5a3014" />
    <g transform="translate(360 960)"><path d="M-110 -60 Q-120 60 0 80 Q120 60 110 -60 Z" fill="#d8d8e0" stroke="#8a8a90" strokeWidth={4} /><ellipse cy={-60} rx={110} ry={24} fill="#eaeaf0" /></g>
    <g transform="translate(720 960)"><path d="M-70 -120 Q-100 0 -60 60 L60 60 Q100 0 70 -120 Z" fill="#c8862a" /><ellipse cy={-120} rx={70} ry={16} fill="#e8a64a" /><path d="M-30 -150 L30 -150 L20 -120 L-20 -120 Z" fill="#c8862a" /></g>
    {Array.from({ length: 18 }).map((_, i) => <ellipse key={i} cx={460 + (i % 6) * 32 + (i > 11 ? 16 : 0)} cy={1030 - Math.floor(i / 6) * 14} rx={22} ry={8} fill={GOLD} stroke="#a87010" strokeWidth={2} />)}
    {[200, 880].map((x, i) => <Diya key={i} x={x} y={1080} f={f} i={i} s={1.6} />)}
    {Array.from({ length: 16 }).map((_, i) => <circle key={i} cx={random(`gp${i}`) * W} cy={(random(`gq${i}`) * 900 + f * 2) % 1000} r={4} fill={GOLD} opacity={0.6} />)}
  </svg>
);

const DhProphecy: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Palace f={f} id="dh1" />
    <circle cx={540} cy={760} r={300} fill={FIRE} opacity={0.08} />
    <g transform="translate(330 1150)"><Figure f={f} cloth="#8a1a3a" s={0.95} /></g>
    <g transform="translate(760 1150)"><Figure f={f} cloth="#f4f0e8" crown={false} s={0.9} /><rect x={-150} y={-380} width={110} height={80} fill={CREAM} stroke="#8a5a2a" strokeWidth={3} /><circle cx={-95} cy={-340} r={26} fill="none" stroke="#c0101a" strokeWidth={3} /></g>
    <g transform="translate(540 560) scale(0.8)" opacity={0.25 + Math.sin(f / 6) * 0.15}><Snake f={f} /></g>
  </svg>
);

const DhWife: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#1a0c08" />
    <circle cx={540} cy={820} r={460} fill={FIRE} opacity={0.12 + Math.sin(f / 4) * 0.03} />
    <rect x={160} y={980} width={760} height={80} fill="#7a2a1a" />
    <g transform="translate(700 1000)"><ellipse cx={0} cy={-30} rx={170} ry={40} fill="#e8dcc8" /><circle cx={-130} cy={-60} r={34} fill="#c8906a" /><path d="M-160 -80 Q-130 -110 -100 -80" fill="#1a0a0a" /></g>
    <g transform="translate(360 1150) scale(1.05)"><Woman f={f} pose="kneel" /></g>
    {Array.from({ length: 6 }).map((_, i) => <Diya key={i} x={140 + i * 160} y={1150} f={f} i={i} s={1.1} />)}
  </svg>
);

const DhGold: React.FC<ShotProps> = ({ f, dur }) => {
  const n = Math.floor(clamp(f / (dur * 0.7)) * 40);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#1a0c06" />
      <rect x={340} y={360} width={400} height={790} fill="#4a2410" stroke="#2a1006" strokeWidth={14} />
      <circle cx={540} cy={980} r={420} fill={GOLD} opacity={0.15} />
      <path d="M380 1150 Q540 900 700 1150 Z" fill="#c8901a" />
      {Array.from({ length: n }).map((_, i) => <ellipse key={i} cx={420 + random(`gx${i}`) * 240} cy={1140 - random(`gy${i}`) * (200 - Math.abs(random(`gx${i}`) - 0.5) * 300)} rx={18} ry={7} fill={i % 4 ? GOLD : "#e8e8f0"} stroke="#a87010" strokeWidth={2} />)}
      {[[480, 1010], [600, 1040]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r={30} fill="none" stroke={GOLD} strokeWidth={8} /><circle cx={x} cy={y - 30} r={8} fill="#c0101a" /></g>)}
      {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI; return <Diya key={i} x={540 - Math.cos(a) * 420} y={1150 - Math.sin(a) * 160} f={f} i={i} s={0.9} />; })}
    </svg>
  );
};

const DhSnake: React.FC<ShotProps> = ({ f, dur }) => {
  const daze = clamp((f - dur * 0.4) / 20);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0604" />
      <circle cx={540} cy={1000} r={460} fill={GOLD} opacity={0.18 + daze * 0.15} />
      <path d="M380 1150 Q540 900 700 1150 Z" fill="#c8901a" />
      {Array.from({ length: 30 }).map((_, i) => <ellipse key={i} cx={420 + random(`hx${i}`) * 240} cy={1130 - random(`hy${i}`) * 120} rx={18} ry={7} fill={GOLD} stroke="#a87010" strokeWidth={2} />)}
      <g transform={`translate(${900 - Math.min(f, 40) * 6} 1080) scale(1.4)`}><Snake f={f} daze={daze} /></g>
      {daze > 0 && Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2 + f / 20; return <path key={i} d={`M540 980 L${540 + Math.cos(a) * 600} ${980 + Math.sin(a) * 600}`} stroke="#fff4c0" strokeWidth={8} opacity={0.12 * daze} />; })}
      {[160, 920].map((x, i) => <Diya key={i} x={x} y={1150} f={f} i={i} s={1.4} />)}
    </svg>
  );
};

const DhDawn: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <Sky top={`rgb(${40 + t * 200},${30 + t * 140},${80 + t * 60})`} bottom={`rgb(${120 + t * 130},${60 + t * 120},${40 + t * 60})`} id="dh2" />
      <circle cx={540} cy={1100 - t * 400} r={120} fill="#ffcf7a" opacity={t} />
      <rect y={1150} width={W} height={H} fill="#3a2014" />
      <Haveli x={540} s={1.1} />
      <g transform={`translate(${700 + t * 500} 1180) scale(0.9)`} opacity={1 - t}><Snake f={f} /></g>
      <g transform="translate(200 1160) scale(0.8)"><Woman f={f} pose="pray" /></g>
    </svg>
  );
};

const DhManthan: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#0a2a5a" bottom="#3a6a9a" id="dh3" />
    <rect y={1000} width={W} height={H} fill="#0a3a5a" />
    {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M0 ${1020 + i * 40} Q270 ${1000 + i * 40 + Math.sin(f / 5 + i) * 20} 540 ${1020 + i * 40} T1080 ${1020 + i * 40}`} stroke="#5a9aca" strokeWidth={4} fill="none" opacity={0.5} />)}
    <path d="M440 1100 L500 520 L580 520 L640 1100 Z" fill="#6a5a4a" />
    <path d={`M120 ${760 + Math.sin(f / 3) * 30} Q540 ${640 - Math.sin(f / 3) * 30} 960 ${760 + Math.sin(f / 3) * 30}`} stroke={NAGA} strokeWidth={40} fill="none" />
    <path d={`M120 ${860 - Math.sin(f / 3) * 30} Q540 ${960 + Math.sin(f / 3) * 30} 960 ${860 - Math.sin(f / 3) * 30}`} stroke={NAGA} strokeWidth={40} fill="none" />
    <g transform="translate(540 440)"><circle r={130} fill={GOLD} opacity={0.25 + Math.sin(f / 5) * 0.08} /><path d="M-30 50 Q-50 -10 -20 -30 L20 -30 Q50 -10 30 50 Z" fill={GOLD} stroke="#a87010" strokeWidth={4} /><path d="M-24 -30 L-16 -60 L16 -60 L24 -30" fill={GOLD} /></g>
    <g transform="translate(540 980) scale(0.7)"><Figure f={f} cloth={SAFF} aura={0.9} weapon="none" s={1} skin="#c8906a" /></g>
  </svg>
);

/* ---------- NARAK CHATURDASHI ---------- */
const Fortress: React.FC<{ f: number; id: string }> = ({ f, id }) => (
  <>
    <Sky top="#1a0a2a" bottom="#4a1a2a" id={id} />
    {(f % 50) < 3 && <rect width={W} height={H} fill="#dfe6ff" opacity={0.15} />}
    <path d="M0 1150 L0 700 L100 700 L100 640 L180 640 L180 700 L300 700 L300 560 L400 560 L400 700 L680 700 L680 560 L780 560 L780 700 L900 700 L900 640 L980 640 L980 700 L1080 700 L1080 1150 Z" fill="#14081a" />
    <rect y={1150} width={W} height={H} fill="#0e0612" />
  </>
);

const NkDemon: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Fortress f={f} id="nk1" />
    <circle cx={540} cy={760} r={420} fill="#c0101a" opacity={0.1} />
    <g transform="translate(540 1150) scale(1.1)"><Asura f={f} /></g>
  </svg>
);

const NkPrison: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0608" />
    {Array.from({ length: 6 }).map((_, i) => <g key={i} transform={`translate(${160 + i * 150} 1150) scale(0.55)`}><Woman f={f + i * 7} pose="cry" saree={["#8a2a4a", "#2a5a8a", "#6a2a8a", "#8a5a1a", "#1a6a5a", "#8a1a2a"][i]} /></g>)}
    {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={70 + i * 85} y={500} width={16} height={650} fill="#3a3a40" />)}
    <rect x={60} y={490} width={960} height={24} fill="#3a3a40" />
    <g transform="translate(540 380)" opacity={0.85}><circle cx={-40} r={30} fill="none" stroke={GOLD} strokeWidth={10} /><circle cx={40} r={30} fill="none" stroke={GOLD} strokeWidth={10} /><text y={110} textAnchor="middle" fontFamily="Rozha" fontSize={60} fill={GOLD}>16,000</text></g>
  </svg>
);

const NkGaruda: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a3a7a" bottom="#f0a06a" id="nk2" />
    {Array.from({ length: 6 }).map((_, i) => <ellipse key={i} cx={((i * 260 - f * 6) % 1500 + 1500) % 1500 - 200} cy={300 + (i % 3) * 300} rx={260} ry={50} fill="#fff" opacity={0.3} />)}
    <g transform={`translate(540 ${1000 + Math.sin(f / 8) * 20}) scale(0.75)`}>
      <GarudaFig f={f} glow={0.5} />
      <g transform="translate(-60 -540) scale(0.55)"><Figure f={f} skin={BLUE} cloth="#f0c020" feather weapon="chakra" /></g>
      <g transform="translate(70 -540) scale(0.5)"><Figure f={f} fem cloth="#c0281a" weapon="bow" /></g>
    </g>
  </svg>
);

const NkBattle: React.FC<ShotProps> = ({ f, dur }) => {
  const faint = f > dur * 0.55;
  return (
    <svg width={W} height={H}>
      <Fortress f={f} id="nk3" />
      <g transform="translate(800 1150) scale(0.85)"><Asura f={f} /></g>
      <g transform={`translate(300 1150) scale(0.8) ${faint ? "rotate(-60)" : ""}`}><Figure f={f} skin={BLUE} cloth="#f0c020" feather weapon={faint ? "none" : "chakra"} /></g>
      {Array.from({ length: 6 }).map((_, i) => { const t = ((f + i * 7) % 24) / 24; return <path key={i} d={`M${700 - t * 400} ${700 + i * 40} l-60 0`} stroke="#c8a060" strokeWidth={5} />; })}
      {faint && <circle cx={300} cy={800} r={200} fill="#fff" opacity={0.06} />}
    </svg>
  );
};

const NkSatya: React.FC<ShotProps> = ({ f, dur }) => {
  const draw = clamp(f / (dur * 0.5));
  const shot = f > dur * 0.55;
  return (
    <svg width={W} height={H}>
      <Fortress f={f} id="nk4" />
      <circle cx={340} cy={760} r={380} fill={GOLD} opacity={0.12 + draw * 0.1} />
      <g transform="translate(400 1150) scale(1.05) scale(-1 1)"><Figure f={f} fem cloth="#c0281a" weapon="bow" drawBow={shot ? 0 : draw} aura={draw} /></g>
      {shot && <path d={`M${560 + (f - dur * 0.55) * 30} 770 l-80 0`} stroke={GOLD} strokeWidth={8} />}
      <g transform="translate(860 1150) scale(0.75)" opacity={shot ? Math.max(0, 1 - (f - dur * 0.6) / 20) : 1}><Asura f={f} dead={f > dur * 0.7} /></g>
    </svg>
  );
};

const NkReveal: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#0a1a3a" bottom="#2a4a3a" id="nk5" />
    <circle cx={540} cy={1500} r={700} fill="#2a6a3a" />
    <circle cx={540} cy={1500} r={700} fill="none" stroke={GOLD} strokeWidth={6} opacity={0.5} />
    <circle cx={540} cy={640} r={360} fill={GOLD} opacity={0.12 + Math.sin(f / 8) * 0.04} />
    <g transform="translate(540 1050) scale(1.05)"><Figure f={f} fem cloth="#2a8a3a" weapon="lotus" aura={1} /></g>
  </svg>
);

const NkLights: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#0a0a2a" bottom="#3a1a3a" id="nk6" />
    {Array.from({ length: 50 }).map((_, i) => <circle key={i} cx={random(`ls${i}`) * W} cy={random(`lt${i}`) * 800} r={1.6} fill="#fff" opacity={0.5} />)}
    <Haveli x={540} s={1.2} />
    {Array.from({ length: 10 }).map((_, i) => <Diya key={i} x={90 + i * 100} y={1160} f={f} i={i} s={1.1} />)}
    {Array.from({ length: 8 }).map((_, i) => <Diya key={i + 10} x={340 + i * 58} y={790} f={f} i={i + 10} s={0.7} />)}
  </svg>
);

/* ---------- DIWALI ---------- */
const DwDark: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp((f - dur * 0.5) / (dur * 0.4));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#020208" />
      {Array.from({ length: 60 }).map((_, i) => <circle key={i} cx={random(`ds${i}`) * W} cy={random(`dt${i}`) * 1100} r={1.5} fill="#fff" opacity={0.4} />)}
      <circle cx={540} cy={520} r={130} fill="#0a0a14" stroke="#2a2a3a" strokeWidth={3} />
      <text x={540} y={760} textAnchor="middle" fontFamily="Rozha" fontSize={60} fill="#8a8aa0" opacity={0.7}>अमावस्या</text>
      {t > 0 && <g opacity={t}><Diya x={540} y={1100} f={f} s={3} /><circle cx={540} cy={1000} r={400 * t} fill={GOLD} opacity={0.1} /></g>}
    </svg>
  );
};

export const Forest: React.FC<{ f: number; id: string }> = ({ f, id }) => (
  <>
    <Sky top="#2a4a2a" bottom="#9ab07a" id={id} />
    {Array.from({ length: 9 }).map((_, i) => <g key={i} transform={`translate(${i * 130 + 10} 1150)`}><rect x={-16} y={-380} width={32} height={380} fill="#4a2a1a" /><circle cx={0} cy={-440 - (i % 3) * 40} r={120} fill={["#1a4a1a", "#2a5a1a", "#2a4a2a"][i % 3]} /></g>)}
    <rect y={1150} width={W} height={H} fill="#5a4020" />
  </>
);

const DwExile: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Forest f={f} id="dw1" />
    <g transform={`translate(${380 + Math.min(f, 60)} 1160) scale(0.85)`}><Figure f={f} skin={BLUE} cloth="#c8a040" crown={false} weapon="bow" /></g>
    <g transform={`translate(${560 + Math.min(f, 60)} 1160) scale(0.8)`}><Woman f={f} saree="#e8a020" /></g>
    <g transform={`translate(${200 + Math.min(f, 60)} 1160) scale(0.8)`}><Figure f={f} cloth="#c8a040" crown={false} weapon="bow" /></g>
  </svg>
);

const DwLanka: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a0a0a" bottom="#8a2a0a" id="dw2" />
    {(f % 30) < 3 && <rect width={W} height={H} fill="#fff" opacity={0.12} />}
    <path d="M500 1150 L500 600 L560 520 L620 600 L620 1150 Z M300 1150 L300 760 L380 700 L460 760 L460 1150 Z M660 1150 L660 720 L740 660 L820 720 L820 1150 Z" fill="#c8901a" />
    {Array.from({ length: 16 }).map((_, i) => <path key={i} d={`M${300 + i * 34} 1150 Q${310 + i * 34 + Math.sin(f / 2 + i) * 20} ${700 - (i % 4) * 80} ${320 + i * 34} 1150 Z`} fill={i % 2 ? FIRE : "#ffcf3a"} opacity={0.6} />)}
    <rect y={1150} width={W} height={H} fill="#1a0806" />
    {Array.from({ length: 5 }).map((_, i) => { const t = ((f + i * 8) % 30) / 30; return <path key={i} d={`M${100 + t * 800} ${400 + i * 60 + t * 200} l60 20`} stroke={GOLD} strokeWidth={6} />; })}
  </svg>
);

export const Pushpak: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <path d="M-260 0 Q0 60 260 0 L220 -40 L-220 -40 Z" fill={GOLD} stroke="#a87010" strokeWidth={4} />
    <path d="M-160 -40 L-160 -160 Q0 -260 160 -160 L160 -40 Z" fill="#e8c060" stroke="#a87010" strokeWidth={4} />
    <path d="M-40 -230 L0 -320 L40 -230 Z" fill={GOLD} />
    {[-1, 1].map((d) => <path key={d} d={`M${d * 260} 0 Q${d * 380} ${-60 + Math.sin(f / 4) * 20} ${d * 420} -120`} stroke="#fff4c0" strokeWidth={14} fill="none" opacity={0.7} />)}
    {[-90, 0, 90].map((x, i) => <g key={i} transform={`translate(${x} -60) scale(0.3)`}><circle cy={-200} r={60} fill={i === 1 ? "#e8a020" : i === 0 ? BLUE : "#c8906a"} /><path d="M-50 -280 L-40 -330 L0 -300 L40 -330 L50 -280 Z" fill={GOLD} /></g>)}
  </g>
);

const DwPushpak: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#06061a" />
      {Array.from({ length: 70 }).map((_, i) => <circle key={i} cx={random(`pk${i}`) * W} cy={random(`pl${i}`) * 1100} r={1.5} fill="#fff" opacity={0.5} />)}
      <g transform={`translate(${-200 + t * 900} ${700 - t * 120}) scale(${0.7 + t * 0.4})`}><circle r={300} fill={GOLD} opacity={0.12} /><Pushpak f={f} /></g>
      <path d="M0 1150 L1080 1150 V1920 H0 Z" fill="#0a0612" />
      {Array.from({ length: 10 }).map((_, i) => <rect key={i} x={i * 110} y={1150 - 80 - (i % 3) * 40} width={90} height={80 + (i % 3) * 40} fill="#14101a" />)}
    </svg>
  );
};

const DwAyodhya: React.FC<ShotProps> = ({ f, dur }) => {
  const lit = clamp(f / (dur * 0.6));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#06061a" />
      <circle cx={540} cy={900} r={700 * lit} fill={GOLD} opacity={0.12} />
      {Array.from({ length: 7 }).map((_, i) => { const x = 80 + i * 150, h = 260 + (i % 3) * 120; return <g key={i}><rect x={x - 60} y={1150 - h} width={120} height={h} fill="#3a2414" /><path d={`M${x - 70} ${1150 - h} L${x} ${1150 - h - 80} L${x + 70} ${1150 - h} Z`} fill="#5a3014" />{Array.from({ length: Math.floor(h / 60) }).map((_, k) => <Diya key={k} x={x} y={1150 - h + 50 + k * 60} f={f} i={i * 10 + k} s={0.5 * (k / (h / 60) < lit ? 1 : 0.001)} />)}</g>; })}
      <rect y={1150} width={W} height={H} fill="#1a0e08" />
      {Array.from({ length: 12 }).map((_, i) => i / 12 < lit ? <Diya key={i} x={60 + i * 88} y={1160} f={f} i={i} s={1} /> : null)}
      {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={random(`fw${i}`) * W} cy={200 + random(`fv${i}`) * 400} r={3 + ((f + i * 10) % 30)} fill="none" stroke={["#ffcf3a", "#ff7aa0", "#7ad8ff"][i % 3]} strokeWidth={3} opacity={lit * (1 - ((f + i * 10) % 30) / 30)} />)}
    </svg>
  );
};

const DwLakshmi: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#3a0a2a" bottom="#0a3a5a" id="dw3" />
    <rect y={1050} width={W} height={H} fill="#0a3a5a" />
    {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M0 ${1070 + i * 30} Q540 ${1060 + i * 30 + Math.sin(f / 6 + i) * 10} 1080 ${1070 + i * 30}`} stroke="#5a9aca" strokeWidth={3} fill="none" opacity={0.5} />)}
    <circle cx={540} cy={700} r={420} fill={GOLD} opacity={0.15 + Math.sin(f / 8) * 0.04} />
    {Array.from({ length: 16 }).map((_, i) => { const a = (i / 16) * Math.PI * 2 + f / 100; return <path key={i} d={`M540 700 L${540 + Math.cos(a) * 700} ${700 + Math.sin(a) * 700}`} stroke="#fff4c0" strokeWidth={6} opacity={0.06} />; })}
    <g transform="translate(540 1080)">{Array.from({ length: 9 }).map((_, i) => { const a = -Math.PI + (i / 8) * Math.PI; return <path key={i} d={`M0 0 Q${Math.cos(a) * 140 - 30} ${Math.sin(a) * 80 - 20} ${Math.cos(a) * 200} ${Math.sin(a) * 100} Q${Math.cos(a) * 140 + 30} ${Math.sin(a) * 80 + 20} 0 0 Z`} fill={i % 2 ? "#f07aa0" : "#f8a0c0"} stroke="#c04a7a" strokeWidth={2} />; })}</g>
    <g transform="translate(540 1050) scale(1.0)"><Figure f={f} fem cloth="#c0101a" weapon="lotus" aura={1} /></g>
  </svg>
);

export const Rangoli: React.FC<{ f: number; s?: number }> = ({ f, s = 1 }) => (
  <g transform={`scale(${s}) rotate(${f * 0.3})`}>
    {Array.from({ length: 8 }).map((_, i) => <path key={i} transform={`rotate(${i * 45})`} d="M0 0 Q40 -60 0 -140 Q-40 -60 0 0 Z" fill={["#e83a5a", "#ffcf3a", "#2aa86a", "#3a7ad8"][i % 4]} />)}
    {Array.from({ length: 8 }).map((_, i) => <circle key={i} transform={`rotate(${i * 45 + 22})`} cy={-110} r={16} fill="#fff" />)}
    <circle r={40} fill={SAFF} /><circle r={18} fill="#fff" />
  </g>
);

const DwHome: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#140a10" />
    <circle cx={540} cy={800} r={520} fill={GOLD} opacity={0.1} />
    <rect x={300} y={300} width={480} height={850} fill="#5a2a10" stroke="#3a1a08" strokeWidth={14} />
    {[480, 820].map((y) => <rect key={y} x={350} y={y - 120} width={380} height={260} fill="none" stroke="#3a1a08" strokeWidth={8} />)}
    <path d="M280 300 Q540 200 800 300" stroke="#ffb43a" strokeWidth={16} fill="none" />
    {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={300 + i * 44} cy={300 - Math.sin((i / 11) * Math.PI) * 90 + 20} r={12} fill={i % 2 ? "#ff7a1a" : "#ffcf3a"} />)}
    {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M${310 + i * 55} 310 l0 ${60 + (i % 2) * 30}`} stroke="#2aa86a" strokeWidth={10} />)}
    <rect y={1150} width={W} height={H} fill="#2a1a10" />
    <g transform="translate(540 1060)"><Rangoli f={f} s={0.9} /></g>
    {[200, 880, 120, 960].map((x, i) => <Diya key={i} x={x} y={1150 - (i > 1 ? 0 : 0)} f={f} i={i} s={1.3} />)}
  </svg>
);

export const SHOTS41: Record<string, React.FC<ShotProps>> = {
  dhbuy: DhBuy, dhprophecy: DhProphecy, dhwife: DhWife, dhgold: DhGold, dhsnake: DhSnake, dhdawn: DhDawn, dhmanthan: DhManthan,
  nkdemon: NkDemon, nkprison: NkPrison, nkgaruda: NkGaruda, nkbattle: NkBattle, nksatya: NkSatya, nkreveal: NkReveal, nklights: NkLights,
  dwdark: DwDark, dwexile: DwExile, dwlanka: DwLanka, dwpushpak: DwPushpak, dwayodhya: DwAyodhya, dwlakshmi: DwLakshmi, dwhome: DwHome,
};
