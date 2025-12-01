# Dist

## UMD

This is for testing (code pen, etc) it includes the full library, externals are set to globals and it has the full stylesheet (only useful for basic testing).

## ES

This is the version of the library that should be consumed by users. It includes the JS bundle and typescript declarations. 

Note the legacy `import { something } from "@ulu/frontend/js/ui/some-module.js"` import syntax is preserved/mapped through this bundle now. But most users should import like `import { something } from "@ulu/frontend"`.

