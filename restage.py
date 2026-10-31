"""Apply staging (theme, visuals, chars, props) from a script onto an existing timeline without re-running TTS."""
import json, sys, os
script = sys.argv[1]
slug = os.path.splitext(os.path.basename(script))[0]
spec = json.load(open(script, encoding="utf-8"))
tp = os.path.join("public", slug, "timeline.json")
tl = json.load(open(tp, encoding="utf-8"))
assert len(tl["scenes"]) == len(spec["scenes"]), "scene count changed - rerun tts.py"
for a, b in zip(tl["scenes"], spec["scenes"]):
    assert a["text"] == b["text"], f"text changed - rerun tts.py: {b['text']}"
    for k in ("visual", "chars", "props", "theme", "highlight"):
        a.pop(k, None)
        if k in b: a[k] = b[k]
tl["theme"] = spec.get("theme", "royal"); tl["series"] = spec.get("series"); tl["episode"] = spec.get("episode"); tl["cover"] = spec.get("cover"); tl["handle"] = spec.get("handle", tl.get("handle", ""))
json.dump(tl, open(tp, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("restaged", slug)
