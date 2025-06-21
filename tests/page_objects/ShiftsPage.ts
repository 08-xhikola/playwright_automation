import { Page, Locator } from 'playwright';
import { expect } from 'playwright/test';

export class ShiftPage {
  constructor(private page: Page) {}

  async goToShiftsSection() {
    await this.page.click('text=Kapazitätsplanung');
    await this.page.click('text=Schichten');
    await this.page.waitForSelector('.b-sch-event-content', { timeout: 10000 });
  }

  async createShift(title: string, start: string, end: string) {
    await this.page.click('button:has(i.mdi-plus)');
    await this.page.getByLabel('Titel').fill(title);
    await this.page.getByLabel('Startzeit').fill(start);
    await this.page.getByLabel('Endzeit').fill(end);
  }

  async selectShiftDuration(label: string) {
    await this.page.getByLabel('Vorlage').click();
    await this.page.locator(`.v-list-item__title:has-text("${label}")`).click();
  }

  async selectEmployee(name: string) {
    await this.page.locator('label:has-text("Mitarbeiter") + div input').click();
    await this.page.locator(`.v-list-item__title:has-text("${name}")`).click();
  }

  async saveShift(start: string, end: string, duration: string) {
    await this.page.getByRole('button', { name: 'Speichern' }).click();
    await this.waitForShiftTile(start, end, duration);
  }

  async waitForShiftTile(start: string, end: string, duration: string) {
    const label = `${start}-${end} ${duration}`;
    await this.page.locator(`.b-sch-event-content:has-text("${label}")`).last()
      .waitFor({ state: 'visible', timeout: 15000 });
  }

  getLatestShiftTile(start: string, end: string, duration: string): Locator {
    const label = `${start}-${end} ${duration}`;
    return this.page.locator(`.b-sch-event-content:has-text("${label}")`).last();
  }

  async openShift(start: string, end: string, duration: string) {
    const label = `${start}-${end} ${duration}`;
    const tile = this.getLatestShiftTile(start, end, duration);
    await tile.click();
    //await this.page.locator(`.b-sch-event:has(.b-sch-event-content:has-text("${label}"))`).last().click()
      await this.page.locator('button[data-testid="IconButton.open"]').click();
    await this.page.getByLabel('Titel').waitFor({ state: 'visible', timeout: 10000 });
  }

  async updateShift(start: string, end: string, duration: string, newTitle: string) {
    await this.openShift(start, end, duration);
    await this.page.getByLabel('Titel').fill(newTitle);
    await this.saveShift(start, end, duration);
  }

async deleteShift(title: string) {
  const lastTile = this.page.locator(`.b-sch-event-content:has-text("${title}")`).last();
  await lastTile.click({ timeout: 10000 });
  await this.page.locator(`div.row--dense .col:has-text("${title}")`).waitFor({ state: 'visible', timeout: 10000 });
  const parentEvent = lastTile.locator('..');
  const openButton = parentEvent.locator('button[data-testid="IconButton.open"]');
  await openButton.click({ timeout: 10000 });
  await this.page.getByRole('button', { name: 'Löschen' }).click();
  await expect(
    this.page.locator(`.b-sch-event-content:has-text("${title}")`).last()
  ).toHaveCount(0, { timeout: 15000 });
}


}
