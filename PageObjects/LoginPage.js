class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInButton = page.getByRole("button", {name:'login'});
        this.email = page.getByPlaceholder("email@example.com");
        this.password = page.getByPlaceholder("enter your passsword");

    }
    async goTo(URL)
    {
        await this.page.goto(URL);
    }
    async ValidLogin(email,password) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState("networkidle"); //networkidle is not working few time so its better to use waitFor
        await this.page.locator(".card-body b").first().waitFor();
        
    }
}
module.exports = {LoginPage}