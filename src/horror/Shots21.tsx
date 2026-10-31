import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #21 — Chupacabra */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", GREY = "#5a6260", EYE = "#c8ff4a";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const Chupa: React.FC<{ f: number; s?: number; fill?: string; crouch?: number }> = ({ f, s = 1, fill = "#2a302e", crouch = 0 }) => {
  const st = { stroke: "#8ab0a0", strokeOpacity: 0.5, strokeWidth: 4 } as const;
  return (
    <g transform={`scale(${s}) rotate(${crouch * 30})`}>
      <path d="M-40 0 L-70 260 L-30 270 L-10 40 M40 0 L80 250 L40 262 L10 40" fill={fill} {...st} />
      <path d="M-70 -300 C-100 -180 -70 -40 -40 20 L40 20 C70 -40 100 -180 70 -300 C40 -340 -40 -340 -70 -300 Z" fill={fill} {...st} />
      {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M${-20 + (i % 2) * 6} ${-330 + i * 40} l${40 + (i % 3) * 10} -20 l-30 30 Z`} fill="#1a1e1c" stroke="#8ab0a0" strokeOpacity={0.4} strokeWidth={2} transform="translate(60 0)" />)}
      <path d="M-70 -260 L-160 -140 L-200 -160 M70 -260 L150 -150 L190 -170" stroke={fill} strokeWidth={22} strokeLinecap="round" fill="none" />
      {[[-200, -160], [190, -170]].map(([x, y], i) => <path key={i} d={`M${x} ${y} l-20 30 M${x} ${y} l0 36 M${x} ${y} l20 30`} stroke={fill} strokeWidth={8} strokeLinecap="round" />)}
      <ellipse cx={0} cy={-390} rx={62} ry={80} fill={fill} {...st} />
      <ellipse cx={-26} cy={-400} rx={22} ry={30} fill="#000" transform="rotate(20 -26 -400)" />
      <ellipse cx={26} cy={-400} rx={22} ry={30} fill="#000" transform="rotate(-20 26 -400)" />
      <circle cx={-24} cy={-404} r={5} fill={BLOOD} opacity={0.6 + 0.4 * Math.sin(f / 4)} /><circle cx={24} cy={-404} r={5} fill={BLOOD} opacity={0.6 + 0.4 * Math.sin(f / 4)} />
      <path d="M-20 -340 Q0 -330 20 -340" stroke="#000" strokeWidth={4} fill="none" />
      {Array.from({ length: 4 }).map((_, i) => <path key={i} d={`M${-14 + i * 9} -338 l3 10 l3 -10`} fill="#e8e2d0" />)}
    </g>
  );
};

const Goat: React.FC<{ x: number; y: number; s?: number; dead?: boolean; f: number }> = ({ x, y, s = 1, dead, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${dead ? 180 : 0})`}>
    <ellipse cx={0} cy={0} rx={80} ry={40} fill="#d8d0c0" />
    <circle cx={-80} cy={-30} r={26} fill="#d8d0c0" />
    <path d="M-90 -50 Q-110 -80 -100 -100 M-74 -54 Q-80 -86 -66 -100" stroke="#8a7a5a" strokeWidth={6} fill="none" />
    {[-50, -20, 30, 60].map((lx, i) => <rect key={i} x={lx} y={30} width={10} height={60} fill="#5a5040" />)}
    {dead && [0, 1, 2].map((i) => <circle key={i} cx={-30 + i * 14} cy={-10} r={5} fill={BLOOD} />)}
  </g>
);

const FarmNight: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#14201c" bottom="#030504" id="ch1" />
    <Moon x={780} y={360} r={80} f={f} />
    <path d="M0 1150 Q540 1090 1080 1150 V1920 H0 Z" fill="#070a08" />
    <g transform="translate(250 1150)"><path d="M-160 0 L-160 -280 L0 -400 L160 -280 L160 0 Z" fill="#1a0e0a" stroke="#4a2a1a" strokeWidth={4} /><rect x={-60} y={-200} width={120} height={200} fill="#000" /><path d="M-60 -200 L60 0 M60 -200 L-60 0" stroke="#3a1a10" strokeWidth={8} /></g>
    {Array.from({ length: 12 }).map((_, i) => <line key={i} x1={460 + i * 50} y1={1150} x2={460 + i * 50} y2={1060} stroke="#3a2a1a" strokeWidth={8} />)}
    <line x1={460} y1={1080} x2={1010} y2={1080} stroke="#3a2a1a" strokeWidth={8} />
    {[[560, 1200], [720, 1230], [880, 1190]].map(([x, y], i) => <Goat key={i} x={x} y={y} s={0.7} f={f} />)}
    {(f % 70) < 50 && <g><circle cx={980} cy={1000} r={7} fill={BLOOD} /><circle cx={1004} cy={1000} r={7} fill={BLOOD} /></g>}
  </svg>
);

const Sheep: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#3a3a40" bottom="#0c0c0e" id="ch2" />
    <path d="M0 1000 L1080 1000 L1080 1920 L0 1920 Z" fill="#1a1c16" />
    {[[260, 1150], [560, 1250], [820, 1130], [400, 1400], [740, 1420]].map(([x, y], i) => <Goat key={i} x={x} y={y} s={0.9} dead f={f} />)}
    <g transform="translate(560 1250)"><circle r={160} fill="none" stroke={BLOOD} strokeWidth={4} opacity={0.5 + 0.5 * Math.sin(f / 5)} /></g>
  </svg>
);

const Spread: React.FC<ShotProps> = ({ f, dur }) => {
  const p = clamp(f / (dur * 0.9));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#06100c" />
      <path d="M120 860 C200 760 420 740 600 760 C760 770 900 800 960 860 C980 920 900 960 760 970 C540 990 300 990 160 960 C100 940 90 900 120 860 Z" fill="#1a3a2a" stroke="#5aaa7a" strokeWidth={4} />
      {Array.from({ length: Math.floor(p * 60) }).map((_, i) => <circle key={i} cx={160 + random(`sp${i}`) * 780} cy={790 + random(`sq${i}`) * 160} r={8} fill={BLOOD} opacity={0.85} />)}
      <text x={540} y={1150} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={80} fill={BLOOD}>{Math.floor(p * 150)}+</text>
      <text x={540} y={1210} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={36} fill="#ece4d0" opacity={0.7}>ANIMALS · 1995</text>
    </svg>
  );
};

const ChWindow: React.FC<ShotProps> = ({ f }) => {
  const a = clamp((f - 10) / 20);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0c0a08" />
      <g transform="translate(540 820)">
        <rect x={-320} y={-440} width={640} height={820} fill="#a8b8a0" />
        <path d="M-320 200 Q0 160 320 200 V380 H-320 Z" fill="#5a7a4a" />
        <g transform={`translate(${120 - a * 60} 260) scale(0.55)`} opacity={a}><Chupa f={f} /></g>
        <rect x={-330} y={-450} width={660} height={840} fill="none" stroke="#1a140e" strokeWidth={40} />
        <line x1={0} y1={-440} x2={0} y2={380} stroke="#1a140e" strokeWidth={20} />
      </g>
      <g transform="translate(240 1500)"><path d="M-80 0 Q-70 -200 -40 -280 L40 -280 Q70 -200 80 0 Z" fill={INK} /><circle cx={0} cy={-320} r={40} fill={INK} /></g>
    </svg>
  );
};

const ChupaShot: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#050706" />
    <circle cx={540} cy={820} r={460} fill={EYE} opacity={0.05} />
    <g transform={`translate(540 ${1150}) scale(${1.2 + Math.min(f, 40) * 0.004})`}><Chupa f={f} /></g>
  </svg>
);

const Theories: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#0e2018" bottom="#030604" id="ch3" />
    {Array.from({ length: 14 }).map((_, i) => <path key={i} d={`M${i * 80} 1920 L${i * 80 + 40} ${1000 + (i % 3) * 80} L${i * 80 + 80} 1920 Z`} fill="#06120a" />)}
    <g transform="translate(320 1100)"><rect x={-180} y={-160} width={360} height={160} fill="#2a3230" stroke="#8a9a90" strokeWidth={4} /><rect x={-140} y={-120} width={60} height={40} fill={EYE} opacity={0.5} /><rect x={60} y={-120} width={60} height={40} fill={EYE} opacity={0.5} /><path d="M-20 -160 L-20 -260 L60 -240" stroke="#8a9a90" strokeWidth={6} fill="none" /><text x={0} y={-30} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={30} fill="#ece4d0">RESTRICTED</text></g>
    <g transform={`translate(${780 + Math.sin(f / 15) * 40} ${520 + Math.sin(f / 10) * 20})`}><ellipse rx={180} ry={50} fill="#3a4240" stroke="#9ac" strokeWidth={4} /><ellipse cx={0} cy={-30} rx={70} ry={40} fill="#5a6a6a" /><path d="M-100 40 L-200 600 L200 600 L100 40 Z" fill={EYE} opacity={0.1} />{[-120, -40, 40, 120].map((x, i) => <circle key={i} cx={x} cy={14} r={8} fill={(f + i * 5) % 20 < 10 ? EYE : "#3a4240"} />)}</g>
  </svg>
);

const Texas: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#c89a6a" bottom="#5a3a20" id="ch4" />
    <circle cx={800} cy={480} r={120} fill="#ffe0a0" opacity={0.7} />
    <path d="M0 1050 L1080 1050 L1080 1920 L0 1920 Z" fill="#8a6a40" />
    <path d="M300 1920 L500 1050 L580 1050 L780 1920 Z" fill="#3a3632" />
    <path d="M540 1050 L540 1920" stroke="#e8d070" strokeWidth={8} strokeDasharray="40 40" />
    <g transform="translate(330 1180) rotate(4) scale(1.3)"><ellipse cx={0} cy={0} rx={130} ry={45} fill="#5a6a72" /><path d="M-130 -10 L-200 -30 L-210 0 L-140 10 Z" fill="#5a6a72" /><path d="M-170 -26 L-160 -60 L-150 -24 Z" fill="#5a6a72" />{[-80, -40, 50, 90].map((x, i) => <rect key={i} x={x} y={30} width={14} height={50} fill="#5a6a72" transform={`rotate(${60} ${x} 30)`} />)}<path d="M-100 -30 Q0 -50 100 -30" stroke="#3a4a52" strokeWidth={6} fill="none" /></g>
  </svg>
);

const Mange: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#06100e" />
    <circle cx={540} cy={760} r={360} fill="none" stroke="#1fd17a" strokeWidth={10} />
    <circle cx={540} cy={760} r={340} fill="#0a1a16" />
    <g transform={`translate(540 760) rotate(${Math.sin(f / 10) * 10}) scale(2.2)`}>
      <ellipse cx={0} cy={0} rx={70} ry={50} fill="#c8b890" stroke="#8a7a50" strokeWidth={3} />
      {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${-50 + (i % 4) * 32} ${i < 4 ? -40 : 40} l${i % 2 ? 10 : -10} ${i < 4 ? -40 : 40}`} stroke="#c8b890" strokeWidth={6} strokeLinecap="round" />)}
      <circle cx={-60} cy={0} r={14} fill="#a89870" />
    </g>
    <text x={540} y={1470} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={42} fill="#1fd17a">SARCOPTES SCABIEI</text>
    <text x={540} y={1525} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={34} fill="#1fd17a" opacity={0.7}>COYOTE · MANGE · NOT A MONSTER</text>
  </svg>
);

const Species: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0a0c" />
    <g transform="translate(540 820)">
      <rect x={-300} y={-440} width={600} height={880} fill="#101418" stroke="#3a4a52" strokeWidth={10} />
      <circle cx={0} cy={-120} r={240} fill={EYE} opacity={0.08} />
      <g transform="translate(0 340) scale(0.8)" opacity={0.9}><Chupa f={f} fill="#3a4a4a" /></g>
      <text x={0} y={-360} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={54} fill="#ece4d0">SCI-FI HORROR</text>
      <text x={0} y={-300} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={34} fill="#ece4d0" opacity={0.7}>IN CINEMAS · 1995</text>
    </g>
    <text x={540} y={1460} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={64} fill={BLOOD} opacity={clamp((f - 30) / 10)} transform="rotate(-6 540 1460)">SAME CREATURE?</text>
  </svg>
);

const ChuEyes: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#020302" />
    {Array.from({ length: 12 }).map((_, i) => <line key={i} x1={i * 100} y1={1150} x2={i * 100} y2={1050} stroke="#1a140e" strokeWidth={10} />)}
    <line x1={0} y1={1070} x2={W} y2={1070} stroke="#1a140e" strokeWidth={10} />
    <g transform={`translate(540 ${1020 + Math.sin(f / 10) * 6}) scale(0.9)`} opacity={0.85}><Chupa f={f} fill="#0a0c0c" crouch={0.2} /></g>
    <ellipse cx={540} cy={640} rx={160} ry={70} fill={BLOOD} opacity={0.06 + 0.04 * Math.sin(f / 3)} />
  </svg>
);

export const SHOTS21: Record<string, React.FC<ShotProps>> = {
  farmnight: FarmNight, sheep: Sheep, spread: Spread, chwindow: ChWindow, chupa: ChupaShot, theories: Theories,
  texas: Texas, mange: Mange, species: Species, chueyes: ChuEyes,
};
