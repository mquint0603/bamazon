var inquirer = require('inquirer');
var mysql = require('mysql');

var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    // connection.end();
  });

function showProducts(){
    connection.query("SELECT product_name,price FROM products", function(err, res){
        if (err) throw err;

        const list = []
        for (i=0; i < res.length; i++){
            list.push(`${res[i].product_name}: $${res[i].price}`)
        }

        inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to buy?",
                choices: list,
                name: "productSelected"
            },
            {
                type: "input",
                message: "How many would you like to buy?",
                name: "quantity"
            }
        ]).then(function(answer){
            var productInfo = answer.productSelected.split(":")
            var productName = productInfo[0]
            var productPrice = productInfo[1]
            // console.log(productName)
            connection.query(`SELECT * FROM products WHERE product_name= ?`, productName, function(err, res){
                if (err) throw err;
                var newStock = res[0].stock - answer.quantity;
                var sales = res[0].price * answer.quantity;
                var selectedDepartment = res[0].department_name;
                if (answer.quantity <= res[0].stock){
                    connection.query(`UPDATE products SET stock = ? WHERE product_name= ?`, [newStock, productName], function(err, res){
                        if (err) throw err;
                        console.log(`Thank you for your order of${productPrice}`)
                    })
                    connection.query(`UPDATE products SET product_sales = ? WHERE product_name= ?`, [sales, productName], function(err, res){
                        if (err) throw err;
                        // console.log(sales)
                    })
                } else {
                    console.log("Insufficient quantity")
                }

            })
        })
    })
}


  showProducts()
