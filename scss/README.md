
### Directory Contents/Structure

1. Base - The area for the base styles (normalize, html elements)
2. Components - The area for reusable ui/layout components
3. Helpers - The place for stylesheets that provide overriding/atomic styles (accessibility, type classes, etc)
4. Lib - The modules that are used throughout the system and on the user's side
5. Packages - Entry points for users with preset imports 
   - Note: User's will need to add a namespace like `ulu` when importing a package

### Important Goals

1. You should be able get access to anything from the user's side
   - Mixins, Functions, Variables
   - Styles - Things should be able to be 
     - Extended into a pre-existing system (when you have little selector control)
     - Mixing in styles when needed
       - Use placeholders as a more flexible selector system
2. Namespacing
   - Should you be able to namespace the library (selectors not modules)?
     - Would create a log of interpolation which makes the codebase harder to maintain
     - Bigger barrier if someone else works into this
     - Probably important with certain components
     - If it's within a module/component (interpolation) it's probably not a huge deal

### Rules

- Leverage default parameters in mixin and functions over config defaults that rely on other module's configuration
  - Testing shows that these are evaluated when the function is called, which makes sense because if not these may have all the same references (thinking JS has the parameter scope and is evaluated on call)
- No changing vars (aka with)
- No extending (not supported, only within the same module for convenience)
- No relying on use of @use > with to configure, it's too complicated for user (and me). 
  - Use mixin to set vars (kind of a pain but we should probably rely more on maps so there isn't so much repetition)
- Kabab case will be used for everything, @see "Module Prefixes" below, works better with kabab case
- Modules use simple variable, mixins and function names relative to their module
- Forwards will make namespacing in the overall ulu packaged module
- **Module Prefixes:** Modules all get prefixed by parent module ie lib will transform color.set() to color-set(), adding the modules namespace for users that are importing the whole library. It also matches the core modules `map-get()` and when @used `map.get()`

### Writing Docs

- Should be written from the user's point of view
  - Use prefixes @see "Module Prefixes" in member names. This will avoid confusion about normal use case. For advanced user importing specific parts would already be familiar with this pattern. 

### Ideas

- How to solve the inability to use standard vars (avoid with)
  - Use maps (reduce code repetition, just need boiler plate get/set (may be able to contain this in utils and extend the module not sure if you can add functions to a namespace dynamically?))
    - Issue: You can't use it for grandchild deps defaults, aka if another dep has .get() then it will get the unconfigured value
      - The issue is that these things are not references or there is no way to easily poin
      - Think how do we solve this in JS?
      - Could this be solved by some standardized lifecycle?
        - Fuzzy but something that the user has to call to initialize? (don't like this)
      - Could this be solved by tokens? Like the color library (actual value is set when requested, versus variables (on module init))
    - Note: This is one reason the element system ("_element()") mixin could be handy across the board. It still has the same issue though in terms of references changing (maps being cloned and they aren't references)
    - Could use a global config/theme and allow that to be set with "with"
    - Or allow the user to configure the modules and not try and group modules
      - One flat list
    - Needs more thought

  ### Naming Convention for Config Options

  - When naming config options, the hierarchy is: Element, Styling, State of Element
    - For Example: icon-color-hover = element-styling-state
  
  ### Organizing Config Options
  
  - Config options are alphabetized with the following exceptions.
    - If the option relates to a modifier with 3 or more options, these options are alphabetized together below the rest of the config options.
    - Any maps go at the very bottom. This is to help with scanning the rest of the options
    <!-- add a section about how to document the modules. Add the naming convention rules and the alphabetizing rules -->