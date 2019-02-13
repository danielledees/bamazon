DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;


CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
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

INSERT INTO departments (department_name, overhead_costs)
VALUES ("electronics", 100);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("books", 50);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("clothing", 75);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("sporting goods", 125);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("kitchen appliances", 150);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("furniture", 200);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("lighting", 175);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("bedding", 50);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("bath", 100);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("office", 125);













//prodcuts 

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
VALUES ("dresser", "furniture", 150.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lamp", "lighting", 20.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("comforter", "bedding", 40.00, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shower curtain", "bath", 15.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("desk", "office", 300.00, 50);

SELECT departments.department_id, departments.department_name, departments.overhead_costs, products.product_sales 
FROM departments 
INNER JOIN products ON departments.department_name = products.department_name 
WHERE departments.department_name AND products.department_name 
GROUP BY department_id, departments.department_name, overhead_costs, product_sales


SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist 
FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year= top5000.year) 
      WHERE (top_albums.artist = ? AND top5000.artist = ?) 
      ORDER BY top_albums.year, top_albums.position";


      var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";

      query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";

      query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";




  