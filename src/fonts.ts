import { useEffect, useState } from "react";
import { continueRender, delayRender, staticFile } from "remotion";

export const useFontsOnce = () => {
  const [handle] = useState(() => delayRender("fonts"));
  useEffect(() => {
    const fonts = [
      new FontFace("Rozha", `url(${staticFile("fonts/rozha.woff2")})`),
      new FontFace("Tiro", `url(${staticFile("fonts/tiro.woff2")})`),
      new FontFace("Cinzel", `url(${staticFile("fonts/cinzel-900.woff2")})`, { weight: "900" }),
      new FontFace("Fell", `url(${staticFile("fonts/fell.woff2")})`),
    ];
    Promise.all(fonts.map((f) => f.load())).then((loaded) => {
      loaded.forEach((f) => document.fonts.add(f));
      continueRender(handle);
    });
  }, [handle]);
};
