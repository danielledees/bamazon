DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;


CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NULL,
    department_name VARCHAR (100) NULL,
    price INT default 0,
    stock_quantity INT (50) NULL,
    PRIMARY KEY (id)
);


CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR (100) NULL,
    overhead_costs INT default 0,
    primary key (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("speakers", "electronics", 200.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("kindle", "books", 100.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("blouse", "clothing", 15.00, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("snow board", "sporting goods", 250.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("blender", "kitchen appliances", 30.00, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dresser", "furniture", 150.00), 20;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lamp", "lighting", 20.00), 7;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("comforter", "bedding", 40.00), 35;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shower curtain", "bath", 15.00), 5;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("desk", "office", 300.00, 50);





  