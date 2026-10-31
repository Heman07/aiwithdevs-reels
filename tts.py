"""Script JSON -> public/<slug>/audio.mp3 + timeline.json (word-level timings via edge-tts)."""
import asyncio, json, os, subprocess, sys, edge_tts

GAP_MS = 280
PROXY = os.environ.get("HTTPS_PROXY") or None


def dur_ms(path):
    out = subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path])
    return int(float(out) * 1000)


async def synth(text, voice, rate, pitch, out):
    c = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch, boundary="WordBoundary", proxy=PROXY)
    words = []
    with open(out, "wb") as f:
        async for ch in c.stream():
            if ch["type"] == "audio":
                f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                s = ch["offset"] / 10000
                words.append({"w": ch["text"], "s": s, "e": s + ch["duration"] / 10000})
    return words


async def main(script_path):
    slug = os.path.splitext(os.path.basename(script_path))[0]
    spec = json.load(open(script_path, encoding="utf-8"))
    outdir = os.path.join("public", slug)
    tmp = os.path.join(outdir, "parts")
    os.makedirs(tmp, exist_ok=True)

    scenes, parts, t = [], [], 0
    for i, sc in enumerate(spec["scenes"]):
        p = os.path.join(tmp, f"{i:02d}.mp3")
        words = await synth(sc["text"], spec.get("voice", "hi-IN-SwaraNeural"), spec.get("rate", "+15%"), spec.get("pitch", "+0Hz"), p)
        d = dur_ms(p)
        scenes.append({**sc, "startMs": t, "endMs": t + d,
                       "words": [{**w, "s": w["s"] + t, "e": w["e"] + t} for w in words]})
        parts.append(p)
        t += d + GAP_MS
        print(f"scene {i}: {d}ms, {len(words)} words")

    # concat parts with silence gaps
    inputs, filt = [], ""
    for i, p in enumerate(parts):
        inputs += ["-i", p]
        filt += f"[{i}:a]aresample=24000,apad=pad_dur={GAP_MS/1000}[a{i}];"
    filt += "".join(f"[a{i}]" for i in range(len(parts))) + f"concat=n={len(parts)}:v=0:a=1[out]"
    audio = os.path.join(outdir, "voice.mp3")
    subprocess.check_call(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", filt, "-map", "[out]", audio])

    total = dur_ms(audio)
    # soft tanpura-like drone bed (generated, royalty-free)
    drone = os.path.join(outdir, "drone.mp3")
    secs = total / 1000 + 1.5
    expr = ("0.05*sin(2*PI*69.3*t)*(0.75+0.25*sin(2*PI*0.21*t))"
            "+0.035*sin(2*PI*103.8*t)*(0.7+0.3*sin(2*PI*0.13*t+1))"
            "+0.03*sin(2*PI*138.6*t)*(0.7+0.3*sin(2*PI*0.17*t+2))"
            "+0.012*sin(2*PI*277.2*t)")
    subprocess.check_call(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", f"aevalsrc={expr}:s=24000:d={secs}",
                           "-af", f"afade=t=in:d=1.5,afade=t=out:st={secs-1.5}:d=1.5,aecho=0.8:0.7:60:0.3", drone])

    json.dump({"handle": spec.get("handle", ""), "theme": spec.get("theme", "royal"), "series": spec.get("series"), "episode": spec.get("episode"), "cover": spec.get("cover"), "durationMs": total + 500, "scenes": scenes},
              open(os.path.join(outdir, "timeline.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"done: {total}ms -> {outdir}")


if __name__ == "__main__":
    asyncio.run(main(sys.argv[1]))
