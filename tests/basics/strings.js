let day = 'tuesday '
console.log(day.length)
let subday = day.slice(0,5)
console.log(subday)
console.log(day[1])
//tue day
let splitDay = day.split("s") //automatically converted in to array
console.log(splitDay[1].length)
console.log(splitDay[1].trim().length)

let date = '23'
let nextDate = "27"
let diff = parseInt(nextDate) - parseInt(date)
console.log(diff)
diff = parseInt(date) - parseInt(nextDate) //string to number
console.log(diff)
diff.toString() //number to string

let newday = day+"is Funday"
console.log(newday)

let val =newday.indexOf("day")
console.log(val)

let val2 = newday.indexOf("day",5)
console.log(val2)

//tuesday is funday
let count =0
while(val!= -1)
{
    count++
    val = newday.indexOf("day",val+1)
}
console.log("day is present "+count+" times")

const id = "| 6a29790917ee3e78bacf40b4 |";
console.log(id.split[1])