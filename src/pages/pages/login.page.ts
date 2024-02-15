import { LoginUser } from '../../models/user.model';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login/';
  errorMessage = 'Invalid username or password';

  userEmailInput = this.page.getByPlaceholder('Enter User Email');
  userPasswordInput = this.page.getByPlaceholder('Enter Password');
  loginButton = this.page.getByRole('button', { name: 'LogIn' });

  loginError = this.page.getByTestId('login-error');

  constructor(page: Page) {
    super(page);
  }

  async login(loginUserData: LoginUser): Promise<void> {
    await this.userEmailInput.fill(loginUserData.email);
    await this.userPasswordInput.fill(loginUserData.password);
    await this.loginButton.click();
  }
}
