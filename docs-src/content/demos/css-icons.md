---
title: CSS Icons 
intro: Basic icons that use only CSS
---

<table class="site-data-table">
  <caption>Available Icons</caption>
  <thead>
    <tr>
      <th>Name</th>
      <th>Icon</th>
      <th>Class</th>
    </tr>
  </thead>
  <tbody>
    {% for name in iconNames %}
      <tr>
        <td>{{ name }}</td> 
        <td>
          <span class="css-icon css-icon--{{ name }}"></span>
        </td>
        <td class="type-small">
          <code>css-icon css-icon--{{ name }}</code>
        </td>
      </tr>
    {% endfor %}
  </tbody>
</table>

<h2>Icons that transition</h2>

<table class="site-data-table">
  <caption>Available Icons</caption>
  <thead>
    <tr>
      <th>Name</th>
      <th>Icon</th>
      <th>Class</th>
      <th>Toggle State</th>
    </tr>
  </thead>
  <tbody>
    {% for name in iconNamesActiveState %}
      <tr>
        <td>{{ name }}</td> 
        <td>
          <span  
            class="css-icon css-icon--{{ name }}"
            data-demo-icon-target
          ></span>
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