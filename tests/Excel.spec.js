const {test, expect} = require("@playwright/test");
const excelJS = require("exceljs");
async function writeExcelFile(searchText, replaceText, change, filePath) {
    const workbook = new excelJS.Workbook();
    await workbook.xlsx.readFile(filePath) //here for reading the excel file will take some time so we need to use await keyword
    const worksheet = workbook.getWorksheet('Sheet1'); //this will get the worksheet named "Sheet1" from the excel file and store it in a variable called worksheet
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
                //console.log(rowNumber); //this will print the row number of the cell which has the value "Orange"
                ouput.row = rowNumber;
                //console.log(colNumber); //this will print the column number of the cell which has the value "Orange"
                ouput.col = colNumber;
            }
        })
    })
    return ouput;
}
test ("End to end test", async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();
    const textSearch = 'Mango';
    const updateValue = '350';
    
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", {name : "Download"}).click();
    const download = await downloadPromise;
    await download.saveAs("C:/Users/sivas/Downloads/download.xlsx");
    writeExcelFile(textSearch, updateValue, {rowChange:0, colChange:2}, "C:/Users/sivas/Downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/sivas/Downloads/download.xlsx");
    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
})