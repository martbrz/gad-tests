import { ArticlePage } from '../src/pages/pages/article.page copy';
import { ArticlesPage } from '../src/pages/pages/articles.page';
import { LoginPage } from '../src/pages/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('Create a new article @GAD-R04', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUser1);
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLoggedUser.click();

    const addArticleView = new AddArticleView(page);
    await expect.soft(addArticleView.header).toBeVisible();

    const newArticleTitle = 'title';
    const newArticleBody = 'body';
    await addArticleView.titleInput.fill(newArticleTitle);
    await addArticleView.bodyInput.fill(newArticleBody);
    await addArticleView.saveButton.click();
    await expect(addArticleView.alertPopUp).toContainText(
      'Article was created',
    );

    const articlePage = new ArticlePage(page);
    await expect(articlePage.articleTitle).toHaveText(newArticleTitle);
    await expect(articlePage.articleBody).toHaveText(newArticleBody);
  });
});
