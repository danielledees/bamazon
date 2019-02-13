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
    start();

    
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

    })
}
})


//function to view products

function viewProd() {
   
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        console.log("\n");
        console.log("Inventory:");
        console.log("**********************************************************************************");
        console.log("\n");

        for(var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].item_id + " | " + "Product: " + results[i].product_name + " | " + "Department: " + results[i].department_name + " | " + "Price: " + results[i].price + " | " + "Stock QTY: " + results[i].stock_quantity + " | " + "Product Sales: " + results[i].product_sales);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        }
});
console.log("\n")

};

//function to view low inventory

function viewInv() {
    
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        for (var i =0; i < results.length; i++) {
            if (results[i].stock_quantity < 5) {
                var lowItems = {
                    item_id: results[i].item_id,
                    prod: results[i].product_name,
                    dept: results[i].department_name,
                    price: results[i].price,
                    qty: results[i].stock_quantity
                }; 
            console.log("Running low on: " + JSON.stringify(lowItems));
             } 
        } 
         
    })

  
}

function addInv() {
   
    inquirer
         .prompt([
             {
             name: "choice",
             type: "input",
             message: "Please enter the item ID you would like to update inventory for",
             validate: function(value) {
                 if (isNaN(value) === false) {
                     return true;
                 } else {
                     return false;
                 }
             }
             
            }, {
                name: "qty",
                type: "input",
                message: "What is the updated amount of item available?",
                validate: function(value) {
                    if (isNaN(value) ==false) {
                        return true;
                    } else {
                        return false;
                    }
                }

            }]).then(function(answers) {
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: answers.qty
                }, {
                    
                    item_id: answers.choice

                }], function(err, results) {
                    console.log("Inventory Updated");
                    
                });
            });

}

function addProd() {
    
    inquirer
    .prompt ([
        {
            name: "product",
            type: "input",
            message: "Enter in new product name"
        },
        {
            name: "dept",
            type: "input",
            message: "What department does the new product belong to?"
        },
        {
            name: "amt",
            type: "input",
            message: "What is the price?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        },
        {
            name: "qty",
            type: "input",
            message: "How many in stock?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        }

    ]).then(function(answer) {
        connection.query("INSERT INTO products SET ?", {
            product_name: answer.product,
            department_name: answer.dept,
            price: answer.amt,
            stock_quantity: answer.qty
        },
        function(err, results) {
            if (err) throw err;
            console.log("Item added to inventory")
        }
        );
    });

  
}





