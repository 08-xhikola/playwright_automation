module.exports = {
  default: {
    require: [
      "features/step_definitions/**/*.ts",
      "features/support/**/*.ts",
    ],
    format: ["progress"],
    paths: ["features/**/*.feature"],
    requireModule: ["ts-node/register"],
    parallel: 0
  },
};
