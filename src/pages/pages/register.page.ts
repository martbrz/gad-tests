import { RegisterUser } from '../../models/user.model';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/register.html';
  errorMessage = 'Invalid username or password';

  userFirstNameInput = this.page.getByTestId('firstname-input');
  userLastNameInput = this.page.getByTestId('lastname-input');
  userEmailInput = this.page.getByTestId('email-input');
  userPasswordInput = this.page.getByTestId('password-input');
  registerButton = this.page.getByTestId('register-button');

  alertPopUp = this.page.getByTestId('alert-popup');
  errorText = this.page.locator('#octavalidate_email');

  constructor(page: Page) {
    super(page);
  }

  async register(registerUserData: RegisterUser): Promise<void> {
    await this.userFirstNameInput.fill(registerUserData.userFirstName);
    await this.userLastNameInput.fill(registerUserData.userLastName);
    await this.userEmailInput.fill(registerUserData.userEmail);
    await this.userPasswordInput.fill(registerUserData.userPassword);
    await this.registerButton.click();
  }
}
