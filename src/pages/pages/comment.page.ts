import { MainMenuComponent } from '../components/mainMenu.component';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class CommentPage extends BasePage {
  url = '/comment.html';
  mainMenu = new MainMenuComponent(this.page);
  commentBody = this.page.getByTestId('comment-body');
  editButton = this.page.getByTestId('edit');
  alertPopUp = this.page.getByTestId('alert-popup');
  returnLink = this.page.getByTestId('return');

  constructor(page: Page) {
    super(page);
  }
}
