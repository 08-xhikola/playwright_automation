import { Before, After } from '@cucumber/cucumber';
import { World } from './world';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../../tests/page_objects/LoginPage';

const videoDir = 'videos';
const screenshotDir = 'screenshots';
let cleaned = false;
let screenshotIndex = 0;

function cleanVideosOnce() {
  if (!cleaned) {
    if (fs.existsSync(videoDir)) fs.rmSync(videoDir, { recursive: true, force: true });
    fs.mkdirSync(videoDir, { recursive: true });
    cleaned = true;
  }
}

Before(async function (this: World) {
  cleanVideosOnce();
  await this.init();

  const loginPage = new LoginPage(this.page);
  await this.page.goto(process.env.DEMO_URL!);
  await loginPage.fillCredentials(process.env.DEMO_USERNAME!, process.env.PASSWORD!);
  await loginPage.clickLoginButton();
});

After(async function (this: World, { pickle, result }) {
  const scenarioName = pickle.name.replace(/\s+/g, '_');

  if (result?.status === 'FAILED' && this.page) {
    fs.mkdirSync(screenshotDir, { recursive: true });
    const screenshotPath = path.join(screenshotDir, `${scenarioName}_${screenshotIndex++}.png`);
    const screenshot = await this.page.screenshot({ fullPage: true });
    fs.writeFileSync(screenshotPath, screenshot);
    this.attach(screenshot, 'image/png');
  }

  const video = this.page?.video?.();
  if (video) {
    const videoPath = await video.path();
    if (fs.existsSync(videoPath)) {
      this.attach(`Video saved at: ${videoPath}`, 'text/plain');
    }
  }

  await this.close();
});
