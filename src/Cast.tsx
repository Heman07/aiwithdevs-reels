import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CHARACTERS, Puppet, Pose } from "./Puppet";

// Preview sheet: every character, cycling poses. `npx remotion still Cast`
const POSES: Pose[] = ["idle", "point", "raise", "pray", "fight", "bless", "write", "sleep"];

export const Cast: React.FC<{ pose?: Pose }> = ({ pose }) => {
  const f = useCurrentFrame();
  const ids = Object.keys(CHARACTERS);
  return (
    <AbsoluteFill style={{ background: "#24170e", display: "flex", flexWrap: "wrap", flexDirection: "row", padding: 20 }}>
      {ids.map((id, i) => (
        <div key={id} style={{ width: 400, height: 560, position: "relative" }}>
          <Puppet id={id} pose={pose ?? POSES[i % POSES.length]} f={f} />
          <div style={{ position: "absolute", bottom: 4, width: "100%", textAlign: "center", color: "#e0ac4a", fontSize: 28, fontFamily: "serif" }}>
            {id} · {pose ?? POSES[i % POSES.length]}
          </div>
        </div>
      ))}
    </AbsoluteFill>
  );
};
