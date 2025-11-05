# BreakpointManager Fix Needed

There is a bug in the `remove` method of the `Breakpoint` class in `@ulu/frontend/js/ui/breakpoints.js`.

## The Bug

The current implementation of `Breakpoint.remove` is:

```javascript
  remove(handler, direction) {
    const directions = direction ? [ direction ] : ['max', 'min', 'only'];
    directions.forEach(d => d.remove(handler));
  }
```

The `directions` array contains strings (`'max'`, `'min'`, `'only'`). The `forEach` loop then attempts to call `.remove()` on these strings (`d.remove(handler)`), which causes a `TypeError: d.remove is not a function`.

## The Fix

The method should instead access the `BreakpointDirection` object from the `this.directions` property using the direction string as the key.

The corrected implementation should be:

```javascript
  remove(handler, direction) {
    const directions = direction ? [ direction ] : ['max', 'min', 'only'];
    directions.forEach(d => {
      if (this.directions[d]) {
        this.directions[d].remove(handler);
      }
    });
  }
```

Alternatively, a more concise way to write this would be:

```javascript
  remove(handler, direction) {
    const directions = direction ? [ this.directions[direction] ] : Object.values(this.directions);
    directions.forEach(d => {
      if (d) {
        d.remove(handler);
      }
    });
  }
```

This ensures that the `remove` method is called on the actual `BreakpointDirection` instance, resolving the bug.

## Temporary Workaround

A temporary workaround has been implemented in `frontend-vue/lib/components/layout/UluWhenBreakpoint.vue` which bypasses the buggy method:

```javascript
// HACK: The breakpoint.remove method is bugged, this is the correct implementation
if (breakpoint.directions[direction]) {
  breakpoint.directions[direction].remove(handler);
}
```
