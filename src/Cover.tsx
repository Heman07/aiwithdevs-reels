import React from "react";
import { AbsoluteFill } from "remotion";
import { Puppet, Pose, Prop } from "./Puppet";
import { PropsLayer, StageProp } from "./Props";
import { ThemeBackground, THEMES } from "./Themes";

export type CoverSpec = {
  title: string; sub?: string; theme?: string;
  chars?: { id: string; pose?: Pose; x?: number; prop?: Prop }[];
  props?: StageProp[];
};

const GOLD = "#e0ac4a", CREAM = "#f4e4c1", RED = "#e0573a";

/** 1080x1920 cover. Instagram grid shows the centre 1080x1440 (y 240–1680), so everything important lives there. */
export const Cover: React.FC<{ cover: CoverSpec; series?: string; episode?: number; handle?: string }> = ({ cover, series, episode, handle }) => {
  const f = 60;
  const t = THEMES[cover.theme ?? "royal"] ?? THEMES.royal;
  const chars = cover.chars ?? [];
  const defaultX = chars.length === 1 ? [0.5] : chars.length === 2 ? [0.3, 0.7] : [0.2, 0.5, 0.8];
  const sc = chars.length > 1 ? 0.78 : 0.95;
  return (
    <AbsoluteFill>
      <ThemeBackground name={cover.theme ?? "royal"} />
      {cover.props && <PropsLayer props={cover.props} f={f} behind />}
      {chars.map((c, i) => {
        const w = 680 * sc, h = 925 * sc;
        const x = (c.x ?? defaultX[i]) * 1080;
        return (
          <div key={i} style={{ position: "absolute", left: x - w / 2, top: 1440 - h * 0.97, width: w, height: h, filter: "drop-shadow(0 18px 26px rgba(0,0,0,0.6))" }}>
            <Puppet id={c.id} pose={c.pose} prop={c.prop} f={f + i * 13} />
          </div>
        );
      })}
      {cover.props && <PropsLayer props={cover.props} f={f} behind={false} />}

      {/* top: series pill + title */}
      <div style={{ position: "absolute", top: 270, width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ fontFamily: "Tiro", fontSize: 46, color: "#1a0f08", background: t.accent, padding: "6px 34px", borderRadius: 40, letterSpacing: 2 }}>
          {series ?? "अनसुने किस्से"}{episode ? ` · #${episode}` : ""}
        </div>
      </div>
      <div style={{ position: "absolute", top: 360, left: 70, right: 70, textAlign: "center", fontFamily: "Rozha", fontSize: 138, lineHeight: 1.12, color: GOLD,
        textShadow: "0 6px 0 #2a1a10, 0 0 30px #000000cc" }}>
        {cover.title}
      </div>

      {/* bottom band */}
      {cover.sub && (
        <div style={{ position: "absolute", top: 1470, left: 80, right: 80, textAlign: "center" }}>
          <span style={{ fontFamily: "Rozha", fontSize: 76, color: CREAM, background: "#000000aa", padding: "6px 30px", borderRadius: 16, borderBottom: `6px solid ${RED}` }}>
            {cover.sub}
          </span>
        </div>
      )}
      <div style={{ position: "absolute", top: 1610, width: "100%", textAlign: "center", fontFamily: "Tiro", fontSize: 36, color: `${CREAM}aa`, letterSpacing: 3 }}>{handle}</div>
    </AbsoluteFill>
  );
};
