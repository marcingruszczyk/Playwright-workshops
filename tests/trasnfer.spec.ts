import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { TransferPage } from '../pages/transfer.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Transfer tests', () => {
  let transferPage: TransferPage;
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);

    await loginPage.login(userId, userPassword);

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentButton.click();
    transferPage = new TransferPage(page);
  });

  test('Simple trasnfer', async ({ page }) => {
    //Arange
    const receiverName = 'Jan Nowak';
    const receiverAccountNumber = '12 3456 7891 2345 6789 1234 56789';
    const transferAmount = '50';
    const expectedMessage = 'Przelew wykonany! 50,00PLN dla Jan Nowak';

    //Act

    await transferPage.makeTransfer(
      receiverName,
      receiverAccountNumber,
      transferAmount,
    );

    //Assert
    await expect(transferPage.transferMessage).toHaveText(expectedMessage);
  });
});
