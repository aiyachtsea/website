# AIyachts — Sanity Studio

Self-contained Sanity Studio for the yacht fleet. The site build
(`build/build.mjs`) reads published yachts from this project and writes the
static pages; publishing in the Studio triggers a rebuild of the live site.

Project coordinates (project ID, dataset, API version, Studio hostname) live in
the repo-root file **`../sanity.project.json`** — the single source of truth for
both this Studio and the site build.

## First-time setup (new Sanity account)

1. Create the project on your Sanity account:
   ```bash
   cd sanity
   npm install
   npx sanity login
   npx sanity init --dataset production
   ```
   When it prompts, create a **new project** named `AIyachts` and dataset
   `production` (public). Note the **project ID** it prints.
2. Put the project ID into `../sanity.project.json` (`projectId`). Set
   `useSanity` to `true` there when you want the build to read from Sanity.
3. Make the dataset public so the site build can read without a token:
   ```bash
   npx sanity dataset visibility set production public
   ```

## Everyday use

```bash
cd sanity
npm run dev        # local editor at http://localhost:3333
npm run deploy     # deploy to https://aiyachts.sanity.studio/
```

The deploy hostname (`studioHost`) also comes from `../sanity.project.json`, so
`npm run deploy` never re-prompts.

## Adding an editor / new admin

Manage → **Members** → invite as **Editor**. Add the Studio URL to
**CORS origins** (Allow credentials on) if it is not already present.

## Content model

One document type: **`yacht`** (see `schemaTypes/yacht.ts`). Its fields map 1:1
to the `FLEET` shape consumed by `build/site.mjs`. The **main photo is uploaded**
in the Studio (`mainImage`) and served from Sanity's CDN; **gallery frames stay
as local repo files keyed by slug** (`assets/fleet/gallery/<slug>-800/1600.{jpg,webp}`),
with `assets/fleet/<slug>.jpg` as the main-image fallback.
