# 🎭 Playwright + 🥒 Cucumber End-to-End Test Automation Framework

A modern E2E test automation setup using:

- [Playwright](https://playwright.dev/)
- [Cucumber.js](https://github.com/cucumber/cucumber-js)
- HTML reporting with screenshots and video
- TypeScript

---

## 📦 Features

- ✅ Step definitions using Gherkin (`.feature` files)
- ✅ Page Object Model support
- ✅ Screenshots captured on test failures
- ✅ Video recording for each scenario
- ✅ Auto-cleaning of old videos before each run
- ✅ HTML report with embedded screenshots and video paths

---

## 🚀 Getting Started

1. Install dependencies

```bash
npm install

2. Run tests
bash
npm test

3. Generate HTML report
npm run report
This will open reports/report.html in your browser.

📁 Folder Structure

playwright_automation/
├── features/
│   ├── step_definitions/
│   ├── support/
│   └── *.feature
├── scripts/
│   └── generate-report.js
├── screenshots/
├── videos/
├── reports/
├── package.json
├── tsconfig.json
└── README.md

🧪 Sample Feature
Feature: Login

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I fill in valid username and password
    And I click the login button
    Then I should receive a successful login response

📸 Reporting Summary
Artifact	Location
Screenshots	screenshots/
Videos	videos/
JSON Report	reports/report.json
HTML Report	reports/report.html

🧰 Customization
.env: Configure base URLs and credentials
hooks.ts: Attach logs, rename video files, or add tracing
generate-report.js: Customize HTML report appearance

