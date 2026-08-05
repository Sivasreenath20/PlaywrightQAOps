class CartPage{
    constructor(page)
    {
        this.page = page;
        this.checkOutButton = page.locator("button[type='button']");
    }

    async checkOutProduct()
    {
        await this.checkOutButton.nth(1).click();
    }
}
module.exports = {CartPage}