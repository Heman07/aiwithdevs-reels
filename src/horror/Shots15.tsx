import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #15 — Jinn */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BRASS = "#c8902a", SMOKE = "#2a2a34", FIRE = "#ff7a2a";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const Dunes: React.FC<{ y?: number }> = ({ y = 1150 }) => (
  <g>
    <path d={`M0 ${y - 120} Q270 ${y - 260} 540 ${y - 140} Q810 ${y - 20} 1080 ${y - 180} V1920 H0 Z`} fill="#2a1e14" />
    <path d={`M0 ${y} Q300 ${y - 120} 620 ${y - 20} Q860 ${y + 40} 1080 ${y - 60} V1920 H0 Z`} fill="#140e08" />
  </g>
);

const SmokeCol: React.FC<{ x: number; y: number; h: number; f: number; w?: number }> = ({ x, y, h, f, w = 120 }) => (
  <g>
    {Array.from({ length: 16 }).map((_, i) => {
      const t = i / 15;
      return <circle key={i} cx={x + Math.sin(f / 8 + i * 0.7) * 50 * t} cy={y - t * h} r={w * (0.4 + t * 0.9)} fill={SMOKE} opacity={0.55 - t * 0.2} />;
    })}
  </g>
);

const Jar: React.FC<{ s?: number; open?: boolean; glow?: number }> = ({ s = 1, open, glow = 0 }) => (
  <g transform={`scale(${s})`}>
    <path d="M-110 0 C-150 -120 -120 -230 -50 -260 L-50 -320 L50 -320 L50 -260 C120 -230 150 -120 110 0 Z" fill={BRASS} stroke="#6a4a10" strokeWidth={6} />
    {[-180, -120, -60].map((y, i) => <path key={i} d={`M-120 ${y} Q0 ${y + 20} 120 ${y}`} stroke="#8a6a20" strokeWidth={6} fill="none" />)}
    {!open && <><rect x={-62} y={-350} width={124} height={34} rx={6} fill="#8a6a20" /><circle cx={0} cy={-333} r={14} fill="#4a0a0a" /><path d="M0 -345 L8 -326 L-10 -338 L10 -338 L-8 -326 Z" fill="#e8c060" /></>}
    {glow > 0 && <ellipse cx={0} cy={-330} rx={60} ry={16} fill={FIRE} opacity={glow} />}
  </g>
);

const DesertNight: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a1a30" bottom="#06050a" id="j1" />
    <Moon x={740} y={380} r={90} f={f} />
    {Array.from({ length: 60 }).map((_, i) => <circle key={i} cx={random(`js${i}`) * W} cy={random(`jt${i}`) * 800} r={1 + random(`ju${i}`) * 2} fill="#fff" opacity={0.3 + 0.5 * Math.abs(Math.sin(f / 15 + i))} />)}
    <Dunes />
    <path d={`M${300 + Math.sin(f / 20) * 60} 1100 C${200 + Math.sin(f / 10) * 60} 900 ${420 + Math.sin(f / 12) * 60} 700 ${300 + Math.sin(f / 8) * 80} 500`} stroke={SMOKE} strokeWidth={70} fill="none" opacity={0.6} strokeLinecap="round" />
    <g transform="translate(300 1060)" opacity={0.8}><circle cx={-10} cy={-470} r={6} fill={FIRE} /><circle cx={14} cy={-470} r={6} fill={FIRE} /></g>
  </svg>
);

const Smokeless: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#050304" />
    {[[200, "#6a4a30", "CLAY"], [540, "#e8f0ff", "LIGHT"], [880, FIRE, "FIRE"]].map(([x, c, t], i) => (
      <g key={i} transform={`translate(${x} 900)`} opacity={clamp((f - i * 15) / 12)}>
        <circle r={150} fill={c as string} opacity={0.12} />
        {i === 0 && <g><path d="M-40 120 L-30 -60 Q0 -80 30 -60 L40 120 Z" fill={c as string} /><circle cx={0} cy={-100} r={32} fill={c as string} /></g>}
        {i === 1 && <g>{Array.from({ length: 10 }).map((_, k) => <line key={k} x1={0} y1={0} x2={Math.cos(k * 0.63) * 120} y2={Math.sin(k * 0.63) * 120} stroke={c as string} strokeWidth={6} opacity={0.7} />)}<circle r={40} fill={c as string} /></g>}
        {i === 2 && <g>{[-30, 0, 30].map((ox, k) => <path key={k} d={`M${ox - 34} 100 Q${ox - 40} ${0 - Math.sin(f / 3 + k) * 20} ${ox} ${-120 - Math.sin(f / 3 + k) * 30} Q${ox + 40} 0 ${ox + 34} 100 Z`} fill={k === 1 ? "#ffd04a" : FIRE} />)}</g>}
        <text x={0} y={240} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={44} fill="#ece4d0">{t}</text>
      </g>
    ))}
  </svg>
);

const JRuins: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a1620" bottom="#050406" id="j2" />
    <Moon x={300} y={360} r={70} f={f} />
    <Dunes y={1250} />
    {[[180, 520], [420, 680], [700, 600], [920, 460]].map(([x, h], i) => (
      <g key={i}>
        <rect x={x - 60} y={1180 - h} width={120} height={h} fill="#1a140e" stroke="#3a2e20" strokeWidth={4} />
        <path d={`M${x - 40} ${1180 - h * 0.6} L${x - 40} ${1180 - h * 0.8} Q${x} ${1180 - h * 0.9} ${x + 40} ${1180 - h * 0.8} L${x + 40} ${1180 - h * 0.6} Z`} fill="#000" />
        {(f + i * 23) % 80 < 60 && <g><circle cx={x - 14} cy={1180 - h * 0.72} r={5} fill={FIRE} /><circle cx={x + 14} cy={1180 - h * 0.72} r={5} fill={FIRE} /></g>}
      </g>
    ))}
  </svg>
);

const Solomon: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0604" />
    <circle cx={540} cy={800} r={420} fill="#e8c060" opacity={0.1} />
    <g transform="translate(540 1200)">
      <path d="M-120 0 L-90 -420 Q0 -480 90 -420 L120 0 Z" fill="#1a1020" stroke={BRASS} strokeOpacity={0.6} strokeWidth={4} />
      <circle cx={0} cy={-480} r={56} fill="#1a1020" stroke={BRASS} strokeOpacity={0.6} strokeWidth={4} />
      <path d="M-56 -520 L-48 -570 L-24 -536 L0 -580 L24 -536 L48 -570 L56 -520 Z" fill="#e0b040" />
      <path d="M90 -380 L260 -460" stroke="#1a1020" strokeWidth={30} strokeLinecap="round" />
      <g transform="translate(270 -470)"><circle r={20} fill="none" stroke="#e0b040" strokeWidth={8} /><path d="M0 -14 L10 10 L-12 -4 L12 -4 L-10 10 Z" fill="#e0b040" /><circle r={80} fill="#e0b040" opacity={0.15 + 0.1 * Math.sin(f / 4)} /></g>
    </g>
    {[140, 300, 800, 950].map((x, i) => <g key={i} transform={`translate(${x} ${1320 + (i % 2) * 40})`}><Jar s={0.55} /><SmokeCol x={0} y={-180} h={120} f={f + i * 10} w={14} /></g>)}
  </svg>
);

const JNet: React.FC<ShotProps> = ({ f }) => {
  const pull = clamp(f / 40);
  return (
    <svg width={W} height={H}>
      <Sky top="#3a3048" bottom="#0a0810" id="j3" />
      <circle cx={540} cy={980} r={160} fill="#e08a5a" opacity={0.4} />
      <path d="M0 1000 L1080 1000 L1080 1920 L0 1920 Z" fill="#0a1218" />
      <g transform={`translate(380 ${980 + Math.sin(f / 9) * 6})`}><path d="M-200 0 L200 0 L160 60 L-160 60 Z" fill={INK} /><path d="M-40 0 L-30 -160 Q0 -180 30 -160 L40 0 Z" fill={INK} /><circle cx={0} cy={-190} r={26} fill={INK} /><path d={`M30 -120 L${200} ${-60 + pull * 40}`} stroke={INK} strokeWidth={12} /></g>
      <g transform={`translate(640 ${1250 - pull * 220})`}>
        {Array.from({ length: 8 }).map((_, i) => <line key={i} x1={-160 + i * 45} y1={-200} x2={-140 + i * 40} y2={120} stroke="#8a7a5a" strokeWidth={3} />)}
        {Array.from({ length: 7 }).map((_, i) => <line key={i} x1={-170} y1={-180 + i * 48} x2={170} y2={-170 + i * 48} stroke="#8a7a5a" strokeWidth={3} />)}
        <g transform="translate(0 100)"><Jar s={0.7} /></g>
      </g>
    </svg>
  );
};

const SmokeRise: React.FC<ShotProps> = ({ f, dur }) => {
  const h = clamp(f / (dur * 0.8));
  return (
    <svg width={W} height={H}>
      <Sky top="#2a2030" bottom="#08060a" id="j4" />
      <path d="M0 1300 Q540 1260 1080 1300 V1920 H0 Z" fill="#2a2016" />
      <g transform="translate(540 1300)"><Jar s={0.8} open glow={0.6} /></g>
      <SmokeCol x={540} y={1040} h={900 * h} f={f} w={110} />
      {h > 0.7 && <g opacity={(h - 0.7) / 0.3}><circle cx={500} cy={360} r={12} fill={FIRE} /><circle cx={580} cy={360} r={12} fill={FIRE} /></g>}
      <g transform="translate(240 1300) scale(0.4)"><path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill={INK} /><circle cx={0} cy={-300} r={36} fill={INK} /></g>
    </svg>
  );
};

const JGiant: React.FC<ShotProps> = ({ f, scene }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#060406" />
    <g transform={`translate(540 ${820 + Math.sin(f / 10) * 10}) scale(${scene === 7 ? 1.15 + Math.min(f, 20) * 0.01 : 1})`}>
      {Array.from({ length: 18 }).map((_, i) => { const a = (i / 18) * Math.PI * 2; return <circle key={i} cx={Math.cos(a + f / 30) * 260} cy={Math.sin(a + f / 30) * 300} r={120} fill={SMOKE} opacity={0.5} />; })}
      <ellipse cx={0} cy={0} rx={260} ry={320} fill="#14121a" />
      <path d="M-160 -120 L-60 -70 M160 -120 L60 -70" stroke="#000" strokeWidth={22} />
      <ellipse cx={-90} cy={-40} rx={40} ry={24} fill={FIRE} /><ellipse cx={90} cy={-40} rx={40} ry={24} fill={FIRE} />
      <circle cx={0} cy={-40} r={260} fill={FIRE} opacity={0.06} />
      <path d={`M-120 120 Q0 ${170 + 40 * Math.abs(Math.sin(f / 4))} 120 120 Z`} fill="#000" />
      <path d="M-200 -260 L-260 -420 L-150 -290 Z M200 -260 L260 -420 L150 -290 Z" fill="#14121a" />
    </g>
    {[0, 1, 2].map((i) => <text key={i} x={540} y={1450 + i * 2} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={60} fill={BLOOD} opacity={scene === 7 ? clamp((f - 30) / 10) * 0.25 : 0}>CHOOSE</text>)}
  </svg>
);

const SmokeBack: React.FC<ShotProps> = ({ f, dur }) => {
  const h = 1 - clamp((f - 30) / (dur * 0.6));
  return (
    <svg width={W} height={H}>
      <Sky top="#2a2030" bottom="#08060a" id="j5" />
      <path d="M0 1300 Q540 1260 1080 1300 V1920 H0 Z" fill="#2a2016" />
      <g transform="translate(600 1300)"><Jar s={0.8} open glow={0.4} /></g>
      <SmokeCol x={600} y={1040} h={900 * h} f={-f} w={110 * (0.3 + h * 0.7)} />
      <g transform="translate(260 1300) scale(0.5)"><path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill={INK} /><circle cx={0} cy={-300} r={36} fill={INK} /><path d="M40 -220 L140 -280" stroke={INK} strokeWidth={18} /></g>
    </svg>
  );
};

const JSeal: React.FC<ShotProps> = ({ f }) => {
  const slam = clamp(f / 6);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0604" />
      <g transform="translate(540 1150) scale(1.6)"><Jar open={slam < 1} /></g>
      <g transform={`translate(540 ${400 + slam * 190}) scale(1.6)`}><rect x={-62} y={-17} width={124} height={34} rx={6} fill="#8a6a20" /><circle cx={0} cy={0} r={14} fill="#4a0a0a" /><path d="M0 -12 L8 7 L-10 -5 L10 -5 L-8 7 Z" fill="#e8c060" /></g>
      {slam >= 1 && f < 20 && <circle cx={540} cy={590} r={(f - 6) * 30} fill="none" stroke="#e8c060" strokeWidth={8} opacity={1 - (f - 6) / 14} />}
      {f > 15 && <g opacity={0.6 + 0.4 * Math.sin(f / 2)}><path d={`M${520 + Math.sin(f) * 4} 900 l-6 30 M${560 + Math.cos(f) * 4} 920 l8 26`} stroke="#3a3a44" strokeWidth={6} /></g>}
    </svg>
  );
};

const JDoor: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#060406" />
    <path d="M300 1400 L300 600 Q540 380 780 600 L780 1400 Z" fill="#000" stroke="#4a3a2a" strokeWidth={20} />
    <path d="M300 1400 L780 1400 L1000 1920 L80 1920 Z" fill="#1a140e" />
    <g transform="translate(320 1500) scale(0.9)"><path d="M-60 0 L-40 -260 Q0 -300 40 -260 L60 0 Z" fill={INK} stroke="#8a7a5a" strokeOpacity={0.5} strokeWidth={3} /><circle cx={0} cy={-300} r={36} fill={INK} stroke="#8a7a5a" strokeOpacity={0.5} strokeWidth={3} /></g>
    {(f % 70) < 55 && <g><circle cx={520} cy={900} r={7} fill={FIRE} /><circle cx={560} cy={900} r={7} fill={FIRE} /><circle cx={540} cy={900} r={60} fill={FIRE} opacity={0.08} /></g>}
    {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={540 + Math.sin(f / 10 + i) * 100} cy={1100 - ((f * 2 + i * 60) % 400)} r={30} fill={SMOKE} opacity={0.3} />)}
  </svg>
);

export const SHOTS15: Record<string, React.FC<ShotProps>> = {
  desertnight: DesertNight, smokeless: Smokeless, jruins: JRuins, solomon: Solomon, jnet: JNet, smokerise: SmokeRise,
  jgiant: JGiant, smokeback: SmokeBack, jseal: JSeal, jdoor: JDoor,
};
