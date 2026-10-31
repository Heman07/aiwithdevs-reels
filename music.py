#!/usr/bin/env python3
"""Generate a distinct royalty-free background bed per reel (procedural, ffmpeg only).
Usage: python3 music.py <slug> [style]   → public/<slug>/music.mp3 + timeline.json "music" field
Styles: tanpura, temple, pulse, choir, damru, wind, sitar, veena  (default: picked from slug hash)
"""
import json, os, subprocess, sys, hashlib

STYLES = ["tanpura", "temple", "pulse", "choir", "damru", "wind", "sitar", "veena"]
ROOTS = [55.0, 58.27, 61.74, 65.41, 69.3, 73.42, 77.78]  # A1..D#2 — different key per reel


def expr_for(style, r):
    S = lambda f, a, ph=0: f"{a}*sin(2*PI*{f:.2f}*t+{ph})"
    if style == "tanpura":  # Sa-Pa drone with plucked cycle (Pa, Sa, Sa, Sa_low)
        T = 1.6
        pl = "+".join(f"0.05*sin(2*PI*{f:.2f}*t)*exp(-2.2*mod(t-{o},{T}))*gte(mod(t-{o},{T}),0)"
                      for f, o in [(r * 3, 0), (r * 4, 0.4), (r * 4, 0.8), (r * 2, 1.2)])
        return f"{S(r*2,0.03)}+{S(r*3,0.02,1)}+{pl}"
    if style == "temple":  # deep drone + temple bell every 4.5s
        bell = "+".join(f"{a}*sin(2*PI*{r*k:.2f}*t)*exp(-{d}*mod(t,4.5))" for k, a, d in [(8, .05, .9), (10.9, .03, 1.3), (15.1, .02, 1.8), (21.3, .012, 2.5)])
        return f"{S(r,0.05)}*(0.8+0.2*sin(2*PI*0.1*t))+{S(r*1.5,0.025,2)}+{bell}"
    if style == "pulse":  # heartbeat thump 72bpm + dissonant minor-2nd whine
        T = 60 / 72
        kick = f"0.22*sin(2*PI*(45+90*exp(-28*mod(t,{T})))*mod(t,{T}))*exp(-9*mod(t,{T}))"
        kick2 = f"0.14*sin(2*PI*(45+90*exp(-28*mod(t-0.22,{T})))*mod(t-0.22,{T}))*exp(-9*mod(t-0.22,{T}))*gte(mod(t-0.22,{T}),0)"
        return f"{kick}+{kick2}+{S(r*8,0.008)}+{S(r*8*1.059,0.008)}*(0.5+0.5*sin(2*PI*0.07*t))+{S(r,0.04)}"
    if style == "choir":  # detuned minor pad, slow swell
        notes = [r * 2, r * 2 * 1.189, r * 3, r * 4]
        parts = [S(n * d, 0.016, i) for i, n in enumerate(notes) for d in (0.997, 1.0, 1.004)]
        return "(" + "+".join(parts) + ")*(0.55+0.45*sin(2*PI*0.05*t-1.5))"
    if style == "damru":  # drum pattern (dha .. dhin dhin) over low drone
        T = 2.0
        hits = [(0, 1.0), (0.5, 0.5), (0.75, 0.5), (1.0, 0.8), (1.5, 0.6)]
        d = "+".join(f"{0.18*v}*sin(2*PI*(70+110*exp(-35*mod(t-{o},{T})))*mod(t-{o},{T}))*exp(-11*mod(t-{o},{T}))*gte(mod(t-{o},{T}),0)" for o, v in hits)
        return f"{d}+{S(r*2,0.03)}+{S(r*3,0.015,1)}"
    if style == "wind":  # eerie tritone + slow tremolo (noise added via filter graph)
        return f"({S(r*4,0.02)}+{S(r*4*1.414,0.014,1)})*(0.6+0.4*sin(2*PI*0.3*t))+{S(r,0.04)}"
    if style == "sitar":  # plucks on a raga-ish phrase with sympathetic shimmer
        T = 3.2
        phrase = [(1, 0), (1.125, .4), (1.2, .8), (1.5, 1.2), (1.6, 1.8), (1.5, 2.2), (1.2, 2.6)]
        pl = "+".join(f"0.045*sin(2*PI*{r*4*m:.2f}*t+0.6*sin(2*PI*{r*8*m:.2f}*t))*exp(-3*mod(t-{o},{T}))*gte(mod(t-{o},{T}),0)" for m, o in phrase)
        return f"{pl}+{S(r*2,0.03)}+{S(r*3,0.015)}"
    if style == "veena":  # slow low plucks, deep and calm-ominous
        T = 2.4
        pl = "+".join(f"0.06*sin(2*PI*{r*2*m:.2f}*t)*exp(-1.6*mod(t-{o},{T}))*gte(mod(t-{o},{T}),0)" for m, o in [(1, 0), (1.5, 0.8), (1.2, 1.6)])
        return f"{pl}+{S(r,0.05)}*(0.7+0.3*sin(2*PI*0.08*t))"
    raise ValueError(style)


def make(slug, style=None):
    outdir = os.path.join("public", slug)
    tl_path = os.path.join(outdir, "timeline.json")
    tl = json.load(open(tl_path, encoding="utf-8"))
    secs = tl["durationMs"] / 1000 + 1.5
    h = int(hashlib.md5(slug.encode()).hexdigest(), 16)
    style = style or STYLES[h % len(STYLES)]
    r = ROOTS[(h // 7) % len(ROOTS)]
    out = os.path.join(outdir, "music.mp3")
    src = ["-f", "lavfi", "-i", f"aevalsrc='{expr_for(style, r)}':s=24000:d={secs}"]
    fx = f"afade=t=in:d=1.5,afade=t=out:st={secs-2}:d=2,aecho=0.8:0.6:{60 + h % 80}:0.3,loudnorm=I=-24:TP=-3"
    if style == "wind":
        src += ["-f", "lavfi", "-i", f"anoisesrc=d={secs}:c=pink:a=0.25:r=24000"]
        cmd = ["ffmpeg", "-v", "error", "-y", *src, "-filter_complex",
               f"[1:a]bandpass=f=500:w=400,tremolo=f=0.15:d=0.7[n];[0:a][n]amix=inputs=2:weights=1 0.6,{fx}", out]
    else:
        cmd = ["ffmpeg", "-v", "error", "-y", *src, "-af", fx, out]
    subprocess.check_call(cmd)
    tl["music"] = "music.mp3"
    json.dump(tl, open(tl_path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"{slug}: {style} @ {r}Hz -> {out}")


if __name__ == "__main__":
    make(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
