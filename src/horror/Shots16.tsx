import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #16 — Centaur */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", FIRE = "#ff7a2a", RIM = "#c8a070";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const CentaurFig: React.FC<{ f: number; fill?: string; eye?: string; bow?: boolean; rear?: number; gentle?: boolean }> = ({ f, fill = INK, eye = "#ff5a3a", bow, rear = 0, gentle }) => {
  const st = { stroke: RIM, strokeOpacity: 0.6, strokeWidth: 4 } as const;
  return (
    <g transform={`rotate(${-rear * 20} 100 60)`}>
      <path d={`M240 0 C310 20 340 ${120 + Math.sin(f / 9) * 18} 300 230 C280 140 260 70 230 30 Z`} fill={fill} {...st} />
      {[[-110, 0], [-60, 8], [170, 0], [215, 8]].map(([lx, o], i) => <path key={i} d={`M${lx} 60 L${lx - 6 + o + (i < 2 ? -rear * 60 : 0)} 300 L${lx + 24 + o + (i < 2 ? -rear * 60 : 0)} 300 L${lx + 32} 60 Z`} fill={fill} {...st} />)}
      <ellipse cx={60} cy={30} rx={220} ry={95} fill={fill} {...st} />
      <path d="M-140 0 L-110 -260 Q-60 -300 -10 -260 L20 0 Z" fill={fill} {...st} />
      <circle cx={-60} cy={-320} r={46} fill={fill} {...st} />
      {gentle ? <path d="M-96 -300 Q-60 -220 -24 -300 Q-60 -200 -96 -300 Z" fill="#c8c0b0" /> : <path d="M-100 -350 L-110 -390 L-80 -360 Z M-20 -350 L-10 -390 L-40 -360 Z" fill={fill} />}
      <circle cx={-76} cy={-324} r={5} fill={eye} /><circle cx={-44} cy={-324} r={5} fill={eye} />
      <path d={`M-120 -230 L${bow ? -260 : -200} ${bow ? -330 : -120}`} stroke={fill} strokeWidth={22} strokeLinecap="round" />
      <path d={`M0 -230 L${bow ? -150 : 90} ${bow ? -320 : -130}`} stroke={fill} strokeWidth={22} strokeLinecap="round" />
      {bow && <g><path d="M-270 -460 Q-200 -330 -270 -200" stroke="#8a6a3a" strokeWidth={8} fill="none" /><line x1={-270} y1={-460} x2={-270} y2={-200} stroke="#c8c0a0" strokeWidth={2} /></g>}
    </g>
  );
};

const CnField: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a2018" bottom="#060403" id="cn1" />
    <Moon x={780} y={360} r={90} f={f} />
    <path d="M0 1100 Q300 1000 540 1060 Q800 1120 1080 1020 V1920 H0 Z" fill="#0a0806" />
    <g transform={`translate(${540 - Math.sin(f / 40) * 40} 900) scale(0.8)`}><CentaurFig f={f} bow eye={BLOOD} /></g>
    {Array.from({ length: 20 }).map((_, i) => <path key={i} d={`M${i * 56} 1920 L${i * 56 + 10} ${1180 + (i % 4) * 30} L${i * 56 + 20} 1920`} fill="#050403" />)}
  </svg>
);

const Coals: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0302" />
    <path d="M200 1100 L880 1100 L800 1600 L280 1600 Z" fill="#1a0402" />
    {Array.from({ length: 40 }).map((_, i) => <circle key={i} cx={300 + random(`co${i}`) * 480} cy={1250 + random(`cp${i}`) * 300} r={20 + random(`cq${i}`) * 26} fill={["#ff5a1a", "#ff9a3a", "#c8200a"][i % 3]} opacity={0.7 + 0.3 * Math.sin(f / 3 + i)} />)}
    <circle cx={540} cy={1350} r={420} fill={FIRE} opacity={0.18} />
    <g transform="translate(540 1000)"><path d="M-160 0 L160 0 L140 30 L-140 30 Z" fill="#3a2a1a" /><g transform={`translate(${Math.sin(f / 10) * 4} ${Math.min(f, 30) * 4})`}><path d="M-40 0 L-30 -180 Q0 -200 30 -180 L40 0 Z" fill={INK} /><circle cx={0} cy={-210} r={30} fill={INK} /><path d="M-30 -150 L-90 -230 M30 -150 L90 -230" stroke={INK} strokeWidth={16} /></g></g>
    <g transform="translate(860 1100)"><path d="M-60 0 L-40 -280 Q0 -320 40 -280 L60 0 Z" fill={INK} stroke={FIRE} strokeOpacity={0.6} strokeWidth={4} /><circle cx={0} cy={-320} r={40} fill={INK} stroke={FIRE} strokeOpacity={0.6} strokeWidth={4} /><path d="M-30 -356 L-24 -386 L0 -364 L24 -386 L30 -356 Z" fill="#e0b040" /></g>
  </svg>
);

const CnFeast: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#5a6a8a" bottom="#1a1e2a" id="cn2" />
    <circle cx={540} cy={420} r={300} fill="#fff4d0" opacity={0.35} />
    {[-300, -150, 0, 150, 300].map((x, i) => <rect key={i} x={540 + x - 22} y={360} width={44} height={760} fill="#e8e0cc" />)}
    <path d="M200 360 L540 220 L880 360 Z" fill="#e8e0cc" />
    <path d="M140 1120 L940 1120 L960 1180 L120 1180 Z" fill="#c8b890" />
    {[260, 440, 640, 820].map((x, i) => <g key={i} transform={`translate(${x} 1120) scale(0.7)`}><path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill={i === 1 ? INK : "#3a3a4a"} /><circle cx={0} cy={-300} r={36} fill={i === 1 ? INK : "#3a3a4a"} /></g>)}
    <g transform="translate(640 1120) scale(0.7)"><circle cx={0} cy={-300} r={60} fill="#fff" opacity={0.15} /></g>
    <path d="M300 940 L560 960" stroke={INK} strokeWidth={14} opacity={0.8} />
  </svg>
);

const CloudHera: React.FC<ShotProps> = ({ f, dur }) => {
  const form = clamp(f / (dur * 0.5));
  return (
    <svg width={W} height={H}>
      <Sky top="#2a3040" bottom="#0a0c12" id="cn3" />
      <g transform="translate(540 820)" opacity={0.85}>
        {Array.from({ length: 22 }).map((_, i) => { const a = (i / 22) * Math.PI * 2; const r = 260 * (1 - form) + 80; return <circle key={i} cx={Math.cos(a + f / 40) * r * 1.2} cy={Math.sin(a + f / 40) * r * 1.8} r={110} fill="#c8d0dc" opacity={0.35} />; })}
        <g opacity={form}><path d="M-120 400 L-80 -100 Q0 -160 80 -100 L120 400 Z" fill="#dfe4ec" /><circle cx={0} cy={-170} r={60} fill="#dfe4ec" /><path d="M-60 -200 C-120 -100 -100 0 -140 100 M60 -200 C120 -100 100 0 140 100" stroke="#dfe4ec" strokeWidth={30} fill="none" /><circle cx={-20} cy={-176} r={6} fill="#5a6a8a" /><circle cx={20} cy={-176} r={6} fill="#5a6a8a" /></g>
      </g>
      <g transform="translate(200 1300) scale(0.8)"><path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill={INK} /><circle cx={0} cy={-300} r={36} fill={INK} /><path d="M40 -230 L150 -320" stroke={INK} strokeWidth={18} strokeLinecap="round" /></g>
    </svg>
  );
};

const Wheel: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a0604" bottom="#050101" id="cn4" />
    <g transform={`translate(540 860) rotate(${f * 4})`}>
      <circle r={380} fill="none" stroke="#3a2a1a" strokeWidth={30} />
      {Array.from({ length: 12 }).map((_, i) => <line key={i} x1={0} y1={0} x2={Math.cos(i * 0.5236) * 380} y2={Math.sin(i * 0.5236) * 380} stroke="#3a2a1a" strokeWidth={16} />)}
      {Array.from({ length: 24 }).map((_, i) => { const a = i * 0.2618; return <path key={i} d={`M${Math.cos(a) * 380} ${Math.sin(a) * 380} q${Math.cos(a) * 40} ${Math.sin(a) * 40 - 30} ${Math.cos(a) * 20} ${Math.sin(a) * 20 - 80}`} fill={i % 2 ? FIRE : "#ffd04a"} opacity={0.85} />; })}
      <g><path d="M-40 160 L-30 -100 Q0 -130 30 -100 L40 160 Z" fill={INK} /><circle cx={0} cy={-140} r={36} fill={INK} /><path d="M-30 -60 L-300 -200 M30 -60 L300 -200 M-20 160 L-200 320 M20 160 L200 320" stroke={INK} strokeWidth={20} /></g>
    </g>
    <circle cx={540} cy={860} r={520} fill={FIRE} opacity={0.1} />
  </svg>
);

const CnWedding: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0c0604" />
    <circle cx={540} cy={860} r={460} fill="#ff9a3a" opacity={0.12} />
    <path d="M100 1200 L980 1200 L1000 1260 L80 1260 Z" fill="#2a1a0c" transform={`rotate(${Math.sin(f / 4) * 3} 540 1230)`} />
    <g transform={`translate(${300 + Math.sin(f / 4) * 20} 1120) scale(0.6)`}><CentaurFig f={f} rear={0.6 + 0.3 * Math.sin(f / 3)} eye={BLOOD} /></g>
    <g transform={`translate(${780 - Math.sin(f / 5) * 20} 1140) scale(-0.55 0.55)`}><CentaurFig f={f + 10} rear={0.4} eye={BLOOD} /></g>
    {[160, 540, 940].map((x, i) => <g key={i} transform={`translate(${x} 1300) scale(0.6)`}><path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill="#14100c" /><circle cx={0} cy={-300} r={36} fill="#14100c" /><path d={`M40 -230 L${120 + Math.sin(f / 2 + i) * 40} -320`} stroke="#14100c" strokeWidth={18} /></g>)}
    {Array.from({ length: 10 }).map((_, i) => <path key={i} d="M0 0 L20 -40 L40 0 Z" fill="#c8b890" transform={`translate(${200 + random(`wd${i}`) * 680} ${700 + ((f * 6 + i * 70) % 600)}) rotate(${f * 8 + i * 30})`} />)}
    {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={200 + random(`wb${i}`) * 680} cy={1000 + random(`wc${i}`) * 300} r={8 + random(`wr${i}`) * 12} fill={BLOOD} opacity={0.7} />)}
  </svg>
);

const Chiron: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0806" />
    <path d="M0 0 H1080 V500 Q800 380 540 460 Q280 380 0 500 Z" fill="#030201" />
    <circle cx={540} cy={1000} r={380} fill="#ffb43a" opacity={0.14} />
    <g transform="translate(460 960) scale(0.8)"><CentaurFig f={f} gentle eye="#e8e0cc" fill="#1a140e" /></g>
    {[[780, 1200], [880, 1190], [980, 1210]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y}) scale(0.45)`}><path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill={INK} /><circle cx={0} cy={-300} r={36} fill={INK} /></g>)}
    <g transform="translate(700 1240)"><path d="M-40 0 Q0 -60 40 0 Z" fill={FIRE} /><path d="M-20 0 Q0 -30 20 0 Z" fill="#ffd04a" /></g>
  </svg>
);

const CnArrow: React.FC<ShotProps> = ({ f }) => {
  const hit = clamp((f - 12) / 6);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#060403" />
      <circle cx={540} cy={900} r={400} fill="#5aff7a" opacity={0.06 * hit} />
      <g transform="translate(560 960) scale(0.8)"><CentaurFig f={f} gentle rear={hit * 0.4} eye={hit > 0.5 ? BLOOD : "#e8e0cc"} fill="#1a140e" /></g>
      <g transform={`translate(${1100 - hit * 560} ${640 + hit * 220}) rotate(160)`}><line x1={0} y1={0} x2={220} y2={0} stroke="#8a6a3a" strokeWidth={8} /><path d="M0 -14 L-30 0 L0 14 Z" fill="#5aff7a" /></g>
      {hit >= 1 && Array.from({ length: 14 }).map((_, i) => <path key={i} d={`M${540 + (random(`ca${i}`) - 0.5) * 300} ${860 - ((f * 4 + i * 30) % 300)} q10 -20 0 -40`} stroke="#5aff7a" strokeWidth={8} fill="none" opacity={0.5} />)}
    </svg>
  );
};

const CnStars: React.FC<ShotProps> = ({ f }) => {
  const pts: [number, number][] = [[300, 600], [420, 700], [560, 680], [700, 760], [820, 700], [480, 900], [380, 1060], [620, 1060], [740, 980]];
  const lines = [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6], [5, 7], [7, 8]];
  const d = clamp(f / 40);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#03040a" />
      {Array.from({ length: 120 }).map((_, i) => <circle key={i} cx={random(`cs${i}`) * W} cy={random(`ct${i}`) * 1500} r={1 + random(`cu${i}`) * 2} fill="#fff" opacity={0.3 + 0.5 * Math.abs(Math.sin(f / 20 + i))} />)}
      {lines.slice(0, Math.ceil(d * lines.length)).map(([a, b], i) => <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="#9ab8ff" strokeWidth={3} opacity={0.6} />)}
      {pts.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r={9} fill="#fff" /><circle cx={x} cy={y} r={26} fill="#9ab8ff" opacity={0.25} /></g>)}
      <g transform="translate(560 900) scale(0.6)" opacity={0.15 * d}><CentaurFig f={f} gentle fill="#9ab8ff" /></g>
    </svg>
  );
};

const Nessus: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a2a30" bottom="#08080a" id="cn5" />
    <path d="M0 1050 Q540 1000 1080 1060 L1080 1300 Q540 1250 0 1300 Z" fill="#14242c" />
    {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${((i * 200 + f * 3) % 1300) - 100} ${1120 + (i % 3) * 40} q50 -10 100 0`} stroke="#8ab" strokeOpacity={0.4} strokeWidth={3} fill="none" />)}
    <path d="M0 1300 Q540 1250 1080 1300 V1920 H0 Z" fill="#0a0806" />
    <g transform="translate(560 1180) rotate(10) scale(0.65)"><CentaurFig f={0} eye="#6a6a6a" rear={-0.2} /></g>
    <line x1={500} y1={900} x2={640} y2={1060} stroke="#8a6a3a" strokeWidth={8} />
    <ellipse cx={560} cy={1250} rx={160} ry={30} fill={BLOOD} opacity={0.7} />
    <g transform="translate(260 1340) scale(0.8)"><path d="M-70 0 Q-60 -180 -30 -220 L30 -220 Q60 -180 70 0 Z" fill="#14100c" stroke="#c8a070" strokeOpacity={0.5} strokeWidth={3} /><circle cx={0} cy={-260} r={36} fill="#14100c" stroke="#c8a070" strokeOpacity={0.5} strokeWidth={3} /><g transform="translate(70 -150)"><path d="M0 0 L40 0 L36 50 L4 50 Z" fill="#8a6a3a" /><rect x={8} y={20} width={24} height={26} fill={BLOOD} /></g></g>
  </svg>
);

const Shirt: React.FC<ShotProps> = ({ f }) => {
  const burn = clamp(f / 40);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0302" />
      <circle cx={540} cy={900} r={500} fill={FIRE} opacity={0.15 + burn * 0.15} />
      <g transform={`translate(540 1300) rotate(${Math.sin(f / 2) * 4 * burn})`}>
        <path d="M-100 0 L-80 -360 Q0 -420 80 -360 L100 0 Z" fill="#1a0a06" />
        <circle cx={0} cy={-420} r={50} fill="#1a0a06" />
        <path d={`M-80 -320 L${-220 - Math.sin(f / 2) * 30} ${-500 - burn * 60} M80 -320 L${220 + Math.sin(f / 2) * 30} ${-500 - burn * 60}`} stroke="#1a0a06" strokeWidth={30} strokeLinecap="round" />
        <path d="M-110 -40 L-90 -350 Q0 -400 90 -350 L110 -40 Z" fill="#e8e0cc" opacity={1 - burn * 0.6} />
        {Array.from({ length: 14 }).map((_, i) => <path key={i} d={`M${-90 + i * 13} ${-40 - (i % 3) * 30} Q${-96 + i * 13} ${-140 - Math.sin(f / 3 + i) * 40 * burn} ${-90 + i * 13} ${-220 - burn * 160}`} stroke={i % 2 ? FIRE : "#ffd04a"} strokeWidth={14} fill="none" opacity={burn} />)}
      </g>
    </svg>
  );
};

const Riders: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#4a3a30" bottom="#14100c" id="cn6" />
    <circle cx={540} cy={1000} r={220} fill="#ffb07a" opacity={0.45} />
    <path d="M0 1080 L1080 1080 L1080 1920 L0 1920 Z" fill="#1a1410" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i} transform={`translate(${((f * 4 + i * 290) % 1500) - 200} ${1080 - (i % 2) * 20}) scale(-0.45 0.45)`}>
        <path d={`M280 0 C350 20 380 130 340 240 C320 150 300 80 270 30 Z`} fill={INK} />
        {[[-150, 0], [-95, 8], [170, 0], [225, 8]].map(([lx, o], k) => <path key={k} d={`M${lx} 60 L${lx - 20 + Math.sin(f / 3 + k + i) * 40} 300 L${lx + 10 + Math.sin(f / 3 + k + i) * 40} 300 L${lx + 34} 60 Z`} fill={INK} />)}
        <ellipse cx={40} cy={30} rx={260} ry={105} fill={INK} />
        <path d="M-160 -320 L-250 -330 L-400 -200 L-390 -160 L-330 -165 L-240 -220 Z M-60 -50 L-120 60 L-250 -260 L-170 -310 Z" fill={INK} />
        <path d="M-40 -60 L-20 -300 Q20 -330 60 -300 L80 -60 Z" fill={INK} /><circle cx={20} cy={-350} r={40} fill={INK} />
      </g>
    ))}
    {Array.from({ length: 20 }).map((_, i) => <circle key={i} cx={random(`rd${i}`) * W} cy={1060 + random(`re${i}`) * 60} r={20 + random(`rf${i}`) * 30} fill="#3a2a20" opacity={0.3} />)}
  </svg>
);

export const SHOTS16: Record<string, React.FC<ShotProps>> = {
  cnfield: CnField, coals: Coals, cnfeast: CnFeast, cloudhera: CloudHera, wheel: Wheel, cnwedding: CnWedding,
  chiron: Chiron, cnarrow: CnArrow, cnstars: CnStars, nessus: Nessus, shirt: Shirt, riders: Riders,
};
