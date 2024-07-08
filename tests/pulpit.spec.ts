import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  test.only('Test transferu', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'tester12';
    const userPassword = 'pass1234';

    const receiverId = '2';
    const transferAmount = '120';
    const transferTitle = 'Zwrot środków';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
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
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester12');
    await page.getByTestId('password-input').fill('pass1234');
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
    await page.locator('#widget_1_topup_amount').click();
    await page.locator('#widget_1_topup_amount').fill('50');
    await page.getByText('zapoznałem się z regulaminem').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    await expect(page.getByTestId('message-text')).toHaveText(
      'Doładowanie wykonane! 50,00PLN na numer 500 xxx xxx',
    );
  });
});
