var marks = Array(6)
var marks = new Array (20, 32, 55, 55 ,44 ,44)

var marks = [20,10,100,15,58,22]
subMarks = marks.slice(2,5)
console.log(subMarks)
console.log(marks[0])//20
marks[4]=66
console.log(marks)//[20,100,100,15,66,22]
console.log(marks.length)//6
marks.push(66)//adding new element to array at the last
console.log(marks)//[20,100,100,15,66,22,66]
marks.pop()//removing the last element from array at the last
console.log(marks)//[20,100,100,15,66,22]
marks.unshift(12)//adding new element to array at the start
console.log(marks)//[12, 20, 100, 100,15, 66,  22]
console.log(marks.indexOf(100))//2
console.log(marks.includes(120))//false
//reduce filter map
var sum =0
//sum of all numbers in array using reduce
var total = marks.reduce((sum,mark)=>sum+mark,0)
console.log(total)

//filter
let evenmarks =marks.filter(n=>n%2==0)
console.log(evenmarks)

//map
let maparray = evenmarks.map(score=>score*3)
console.log(maparray)

//again summing all the mapped values in map array
var total =maparray.reduce((sum,maparray)=>sum+maparray,0)
console.log(total)