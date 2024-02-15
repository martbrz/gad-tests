import { randomUserData } from '../src/factories/user.factory';
import { LoginPage } from '../src/pages/pages/login.page';
import { RegisterPage } from '../src/pages/pages/register.page';
import { WelcomePage } from '../src/pages/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  test('Register with correct data @GAD-R03-01 @GAD-R03-02 @GAD-R03-03', async ({
    page,
  }) => {
    const registerUserData = randomUserData();

    const expectedAlertPopUpText = 'User created';

    const registerPage = new RegisterPage(page);
    await registerPage.goto();

    await registerPage.register(registerUserData);

    await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopUpText);
    const loginPage = new LoginPage(page);
    await loginPage.waitForPageToLoadURL();
    const loginPageTitle = await loginPage.title();
    await expect.soft(loginPageTitle).toContain('Login');

    await loginPage.login({
      email: registerUserData.userEmail,
      password: registerUserData.userPassword,
    });
    const welcomePage = new WelcomePage(page);
    const welcomePageTitle = await welcomePage.title();
    await expect(welcomePageTitle).toContain('Welcome');
  });

  test('Not register with incorrect data - not valid email @GAD-R03-04', async ({
    page,
  }) => {
    // const registerUserData: RegisterUser = {
    //   userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    //   userLastName: faker.person.lastName(),
    //   userEmail: '#$%',
    //   userPassword: faker.internet.password(),
    // };
    const registerUserData = randomUserData();
    registerUserData.userEmail = '@#$';

    const expectedErrorText = 'Please provide a valid email address';

    const registerPage = new RegisterPage(page);
    await registerPage.goto();

    await registerPage.register(registerUserData);

    await expect(registerPage.errorText).toHaveText(expectedErrorText);
  });

  test('Not register with incorrect data - email not provided @GAD-R03-04', async ({
    page,
  }) => {
    const expectedErrorText = 'This field is required';
    const registerUserData = randomUserData();
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.userFirstNameInput.fill(registerUserData.userFirstName);
    await registerPage.userLastNameInput.fill(registerUserData.userLastName),
      await registerPage.userPasswordInput.fill(registerUserData.userPassword);
    await registerPage.registerButton.click();

    await expect(registerPage.errorText).toHaveText(expectedErrorText);
  });
});
