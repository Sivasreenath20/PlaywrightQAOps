const { test, expect } = require("@playwright/test");
const { POManager } = require("../PageObjects/POManger");
//JSON > String > JS object
const dataSet = JSON.parse(JSON.stringify(require("../Utils/PageObjectsTestData.json")));

for (const data of dataSet){
test(`@Web End to End Test Case ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);

    //Login Page
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo("https://rahulshettyacademy.com/client/#/auth/login");
    await loginPage.ValidLogin(data.email, data.password);

    //Dashboard Page
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.addProductToCart(data.productName);
    await dashboardPage.navigateToCart();

    //CartPage
    const cartPage = poManager.getCartPage();
    await expect(page.getByText(data.productName)).toBeVisible();
    await cartPage.checkOutProduct();

    //CheckOutPage
    //select country
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.selectCountry(data.country)
    //fillcard details
    await checkoutPage.fillCardDetails(data.cardNumber, data.month, data.year, data.cvv, data.name);
    //ApplyCouponCode
    await checkoutPage.applyCouponCode(data.couponCode);
    //check couponcode is applied or not
    await expect(page.locator("[style='color: green;']")).toContainText("* Coupon Applied");
    //assertions on shipping information
    await expect(page.locator(".user__name label")).toHaveText(data.email);
    //place order
    await checkoutPage.placeOrder();

    //assertions on order confirmation page
    const orderreviewPage = poManager.getOrderreviewPage();
    console.log(await orderreviewPage.getOrderID());
    const OrderID = await orderreviewPage.getOrderID();

    //goto order history page
    const orderhistoryPage = poManager.getOrderhistoryPage();
    await orderhistoryPage.goToOrderHistory();
    //Verify order and review
    await orderhistoryPage.verifyOrderandReview(OrderID);
});}