import path from "path";
import fs from "fs";
import mime from "mime-types";

/**
 * Creates the middleware for serving Eleventy output in dev mode.
 * @param {string} devOutDir - The absolute path to the Eleventy output directory.
 * @param {function} log - The logger function.
 * @param {object} pluginOptions - The options passed to the eleventyPlugin.
 * @param {object} viteConfig - The resolved Vite config.
 * @returns {function} The middleware function.
 */
export function createEleventyMiddleware(devOutDir, log, pluginOptions = {}, viteConfig = {}) {
  const publicDir = path.resolve(viteConfig.root, viteConfig.publicDir);

  return function eleventyMiddleware(req, res, next) {
    if (req.method !== "GET") {
      return next();
    }

    let url = req.url.split("?")[0];
    const pathPrefix = pluginOptions.pathPrefix || (viteConfig && viteConfig.base) || "/";

    if (pathPrefix !== "/" && url.startsWith(pathPrefix)) {
      let strippedUrl = url.slice(pathPrefix.length);
      if (!strippedUrl.startsWith('/')) {
        strippedUrl = '/' + strippedUrl;
      }
      url = strippedUrl;
    }

    // --- 1. Check for file in Eleventy's output directory ---
    let eleventyPath = path.join(devOutDir, url);
    if (url.endsWith("/")) {
      eleventyPath = path.join(devOutDir, url, "index.html");
    } else if (!path.extname(url)) {
      if (fs.existsSync(eleventyPath + ".html")) {
        eleventyPath += ".html";
      } else if (fs.existsSync(path.join(eleventyPath, "index.html"))) {
        eleventyPath = path.join(eleventyPath, "index.html");
      }
    }

    if (fs.existsSync(eleventyPath) && fs.statSync(eleventyPath).isFile()) {
      log(`[middleware] Found in 11ty output. Serving: ${ eleventyPath }`);
      const type = mime.lookup(eleventyPath) || "text/html";
      res.setHeader("Content-Type", type);

      if (type === "text/html") {
        let html = fs.readFileSync(eleventyPath, "utf-8");
        html = html.replace(
          "</head>",
          `<script type="module" src="/@vite/client"></script>\n</head>`
        );
        res.end(html);
      } else {
        fs.createReadStream(eleventyPath).pipe(res);
      }
      return;
    }
    
    // --- 2. Check for file in Vite's public directory ---
    // The URL from the browser will be absolute (e.g., /fonts/foo.woff), 
    // so we strip the leading slash to join it with the publicDir path.
    const publicPath = path.join(publicDir, url.startsWith('/') ? url.substring(1) : url);
    if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
      log(`[middleware] Found in public dir. Serving: ${ publicPath }`);
      const type = mime.lookup(publicPath) || "application/octet-stream";
      res.setHeader("Content-Type", type);
      fs.createReadStream(publicPath).pipe(res);
      return;
    }

    // --- 3. If not found, pass to the next middleware ---
    log(`[middleware] File not found in 11ty or public dirs. Passing to next.`);
    next();
  };
}
