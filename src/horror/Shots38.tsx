import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #38 — Ouroboros */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BONE = "#ddd5c0", GOLD = "#e0b040", VENOM = "#9aff3a", SNK = "#1e4a32";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

/* ring serpent centered at 0,0 */
export const Ring: React.FC<{ f: number; r: number; w?: number; fill?: string; rot?: number; gap?: number; eye?: string }> = ({ f, r, w = 60, fill = SNK, rot = 0, gap = 0, eye = "#ffcf3a" }) => {
  const g = 0.35 + gap;
  const a0 = g, a1 = Math.PI * 2 - 0.12;
  const p = (a: number) => `${Math.cos(a) * r} ${Math.sin(a) * r}`;
  return (
    <g transform={`rotate(${rot})`}>
      <path d={`M${p(a0)} A${r} ${r} 0 1 1 ${p(a1)}`} stroke={fill} strokeWidth={w} fill="none" strokeLinecap="round" />
      <path d={`M${p(a0)} A${r} ${r} 0 1 1 ${p(a1)}`} stroke="#6aaa7a" strokeOpacity={0.4} strokeWidth={w + 4} fill="none" strokeDasharray={`4 ${w * 0.35}`} />
      <path d={`M${p(a1)} A${r} ${r} 0 0 1 ${p(Math.PI * 2 + 0.05)}`} stroke={fill} strokeWidth={w * 0.4} fill="none" strokeLinecap="round" />
      <g transform={`rotate(${(g - 0.05) * 57.3}) translate(${r} 0) rotate(-90)`}>
        <path d={`M${-w * 0.8} 0 C${-w * 0.9} ${-w * 1.2} ${w * 0.9} ${-w * 1.2} ${w * 0.8} 0 L${w * 0.4} ${w * 0.9} L${-w * 0.4} ${w * 0.9} Z`} fill={fill} stroke="#6aaa7a" strokeOpacity={0.6} strokeWidth={3} transform="rotate(180)" />
        <ellipse cx={-w * 0.4} cy={w * 0.4} rx={w * 0.14} ry={w * 0.1} fill={eye} /><ellipse cx={w * 0.4} cy={w * 0.4} rx={w * 0.14} ry={w * 0.1} fill={eye} />
        {gap > 0.05 && <path d={`M0 ${w * 1.2} l-8 ${w * 0.6} M0 ${w * 1.2} l8 ${w * 0.6}`} stroke={BLOOD} strokeWidth={4} />}
      </g>
    </g>
  );
};

const SelfEat: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / dur);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0c08" />
      <rect x={100} y={480} width={880} height={600} fill="#14180e" stroke="#3a3a2a" strokeWidth={14} />
      <rect x={100} y={480} width={880} height={600} fill="#9ad8ff" opacity={0.04} />
      <path d="M120 1060 L960 1060" stroke="#4a3a1a" strokeWidth={30} />
      <g transform="translate(540 820)"><Ring f={f} r={220 - t * 90} w={50} rot={f * 0.5} /></g>
    </svg>
  );
};

const RingShot: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#040604" />
    <circle cx={540} cy={760} r={480} fill={GOLD} opacity={0.05 + Math.sin(f / 8) * 0.02} />
    <g transform="translate(540 760)"><Ring f={f} r={330} w={90} rot={f * 0.6} /></g>
    <text x={540} y={790} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={80} fill={GOLD} opacity={0.35}>∞</text>
  </svg>
);

const Tut: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#140c04" />
    <rect x={140} y={260} width={800} height={900} fill="#c8a040" />
    <rect x={170} y={290} width={740} height={840} fill="#2a1a0a" />
    {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M200 ${320 + i * 80} L880 ${320 + i * 80}`} stroke="#c8a040" strokeWidth={2} opacity={0.3} />)}
    <g transform="translate(540 720)">
      <path d="M-40 260 L-50 -60 L50 -60 L40 260 Z" fill={GOLD} />
      <circle cx={0} cy={-110} r={50} fill={GOLD} />
      <path d="M-50 -130 L-70 -60 M50 -130 L70 -60" stroke="#1a3a6a" strokeWidth={14} />
      <ellipse cx={0} cy={-115} rx={14} ry={7} fill="#000" />
      <g transform="translate(0 -110)"><Ring f={f} r={90} w={18} fill={GOLD} eye="#000" /></g>
      <g transform="translate(0 200)"><Ring f={f} r={70} w={16} fill={GOLD} eye="#000" rot={180} /></g>
    </g>
    {Array.from({ length: 12 }).map((_, i) => <g key={i} transform={`translate(${240 + (i % 6) * 120} ${i < 6 ? 330 : 1090})`} opacity={0.6}>{i % 3 === 0 ? <g><circle cy={-14} r={10} fill="none" stroke={GOLD} strokeWidth={5} /><path d="M0 -4 L0 26 M-14 4 L14 4" stroke={GOLD} strokeWidth={5} /></g> : i % 3 === 1 ? <g><ellipse rx={18} ry={9} fill="none" stroke={GOLD} strokeWidth={4} /><circle r={5} fill={GOLD} /><path d="M-6 9 L-12 24" stroke={GOLD} strokeWidth={4} /></g> : <path d="M-16 10 Q0 -20 16 10 Z" fill={GOLD} />}</g>)}
  </svg>
);

const Sun: React.FC<ShotProps> = ({ f, dur }) => {
  const t = (f / dur) * Math.PI * 2;
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill={`rgb(${20 + Math.max(0, -Math.cos(t)) * 60},${14 + Math.max(0, -Math.cos(t)) * 40},${30})`} />
      <g transform="translate(540 760)">
        <Ring f={f} r={380} w={50} rot={f * 0.8} />
        <circle cx={Math.sin(t) * 250} cy={Math.cos(t) * 250} r={70} fill="#ffb43a" />
        <circle cx={Math.sin(t) * 250} cy={Math.cos(t) * 250} r={110} fill="#ffb43a" opacity={0.2} />
        <circle cx={-Math.sin(t) * 250} cy={-Math.cos(t) * 250} r={50} fill="#d8dce4" opacity={0.6} />
      </g>
    </svg>
  );
};

const Loki: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#1a1430" bottom="#06040a" id="ob1" />
    <rect y={1150} width={W} height={H} fill="#0a0810" />
    <circle cx={400} cy={760} r={300} fill={VENOM} opacity={0.05} />
    <g transform="translate(360 1150) scale(1.1)">
      <path d="M-60 0 L-50 -320 L50 -320 L60 0 Z" fill="#1a3a2a" />
      <circle cx={0} cy={-360} r={42} fill="#c8a888" />
      <path d="M-40 -390 L-70 -460 L-20 -400 M40 -390 L70 -460 L20 -400" stroke="#2a4a2a" strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M-20 -360 L-6 -356 M20 -360 L6 -356" stroke="#000" strokeWidth={4} />
      <path d="M-14 -336 Q0 -326 18 -340" stroke="#3a1a1a" strokeWidth={4} fill="none" />
      <path d="M50 -280 L140 -200" stroke="#1a3a2a" strokeWidth={24} strokeLinecap="round" />
    </g>
    <g transform={`translate(680 1150) scale(${0.5 + Math.sin(f / 30) * 0.02})`}>
      <path d={`M0 0 C-100 -120 100 -220 ${Math.sin(f / 8) * 30} -360`} stroke={SNK} strokeWidth={60} fill="none" strokeLinecap="round" />
      <g transform={`translate(${Math.sin(f / 8) * 30} -380)`}><ellipse rx={50} ry={40} fill={SNK} /><ellipse cx={-18} cy={-6} rx={8} ry={6} fill="#ffcf3a" /><ellipse cx={18} cy={-6} rx={8} ry={6} fill="#ffcf3a" /></g>
    </g>
  </svg>
);

const Midgard: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / (dur * 0.7));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#02040a" />
      {Array.from({ length: 70 }).map((_, i) => <circle key={i} cx={random(`ms${i}`) * W} cy={random(`mt${i}`) * H} r={1.5} fill="#fff" opacity={0.5} />)}
      <circle cx={540} cy={760} r={260} fill="#1a4a6a" />
      <path d="M360 640 Q440 600 480 680 Q520 760 460 800 Z M620 700 Q720 660 760 760 Q700 860 640 820 Z" fill="#2a5a3a" />
      <g transform="translate(540 760)"><Ring f={f} r={260 + 40 + (1 - t) * 0} w={40 + t * 50} rot={f * 0.4} gap={(1 - t) * 3} /></g>
    </svg>
  );
};

const LetGo: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp((f - dur * 0.3) / (dur * 0.4));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#06020a" />
      <circle cx={540} cy={760} r={480} fill={BLOOD} opacity={0.08 + t * 0.12} />
      <circle cx={540} cy={760} r={260} fill="#1a4a6a" />
      <path d="M360 640 Q440 600 480 680 Q520 760 460 800 Z M620 700 Q720 660 760 760 Q700 860 640 820 Z" fill="#2a5a3a" />
      <g transform="translate(540 760)"><Ring f={f} r={330} w={90} rot={f * 0.4} gap={t * 1.2} eye={BLOOD} /></g>
      {t > 0.5 && (f % 10) < 3 && <rect width={W} height={H} fill="#fff" opacity={0.12} />}
    </svg>
  );
};

const Warrior: React.FC<{ f: number; swing?: number; fill?: string; fall?: number }> = ({ f, swing = 0, fill = "#2a2a3a", fall = 0 }) => (
  <g transform={`rotate(${fall * 85} 0 0)`}>
    <path d="M-50 0 L-60 -280 L60 -280 L50 0 Z" fill={fill} />
    <path d="M-60 -280 L60 -280 L70 -200 L-70 -200 Z" fill="#6a4a2a" />
    <circle cx={0} cy={-320} r={42} fill="#c8a080" />
    <path d="M-42 -310 Q0 -220 42 -310 L40 -290 Q0 -250 -40 -290 Z" fill="#a84a1a" />
    <path d="M-44 -340 Q0 -390 44 -340" fill="#a84a1a" />
    <path d="M-50 -350 L50 -350 L44 -370 L-44 -370 Z" fill="#8a8a90" />
    <g transform={`rotate(${swing} 60 -260)`}>
      <path d="M60 -260 L140 -340" stroke={fill} strokeWidth={26} strokeLinecap="round" />
      <path d="M140 -340 L200 -440" stroke="#5a3a20" strokeWidth={12} />
      <rect x={160} y={-500} width={90} height={60} fill="#8a8a90" transform="rotate(30 205 -470)" />
    </g>
  </g>
);

const Thor: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#14181e" bottom="#04060a" id="ob2" />
    {(f % 25) < 4 && <rect width={W} height={H} fill="#dfe6ff" opacity={0.2} />}
    <rect y={1000} width={W} height={H} fill="#06141a" />
    {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${i * 200 - 100} ${1010 + Math.sin(f / 3 + i) * 30} q60 -120 140 0`} fill="#0a2a34" />)}
    <g transform="translate(760 1020)">
      <path d={`M200 100 C100 -100 -40 -200 ${-40 + Math.sin(f / 6) * 30} -440`} stroke={SNK} strokeWidth={110} fill="none" strokeLinecap="round" />
      <g transform={`translate(${-40 + Math.sin(f / 6) * 30} -480) rotate(-20)`}>
        <ellipse rx={110} ry={80} fill={SNK} stroke="#6aaa7a" strokeWidth={4} />
        <ellipse cx={-40} cy={-20} rx={18} ry={12} fill="#ffcf3a" /><ellipse cx={30} cy={-24} rx={18} ry={12} fill="#ffcf3a" />
        <path d="M-90 30 Q-200 60 -320 40" stroke={VENOM} strokeWidth={30} opacity={0.6} fill="none" />
        {Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={-120 - i * 30} cy={40 + Math.sin(f + i) * 20} r={10} fill={VENOM} opacity={0.6} />)}
      </g>
    </g>
    <g transform="translate(280 1150) scale(1.05)"><Warrior f={f} swing={-40 + Math.abs(Math.sin(f / 4)) * 110} /></g>
    {(f % 25) < 4 && <path d="M200 0 L240 300 L180 320 L260 620" stroke="#fff" strokeWidth={8} fill="none" />}
  </svg>
);

const NineSteps: React.FC<ShotProps> = ({ f, dur }) => {
  const step = Math.min(9, Math.floor(clamp((f - 10) / (dur * 0.7)) * 10));
  const fall = clamp((f - 10 - dur * 0.7) / 15);
  return (
    <svg width={W} height={H}>
      <Sky top="#1a1418" bottom="#060406" id="ob3" />
      <rect y={1150} width={W} height={H} fill="#0e0c0c" />
      <path d="M1080 1060 C900 1080 820 1140 700 1150" stroke={SNK} strokeWidth={90} fill="none" />
      {Array.from({ length: step }).map((_, i) => <g key={i}><ellipse cx={720 - i * 60} cy={1170 + (i % 2) * 20} rx={20} ry={8} fill={VENOM} opacity={0.5} /></g>)}
      <g transform={`translate(${720 - step * 60} 1150) scale(0.85)`}><Warrior f={f} swing={60} fall={fall} fill={`rgb(${42 - step * 2},${42 + step * 6},${58 - step * 3})`} /></g>
      <text x={540} y={520} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={200} fill={BLOOD} opacity={0.8}>{step}</text>
    </svg>
  );
};

const Kekule: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0e0a06" />
    <circle cx={300} cy={1000} r={300} fill="#ff8a1a" opacity={0.1 + Math.sin(f / 3) * 0.03} />
    <rect x={160} y={860} width={280} height={290} fill="#2a1a10" />
    {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M${220 + i * 22} 1100 Q${230 + i * 22 + Math.sin(f / 2 + i) * 10} ${1000 - (i % 3) * 40} ${240 + i * 22} 1100 Z`} fill={i % 2 ? "#ff8a1a" : "#ffcf3a"} opacity={0.8} />)}
    <g transform="translate(700 1150)">
      <rect x={-140} y={-200} width={280} height={60} fill="#3a2414" /><path d="M-130 -140 L-130 0 M130 -140 L130 0" stroke="#3a2414" strokeWidth={20} />
      <path d="M-60 -200 L-50 -420 L60 -420 L60 -200 Z" fill="#1a1a24" />
      <circle cx={-10} cy={-460} r={44} fill="#c8a888" />
      <path d="M-50 -470 Q-10 -520 34 -470" fill="#3a2a1a" />
      <path d="M-30 -440 Q-10 -400 20 -440" fill="#5a4a3a" />
    </g>
    {Array.from({ length: 6 }).map((_, i) => <g key={i} transform={`translate(${620 + (i % 2) * 160 + Math.sin(f / 10 + i) * 20} ${420 + Math.floor(i / 2) * 110})`} opacity={0.6}><text fontFamily="Cinzel" fontWeight={900} fontSize={50} fill="#9ad8ff">{["C", "H", "C", "H", "C", "H"][i]}</text></g>)}
    <text x={720} y={360} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={60} fill="#9ad8ff">C₆H₆ ?</text>
  </svg>
);

const Benzene: React.FC<ShotProps> = ({ f, dur }) => {
  const m = clamp((f - dur * 0.4) / (dur * 0.3));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#04060a" />
      <g transform="translate(540 760)">
        <g opacity={1 - m}><Ring f={f} r={260} w={70} rot={f * 0.8} /></g>
        <g opacity={m}>
          {Array.from({ length: 6 }).map((_, i) => { const a = (i / 6) * Math.PI * 2 - Math.PI / 2, b = ((i + 1) / 6) * Math.PI * 2 - Math.PI / 2; return <g key={i}><line x1={Math.cos(a) * 240} y1={Math.sin(a) * 240} x2={Math.cos(b) * 240} y2={Math.sin(b) * 240} stroke="#9ad8ff" strokeWidth={12} />{i % 2 === 0 && <line x1={Math.cos(a) * 200} y1={Math.sin(a) * 200} x2={Math.cos(b) * 200} y2={Math.sin(b) * 200} stroke="#9ad8ff" strokeWidth={8} />}<circle cx={Math.cos(a) * 240} cy={Math.sin(a) * 240} r={34} fill="#1a3a5a" stroke="#9ad8ff" strokeWidth={6} /><text x={Math.cos(a) * 240} y={Math.sin(a) * 240 + 16} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={40} fill="#fff">C</text></g>; })}
        </g>
      </g>
      <text x={540} y={1130} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={54} fill="#9ad8ff" opacity={m}>BENZENE RING</text>
    </svg>
  );
};

export const SHOTS38: Record<string, React.FC<ShotProps>> = {
  selfeat: SelfEat, oring: RingShot, tut: Tut, sun: Sun, loki: Loki, midgard: Midgard,
  letgo: LetGo, thor: Thor, ninesteps: NineSteps, kekule: Kekule, benzene: Benzene,
};
