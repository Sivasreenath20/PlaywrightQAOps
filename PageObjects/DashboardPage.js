class DashboardPage{

    constructor(page)
    {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b")
        this.cart = page.locator("[routerlink='/dashboard/cart']")
    }
    async addProductToCart(productName){
        const count = await this.products.count(); //returns the count of the locator
    
        const Titles = await this.productsText.allTextContents(); 
        console.log(Titles);
    
        //Zara Coat 3
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) //This will check if the text content of the element with the tag "b" in the product is "ZARA COAT 3"
            {
                //Add to Cart
                await this.products.nth(i).locator("text= Add To Cart").click(); //This will click on the "Add To Cart" button of the product with the name "ZARA COAT 3"
                break; //This will break the loop after finding the product and adding it to the cart
            }
        }
    }
    async navigateToCart()
    {
        await this.cart.click(); //This will click on the cart button in the header
        await this.page.locator("div li").last().waitFor();
    }
}

module.exports = {DashboardPage}