const {expect} = require("@playwright/test");
class OrderhistoryPage {
    constructor(page) {
        this.page = page;
    }
async goToOrderHistory(){
//Go to the orders page and verify the order is present in the orders list
    await this.page.locator(".btn[routerlink*='myorders']").click();
    await this.page.locator("[scope='row']").first().waitFor();
}
async verifyOrderandReview(OrderID)
{
    const ActualOID = OrderID.split(" ")[2];
    const rows = await this.page.locator("[scope='row']").count();

    for (let i = 0; i < rows; ++i) {
        if (await this.page.locator("[scope='row']").nth(i).textContent() === ActualOID) {
            await this.page.locator(".btn.btn-primary").nth(i).click();
            break;
        }
    }
}
}
module.exports = {OrderhistoryPage}