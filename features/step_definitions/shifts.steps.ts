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

When('I delete the shift from {string} to {string} with duration {string}', async function (this: World, start, end, duration) {
    await shiftPage.deleteShift(start, end, duration);
});

Then('the shift from {string} to {string} with duration {string} should exist in the UI', async function (this: World, start, end, duration) {
    await shiftPage.verifyShiftExistsInUI(start, end, duration);
});

Then('the shift from {string} to {string} with duration {string} should not exist in the UI', async function (this: World, start, end, duration) {
    await shiftPage.verifyShiftDoesNotExistInUI(start, end, duration);
});

When('I assign employee {string} and try to save shift from {string} to {string} with duration {string}', async function (this: World, employee, start, end, duration) {
    await shiftPage.selectEmployee(employee);
    await shiftPage.tryToSaveInvalidShift();
});

Then('an error message {string} should be visible', async function (this: World, expectedMessage) {
    const errorText = await shiftPage.getErrorToastText();
    console.log('✉️ Actual error text received:', errorText);
    expect(errorText).toContain(expectedMessage);
});
