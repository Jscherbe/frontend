---
title: Data Table
intro: A table for displaying tabular data in native html tables
---

<h2 class="h2">Default Example</h2>

{% CodePreview %}
<table class="data-table">
  <caption>Monthly Revenue Report by Region</caption>
  <thead>
    <tr>
      <th>Region</th>
      <th>Q1 Revenue</th>
      <th>Q2 Revenue</th>
      <th>Year-over-Year Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>North America</td>
      <td>$1,250,000</td>
      <td>$1,340,000</td>
      <td>+12.5%</td>
    </tr>
    <tr>
      <td>Europe</td>
      <td>$850,000</td>
      <td>$920,000</td>
      <td>+8.2%</td>
    </tr>
    <tr>
      <td>Asia Pacific</td>
      <td>$620,000</td>
      <td>$710,000</td>
      <td>+14.5%</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td>$2,720,000</td>
      <td>$2,970,000</td>
      <td>+11.8%</td>
    </tr>
  </tfoot>
</table>
{% endCodePreview %}

<h2 class="h2">Complex Table</h2>

<h2 class="h2">Striped Table</h2>
{% CodePreview %}
{% demoDataTable 'striped' %}
{% endCodePreview %}

<h2 class="h2">Large-first Table</h2>
{% CodePreview %}
{% demoDataTable 'large-first' %}
{% endCodePreview %}

<h2 class="h2">Large-header Table</h2>
{% CodePreview %}
{% demoDataTable 'large-header' %}
{% endCodePreview %}

<h2 class="h2">No-border Table</h2>
{% CodePreview %}
{% demoDataTable 'no-border' %}
{% endCodePreview %}
