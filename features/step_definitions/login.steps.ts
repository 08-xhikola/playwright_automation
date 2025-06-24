
import dotenv from 'dotenv';
dotenv.config();

import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { World } from '../../src/support/world';
import { LoginPage } from '../../tests/page_objects/LoginPage';
import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(60 * 1000);
let loginPage: LoginPage;

Given('I am on the login page', async function (this: World) {
  if (!this.page) {
    throw new Error('🚨 this.page is undefined — make sure your Before hook initializes it.');
  }

  const url = 'https://werkstattplanung.net/demo/api/kic/da/index.html#/';
  console.log(`🌐 Navigating to: ${url}`);

  await this.page.goto(url, { waitUntil: 'domcontentloaded' });

  loginPage = new LoginPage(this.page);
});

When('I fill in valid username and password', async function () {
  await loginPage.fillCredentials(process.env.DEMO_USERNAME!, process.env.PASSWORD!);
});

When('I check the stay signed in checkbox', async function () {
  await loginPage.checkStaySignedIn();
});

When('I click the login button', async function () {
  await loginPage.clickLoginButton();
});

Then('I should be redirected to the dashboard', async function (this: World) {
  const responsePromise = this.page.waitForResponse(response =>
    response.url().includes('/broadcasting/auth') && response.request().method() === 'POST'
  );

  const response = await responsePromise;
  expect(response.status()).toBe(200);
});


