#!/usr/bin/env python3
"""Build every reel in schedule.json that isn't on the media site yet.
For each slug: voice (edge-tts) if missing -> music -> Remotion render -> cover -> media/<slug>.mp4 + media/<slug>.jpg
"""
import json, os, subprocess, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
BASE = os.environ.get("MEDIA_BASE", "").rstrip("/")
FORCE = os.environ.get("FORCE", "") == "1"
os.makedirs("media", exist_ok=True)


def exists_online(name):
    if not BASE:
        return False
    try:
        req = urllib.request.Request(f"{BASE}/{name}", method="HEAD")
        return urllib.request.urlopen(req, timeout=20).status == 200
    except Exception:
        return False


def run(*cmd):
    print("+", " ".join(cmd), flush=True)
    subprocess.check_call(cmd)


sched = json.load(open("schedule.json", encoding="utf-8"))
todo = [e for e in sched if not e.get("posted")]
built = 0
for e in todo:
    slug = e["slug"]
    if not FORCE and exists_online(f"{slug}.mp4"):
        print(f"= {slug} already on media site")
        continue
    if not os.path.exists(f"scripts/{slug}.json"):
        print(f"! missing scripts/{slug}.json, skipping"); continue
    if FORCE or not os.path.exists(f"public/{slug}/timeline.json"):
        run(sys.executable, "tts.py", f"scripts/{slug}.json")
    tl = json.load(open(f"public/{slug}/timeline.json", encoding="utf-8"))
    if not tl.get("music"):
        run(sys.executable, "music.py", slug, *([e["music"]] if e.get("music") else []))
    props = json.dumps({"slug": slug})
    run("npx", "remotion", "render", "Horror", f"media/{slug}.mp4", f"--props={props}", "--crf=20", "--log=error")
    run("npx", "remotion", "still", "HorrorCover", f"media/{slug}.jpg", f"--props={props}", "--image-format=jpeg", "--jpeg-quality=92", "--log=error")
    built += 1
print(f"built {built} reel(s)")
