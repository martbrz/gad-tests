import { Page } from '@playwright/test';
import { AddCommentModel } from '../models/comment.model';

export class EditCommentView {
  bodyInput = this.page.locator('#body');
  updateButton = this.page.getByTestId('update-button');

  constructor(private page: Page) {}

  async updateComment(commentData: AddCommentModel): Promise<void> {
    await this.bodyInput.fill(commentData.body);
    await this.updateButton.click();
  }
}
