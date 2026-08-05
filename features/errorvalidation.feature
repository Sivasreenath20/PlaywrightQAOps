Feature: Error Vaidation

    @validation
    Scenario Outline: Error Validation
        Given Login to the Ecommerce1 application using "<username>" and "<password>"
        Then Verify the error message is displayed

        Examples:
            | username                  | password          |
            | sivasreenath890@gmail.com | AEV!Ga!By53q.hm   |
            | rahulshettyacademy        | Learning@830$3mK2 |

    @regression
    Scenario: valid login
    Given Login to the Ecommerce application using "rahulshettyacademy" and "Learning@830$3mK2" valid
    Then User is login