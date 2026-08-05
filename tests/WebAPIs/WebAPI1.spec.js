const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require("../../Utils/APIUtils");
const loginPayload = {userEmail: "sivasreenath890@gmail.com",userPassword: "AEV!Ga!By53q.hm"}
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5"}]}
let response;

test.beforeAll( async()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.CreatOrder(orderPayLoad);
});

test ("Placing order", async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator(".btn[routerlink*='myorders']").click();

    await page.locator("[scope='row']").first().waitFor();
    const rows = await page.locator("[scope='row']").count();

    for (let i=0; i<rows ; ++i)
    {
        if (await page.locator("[scope='row']").nth(i).textContent() === response.orderID)
        {
            await page.locator(".btn.btn-primary").nth(i).click();
            break;
        }
    }
    const orderIDDetails = await page.locator(".col-text").textContent();
    await page.pause(); 
    expect(response.orderID.includes(orderIDDetails)).toBeTruthy();
});