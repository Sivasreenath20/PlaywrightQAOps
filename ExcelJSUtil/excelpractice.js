const ExcelJS = require("exceljs");

// Using promise syntax

//     const workbook = new ExcelJS.Workbook();
//     workbook.xlsx.readFile("C:/Users/sivas/Downloads/ExcelPractice.xlsx").then (()=>{  //here for reading the excel file will take some time so promise syntax is used first it will read the file and then it will execute the next line of code
//     const worksheet = workbook.getWorksheet('Sheet1');
//     worksheet.eachRow((row, rowNumber) => {
//         row.eachCell((cell, colNumber) => {
//             console.log(cell.value);
//         })
//     })
// })

// Using async/await syntax
async function writeExcelFile(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath) //here for reading the excel file will take some time so we need to use await keyword
    const worksheet = workbook.getWorksheet('Sheet1');
    const ouput = await readExcelFile(worksheet,searchText);  //this will call the readExcelFile function and store the returned value in a variable called ouput

    //Changing the value of a cell in the excel file
    const cell = worksheet.getCell(ouput.row,ouput.col+change.colChange); //Here we are storing the cell in row 3 and column 2 in a variable called cell
    cell.value = replaceText; //this will change the value of the cell in row 3 and column 2 to "IPhone"
    await workbook.xlsx.writeFile(filePath); //This will save the changes made to the excel file
}
async function readExcelFile(worksheet, searchText) {
    let ouput = {row:0, col:0};
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            //Printing all the values in the excel file
            //console.log(cell.value); //this will print all the values in the excel file

            //Printing the row number and column number of a cell which has a specific value
            if (cell.value === searchText) {
                console.log(rowNumber); //this will print the row number of the cell which has the value "Orange"
                ouput.row = rowNumber;
                console.log(colNumber); //this will print the column number of the cell which has the value "Orange"
                ouput.col = colNumber;
            }
        })
    })
    return ouput;
}

writeExcelFile("Apple", 100, {rowChange:0, colChange:2}, "C:/Users/sivas/Downloads/ExcelPractice.xlsx"); //this will call the writeExcelFile function and pass the values "Apple", "IPhone" and the file path of the excel file as arguments