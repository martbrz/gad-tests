import { LoginUserModel } from '../src/models/user.model';
import { LoginPage } from '../src/pages/pages/login.page';
import { WelcomePage } from '../src/pages/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('Log in with correct credentials @GAD-R02', async ({ page }) => {
    // const email = testUser1.userEmail;
    // const password = testUser1.userPassword;

    // const LoginUserModelData: LoginUserModel = {
    //   email: testUser1.email,
    //   password: testUser1.password,
    // };
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUser1);

    const welcomePage = new WelcomePage(page);
    const welcomePageTitle = await welcomePage.getTitle();

    expect(welcomePageTitle).toContain('Welcome');
  });

  test('Reject log in with incorrect password @GAD-R02', async ({ page }) => {
    const LoginUserModelData: LoginUserModel = {
      email: testUser1.email,
      password: 'incorrectPassword',
    };

    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login(LoginUserModelData);

    await expect.soft(loginPage.loginError).toHaveText(loginPage.errorMessage);
    const loginPageTitle = await loginPage.getTitle();
    expect.soft(loginPageTitle).toContain('Login');
  });
});
