const { test, expect } = require("@playwright/test");

test("coe demo", async ({ page }) => {
  
  await page.goto("https://practice-automation.com/popups/");
  await page.waitForSelector('text="Popups"');
  await page.waitForSelector('button[id="confirm"]');

  //IMPORTANT!!! before triggering the alert you have to set the value of the dialog (accept or dismiss))
  page.on("dialog", (dialog) => dialog.accept());

  await page.click('button[id="confirm"]');
  await page.waitForSelector("#confirmResult");
  // Read the text from the label
  const confirmResultText = await page.innerText("#confirmResult");
  //Asking if the text is equial to "OK it is!" no reason why just wannted to use an if statment
  if (confirmResultText == "OK it is!") {
    console.log("True, ", confirmResultText);
  } else {
    console.log("False, ", confirmResultText);
  }

  const secondPage = await page.context().newPage();
  await secondPage.bringToFront();
  await secondPage.goto("https://practice-automation.com/window-operations/");
  await secondPage.waitForSelector('text="Window Operations"');
  await secondPage.click('button:has-text("New Tab")');

  const newPagePromise = new Promise((resolve) =>
    secondPage.once("popup", resolve)
  );

  const newPage = await newPagePromise;
  await newPage.waitForLoadState();
  await newPage.bringToFront();
  await newPage.waitForSelector('div[id="layout"]');
  await newPage.close();
  await page.bringToFront();
  await page.waitForSelector('text="Popups"');
  await page.waitForTimeout(10000);
  // Close the current browser context
  //await this.page.context().close();
});
