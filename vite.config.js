import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "vite-plugin-dts";
import packageJson from "./package.json";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isUmd = process.env.BUILD_FORMAT === 'umd';
// Config helper for objects and arrays
const when = (cond, obj) => cond ? obj : (Array.isArray(obj) ? [] : {});

// These are global variables to use in the UMD build for externalized deps
// - Globals (peerDependencies used in UMD bundle) need to be setup by hand, 
//   there should be a common global namespace for each
// - Just need to look at each library to see if they have a common global name
// - In the case of UMD the externals and the globals need to be supplied
//   with the base module/npm name (not deep imports like the rollup plugin does
//   for the es modules bundle)
const umdDeps = {
  globals: {
    "@floating-ui/dom" : "FloatingUIDOM",
    "@ulu/utils" : "UluUtils",
    "swipe-listener" : "SwipeListener"
  },
  external: [
    "@floating-ui/dom", 
    "@ulu/utils", 
    "swipe-listener"
  ],
  check(type) {
    const typeKeys = Array.isArray(this[type]) ? this[type] : Object.keys(this[type]);
    const peerKeys = Object.keys(packageJson.peerDependencies);
    const missing = peerKeys.filter(k => !typeKeys.includes(k))
    if (missing.length) {
      throw new Error(`UMD Config (${ type }): Missing peer dependency(s): ${ missing.join(", ") }`);
    }
  },
};

// Ensure all peer dependencies are accounted for
if (isUmd) {
  umdDeps.check("globals");
  umdDeps.check("external");
}

export default defineConfig({
  plugins: [
    ...when(!isUmd, [ 
      peerDepsExternal(),
      dts()
    ]),
  ],
  build: {
    // We are emptying the directory ourselves since this build runs twice:
    // - Once for es build (different entry)
    // - Once for umd (used for testing/cdn/includes styles) 
    emptyOutDir: true,
    outDir: isUmd ? "dist/umd" : "dist/es",
    // This is important vite doesn't transpile node_module deps by default
    // - So you should ship code that works for most
    // - Users can configure there vite to transpile this if needed
    // - es2015 over es2020 just to be safe, looking at the old vite 4 bundle
    //   it was transpiling pre-es2015 (no chaining ?. etc) so adding this  
    //   so it will match what it was before the update
    // - In the near future we can update this to es2020
    // - This should be good for both es and umd builds
    target: "es2015",
    lib: {
      ...when(isUmd, {
        // Use the full package entry
        entry: resolve(__dirname, "lib/index.js"),
        formats: ["umd"],
        name: "ULU",
        fileName: (format) => `ulu-frontend.${ format }.js`,
      }),
      ...when(!isUmd, {
        // Use only JS bundle barrel file
        entry: resolve(__dirname, "lib/js/index.js"),
        formats: ["es"],
        // Want to build to dist/index.js vs dist/js/index.js
        // fileName: (format) => `index.${ format }.js`,
      })
    },
    rollupOptions: {
      ...when(isUmd, {
        external: umdDeps.external,
        output: {
          globals: umdDeps.globals,
        }
      }),
      ...when(!isUmd, {
        output: {
          preserveModules: true,
          preserveModulesRoot: 'lib/js',
          entryFileNames: '[name].js',
          assetFileNames: '[name][extname]'
        }
      }),
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer()
      ],
    },
    preprocessorOptions: {
      scss: {
        loadPaths: [
          resolve(__dirname, "./lib/scss")
        ],
        quietDeps: true,
        api: "modern-compiler"
      }
    },
  },
});