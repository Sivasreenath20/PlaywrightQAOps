const playwright = require("@playwright/test");
const { POManager } = require("../../PageObjects/POManger");
const { Before, After, BeforeAll, AfterAll, BeforeStep, AfterStep, Status} = require("@cucumber/cucumber");

BeforeAll(async ()=>{//BeforeAll hook will run before executing all scenarios
    console.log("Before all scenarios");
})

Before (async function(){ //Before hook will run before each scenario
    const browser = await playwright.chromium.launch({headless: process.env.CI ? true : false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = await new POManager(this.page);
})

BeforeStep (async function(){ //BeforeStep hook will run before each step
    console.log("Before Step");
})
AfterStep (async function({result}){ //AfterStep hook will run after each step
    if (result.status === Status.FAILED)//triple equals to or double equals it will work
    {
        await this.page.screenshot({path:"screenshot1.png"}) //here it will capture screenshot if any step is failed so we need to import status
    }
})

After (async function(){ //After hook will run after each scenario
    console.log("Closing the browser");
})

AfterAll (async ()=>{//AfterAll hook will run after executing all scenarios
    console.log("After all scenarios");
})