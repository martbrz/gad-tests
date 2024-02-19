import { randomNewArticle } from '../src/factories/article.factory';
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

    const articleData = randomNewArticle();

    await addArticleView.createArticle(articleData);

    await expect(addArticleView.alertPopUp).toContainText(
      'Article was created',
    );
    const articlePage = new ArticlePage(page);
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(articlePage.articleBody).toHaveText(articleData.body, {
      useInnerText: true,
    });
  });

  test('Create a new article with empty title @GAD-R04', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const articlesPage = new ArticlesPage(page);
    const addArticleView = new AddArticleView(page);

    const articleData = randomNewArticle();
    articleData.title = '';
    const expectedErrorMessage = 'Article was not created';

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();

    await articlesPage.addArticleButtonLoggedUser.click();
    await expect.soft(addArticleView.header).toBeVisible();

    await addArticleView.createArticle(articleData);
    await expect(addArticleView.alertPopUp).toContainText(expectedErrorMessage);
  });

  test('Create a new article with empty body @GAD-R04', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const articlesPage = new ArticlesPage(page);
    const addArticleView = new AddArticleView(page);
    const expectedErrorMessage = 'Article was not created';
    const articleData = randomNewArticle();
    articleData.body = '';

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLoggedUser.click();

    await expect.soft(addArticleView.header).toBeVisible();

    await addArticleView.createArticle(articleData);

    await expect(addArticleView.alertPopUp).toContainText(expectedErrorMessage);
  });
});
