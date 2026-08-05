Feature: Ecommerce Vaidation

    Scenario: Placing Order
        Given Login to the Ecommerce application using "sivasreenath890@gmail.com" and "AEV!Ga!By53q.hm"
        When Add "ZARA COAT 3" to the cart and Navigate to the cart page
        Then Verify "ZARA COAT 3" the product is displayed in the cart
        When Click on Checkout button and Checkout the order
        Then Verify the order is placed successfully