const {test,expect} = require("@playwright/test");
test("@Web Calendar Validations", async ({page})=>{
 
    const monthNumber = "6";
    const Year = "2002";
    const Day = "15";
    const expectList = [monthNumber, Day, Year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    const decadeStart = Math.floor((Number(Year) - 1) / 10) * 10 + 1;
    await page.locator(".react-calendar__century-view__decades__decade").getByText(decadeStart).click();
    await page.getByText(Year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()="+Day+"]").click();

    const Calendar = await page.locator(".react-date-picker__inputGroup__input"); //playwright locates hidden element as well, so we need to use common locator for all the three visible elements
    for(let i=0; i<expectList.length; i++)
    {
        const actualValue = await Calendar.nth(i).inputValue();
        expect(actualValue).toEqual(expectList[i]);
    }
})