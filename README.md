# Pintxo Map 2.0 — Chef-in-the-Loop

**Status:** exploratory educational research demo, not a validated gastronomic decision system or an endorsed GOe Tech Center project.

This project illustrates a potential collaboration between IES Xabier Zubiri-Manteo BHI and GOe Tech Center (Basque Culinary Center). A chef can explore a diversity map, inspect candidate recipes, approve/reject them, explore a variation, and compare pairs. An illustrative preference model updates the map's candidate representatives as evidence accumulates.

## Features

- **6 × 5 diversity archive** with configurable dimensions and *Fixed balance heuristic* / *Learning + diversity* views. The latter can replace recipe representatives in the same cells after comparisons; the ingredient combination space remains a finite illustrative enumeration, not an open-ended generator.
- **Chef review:** approve/reject a candidate, or select another catalogued variation. **Approval in this demo is not an assessment of food safety** and does not replace an expert review.
- **Two separate modes:** automatic synthetic preferences for demonstrations and manual pairwise input restricted to chef-approved candidates. These never share preference histories. Ties are recorded but are not used by Bradley–Terry fitting; skipped pairs are not votes.
- **Synthetic research benchmark:** repeated reproducible trials comparing active pair selection with random selection on held-out synthetic pairs. The benchmark does **not** validate human preferences.
- **Data export:** local-only JSON export of current-mode comparisons and review status. No server-side data collection. Session data disappears on page refresh or closing the tab.
- **English / Spanish / Basque**, readable methodology notes, uncertainty caveats.

## Run locally

Open `index.html` in your browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/ . No installation or backend is required. Google Fonts optionally loads via the internet; the app still runs with fallback fonts.

## Test

The Playwright smoke test was used during development. It requires Python's `playwright` package and a Chromium browser:

```bash
python3 tests/smoke.py
```

The smoke test exercises simulation/manual mode isolation, chef approval, language switching, session export and the benchmark.

## Research limitations

The catalogue, sensory attributes, initial quality heuristic, explanations and simulated evaluator are manually specified examples. Model-disagreement values are not calibrated probabilities. The data and scores must not be used to establish a dish's real taste, quality, safety, allergen status, sustainability or cultural authenticity. Real sensory research requires expert oversight, informed participant consent, well-defined sampling and governance protocols, and appropriate privacy and food-safety procedures.

## Publish on GitHub in a separate branch

From a clone of `https://github.com/rbarrenago/pintxo-map` with write permissions, create and switch to a new branch, then copy the **contents** of this folder to the repository root:

```bash
git switch main
git pull --ff-only origin main
git switch -c pintxo-map-2.0
# Copy index.html, app.js, styles.css, README.md and tests/ into the repository root.
git add index.html app.js styles.css README.md tests/
git commit -m "Build Pintxo Map 2.0 chef-in-the-loop research demo"
git push -u origin pintxo-map-2.0
```

Do not merge into `main` before review. For GitHub Pages previewing the branch, choose the new branch in **Settings → Pages** if you wish to switch the published site, or use a branch preview service. The existing `main` GitHub Pages site stays unchanged as long as Pages remains pointed at `main`.
