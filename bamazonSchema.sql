CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	id INTEGER NOT NULL auto_increment,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price DECIMAL(10,4) NOT NULL,
    stock INTEGER,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Hair Junk", "Beauty", 89.99, 20);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Face Goop", "Beauty", 48.23, 20);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Bro Fuel", "Food", 29.00, 10);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Placebo Vitamins", "Health", 29.99, 10);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Those stretchy band things", "Fitness", 15.00, 20);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Blanket specifically for yoga", "Fitness", 39.80, 20);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Tea with unrealistic promises", "Food", 9.99, 10);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Kale something or other", "Food", 5.99, 20);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Unnecessary Level of Vitamin C", "Health", 6.99, 20);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Sassy Slogan T-shirt", "Clothing", 29.99, 10);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Overpriced Leggings", "Clothing", 99.00, 10);

SELECT * FROM products;