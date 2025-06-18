const reporter = require('cucumber-html-reporter');

reporter.generate({
  theme: 'bootstrap',
  jsonFile: 'reports/report.json',
  output: 'reports/report.html',
  screenshotsDirectory: 'screenshots/',
  storeScreenshots: true,
  reportSuiteAsScenarios: true,
  launchReport: true
});
