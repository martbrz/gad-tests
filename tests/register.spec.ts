import { randomUserData } from '../src/factories/user.factory';
import { RegisterUserModel } from '../src/models/user.model';
import { LoginPage } from '../src/pages/pages/login.page';
import { RegisterPage } from '../src/pages/pages/register.page';
import { WelcomePage } from '../src/pages/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUserModel;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    registerUserData = randomUserData();
    await registerPage.goto();
  });

  test('Register with correct data @GAD-R03-01 @GAD-R03-02 @GAD-R03-03', async ({
    page,
  }) => {
    const expectedAlertPopUpText = 'User created';

    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    await registerPage.register(registerUserData);

    await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopUpText);

    await loginPage.waitForPageToLoadURL();
    const loginPageTitle = await loginPage.title();
    await expect.soft(loginPageTitle).toContain('Login');

    await loginPage.login({
      email: registerUserData.userEmail,
      password: registerUserData.userPassword,
    });
    const welcomePageTitle = await welcomePage.title();
    await expect(welcomePageTitle).toContain('Welcome');
  });

  test('Not register with incorrect data - not valid email @GAD-R03-04', async () => {
    // const registerUserData: RegisterUser = {
    //   userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    //   userLastName: faker.person.lastName(),
    //   userEmail: '#$%',
    //   userPassword: faker.internet.password(),
    // };
    const expectedErrorText = 'Please provide a valid email address';

    registerUserData.userEmail = '@#$';

    await registerPage.register(registerUserData);

    await expect(registerPage.errorText).toHaveText(expectedErrorText);
  });

  test('Not register with incorrect data - email not provided @GAD-R03-04', async () => {
    const expectedErrorText = 'This field is required';

    await registerPage.userFirstNameInput.fill(registerUserData.userFirstName);
    await registerPage.userLastNameInput.fill(registerUserData.userLastName),
      await registerPage.userPasswordInput.fill(registerUserData.userPassword);
    await registerPage.registerButton.click();

    await expect(registerPage.errorText).toHaveText(expectedErrorText);
  });
});
