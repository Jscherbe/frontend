# Card Grid Breakpoints Brainstorm

## Problem to be Solved

On several sites, we have card grids that need additional breakpoints to slowly transition them to their mobile layout. (ie: going from 4,3,2,1 instead of 4,2,1)

## Brainstorm

### Scherbe Thoughts

I think we could add a $sizes/$breakpoints map like tile-grid, in addition to making the custom properties for the grid template columns. This would get the extra breakpoints that are needed (what you pointed out), allow contextual changing (through custom property, naming would have to be dynamic if breakpoints are configurable), and keep the simple selectors for card-grid when using it how we do normally (for full width card grid displays).

I think before I set that up, I want to revisit the implicit grid solution and see if there are any new modern grid properties that might get the behavior we want. If that is still not viable, I'll set it up with the breakpoints. Does that sound good?

### Adaptive vs Implicit columns

In practice, implicit columns had issues with alignment in the wild. This is why adaptive layout card-grids are used

### Modifiers

Setting this additional breakpoint setup as a modifier would help for sites that have different card-grid view ports (ie: a sidebar page and a regular page)

### "Who should bear the brunt of the styling?"

Should we continue to have the weight of card-grid styling fall on the developer. This allows required specificity based on view ports and other situations.