---
title: WYSIWYG
intro: Test wysiwyg (styling based on elements)
layout: default
---


## This is h2

<h2 class="h3 wysiwyg__exclude">This is h2 with class of h3</h2>

## List Test (default)

- This is a list item
- This is a list item
- This is a list item
- This is a list item

## List Test (with exclude)

<ul class="wysiwyg__exclude">
  <li>This is a list item</li>
  <li>This is a list item</li>
  <li>This is a list item</li>
  <li>This is a list item</li>
</ul>

## List Test (with a user added exclude)

<ul class="list-lines">
  <li>This is a list item</li>
  <li>This is a list item</li>
  <li>This is a list item</li>
  <li>This is a list item</li>
</ul>

## Test Normal Link

[Go to Google](https://www.google.com)

## Test Link Excluded 

<a class="wysiwyg__exclude" href="https://www.google.com">This is a link unstyled by wysiwyg</a>


## Test Link (with a user added exclude)

<a class="button" href="https://www.google.com">View Google</a>