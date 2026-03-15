# Agent Instructions for this repository

- Keep architecture simple: static HTML/CSS/JS (no frameworks).
- Use BEM-style class naming for reusable components.
- Ensure every new page includes semantic landmarks and accessibility-minded markup.
- Keep all theme tokens centralized in `css/variables.css`.
- Track implementation checkpoints in `progress.md`.

## Current implementation status (2026 refresh)

- Homepage and all pages in `pages/` now share a common accessible header, nav, landmarks, and footer pattern.
- Core visual tokens for RNM branding are maintained in `css/variables.css`.
- Reusable UI modules are implemented in `css/components.css`; responsive behavior is in `css/responsive.css`.
- Interactive behavior is consolidated in `js/main.js`.
- Future updates should preserve keyboard accessibility, semantic sectioning, and WCAG-friendly color contrast.
