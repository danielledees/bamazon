// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.

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
    // run the start function after the connection is made to prompt the user
    start();

    //start function to confirm if person wants to shop

    function start() {
    console.log("Connected...");
    console.log("\n");

    console.log("Welcome to Bamazon!!");
    console.log("\n~~~~~~~~~~~~~~~~~~~~~");
    console.log("\n");

    inquirer
    .prompt ([
        {
            type: "confirm",
            name: "shopping",
            message: "Ready to shop",
            default: true
        }
    ]).then(function(ans) {
        if (ans.shopping === true) {
            shop();
        }
        else {
            console.log("Ok Bye!")
            connection.end();
        }
    })
  }
});


//if user confirms yes function shop to display options


  function shop() {
     connection.query("SELECT * FROM products", function(err, results) {
         if (err) throw err;

         console.log("\n");
         console.log("Items available:");
         console.log("**********************************************************************************");
         console.log("\n");

         for(var i = 0; i < results.length; i++) {
             console.log("ID: " + results[i].item_id + " | " + "Product: " + results[i].product_name + " | " + "Department: " + results[i].department_name + " | " + "Price: " + results[i].price + " | " + "Stock QTY: " + results[i].stock_quantity);
             console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
             
         }

      // The first should ask them the ID of the product they would like to buy.
     //The second message should ask how many units of the product they would like to buy.
    
         inquirer
         .prompt([
             {
             name: "choice",
             type: "input",
             message: "Please enter the item ID you would like to buy",
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
                message: "How many?",
                validate: function(value) {
                    if (isNaN(value) ==false) {
                        return true;
                    } else {
                        return false;
                    }
                }

            }])
         .then(function(answer) {
             //get product info
             var cart = answer.choice-1;
             var shoppingCart = results[cart].product_name;
             var units = answer.qty;
            
            

             //check if enough is in stock
             console.log("\n");
             console.log("Your cart contains: " + shoppingCart + " " + "QTY: " + units)
             console.log("\n");

             if (units <= results[cart].stock_quantity) {
                 console.log("Awesome, we have enough in stock to place your order");
                 console.log("\n");
                 var orderAmt = results[cart].price * units;
                 var newAmt = parseInt(orderAmt) + parseInt(results[cart].product_sales)

                 console.log("Your order total is  $" + orderAmt);
                 console.log("\n");
                 connection.query("UPDATE products SET ? WHERE ?", [
                     {
                    stock_quantity: results[cart].stock_quantity - units,
                    product_sales: newAmt

                },
                 {
                    
                    item_id: results[cart].item_id
                }], function(err, results) {
                    console.log("SQL Updated");
                    //start();  //doesn't work
                    shopMore();
                });

                

                //******************* */
//                 when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

//    * Make sure your app still updates the inventory listed in the `products` column.
        //******************* */
                 
               
             } else {
                console.log("\n");
                 console.log("Sorry, not enought in stock.  Order Cancelled!");
                 //start(); //doesn't work
                 shopMore();

             }
            })
        })
    }

//function to prompt customer if they want to continue shopping
    function shopMore () {
        
        inquirer
        .prompt ([
            {
                type: "confirm",
                name: "more",
                message: "Would you like to purchase anything else?",
                default: true
            }
        ]).then(function(res) {
            if (res.more === true) {
                shop();
            }
            else {
                console.log("Thanks for shopping with us! Have a nice day!")
                connection.end();
            }
        })
        
    }

   

