import { randomNewArticle } from '../src/factories/article.factory';
import { ArticlePage } from '../src/pages/pages/article.page copy';
import { ArticlesPage } from '../src/pages/pages/articles.page';
import { LoginPage } from '../src/pages/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLoggedUser.click();
  });

  test('Create a new article @GAD-R04', async ({ page }) => {
    const articlePage = new ArticlePage(page);
    const articleData = randomNewArticle();

    await expect.soft(addArticleView.header).toBeVisible();
    await addArticleView.createArticle(articleData);

    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(articlePage.articleBody).toHaveText(articleData.body, {
      useInnerText: true,
    });
  });

  test('Create a new article with empty title @GAD-R04', async () => {
    const articleData = randomNewArticle();
    articleData.title = '';
    const expectedErrorMessage = 'Article was not created';

    await expect.soft(addArticleView.header).toBeVisible();

    await addArticleView.createArticle(articleData);
    await expect(addArticleView.alertPopUp).toContainText(expectedErrorMessage);
  });

  test('Create a new article with empty body @GAD-R04_01', async () => {
    const expectedErrorMessage = 'Article was not created';
    const articleData = randomNewArticle();
    articleData.body = '';

    await expect.soft(addArticleView.header).toBeVisible();

    await addArticleView.createArticle(articleData);

    await expect(addArticleView.alertPopUp).toContainText(expectedErrorMessage);
  });

  test('Create a new article with exceeding 128 signs title @GAD-R04_02', async () => {
    const expectedErrorMessage = 'Article was not created';
    const articleData = randomNewArticle(129);

    await expect.soft(addArticleView.header).toBeVisible();

    await addArticleView.createArticle(articleData);
    await expect(addArticleView.alertPopUp).toContainText(expectedErrorMessage);
  });

  test('Create a new article with title containing  128 signs @GAD-R04_02', async ({
    page,
  }) => {
    const articlePage = new ArticlePage(page);
    const expectedMessage = 'Article was created';
    const articleData = randomNewArticle(128);

    await expect.soft(addArticleView.header).toBeVisible();

    await addArticleView.createArticle(articleData);

    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect(addArticleView.alertPopUp).toContainText(expectedMessage);
  });
});
