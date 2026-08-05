const { When, Given, Then } = require('@cucumber/cucumber');
const {expect} = require("@playwright/test");
const data = JSON.parse(JSON.stringify(require("./utils.json")));
const email = "sivasreenath890@gmail.com";

Given('Login to the Ecommerce application using {string} and {string}',{timeout:20000}, async function (email, password) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo("https://rahulshettyacademy.com/client/#/auth/login");
    await loginPage.ValidLogin(email, password);
});

When('Add {string} to the cart and Navigate to the cart page', async function (productName) {
    const dashboardPage = this.poManager.getDashboardPage();
    //Dashboard Page
    await dashboardPage.addProductToCart(productName);
    await dashboardPage.navigateToCart();
});

Then('Verify {string} the product is displayed in the cart', async function (productName) {
    //CartPage
    this.cartPage = this.poManager.getCartPage();
    await expect(this.page.getByText(productName)).toBeVisible();
});

When('Click on Checkout button and Checkout the order', async function () {
    await this.cartPage.checkOutProduct();
    const checkoutPage = this.poManager.getCheckoutPage();
    //CheckOutPage
    //select country
    await checkoutPage.selectCountry(data.country)
    //fillcard details
    await checkoutPage.fillCardDetails(data.cardNumber, data.month, data.year, data.cvv, data.name);
    //ApplyCouponCode
    await checkoutPage.applyCouponCode(data.couponCode);
    //check couponcode is applied or not
    await expect(this.page.locator("[style='color: green;']")).toContainText("* Coupon Applied");
    //assertions on shipping information
    await expect(this.page.locator(".user__name label")).toHaveText(email);
    //place order
    await checkoutPage.placeOrder();
    const orderreviewPage = this.poManager.getOrderreviewPage();
    console.log(await orderreviewPage.getOrderID());
    this.OrderID = await orderreviewPage.getOrderID();
});

Then('Verify the order is placed successfully', async function () {
    const orderhistoryPage = this.poManager.getOrderhistoryPage();
    await orderhistoryPage.goToOrderHistory();
    //Verify order and review
    await orderhistoryPage.verifyOrderandReview(this.OrderID);
});




Given ('Login to the Ecommerce1 application using {string} and {string}', {timeout: 40000} ,async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await expect(this.page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    const Username = await this.page.locator("#username");
    const Password = await this.page.locator("#password");
    await Username.fill(username); 
    await Password.fill(password);
    await this.page.locator("#signInBtn").click();
});

Then ('Verify the error message is displayed', async function () {
    const ErrorMessage = await this.page.locator("[style*='block']");
    await expect(ErrorMessage).toContainText("Incorrect");
})

Given ('Login to the Ecommerce application using {string} and {string} valid', {timeout: 40000} ,async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await expect(this.page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    const Username = await this.page.locator("#username");
    const Password = await this.page.locator("#password");
    await Username.fill(username); 
    await Password.fill(password);
    await this.page.locator("#signInBtn").click();
});

Then ('User is login', async function () {
    console.log(await this.page.title());
    await expect(this.page).toHaveTitle("ProtoCommerce");
    
})