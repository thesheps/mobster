module.exports = {
  ignore: ["/core-js/", "@babel/runtime-core"],
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
