import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { World } from '../../src/support/world';
import { ShiftPage } from '../../tests/page_objects/ShiftsPage';

let shiftPage: ShiftPage;

Given('I navigate to the Shifts section', async function (this: World) {
  shiftPage = new ShiftPage(this.page);
  await shiftPage.goToShiftsSection();
});

When('I create a new shift with title {string} from {string} to {string}', async function (this: World, title, start, end) {
  await shiftPage.createShift(title, start, end);
});

When('I select duration {string}', async function (this: World, duration) {
  await shiftPage.selectShiftDuration(duration);
});

When('I assign employee {string} and save shift from {string} to {string} with duration {string}', async function (this: World, employee, start, end, duration) {
  await shiftPage.selectEmployee(employee);
  await shiftPage.saveShift(start, end, duration);
});

Then('the shift from {string} to {string} with duration {string} should be visible', async function (this: World, start, end, duration) {
  const tile = shiftPage.getLatestShiftTile(start, end, duration);
  await expect(tile).toBeVisible();
});

When('I update the shift from {string} to {string} with duration {string} to title {string}', async function (this: World, start, end, duration, newTitle) {
  await shiftPage.updateShift(start, end, duration, newTitle);
});

When('I delete the shift titled {string}', async function (this: World, title) {
  await shiftPage.deleteShift(title);
});

Then('the shift from {string} to {string} with duration {string} should not be visible', async function (this: World, start, end, duration) {
  const tile = this.page.locator(`.b-sch-event-content:has-text("${start}-${end} ${duration}")`);
  await expect(tile).toHaveCount(0, { timeout: 15000 });
});
