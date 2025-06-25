import { setWorldConstructor, World as CucumberWorld } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';

export class World extends CucumberWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: any) {
    super(options);
  }

  async init() {
    this.browser = await chromium.launch({
  headless: process.env.CI === 'true' ? true : false
});


    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: 'videos/',
        size: { width: 1280, height: 720 }
      }
    });

    this.page = await this.context.newPage();
  }

  async close() {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(World);
