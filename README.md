# Pintxo Map 2.1 — Chef-in-the-Loop

**Status:** exploratory educational research demonstration, **not** a validated culinary decision system, food-safety assessment, real blinded sensory experiment, or project endorsed by GOe Tech Center.

This version is a **corrective update to the already-open Pull Request #1** in `rbarrenago/pintxo-map`. It keeps Pintxo Map 2.0's layout, multilingual interface and adaptive catalogue, while addressing the research integrity findings from the PR review.

## What's new in 2.1

1. **Counterbalanced sample presentation** — the order of candidate A and candidate B alternates when a pair is presented again, with a pseudo-random initial orientation. This reduces a simple repeated-order bias but is **not** a controlled clinical/sensory blinding protocol; hidden recipe names are only a UI aid.
2. **Review-event history** — approving, withdrawing approval, rejecting and restoring a candidate records its ID, previous/new status, timestamp and an optional review note. Withdrawal blocks *new* manual comparisons; existing votes are retained as historical observations, with approval status at the time of tasting.
3. **Auditable export** — manual-mode JSON includes recorded comparisons, presentation order, sample-to-recipe mapping, timestamps, review events, approval snapshots and the withdrawal policy. Simulation and manual tasting votes remain separate. Review notes are unmoderated user text; check them for personal data before sharing.
4. **Frozen benchmark corpus** — the benchmark always uses the same fixed **novelty × richness** 6 × 5 candidate archive from the full catalogue, independent of the on-screen axes, manual decisions, rejected candidates or votes. The evaluation has twelve deterministic synthetic seeds, 100 held-out *pair identities per seed* and 0/4/8/12/16 training votes. Training explicitly excludes held-out pair identities; an overlap would stop the benchmark with an error.
5. **Fairer pairwise comparisons** — methods receive a stable pair-specific synthetic response within each trial; repeated method selections do not create inconsistent synthetic feedback. The method can still win or lose to random sampling, and no outcome superiority is claimed.
6. **Regression tests** — automated tests cover the five research-review concerns plus exports, simulation/manual separation, languages and responsive layout.

## Research limitations

- All ingredient attributes, cuisine rules and synthetic preferences are illustrative. The catalogue enumerates 3,038 rule-constrained combinations; it does not discover real flavour chemistry or automatically generate new ingredients.
- The *learning + diversity* view replaces candidates within map cells; this is a heuristic exploration strategy, not an independently validated quality-diversity search algorithm.
- **Held-out pairs are not held-out recipes or tasters.** The benchmark estimates synthetic agreement between a fitted linear model and a fixed synthetic evaluator on pairs of recipes from the *same* 6 × 5 pool. The evaluation excludes ambiguous pairs with latent utility difference below 0.2; this design can make accuracy easier than performance in real tasting.
- The benchmark reports per-seed ranges, **not confidence intervals**, and the comparison between algorithms is exploratory. There is no claim that active learning outperforms random sampling.
- Model disagreement is not calibrated uncertainty, chef approval is not a food-safety certification, and hiding names in the interface is not a truly blinded experiment.
- There is no server-side storage or participant authentication. Session data and review events are lost upon refreshing; **export before leaving**. Do not collect identifiable participant or health data with this demonstration.
- The full research pilot will need GOe's chef/sensory specialists to approve ingredients, protocols, ethics, participant consent, privacy and data handling.

## Run locally

Open `index.html`, or in the project root run:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000. A browser and network connection are optional (only Google Fonts uses a remote resource). No other libraries or build step are needed for the application itself.

## Test

With Python Playwright and Chromium installed:

```bash
python3 tests/smoke.py
python3 tests/regression.py
```

Smoke tests exercise the existing 2.0 flows; regression tests cover benchmarking, A/B order, review-event provenance, versioned export, language switching and 320–1440 px layouts.

## Updating the existing open Pull Request (important)

**Do not create another branch or PR. Do not merge PR #1 until you have reviewed the corrected version.**

1. In VS Code, open your existing local `pintxo-map` repository and run:

   ```bash
   git switch pintxo-map-2.0
   git pull --ff-only origin pintxo-map-2.0
   ```

2. Download/unzip the `pintxo-map-2.1.zip` package and **copy the contents of its `pintxo-map-2.1/` folder into the root** of your existing repository. Replace `index.html`, `app.js`, `styles.css` and `README.md`; copy the updated `tests/` files and `.gitignore`. Do not copy the enclosing folder as a nested directory. **Do not delete `.git`.**

3. Start the application locally, try manual approvals and the synthetic benchmark, then run:

   ```bash
   git status
   git add index.html app.js styles.css README.md tests/ .gitignore
   git commit -m "Fix tasting provenance and benchmark in Pintxo Map 2.1"
   git push origin pintxo-map-2.0
   ```

4. GitHub **automatically updates your existing PR #1**: https://github.com/rbarrenago/pintxo-map/pull/1 . Review the `Files changed` and `Checks` tabs, then decide when to merge. `main` and the live GitHub Pages site are unchanged until that merge (assuming GitHub Pages publishes from `main`).

## Project ownership and attribution

Educational proof-of-concept by IES Xabier Zubiri-Manteo BHI, Donostia–San Sebastián, for potential discussion with GOe Tech Center / Basque Culinary Center. No partnership or institutional validation is implied by this demonstration.
