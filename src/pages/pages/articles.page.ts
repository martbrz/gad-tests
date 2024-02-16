import { MainMenuComponent } from '../components/mainMenu.component';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponent(this.page);
  addArticleButtonLoggedUser = this.page.locator('#add-new');

  constructor(page: Page) {
    super(page);
  }
}
