import { LoginPage } from '../src/pages/pages/login.page';
import { WelcomePage } from '../src/pages/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('Log in with correct credentials @GAD-R02', async ({ page }) => {
    const email = testUser1.userEmail;
    const password = testUser1.userPassword;
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login(email, password);
    const welcomePage = new WelcomePage(page);
    const welcomePageTitle = await welcomePage.title();

    expect(welcomePageTitle).toContain('Welcome');
  });
});
