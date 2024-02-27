import { ArticlesPage } from '../../src/pages/pages/articles.page';
import { CommentsPage } from '../../src/pages/pages/comments.page';
import { HomePage } from '../../src/pages/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify service main pages', () => {
  test('home page title @GAD-R01-01', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(page).toHaveTitle(/GAD/);
    const title = await homePage.getTitle();
    expect(title).toContain('GAD');
  });

  test('articles page title @GAD-R01-02', async ({ page }) => {
    const expectedArticleTitle = 'Articles';

    const articlePage = new ArticlesPage(page);
    await articlePage.goto();

    const title = await articlePage.getTitle();

    expect(title).toContain(expectedArticleTitle);
  });

  test('comments page title @GAD-R01-02', async ({ page }) => {
    const expectedCommentsTitle = 'Comments';

    const commentsPage = new CommentsPage(page);
    await commentsPage.goto();

    const title = await commentsPage.getTitle();

    expect(title).toContain(expectedCommentsTitle);
  });

  test('home page title simple', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/GAD/);
  });
});
