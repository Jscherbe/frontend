---
title: Creating SCSS Modules
weight: 10
---
To maintain consistency and configurability, new SCSS modules should follow the library's established patterns. This guide outlines the standard structure for a module, including how to define configuration, handle fallbacks, and output styles.

## Basic Module Structure

Every module should consist of three main parts:
1.  **Configuration:** A default `$config` map.
2.  **Accessors:** `get` and `set` mixins/functions to manage configuration.
3.  **Output:** A `styles` mixin that generates the CSS.

### Template

```scss
////
/// @group component-name
////

@use "sass:map";
@use "../selector";
@use "../utils";

/// Module Settings
/// @type Map
$config: (
  "padding": 1rem,
  "background-color": white,
) !default;

/// Change module configuration
/// @param {Map} $changes Map of changes
/// @example scss
///   @include ulu.component-name-set(( "padding" : 2rem ));
@mixin set($changes) {
  $config: map.merge($config, $changes) !global;
}

/// Get a config option
/// @param {String} $name Name of property
/// @example scss
///   $padding: ulu.component-name-get("padding");
@function get($name) {
  @return utils.require-map-get($config, $name, "component-name [config]");
}

/// Prints component styles
/// @example scss
///  @include ulu.component-name-styles();
@mixin styles {
  $prefix: selector.class("component-name");

  #{ $prefix } {
    padding: get("padding");
    background-color: get("background-color");
  }
}
```

## Advanced Configuration: Fallbacks

Sometimes, a component's default value should inherit from another part of the system (e.g., a core setting like `element.box-shadow`) *unless* the user specifically overrides it.

To achieve this, we use a private `$-fallbacks` map and `utils.function-fallback`.

### Implementing Fallbacks

1.  Define the `$-fallbacks` map linking properties to their source functions.
2.  Set the default value in `$config` to `true`.
3.  Update the `get()` function to check for fallbacks.

```scss
@use "sass:meta";
@use "../element";

// ... imports

// Define fallbacks
$-fallbacks: (
  // If 'box-shadow' is true, get the value from element.get("box-shadow")
  "box-shadow" : (
    "function" : meta.get-function("get", false, "element"),
    "property" : "box-shadow"
  ),
  // Example with arguments (e.g. element.get-rule-style("light"))
  "border-bottom" : (
    "function" : meta.get-function("get-rule-style", false, "element"),
    "arguments" : ("light",)
  )
);

$config: (
  "padding" : (1em, 2em),
  // set to true to trigger fallback
  "box-shadow" : true, 
  "border-bottom" : true,
) !default;

// ... set mixin ...

@function get($name) {
  $value: utils.require-map-get($config, $name, "component-name [config]");
  // Use function-fallback to resolve the value
  @return utils.function-fallback($name, $value, $-fallbacks);
}
```

## Best Practices

-   **Namespacing:** Always use `selector.class("component-name")` to generate class names. This respects the global prefix setting.
-   **Validation:** Use `utils.require-map-get` in your getter to throw helpful errors if a config key is missing (e.g., due to a typo).
-   **Documentation:** Use SassDoc comments (`///`) to document properties and mixins. This helps other developers understand available options.
