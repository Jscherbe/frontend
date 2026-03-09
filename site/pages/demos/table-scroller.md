---
title: Table Scroller
intro: Simple wrapper for tables to make them overflow-x horizontally.
---

<h2 class="h2">Examples</h2>

<h3 class="h3">Default Table Scroller</h3>

<p>A simple wrapper for tables to make them horizontally scrollable on smaller screens.</p>

{% CodePreview %}
<div class="table-scroller">
  <table class="data-table">
    <thead>
      <tr>
        <th>Employee ID</th>
        <th>Full Name</th>
        <th>Department</th>
        <th>Job Title</th>
        <th>Location</th>
        <th>Start Date</th>
        <th>Status</th>
        <th>Manager</th>
        <th>Email Address</th>
        <th>Extension</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>EMP-001</td>
        <td>Jane Doe</td>
        <td>Engineering</td>
        <td>Senior Developer</td>
        <td>New York</td>
        <td>2020-03-15</td>
        <td>Active</td>
        <td>Michael Smith</td>
        <td>jane.doe@company.com</td>
        <td>x4012</td>
      </tr>
      <tr>
        <td>EMP-002</td>
        <td>John Smith</td>
        <td>Marketing</td>
        <td>Marketing Director</td>
        <td>London</td>
        <td>2018-11-01</td>
        <td>Active</td>
        <td>Sarah Jones</td>
        <td>john.smith@company.com</td>
        <td>x5521</td>
      </tr>
      <tr>
        <td>EMP-003</td>
        <td>Alice Johnson</td>
        <td>Human Resources</td>
        <td>HR Specialist</td>
        <td>Chicago</td>
        <td>2022-06-20</td>
        <td>On Leave</td>
        <td>Robert Brown</td>
        <td>alice.johnson@company.com</td>
        <td>x3190</td>
      </tr>
    </tbody>
  </table>
</div>
{% endCodePreview %}

<h3 class="h3">No-wrap Modifier</h3>

<p>Use the <code>table-scroller--nowrap</code> modifier to prevent the table headers from wrapping, forcing the table to scroll if the headers are long.</p>

{% CodePreview %}
<div class="table-scroller table-scroller--nowrap">
  <table class="data-table">
    <thead>
      <tr>
        <th>Transaction Reference Number</th>
        <th>Date and Time of Transaction</th>
        <th>Detailed Description of Items</th>
        <th>Categorization for Tax Purposes</th>
        <th>Total Amount (USD)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>TXN-982374-A</td>
        <td>2023-10-24 14:32:00</td>
        <td>Monthly software subscription renewal</td>
        <td>Software & Subscriptions</td>
        <td>$129.99</td>
      </tr>
      <tr>
        <td>TXN-982375-B</td>
        <td>2023-10-25 09:15:30</td>
        <td>Office supplies and equipment for new hires</td>
        <td>Office Expenses</td>
        <td>$450.50</td>
      </tr>
    </tbody>
  </table>
</div>
{% endCodePreview %}
