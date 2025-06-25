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
├── .env
├── .github/
│ └── workflows/
│ └── e2e.yml
├── .gitignore
├── cucumber.js
├── cucumber.tsconfig.json
├── features/
│ ├── shifts.feature
│ └── step_definitions/
│ ├── login.steps.ts
│ └── shifts.steps.ts
├── package-lock.json
├── package.json
├── README.md
├── reports/
│ ├── report.html
│ └── report.json
├── screenshots/
├── scripts/
│ └── generate_report.js
├── src/
│ └── support/
│ ├── hooks.ts
│ └── world.ts
├── tests/
│ └── page_objects/
│ ├── LoginPage.ts
│ └── ShiftsPage.ts
├── tsconfig.json
└── videos/

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

