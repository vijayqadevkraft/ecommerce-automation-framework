const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Locators
    this.cartItems = '.cart_item';
    this.cartItemName = '.inventory_item_name';
    this.cartItemPrice = '.inventory_item_price';
    this.removeButton = '[data-test^="remove"]';
    this.continueShoppingButton = '#continue-shopping';
    this.checkoutButton = '#checkout';
    this.cartQuantity = '.cart_quantity';
  }

  async removeItemFromCart(itemName) {
    const items = await this.page.$$(this.cartItems);
    for (const item of items) {
      const name = await item.$eval(this.cartItemName, el => el.textContent);
      if (name === itemName) {
        await item.$(this.removeButton).then(btn => btn.click());
        break;
      }
    }
  }

  async getCartItemsCount() {
    return await this.getElementCount(this.cartItems);
  }

  async continueShopping() {
    await this.click(this.continueShoppingButton);
  }

  async proceedToCheckout() {
    await this.click(this.checkoutButton);
  }

  async getItemPrice(itemName) {
    const items = await this.page.$$(this.cartItems);
    for (const item of items) {
      const name = await item.$eval(this.cartItemName, el => el.textContent);
      if (name === itemName) {
        return await item.$eval(this.cartItemPrice, el => el.textContent);
      }
    }
    return null;
  }

  async isItemInCart(itemName) {
    const items = await this.page.$$(this.cartItems);
    for (const item of items) {
      const name = await item.$eval(this.cartItemName, el => el.textContent);
      if (name === itemName) {
        return true;
      }
    }
    return false;
  }
}

module.exports = CartPage;
