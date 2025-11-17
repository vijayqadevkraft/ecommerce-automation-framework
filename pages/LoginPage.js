const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Locators
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    this.errorMessage = '[data-test="error"]';
    this.menuButton = '#react-burger-menu-btn';
    this.logoutLink = '#logout_sidebar_link';
  }

  async navigateToLogin() {
    await this.navigate('/');
  }

  async login(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async isErrorDisplayed() {
    return await this.isVisible(this.errorMessage);
  }

  async logout() {
    await this.click(this.menuButton);
    await this.waitForSelector(this.logoutLink);
    await this.click(this.logoutLink);
  }

  async isLoginButtonEnabled() {
    return await this.isEnabled(this.loginButton);
  }

  async clearLoginForm() {
    await this.fill(this.usernameInput, '');
    await this.fill(this.passwordInput, '');
  }
}

module.exports = LoginPage;
