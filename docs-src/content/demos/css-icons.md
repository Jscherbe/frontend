---
title: CSS Icons 
intro: Basic icons that use only CSS
---

<table class="site-data-table">
  <caption>Available Icons</caption>
  <thead>
    <tr>
      <th style="width: 30%">Text Example</th>
      <th>In Button</th>
      <th>Class</th>
    </tr>
  </thead>
  <tbody>
    {% for name in iconNames %}
      <tr>
        <td>
          <span class="css-icon css-icon--{{ name }}" aria-hidden="true"></span>
          {{ name }}
        </td>
        <td>
          <button 
            class="button button--icon" 
            aria-label="Example Button"
          >
            <span class="css-icon css-icon--{{ name }} type-small" aria-hidden="true"></span>
          </button>
        </td>
        <td class="type-small">
          <code>css-icon css-icon--{{ name }}</code>
        </td>
      </tr>
    {% endfor %}
  </tbody>
</table>

<h2 class="h2">Icons that transition</h2>

<table class="site-data-table">
  <caption>Available Icons</caption>
  <thead>
    <tr>
      <th>Icon</th>
      <th>Class</th>
      <th>Toggle State</th>
    </tr>
  </thead>
  <tbody>
    {% for name in iconNamesActiveState %}
      <tr>
        <td>
          <span  
            class="css-icon css-icon--{{ name }}"
            data-demo-icon-target
          ></span>
          {{ name }}
        </td>
        <td class="type-small">
          <code>css-icon css-icon--{{ name }}</code>
        </td>
        <td>
          <button 
            class="button button--small"
            data-demo-icon-toggle
          >Toggle</button>
        </td>
      </tr>
    {% endfor %}
  </tbody>
</table>

<script>
  const toggles = document.querySelectorAll("[data-demo-icon-toggle]");
  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const row = toggle.closest("tr");
      const icon = row ? row.querySelector("[data-demo-icon-target]") : null;
      if (icon) {
        icon.classList.toggle("is-active");
      }
    });
  });
</script>

<table class="site-data-table">
  <caption>Test Different Stroke Width</caption>
  <thead>
    <tr>
      <th style="width: 60%">Text Example</th>
      <th>Class</th>
    </tr>
  </thead>
  <tbody>
    {% for name in iconNames %}
      <tr>
        <td class="type-large-xx">
          <span class="css-icon css-icon--stroke-large css-icon--{{ name }}" aria-hidden="true"></span>
          {{ name }}
        </td>
        <td class="type-small">
          <code>css-icon css-icon--stroke-large css-icon--{{ name }}</code>
        </td>
      </tr>
    {% endfor %}
  </tbody>
</table>