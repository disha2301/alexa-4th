const readline = require('readline');
const fs = require('fs');
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,

});
console.log("Welcome to the address directory where you can add and view your informations.\n ");
console.log("Please choose one of the following options : \n");
// function named takeChoice to take the required choice number and proceed further
takeChoice();
function takeChoice() {
    read.question("Enter  (1) - To add a new address. \n(2) - to view the entries \n", (option) => {
        switchCase(option);
    });
}

function switchCase(choice) {
    switch (choice) {
        case '1': enter();
            takeChoice();
            break;
        case '2':
            stop();
        case '3':
            view();
            stop();
            break;

        default: console.log("\nKindly Choose a valid Option!");
            console.log("");
            takeChoice();

    }

};
//function enter to store the informations entered

function enter() {
    console.log("");
    read.question("Enter the name: ", (n) => {
        read.question("Enter the address: ", (add) => {
            let data = {
                name: n,
                address: add,
            }
            let json = JSON.stringify(data);
            fs.appendFileSync("write.json", json + ",", function (err) {
                if (err) throw err;
            });
            console.log("\n we have successfully saved your informations");
            takeChoice();

        })
    })
}
//The function view which displays the directory 
function view() {
    let data = fs.readFileSync('write.json', 'utf-8');
    let l = data.length;
    // console.log(data);
    let data1;
    if (data.length < 3)
        data1 = "[]";
    else if (data.charAt(l - 1) == ',')
        data1 = "[" + data.substring(0, data.length - 1) + " ]";
    else if (data.charAt(l - 1) == '}')
        data1 = "[" + data.substring(0, data.length) + " ]";
    else if (data.charAt(l - 1) == ' ')
        data1 = "[" + data.substring(0, data.length - 2) + " ]";
    let data2 = JSON.parse(data1);
    console.log("");
    console.table(data2);
    takeChoice();
}
//function named stop to take the entering control out
function stop() {
    console.log("\nThank You for your respose! ");
    read.close();
}

