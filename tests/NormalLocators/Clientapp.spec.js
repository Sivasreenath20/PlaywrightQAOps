const {test, expect} = require("@playwright/test");
test ("@Web First test case", async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); //password: AEV!Ga!By53q.hm
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");
    await page.locator("#userEmail").fill("sivasreenath890@gmail.com");
    await page.locator("#userPassword").fill("AEV!Ga!By53q.hm");
    await page.locator("#login").click(); 
    console.log(await page.locator(".card-body b").first().textContent()); //if you give .allTextContents() assertion first it will not return all contents it will retrun only [] becacuse alltextcontents might not load before the assertion is executed so it will return empty array.
});

test ("First test case - 2", async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); //password: AEV!Ga!By53q.hm
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");
    await page.locator("#userEmail").fill("sivasreenath890@gmail.com");
    await page.locator("#userPassword").fill("AEV!Ga!By53q.hm");
    await page.locator("#login").click(); 
    const Titles = await page.locator(".card-body b").allTextContents(); 
    console.log(Titles); //returns [] if you not given wait command
    await page.waitForLoadState("networkidle"); //wait for all network requests to be finished
    //await page.locator(".card-body b").first().waitFor(); //wait for the first element of the locator to be visible

    const Titles2 = await page.locator(".card-body b").allTextContents();
    console.log(Titles2); //returns all the contents of the locator as an array
});

test ("End to End Test Case", async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "sivasreenath890@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); //password: AEV!Ga!By53q.hm
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("AEV!Ga!By53q.hm");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    const products = await page.locator(".card-body"); 
    const count = await products.count(); //returns the count of the locator

    //Zara Coat 3
    for(let i=0; i<count; i++)
    {
        if (await products.nth(i).locator("b").textContent() === "ZARA COAT 3") //This will check if the text content of the element with the tag "b" in the product is "ZARA COAT 3"
        {
            //Add to Cart
            await products.nth(i).locator("text= Add To Cart").click(); //This will click on the "Add To Cart" button of the product with the name "ZARA COAT 3"
            break; //This will break the loop after finding the product and adding it to the cart
        }
    }
    await page.locator("[routerlink='/dashboard/cart']").click(); //This will click on the cart button in the header
    await page.locator("div li").last().waitFor(); //This will wait for the last element of the locator to be visible
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //This will check if the product with the name "ZARA COAT 3" is visible in the cart or not
    expect(bool).toBeTruthy(); //This will check if the boolean value is true or not
    await page.locator("button[type='button']").nth(1).click();
    //await page.locator("placeholder*='Country']").type("ind", {delay:100}); //This will type "ind" in the input field with the placeholder attribute containing "Country" with a delay of 100ms between each character
    await page.locator("[placeholder*='Country']").pressSequentially("Ind",{ delay: 150 }); //This will type "Ind" in the input field with the placeholder attribute containing "Country" with a delay of 150ms between each character
    
    //selecting the option from the dynamic dropdown
    const dropdown = await page.locator(".ta-results"); //This will locate the dropdown with the class "ta-results
    await dropdown.waitFor(); //This will wait for the dropdown to be visible
    const optionsCount = await dropdown.locator("button").count(); //This will return the count of the button elements in the dropdown
    for(let i=0; i<optionsCount; i++)
    {
        if (await dropdown.locator("button").nth(i).textContent() === " India") //This will check if the text content of the button element in the dropdown is "India"
        {
            await dropdown.locator("button").nth(i).click(); //This will click on the button element in the dropdown with the text content "India"
            break; //This will break the loop after finding the option and clicking on it
        }
    }

    //Enterring Credit Card details 
    await page.locator("input[value*='4542']").fill("4542 9978 7895 3214"); //This will fill the input field with the value attribute containing "4542" with the credit card number
    await page.locator(".ddl").first().selectOption("03"); //This will select the option with the value "03" in the first dropdown with the class "ddl" which is the month dropdown
    await page.locator(".ddl").last().selectOption("31"); //This will select the option with the value "2024" in the second dropdown with the class "ddl" which
    await page.locator(".field.small input").first().fill("123"); //This will fill the first input field with the class "field small" with the CVV number
    await page.locator(".field input").nth(2).fill("Sivasreenath"); //This will fill the third input field with the class "field" with the name on the card
    await page.locator(".field.small input").nth(1).fill("rahulshettyacademy"); //coupon code
    await page.locator(".btn-primary.mt-1").click();
    expect(await page.locator("[style='color: green;']")).toContainText("* Coupon Applied");

    //assertions on shipping information
    await expect(page.locator(".user__name label")).toHaveText(email);
    await page.locator(".btnn").click();

    //assertions on order confirmation page
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const OrderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(OrderID);

    //Go to the orders page and verify the order is present in the orders list
    await page.locator(".btn[routerlink*='myorders']").click();
    const ActualOID = OrderID.split(" ")[2];
    await page.locator("[scope='row']").first().waitFor();
    const rows = await page.locator("[scope='row']").count();

    for (let i=0; i<rows ; ++i)
    {
        if (await page.locator("[scope='row']").nth(i).textContent() === ActualOID)
        {
            await page.locator(".btn.btn-primary").nth(i).click();
            break;
        }
    }
});