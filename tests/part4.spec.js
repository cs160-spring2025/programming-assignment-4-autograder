import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/task4/index.html");
});

test(
  "Upload a board game image and check some of the fields",
  {
    annotation: {
      type: "points",
      description: "0",
    },
  },
  async ({ page }) => {
    const uploadForm = page.locator(".upload-form");

    const fileChooserPromise = page.waitForEvent("filechooser");
    const fileInput = uploadForm.locator("input[type=file]");

    await fileInput.click();

    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("./images/blokus_board_game.jpg");

    const submitButton = uploadForm.locator("input[type=submit]");

    const responsePromise = page.waitForResponse(/noggin/);
    await submitButton.click();
    const rsp = await responsePromise;
    await rsp.finished();
    await page.waitForTimeout(500);

    expect(page.locator("#game-name")).toHaveValue("Blokus");
  }
);
