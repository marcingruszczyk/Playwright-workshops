import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Succesful login with correct credentials', async ({ page }) => {
    // Arrange

    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';

    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('Unsuccesful login with too short username', async ({ page }) => {
    // Arrange
    const incorrectUserID = 'tester';
    const userPassword = loginData.userPassword;
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(incorrectUserID);
    await loginPage.passwordInput.fill(userPassword);

    //Assert
    await expect(page.getByTestId('error-login-id')).toBeVisible();
    await expect(loginPage.loginError).toHaveText(expectedErrorMessage);
  });

  test.only('Unsuccesful login with too short password', async ({ page }) => {
    // Arrange
    const userId = 'tester12';
    const incorrectUserPassword = 'pass';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    //Act

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(incorrectUserPassword);
    await loginPage.passwordInput.blur();

    //Assert
    await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);
  });
});
