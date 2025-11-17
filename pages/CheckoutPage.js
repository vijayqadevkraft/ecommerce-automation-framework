const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Locators
    this.firstNameInput = '#first-name';
    this.lastNameInput = '#last-name';
    this.postalCodeInput = '#postal-code';
    this.continueButton = '#continue';
    this.cancelButton = '#cancel';
    this.finishButton = '#finish';
    this.completeHeader = '.complete-header';
    this.completeText = '.complete-text';
    this.errorMessage = '[data-test="error"]';
    this.summarySubtotal = '.summary_subtotal_label';
    this.summaryTax = '.summary_tax_label';
    this.summaryTotal = '.summary_total_label';
  }

  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalCodeInput, postalCode);
  }

  async clickContinue() {
    await this.click(this.continueButton);
  }

  async clickCancel() {
    await this.click(this.cancelButton);
  }

  async clickFinish() {
    await this.click(this.finishButton);
  }

  async getCompletionMessage() {
    return await this.getText(this.completeHeader);
  }

  async isOrderComplete() {
    return await this.isVisible(this.completeHeader);
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async getSubtotal() {
    return await this.getText(this.summarySubtotal);
  }

  async getTax() {
    return await this.getText(this.summaryTax);
  }

  async getTotal() {
    return await this.getText(this.summaryTotal);
  }
}

module.exports = CheckoutPage;
