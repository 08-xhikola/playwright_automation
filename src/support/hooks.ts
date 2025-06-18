import { Before, After } from '@cucumber/cucumber';
import { World } from './world';
import fs from 'fs';
import path from 'path';

const videoDir = 'videos';
const screenshotDir = 'screenshots';
let cleaned = false;
let screenshotIndex = 0;

// Clean videos folder once before all tests
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
});

After(async function (this: World, { pickle, result }) {
  const scenarioName = pickle.name.replace(/\s+/g, '_');

  // 📸 Screenshot on failure
  if (result?.status === 'FAILED' && this.page) {
    fs.mkdirSync(screenshotDir, { recursive: true });
    const screenshotPath = path.join(screenshotDir, `${scenarioName}_${screenshotIndex++}.png`);
    const screenshot = await this.page.screenshot({ fullPage: true });
    fs.writeFileSync(screenshotPath, screenshot);
    this.attach(screenshot, 'image/png');
  }

  // 🎥 Attach video path to report
  if (this.page) {
    const video = this.page.video();
    if (video) {
      const videoPath = await video.path();
      if (fs.existsSync(videoPath)) {
        this.attach(`Video saved at: ${videoPath}`, 'text/plain');
      }
    }
  }

  await this.close();
});
