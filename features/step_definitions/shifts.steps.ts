import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { World } from '../../src/support/world';
import { ShiftPage } from '../../tests/page_objects/ShiftsPage';

let shiftPage: ShiftPage;

Given('I navigate to the Shifts section', async function (this: World) {
  shiftPage = new ShiftPage(this.page);
  await shiftPage.goToShiftsSection();
});

When('I create a new shift with title {string} from {string} to {string}', async function (this: World, title: string, start: string, end: string) {
  await shiftPage.createShift(title, start, end);
});

When('I select duration {string}', async function (this: World, duration: string) {
  await shiftPage.selectShiftDuration(duration);
});

When('I assign employee {string} and save shift from {string} to {string} with duration {string}', async function (this: World, employee: string, start: string, end: string, duration: string) {
  await shiftPage.selectEmployee(employee);
  await shiftPage.saveShift(start, end, duration);
});

Then('the shift from {string} to {string} with duration {string} should be visible', async function (this: World, start: string, end: string, duration: string) {
  const tile = shiftPage.getShiftTile(start, end, duration);
  await expect(tile).toBeVisible();
});

When('I update the shift from {string} to {string} with duration {string} to title {string}', async function (this: World, start: string, end: string, duration: string, newTitle: string) {
  await shiftPage.updateShiftTitle(start, end, duration, newTitle);
});

When('I delete the shift from {string} to {string} with duration {string}', async function (this: World, start: string, end: string, duration: string) {
  await shiftPage.deleteShift(start, end, duration);
});

Then('the shift from {string} to {string} with duration {string} should not be visible', async function (this: World, start: string, end: string, duration: string) {
  const tile = shiftPage.getShiftTile(start, end, duration);
  await expect(tile).toHaveCount(0);
});
