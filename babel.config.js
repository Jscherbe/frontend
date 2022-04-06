module.exports = {
  presets: [
    [
      "@babel/preset-env", { 
        useBuiltIns: "usage",
        corejs: "3.21.1"
      }
    ]
  ],
  assumptions: {
    privateFieldsAsProperties: true,
    setPublicClassFields: true
  },
  plugins: [
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-proposal-private-methods"],
    ["@babel/plugin-proposal-private-property-in-object"]
  ]
};