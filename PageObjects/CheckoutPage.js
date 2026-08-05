class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.enterCountry = page.getByPlaceholder("Select Country");
        this.card = page.locator("input[value*='4542']");
        this.month = page.locator(".ddl").first();
        this.year = page.locator(".ddl").last();
        this.cvv = page.locator(".field.small input").first();
        this.coupon = page.locator(".field.small input").nth(1);
        this.cardHolderName = page.locator(".field input").nth(2);
        this.applyButton = page.locator(".btn-primary.mt-1");
        this.placeOrderButton = page.locator(".btnn");
    }
    async selectCountry(country) {
        
        await this.page.getByPlaceholder("Select Country").pressSequentially(country);
        await this.page.locator(".ta-results").waitFor();
    
    // 3. Find the button that EXACTLY matches your country variable (ignoring case)
    // By targetting '.ta-item', we search specifically inside the dropdown results.
    await this.page.locator("button.ta-item").filter({ hasText: new RegExp(`^\\s*${country}\\s*$`, 'i') }).click();
    //we should only ` this in this statements, 
    // ^ anchor - Asserts the start of the string. The match must begin at the very first character of the text block.
    // we should use \\s so compiler under stand \s which stands for whitespace, tab etc., 
    //* (Quantifier) - means "there can be zero spaces, one space, or a hundred spaces here."
    //${country} : Looks for the literal word.
    //$ (Anchor): Asserts the end of the string. The match must finish right after those optional trailing spaces.
    //'i' (Flag): Stands for case-insensitive. It ensures that "India", "INDIA", "india", and "InDiA" are all treated as a perfect match.
    }
    async fillCardDetails(cardNumber, month, year, cvv, name) {
        //Enterring Credit Card details 
        await this.card.fill(cardNumber);
        await this.month.selectOption(month);
        await this.year.selectOption(year);
        await this.cvv.first().fill(cvv);
        await this.cardHolderName.fill(name);
    }
    async applyCouponCode(couponCode) {
        await this.coupon.fill(couponCode);
        await this.applyButton.click();
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
}

module.exports = {CheckoutPage}