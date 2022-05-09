module.exports = {
  dir: __dirname,
  debug: false,
  // debugToDir: path.resolve(__dirname, "logs/"),
  previewMeta: `
    <title>Sassdoc Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/ulu-frontend.min.css">
  `,
  previewBodyScripts: `
    <script src="/ulu-frontend.min.js"></script>
  `
};