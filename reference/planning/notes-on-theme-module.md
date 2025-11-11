# Introduce the themes module

Planning how to integrate property switching and definition of theme maps. Considered several approaches, landed on dedicated module for themes. Thought about how we could still build automatic theming if needed (not a major goal but is something we want possible). 

## Brainstorm

- Not sure on naming but we can add the themes module (one that outputs themes custom vars and fake filter)
  - This way the API for theme definition is defined
- How to position this in this library, need to document how we work with colors
  - Still think about adjusting color system so it has nested maps for themes? 
    - Like if you were able to set colors that work more like an object
      - Has a default and also has variations
      - A benefit would be easier color usage throughout the system 
      - The color stuff may become more complex for little gain (we already work without features like that)
        - This has been a pain-point in other libraries we've used (too boxed in)
        - The straightforward way it works now (as a lookup) is simple but gives expected results
      - A benefit would be simplicity for defining multiple values for a color in the UI
        - I guess color is maybe not the name for these things? (third idea, separate module/concept on top of color and theme)
    - Although themes can contain more than color values
    - And maybe themes is not the right naming, it's more about switching themes or more specifically custom properties
  - I think 3rd plan (separate module)
    - Create "themes" module 
      - Move (well consider) declare-theme-map mixin to theme (and use cssvar)
          - Could keep reference in cssvar and document that it will be removed in future
          - Could add warning when it's used (forward call for now)
    - Themes is the natural name (even though all kinds of things are theme related)
      - Works with the modular nature of the library, keeps color module simple
      - Integrates what we've been doing manually in projects
      - Automatic theming (the only reason to make a more complex and tightly coupled color system) can already be accomplished the inverse way, by building a module that provides configuration for this library in an opinionated way
        - Such as by defining their (this other module outside ulu, referred to as they) own module with color palette and functions that manipulate it, before passing it through as configuration for the ulu library.
          - This way the opinions of where and which custom property to assign to any given ulu configuration is a choice that they make vs choices that this library makes (doesn't make very many). I think working that way is better as it allows you to rely on configuration you know to exist (because they can set it). For example if they wanted unique type size "body-large" (not something we include by default) they would add that configuration and then they would set it up throughout the library as they see fit. So you setup your own needs and if automatic color adjustments are something you need (where say you change default values that affect the whole UI), you define the system that adjusts those values (your own opinions) and then you apply them throughout configuration (your own opinions). Your users would then adjust your module to adjust configuration in ulu, then modify as they see fit. Takeaway is we don't need to make this really complex by making automatic things happen as that can be on a layer above this library.