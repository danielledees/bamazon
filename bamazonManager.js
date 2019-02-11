//  * List a set of menu options:

//     * View Products for Sale
    
//     * View Low Inventory
    
//     * Add to Inventory
    
//     * Add New Product

//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootpassword",
  database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected...")
    // run the start function after the connection is made to prompt the user
    start()

    
//function prompt manager for task 
function start() {
    inquirer
    .prompt ([
        {
            name: "options",
            type: "list",
            message: "Please choose a task",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"] 
        }])
    .then(function(answer) {
        if (answer.options === "View Products for Sale") {
            viewProd();
        } else if (answer.options === "View Low Inventory") {
            viewInv();
        } else if (answer.options === "Add to Inventory") {
            addInv();
        } else if (answer.options === "Add New Product") {
            addProd();
        }
        // switch(answer.option) {
        //     case "View Products for Sale": viewProd();
        //     break;
        //     case "View Low Inventory": viewInv();
        //     break;
        //     case "Add to Inventory": addInv();
        //     break;
        //     case "Add New Products": addProd();
        //     break;
        // } 

    })
}
})


//function to view products

function viewProd() {
    console.log("viewProd function is working");
//     connection.query("SELECT * FROM products", function(err, results) {
//         if (err) throw err;

//         console.log("\n");
//         console.log("Items available:");
//         console.log("**********************************************************************************");
//         console.log("\n");

//         for(var i = 0; i < results.length; i++) {
//             console.log("ID: " + results[i].id + " | " + "Product: " + results[i].product_name + " | " + "Department: " + results[i].department_name + " | " + "Price: " + results[i].price + " | " + "Stock QTY: " + results[i].stock_quantity);
//             console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
//         }
// });
};

//function to view low inventory

function viewInv() {
    console.log("viewInv function is working");
    // connection.query("SELECT * FROM products", function(err, results) {
    //     if (err) throw err;
    //     for (var i =0; i < results.length; i++) {
    //         console.log("Running low on: " + results[i].stock_quantity >= 5)
    //     }
    // })
}

function addInv() {
    console.log("addInv function is working");
}

function addProd() {
    console.log("addProd function is working");
}


