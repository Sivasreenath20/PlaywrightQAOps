//This class is exported to objects.js file
module.exports = class Person //from ES6 engine
{
    age = 25
    get location()
    {
        return "Canada"
    }

    Temperature()
    {
        return "233 degrees"
    }
    //construction is method which executes by default when you create object of the class
    constructor(firstName, lastName)
    {
        this.firstName = firstName
        this.lastName = lastName
    }
    fullName()
    {
       return this.firstName+this.lastName
    }

} //While exporting comment all these lines
// let person = new Person("Siva ","Sreenath")
// console.log(person.age)
// console.log(person.location) //if you use get method then no need to use ().
// console.log(person.Temperature()) //here temperature is normal method so u need to use().
// console.log(person.fullName())