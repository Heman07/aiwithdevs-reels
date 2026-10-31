import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #11 — Werewolf */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", RIM = "#9ab8c8";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const Wolf: React.FC<{ f: number; howl?: boolean; run?: boolean; eye?: string; fill?: string; upright?: number }> = ({ f, howl, run, eye = "#ffcf3a", fill = INK, upright = 0 }) => {
  const st = { stroke: RIM, strokeOpacity: 0.6, strokeWidth: 4 } as const;
  const leg = run ? Math.sin(f / 3) : 0;
  return (
    <g transform={`rotate(${-upright * 60})`}>
      <path d={`M240 -20 C320 -10 360 ${40 + Math.sin(f / 8) * 20} 400 ${100 + Math.sin(f / 8) * 20} C340 70 290 40 230 30 Z`} fill={fill} {...st} />
      {[[-150, leg], [-90, -leg], [150, -leg], [210, leg]].map(([x, l], i) => <path key={i} d={`M${x} 40 L${x - 20 + l * 50} 230 L${x + 10 + l * 50} 240 L${x + 30} 40 Z`} fill={fill} {...st} />)}
      <path d="M-200 -60 C-120 -150 160 -140 250 -40 C270 20 220 70 150 70 L-140 70 C-220 60 -240 0 -200 -60 Z" fill={fill} {...st} />
      {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${-160 + i * 45} -108 l8 -14 l10 14 Z`} fill={fill} />)}
      <g transform={`rotate(${howl ? -45 : 0} -200 -60)`}>
        <path d="M-180 -40 C-220 -120 -260 -170 -300 -180 L-420 -150 L-430 -120 L-330 -100 C-300 -60 -250 -20 -200 20 Z" fill={fill} {...st} />
        <path d="M-280 -175 L-270 -240 L-240 -180 Z M-320 -170 L-322 -230 L-296 -176 Z" fill={fill} {...st} />
        <circle cx={-320} cy={-150} r={8} fill={eye} /><circle cx={-320} cy={-150} r={24} fill={eye} opacity={0.2} />
        {!howl && Array.from({ length: 4 }).map((_, i) => <path key={i} d={`M${-410 + i * 22} -122 l6 14 l6 -14`} fill="#e8e2d0" />)}
      </g>
    </g>
  );
};

const WMoon: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a2430" bottom="#030406" id="w1" />
    <Moon x={540} y={560} r={220} f={f} />
    <path d="M0 1050 L200 900 L380 980 L540 820 L720 960 L900 880 L1080 980 V1920 H0 Z" fill="#050709" />
    <g transform="translate(540 820) scale(0.6)"><Wolf f={f} howl /></g>
    {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M${i * 130} 1920 L${i * 130 + 20} ${1150 + (i % 3) * 60} L${i * 130 + 60} 1920 Z`} fill="#020304" />)}
  </svg>
);

const Robed: React.FC<{ fill?: string; crown?: boolean; arm?: number }> = ({ fill = INK, crown, arm = 0 }) => (
  <g>
    <path d="M-80 0 L-60 -280 Q0 -330 60 -280 L80 0 Z" fill={fill} stroke="#c8a060" strokeOpacity={0.5} strokeWidth={3} />
    <circle cx={0} cy={-320} r={44} fill={fill} stroke="#c8a060" strokeOpacity={0.5} strokeWidth={3} />
    {crown && <path d="M-36 -356 L-30 -390 L-12 -364 L0 -396 L12 -364 L30 -390 L36 -356 Z" fill="#e0b040" />}
    <path d={`M50 -240 L${150} ${-200 - arm * 100}`} stroke={fill} strokeWidth={24} strokeLinecap="round" />
  </g>
);

const WFeast: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0c0604" />
    {[120, 380, 700, 960].map((x, i) => <rect key={i} x={x - 30} y={300} width={60} height={900} fill="#1a100a" stroke="#4a3020" strokeWidth={4} />)}
    <circle cx={540} cy={900} r={420} fill="#ffb43a" opacity={0.12 + 0.04 * Math.sin(f / 3)} />
    <path d="M120 1180 L960 1180 L980 1240 L100 1240 Z" fill="#2a1a0c" />
    <g transform="translate(260 1180)"><Robed crown /></g>
    <g transform="translate(830 1180) scale(1.2)"><Robed fill="#0a0a14" /><circle cx={0} cy={-320} r={70} fill="#e8e0ff" opacity={0.15} /></g>
    <g transform="translate(540 1150)"><ellipse cx={0} cy={0} rx={130} ry={30} fill="#c8b890" /><path d="M-90 -10 Q0 -90 90 -10 Z" fill="#c8b890" stroke="#8a7a5a" strokeWidth={3} /><ellipse cx={0} cy={0} rx={120} ry={16} fill={BLOOD} opacity={0.6} /></g>
    {[400, 680].map((x, i) => <g key={i}><rect x={x - 6} y={1080} width={12} height={70} fill="#e8d8b0" /><path d={`M${x - 8} 1080 Q${x} ${1050 - Math.sin(f / 3 + i) * 8} ${x + 8} 1080 Z`} fill="#ffb43a" /></g>)}
  </svg>
);

const Zeus: React.FC<ShotProps> = ({ f }) => {
  const tip = clamp(f / 10);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#06060c" />
      <g transform="translate(540 1200) scale(2.2)" opacity={0.85}><Robed fill="#0a0a18" arm={1} /></g>
      <path d="M700 0 L620 400 L700 420 L560 860 L660 880 L480 1300" stroke="#e8f0ff" strokeWidth={14} fill="none" opacity={(f % 12) < 4 ? 1 : 0.3} />
      <path d="M700 0 L620 400 L700 420 L560 860 L660 880 L480 1300" stroke="#9ab8ff" strokeWidth={40} fill="none" opacity={0.2} />
      <g transform={`translate(540 1300) rotate(${tip * 70})`}><rect x={-300} y={-20} width={600} height={40} fill="#2a1a0c" /><rect x={-260} y={20} width={20} height={120} fill="#2a1a0c" /><rect x={240} y={20} width={20} height={120} fill="#2a1a0c" /></g>
      {Array.from({ length: 14 }).map((_, i) => <rect key={i} x={540 + (random(`zd${i}`) - 0.5) * 600 * tip} y={1200 - random(`ze${i}`) * 300 * tip + f * 4} width={20} height={14} fill="#c8b890" transform={`rotate(${f * 6 + i * 40} ${540} 1200)`} opacity={0.7} />)}
    </svg>
  );
};

const WChange: React.FC<ShotProps> = ({ f, dur }) => {
  const p = clamp(f / (dur * 0.8));
  return (
    <svg width={W} height={H}>
      <Sky top="#1a2028" bottom="#030405" id="w2" />
      <Moon x={760} y={380} r={110} f={f} />
      <path d="M0 1200 Q540 1130 1080 1200 V1920 H0 Z" fill="#05070a" />
      <g transform="translate(480 1150)" opacity={1 - p}><Robed crown /></g>
      <g transform={`translate(560 ${1150 - (1 - p) * 120}) scale(${0.4 + 0.6 * p})`} opacity={p}><Wolf f={f} upright={1 - p} eye={BLOOD} /></g>
      {Array.from({ length: 30 }).map((_, i) => <path key={i} d="M0 0 l4 -18 l4 18 Z" fill="#2a2a2a" transform={`translate(${480 + (random(`wf${i}`) - 0.5) * 300} ${1000 + (random(`wg${i}`) - 0.5) * 300 - p * 60}) rotate(${random(`wh${i}`) * 360})`} opacity={Math.sin(p * Math.PI)} />)}
    </svg>
  );
};

const Village16: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a2420" bottom="#060504" id="w3" />
    <path d="M0 1150 Q540 1090 1080 1150 V1920 H0 Z" fill="#0a0806" />
    {[[60, 300], [380, 340], [720, 300]].map(([x, h], i) => (
      <g key={i}>
        <rect x={x} y={1150 - h} width={280} height={h} fill="#c8b890" opacity={0.25} />
        {[0, 1, 2, 3].map((k) => <line key={k} x1={x + k * 93} y1={1150 - h} x2={x + k * 93} y2={1150} stroke="#2a1a0c" strokeWidth={10} />)}
        <line x1={x} y1={1150 - h / 2} x2={x + 280} y2={1150 - h / 2} stroke="#2a1a0c" strokeWidth={10} />
        <path d={`M${x} ${1150 - h} L${x + 280} ${1150} M${x + 280} ${1150 - h} L${x} ${1150}`} stroke="#2a1a0c" strokeWidth={6} opacity={0.6} />
        <path d={`M${x - 20} ${1150 - h} L${x + 140} ${1150 - h - 180} L${x + 300} ${1150 - h} Z`} fill="#1a0e08" />
      </g>
    ))}
    <g transform="translate(540 1340)"><rect x={-6} y={-300} width={12} height={300} fill={INK} /><circle cx={0} cy={-300} r={90} fill="none" stroke={INK} strokeWidth={10} />{Array.from({ length: 8 }).map((_, i) => <line key={i} x1={0} y1={-300} x2={Math.cos(i * 0.785) * 90} y2={-300 + Math.sin(i * 0.785) * 90} stroke={INK} strokeWidth={6} />)}</g>
    {Array.from({ length: 10 }).map((_, i) => <g key={i} transform={`translate(${120 + i * 90} 1480)`}><path d="M-20 0 L-14 -100 Q0 -116 14 -100 L20 0 Z" fill={INK} /><circle cx={0} cy={-116} r={13} fill={INK} /></g>)}
  </svg>
);

const Belt: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#080404" />
    <circle cx={540} cy={860} r={380} fill={BLOOD} opacity={0.1 + 0.05 * Math.sin(f / 4)} />
    <g transform={`translate(540 860) rotate(${Math.sin(f / 20) * 6})`}>
      <path d="M-380 -40 Q0 -120 380 -40 L380 40 Q0 -40 -380 40 Z" fill="#3a2a1a" stroke="#8a6a4a" strokeWidth={4} />
      {Array.from({ length: 30 }).map((_, i) => <path key={i} d={`M${-360 + i * 24} ${-40 - Math.sin(i / 5) * 40} l6 -24 l6 24`} fill="#5a4a3a" />)}
      <rect x={-50} y={-80} width={100} height={110} rx={10} fill="none" stroke="#c8a040" strokeWidth={12} />
      <g transform="translate(0 -24) scale(0.12)"><Wolf f={f} eye={BLOOD} fill="#c8a040" /></g>
    </g>
    {Array.from({ length: 16 }).map((_, i) => <circle key={i} cx={540 + (random(`bl${i}`) - 0.5) * 800} cy={(1200 - ((f * 3 + i * 50) % 800))} r={3} fill="#ff4a2a" opacity={0.6} />)}
  </svg>
);

const Gevaudan: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#3a3a40" bottom="#0a0a0c" id="w4" />
    <path d="M0 950 Q270 820 540 900 Q810 980 1080 860 V1920 H0 Z" fill="#1a1c18" />
    <path d="M0 1150 Q300 1060 600 1120 Q850 1170 1080 1100 V1920 H0 Z" fill="#0c0e0a" />
    <g transform="translate(860 900)"><path d="M-40 0 L-40 -80 L0 -120 L40 -80 L40 0 Z" fill="#0a0a0a" /><rect x={-6} y={-170} width={12} height={60} fill="#0a0a0a" /><rect x={-20} y={-150} width={40} height={8} fill="#0a0a0a" /></g>
    {[0, 1, 2, 3, 4].map((i) => <g key={i} transform={`translate(${200 + i * 50 + Math.sin(f / 10 + i) * 6} ${1150})`}><ellipse cx={0} cy={0} rx={30} ry={18} fill="#d8d0c0" /><circle cx={-28} cy={-6} r={10} fill="#1a1a1a" /></g>)}
    <g transform={`translate(${1200 - f * 6} 1180) scale(0.55)`}><Wolf f={f} run eye={BLOOD} /></g>
  </svg>
);

const Beast: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#040203" />
    <circle cx={540} cy={860} r={460} fill={BLOOD} opacity={0.08} />
    <g transform={`translate(660 ${940}) scale(${1.0 + Math.min(f, 30) * 0.006})`}><Wolf f={f} eye={BLOOD} /></g>
    {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${120 + i * 160} 1500 l40 -120 l20 120 l40 -120 l20 120`} stroke={BLOOD} strokeWidth={8} fill="none" opacity={0.5} />)}
  </svg>
);

const Chastel: React.FC<ShotProps> = ({ f }) => {
  const fire = f > 30 && f < 36;
  return (
    <svg width={W} height={H}>
      <Sky top="#2a2a34" bottom="#060608" id="w5" />
      <Moon x={820} y={360} r={70} f={f} />
      <path d="M0 1180 Q540 1110 1080 1180 V1920 H0 Z" fill="#08080a" />
      <g transform="translate(300 1180)">
        <path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill={INK} stroke={RIM} strokeOpacity={0.5} strokeWidth={3} />
        <circle cx={0} cy={-300} r={36} fill={INK} stroke={RIM} strokeOpacity={0.5} strokeWidth={3} />
        <path d="M-50 -330 L50 -330 L30 -350 L-30 -350 Z" fill={INK} />
        <line x1={20} y1={-220} x2={400} y2={-300} stroke="#3a2a1a" strokeWidth={16} />
        {fire && <circle cx={410} cy={-302} r={50} fill="#fff2b0" />}
      </g>
      {f > 30 && <circle cx={710 + (f - 30) * 30} cy={878 - (f - 30) * 4} r={8} fill="#e8f0f8" />}
      <g transform="translate(860 1120) scale(0.5)" opacity={f > 40 ? 1 - (f - 40) / 20 : 1}><Wolf f={f} eye={BLOOD} upright={f > 38 ? -0.2 : 0} /></g>
      <circle cx={540} cy={1500} r={50} fill="#d8e0e8" opacity={0.0} />
    </svg>
  );
};

const Lycan: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0c1012" />
    <rect x={160} y={360} width={760} height={1000} fill="#e8e8e0" />
    <rect x={420} y={330} width={240} height={60} rx={10} fill="#5a5a5a" />
    {Array.from({ length: 12 }).map((_, i) => <line key={i} x1={220} y1={520 + i * 56} x2={i % 3 === 2 ? 600 : 860} y2={520 + i * 56} stroke="#8a8a8a" strokeWidth={6} />)}
    <text x={540} y={470} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={46} fill="#2a2a2a">CLINICAL LYCANTHROPY</text>
    <g transform="translate(540 1220)">{Array.from({ length: 4 }).map((_, i) => <path key={i} d={`M${-90 + i * 40} -120 L${-60 + i * 40} 40`} stroke={BLOOD} strokeWidth={10} strokeLinecap="round" opacity={clamp((f - 10 - i * 4) / 6)} />)}</g>
  </svg>
);

const Howl: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a1a28" bottom="#030305" id="w6" />
    <Moon x={540} y={600} r={260} f={f} />
    <path d="M0 1000 L240 860 L420 920 L600 820 L800 900 L1080 840 V1920 H0 Z" fill="#040406" />
    {[[220, 870, 0.4], [420, 915, 0.36], [610, 820, 0.45], [820, 895, 0.38]].map(([x, y, s], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s})`}><Wolf f={f + i * 10} howl eye={BLOOD} /></g>)}
    {Array.from({ length: 10 }).map((_, i) => <g key={i} opacity={(f + i * 13) % 60 < 45 ? 1 : 0}><circle cx={80 + i * 100} cy={1200 + (i % 3) * 60} r={6} fill={BLOOD} /><circle cx={100 + i * 100} cy={1200 + (i % 3) * 60} r={6} fill={BLOOD} /></g>)}
  </svg>
);

export const SHOTS11: Record<string, React.FC<ShotProps>> = {
  wmoon: WMoon, wfeast: WFeast, zeus: Zeus, wchange: WChange, village16: Village16, belt: Belt,
  gevaudan: Gevaudan, beast: Beast, chastel: Chastel, lycan: Lycan, howl: Howl,
};
