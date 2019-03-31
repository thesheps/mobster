module.exports = {
  ignore: ["/\bcore-js\b/"],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          ie: 11
        },
        useBuiltIns: "usage"
      }
    ],
    "@vue/app"
  ]
};
