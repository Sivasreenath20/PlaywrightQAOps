let fruits =["Banana", "Mango", "Apple", "Orange"]
fruits.sort()
console.log(fruits)

var score = [12,55,41,3,555]
console.log(score.sort()) //[ 12, 3, 41, 55, 555 ] is failing
console.log(score.sort((a,b)=>a-b))
/*
score.sort(function(a,b)){
return a-b
}
console.log(score)
*/