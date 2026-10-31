import React from "react";

/**
 * Jointed shadow-puppet characters (folk / Tholu Bommalata feel).
 * Local coords: x 0..300 centred at 150, feet at y=620. Rendered in viewBox "-100 -20 500 660".
 */

const INK = "#2a1a10";
const GOLD = "#e0ac4a";
const GOLD_D = "#a8742a";
const RED = "#c2452d";
const CREAM = "#f4e4c1";

type Crown = "mukut" | "peacock" | "jata" | "bun" | "monkey" | "monkeyplain" | "rishi" | "big" | "horns" | "pagdi" | "tiara" | "buffalo";
export type Prop = "bow" | "mace" | "trident" | "flute" | "veena" | "sword" | "pot" | "lotus" | "kamandalu" | "conch" | "chakra" | "rock" | "scroll" | "arrow" | "sieve" | "diya" | "noose" | "axe" | "none";
export type Pose = "idle" | "point" | "raise" | "pray" | "fight" | "sleep" | "lying" | "write" | "bless";

type Spec = {
  skin: string; cloth: string; cloth2: string; crown: Crown; prop: Prop;
  female?: boolean; wide?: boolean; turban?: string; fangs?: boolean; heads?: number; tail?: boolean; scale?: number; mustache?: boolean; beard?: boolean; third?: boolean;
};

export const CHARACTERS: Record<string, Spec> = {
  ravana: { skin: "#b4482f", cloth: "#4f8a4a", cloth2: GOLD, crown: "mukut", prop: "sword", heads: 10, mustache: true },
  hanuman: { skin: "#c8642a", cloth: "#c2452d", cloth2: GOLD, crown: "monkey", prop: "mace", tail: true },
  krishna: { skin: "#3d6fb0", cloth: "#e8b730", cloth2: RED, crown: "peacock", prop: "flute" },
  shiva: { skin: "#8fa3b8", cloth: "#d9822b", cloth2: INK, crown: "jata", prop: "trident", third: true },
  barbarik: { skin: "#c98b5a", cloth: "#7a2e2a", cloth2: GOLD, crown: "mukut", prop: "bow", mustache: true },
  lakshman: { skin: "#d29a66", cloth: "#e07b2a", cloth2: GOLD, crown: "mukut", prop: "bow" },
  urmila: { skin: "#d8a476", cloth: "#b8323a", cloth2: GOLD, crown: "bun", prop: "none", female: true },
  saraswati: { skin: "#e2b48a", cloth: "#f2ead8", cloth2: GOLD, crown: "bun", prop: "veena", female: true },
  kumbhakarna: { skin: "#6b4a3a", cloth: "#5b3b78", cloth2: GOLD, crown: "big", prop: "none", scale: 1.18, mustache: true },
  rishi: { skin: "#c68e5e", cloth: "#d9822b", cloth2: CREAM, crown: "rishi", prop: "kamandalu", beard: true },
  rama: { skin: "#2f6f8f", cloth: "#e8b730", cloth2: RED, crown: "mukut", prop: "bow" },
  sita: { skin: "#e0ab80", cloth: "#e39a20", cloth2: RED, crown: "bun", prop: "lotus", female: true },
  brahma: { skin: "#d9905a", cloth: "#c2452d", cloth2: GOLD, crown: "mukut", prop: "lotus", heads: 3, beard: true },
  kubera: { skin: "#d9a35a", cloth: "#2f7a6a", cloth2: GOLD, crown: "mukut", prop: "pot", wide: true, mustache: true },
  arjuna: { skin: "#c98b5a", cloth: "#2f4f8a", cloth2: GOLD, crown: "mukut", prop: "bow" },
  bhima: { skin: "#a86a3a", cloth: "#6a2a2a", cloth2: GOLD, crown: "mukut", prop: "mace", wide: true, mustache: true },
  kaikesi: { skin: "#b07050", cloth: "#6a3a8a", cloth2: GOLD, crown: "bun", prop: "none", female: true },
  rakshasa: { skin: "#3d5a3a", cloth: "#6a2a2a", cloth2: GOLD, crown: "horns", prop: "sword", mustache: true, fangs: true },
  vanara: { skin: "#9a5a2a", cloth: "#7a5a2a", cloth2: GOLD, crown: "monkeyplain", prop: "rock", tail: true },
  nidra: { skin: "#c8b0d8", cloth: "#2a2f6a", cloth2: "#c9d4f0", crown: "bun", prop: "lotus", female: true },
  veeravati: { skin: "#dcaa7e", cloth: "#c8202f", cloth2: GOLD, crown: "tiara", prop: "sieve", female: true },
  karwa: { skin: "#d0986a", cloth: "#e0701f", cloth2: GOLD, crown: "bun", prop: "diya", female: true },
  savitri: { skin: "#d8a476", cloth: "#e8b730", cloth2: RED, crown: "bun", prop: "none", female: true },
  draupadi: { skin: "#9a6440", cloth: "#7a2a7a", cloth2: GOLD, crown: "tiara", prop: "diya", female: true },
  parvati: { skin: "#e0b088", cloth: "#2f8a4a", cloth2: GOLD, crown: "tiara", prop: "lotus", female: true },
  brother: { skin: "#c98b5a", cloth: "#f2ead8", cloth2: GOLD, crown: "pagdi", prop: "diya", mustache: true, turban: "#e07b2a" },
  brother2: { skin: "#b87a4a", cloth: "#f2ead8", cloth2: RED, crown: "pagdi", prop: "sieve", mustache: true, turban: "#c2452d" },
  prince: { skin: "#c98b5a", cloth: "#7a2e4a", cloth2: GOLD, crown: "pagdi", prop: "none", mustache: true, turban: "#e8b730" },
  satyavan: { skin: "#b87a4a", cloth: "#d9822b", cloth2: CREAM, crown: "pagdi", prop: "axe", turban: "#f2ead8" },
  yama: { skin: "#3a4a5a", cloth: "#1f1410", cloth2: RED, crown: "buffalo", prop: "noose", mustache: true, wide: true },
  indra: { skin: "#e0b070", cloth: "#2f4f8a", cloth2: GOLD, crown: "mukut", prop: "sword" },
};

const rad = (d: number) => (d * Math.PI) / 180;
const rot = (L: number, deg: number) => [-L * Math.sin(rad(deg)), L * Math.cos(rad(deg))];

// arm angles: [leftShoulder, leftElbow, rightShoulder, rightElbow]; +deg swings hand toward -x
const poseAngles = (pose: Pose, f: number): number[] => {
  const s = Math.sin(f / 9);
  switch (pose) {
    case "point": return [12 + s * 4, -10, -125 + s * 6, -12];
    case "raise": return [150 + s * 10, 20, -150 - s * 10, -20];
    case "pray": return [18, -128, -18, 128];
    case "fight": { const w = Math.sin(f / 4); return [35, -40, -95 - w * 55, -25 - w * 20]; }
    case "write": return [20, -20, -70 + Math.sin(f / 3) * 12, -40 + Math.cos(f / 3) * 12];
    case "bless": return [15 + s * 3, -15, -40, -95];
    case "sleep": case "lying": return [5, -5, -5, 5];
    default: return [14 + s * 6, -18 + s * 4, -14 - s * 6, 18 - s * 4];
  }
};

const Head: React.FC<{ sp: Spec; closed?: boolean; small?: boolean }> = ({ sp, closed, small }) => {
  const monkey = sp.crown === "monkey" || sp.crown === "monkeyplain";
  const eye = (x: number) => closed
    ? <path d={`M${x - 10} 168 Q${x} 175 ${x + 10} 168`} stroke={INK} strokeWidth={3} fill="none" />
    : (<g>
        <path d={`M${x - 12} 168 Q${x} 156 ${x + 12} 168 Q${x} 177 ${x - 12} 168 Z`} fill={CREAM} stroke={INK} strokeWidth={2.5} />
        <circle cx={x + 1} cy={167.5} r={4.5} fill={INK} />
      </g>);
  return (
    <g>
      {/* hair behind */}
      {/* ears */}
      {monkey
        ? <><circle cx={108} cy={168} r={16} fill={sp.skin} stroke={INK} strokeWidth={2.5} /><circle cx={192} cy={168} r={16} fill={sp.skin} stroke={INK} strokeWidth={2.5} /></>
        : <><ellipse cx={111} cy={174} rx={7} ry={11} fill={sp.skin} stroke={INK} strokeWidth={2} /><ellipse cx={189} cy={174} rx={7} ry={11} fill={sp.skin} stroke={INK} strokeWidth={2} /></>}
      {!monkey && !small && <><circle cx={111} cy={192} r={7} fill="none" stroke={GOLD} strokeWidth={3.5} /><circle cx={189} cy={192} r={7} fill="none" stroke={GOLD} strokeWidth={3.5} /></>}
      {/* face */}
      <ellipse cx={150} cy={170} rx={38} ry={44} fill={sp.skin} stroke={INK} strokeWidth={3} />
      {monkey && <ellipse cx={150} cy={192} rx={26} ry={20} fill="#f0c48e" stroke={INK} strokeWidth={2.5} />}
      {/* brows */}
      <path d="M124 154 Q135 147 146 153" stroke={INK} strokeWidth={3} fill="none" />
      <path d="M154 153 Q165 147 176 154" stroke={INK} strokeWidth={3} fill="none" />
      {eye(135)}{eye(165)}
      <path d="M150 170 L146 186 L153 187" stroke={INK} strokeWidth={2.2} fill="none" />
      {sp.third && <ellipse cx={150} cy={142} rx={4} ry={8} fill={RED} stroke={INK} strokeWidth={1.5} />}
      {!sp.third && <path d="M146 128 L150 146 L154 128" fill={sp.female ? "none" : RED} stroke={RED} strokeWidth={2.5} />}
      {sp.female && <circle cx={150} cy={140} r={4} fill={RED} />}
      {sp.mustache
        ? <path d="M150 196 Q136 190 124 200 Q118 192 128 190 M150 196 Q164 190 176 200 Q182 192 172 190" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
        : null}
      <path d="M140 203 Q150 210 160 203" stroke="#8a2a1c" strokeWidth={3} fill="none" />
      {sp.fangs && <path d="M141 204 l3 10 l3 -9 M153 205 l3 9 l3 -10" fill={CREAM} stroke={INK} strokeWidth={1} />}
      {sp.crown === "horns" && (
        <g>
          <path d="M116 140 Q96 110 104 78 Q116 108 132 128 Z" fill={CREAM} stroke={INK} strokeWidth={2.5} />
          <path d="M184 140 Q204 110 196 78 Q184 108 168 128 Z" fill={CREAM} stroke={INK} strokeWidth={2.5} />
          <path d="M114 150 Q118 124 150 122 Q182 124 186 150 Q150 136 114 150 Z" fill="#1f1410" />
        </g>
      )}
      {sp.beard && <path d="M118 190 Q122 262 150 290 Q178 262 182 190 Q170 214 150 214 Q130 214 118 190 Z" fill="#ece6da" stroke={INK} strokeWidth={2} />}
      {/* headgear */}
      {(sp.crown === "mukut" || sp.crown === "big" || sp.crown === "peacock" || sp.crown === "monkey") && (
        <g transform={monkey ? "translate(150 128) scale(0.7) translate(-150 -128)" : undefined}>
          <path d="M112 140 L116 104 L131 114 L139 82 L150 52 L161 82 L169 114 L184 104 L188 140 Z" fill={GOLD} stroke={INK} strokeWidth={2.5} />
          <rect x={109} y={128} width={82} height={15} rx={4} fill={GOLD_D} stroke={INK} strokeWidth={2} />
          <circle cx={150} cy={110} r={7} fill={RED} stroke={INK} strokeWidth={1.5} />
          <circle cx={128} cy={135} r={4} fill={RED} /><circle cx={150} cy={135} r={4} fill="#3f6f6a" /><circle cx={172} cy={135} r={4} fill={RED} />
        </g>
      )}
      {sp.crown === "peacock" && (
        <g transform="translate(170 70) rotate(20)">
          <line x1={0} y1={30} x2={0} y2={-30} stroke="#2f5d3a" strokeWidth={3} />
          <ellipse cx={0} cy={-40} rx={14} ry={22} fill="#2f8a6a" stroke={INK} strokeWidth={2} />
          <ellipse cx={0} cy={-38} rx={7} ry={11} fill="#2a4fa0" />
          <circle cx={0} cy={-36} r={4} fill={GOLD} />
        </g>
      )}
      {sp.crown === "pagdi" && (
        <g>
          <path d="M108 150 Q104 104 150 98 Q196 104 192 150 Q170 136 150 140 Q130 136 108 150 Z" fill={sp.turban ?? RED} stroke={INK} strokeWidth={2.5} />
          <path d="M112 132 Q150 112 188 132 M114 120 Q150 104 186 122" stroke={INK} strokeWidth={1.8} fill="none" opacity={0.5} />
          <circle cx={150} cy={118} r={8} fill={GOLD} stroke={INK} strokeWidth={1.5} />
          <path d="M150 112 Q160 80 176 74 Q166 92 156 112 Z" fill={CREAM} stroke={INK} strokeWidth={1.5} />
        </g>
      )}
      {sp.crown === "buffalo" && (
        <g>
          <path d="M116 132 Q70 120 66 80 Q90 112 128 116 Z" fill={CREAM} stroke={INK} strokeWidth={2.5} />
          <path d="M184 132 Q230 120 234 80 Q210 112 172 116 Z" fill={CREAM} stroke={INK} strokeWidth={2.5} />
          <path d="M112 140 L118 100 L135 110 L150 76 L165 110 L182 100 L188 140 Z" fill={GOLD} stroke={INK} strokeWidth={2.5} />
          <circle cx={150} cy={116} r={7} fill={RED} />
        </g>
      )}
      {sp.crown === "jata" && (
        <g>
          <path d="M112 150 Q108 118 128 112 Q120 80 150 60 Q180 80 172 112 Q192 118 188 150 Q150 128 112 150 Z" fill="#3a2a2a" stroke={INK} strokeWidth={2.5} />
          <path d="M160 72 A16 16 0 1 0 176 92 A12 12 0 1 1 160 72 Z" fill={CREAM} />
          <path d="M122 140 Q150 120 178 140" stroke={GOLD} strokeWidth={3} fill="none" strokeDasharray="4 5" />
        </g>
      )}
      {(sp.crown === "bun" || sp.crown === "tiara") && (
        <g>
          <path d="M112 160 Q108 118 150 116 Q192 118 188 160 Q176 132 150 132 Q124 132 112 160 Z" fill="#1f1410" stroke={INK} strokeWidth={2} />
          <circle cx={186} cy={128} r={18} fill="#1f1410" />
          {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={172 + i * 7} cy={114 + Math.abs(i - 2) * 4} r={4} fill={CREAM} />)}
          <path d="M150 116 L150 134" stroke={GOLD} strokeWidth={2} /><circle cx={150} cy={136} r={5} fill={GOLD} />
          {sp.prop === "veena" && <path d="M120 122 L135 100 L150 112 L165 100 L180 122 Z" fill={GOLD} stroke={INK} strokeWidth={1.5} />}
        </g>
      )}
      {sp.crown === "tiara" && (
        <g>
          <path d="M116 126 L124 96 L137 108 L150 82 L163 108 L176 96 L184 126 Z" fill={GOLD} stroke={INK} strokeWidth={2} />
          <circle cx={150} cy={104} r={6} fill={RED} /><circle cx={128} cy={116} r={3.5} fill="#3f6f6a" /><circle cx={172} cy={116} r={3.5} fill="#3f6f6a" />
          <path d="M112 160 Q120 200 116 250" stroke={sp.cloth} strokeWidth={10} fill="none" opacity={0.85} />
        </g>
      )}
      {sp.female && (
        <g>
          <circle cx={150} cy={140} r={0} />
          <path d="M143 179 q-3 4 0 7" stroke={GOLD} strokeWidth={2} fill="none" />
          <circle cx={141} cy={186} r={3} fill="none" stroke={GOLD} strokeWidth={1.8} />
        </g>
      )}
      {sp.crown === "rishi" && (
        <g>
          <path d="M114 150 Q112 120 150 118 Q188 120 186 150 Q160 134 150 134 Q140 134 114 150 Z" fill="#ece6da" stroke={INK} strokeWidth={2} />
          <ellipse cx={150} cy={104} rx={20} ry={18} fill="#ece6da" stroke={INK} strokeWidth={2} />
          <path d="M140 112 Q150 96 160 112" stroke={RED} strokeWidth={2} fill="none" />
        </g>
      )}
    </g>
  );
};

const PropShape: React.FC<{ prop: Prop }> = ({ prop }) => {
  switch (prop) {
    case "bow": return (<g><path d="M14 -130 Q70 0 14 130" stroke={GOLD_D} strokeWidth={8} fill="none" strokeLinecap="round" /><line x1={14} y1={-130} x2={14} y2={130} stroke={CREAM} strokeWidth={1.5} /></g>);
    case "mace": return (<g><rect x={-6} y={-70} width={12} height={110} rx={4} fill={GOLD_D} stroke={INK} strokeWidth={2} /><circle cx={0} cy={-100} r={36} fill={GOLD} stroke={INK} strokeWidth={3} /><path d="M-36 -100 H36 M0 -136 V-64" stroke={GOLD_D} strokeWidth={4} /><circle cx={0} cy={-140} r={7} fill={GOLD} stroke={INK} strokeWidth={2} /></g>);
    case "trident": return (<g><rect x={-4} y={-210} width={8} height={330} fill={GOLD_D} stroke={INK} strokeWidth={1.5} /><path d="M-34 -230 Q-30 -190 0 -186 Q30 -190 34 -230 M0 -186 V-250" stroke={GOLD} strokeWidth={7} fill="none" strokeLinecap="round" /><path d="M-40 -235 L-34 -250 L-28 -235 M28 -235 L34 -250 L40 -235 M-6 -252 L0 -266 L6 -252" fill={GOLD} stroke={GOLD} strokeWidth={4} /><circle cx={0} cy={-170} r={8} fill={RED} /></g>);
    case "flute": return (<g transform="rotate(-60)"><rect x={-5} y={-80} width={10} height={130} rx={4} fill="#8a5a2a" stroke={INK} strokeWidth={1.5} />{[0, 1, 2, 3].map((i) => <circle key={i} cx={0} cy={-60 + i * 18} r={2.5} fill={INK} />)}<rect x={-6} y={-20} width={12} height={6} fill={GOLD} /></g>);
    case "veena": return (<g transform="rotate(-35)"><rect x={-7} y={-150} width={14} height={240} rx={5} fill="#8a5a2a" stroke={INK} strokeWidth={2} /><circle cx={0} cy={110} r={40} fill="#a86a2a" stroke={INK} strokeWidth={3} /><circle cx={0} cy={-140} r={22} fill="#a86a2a" stroke={INK} strokeWidth={2} /><path d="M-3 -150 V90 M3 -150 V90" stroke={CREAM} strokeWidth={1} /></g>);
    case "sword": return (<g><path d="M-9 -150 L0 -185 L9 -150 L9 0 L-9 0 Z" fill={CREAM} stroke={GOLD_D} strokeWidth={2} /><rect x={-28} y={0} width={56} height={10} rx={4} fill={GOLD} stroke={INK} strokeWidth={1.5} /><rect x={-6} y={10} width={12} height={30} fill={RED} /></g>);
    case "pot": return (<g><ellipse cx={0} cy={-10} rx={34} ry={30} fill={GOLD} stroke={INK} strokeWidth={3} /><rect x={-20} y={-46} width={40} height={12} rx={4} fill={GOLD_D} stroke={INK} strokeWidth={2} />{[-14, 0, 14].map((x, i) => <circle key={i} cx={x} cy={-52 - (i % 2) * 6} r={8} fill={GOLD} stroke={GOLD_D} strokeWidth={2} />)}<path d="M-26 -6 Q0 6 26 -6" stroke={RED} strokeWidth={4} fill="none" /></g>);
    case "lotus": return (<g><line x1={0} y1={0} x2={0} y2={-40} stroke="#2f5d3a" strokeWidth={4} />{[-50, -25, 0, 25, 50].map((a, i) => <path key={i} d="M0 -40 Q12 -62 0 -88 Q-12 -62 0 -40" fill={i % 2 ? "#e88aa0" : "#f4b0c0"} stroke={INK} strokeWidth={1.5} transform={`rotate(${a} 0 -40)`} />)}<circle cx={0} cy={-44} r={6} fill={GOLD} /></g>);
    case "kamandalu": return (<g><path d="M-26 -10 Q-30 30 0 34 Q30 30 26 -10 Q20 -24 0 -24 Q-20 -24 -26 -10 Z" fill="#8a5a2a" stroke={INK} strokeWidth={2.5} /><path d="M-18 -22 Q0 -60 18 -22" stroke="#8a5a2a" strokeWidth={5} fill="none" /><path d="M24 0 Q44 -6 48 -20" stroke="#8a5a2a" strokeWidth={6} fill="none" /></g>);
    case "conch": return (<g transform="rotate(-30)"><path d="M0 -40 Q30 -30 26 0 Q20 30 0 40 Q-14 20 -20 0 Q-22 -26 0 -40 Z" fill={CREAM} stroke={INK} strokeWidth={2.5} /><path d="M-6 -20 Q8 -10 -4 4 Q8 14 -2 26" stroke={GOLD_D} strokeWidth={2} fill="none" /></g>);
    case "chakra": return (<g transform="translate(0 -60)"><circle r={40} fill="none" stroke={GOLD} strokeWidth={6} /><circle r={12} fill={GOLD} />{Array.from({ length: 12 }).map((_, i) => <path key={i} d="M0 -40 L6 -54 L-6 -54 Z" fill={GOLD} transform={`rotate(${i * 30})`} />)}{Array.from({ length: 6 }).map((_, i) => <line key={i} x1={0} y1={-38} x2={0} y2={38} stroke={GOLD_D} strokeWidth={3} transform={`rotate(${i * 30})`} />)}<line x1={0} y1={40} x2={0} y2={60} stroke={GOLD_D} strokeWidth={4} /></g>);
    case "rock": return (<path d="M-38 -10 L-22 -46 L12 -52 L40 -24 L34 12 L-10 18 Z" fill="#7a7a72" stroke={INK} strokeWidth={3} />);
    case "scroll": return (<g><rect x={-30} y={-50} width={60} height={70} fill={CREAM} stroke={INK} strokeWidth={2} />{[0, 1, 2, 3].map((i) => <line key={i} x1={-20} y1={-36 + i * 14} x2={20} y2={-36 + i * 14} stroke={GOLD_D} strokeWidth={2} />)}<rect x={-36} y={-58} width={72} height={10} rx={5} fill="#8a5a2a" /><rect x={-36} y={16} width={72} height={10} rx={5} fill="#8a5a2a" /></g>);
    case "arrow": return (<g><line x1={0} y1={60} x2={0} y2={-120} stroke={GOLD_D} strokeWidth={5} /><path d="M0 -140 L10 -114 L-10 -114 Z" fill={CREAM} stroke={INK} strokeWidth={1.5} /><path d="M0 60 l-10 14 M0 60 l10 14 M0 48 l-10 14 M0 48 l10 14" stroke={RED} strokeWidth={3} /></g>);
    case "sieve": return (<g transform="translate(0 -70)"><circle r={52} fill="#c8a060" stroke={INK} strokeWidth={4} /><circle r={42} fill="#3a2a1a" opacity={0.6} />{Array.from({ length: 7 }).map((_, i) => <line key={i} x1={-40 + i * 13} y1={-40} x2={-40 + i * 13} y2={40} stroke="#c8a060" strokeWidth={1.5} />)}{Array.from({ length: 7 }).map((_, i) => <line key={`h${i}`} x1={-40} y1={-40 + i * 13} x2={40} y2={-40 + i * 13} stroke="#c8a060" strokeWidth={1.5} />)}<rect x={-6} y={50} width={12} height={22} fill="#8a5a2a" /></g>);
    case "diya": return (<g><path d="M-30 -6 Q0 22 30 -6 Q20 -14 -20 -14 Z" fill="#c0652a" stroke={INK} strokeWidth={2.5} /><path d="M0 -14 Q-8 -30 0 -50 Q8 -30 0 -14" fill={GOLD} /><path d="M0 -18 Q-4 -28 0 -38 Q4 -28 0 -18" fill={CREAM} /><circle cx={0} cy={-30} r={26} fill={GOLD} opacity={0.25} /></g>);
    case "noose": return (<g><path d="M0 0 Q30 -40 10 -80" stroke="#c8a060" strokeWidth={5} fill="none" /><ellipse cx={10} cy={-105} rx={30} ry={26} fill="none" stroke="#c8a060" strokeWidth={6} /></g>);
    case "axe": return (<g><rect x={-5} y={-120} width={10} height={160} rx={4} fill="#8a5a2a" stroke={INK} strokeWidth={1.5} /><path d="M5 -120 Q50 -125 55 -90 Q30 -85 5 -80 Z" fill="#a8a8a0" stroke={INK} strokeWidth={2} /></g>);
    default: return null;
  }
};

const Arm: React.FC<{ sp: Spec; sx: number; sh: number; el: number; prop?: Prop; swing?: number }> = ({ sp, sx, sh, el, prop, swing = 0 }) => (
  <g transform={`translate(${sx} 240) rotate(${sh})`}>
    <rect x={-12} y={-6} width={24} height={84} rx={12} fill={sp.skin} stroke={INK} strokeWidth={2.5} />
    <rect x={-13} y={18} width={26} height={8} rx={3} fill={GOLD} stroke={INK} strokeWidth={1} />
    <g transform={`translate(0 76) rotate(${el})`}>
      <rect x={-10} y={-4} width={20} height={80} rx={10} fill={sp.skin} stroke={INK} strokeWidth={2.5} />
      <rect x={-11} y={56} width={22} height={7} rx={3} fill={GOLD} stroke={INK} strokeWidth={1} />
      {prop && prop !== "none" && (
        <g transform={`translate(0 84) rotate(${-(sh + el) + swing})`}><PropShape prop={prop} /></g>
      )}
      <circle cx={0} cy={84} r={13} fill={sp.skin} stroke={INK} strokeWidth={2.5} />
    </g>
    {/* puppet joint rivet */}
    <circle cx={0} cy={76} r={5} fill={GOLD} stroke={INK} strokeWidth={1.5} />
    <circle cx={0} cy={0} r={6} fill={GOLD} stroke={INK} strokeWidth={1.5} />
  </g>
);

const Body: React.FC<{ sp: Spec; pose: Pose; f: number; propOverride?: Prop }> = ({ sp, pose, f, propOverride }) => {
  const [ls, le, rs, re] = poseAngles(pose, f);
  const heads = sp.heads ?? 1;
  const closed = pose === "sleep" || pose === "lying";
  const big = sp.crown === "big" || !!sp.wide;
  const swing = pose === "fight" ? Math.sin(f / 4) * 30 : 0;
  // props: bow/veena/flute in left hand; weapons in right
  const prop = propOverride ?? sp.prop;
  const leftProp: Prop | undefined = ["bow", "veena", "pot", "lotus", "kamandalu", "scroll", "sieve", "diya"].includes(prop) ? prop : undefined;
  const rightProp: Prop | undefined = leftProp ? undefined : prop;
  const noProps = pose === "pray" || pose === "sleep" || pose === "lying";

  // string anchor points
  const hand = (sx: number, sh: number, el: number) => {
    const [ex, ey] = rot(76, sh);
    const [hx, hy] = rot(84, sh + el);
    return [sx + ex + hx, 240 + ey + hy];
  };
  const [lhx, lhy] = hand(104, ls, le);
  const [rhx, rhy] = hand(196, rs, re);

  return (
    <g>
      {pose !== "sleep" && pose !== "lying" && (
        <g stroke={CREAM} strokeWidth={1.2} opacity={0.35}>
          <line x1={150} y1={-40} x2={150} y2={60} />
          <line x1={lhx - 10} y1={-40} x2={lhx} y2={lhy} />
          <line x1={rhx + 10} y1={-40} x2={rhx} y2={rhy} />
        </g>
      )}
      {sp.tail && (
        <path d={`M180 380 Q260 ${360 + Math.sin(f / 8) * 15} 250 260 Q240 ${190 + Math.sin(f / 6) * 10} 285 180 Q300 170 290 155`}
          stroke={sp.skin} strokeWidth={14} fill="none" strokeLinecap="round" />
      )}
      {/* extra heads (behind) */}
      {heads > 1 && (heads === 3 ? [-1, 1] : [-4, -3, -2, -1, 1, 2, 3, 4, 5].slice(0, heads - 1)).map((k) => (
        <g key={k} transform={`translate(${k * 40} ${Math.abs(k) * 6 + 6}) translate(150 170) scale(0.82) translate(-150 -170)`}>
          <Head sp={sp} small closed={closed} />
        </g>
      ))}
      {/* legs */}
      {sp.female ? (
        <g>
          <path d="M116 380 L184 380 L214 612 L86 612 Z" fill={sp.cloth} stroke={INK} strokeWidth={2.5} />
          {[0, 1, 2, 3].map((i) => <line key={i} x1={140 + i * 8} y1={392} x2={128 + i * 16} y2={606} stroke={INK} strokeWidth={1} opacity={0.4} />)}
          <rect x={86} y={592} width={128} height={18} fill={sp.cloth2} stroke={INK} strokeWidth={1.5} />
          <ellipse cx={128} cy={616} rx={16} ry={6} fill={sp.skin} stroke={INK} strokeWidth={2} />
          <ellipse cx={172} cy={616} rx={16} ry={6} fill={sp.skin} stroke={INK} strokeWidth={2} />
        </g>
      ) : (
        <g>
          <rect x={118} y={490} width={22} height={118} rx={8} fill={sp.skin} stroke={INK} strokeWidth={2.5} />
          <rect x={160} y={490} width={22} height={118} rx={8} fill={sp.skin} stroke={INK} strokeWidth={2.5} />
          <rect x={116} y={588} width={26} height={7} fill={GOLD} /><rect x={158} y={588} width={26} height={7} fill={GOLD} />
          <ellipse cx={124} cy={614} rx={20} ry={7} fill={sp.skin} stroke={INK} strokeWidth={2} />
          <ellipse cx={176} cy={614} rx={20} ry={7} fill={sp.skin} stroke={INK} strokeWidth={2} />
          <path d={big ? "M100 380 L200 380 L216 512 L84 512 Z" : "M114 380 L186 380 L204 508 L96 508 Z"} fill={sp.cloth} stroke={INK} strokeWidth={2.5} />
          <path d={big ? "M84 500 L216 500" : "M96 498 L204 498"} stroke={sp.cloth2} strokeWidth={8} />
          <path d="M150 386 L144 500 L156 500 Z" fill={sp.cloth2} opacity={0.8} />
          {sp.crown === "jata" && [0, 1, 2, 3].map((i) => <path key={i} d={`M${108 + i * 25} ${400 + (i % 2) * 30} q8 14 0 28`} stroke={INK} strokeWidth={4} fill="none" />)}
        </g>
      )}
      {(sp.crown === "jata" || sp.female) && pose !== "sleep" && pose !== "lying" && <path d="M108 160 Q96 250 116 300 L184 300 Q204 250 192 160 Z" fill={sp.crown === "jata" ? "#3a2a2a" : "#1f1410"} />}
      {/* left arm behind torso */}
      <Arm sp={sp} sx={104} sh={ls} el={le} prop={noProps ? undefined : leftProp} />
      {/* torso */}
      {sp.female ? (
        <g>
          <path d="M112 236 Q150 224 188 236 L180 330 L120 330 Z" fill={sp.cloth} stroke={INK} strokeWidth={2.5} />
          <path d="M120 330 L180 330 L184 384 L116 384 Z" fill={sp.skin} stroke={INK} strokeWidth={2.5} />
          <path d="M112 236 L140 236 L190 384 L162 384 Z" fill={sp.cloth} stroke={INK} strokeWidth={2} />
          <path d="M140 236 L190 384" stroke={sp.cloth2} strokeWidth={6} />
        </g>
      ) : (
        <g>
          <path d={big ? "M100 236 Q150 220 200 236 L208 330 Q210 380 196 386 L104 386 Q90 380 92 330 Z" : "M110 236 Q150 222 190 236 L182 386 L118 386 Z"} fill={sp.skin} stroke={INK} strokeWidth={2.5} />
          <path d="M126 268 Q138 278 148 268 M152 268 Q162 278 174 268" stroke={INK} strokeWidth={2} fill="none" opacity={0.5} />
          {!sp.beard && <path d="M114 244 L184 378" stroke={sp.cloth2 === INK ? GOLD : CREAM} strokeWidth={4} opacity={0.9} />}
        </g>
      )}
      <rect x={sp.female ? 114 : big ? 98 : 112} y={376} width={sp.female ? 72 : big ? 104 : 76} height={12} rx={4} fill={GOLD} stroke={INK} strokeWidth={1.5} />
      {/* neck + necklace */}
      <rect x={138} y={200} width={24} height={40} fill={sp.skin} stroke={INK} strokeWidth={2} />
      <path d="M120 238 Q150 270 180 238" stroke={GOLD} strokeWidth={6} fill="none" />
      <circle cx={150} cy={262} r={7} fill={RED} stroke={GOLD} strokeWidth={3} />
      {sp.crown === "jata" && <path d="M126 236 Q150 290 176 236" stroke="#3f6f6a" strokeWidth={7} fill="none" />}
      <Head sp={sp} closed={closed} />
      <Arm sp={sp} sx={196} sh={rs} el={re} prop={noProps ? undefined : rightProp} swing={swing} />
    </g>
  );
};

export const Puppet: React.FC<{ id: string; pose?: Pose; f: number; flip?: boolean; prop?: Prop }> = ({ id, pose = "idle", f, flip, prop }) => {
  const sp = CHARACTERS[id] ?? CHARACTERS.rishi;
  const sc = sp.scale ?? 1;
  const sway = Math.sin(f / 22) * 2;
  const bob = Math.abs(Math.sin(f / 11)) * -6;
  let t = `translate(0 ${bob}) rotate(${sway} 150 620) translate(150 620) scale(${flip ? -sc : sc} ${sc}) translate(-150 -620)`;
  if (pose === "sleep" || pose === "lying") {
    const breathe = pose === "lying" ? 1 : 1 + Math.sin(f / 14) * 0.015;
    t = `translate(150 530) rotate(-90) scale(${0.78 * sc * breathe}) translate(-150 -400)`;
  }
  return (
    <svg viewBox="-100 -40 500 680" width="100%" height="100%" style={{ overflow: "visible" }}>
      <g transform={t}><Body sp={sp} pose={pose} f={f} propOverride={prop} /></g>
      {pose === "sleep" && [0, 1, 2].map((i) => {
        const p = ((f / 40 + i / 3) % 1);
        return <text key={i} x={-10 + p * 50} y={430 - p * 170} fontSize={30 + p * 30} fill={CREAM} opacity={1 - p} fontFamily="serif">z</text>;
      })}
    </svg>
  );
};
