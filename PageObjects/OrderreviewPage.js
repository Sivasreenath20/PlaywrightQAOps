const {expect} = require("@playwright/test");
class OrderreviewPage {
    constructor(page) {
        this.page = page;
    }
    async getOrderID()
    {
        await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const OrderID = await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        return OrderID;
    }
}
module.exports = {OrderreviewPage}