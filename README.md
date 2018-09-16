# beerapi

This is the React and Node demo for Canpango.

This project uses MySQL as the database.

Run the the following SQL:

CREATE DATABASE beerapi;

USE beerapi;

CREATE TABLE category
(
  id INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE beer
(
  id INT AUTO_INCREMENT,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  ibu VARCHAR(255) NULL,
  abv VARCHAR(255) NULL,
  style VARCHAR(255) NULL,
  brewery VARCHAR(255) NULL,
  location VARCHAR(255) NULL,
  calories INT NULL,
  PRIMARY KEY (id)
);

Run "nodemon server.js" and then in the client directory, run "npm start"
