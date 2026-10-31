# @aiwithdevs — automated Hindu mythology reels

Script JSON → Hindi voice (edge-tts) → Remotion render → GitHub Pages → Instagram, on a schedule. Zero manual steps after setup.

## How it works
| Step | Where | Trigger |
|---|---|---|
| Write `scripts/<slug>.json` + art in `src/horror/ShotsNN.tsx` | Claude / you | push to `main` |
| Add entry to `schedule.json` (`slug`, `post_at`, `caption`) | Claude / you | push to `main` |
| Voice + music + render + cover → `gh-pages` branch | `.github/workflows/build.yml` | automatic on push |
| Publish due reels to Instagram | `.github/workflows/post.yml` | every hour |
| Refresh the 60-day Instagram token | `.github/workflows/refresh-token.yml` | weekly |

Media is served at `https://<user>.github.io/<repo>/<slug>.mp4` (and `.jpg` cover). `post_at` uses ISO time with offset, e.g. `2026-11-06T08:00:00+05:30` (IST).

## One-time setup
1. **Repo settings → Pages:** Source = *Deploy from a branch*, branch `gh-pages` / root (appears after the first build).
2. **Instagram:** @aiwithdevs must be a Professional (Creator/Business) account.
3. **Meta app:** developers.facebook.com → Create app → *Instagram* use case → "API setup with Instagram login" → add @aiwithdevs as tester / generate token with `instagram_business_basic` + `instagram_business_content_publish`. Copy the **access token** and the **Instagram user ID**.
4. **Repo secrets** (Settings → Secrets and variables → Actions):
   - `IG_USER_ID` — Instagram user ID
   - `IG_TOKEN` — long-lived access token
   - `GH_PAT` — (optional) fine-grained GitHub token with *Secrets: read & write* on this repo, for auto token refresh
5. Run **Actions → Build reels → Run workflow** once, then **Post to Instagram → Run workflow** with dry run = 1 to test.

## Add a reel
```json
{ "slug": "hi-govardhan", "post_at": "2026-11-09T08:00:00+05:30", "caption": "...", "posted": false, "music": "temple" }
```
Music styles: tanpura, temple, pulse, choir, damru, wind, sitar, veena.
