# Math-Problem-Generator
The Math Problem Generator is a browser-based tool for creating fully randomized math exercises across multiple domains, especially those that high school students might encounter. It’s built with vanilla JavaScript, HTML, and CSS, and focuses on clarity, predictability, and clean internal logic. Each generated problem includes an answer and a contextual hint, making it suitable for practice, experimentation, or quick concept checks.

## Main Features

1) Multiple Categories – Algebra, Geometry, Trigonometry, and Probability/Statistics, each with dedicated generation logic.

2) Difficulty Levels – Easy, Medium, and Hard modes that adjust the structure and depth of the problems.

3) Deterministic Answer Generation – Every problem computes its own answer internally to guarantee correctness.

4) Hints Included – Each problem provides a short conceptual hint relevant to the solving method.

5) Keyboard Shortcuts –

- G to generate a new problem

- A to show/hide the solution

6) Copy to Clipboard – Quickly copy the problem (and answer if visible) for notes, documents, or worksheet creation.

7) Lightweight UI – A simple layout that presents the problem, hint, and metadata (category, difficulty, timestamp) clearly.

## Technical Highlights
### JavaScript

1) Modular generator system organized under a unified Generators object.

2) Individual functions for each category and difficulty level.

3) Controlled randomness using helper utilities (rnd, choice, round, simplifyFraction).

4) DOM integration for rendering problems, answers, and state changes.

5) Clipboard interaction through the modern navigator.clipboard API.

6) Problem Logic

7) Algebra problems include linear equations, multi-step equations, and factorizable quadratics.

8) Geometry problems cover rectangles, circles, and Pythagorean triples.

9) Trigonometry uses special-angle values and controlled rounding for inverse functions.

10) Probability/Statistics includes mean calculations, simplified probability fractions, and medians.

### CSS

1) Minimal styling oriented around readable spacing and structured content.

2) Basic responsive behavior without external frameworks.

## Personal Note
This was my second project using JavaScript, and I am happy with how it turned out. The idea for this site came from my desire to create a generator, but not a trivial one like a name generator—I wanted it to be genuinely useful. That, combined with my growing interest in mathematics, allowed this idea to take shape and come to fruition. High school math provides a solid baseline of concepts that a person should understand, and this site aims to capture them. I plan to build more websites that apply various types of mathematics as well as other concepts.

## Github pages link:
https://arseniodraco.github.io/Math-Problem-Generator/
