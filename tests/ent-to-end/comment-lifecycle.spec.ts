import { prepareRandomNewArticle } from '../../src/factories/article.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/pages/article.page';
import { ArticlesPage } from '../../src/pages/pages/articles.page';
import { LoginPage } from '../../src/pages/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addCommentView: AddCommentView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    addCommentView = new AddCommentView(page);

    articleData = prepareRandomNewArticle();
    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLoggedUser.click();
    await addArticleView.createArticle(articleData);
  });

  // eslint-disable-next-line playwright/expect-expect
  test('Create a new comment @GAD-R04', async () => {
    await articlePage.addCommentButton.click();
    await expect(addCommentView.addNewHeader).toHaveText('Add New Comment');
    await addCommentView.bodyInput.fill('hello!');
    await addCommentView.saveButton.click();

    await expect(articlePage.alertPopUp).toHaveText('Comment was created');
  });
});
