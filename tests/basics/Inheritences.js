//using classes file


class Pet extends require("./classes")
{
    get location1()
    {
        return "BlueCross"
    }
    // constructor(firstName, lastName)
    // {
    //     super(firstName, lastName)
    // }
    
}
let pet = new Pet("Siva ", "Sree")
console.log(pet.age)
console.log(pet.location)
console.log(pet.location1)
console.log(pet.fullName())
