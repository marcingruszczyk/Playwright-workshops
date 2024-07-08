import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = 'tester12';
    const userPassword = 'pass1234';

    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
  });

  test('Test transferu', async ({ page }) => {
    // Arrange

    const receiverId = '2';
    const transferAmount = '120';
    const transferTitle = 'Zwrot środków';

    //Act

    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await page.getByRole('link', { name: 'Przelew wykonany! Chuck' }).click();
  });
  test('Successful mobile top-up', async ({ page }) => {
    // Arrange
    const topupReceiver = '500 xxx xxx';
    const topupAmount = '50';
    const topupChekbox = 'zapoznałem się z regulaminem';
    const expectedMessage =
      'Doładowanie wykonane! 50,00PLN na numer 500 xxx xxx';

    //Act

    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_topup_receiver').selectOption(topupReceiver);
    await page.locator('#widget_1_topup_amount').click();
    await page.locator('#widget_1_topup_amount').fill(topupAmount);
    await page.getByText(topupChekbox).click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.getByTestId('message-text')).toHaveText(expectedMessage);
  });
});
