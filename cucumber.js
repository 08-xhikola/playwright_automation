module.exports = {
  default: {
    require: [
      "features/step_definitions/**/*.ts",
      "features/support/**/*.ts", // Include this to load hooks and world
    ],
    format: ["progress"],
    paths: ["features/**/*.feature"],
    requireModule: ["ts-node/register"],
    parallel: 0
  },
};
