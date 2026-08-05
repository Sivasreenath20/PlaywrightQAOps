//block of code

function add(a,b)
{
   return a+b
}

let sum = add(2,3)
console.log(sum)

//do not have name => Anonymous function -- function expressions

let sumofIntegers = function(c,d)
{
    return c+d
}

console.log(sumofIntegers(3,5))

let sumofNumber = (c,d) => c+d
console.log(sumofNumber(5,5))
const title = "Test Event"+Date.now();
console.log(title)

//