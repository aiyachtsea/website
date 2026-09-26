# AIyachts — session handoff (Sanity + GitHub Pages)

Context for the current setup: what exists, the naming to use with a **new
Sanity account**, and what remains. This replaces the earlier handoff, which
described a different (removed) test project.

> Companion file: `docs/PRODUCTION-DEPLOYMENT.md` is the step-by-step runbook.

---

## 1. What this project is

A static, multipage yacht-charter website. Yacht content lives in **Sanity**; a
Node generator (`build/build.mjs`) reads published yachts from Sanity and writes
the static HTML into the **repo root**. GitHub Pages serves the repo root of
`main`. The Sanity Studio (in `sanity/`) is the editor.

Flow: **admin edits in Studio → publishes → Sanity webhook → GitHub Action
rebuilds and commits to `main` → GitHub Pages updates.**

If Sanity is disabled or unreachable the build falls back to the built-in static
fleet (`STATIC_FLEET` in `build/site.mjs`), so a deploy never breaks.

---

## 2. Naming (new Sanity account)

| Item | Value | Notes |
|---|---|---|
| Sanity folder | `sanity/` | Self-contained Studio |
| Sanity project name | `AIyachts` | Cosmetic |
| Sanity dataset | `production` | Public read |
| Sanity API version | `2025-02-19` | Pinned |
| Studio hostname | `aiyachts` → https://aiyachts.sanity.studio/ | Globally unique |
| Schema doc type | `yacht` | |
| Webhook event type | `sanity-publish` | |
| Sanity project ID | *auto-generated* | Paste into `sanity.project.json` |
| Sanity org ID | *auto-generated* | From the new account |
| GitHub repo | `aiyachtsea/website` | |
| Live site | https://ai-yachting.com | Custom domain, CNAME at root |
| Pages source | Deploy from a branch → `main` / `(root)` | Not "GitHub Actions" |

Project ID and org ID come from Sanity when you create the project — you cannot
choose them.

---

## 3. Files that make up the integration

| File | Purpose |
|---|---|
| `sanity/` | Sanity Studio: `sanity.config.ts`, `sanity.cli.ts`, `schemaTypes/yacht.ts`, `package.json`, `README.md` |
| `sanity.project.json` (repo root) | Single source of truth: `projectId`, `dataset`, `apiVersion`, `studioHost`, `useSanity` |
| `build/sanity.mjs` | Fetches published yachts from the public read API, maps them to the FLEET shape, validates; falls back to static |
| `build/site.mjs` | `STATIC_FLEET` fallback + `export const FLEET = await loadFleet(STATIC_FLEET)` |
| `package.json` (repo root) | `build`, `studio`, `studio:deploy` scripts |
| `.github/workflows/deploy.yml` | On `sanity-publish` / manual: rebuild from Sanity, commit to `main` |
| `docs/PRODUCTION-DEPLOYMENT.md` | Go-live runbook |

---

## 4. Content model

One document type, **`yacht`** (`sanity/schemaTypes/yacht.ts`), mapping 1:1 to the
FLEET shape: `slug, name, builder, year, category, type (Monohull|Catamaran),
cabins, guests, berths, heads, tag, blurb, highlights[], owner (own|partner),
specs{loa,beam,draft,displacement,engine,fuel,water,mainsail,headsail},
photos[]{slug,alt,cat,title}, equipment[]{title,items[]}, showOnWebsite, order`.

**Main photo is uploaded in the Studio** (`mainImage`, required) and served from
Sanity's CDN. **Gallery frames remain local repo files keyed by slug** —
`assets/fleet/gallery/<slug>-800/1600.{jpg,webp}`. If a yacht has no uploaded
main image the build falls back to `assets/fleet/<slug>.jpg`. Keep the yacht
**slug** identical to the gallery/fallback file names.

---

## 5. How the admin adds boats

1. Open the Studio (`https://aiyachts.sanity.studio/` or local `:3333`).
2. **Yacht → Create new**.
3. Fill Details / Specifications / Photos / Website, then **Publish**.
4. Publishing fires the webhook → Action → the live site rebuilds in ~1-2 min.
5. To remove a yacht: open it, turn off **Show on website**, Publish.

To let a new admin in: Manage → **Members** → invite as **Editor**, and add the
Studio URL to **CORS origins** (Allow credentials on).

---

## 6. Remaining to go live

Follow `docs/PRODUCTION-DEPLOYMENT.md`:

1. Create the Sanity project + public `production` dataset (new account).
2. Paste the project ID into `sanity.project.json`, set `useSanity: true`.
3. `cd sanity && npm install && npm run deploy`.
4. Enter the 14 yachts (values in `STATIC_FLEET`, `build/site.mjs`).
5. Create the webhook to `https://api.github.com/repos/aiyachtsea/website/dispatches`
   with projection `{ "event_type": "sanity-publish" }` and a fine-grained PAT
   (Contents: read/write on the repo).
6. Publish / run the Action; confirm the change on https://ai-yachting.com.

---

## 7. Useful commands

```powershell
# Site
npm run build          # generate the site (Sanity when useSanity=true, else static)

# Studio (installs into sanity/)
npm run studio:install
npm run studio         # editor at http://localhost:3333
npm run studio:deploy  # redeploy hosted Studio
```
