module.exports = {
  ignore: ["/\core-js\/"],
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
