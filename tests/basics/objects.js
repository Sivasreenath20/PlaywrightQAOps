//object is collections of properties
const Person =  require('./classes')
let person = {
    firstName: 'Tim',
    lastName: 'Joe',
        age : 24,
    fullName : function() //unanimous function
    {
        console.log(this.firstName+this.lastName) //here this keyword represents current property
    }
}
console.log(person.fullName()) //declare any function with brackets
console.log(person.lastName) //accessing property in the object with dot notation
console.log(person['firstName']) //accessing property in the object with array notation

person.firstName = "Tim Dane" //reassigning value
console.log(person.firstName)
person.Gender = 'Male'
console.log(person)
delete person.Gender
console.log(person)

console.log('gender' in person) 

for(let key in person)
{
    console.log(person[key])
}

let person1 = new Person("Sree ","Vidya")
console.log(person1.fullName())