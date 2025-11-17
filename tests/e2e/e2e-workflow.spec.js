const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const ProductsPage = require('../../pages/ProductsPage');
const CartPage = require('../../pages/CartPage');
const CheckoutPage = require('../../pages/CheckoutPage');

test.describe('E-Commerce End-to-End Workflow', () => {
  let loginPage, productsPage, cartPage, checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    await loginPage.navigateToLogin();
  });

  test('Complete purchase flow - login to checkout', async () => {
    // Login
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Add products to cart
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    
    // Verify cart count
    const cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe('2');
    
    // Go to cart
    await productsPage.goToCart();
    
    // Verify items in cart
    const itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBe(2);
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill checkout information
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    
    // Complete order
    await checkoutPage.clickFinish();
    
    // Verify order completion
    const isComplete = await checkoutPage.isOrderComplete();
    expect(isComplete).toBeTruthy();
    
    const completionMessage = await checkoutPage.getCompletionMessage();
    expect(completionMessage).toContain('Thank you');
  });

  test('Add and remove items from cart', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Add item
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    
    let itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBe(1);
    
    // Remove item
    await cartPage.removeItemFromCart('Sauce Labs Backpack');
    
    itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBe(0);
  });

  test('Sort products by price', async () => {
Add comprehensive E2E test suite with 5 test scenarios    
    await productsPage.sortBy('lohi');
    
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('Login with invalid credentials', async () => {
    await loginPage.login('invalid_user', 'invalid_pass');
    
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });

  test('Checkout validation - missing information', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    
    // Try to continue without filling information
    await checkoutPage.clickContinue();
    
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain('required');
  });
});
