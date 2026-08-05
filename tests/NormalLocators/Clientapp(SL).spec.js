// const {test, expect} = require("@playwright/test");
// test ("End to End Test Case", async ({browser}) =>
// {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     const email = "sivasreenath890@gmail.com";
//     const country = "India";
//     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
//     await page.getByPlaceholder("email@example.com").fill(email);
//     await page.getByPlaceholder("enter your passsword").fill("AEV!Ga!By53q.hm");
//     await page.getByRole("button", {name:'login'}).click();
//     //await page.waitForLoadState("networkidle");
//     await page.locator(".card-body b").first().waitFor();
//     await page.locator(".card-body").filter({hasText: 'ZARA COAT 3'}).getByRole("button",{name:" Add To Cart"}).click();
    
//     await page.getByRole("listitem").getByRole("button", {name: 'Cart'}).click(); 
//     await expect(page.getByText("ZARA COAT 3")).toBeVisible(); 
//     await page.getByRole("button", {name: 'Checkout'}).click();
//     await page.getByPlaceholder("Select Country").pressSequentially("Ind"); 
//     await page.getByRole("button", {name: ' India'}).nth(1).click();

//     //Enterring Credit Card details 
//     await page.locator("input[value*='4542']").fill("4542 9978 7895 3214");
//     await page.locator(".ddl").first().selectOption("03"); 
//     await page.locator(".ddl").last().selectOption("31"); 
//     await page.locator(".field.small input").first().fill("123"); 
//     await page.locator(".field input").nth(2).fill("Sivasreenath");
//     await page.locator(".field.small input").nth(1).fill("rahulshettyacademy");
//     await page.getByRole("button", {name: 'Apply Coupon'}).click();
//     await expect(page.getByText("Coupon Applied")).toBeVisible();

//     //assertions on shipping information
//     await page.getByText("Place Order").click();

//     //assertions on order confirmation page
//     await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
// });