# Card Refactor

## Best method for the hover/focus ring?

Summary: Seems like outline is the only solution with the only drawback being no gradient borders.

- Pseodo
  - Pro: Looks correct
  - Con: Requires position relative
- Border
  - Pro: Easy straight forward
  - Con: Can't move over the image (is not in any order is at same level as background)
- Outline
  - Pro: On outside, Outline supports border-radius and transition
  - Con: 
    - Will be outside the border (current pseudo is on top of border which is visually best)
    - Doesn't support gradient like border / pseudo (border image)
  - Workarounds
    - Use this for the border too?
    - Use offset (still will be under image I think)
      - LEFT OFF HERE
- Use another Box Shadow to simulate
  - Pro: On outside
  - Con: 
    - Outside of border too
    - The outline method is better than this as it can't support gradients and is always on the outside (outline can overlap border)
  - Workarounds
    - Use this for the border too?
    - Inset won't work box shadow is only right above it's background

## Image

- Get rid of position absolute I think this is unneeded

## Things that need to be checked with outline migration

- make sure to test image hover styles filter and transform
- Consider Removing: "--no-image" modifier?
- CHECK: "overlay-background-color-hover" used pseudo
- DOCUMENT/UPDATE API DOCS: Change "border" to "border-width" and "border-color" (breaking)
- Document/Update: Removed "image-margin"