# Component Design & Scope

This document outlines the principles for deciding when to create a new component versus when to use an existing layout primitive, using the development of `input-group` and `rail` as a foundational case study.

## 1. Macro-Layouts vs. Micro-Components (Atomic Design)

Components in the Ulu framework generally fall into two structural categories:

*   **Macro-Layouts (Primitives):** Tools like `rail`, `panel`, or `data-list`. These are designed to arrange *other* separate components. They manage the space and alignment *between* distinct items. They are strictly content-agnostic.
*   **Micro-Components (UI Units):** Tools like `input-group`, `button-group`, or `badge`. These are single, cohesive interactive units. To the user and the accessibility tree, they often function as one logical entity. They manage tight visual integration *inside* the component.

**Principle:** Do not force Micro-Components to act as modifiers of Macro-Layouts. Even if they share an underlying CSS mechanism (like `display: flex`), their semantic meaning, HTML contract, and structural rules are distinct. 

## 2. The "Undoing" Anti-Pattern

When deciding whether a design should be a modifier of an existing component or a brand new component, evaluate how much CSS is spent "undoing" the base styles.

*   A good modifier *adds* to or *enhances* functionality.
*   If you find yourself writing CSS to turn off wrapping, override flex-grow assumptions, or reverse layout properties set by the base class, it is a strong signal that you need a distinct component.

## 3. Case Study: Why `input-group` is not `rail--input`

While both `input-group` and `rail` use flexbox to align items horizontally, `input-group` is established as a first-class component rather than a `rail` modifier for the following reasons:

*   **Semantic Consistency:** We already have a specialized `button-group`. Making an `input-group` a rail modifier would break the mental model. Developers expect specialized form controls to have dedicated, recognizable class names (`<div class="input-group">` vs `<div class="rail rail--input-joined">`).
*   **Opposing Defaults:** `rail` expects items to wrap (`flex-wrap: wrap`) and generally respects intrinsic widths. `input-group` requires items to stay on a single line (`nowrap`) and relies heavily on a specific child (`--field`) growing to fill space while others shrink-wrap.
*   **Theming Dependencies:** `input-group` is intrinsically tied to `form-theme` settings (input borders, radii). `rail` must remain strictly agnostic to its contents.

## 4. Engineering "Joined" Components

When building components that require elements to visually merge (like `input-group--joined` or `button-group--joined`), adhere to this battle-tested pattern:

*   **Role-Based Naming:** Use semantic BEM modifiers that describe the structural role, not the content. For example, use `__item--addon` or `__item--static` instead of `__item--text`. This keeps the HTML contract flexible for icons, currency symbols, or future requirements.
*   **Border Overlaps:** Use negative margins equal to the border width to overlap borders and prevent double-thick lines where items touch.
*   **Radius Stripping:** Remove the `border-radius` from the inner touching edges, preserving them only on the `:first-child` and `:last-child`. Ensure the radius stripping logic targets the parent elements securely so the component remains agnostic to what is placed inside it.
*   **Z-Index Management:** Apply `position: relative` and a higher `z-index` on `:hover`, `:focus`, and `:focus-within` states. This ensures that the active element's border is pulled to the front, preventing adjacent borders from covering the focus ring or active state color.
