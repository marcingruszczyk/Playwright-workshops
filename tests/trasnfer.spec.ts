import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { TransferPage } from '../pages/transfer.page';

test.describe('Transfer tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('Simple trasnfer', async ({ page }) => {
    //Arange
    const receiverName = 'Jan Nowak';
    const receiverAccountNumber = '12 3456 7891 2345 6789 1234 56789';
    const transferAmount = '50';
    const expectedMessage = 'Przelew wykonany! 50,00PLN dla Jan Nowak';

    //Act
    const transferPage = new TransferPage(page);
    await transferPage.transferReceiver.fill(receiverName);
    await transferPage.accountNumber.fill(receiverAccountNumber);
    await transferPage.transferAmount.fill(transferAmount);
    await transferPage.transferButton.click();
    await transferPage.closeButton.click();

    // await page.getByTestId('transfer_receiver').fill(receiverName);
    // await page.getByTestId('form_account_to').fill(receiverAccountNumber);
    // await page.getByTestId('form_amount').fill(transferAmount);
    // await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    // await page.getByTestId('close-button').click();

    //Assert
    await expect(transferPage.transferMessage).toHaveText(expectedMessage);
  });
});
