const {test,expect} = require("@playwright/test");
test("Playwright Special Locators", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("Sodium");
    await page.getByRole("button", {name:"Submit"}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", {name: 'Shop'}).click();//This will click on the "Shop" link in the header
    await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click(); //This will click on the "Add To Cart" button of the product with the name "Nokia Edge"
    //filter is used to filter the elements of the locator based on the text content of the element. In this case, it will filter the elements of the locator "app-card" based on the text content "Nokia Edge" and then click on the button of that element.
});