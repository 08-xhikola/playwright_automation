import { Page } from 'playwright/test';

export class LoginPage {
  constructor(private page: Page) { }

  async fillCredentials(username: string, password: string) {
    if (!username || !password) {
      throw new Error('Missing USERNAME or PASSWORD in .env file');
    }
    await this.page.getByLabel('Benutzername').fill(username);
    await this.page.getByLabel('Passwort').fill(password);
  }

  async checkStaySignedIn() {
    await this.page.getByLabel('Angemeldet bleiben').check();
  }

  async clickLoginButton() {
    await this.page.getByRole('button', { name: 'ANMELDEN' }).click();
  }
}