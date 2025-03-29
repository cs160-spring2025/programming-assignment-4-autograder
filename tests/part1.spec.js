import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/task1/index.html");
});

test(
  "Check if the email subject is filled after clicking the suggest button",
  {
    annotation: {
      type: "points",
      description: "0",
    },
  },
  async ({ page }) => {
    const bodyInput = page.locator("#body-input");
    const suggestButton = page.locator("#suggest-button");
    const subjectInput = page.locator("#subject-input");

    await expect(subjectInput).toBeEmpty();

    await bodyInput.fill(
      "I am writing to you to express my interest in the position of Software Engineer at your company. I am confident that my skills are well-aligned with the role, and that I would be an excellent fit for your organization."
    );
    const responsePromise = page.waitForResponse(/noggin/);

    await suggestButton.click();
    const rsp = await responsePromise;
    await rsp.finished();
    await page.waitForTimeout(500);

    await expect(subjectInput).not.toBeEmpty();
  }
);
