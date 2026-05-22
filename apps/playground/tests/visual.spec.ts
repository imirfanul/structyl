import { test, expect } from '@playwright/test';
import { gotoStory } from './storybook';

const smokeStories = [
  'atoms-button--default',
  'atoms-alert--default',
  'disclosure-accordion--default',
  'compound-command--default',
  'overlays-toast--default',
  'data-datatable--default',
];

test('representative Storybook stories render visible, non-empty surfaces', async ({ page }) => {
  for (const storyId of smokeStories) {
    const root = await gotoStory(page, storyId);
    const box = await root.boundingBox();
    expect(box?.width, `${storyId} width`).toBeGreaterThan(24);
    expect(box?.height, `${storyId} height`).toBeGreaterThan(16);

    const screenshot = await root.screenshot({ animations: 'disabled' });
    expect(screenshot.byteLength, `${storyId} screenshot`).toBeGreaterThan(1_000);
  }
});
