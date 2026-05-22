import type { APIRequestContext, Page } from '@playwright/test';
import { expect } from '@playwright/test';

interface StorybookIndex {
  entries: Record<string, { id: string; name: string; title: string; type: string }>;
}

export async function getDefaultStories(request: APIRequestContext) {
  const response = await request.get('/index.json');
  expect(response.ok()).toBe(true);
  const index = (await response.json()) as StorybookIndex;

  return Object.values(index.entries)
    .filter((entry) => entry.type === 'story' && entry.name === 'Default')
    .sort((a, b) => a.id.localeCompare(b.id));
}

export async function gotoStory(page: Page, storyId: string) {
  await page.goto(`/iframe.html?id=${storyId}&viewMode=story`);
  const root = page.locator('#storybook-root');
  await expect
    .poll(async () => root.evaluate((element) => element.childElementCount), {
      message: storyId,
      timeout: 30_000,
    })
    .toBeGreaterThan(0);
  await expect(root, storyId).toBeVisible({ timeout: 30_000 });
  return root;
}
