const { expect } = require("@playwright/test");

exports.PlaywrightDevPage = class PlaywrightDevPage {
  constructor(page) {
    this.page = page;
    this.secondPage = null; // Initialize secondPage property
  }

  async gotoAlertsPage() {
    await this.page.goto("https://practice-automation.com/popups/");
    await this.page.waitForSelector('text="Popups"');
  }

  async acceptAlert() {
    await this.page.waitForSelector('button[id="confirm"]');
    this.page.on("dialog", (dialog) => dialog.accept());
    await this.page.click('button[id="confirm"]');
  }

  async confirmText() {
    await this.page.waitForSelector("#confirmResult");
    const confirmResultText = await this.page.innerText("#confirmResult");
    expect(confirmResultText).toBe("OK it is!"); // Use assertion
  }

  async gotoWindowOperationsPage() {
    await this.gotoPage("https://practice-automation.com/window-operations/");
    await this.secondPage.waitForSelector('text="Window Operations"');
  }

  async openAndCloseThirdPage() {
    if (!this.secondPage) {
      throw new Error("Second page is not initialized.");
    }
    await this.secondPage.click('button:has-text("New Tab")');
    const newPagePromise = new Promise((resolve) =>
      this.secondPage.once("popup", resolve)
    );
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();
    await newPage.bringToFront();
    await newPage.waitForSelector('div[id="layout"]');
    await newPage.close();
    await this.secondPage.bringToFront();
    await this.page.waitForTimeout(10000);
  }

  async closeEverything() {
    await this.page.context().close();
    await this.page.context().browser().close();
}

  async gotoPage(url) {
    this.secondPage = await this.page.context().newPage();
    await this.secondPage.bringToFront();
    await this.secondPage.goto(url);
    await this.secondPage.waitForTimeout(10000);
  }
};
