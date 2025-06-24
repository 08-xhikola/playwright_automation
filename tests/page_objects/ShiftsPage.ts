import { Page, Locator, expect } from 'playwright/test';

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
    await this.refresh();
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
    const tile = this.getLatestShiftTile(start, end, duration);
    await tile.click();
    await this.page.locator('button[data-testid="IconButton.open"]').click();
    await this.page.getByLabel('Titel').waitFor({ state: 'visible', timeout: 10000 });
  }

  async updateShift(start: string, end: string, oldDuration: string, newTitle: string) {
    await this.openShift(start, end, oldDuration);
    await this.page.getByLabel('Titel').fill(newTitle);
    await this.page.getByRole('button', { name: 'Speichern' }).click();
    await this.refresh();
    const label = `${start}-${end} ${newTitle}`;
    await this.page.locator(`.b-sch-event-content:has-text("${label}")`).last()
      .waitFor({ state: 'visible', timeout: 15000 });
  }

  async deleteShift(start: string, end: string, duration: string) {
    const label = `${start}-${end} ${duration}`;
    const tile = this.getLatestShiftTile(start, end, duration);
    await tile.waitFor({ state: 'visible', timeout: 10000 });
    await tile.click();
    await this.page.locator('button[data-testid="IconButton.open"]').click();
    await this.page.getByRole('button', { name: 'Löschen' }).click();
    await this.page.waitForTimeout(1000); 
    await this.refresh();
    await expect(this.page.locator(`.b-sch-event-content:has-text("${label}")`).last())
      .toHaveCount(0, { timeout: 15000 });
  }

  async refresh() {
    await this.page.reload();
    await this.page.waitForSelector('.b-sch-event-content', { timeout: 10000 });
  }

  async verifyShiftExistsInUI(start: string, end: string, duration: string) {
    await this.refresh();
    const tile = this.page.locator(`.b-sch-event-content:has-text("${start}-${end} ${duration}")`);
    await expect(tile).toHaveCount(1, { timeout: 10000 });
  }

  async verifyShiftDoesNotExistInUI(start: string, end: string, duration: string) {
    await this.refresh();
    const tile = this.page.locator(`.b-sch-event-content:has-text("${start}-${end} ${duration}")`);
    await expect(tile).toHaveCount(0, { timeout: 10000 });
  }

  async tryToSaveInvalidShift() {
  await this.page.getByRole('button', { name: 'Speichern' }).click();
}

async getErrorToastText(): Promise<string> {
  const toast = this.page.locator('.v-snack__wrapper.error .v-snack__content');
  await toast.waitFor({ state: 'visible', timeout: 5000 });
  return toast.innerText();
}

}
