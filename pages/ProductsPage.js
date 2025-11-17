const BasePage = require('./BasePage');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Locators
    this.productItems = '.inventory_item';
    this.productName = '.inventory_item_name';
    this.productPrice = '.inventory_item_price';
    this.addToCartButton = '[data-test^="add-to-cart"]';
    this.removeButton = '[data-test^="remove"]';
    this.shoppingCartBadge = '.shopping_cart_badge';
    this.shoppingCartLink = '.shopping_cart_link';
    this.sortDropdown = '.product_sort_container';
    this.productImage = '.inventory_item_img';
  }

  async addProductToCart(productName) {
    const products = await this.page.$$(this.productItems);
    for (const product of products) {
      const name = await product.$eval(this.productName, el => el.textContent);
      if (name === productName) {
        await product.$(this.addToCartButton).then(btn => btn.click());
        break;
      }
    }
  }

  async removeProductFromCart(productName) {
    const products = await this.page.$$(this.productItems);
    for (const product of products) {
      const name = await product.$eval(this.productName, el => el.textContent);
      if (name === productName) {
        await product.$(this.removeButton).then(btn => btn.click());
        break;
      }
    }
  }

  async getCartItemCount() {
    const isVisible = await this.isVisible(this.shoppingCartBadge);
    if (isVisible) {
      return await this.getText(this.shoppingCartBadge);
    }
    return '0';
  }

  async goToCart() {
    await this.click(this.shoppingCartLink);
  }

  async sortBy(option) {
    await this.selectDropdown(this.sortDropdown, option);
  }

  async getProductCount() {
    return await this.getElementCount(this.productItems);
  }

  async getProductPrice(productName) {
    const products = await this.page.$$(this.productItems);
    for (const product of products) {
      const name = await product.$eval(this.productName, el => el.textContent);
      if (name === productName) {
        return await product.$eval(this.productPrice, el => el.textContent);
      }
    }
    return null;
  }
}

module.exports = ProductsPage;
