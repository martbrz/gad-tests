import { prepareRandomNewArticle } from '../../src/factories/article.factory';
import { prepareRandomComment } from '../../src/factories/comment.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/pages/article.page';
import { ArticlesPage } from '../../src/pages/pages/articles.page';
import { CommentPage } from '../../src/pages/pages/comment.page';
import { LoginPage } from '../../src/pages/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { EditCommentView } from '../../src/views/edit-comment.view';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addCommentView: AddCommentView;
  let commentPage: CommentPage;
  let editComment: EditCommentView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);
    editComment = new EditCommentView(page);

    articleData = prepareRandomNewArticle();
    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLoggedUser.click();
    await addArticleView.createArticle(articleData);
  });

  // eslint-disable-next-line playwright/expect-expect
  test('Create a new comment @GAD-R04', async () => {
    const expectedAddCommentHeader = 'Add New Comment ';
    const expectedCommentCreatedPopUp = ' Comment was created';
    const expectedCommentEditPagePopUp = 'Comment was updated';

    const newCommentData = prepareRandomComment();

    await articlePage.addCommentButton.click();
    await expect(addCommentView.addNewHeader).toHaveText(
      expectedAddCommentHeader,
    );

    addCommentView.createComment(newCommentData);

    await expect(articlePage.alertPopUp).toHaveText(
      expectedCommentCreatedPopUp,
    );

    const articleComment = articlePage.getArticleComment(newCommentData.body);

    await expect(articleComment.body).toHaveText(newCommentData.body);

    await articleComment.link.click();

    await expect(commentPage.commentBody).toHaveText(newCommentData.body);

    const editCommentData = prepareRandomComment();

    await commentPage.editButton.click();
    editComment.updateComment(editCommentData);
    await expect(commentPage.commentBody).toHaveText(editCommentData.body);
    await expect(commentPage.alertPopUp).toHaveText(
      expectedCommentEditPagePopUp,
    );
    await commentPage.returnLink.click();
    const editedComment = articlePage.getArticleComment(editCommentData.body);

    await expect(editedComment.body).toHaveText(editCommentData.body);
  });
});
