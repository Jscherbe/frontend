---
title: Developing Ulu SCSS Module

---

## Basic Setup 

Below is the most common setup for most ulu modules. It identifies it's configuration properties, sets up get/set mixins and the common styles mixin. Everything else can be unique to the module.

```scss
////
/// @group component-name
////

@use "sass:map";
@use "sass:math";

@use "../selector";
@use "../utils";

/// Module Settings
/// @type Map

$config: () !default;

/// Change modules $config
/// @param {Map} $changes Map of changes
///   @include module-name.set(( "property" : value ));

@mixin set($changes) {
  $config: map.merge($config, $changes) !global;
}

/// Get a config option
/// @param {Map} $name Name of property
///   @include module-name.get("property");

@function get($name) {
  @return utils.require-map-get($config, $name, "component-name [config]");
}

/// Prints component styles
/// @demo Check out our demo [accordion]
/// @example scss
///  @include ulu.component-example-styles();

@mixin styles {
  $prefix: selector.class("component-name");

  #{ $prefix } {
    // Your styles
  }
}
```

## Adding Config fallbacks 

Sometimes you want the value of a config property to inherit from another module (ie. core) at output time (after configuration has occurred). The module example below adds a private variable to hold fallback getters. If the value of the config property is `true` the fallback will be used if a value is provided that value is used. 

The only difference between this module and the basic one above is the `$-fallbacks` map and the get mixin has an extra line to insert the fallbacks if the property being requested is `true`

```scss
////
/// @group component-name
////

@use "sass:map";
@use "sass:math";

@use "../selector";
@use "../utils";

// Used for function fallback
$-fallbacks: (
  // Example mapping fallback to another modules config value
  "content-box-shadow" : (
    "function" : meta.get-function("get", false, "element"),
    "property" : "box-shadow"
  ),
  // Example using arguments to function
  "content-border-bottom" : (
    "function" : meta.get-function("get-rule-style", false, "element"),
    "arguments" : ("light",)
  )
);

/// Module Settings
/// @type Map

$config: (
  "padding" : (1em, 2em),
  "content-box-shadow" : true,
  "content-border-bottom" : true,
) !default;

/// Change modules $config
/// @param {Map} $changes Map of changes
///   @include module-name.set(( "property" : value ));

@mixin set($changes) {
  $config: map.merge($config, $changes) !global;
}

/// Get a config option
/// @param {Map} $name Name of property
///   @include module-name.get("property");

@function get($name) {
  $value: utils.require-map-get($config, $name, "component-name [config]");
  @return utils.function-fallback($name, $value, $-fallbacks);
}

/// Prints component styles
/// @demo Check out our demo [accordion]
/// @example scss
///  @include ulu.component-example-styles();

@mixin styles {
  $prefix: selector.class("component-name");

  #{ $prefix } {
    // Your styles
  }
}
```