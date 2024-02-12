import { LoginPage } from '../src/pages/pages/login.page';
import { WelcomePage } from '../src/pages/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('Log in with correct credentials @GAD-R02 @S02', async ({ page }) => {
    const email = 'Moses.Armstrong@Feest.ca';
    const password = 'test1';
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login(email, password);
    const welcomePage = new WelcomePage(page);
    const welcomePageTitle = await welcomePage.title();

    expect(welcomePageTitle).toContain('Welcome');
  });
});
