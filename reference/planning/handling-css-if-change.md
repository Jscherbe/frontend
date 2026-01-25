# Handling the Sass `if()` Function Deprecation

The global `if()` function in Sass is deprecated and will be removed in future versions. Our codebase uses this function, and we need to refactor it to align with the new standards. See the official documentation: [Sass `if()` breaking change](https://sass-lang.com/documentation/breaking-changes/if-function/).

## The Challenge

A direct migration to the new `if(...)` syntax is complicated by a lack of proper support in some development tools, like VS Code's SCSS IntelliSense, which may show false-positive errors for the new syntax.

To address this, we will use a two-pronged approach for the refactor:

### Eager Evaluation with `utils.when()`

For simple conditional assignments where the arguments can be safely evaluated without causing errors (i.e., no lazy evaluation is needed), we will use a custom utility function.

- **Function**: `utils.when($condition, $value-true, $value-false)`
- **Location**: Defined in `lib/scss/_utils.scss`.
- **Behavior**: This function mimics the old `if()` signature but evaluates its arguments *eagerly* before the function is called.

**Example Usage:**
A call like `if($size != null, true, false)` can be safely rewritten as `utils.when($size != null, true, false)`.

### B. Lazy Evaluation with the new `if(sass(...))` syntax or @if/@else

For complex cases that require lazy evaluation—where one of the branches would throw an error if evaluated prematurely (e.g., accessing a map key that may not exist)—we must use the new official syntax. This preserves the lazy evaluation behavior of the original `if()` function.

`if(sass(<condition>): <true-value>; else: <false-value>)`

or 

@if / @else