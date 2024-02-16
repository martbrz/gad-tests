import { Page } from '@playwright/test';

export class AddArticleView {
  header = this.page.getByRole('heading', { name: 'Add New Entry' });
  titleInput = this.page.getByTestId('title-input');
  bodyInput = this.page.getByTestId('body-text');
  saveButton = this.page.getByTestId('save');
  alertPopUp = this.page.getByTestId('alert-popup');

  constructor(private page: Page) {}
}
