import { ArticlesPage } from '../src/pages/articles.page';
import { CommentsPage } from '../src/pages/comments.page';
import { HomePage } from '../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify service main pages', () => {
  test('home page title', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(page).toHaveTitle(/GAD/);
    const title = await homePage.title();
    expect(title).toContain('GAD');
  });

  test('articles page title', async ({ page }) => {
    const articlePage = new ArticlesPage(page);
    await articlePage.goto();

    const title = await articlePage.title();

    expect(title).toContain('Articles');
  });

  test('comments page title', async ({ page }) => {
    const commentsPage = new CommentsPage(page);
    await commentsPage.goto();

    const title = await commentsPage.title();

    expect(title).toContain('Comments');
  });

  test('home page title simple', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/GAD/);
  });
});
