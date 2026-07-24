---
title: Switch
layout: default
intro: Test toggle switches and switch groups
---

## Single Toggle Switch (Checkbox)

<p>A simple on/off switch using a native checkbox. Powered entirely by CSS (no JS required).</p>

<label class="switch">
  <input type="checkbox" class="switch__input">
  <span class="switch__control"></span>
  <span class="switch__label">Toggle feature status</span>
</label>

<br><br>

<label class="switch">
  <input type="checkbox" class="switch__input" checked>
  <span class="switch__control"></span>
  <span class="switch__label">Feature active by default</span>
</label>


## Single Toggle Switch (Button)

<p>A single button behaving as a toggle. In a real-world app, minimal JS toggles <code>aria-pressed</code> and <code>is-active</code>.</p>

<button class="switch" type="button" aria-pressed="false" onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); this.classList.toggle('is-active');">
  <span class="switch__control"></span>
  <span class="switch__label">Toggle setting</span>
</button>


## Switch Group (Radios - Pure CSS Static fallback)

<p>Multiple options styled as a connected group. Active states highlight instantly using pure CSS selectors (no JS initialized) on the <code>.switch--group</code> container.</p>

<div class="switch--group">
  <label class="switch__item">
    <input type="radio" name="static-group" class="switch__input" checked>
    <span class="switch__label">Standard</span>
  </label>
  <label class="switch__item">
    <input type="radio" name="static-group" class="switch__input">
    <span class="switch__label">Express</span>
  </label>
  <label class="switch__item">
    <input type="radio" name="static-group" class="switch__input">
    <span class="switch__label">Overnight</span>
  </label>
</div>


## Switch Group with Sliding Animation (Radios + JS)

<p>Initializing <code>data-ulu-switch</code> on the <code>.switch--group</code> and including a <code>.switch__indicator</code> enables the fluid sliding background transition.</p>

<div class="switch--group" data-ulu-switch>
  <label class="switch__item">
    <input type="radio" name="animated-group-1" class="switch__input" checked>
    <span class="switch__label">Standard</span>
  </label>
  <label class="switch__item">
    <input type="radio" name="animated-group-1" class="switch__input">
    <span class="switch__label">Express</span>
  </label>
  <label class="switch__item">
    <input type="radio" name="animated-group-1" class="switch__input">
    <span class="switch__label">Overnight Delivery</span>
  </label>
  <div class="switch__indicator"></div>
</div>


## Switch Group with Sliding Animation (Buttons / Tablist + JS)

<p>Works equally well with button-based switch groups (or tabs in a tablist) using the <code>is-active</code> class on the items.</p>

<div class="switch--group" data-ulu-switch>
  <button class="switch__item is-active" type="button">
    <span>Tab A</span>
  </button>
  <button class="switch__item" type="button">
    <span>Tab B</span>
  </button>
  <button class="switch__item" type="button">
    <span>Tab C Content</span>
  </button>
  <div class="switch__indicator"></div>
</div>
