import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/task3/index.html");
});

test(
  "Add a shopping list item and check for an image",
  {
    annotation: {
      type: "points",
      description: "0",
    },
  },
  async ({ page }) => {
    const suggestButton = page.locator("#suggest-button");
    const subjectInput = page.locator("#subject-input");

    await expect(subjectInput).toBeEmpty();

    await subjectInput.fill("Pizza");

    const responsePromise = page.waitForResponse(/noggin/);

    await suggestButton.click();
    await responsePromise;
    await page.waitForTimeout(500);

    const listItems = await page.locator("#list > div").all();
    const newItem = listItems[listItems.length - 1];

    const newImage = newItem.locator("img");
    await expect(newImage).toHaveAttribute("src");
  }
);
