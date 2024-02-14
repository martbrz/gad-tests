import { LoginPage } from '../src/pages/pages/login.page';
import { RegisterPage } from '../src/pages/pages/register.page';
import { WelcomePage } from '../src/pages/pages/welcome.page';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  // eslint-disable-next-line playwright/expect-expect
  test('Register with correct data @GAD-R03-01 @GAD-R03-02 @GAD-R03-03', async ({
    page,
  }) => {
    const userFirstName = faker.person.firstName();
    const userLastName = faker.person.lastName();
    const userEmail = faker.internet.email({
      firstName: userFirstName,
      lastName: userLastName,
    });
    const userPassword = faker.internet.password();
    const expectedAlertPopUpText = 'User created';

    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
    );

    await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopUpText);
    const loginPage = new LoginPage(page);
    await loginPage.waitForPageToLoadURL();
    const loginPageTitle = await loginPage.title();
    expect.soft(loginPageTitle).toContain('Login');

    await loginPage.login(userEmail, userPassword);
    const welcomePage = new WelcomePage(page);
    const welcomePageTitle = await welcomePage.title();
    expect(welcomePageTitle).toContain('Welcome');
  });
});
