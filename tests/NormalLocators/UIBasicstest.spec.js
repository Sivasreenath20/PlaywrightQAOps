const {test, expect} = require("@playwright/test");

test("First Playwright test", async ({browser}) => 
{
    //chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    console.log(await page.title());
});

test ("Page Playwright test", async ({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    const Username = await page.locator("#username");
    const Password = await page.locator("#password");        //css or xpath
    await Username.fill("Playwright"); //you can use type instead of fill but it will be slower as it will type each character one by one
    await Password.fill("Test@123");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style='display: block;']").textContent()); //This will print the text content of the element with the style "display: block;" which is the error message for incorrect username and password
    await expect(page.locator("[style='display: block;']")).toContainText("Incorrect username/password.");
    await Username.fill("rahulshettyacademy"); //you can use type instead of fill but it will be slower as it will type each character one by one
    await Password.fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    console.log(await page.locator(".card-body a").nth(0).textContent()); //nth(0) is used to get the first element of the locator, you can use nth(1) to get the second element and so on
    console.log(await page.locator(".card-body a").first().textContent()); //first() is used to get the first element of the locator, you can use last() to get the last element and so on
    console.log(await page.locator(".card-body a").last().textContent()); //last() is used to get the last element of the locator, you can use nth(-1) to get the second-to-last element and so on
    
const titles = await page.locator(".card-body a").allTextContents(); //allTextContents() is used to get all the text contents of the locator as an array
console.log(titles);
});

test ("Drop downs and Radio buttons", async ({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    const Username = await page.locator("#username");
    const Password = await page.locator("#password");
    await Username.fill("rahulshettyacademy"); 
    await Password.fill("Learning@830$3mK2");
    const dropdown = await page.locator("select.form-control");
    await dropdown.selectOption("Teacher"); //This will select the option with the value "Teacher" in the dropdown
    await page.locator(".checkmark").last().click(); //This will click on the last radio button
    await page.locator("#okayBtn").click(); //This will click on the OK button in the alert
    //await page.pause(); //This will pause the execution of the test, you can use this to debug your test and see the state of the page at that moment
    await expect(page.locator(".checkmark").last()).toBeChecked(); //This will check if the last radio button is checked or not
    await page.locator("#terms").check(); //This will check the checkbox with the id "terms"
    await expect(page.locator("#terms")).toBeChecked(); //This will check if the checkbox with the id "terms" is checked or not
    await page.locator("#terms").uncheck(); //This will uncheck the checkbox with the id "terms"
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); //This will check if the checkbox with the id "terms" is not checked or not
});

test ("Hyperlink has blinking text or not", async ({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const DocumentText = page.locator("[href*='documents-request']"); //This will locate the hyperlink with the href attribute containing "documents-request"
    await expect(DocumentText).toHaveAttribute("class", "blinkingText"); //This will check if the element with the class "blinkingText" has the attribute "class" with the value "blinkingText"
});

test ("Child Windows handling", async ({browser}) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const DocumentText = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([ //This will wait untill all the promises inside the array are resolved and then it will return the new page object
        context.waitForEvent('page'), //This will wait for the new page to open after clicking on the hyperlink
        DocumentText.click() //This will click on the hyperlink to open the new page
    ]);

    const text = await newPage.locator(".red").textContent();
    console.log(text);
    const arrayText = text.split("@");  
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").type(domain);
    //console.log(await page.locator("#username").textContent()); //this will not work because the input field does not have any text content, it has a value attribute which contains the text that is typed in the input field
    console.log(await page.locator("#username").inputValue()); //This will print the value of the input field which is the text that is typed in the input field
});