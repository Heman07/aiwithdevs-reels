#!/usr/bin/env python3
"""Publish due reels from schedule.json to Instagram (Instagram API with Instagram Login).
Env: IG_USER_ID, IG_TOKEN, MEDIA_BASE (public URL where media/<slug>.mp4/.jpg live), DRY_RUN=1 to test.
"""
import json, os, sys, time, urllib.parse, urllib.request
from datetime import datetime, timezone, timedelta

API = "https://graph.instagram.com/" + os.environ.get("IG_API_VERSION", "v21.0")
UID, TOKEN = os.environ.get("IG_USER_ID", ""), os.environ.get("IG_TOKEN", "")
BASE = os.environ["MEDIA_BASE"].rstrip("/")
DRY = os.environ.get("DRY_RUN") == "1"
MAX_PER_RUN = int(os.environ.get("MAX_PER_RUN", "1"))


def call(method, path, **params):
    params["access_token"] = TOKEN
    data = urllib.parse.urlencode(params).encode()
    url = f"{API}/{path}"
    req = urllib.request.Request(url if method == "POST" else f"{url}?{data.decode()}", data=data if method == "POST" else None, method=method)
    try:
        return json.load(urllib.request.urlopen(req, timeout=60))
    except urllib.error.HTTPError as e:
        raise SystemExit(f"Instagram API error {e.code}: {e.read().decode()[:500]}")


def head_ok(url):
    try:
        return urllib.request.urlopen(urllib.request.Request(url, method="HEAD"), timeout=30).status == 200
    except Exception:
        return False


sched = json.load(open("schedule.json", encoding="utf-8"))
now = datetime.now(timezone.utc)
due = [e for e in sched if not e.get("posted") and datetime.fromisoformat(e["post_at"]) <= now]
due.sort(key=lambda e: e["post_at"])
print(f"{len(due)} reel(s) due")
changed = False
for e in due[:MAX_PER_RUN]:
    slug = e["slug"]
    video, cover = f"{BASE}/{slug}.mp4", f"{BASE}/{slug}.jpg"
    if not head_ok(video):
        print(f"! {slug}: video not on media site yet ({video}), will retry next run"); continue
    print(f"> posting {slug}")
    if DRY:
        print("  DRY_RUN: would post", video); continue
    params = dict(media_type="REELS", video_url=video, caption=e.get("caption", ""), share_to_feed="true")
    if head_ok(cover):
        params["cover_url"] = cover
    c = call("POST", f"{UID}/media", **params)["id"]
    for _ in range(60):  # up to ~10 minutes
        st = call("GET", c, fields="status_code,status").get("status_code")
        print("  status:", st)
        if st == "FINISHED": break
        if st in ("ERROR", "EXPIRED"): raise SystemExit(f"processing failed for {slug}")
        time.sleep(10)
    else:
        raise SystemExit(f"timeout processing {slug}")
    mid = call("POST", f"{UID}/media_publish", creation_id=c)["id"]
    e.update(posted=True, media_id=mid, posted_at=now.isoformat())
    changed = True
    print(f"  published {slug} -> {mid}")
if changed:
    json.dump(sched, open("schedule.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
