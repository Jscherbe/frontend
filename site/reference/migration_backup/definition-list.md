---
title: Definition List
layout: unformatted
parent: Demos
--- 

<h2 class="h2">Default</h2>
<p>
  The default definition list styles items as a simple stack.
</p>

<dl class="definition-list">
  <div>
    <dt>Short Term</dt>
    <dd>This is a longer definition to demonstrate how text wraps in the default layout.</dd>
  </div>
  <div>
    <dt>A Much Longer Term That Might Wrap</dt>
    <dd>A short definition.</dd>
  </div>
</dl>

<p>
  <em>Paragraph after to test margins</em>
</p>

<h2 class="h2">Separated</h2>
<p>
  The <code>--separated</code> modifier adds a rule between each item.
</p>

<dl class="definition-list definition-list--separated">
  <div>
    <dt>Short Term</dt>
    <dd>This is a longer definition to demonstrate how text wraps.</dd>
  </div>
  <div>
    <dt>A Much Longer Term That Might Wrap</dt>
    <dd>A short definition.</dd>
  </div>
</dl>

<h2 class="h2">Separated &amp; Separated First</h2>
<p>
  Using <code>--separated</code> and <code>--separated-first</code> together adds a rule to the top of the first item and between all subsequent items.
</p>

<dl class="definition-list definition-list--separated definition-list--separated-first">
  <div>
    <dt>Short Term</dt>
    <dd>This is a longer definition to demonstrate how text wraps.</dd>
  </div>
  <div>
    <dt>A Much Longer Term That Might Wrap</dt>
    <dd>A short definition.</dd>
  </div>
</dl>

<h2 class="h2">Separated &amp; Separated First/Last</h2>
<p>
  You can use all three separator modifiers (<code>--separated</code>, <code>--separated-first</code>, <code>--separated-last</code>) to enclose the entire list in borders.
</p>

<dl class="definition-list definition-list--separated definition-list--separated-first definition-list--separated-last">
  <div>
    <dt>Short Term</dt>
    <dd>This is a longer definition to demonstrate how text wraps.</dd>
  </div>
  <div>
    <dt>A Much Longer Term That Might Wrap</dt>
    <dd>A short definition.</dd>
  </div>
</dl>

<h2 class="h2">Table</h2>
<p>
  The <code>--table</code> modifier displays the list in a two-column grid on larger screens.
</p>

<dl class="definition-list definition-list--table">
  <div>
    <dt>Short Term</dt>
    <dd>This is a longer definition to demonstrate how text wraps in the table layout.</dd>
  </div>
  <div>
    <dt>A Much Longer Term That Might Wrap onto multiple lines</dt>
    <dd>A short definition.</dd>
  </div>
</dl>

<h2 class="h2">Table &amp; Separated</h2>
<p>
  Modifiers can be combined. Here is an example of the <code>--table</code> and <code>--separated</code> modifiers used together, with <code>--separated-first</code> to add a top border.
</p>

<dl class="definition-list definition-list--table definition-list--separated definition-list--separated-first">
  <div>
    <dt>Short Term</dt>
    <dd>This is a longer definition to demonstrate how text wraps in the table layout.</dd>
  </div>
  <div>
    <dt>A Much Longer Term That Might Wrap onto multiple lines</dt>
    <dd>A short definition.</dd>
  </div>
</dl>

<h2 class="h2">Inline</h2>
<p>
  The <code>--inline</code> modifier displays only the definition descriptions (<code>&lt;dd&gt;</code>) on the same line.
</p>

<dl class="definition-list definition-list--inline">
  <div>
    <dt>Term 1</dt>
    <dd>Definition 1</dd>
    <dd>Definition 1.1</dd>
    <dd>This is a much longer definition to see how it wraps when inline.</dd>
  </div>
  <div>
    <dt>A Longer Term</dt>
    <dd>Definition 2</dd>
  </div>
</dl>

<h2 class="h2">Inline All</h2>
<p>
  The <code>--inline-all</code> modifier displays both the definition term (<code>&lt;dt&gt;</code>) and its descriptions (<code>&lt;dd&gt;</code>) on the same line.
</p>

<dl class="definition-list definition-list--inline-all">
  <div>
    <dt>Term</dt>
    <dd>Definition 1</dd>
    <dd>Definition 1.1</dd>
    <dd>This is a much longer definition to see how it wraps when inline.</dd>
  </div>
  <div>
    <dt>A Longer Term</dt>
    <dd>Definition 2</dd>
  </div>
</dl>

<h2 class="h2">Inline All (no whitespace test)</h2>
<p>
  The <code>--inline-all</code> modifier displays both the definition term (<code>&lt;dt&gt;</code>) and its descriptions (<code>&lt;dd&gt;</code>) on the same line.
</p>

<dl class="definition-list definition-list--inline-all">
  <div>
    <dt>Term</dt><dd>Definition 1</dd><dd>Definition 1.1</dd><dd>This is a much longer definition to see how it wraps when inline.</dd>
  </div>
  <div>
    <dt>A Longer Term</dt><dd>Definition 2</dd>
  </div>
</dl>

<h2 class="h2">Inline All Compact</h2>
<p>
  The <code>--compact</code> modifier reduces the margin between items. It can be combined with any other modifier, like <code>--inline-all</code>.
</p>

<dl class="definition-list definition-list--inline-all definition-list--compact">
  <div>
    <dt>Term 1</dt>
    <dd>This is a longer definition to demonstrate how text wraps in the compact inline layout.</dd>
  </div>
  <div>
    <dt>A Longer Term</dt>
    <dd>Definition 2</dd>
  </div>
</dl>

<h2 class="h2">Compact Separated</h2>
<p>
  Here is an example combining the <code>--compact</code> spacing modifier with all of the separator modifiers.
</p>

<dl class="definition-list definition-list--separated definition-list--separated-first definition-list--separated-last definition-list--compact">
  <div>
    <dt>Term 1</dt>
    <dd>This is a longer definition to demonstrate how text wraps in the compact inline layout.</dd>
  </div>
  <div>
    <dt>A Longer Term</dt>
    <dd>Definition 2</dd>
  </div>
</dl>
