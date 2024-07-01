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