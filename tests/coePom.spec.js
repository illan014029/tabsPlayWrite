const { test, expect } = require("@playwright/test");
const { PlaywrightDevPage } = require("./coeDevPage.js");

test("Opens alerts page @one", async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.gotoAlertsPage();
  await playwrightDev.acceptAlert();
  await playwrightDev.confirmText();
});

test("opens tab two and three @two", async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.gotoWindowOperationsPage();
  await playwrightDev.openAndCloseThirdPage();
});

test("close everything @three", async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.closeEverything();
});
