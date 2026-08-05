const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require("../../Utils/APIUtils");
const loginPayload = { userEmail: "sivasreenath890@gmail.com", userPassword: "AEV!Ga!By53q.hm" }
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5" }] }
const fakeOrderResponse = { data: [], message: "No Orders" };
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.CreatOrder(orderPayLoad);
});

test("Though there are previous order we are intercepting the Response here and putting the data that we require", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response1 = await page.request.fetch(route.request());
            route.fulfill({
                response1,
                fakeOrderResponse,
            })
        })

    await page.locator(".btn[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
});