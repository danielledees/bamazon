// Running this application will list a set of menu options:

//    * View Product Sales by Department
   
//    * Create New Department

// 4. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

// | department_id | department_name | over_head_costs | product_sales | total_profit |
// | ------------- | --------------- | --------------- | ------------- | ------------ |
// | 01            | Electronics     | 10000           | 20000         | 10000        |
// | 02            | Clothing        | 60000           | 100000        | 40000        |

// 5. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

// 6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.

//    * Hint: You may need to look into aliases in MySQL.

//    * Hint: You may need to look into GROUP BYs.

//    * Hint: You may need to look into JOINS.

//    * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)


var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require('table');
const cTable = require('console.table');
var Table = require('cli-table');

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
            choices: ["View Product Sales by Department", "Create New Department"] 
        }])
    .then(function(answer) {
        if (answer.options === "View Product Sales by Department") {
            viewSales();
        } else if (answer.options === "Create New Department") {
            addDept();
        } 
    })
}
})

function viewSales() {
    
    // connection.query("SELECT departments.department_id, departments.department_name, departments.overhead_costs, products.product_sales FROM departments JOIN products ON departments.department_name = products.department_name WHERE departments.department_name AND products.department_name GROUP BY department_id, departments.department_name, overhead_costs, product_sales", function(err, results) {
    //     if (err) throw err;


    //     console.log("error here " + err);
    //     console.log("Results here " + results);

    //     console.log("\n");
    //     console.log("Sales:");
    //     console.log("**********************************************************************************");
    //     console.log("\n");

        // for(var i = 0; i < results.length; i++) {
        //     console.log("ID: " + results[i].department.id + " | " + "Department: " + results[i].department_name + " | " + "Overhead Costs: " + results[i].overhead_costs + " | " + "Product Sales: " + results[i].product_sales);
        //     console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");             
        //     }

    // }) end query

        var query = "SELECT departments.department_id, departments.department_name, departments.overhead_costs, products.product_sales FROM departments INNER JOIN products ON departments.department_name = products.department_name WHERE departments.department_name AND products.department_name GROUP BY department_id, departments.department_name, overhead_costs, product_sales";

        connection.query(query, function(err, results) {
            if (err) throw err;

        
            var table = new Table({
                head: ['ID', 'Department', 'Overhead Costs', 'Product Sales']
              , colWidths: [20, 20, 20, 20]
            });
             
            // table is an Array, so you can `push`, `unshift`, `splice` and friends
            for (var i = 0; i < results.length; i++) {
                table.push(
                    [results[i].department_id, results[i].department_name]
                  
                );
            }
            console.log(table.toString());
            
        }) //end query   
           
//******* */I can't figure out why the results are not printing********

} //end function


//function to add department

function addDept() {
    inquirer
    .prompt ([
        {
            name: "department",
            type: "input",
            message: "Enter in new department name"
        },
        {
            name: "cost",
            type: "input",
            message: "What are the overhead costs?"
        }

    ]).then(function(answer) {
        connection.query("INSERT INTO departments SET ?", {
            department_name: answer.department,
            overhead_costs: answer.cost,
        },
        function(err, results) {
            if (err) throw err;
            console.log("Department Added")
        }
        );
    });
}