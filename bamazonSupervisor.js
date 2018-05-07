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



  inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to do?",
                choices: ["View Product Sales by Department", "Create New Department"],
                name: "action"
            }
        ]).then(function(answer){
            var productInfo = answer.productSelected.split(":")
            var productName = productInfo[0]
            var productPrice = productInfo[1]
            // console.log(productName)
            connection.query(`SELECT * FROM products WHERE`, function(err, res){
                if (err) throw err;


            })
        })