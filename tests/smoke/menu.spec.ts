import { ArticlesPage } from '../../src/pages/pages/articles.page';
import { CommentsPage } from '../../src/pages/pages/comments.page';
import { HomePage } from '../../src/pages/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify main menu buttons', () => {
  test('comments button navigates to comments page @GAD-R01-03', async ({
    page,
  }) => {
    const expectedCommentsTitle = 'Comments';

    const articlePage = new ArticlesPage(page);
    const commentsPage = new CommentsPage(page);

    await articlePage.goto();
    await commentsPage.mainMenu.commentsButton.click();
    const title = await commentsPage.getTitle();

    expect(title).toContain(expectedCommentsTitle);
  });

  test('articles button navigates to articles page @GAD-R01-03', async ({
    page,
  }) => {
    const expectedArticlesTitle = 'Articles';

    const commentsPage = new CommentsPage(page);
    const articlePage = new ArticlesPage(page);

    await commentsPage.goto();
    await commentsPage.mainMenu.articlesButton.click();
    const title = await articlePage.getTitle();

    expect(title).toContain(expectedArticlesTitle);
  });

  test('home page button navigates to main page @GAD-R01-03', async ({
    page,
  }) => {
    const expectedHomePageTitle = 'GAD';

    const articlePage = new ArticlesPage(page);
    const commentsPage = new CommentsPage(page);

    await articlePage.goto();
    await commentsPage.mainMenu.homePageButton.click();
    const homePage = new HomePage(page);
    const title = await homePage.getTitle();

    expect(title).toContain(expectedHomePageTitle);
  });
});
