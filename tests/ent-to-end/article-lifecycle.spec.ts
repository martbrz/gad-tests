import { randomNewArticle } from '../../src/factories/article.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/pages/article.page copy';
import { ArticlesPage } from '../../src/pages/pages/articles.page';
import { LoginPage } from '../../src/pages/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Create and verify article', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
  });

  test('Create a new article @GAD-R04', async () => {
    articleData = randomNewArticle();

    await articlesPage.addArticleButtonLoggedUser.click();
    await expect.soft(addArticleView.header).toBeVisible();
    await addArticleView.createArticle(articleData);

    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(articlePage.articleBody).toHaveText(articleData.body, {
      useInnerText: true,
    });
  });

  test('User can access single article @GAD-R04-03', async () => {
    await articlesPage.goToArticle(articleData.title);

    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(articlePage.articleBody).toHaveText(articleData.body, {
      useInnerText: true,
    });
  });
});
