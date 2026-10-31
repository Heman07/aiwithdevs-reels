import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";
import { Hero } from "./Shots24";

/* Creature #26 — Sphinx */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BONE = "#ddd5c0", SAND = "#c8a06a";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const SphinxFig: React.FC<{ f: number; s?: number; fill?: string; eye?: string; wings?: number; mouth?: number }> = ({ f, s = 1, fill = "#3a2818", eye = "#ffcf3a", wings = 1, mouth = 0 }) => {
  const st = { stroke: "#c8a06a", strokeOpacity: 0.55, strokeWidth: 4 } as const;
  const w = Math.sin(f / 14) * 4 * wings;
  return (
    <g transform={`scale(${s})`}>
      <defs><pattern id="nemes" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#c8a040" /><rect width="24" height="10" fill="#1a3a6a" /></pattern></defs>
      {wings > 0 && <g transform={`rotate(${-w} 60 -120)`}>
        <path d={`M60 -120 C120 ${-340 * wings} 300 ${-460 * wings} 460 ${-480 * wings} L420 ${-400 * wings} L470 ${-380 * wings} L400 ${-310 * wings} L440 ${-290 * wings} L360 ${-220 * wings} L380 ${-200 * wings} L280 -140 L200 -100 Z`} fill={fill} {...st} />
        {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M${150 + i * 50} ${-150 - i * 50 * wings} l60 40`} stroke="#c8a06a" strokeOpacity={0.35} strokeWidth={4} />)}
      </g>}
      <path d={`M300 0 C380 -20 420 ${-80 + Math.sin(f / 10) * 20} 400 -150`} stroke={fill} strokeWidth={18} fill="none" strokeLinecap="round" />
      <ellipse cx={120} cy={-40} rx={230} ry={90} fill={fill} {...st} />
      <path d="M-200 0 L-60 0 L-80 -60 Z" fill={fill} />
      {[-150, -60].map((x, i) => <g key={i}><path d={`M${x} -40 L${x - 120} 20 L${x - 140} 40 L${x - 40} 40 L${x + 20} 0 Z`} fill={fill} {...st} /><path d={`M${x - 140} 40 l-10 -14 M${x - 120} 40 l-6 -16 M${x - 100} 40 l-2 -16`} stroke={BONE} strokeWidth={4} /></g>)}
      {[220, 300].map((x, i) => <path key={i} d={`M${x} 0 L${x - 40} 40 L${x + 40} 40 L${x + 30} -10 Z`} fill={fill} {...st} />)}
      <path d="M-120 -60 C-150 -160 -120 -240 -60 -260 L0 -100 Z" fill={fill} {...st} />
      <path d="M-170 -250 C-200 -340 -150 -420 -80 -420 C-10 -420 20 -340 0 -250 C10 -170 -10 -120 -30 -60 L-150 -80 C-190 -140 -170 -200 -170 -250 Z" fill="url(#nemes)" stroke="#5a4010" strokeWidth={3} />
      <ellipse cx={-90} cy={-310} rx={62} ry={78} fill="#b88a5a" />
      <path d="M-152 -320 C-150 -400 -40 -410 -28 -320 C-60 -370 -120 -370 -152 -320 Z" fill="url(#nemes)" />
      <ellipse cx={-112} cy={-316} rx={12} ry={6} fill={eye} /><ellipse cx={-68} cy={-316} rx={12} ry={6} fill={eye} />
      <circle cx={-112} cy={-316} r={3} fill="#000" /><circle cx={-68} cy={-316} r={3} fill="#000" />
      <path d="M-124 -332 L-100 -326 M-56 -332 L-80 -326" stroke="#2a1a0a" strokeWidth={5} />
      {mouth > 0 ? <g><ellipse cx={-90} cy={-262} rx={20} ry={8 + mouth * 22} fill="#2a0404" /><path d={`M-104 -${262 + mouth * 8} l4 10 M-76 -${262 + mouth * 8} l-4 10`} stroke={BONE} strokeWidth={4} /></g>
        : <path d="M-108 -264 Q-90 -256 -72 -264" stroke="#5a1a10" strokeWidth={5} fill="none" />}
    </g>
  );
};

const Cliff: React.FC<{ f: number; id: string; night?: boolean }> = ({ f, id, night }) => (
  <>
    <Sky top={night ? "#1a1a2a" : "#4a3020"} bottom={night ? "#06060a" : "#120a06"} id={id} />
    {night ? <Moon x={240} y={360} r={90} f={f} /> : <circle cx={260} cy={360} r={120} fill="#ff9a4a" opacity={0.5} />}
    <path d="M0 1150 L0 820 L420 760 L560 820 L560 1150 Z" fill="#1a120c" />
    <path d="M560 1150 L1080 1150 L1080 1920 L0 1920 Z" fill="#0c0806" />
    <path d="M560 1150 Q820 1100 1080 1130" stroke="#2a1e14" strokeWidth={30} fill="none" />
  </>
);

const SxCliff: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Cliff f={f} id="sx1" />
    <g transform="translate(300 760) scale(0.75)"><SphinxFig f={f} /></g>
    {Array.from({ length: 8 }).map((_, i) => <g key={i} transform={`translate(${620 + random(`bn${i}`) * 400} ${1120 + random(`bm${i}`) * 30}) rotate(${random(`bo${i}`) * 180})`}><path d="M-30 0 L30 0" stroke={BONE} strokeWidth={8} /></g>)}
  </svg>
);

const SxReveal: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0a0604" />
    <circle cx={540} cy={760} r={480} fill="#ff9a4a" opacity={0.08} />
    <g transform="translate(520 1000) scale(1.25)"><SphinxFig f={f} /></g>
    {[["LION", 700, 1100], ["EAGLE", 860, 420], ["WOMAN", 200, 470]].map(([t, x, y], i) => <text key={i} x={x as number} y={y as number} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={44} fill="#ffcf3a" opacity={clamp((f - 10 - i * 15) / 10)}>{t}</text>)}
  </svg>
);

const SxGods: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a1a2a" bottom="#060408" id="sx2" />
    {Array.from({ length: 6 }).map((_, i) => <ellipse key={i} cx={((i * 220 + f) % 1400) - 160} cy={280 + (i % 3) * 80} rx={300} ry={70} fill="#3a2a3a" opacity={0.7} />)}
    {[-1, 0, 1].map((k) => <g key={k} transform={`translate(${540 + k * 280} ${360 + Math.abs(k) * 40})`}><ellipse cx={-26} cy={0} rx={22} ry={10} fill="#e8d0ff" opacity={0.8} /><ellipse cx={26} cy={0} rx={22} ry={10} fill="#e8d0ff" opacity={0.8} /></g>)}
    <path d="M0 1150 L1080 1150 L1080 1920 L0 1920 Z" fill="#0a0806" />
    {[180, 320, 460, 620, 780, 920].map((x, i) => <g key={i}><rect x={x - 50} y={1150 - 160 - (i % 3) * 40} width={100} height={160 + (i % 3) * 40} fill="#14100c" /><rect x={x - 14} y={1150 - 120} width={28} height={40} fill="#ffb43a" opacity={0.5} /></g>)}
    <g transform={`translate(540 ${400 + clamp(f / 60) * 500}) scale(${0.2 + clamp(f / 60) * 0.25})`}><SphinxFig f={f} eye={BLOOD} /></g>
  </svg>
);

const SxBones: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Cliff f={f} id="sx3" night />
    <g transform="translate(300 760) scale(0.6)"><SphinxFig f={f} eye={BLOOD} /></g>
    <path d="M560 1150 L560 900" stroke="#1a120c" strokeWidth={4} />
    <g transform="translate(780 1110)">
      <path d="M-250 40 Q0 -120 250 40 Z" fill="#8a8070" />
      {Array.from({ length: 22 }).map((_, i) => <g key={i} transform={`translate(${(random(`sb${i}`) - 0.5) * 420} ${-random(`sc${i}`) * 80 + 20}) rotate(${random(`sd${i}`) * 180})`}>{i % 4 === 0 ? <g><circle r={22} fill={BONE} /><circle cx={-7} cy={-2} r={5} fill="#000" /><circle cx={7} cy={-2} r={5} fill="#000" /></g> : <path d="M-30 0 L30 0" stroke={BONE} strokeWidth={9} strokeLinecap="round" />}</g>)}
    </g>
  </svg>
);

const SxCreon: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#0c0806" />
    {[200, 880].map((x, i) => <rect key={i} x={x - 40} y={300} width={80} height={850} fill="#1a1410" />)}
    <path d="M140 300 L940 300 L900 240 L180 240 Z" fill="#1a1410" />
    <g transform="translate(540 1150)">
      <rect x={-150} y={-250} width={300} height={250} fill="#3a2a14" /><rect x={-170} y={-430} width={340} height={200} fill="#3a2a14" />
      <path d="M-40 -260 L-50 -460 L50 -460 L40 -260 Z" fill="#1a1410" /><circle cx={0} cy={-500} r={40} fill="#1a1410" />
      <path d="M-34 -536 L-24 -566 L0 -546 L24 -566 L34 -536 Z" fill="#d8b040" />
      <path d="M-40 -440 L-140 -380 M40 -440 L140 -500" stroke="#1a1410" strokeWidth={24} strokeLinecap="round" />
    </g>
    <g transform="translate(240 1150)"><path d="M-30 0 L-40 -260 L40 -260 L30 0 Z" fill="#2a1a2a" /><circle cx={0} cy={-300} r={36} fill="#2a1a2a" /><path d="M-40 -330 Q0 -260 40 -330 L50 -200 L-50 -200 Z" fill="#1a0a1a" /></g>
    <g opacity={0.5 + Math.sin(f / 5) * 0.2}><path d="M760 1150 L760 1000" stroke="#1a1410" strokeWidth={4} /><path d="M700 1150 L820 1150 L790 1080 L730 1080 Z" fill={BLOOD} opacity={0.6} /></g>
  </svg>
);

const SxOedipus: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Cliff f={f} id="sx4" />
    <g transform="translate(300 760) scale(0.75)"><SphinxFig f={f} wings={1.2} /></g>
    <g transform={`translate(${1100 - Math.min(f, 50) * 5} 1150) scale(0.7)`}><Hero f={f} pelt={false} swing={-60} fill="#14100c" /></g>
  </svg>
);

const SxRiddle: React.FC<ShotProps> = ({ f, dur }) => {
  const n = Math.min(3, Math.floor((f / dur) * 4.5));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#060302" />
      <circle cx={540} cy={640} r={460} fill={BLOOD} opacity={0.08 + Math.sin(f / 4) * 0.03} />
      <g transform="translate(640 840) scale(1.25)"><SphinxFig f={f} mouth={Math.abs(Math.sin(f / 3)) * 0.8} wings={0.7} /></g>
      {[["4", "MORNING"], ["2", "NOON"], ["3", "EVENING"]].slice(0, n).map(([d, t], i) => (
        <g key={i} transform={`translate(${200 + i * 340} 1080)`}>
          <text textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={110} fill="#ffcf3a">{d}</text>
          <text y={50} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={30} fill="#ffcf3a" opacity={0.8}>{t}</text>
        </g>
      ))}
      <text x={900} y={360} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={170} fill={BLOOD} opacity={0.7 + Math.sin(f / 5) * 0.2}>?</text>
    </svg>
  );
};

const Person: React.FC<{ stage: number; f: number }> = ({ stage, f }) => {
  const c = "#e8d8b8";
  if (stage === 0) return <g><ellipse cx={0} cy={-50} rx={70} ry={30} fill={c} /><circle cx={-80} cy={-70} r={26} fill={c} />{[-50, -20, 30, 60].map((x, i) => <path key={i} d={`M${x} -30 L${x + Math.sin(f / 3 + i) * 8} 0`} stroke={c} strokeWidth={12} strokeLinecap="round" />)}</g>;
  return (
    <g transform={stage === 2 ? "rotate(12)" : ""}>
      <path d="M-14 0 L-10 -120 M14 0 L10 -120" stroke={c} strokeWidth={14} strokeLinecap="round" />
      <rect x={-26} y={-240} width={52} height={130} rx={10} fill={c} />
      <circle cx={0} cy={-270} r={28} fill={c} />
      {stage === 2 && <><path d="M26 -200 L70 -130" stroke={c} strokeWidth={12} /><path d="M70 -130 L60 0" stroke="#8a6a3a" strokeWidth={10} /></>}
    </g>
  );
};

const SxAnswer: React.FC<ShotProps> = ({ f, dur }) => {
  const t = f / dur;
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#140c06" />
      <text x={540} y={420} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={170} fill="#ffcf3a">MAN</text>
      {[0, 1, 2].map((k) => <g key={k} transform={`translate(${200 + k * 340} 1000)`} opacity={clamp((t - 0.2 - k * 0.22) * 6)}><Person stage={k} f={f} /></g>)}
      <path d="M100 1010 L980 1010" stroke="#3a2a1a" strokeWidth={6} />
    </svg>
  );
};

const SxFall: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp((f - 10) / (dur * 0.7));
  return (
    <svg width={W} height={H}>
      <Cliff f={f} id="sx5" />
      <g transform={`translate(${300 + t * 320} ${760 + t * t * 700}) rotate(${t * 140}) scale(0.75)`}><SphinxFig f={f} mouth={1} wings={0.8 + Math.sin(f) * 0.3} /></g>
      <g transform="translate(860 1150) scale(0.7)"><Hero f={f} pelt={false} swing={-140} fill="#14100c" /></g>
    </svg>
  );
};

const SxTruth: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#080404" />
    <circle cx={540} cy={760} r={420} fill={BLOOD} opacity={0.1} />
    <g transform="translate(400 1150)"><Hero f={f} pelt={false} swing={-170} fill="#1a1010" s={0.95} /></g>
    <g transform="translate(680 1150)">
      <path d="M-70 0 L-40 -260 L40 -260 L70 0 Z" fill="#2a1a2a" /><circle cx={0} cy={-300} r={36} fill="#2a1a2a" />
      <path d="M-30 -336 L-20 -362 L0 -346 L20 -362 L30 -336 Z" fill="#d8b040" />
      <path d="M-36 -330 Q-60 -200 -50 -120 M36 -330 Q60 -200 50 -120" stroke="#1a0a1a" strokeWidth={14} fill="none" />
    </g>
    {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={384 + (i % 2) * 34} cy={830 + ((f * 5 + i * 40) % 260)} r={6} fill={BLOOD} />)}
    <text x={540} y={420} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={80} fill={BLOOD} opacity={clamp((f - 30) / 15)}>MOTHER</text>
  </svg>
);

const Giza: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#0e1830" bottom="#3a2a30" id="sx6" />
    <Moon x={820} y={340} r={80} f={f} />
    <path d="M520 1000 L760 640 L1000 1000 Z" fill="#2a2018" /><path d="M760 640 L1000 1000 L840 1000 Z" fill="#1a140e" />
    <path d="M0 1000 Q540 960 1080 1000 V1920 H0 Z" fill="#6a5034" />
    <g transform="translate(400 1060)">
      <path d="M-300 0 L-300 -80 L120 -100 L200 -60 L220 0 Z" fill="#8a6a44" stroke="#5a4428" strokeWidth={4} />
      <path d="M-400 0 L-280 -20 L-260 0 Z M-420 -10 L-300 -30" stroke="#5a4428" strokeWidth={6} fill="#8a6a44" />
      <path d="M-260 -80 L-270 -250 L-140 -250 L-150 -80 Z" fill="#8a6a44" stroke="#5a4428" strokeWidth={4} />
      <path d="M-280 -250 L-205 -320 L-130 -250 L-120 -120 L-150 -120 L-150 -230 L-260 -230 L-260 -120 L-290 -120 Z" fill="#a8885a" />
      <ellipse cx={-222} cy={-200} rx={8} ry={4} fill="#ffcf3a" opacity={0.4 + Math.sin(f / 8) * 0.4} /><ellipse cx={-188} cy={-200} rx={8} ry={4} fill="#ffcf3a" opacity={0.4 + Math.sin(f / 8) * 0.4} />
    </g>
    <g transform="translate(250 1180)" opacity={0.85}>
      <rect x={-60} y={0} width={120} height={80} fill="#000" />
      <path d="M-60 0 L0 -40 L60 0" stroke="#5a4428" strokeWidth={6} fill="none" />
      <rect x={-20} y={20} width={40} height={60} fill="#ffcf3a" opacity={0.2 + Math.sin(f / 6) * 0.15} />
    </g>
  </svg>
);

export const SHOTS26: Record<string, React.FC<ShotProps>> = {
  sxcliff: SxCliff, sxreveal: SxReveal, sxgods: SxGods, sxbones: SxBones, sxcreon: SxCreon, sxoedipus: SxOedipus,
  sxriddle: SxRiddle, sxanswer: SxAnswer, sxfall: SxFall, sxtruth: SxTruth, giza: Giza,
};
