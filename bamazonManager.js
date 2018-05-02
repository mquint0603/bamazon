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

 function start(){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View products", "View low inventory", "Add to inventory", "Add new item"],
            name: "action"
        }
    ]).then(function(answer){
        if (answer.action === "View products"){
            viewProducts()
        } else if (answer.action === "View low inventory"){
            lowInventory()
        } else if (answer.action === "Add to inventory"){
            addInventory()
        } else if (answer.action === "Add new item"){
            newItem()
        }
    })
 } 

 function viewProducts (){
    connection.query("SELECT * FROM products", function(err, res){
        for (i=0; i < res.length; i++){
            console.log(`Id: ${res[i].id};  Product: ${res[i].product_name};  Department: ${res[i].department_name};  Price: ${res[i].price};  Stock: ${res[i].stock}\n`)
        }
    })
 }


function lowInventory (){
    connection.query("SELECT * FROM products WHERE stock < 5", function(err, res){
        for (i=0; i < res.length; i++){
            console.log(`Id: ${res[i].id};  Product: ${res[i].product_name};  Department: ${res[i].department_name};  Price: ${res[i].price};  Stock: ${res[i].stock}\n`)
        }
    })
}

function addInventory(){
    connection.query("SELECT * FROM products", function(err, res){
        var itemList = []
        for (i=0; i < res.length; i++){
            itemList.push(`${res[i].product_name}`)
        }
        inquirer.prompt([
            {
                type: "list",
                message: "What would you like to order more of?",
                choices: itemList,
                name: "orderItem"
            },
            {
                type: "input",
                message: "How many?",
                name: "orderNumber"
            }
        ]).then(function(answer){
            // console.log(answer.orderItem)
            connection.query(`SELECT stock FROM products WHERE product_name= ?`, answer.orderItem, function(err, res){
                if (err) throw err;
                var newStock = res[0].stock + parseInt(answer.orderNumber);
                connection.query('UPDATE products SET stock = ? WHERE product_name = ?', [newStock, answer.orderItem], function(err, res){
                    if (err) throw err;
                    console.log(`Ordered more!`)
                })
            })
        })
    })
}


function newItem(){
    inquirer.prompt([
        {
            type: "input",
            message: "Item name:",
            name: "name"
        },
        {
            type: "input",
            message: "Department name:",
            name: "department"
        },
        {
            type: "input",
            message: "Price:",
            name: "price"
        },
        {
            type: "input",
            message: "Quantity:",
            name: "stock"
        }
    ]).then(function(answer){
        // console.log(answer.orderItem)
        connection.query(`INSERT INTO products SET ?`, 
        {
            product_name: answer.name,
            department_name: answer.department,
            price: answer.price,
            stock: answer.stock

        }, function(err, res){
            if (err) throw err;
            console.log("Item added")
        })
    })
}

start()

