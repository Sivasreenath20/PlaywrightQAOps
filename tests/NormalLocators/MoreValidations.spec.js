const {test, expect} = require("@playwright/test");
test.describe.configure({mode: "parallel"}); //this will run the tests in parallel mode

test ("Popup Validation", async ({page}) =>{
    await page.goto("https://google.com");
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goBack(); //this will go backward in the webpage
    await page.goForward(); //This go forward in the webpage

//Checking visibility of the element     
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#show-textbox").click();
    await expect(page.locator("#displayed-text")).toBeVisible();  
    
//Handling alert and confirm popups
    await page.locator("#alertbtn").click();
    page.on("dialog", dialog => dialog.accept()); //await is not needed actually whereever the dialog box (doesn't have html code) opens it will trigger 
    await page.locator("#confirmbtn").click();
    page.on("dialog", dialog => dialog.dismiss()); //if you put await then it will follow the path otherwise it will trigger wherever the dialog box open in the code it will come back to this line and excute

//hovering with mouse
    await page.locator("#mousehover").hover();
    await page.getByRole('link', { name: 'Top' }).click();
    await page.locator("#mousehover").hover();
    await page.getByRole('link', { name: 'Reload' }).click();
    
//Handling frames = they are child pages in the main page which completely seperate from main frame but present as a child in the main frame
//frame links should be provided by engineer if there are any frames in the main page
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click(); //:visible will see only visible elements
    const joinstring = await framePage.locator(".text h2").textContent();
    console.log(joinstring.split(" ")[1]);
});

test ("Screenshots of page and element", async ({page}) =>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: "screenshot1.png"}); //this will take the screenshot of the element and save it in the path provided
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.screenshot({path: "screenshot2.png"}); //this will take the screenshot of the whole page and save it in the path provided
});

// test ("Visual Comparison Comparing Screenshot", async ({page}) =>{
//     await page.goto("https://www.copado.com/ads/copado-robotic-testing-quality-that-moves-you-forward?utm_source=google&utm_medium=cpc&utm_campaign=google_search_india_en_core_testing_nonbrand&utm_content=UI%20testing&utm_term=automated%20web%20testing&gad_source=1&gad_campaignid=14164141658&gbraid=0AAAAACvgvepDH54XjwkM3Bd7pCaQukR9X&gclid=CjwKCAjw9szSBhBNEiwAC57SqzezTR6dMq6GV6CT9MfAmpyiU7kzJ2RgI6QS5Al17EgCh_2EoMSHCBoC1bMQAvD_BwE"); //this will take the screenshot of the element and save it in the path provided
//     expect (await page.screenshot()).toMatchSnapshot("1.png");
// });