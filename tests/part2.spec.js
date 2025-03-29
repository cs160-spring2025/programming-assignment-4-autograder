import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/task2/index.html");
});

test(
  "Recommend a planet and check if we moved to a new page",
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
    const url = page.url();

    await subjectInput.fill(
      "I am looking for a vacation spot that is warm and has a beach."
    );

    const responsePromise = page.waitForResponse(/noggin/);
    await suggestButton.click();
    const rsp = await responsePromise;
    await rsp.finished();
    await page.waitForTimeout(500);

    // this could look off if they did the xc task with a second noggin
  }
);
