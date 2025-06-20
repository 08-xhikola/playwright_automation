import { Page, Locator } from 'playwright';

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
    await this.page.waitForSelector(`.b-sch-event-content:has-text("${label}")`, {
      timeout: 15000
    });
  }

  getShiftTile(start: string, end: string, duration: string): Locator {
    const label = `${start}-${end} ${duration}`;
    return this.page.locator(`.b-sch-event-content:has-text("${label}")`);
  }

  async openShift(start: string, end: string, duration: string) {
    const tile = this.getShiftTile(start, end, duration);
    await tile.waitFor({ state: 'visible', timeout: 10000 });
    await tile.locator('[data-testid="IconButton.open"]').click();
  }

  async updateShift(start: string, end: string, duration: string, newTitle: string) {
    await this.openShift(start, end, duration);
    await this.page.getByLabel('Titel').fill(newTitle);
    await this.saveShift(start, end, duration);
  }

  async deleteShift(start: string, end: string, duration: string) {
    await this.openShift(start, end, duration);
    await this.page.getByRole('button', { name: 'Löschen' }).click();
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    await this.page.waitForSelector(
      `.b-sch-event-content:has-text("${start}-${end} ${duration}")`,
      { state: 'detached', timeout: 10000 }
    );
  }
}
