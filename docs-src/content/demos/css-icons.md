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
    {% for iconClass in iconClasses %}
      <tr>
        <td>{{ iconClass }}</td> 
        <td>
          <span class="{{ iconClass }}"></span>
        </td>
        <td class="type-small">
          <code>{{ iconClass }}</code>
        </td>
      </tr>
    {% endfor %}
  </tbody>
</table>