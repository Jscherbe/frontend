---
title: Button
layout: default
---



## Sizes

Sizes can be configured this just shows the default sizes

<a href="#" class="button button--small">Small Button</a>
<a href="#" class="button">Default Button</a>
<a href="#" class="button button--large">Large Button</a>

## Active State

Adding the `is-active` class to enable active state.

<a href="#" class="button">Default Button</a>
<a href="#" class="button is-active">Active Button</a>

## With Icon

<a href="#" class="button">
  <span class="button__icon fas fa-gear" aria-hidden="true"></span>
  <span>Icon Before</span>
</a>

<a href="#" class="button">
  <span>Icon After</span>
  <span class="button__icon fas fa-gear" aria-hidden="true"></span>
</a>

## Icon Only

<a href="#" class="button button--icon button--small">
  <span class="button__icon fas fa-gear" aria-hidden="true"></span>
</a>
<a href="#" class="button button--icon">
  <span class="button__icon fas fa-gear" aria-hidden="true"></span>
</a>
<a href="#" class="button button--icon button--large">
  <span class="button__icon fas fa-gear" aria-hidden="true"></span>
</a>

## Other Preset Styles

These can be configured, so these are just the defaults

<a href="#" class="button button--transparent">Transparent Button</a>
<a href="#" class="button button--outline">Outline Button</a>

## Testing of Buttons with common icons and common component use cases

<table>
  <caption>
    Examples of Icons and Icon Button Styles
  </caption>
  <thead>
    <tr>
      <th>
        Type
      </th>
      <th>
        Example
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>
        Modal Close Button
      </th>
      <td>
        <button class="modal__close button button--icon" aria-label="Close modal">
          <span class="modal__close-icon fas fa-xmark button__icon" aria-hidden="true"></span>
        </button>
      </td>
    </tr>
    <tr>
      <th>
        X on standard button--icon
      </th>
      <td>
        <a href="#" class="button button--icon">
          <span class="button__icon fas fa-xmark" aria-hidden="true"></span>
        </a>
      </td>
    </tr>
    <tr>
      <th>
        Search Hourglass
      </th>
      <td>
        <a href="#" class="button button--icon">
          <span class="button__icon fas fa-search" aria-hidden="true"></span>
        </a>
      </td>
    </tr>
    <tr>
      <th>
        Theme Moon and Sun
      </th>
      <td>
        <button class="button button--icon">
        <span class="fa-moon fas"></span>
        <button class="button button--icon">
        <span class="fa-sun fas"></span>
      </button>
      </td>
    </tr>
    <tr>
      <th>
        Settings Cog in 3 sizes
      </th>
      <td>
        <a href="#" class="button button--icon button--small">
          <span class="button__icon fas fa-gear" aria-hidden="true"></span>
        </a>
        <a href="#" class="button button--icon">
          <span class="button__icon fas fa-gear" aria-hidden="true"></span>
        </a>
        <a href="#" class="button button--icon button--large">
          <span class="button__icon fas fa-gear" aria-hidden="true"></span>
        </a>
      </td>
    </tr>
    <tr>
      <th>
        Search Hourglass with Text
      </th>
      <td>
        <a href="#" class="button">
          Search
          <span class="button__icon fas fa-search" aria-hidden="true"></span>
        </a>
      </td>
    </tr>
    <tr>
      <th>
        Download Icon with Text
      </th>
      <td>
        <a href="#" class="button">
          Download
          <span class="button__icon fas fa-download" aria-hidden="true"></span>
        </a>
      </td>
    </tr>
    <tr>
      <th>
        Settings Cog with Text
      </th>
      <td>
        <a href="#" class="button">
          <span class="button__icon fas fa-gear" aria-hidden="true"></span>
          Settings
        </a>
      </td>
    </tr>

    <tr>
      <th>
      </th>
      <td>
      </td>
    </tr>
    <tr>
      <th>
      </th>
      <td>
      </td>
    </tr>
  </tbody>
</table>