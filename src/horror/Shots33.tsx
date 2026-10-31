import React from "react";
import { random } from "remotion";
import { ShotProps, Sky, Moon } from "./Shots";

/* Creature #33 — Garuda */
const W = 1080, H = 1920, INK = "#020304", BLOOD = "#c0101a", BONE = "#ddd5c0", GOLD = "#e8b030", FIRE = "#ff8a1a", NAGA = "#1e3a2a";
const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const GarudaFig: React.FC<{ f: number; s?: number; glow?: number; flap?: number; pot?: boolean }> = ({ f, s = 1, glow = 0.3, flap = 1, pot }) => {
  const a = Math.sin(f / 5) * 16 * flap;
  return (
    <g transform={`scale(${s})`}>
      <circle cx={0} cy={-200} r={340} fill={FIRE} opacity={glow * 0.25} />
      {[-1, 1].map((d) => (
        <g key={d} transform={`scale(${d} 1) rotate(${-a} 60 -260)`}>
          <path d="M60 -260 C200 -420 420 -480 600 -440 L560 -390 L610 -370 L540 -320 L590 -300 L510 -250 L550 -230 L460 -180 L480 -160 L360 -140 L240 -140 L80 -160 Z" fill="#b8401a" stroke={GOLD} strokeWidth={5} />
          {Array.from({ length: 7 }).map((_, i) => <path key={i} d={`M${150 + i * 55} ${-330 - i * 12} L${190 + i * 55} ${-160 - i * 4}`} stroke={GOLD} strokeOpacity={0.6} strokeWidth={4} />)}
          <path d="M80 -250 C220 -380 400 -430 560 -410" stroke="#ffcf3a" strokeWidth={6} fill="none" opacity={0.7} />
        </g>
      ))}
      <path d="M-40 -10 L-50 120 L-80 140 M40 -10 L50 120 L80 140" stroke="#c89a3a" strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d="M-80 140 l-20 20 M-80 140 l-4 26 M80 140 l20 20 M80 140 l4 26" stroke={BONE} strokeWidth={6} />
      <path d="M-90 -300 L90 -300 L70 0 L-70 0 Z" fill="#2a5aa0" stroke={GOLD} strokeWidth={5} />
      <path d="M-90 -300 L90 -300 L80 -240 L-80 -240 Z" fill={GOLD} />
      <rect x={-70} y={-60} width={140} height={22} fill={GOLD} />
      <path d="M-80 -280 L-150 -160 L-120 -150 M80 -280 L150 -160 L120 -150" stroke="#c89a3a" strokeWidth={24} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {pot && <g transform="translate(150 -170)"><ellipse rx={50} ry={60} fill={GOLD} /><ellipse cy={-56} rx={30} ry={10} fill="#ffe8a0" /><circle cy={-70} r={24} fill="#fff" opacity={0.3 + Math.sin(f / 3) * 0.2} /></g>}
      <g transform="translate(0 -370)">
        <circle r={70} fill="#c89a3a" />
        <path d="M-50 -10 L-120 20 Q-80 50 -40 30 Z" fill={GOLD} stroke="#8a5a10" strokeWidth={3} />
        <ellipse cx={-26} cy={-14} rx={13} ry={9} fill="#fff" /><circle cx={-28} cy={-14} r={6} fill="#a01a10" />
        <ellipse cx={26} cy={-14} rx={13} ry={9} fill="#fff" /><circle cx={24} cy={-14} r={6} fill="#a01a10" />
        <path d="M-60 -50 L-50 -120 L-26 -80 L0 -140 L26 -80 L50 -120 L60 -50 Z" fill={GOLD} stroke="#8a5a10" strokeWidth={4} />
        <circle cx={0} cy={-96} r={10} fill="#d0203a" />
      </g>
    </g>
  );
};

const Naga: React.FC<{ f: number; s?: number; tongue?: number; fork?: boolean; hood?: boolean; ph?: number; eye?: string }> = ({ f, s = 1, tongue = 1, fork = true, hood = true, ph = 0, eye = "#ffcf3a" }) => (
  <g transform={`scale(${s})`}>
    <path d={`M0 0 C-60 -80 60 -160 ${Math.sin(f / 8 + ph) * 20} -260`} stroke={NAGA} strokeWidth={50} fill="none" strokeLinecap="round" />
    <g transform={`translate(${Math.sin(f / 8 + ph) * 20} -280)`}>
      {hood && <path d="M-40 -20 C-110 0 -100 110 -30 160 L30 160 C100 110 110 0 40 -20 Z" fill={NAGA} stroke="#4a7a5a" strokeWidth={4} />}{hood && <path d="M-20 40 Q0 20 20 40 Q0 70 -20 40 Z" fill="#c8b06a" opacity={0.5} />}
      <ellipse rx={36} ry={42} fill="#2a4a36" />
      <ellipse cx={-14} cy={-6} rx={7} ry={5} fill={eye} /><ellipse cx={14} cy={-6} rx={7} ry={5} fill={eye} />
      {tongue > 0 && (fork
        ? <path d={`M0 40 L0 ${60 + tongue * 30} l-10 ${16 + Math.abs(Math.sin(f / 2)) * 6} M0 ${60 + tongue * 30} l10 ${16 + Math.abs(Math.sin(f / 2)) * 6}`} stroke={BLOOD} strokeWidth={5} fill="none" />
        : <path d={`M0 40 L0 ${80 + tongue * 30}`} stroke={BLOOD} strokeWidth={7} />)}
    </g>
  </g>
);

const Woman: React.FC<{ fill?: string; chain?: boolean; f?: number }> = ({ fill = "#5a2a4a", chain, f = 0 }) => (
  <g>
    <path d="M-80 0 L-50 -320 L50 -320 L80 0 Z" fill={fill} />
    <circle cx={0} cy={-360} r={40} fill="#a87a5a" />
    <path d="M-44 -380 Q-50 -300 -40 -250 M44 -380 Q50 -300 40 -250 M-44 -380 Q0 -420 44 -380" stroke="#1a0a0a" strokeWidth={16} fill="none" />
    <circle cx={0} cy={-370} r={5} fill="#d0203a" />
    {chain && <g>{Array.from({ length: 8 }).map((_, i) => <ellipse key={i} cx={-60 - i * 20} cy={-160 + Math.sin(i + f / 6) * 4} rx={10} ry={6} fill="none" stroke="#8a8a90" strokeWidth={4} />)}</g>}
  </g>
);

const Temple: React.FC<{ id: string; f: number; top?: string; bottom?: string }> = ({ id, f, top = "#2a1a30", bottom = "#08040a" }) => (
  <>
    <Sky top={top} bottom={bottom} id={id} />
    <path d="M380 1150 L380 640 L440 560 L500 460 L540 360 L580 460 L640 560 L700 640 L700 1150 Z" fill="#1a1012" />
    {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${400 + i * 4} ${1000 - i * 90} L${680 - i * 4} ${1000 - i * 90}`} stroke="#2a1a1c" strokeWidth={8} />)}
    <rect y={1150} width={W} height={H} fill="#0a0608" />
  </>
);

const GdSnake: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#040806" />
    <circle cx={540} cy={760} r={460} fill="#4a8a5a" opacity={0.06} />
    <g transform="translate(560 1100) scale(2.1)"><Naga f={f} tongue={1 + Math.sin(f / 3) * 0.6} /></g>
    <g transform="translate(540 260) scale(0.25)" opacity={0.25 + Math.sin(f / 8) * 0.1}><GarudaFig f={f} /></g>
  </svg>
);

const Sisters: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Temple id="gd1" f={f} />
    <g transform="translate(260 1150) scale(0.9)"><Woman fill="#2a3a2a" /></g>
    <g transform="translate(820 1150) scale(0.9)"><Woman fill="#7a4a2a" /></g>
    {Array.from({ length: 7 }).map((_, i) => <g key={i} transform={`translate(${120 + i * 50} 1150) scale(0.32)`}><Naga f={f} ph={i} /></g>)}
    {[760, 880].map((x, i) => <ellipse key={i} cx={x} cy={1120} rx={34} ry={44} fill="#e8dcc0" stroke={GOLD} strokeWidth={3} />)}
  </svg>
);

const Egg1: React.FC<ShotProps> = ({ f, dur }) => {
  const c = clamp(f / (dur * 0.3));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0604" />
      <circle cx={540} cy={800} r={420} fill={BLOOD} opacity={0.08} />
      <g transform="translate(540 900)">
        <path d={`M-150 0 C-150 -${200 + c * 20} 150 -${200 + c * 20} 150 0 L100 20 L60 -10 L20 30 L-20 -10 L-60 30 L-100 0 Z`} fill="#e8dcc0" transform={`translate(${-c * 80} ${-c * 40}) rotate(${-c * 20})`} />
        <path d="M-150 0 C-150 160 150 160 150 0 L100 20 L60 -10 L20 30 L-20 -10 L-60 30 L-100 0 Z" fill="#e8dcc0" />
        <g opacity={c} transform="translate(0 -40)">
          <circle r={60} fill="#e8a040" opacity={0.85} />
          <ellipse cx={-18} cy={-10} rx={10} ry={6} fill={BLOOD} /><ellipse cx={18} cy={-10} rx={10} ry={6} fill={BLOOD} />
          <path d="M-10 10 L-40 20 L-10 26 Z" fill={GOLD} />
        </g>
      </g>
      <g transform="translate(860 1150) scale(0.8)"><Woman fill="#7a4a2a" /></g>
    </svg>
  );
};

const Bet: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a2a3a" bottom="#0a0a10" id="gd2" />
    <rect y={1150} width={W} height={H} fill="#0a0a0e" />
    <g transform="translate(540 900)">
      <path d="M-200 0 C-200 -80 160 -90 200 -20 L240 -120 L280 -110 L240 20 L200 60 L-180 60 Z" fill="#e8e8f0" />
      {[-160, -100, 120, 180].map((x, i) => <path key={i} d={`M${x} 50 L${x} 240`} stroke="#e8e8f0" strokeWidth={24} />)}
      <path d={`M-200 0 Q-300 ${60 + Math.sin(f / 6) * 20} -280 200`} stroke="#0a0a0a" strokeWidth={30} fill="none" />
      {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M${-230 - i * 8} ${40 + i * 30} q-20 10 -10 30`} stroke={NAGA} strokeWidth={10} fill="none" />)}
    </g>
    <g transform="translate(160 1150) scale(0.7)"><Woman fill="#2a3a2a" /></g>
    <g transform="translate(920 1150) scale(0.7)"><Woman fill="#7a4a2a" chain f={f} /></g>
  </svg>
);

const Hatch: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp(f / (dur * 0.5));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#0a0402" />
      <circle cx={540} cy={760} r={200 + t * 500} fill={FIRE} opacity={0.15 + t * 0.15} />
      <circle cx={540} cy={760} r={100 + t * 250} fill="#ffcf3a" opacity={0.12} />
      <g transform={`translate(540 ${1000}) scale(${0.3 + t * 0.8})`}><GarudaFig f={f} glow={0.4 + t} flap={1 + t} /></g>
      {Array.from({ length: 16 }).map((_, i) => { const a = (i / 16) * Math.PI * 2; const r = 200 + t * 600; return <path key={i} d={`M${540 + Math.cos(a) * r * 0.3} ${760 + Math.sin(a) * r * 0.3} L${540 + Math.cos(a) * r} ${760 + Math.sin(a) * r}`} stroke="#ffcf3a" strokeWidth={4} opacity={0.4 * t} />; })}
      {t < 0.3 && <g transform="translate(540 900)"><ellipse rx={120} ry={160} fill="#e8dcc0" opacity={1 - t * 3} /></g>}
    </svg>
  );
};

const Deal: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <rect width={W} height={H} fill="#040806" />
    {Array.from({ length: 5 }).map((_, i) => <g key={i} transform={`translate(${140 + i * 200} 1150) scale(0.7)`}><Naga f={f} ph={i * 1.3} eye={BLOOD} /></g>)}
    <g transform="translate(540 520)"><ellipse rx={70} ry={84} fill={GOLD} /><ellipse cy={-78} rx={42} ry={14} fill="#ffe8a0" />{Array.from({ length: 10 }).map((_, i) => { const a = (i / 10) * Math.PI * 2 + f / 20; return <circle key={i} cx={Math.cos(a) * 140} cy={Math.sin(a) * 140} r={5} fill="#fff" opacity={0.6} />; })}</g>
    <text x={540} y={760} textAnchor="middle" fontFamily="Cinzel" fontWeight={900} fontSize={54} fill={GOLD}>AMRITA</text>
  </svg>
);

const Heaven: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#2a4a7a" bottom="#8a6a8a" id="gd3" />
    {Array.from({ length: 6 }).map((_, i) => <ellipse key={i} cx={((i * 240 + f * 3) % 1500) - 200} cy={1000 + (i % 3) * 80} rx={300} ry={60} fill="#fff" opacity={0.35} />)}
    <g transform={`translate(540 640) rotate(${f * 12})`}>{Array.from({ length: 8 }).map((_, i) => <path key={i} transform={`rotate(${i * 45})`} d="M0 0 L40 -260 L0 -300 L-10 -40 Z" fill="#c8d0dc" stroke="#fff" strokeWidth={3} />)}<circle r={40} fill={GOLD} /></g>
    {[-1, 1].map((d, k) => <g key={k} transform={`translate(${540 + d * 360} 1060) scale(${0.8 * d} 0.8)`}><Naga f={f} ph={k} eye={BLOOD} /><g transform="translate(0 -250)"><path d={`M0 30 Q${60 + Math.sin(f) * 10} 60 140 40 Q60 80 0 50 Z`} fill={FIRE} /></g></g>)}
    <g transform={`translate(${540 + Math.sin(f / 4) * 40} 560) scale(0.42)`}><GarudaFig f={f} glow={0.8} flap={2} /></g>
  </svg>
);

const Vajra: React.FC<ShotProps> = ({ f, dur }) => {
  const hit = f > dur * 0.3;
  return (
    <svg width={W} height={H}>
      <Sky top="#1a1a3a" bottom="#2a2a4a" id="gd4" />
      {hit && (f % 8) < 3 && <rect width={W} height={H} fill="#fff" opacity={0.25} />}
      <g transform="translate(540 820) scale(0.75)"><GarudaFig f={f} glow={0.6} flap={0.3} /></g>
      {hit && <path d={`M960 180 L760 420 L820 440 L620 640`} stroke="#fff" strokeWidth={10} fill="none" />}
      {hit && <path d={`M960 180 L760 420 L820 440 L620 640`} stroke="#9ad8ff" strokeWidth={30} fill="none" opacity={0.3} />}
      {hit && <g transform={`translate(${700 + Math.sin(f / 8) * 60} ${600 + (f - dur * 0.3) * 4}) rotate(${Math.sin(f / 6) * 30})`}><path d="M0 -60 C30 -30 30 30 0 60 C-30 30 -30 -30 0 -60 Z" fill="#b8401a" stroke={GOLD} strokeWidth={4} /><path d="M0 -60 L0 70" stroke={GOLD} strokeWidth={3} /></g>}
      <g transform="translate(960 180) rotate(30)"><path d="M0 -60 L16 -20 L0 0 L-16 -20 Z M0 60 L16 20 L0 0 L-16 20 Z" fill={GOLD} /></g>
    </svg>
  );
};

const Kusha: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#3a4a3a" bottom="#0e140e" id="gd5" />
    <rect y={1100} width={W} height={H} fill="#1a2a14" />
    {Array.from({ length: 50 }).map((_, i) => { const x = 280 + random(`ku${i}`) * 520; return <path key={i} d={`M${x} 1110 L${x + (random(`kv${i}`) - 0.5) * 30} ${980 - random(`kw${i}`) * 80}`} stroke="#8aaa4a" strokeWidth={4} />; })}
    <g transform="translate(540 990)"><ellipse rx={60} ry={72} fill={GOLD} /><ellipse cy={-66} rx={36} ry={12} fill="#ffe8a0" /></g>
    <g transform="translate(220 1150) scale(0.6)"><Woman fill="#7a4a2a" /></g>
    {Array.from({ length: 5 }).map((_, i) => <g key={i} transform={`translate(${780 + i * 60 + Math.min(f, 50) * 2} 1150) scale(0.4)`}><Naga f={f} ph={i} /></g>)}
    <g transform="translate(240 380) scale(0.3)"><GarudaFig f={f} /></g>
  </svg>
);

const Fork: React.FC<ShotProps> = ({ f, dur }) => {
  const t = clamp((f - dur * 0.3) / (dur * 0.3));
  return (
    <svg width={W} height={H}>
      <rect width={W} height={H} fill="#060806" />
      <g transform="translate(540 1050)">
        {Array.from({ length: 40 }).map((_, i) => { const x = (random(`fk${i}`) - 0.5) * 700; return <path key={i} d={`M${x} 60 L${x + (random(`fj${i}`) - 0.5) * 30} ${-120 - random(`fi${i}`) * 80}`} stroke="#8aaa4a" strokeWidth={5} />; })}
      </g>
      <g transform="translate(540 1080) scale(2.2)"><Naga f={f} hood tongue={1.2} fork={t > 0.5} /></g>
      {t > 0.4 && t < 0.8 && Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={540 + (random(`fd${i}`) - 0.5) * 60} cy={580 + 2.2 * 140 + ((f * 5 + i * 20) % 120)} r={6} fill={BLOOD} />)}
      <g transform={`translate(${200 + t * 1000} ${300 - t * 200}) scale(0.4)`} opacity={1 - t}><path d="M-100 0 Q0 -60 100 0 Q0 -20 -100 0 Z" fill="#3a3a6a" /><ellipse cx={30} cy={20} rx={30} ry={36} fill={GOLD} /></g>
    </svg>
  );
};

const Vishnu: React.FC<ShotProps> = ({ f }) => (
  <svg width={W} height={H}>
    <Sky top="#0a1a4a" bottom="#2a1a4a" id="gd6" />
    {Array.from({ length: 60 }).map((_, i) => <circle key={i} cx={random(`vs${i}`) * W} cy={random(`vt${i}`) * 1100} r={2} fill="#fff" opacity={0.4 + Math.sin(f / 10 + i) * 0.3} />)}
    <circle cx={540} cy={560} r={300} fill="#5ab8ff" opacity={0.12 + Math.sin(f / 10) * 0.04} />
    <g transform="translate(540 1060) scale(0.85)"><GarudaFig f={f} glow={0.7} /></g>
    <g transform="translate(540 500)" opacity={0.85}>
      <path d="M-70 120 L-50 -120 L50 -120 L70 120 Z" fill="#3a6ac0" opacity={0.6} />
      <circle cx={0} cy={-170} r={50} fill="#3a6ac0" opacity={0.6} />
      <circle cx={0} cy={-170} r={90} fill="none" stroke={GOLD} strokeWidth={6} />
      <g transform={`translate(-170 -80) rotate(${f * 6})`}><circle r={44} fill="none" stroke={GOLD} strokeWidth={8} />{Array.from({ length: 8 }).map((_, i) => <path key={i} transform={`rotate(${i * 45})`} d="M0 -44 L8 -60 L-8 -60 Z" fill={GOLD} />)}</g>
      <g transform="translate(170 -80)"><path d="M-20 30 C-40 -10 -10 -50 20 -40 C40 -30 30 10 10 30 Z" fill="#f4ecd8" stroke={GOLD} strokeWidth={3} /></g>
    </g>
  </svg>
);

export const SHOTS33: Record<string, React.FC<ShotProps>> = {
  gdsnake: GdSnake, sisters: Sisters, egg1: Egg1, bet: Bet, hatch: Hatch, deal: Deal,
  heaven: Heaven, vajra: Vajra, kusha: Kusha, fork: Fork, vishnu: Vishnu,
};
