class APIUtils {
    constructor (apiContext, loginPayload)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken()
    {
         const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", //post, delete, get, etc..
            {
                data: this.loginPayload //you can have headers and many thing inside this methods
            });
        const loginResponseJson = await loginResponse.json();
        const loginToken = loginResponseJson.token;
        console.log(loginToken);
        return loginToken;

    }
    async CreatOrder(orderPayLoad)
    {
        let response = {};
        response.token = await this.getToken(); 
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayLoad,
            headers: 
            {
                'authorization': response.token,
                'content-type': 'application/json',
            }
        });
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        response.orderID = orderResponseJson.orders[0];
        console.log(response.orderID);
        return response;

    }
}

module.exports = {APIUtils};  //this is will export the class to be used in other files.