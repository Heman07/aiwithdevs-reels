import React from "react";
import { random } from "remotion";

export type ShotProps = { f: number; dur: number; fx: string[]; scene: number };
const W = 1080, H = 1920;
const INK = "#020304";
const RIM = "#7fc8be";
const MOON = "#dfe9e4";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

/* ---------- shared pieces ---------- */
export const Sky: React.FC<{ top?: string; bottom?: string; id?: string }> = ({ top = "#1d4248", bottom = "#050b0c", id = "sky" }) => (
  <>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top} /><stop offset="1" stopColor={bottom} /></linearGradient>
      <radialGradient id="moonglow"><stop offset="0" stopColor={MOON} stopOpacity="0.75" /><stop offset="1" stopColor={MOON} stopOpacity="0" /></radialGradient>
    </defs>
    <rect width={W} height={H} fill={`url(#${id})`} />
  </>
);

export const Moon: React.FC<{ x?: number; y?: number; r?: number; f: number }> = ({ x = 740, y = 430, r = 105, f }) => (
  <g>
    <circle cx={x} cy={y} r={r * 3.2} fill="url(#moonglow)" />
    <circle cx={x} cy={y} r={r} fill={MOON} />
    <circle cx={x - r * 0.3} cy={y - r * 0.2} r={r * 0.18} fill="#c6d3cd" />
    <circle cx={x + r * 0.35} cy={y + r * 0.25} r={r * 0.24} fill="#c6d3cd" />
    {/* drifting cloud across moon */}
    <g transform={`translate(${((f * 1.6) % 1600) - 600} ${y - 40})`} opacity={0.85}>
      <ellipse cx={0} cy={0} rx={260} ry={40} fill="#0a1416" /><ellipse cx={120} cy={-25} rx={160} ry={38} fill="#0a1416" />
    </g>
  </g>
);

export const Mountains: React.FC<{ y?: number }> = ({ y = 1060 }) => (
  <g>
    <path d={`M0 ${y - 230} L120 ${y - 330} L230 ${y - 260} L360 ${y - 420} L470 ${y - 300} L600 ${y - 380} L720 ${y - 250} L860 ${y - 360} L980 ${y - 270} L1080 ${y - 320} V${y} H0 Z`} fill="#0e2125" />
    <path d={`M0 ${y - 110} L160 ${y - 200} L300 ${y - 130} L440 ${y - 220} L620 ${y - 120} L780 ${y - 210} L940 ${y - 120} L1080 ${y - 170} V${y} H0 Z`} fill="#071314" />
  </g>
);

export const Water: React.FC<{ y?: number; f: number; moonX?: number }> = ({ y = 1060, f, moonX = 740 }) => (
  <g>
    <rect x={0} y={y} width={W} height={H - y} fill="#020607" />
    {Array.from({ length: 16 }).map((_, i) => {
      const yy = y + 18 + i * 34;
      const w = 160 - i * 6 + Math.sin(f / 8 + i) * 30;
      return <rect key={i} x={moonX - w / 2 + Math.sin(f / 11 + i * 2) * 20} y={yy} width={Math.max(10, w)} height={4} fill={MOON} opacity={0.35 - i * 0.018} />;
    })}
    {Array.from({ length: 10 }).map((_, i) => (
      <path key={i} d={`M${((i * 173 + f * 0.8) % 1200) - 100} ${y + 60 + i * 70} q40 -8 80 0`} stroke={RIM} strokeWidth={2} fill="none" opacity={0.25} />
    ))}
  </g>
);

/** Long-necked lake creature silhouette. rise 0..1 */
const Nessie: React.FC<{ x: number; y: number; rise: number; f: number; s?: number; eyes?: boolean }> = ({ x, y, rise, f, s = 1, eyes }) => (
  <g transform={`translate(${x} ${y + (1 - rise) * 380}) scale(${s})`}>
    <path d={`M0 0 C10 -120 40 -260 110 -330 C150 -370 205 -365 222 -335 C232 -318 220 -304 196 -306 C160 -308 140 -290 128 -250 C104 -170 96 -80 100 0 Z`} fill={INK} stroke={RIM} strokeWidth={4} strokeOpacity={0.85} />
    {eyes && <circle cx={190} cy={-335} r={6} fill="#c8ff6a" opacity={0.6 + 0.4 * Math.sin(f / 5)} />}
    <path d={`M220 10 Q280 -70 340 10 Z`} fill={INK} stroke={RIM} strokeWidth={4} strokeOpacity={0.75} />
    <path d={`M390 14 Q430 -36 470 14 Z`} fill={INK} stroke={RIM} strokeWidth={4} strokeOpacity={0.7} />
    {[0, 1, 2].map((i) => <ellipse key={i} cx={60 + i * 180} cy={18} rx={90 + ((f + i * 20) % 40) * 2} ry={10} fill="none" stroke={MOON} strokeOpacity={0.25 - ((f + i * 20) % 40) / 200} strokeWidth={2} />)}
  </g>
);

/* ---------- shots ---------- */
const Loch: React.FC<ShotProps> = ({ f, dur, scene }) => {
  const rise = scene === 0 ? clamp(f / (dur * 0.9)) * 0.5 : clamp(f / (dur * 0.7));
  return (
    <svg width={W} height={H}>
      <Sky />
      <Moon f={f} />
      <Mountains />
      <Water f={f} />
      <Nessie x={240} y={1150} rise={rise} f={f} eyes={scene > 0} />
    </svg>
  );
};

const Horse: React.FC<{ f: number; eyesOn: number }> = ({ f, eyesOn }) => {
  const toss = Math.sin(f / 14) * 3;
  const st = { stroke: RIM, strokeWidth: 4, strokeOpacity: 0.8 } as const;
  return (
    <g>
      <path d={`M280 0 C350 20 380 ${130 + Math.sin(f / 9) * 18} 340 240 C320 150 300 80 270 30 Z`} fill={INK} {...st} />
      {[[-150, 0], [-95, 8], [170, 0], [225, 8]].map(([lx, o], i) => <path key={i} d={`M${lx} 60 L${lx - 6 + o} 310 L${lx + 26 + o} 310 L${lx + 34} 60 Z`} fill={INK} {...st} />)}
      <ellipse cx={40} cy={30} rx={260} ry={105} fill={INK} {...st} />
      <g transform={`rotate(${toss} -120 -40)`}>
        <path d="M-60 -50 L-120 60 L-250 -260 L-170 -310 Z" fill={INK} {...st} />
        <path d="M-160 -320 L-250 -330 L-400 -200 L-390 -160 L-330 -165 L-240 -220 Z" fill={INK} {...st} />
        <path d="M-200 -330 L-214 -372 L-176 -326 Z M-232 -330 L-250 -366 L-214 -328 Z" fill={INK} {...st} />
        {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M${-175 + i * 12} ${-305 + i * 26} q${30 + Math.sin(f / 7 + i) * 10} 6 ${44} 40`} stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />)}
        <circle cx={-300} cy={-262} r={9} fill="#b8ff9a" opacity={eyesOn * (0.7 + 0.3 * Math.sin(f / 4))} />
        <circle cx={-300} cy={-262} r={28} fill="#b8ff9a" opacity={eyesOn * 0.2} />
        <circle cx={-385} cy={-178} r={5} fill="#000" />
      </g>
    </g>
  );
};

const Kelpie: React.FC<ShotProps> = ({ f, scene }) => {
  const pull = scene === 3;
  return (
    <svg width={W} height={H}>
      <Sky top="#1a3c42" bottom="#040809" id="sk2" />
      <Moon x={300} y={360} r={80} f={f} />
      <Mountains y={1000} />
      <Water y={1000} f={f} moonX={300} />
      <g transform={`translate(${pull ? 560 + f * 2.2 : 600} ${pull ? 1020 + f * 0.9 : 1040}) scale(0.95)`}><Horse f={f} eyesOn={1} /></g>
      {/* shallow water over legs */}
      <rect x={0} y={1290} width={W} height={H - 1290} fill="#020607" opacity={0.92} />
      {Array.from({ length: 6 }).map((_, i) => <ellipse key={i} cx={620} cy={1300} rx={120 + ((f * 3 + i * 40) % 260)} ry={16 + ((f * 3 + i * 40) % 260) / 12} fill="none" stroke={RIM} strokeOpacity={0.35 - ((f * 3 + i * 40) % 260) / 800} strokeWidth={3} />)}
      {pull && (
        <g opacity={0.9}>
          {/* a hand reaching out of the water */}
          <path d={`M300 ${1500 + f * 1.4} l-14 -110 l10 0 l6 70 l4 -90 l10 0 l2 90 l8 -84 l10 2 l-4 88 l12 -64 l10 4 l-10 90 Q300 ${1560 + f * 1.4} 300 ${1500 + f * 1.4} Z`} fill="#0a0f10" stroke={RIM} strokeOpacity={0.5} strokeWidth={2} />
          {Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={260 + random(`b${i}`) * 100} cy={1480 - ((f * 4 + i * 30) % 200)} r={4 + random(`br${i}`) * 6} fill="none" stroke={MOON} strokeOpacity={0.4} />)}
        </g>
      )}
    </svg>
  );
};

const Monk: React.FC<ShotProps> = ({ f, scene }) => {
  const rising = scene === 5;
  const rise = rising ? clamp(f / 25) : clamp(f / 80) * 0.35;
  const arm = rising ? Math.min(1, f / 20) : 0;
  return (
    <svg width={W} height={H}>
      <Sky top="#4a2216" bottom="#0a0504" id="sk3" />
      <circle cx={540} cy={820} r={300} fill="#e0602a" opacity={0.35} /><circle cx={540} cy={820} r={170} fill="#ff9a4a" opacity={0.35} />
      <Mountains y={1020} />
      <Water y={1020} f={f} moonX={540} />
      {/* beast head rising */}
      <g transform={`translate(640 ${1180 + (1 - rise) * 500})`}>
        <path d="M0 0 C-10 -160 30 -300 120 -380 C170 -420 260 -400 280 -350 L330 -330 L250 -300 C220 -305 190 -290 175 -260 C130 -170 110 -80 120 0 Z" fill={INK} stroke="#e0702a" strokeOpacity={0.45} strokeWidth={3} />
        {/* jaw open */}
        <path d={`M250 -310 L340 ${-300 + arm * 40} L240 -290 Z`} fill={INK} />
        {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M${262 + i * 14} -318 l5 12 l5 -12`} fill="#e8e0cc" />)}
        <circle cx={222} cy={-358} r={7} fill="#ffcf5a" opacity={rise} />
      </g>
      {/* monk */}
      <g transform="translate(250 1260)">
        <path d="M-70 0 L-50 -260 Q0 -330 50 -260 L70 0 Z" fill={INK} stroke="#ff9a4a" strokeOpacity={0.7} strokeWidth={4} />
        <path d="M-40 -270 Q0 -360 40 -270 Q0 -250 -40 -270 Z" fill={INK} stroke="#ff9a4a" strokeOpacity={0.7} strokeWidth={4} />
        <g transform={`rotate(${-arm * 70} 30 -220)`}>
          <path d="M30 -220 L120 -160 L112 -146 L24 -200 Z" fill={INK} />
          <path d="M120 -230 L120 -90 M95 -200 L145 -200" stroke={INK} strokeWidth={12} transform="translate(0 0)" />
          <circle cx={120} cy={-160} r={rising ? 30 + 10 * Math.sin(f / 3) : 0} fill="#ffe7a0" opacity={0.25} />
        </g>
        <line x1={-60} y1={-200} x2={-90} y2={10} stroke={INK} strokeWidth={10} />
      </g>
    </svg>
  );
};

const Road: React.FC<ShotProps> = ({ f, dur, scene }) => {
  const cross = scene === 7 ? clamp(f / (dur * 0.85)) : -1;
  return (
    <svg width={W} height={H}>
      <Sky top="#163036" bottom="#030607" id="sk4" />
      <Moon x={860} y={330} r={70} f={f} />
      <Mountains y={900} />
      <Water y={900} f={f} moonX={860} />
      {/* road */}
      <path d="M0 1200 Q540 1080 1080 1180 L1080 1920 L0 1920 Z" fill="#05090a" />
      <path d="M0 1260 Q540 1140 1080 1240" stroke="#2a3434" strokeWidth={6} strokeDasharray="40 40" fill="none" />
      {/* headlight beams */}
      <path d="M180 1500 L1080 1150 L1080 1420 Z" fill="#fff2b0" opacity={0.12 + 0.03 * Math.sin(f / 3)} />
      <path d="M180 1520 L1080 1300 L1080 1600 Z" fill="#fff2b0" opacity={0.08} />
      {/* creature crossing */}
      {cross >= 0 && (
        <g transform={`translate(${1150 - cross * 900} 1400) scale(-0.8 0.8)`} stroke="#fff2b0" strokeOpacity={0.6} strokeWidth={4}>
          <path d="M0 0 C10 -120 40 -260 110 -330 C150 -370 205 -365 222 -335 C232 -318 220 -304 196 -306 C160 -308 140 -290 128 -250 C104 -170 96 -80 100 0 Z" fill={INK} />
          <ellipse cx={-120} cy={10} rx={260} ry={80} fill={INK} />
          <path d="M-370 10 Q-460 0 -520 40 Q-450 30 -370 40 Z" fill={INK} />
          {[-260, -180, 0, 60].map((lx, i) => <ellipse key={i} cx={lx} cy={70} rx={30} ry={50} fill={INK} transform={`rotate(${Math.sin(f / 4 + i) * 20} ${lx} 40)`} />)}
        </g>
      )}
      {/* car silhouette */}
      <g transform="translate(60 1560)">
        <path d="M0 0 L40 -70 L120 -110 L260 -110 L320 -60 L380 -50 L390 20 L0 20 Z" fill={INK} stroke="#3a4a48" strokeWidth={3} />
        <rect x={130} y={-100} width={110} height={40} fill="#0d1416" />
        <circle cx={80} cy={30} r={40} fill={INK} stroke="#3a4a48" strokeWidth={3} /><circle cx={310} cy={30} r={40} fill={INK} stroke="#3a4a48" strokeWidth={3} />
        <circle cx={385} cy={-20} r={16} fill="#fff6c8" /><circle cx={385} cy={-20} r={50} fill="#fff6c8" opacity={0.2} />
      </g>
    </svg>
  );
};

const Photo: React.FC<ShotProps> = ({ f, fx }) => {
  const hoax = fx.includes("glitch");
  const stampIn = hoax ? clamp((f - 30) / 8) : 0;
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0b0a09" />
      <g transform={`translate(540 860) rotate(${-4 + Math.sin(f / 40)})`}>
        <rect x={-400} y={-330} width={800} height={660} fill="#e8e0cc" />
        <rect x={-370} y={-300} width={740} height={520} fill="#6e675c" />
        <defs><linearGradient id="ph" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8a8274" /><stop offset="1" stopColor="#3a3630" /></linearGradient></defs>
        <rect x={-370} y={-300} width={740} height={520} fill="url(#ph)" />
        {Array.from({ length: 14 }).map((_, i) => <path key={i} d={`M-370 ${-120 + i * 24} q90 ${-8 + (i % 3) * 4} 185 0 t185 0 t185 0 t185 0`} stroke="#d8d0c0" strokeOpacity={0.25} fill="none" strokeWidth={2} />)}
        <g transform="translate(-40 120) scale(0.9)">
          <path d="M0 0 C6 -90 30 -190 80 -250 C104 -276 140 -272 150 -252 C156 -240 146 -232 132 -234 C108 -236 96 -222 90 -196 C74 -130 70 -60 72 0 Z" fill="#141210" />
          <ellipse cx={40} cy={4} rx={120} ry={12} fill="none" stroke="#d8d0c0" strokeOpacity={0.5} strokeWidth={3} />
        </g>
        <text x={0} y={290} textAnchor="middle" fontFamily="Fell" fontSize={44} fill="#3a3630">“The Surgeon’s Photograph” · 1934</text>
        {hoax && (
          <g opacity={stampIn} transform={`translate(0 -40) rotate(-14) scale(${1.6 - 0.6 * stampIn})`}>
            <rect x={-260} y={-90} width={520} height={180} fill="none" stroke="#d0202a" strokeWidth={14} />
            <text x={0} y={40} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={130} fill="#d0202a">HOAX</text>
            <text x={0} y={140} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={46} fill="#d0202a">REVEALED 1994</text>
          </g>
        )}
      </g>
    </svg>
  );
};

const Sonar: React.FC<ShotProps> = ({ f }) => {
  const ang = (f * 4) % 360;
  const blob = clamp((f - 30) / 40);
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#010a06" />
      <g transform="translate(540 860)">
        {[120, 240, 360, 440].map((r) => <circle key={r} r={r} fill="none" stroke="#1fd17a" strokeOpacity={0.35} strokeWidth={2} />)}
        <line x1={-460} y1={0} x2={460} y2={0} stroke="#1fd17a" strokeOpacity={0.25} /><line x1={0} y1={-460} x2={0} y2={460} stroke="#1fd17a" strokeOpacity={0.25} />
        <g transform={`rotate(${ang})`}>
          <path d="M0 0 L440 0 A440 440 0 0 0 381 -220 Z" fill="#1fd17a" opacity={0.18} />
          <line x1={0} y1={0} x2={440} y2={0} stroke="#5fffb0" strokeWidth={4} />
        </g>
        {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={(random(`sx${i}`) - 0.5) * 700} cy={(random(`sy${i}`) - 0.5) * 700} r={4} fill="#5fffb0" opacity={0.3 + 0.7 * Math.abs(Math.sin(f / 10 + i))} />)}
        <path d="M-60 140 C-20 110 60 100 120 130 C180 160 220 150 260 120 C240 170 180 200 100 190 C40 184 -20 190 -60 140 Z" fill="#5fffb0" opacity={blob * (0.5 + 0.4 * Math.sin(f / 4))} transform={`translate(${-f * 0.6} 0)`} />
      </g>
      <text x={90} y={1380} fontFamily="Cinzel" fontWeight={900} fontSize={44} fill="#1fd17a" opacity={0.8}>DEPTH {Math.min(230, Math.floor(f * 1.6))} M</text>
      <text x={90} y={1440} fontFamily="Cinzel" fontWeight={900} fontSize={44} fill={f % 20 < 10 ? "#ff4040" : "#1fd17a"} opacity={blob}>⚠ UNKNOWN CONTACT · 9 M</text>
    </svg>
  );
};

const Eel: React.FC<{ x: number; y: number; f: number; s: number; dir: number }> = ({ x, y, f, s, dir }) => {
  const pts = Array.from({ length: 12 }).map((_, i) => `${i * 30},${Math.sin(f / 5 + i * 0.6) * 18}`);
  return (
    <g transform={`translate(${x + dir * f * 2} ${y}) scale(${dir * s} ${s})`}>
      <polyline points={pts.join(" ")} fill="none" stroke="#0e1a1a" strokeWidth={26} strokeLinecap="round" />
      <polyline points={pts.join(" ")} fill="none" stroke={RIM} strokeOpacity={0.25} strokeWidth={2} />
      <circle cx={8} cy={Math.sin(f / 5) * 18 - 4} r={4} fill="#c8ff6a" opacity={0.7} />
    </g>
  );
};

const Abyss: React.FC<ShotProps> = ({ f, dur }) => {
  const depth = Math.floor(80 + (f / dur) * 150);
  return (
    <svg width={W} height={H}>
      <defs><linearGradient id="ab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b2a2c" /><stop offset="1" stopColor="#000" /></linearGradient></defs>
      <rect width={W} height={H} fill="url(#ab)" />
      {[200, 420, 650, 860].map((x, i) => <path key={i} d={`M${x} 0 L${x - 120} 1400 L${x - 40} 1400 Z`} fill="#6fd0c8" opacity={0.05 * (1 - f / dur)} />)}
      {Array.from({ length: 50 }).map((_, i) => <circle key={i} cx={random(`m${i}`) * W} cy={(random(`n${i}`) * H - f * (1 + random(`v${i}`) * 2) + H * 4) % H} r={1.5 + random(`r${i}`) * 2.5} fill="#cfe" opacity={0.25} />)}
      <Eel x={-300} y={700} f={f} s={1.2} dir={1} />
      <Eel x={1400} y={1050} f={f} s={1.6} dir={-1} />
      <Eel x={-500} y={1350} f={f} s={0.9} dir={1} />
      <text x={W - 90} y={1450} textAnchor="end" fontFamily="Cinzel" fontWeight={900} fontSize={54} fill="#6fd0c8" opacity={0.75}>−{depth} M</text>
    </svg>
  );
};

const Eyes: React.FC<ShotProps> = ({ f }) => {
  const open = clamp((f - 10) / 14);
  const blink = f > 60 && f < 66 ? 0.1 : 1;
  const e = open * blink;
  const eye = (cx: number) => (
    <g>
      <ellipse cx={cx} cy={760} rx={110} ry={60 * e} fill="#c8ff4a" opacity={0.92} />
      <ellipse cx={cx} cy={760} rx={16} ry={56 * e} fill="#000" />
      <ellipse cx={cx} cy={760} rx={220} ry={130 * e} fill="#c8ff4a" opacity={0.12} />
    </g>
  );
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#000" />
      <path d="M90 900 C160 560 920 560 990 900 C960 1100 120 1100 90 900 Z" fill="#050a08" stroke="#1a2a20" strokeWidth={4} opacity={open} />
      {eye(330)}{eye(750)}
      {Array.from({ length: 20 }).map((_, i) => <circle key={i} cx={random(`e${i}`) * W} cy={(random(`ey${i}`) * H - f * 1.5 + H * 4) % H} r={2} fill="#9fc" opacity={0.2} />)}
    </svg>
  );
};

export const SHOTS: Record<string, React.FC<ShotProps>> = {
  loch: Loch, kelpie: Kelpie, monk: Monk, road: Road, photo: Photo, sonar: Sonar, abyss: Abyss, eyes: Eyes,
};
