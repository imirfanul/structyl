import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { getDefaultStories, gotoStory } from './storybook';

test.setTimeout(180_000);

test('default stories have no automated axe violations', async ({ page, request }) => {
  const stories = await getDefaultStories(request);

  for (const story of stories) {
    await gotoStory(page, story.id);
    const results = await new AxeBuilder({ page }).include('#storybook-root').analyze();
    expect.soft(results.violations, `${story.title}/${story.name}`).toEqual([]);
  }
});
