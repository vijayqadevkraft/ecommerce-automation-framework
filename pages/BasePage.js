class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async isEnabled(selector) {
    return await this.page.isEnabled(selector);
  }

  async waitForSelector(selector, options = {}) {
    await this.page.waitForSelector(selector, options);
  }

  async waitForTimeout(milliseconds) {
    await this.page.waitForTimeout(milliseconds);
  }

  async getTitle() {
    return await this.page.title();
  }

  async getUrl() {
    return this.page.url();
  }

  async screenshot(path) {
    await this.page.screenshot({ path });
  }

  async scrollToElement(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  async selectDropdown(selector, value) {
    await this.page.selectOption(selector, value);
  }

  async getAttribute(selector, attribute) {
    return await this.page.getAttribute(selector, attribute);
  }

  async getAllElements(selector) {
    return await this.page.$$(selector);
  }

  async getElementCount(selector) {
    return await this.page.locator(selector).count();
  }

  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  async hover(selector) {
    await this.page.hover(selector);
  }

  async doubleClick(selector) {
    await this.page.dblclick(selector);
  }

  async reload() {
    await this.page.reload();
  }

  async goBack() {
    await this.page.goBack();
  }

  async goForward() {
    await this.page.goForward();
  }
}

module.exports = BasePage;
