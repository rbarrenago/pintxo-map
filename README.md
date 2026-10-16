# Pintxo Map

An AI demo that helps chefs invent new pintxos without flattening taste. It proposes a **diverse map** of candidates, from classic to novel and from light to rich, and **learns a tasting panel's preferences** from pairwise comparisons.

Built at IES Xabier Zubiri-Manteo BHI (Donostia-San Sebastián) as a demo for a proposed collaboration with GOe Tech Center, Basque Culinary Center.

**Live demo:** https://rbarrenago.github.io/pintxo-map/

## What it shows

- **Quality-diversity map:** every combination of base, main ingredient, accent and technique is scored, and the best candidate in each cell of a 6 × 5 map is kept, so variety is part of the method.
- **Chef-chosen dimensions:** the map's two axes can be any of style (novelty, richness), the five basic tastes (sweet, salty, sour, bitter, umami) or five textures (crunchy, creamy, gelatinous, fibrous, airy). Each pintxo shows its taste and texture profile.
- **Preference learning:** pairwise votes ("which would you rather eat?") train a Bradley–Terry style logistic model. An ensemble of bootstrapped models estimates uncertainty, and the next pair is chosen where the models disagree most.
- **Simulated panel:** a panel with a hidden taste can vote automatically, so you can see the model's agreement with it rise round by round.
- **Guided tour for chefs** and a full **English / Spanish / Basque** interface.

The ingredients, flavour scores and balance rules are illustrative placeholders. In the real pilot, chefs approve every ingredient and technique, validate every candidate before it is cooked, and design the tasting protocol.

## Run it

It is a single static file with no build step: open `index.html` in a browser, or serve the folder with any static server.

## Español

Demo de IA que propone un mapa diverso de pintxos y aprende el gusto de un panel de cata a partir de comparaciones por parejas. Incluye una guía para cocineros y la interfaz en inglés, castellano y euskera.

## Euskara

Pintxoen mapa anitz bat proposatzen duen eta dastaketa-panel baten gustua binakako konparaketetatik ikasten duen AA-demoa. Sukaldarientzako gida bat eta ingelesezko, gaztelaniazko eta euskarazko interfazea ditu.
