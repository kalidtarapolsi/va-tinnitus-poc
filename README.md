# VA Tinnitus Claims Automation POC

A proof of concept demonstrating how rules-based automation can process VA tinnitus (DC 6260) disability claims in seconds instead of hours.

## What This Does

This app implements the actual VA claims adjudication logic for tinnitus:

1. **Claim Intake** — Parses a simplified VA Form 21-526EZ and identifies the tinnitus contention
2. **Evidence Assembly** — Looks up the veteran's MOS against the VA Duty MOS Noise Exposure Listing (Fast Letter 10-35) and determines whether a C&P exam can be waived
3. **Rating Decision** — Applies 38 CFR 4.87, Diagnostic Code 6260 (flat 10% for recurrent tinnitus)
4. **Decision Letter** — Generates a complete Rating Decision letter with legal citations, evidence considered, and appeal rights

## Why Tinnitus

Tinnitus is the #1 most common VA disability claim (~250,000/year). The rating is always 10% with no severity scale, and service connection criteria are binary (noise exposure MOS + lay statement). This makes it the ideal candidate for full automation — no human judgment is required for the vast majority of cases.

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying to GitHub Pages

This repo includes a GitHub Actions workflow that auto-deploys to GitHub Pages on push to `main`.

1. Go to your repo Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to `main` — the site will deploy automatically

Your site will be at: `https://yourusername.github.io/va-tinnitus-poc`

## Key Files

- `src/data/mosNoiseExposure.ts` — VA Duty MOS Noise Exposure Listing (75+ MOS codes across all branches)
- `src/engine/ratingEngine.ts` — Rating decision engine implementing DC 6260 logic + decision letter generator
- `src/app/page.tsx` — Main UI with claim form, processing animation, and results view

## Production Path

This POC demonstrates the decision logic running client-side. For a production pilot:

1. Decision engine runs as a microservice on VA AWS GovCloud
2. Integrates with VBMS via internal APIs to receive claims and push rating decisions
3. Connects to DoD eMILPO/DPRIS for real-time MOS verification
4. QA framework uses statistical sampling instead of individual RVSR review
5. Existing ADS/ARSD infrastructure handles document generation

## Built By

[Aquia](https://aquia.io) — Under contract with VA through the Disability Benefits Crew, NAII AI, and SPRUCE programs.

## Tech Stack

- Next.js 14 (Static Export)
- TypeScript
- Tailwind CSS
- Deployed via GitHub Pages
