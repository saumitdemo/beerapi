const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const port = 5000;

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'beerapi'
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();
app.use(bodyParser.json())

// Insert category
app.post('/addcategory', (req, res) => {
    let post = {name:req.body.name};
    let sql = 'INSERT INTO category SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Insert beer
app.post('/addbeer', (req, res) => {
    let beerName = req.body.name;
    let catId = req.body.category_id;
    let style = req.body.style;
    let brewery = req.body.brewery;
    let location = req.body.location;
    let calories = req.body.calories;
    let sql = 'INSERT INTO beer (name, category_id, style, brewery, location, calories) VALUES (?, ?, ?, ?, ?, ?)';
    let query = db.query(sql, [beerName, catId, style, brewery, location, calories], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Select all categories
app.get('/getcategories', (req, res) => {
    let sql = 'SELECT * FROM category';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Select all beers for category
app.get('/getbeers/:id', (req, res) => {
    let category_id = req.params.id;
    let sql = 'SELECT id, name FROM beer WHERE category_id = ?';
    let query = db.query(sql, [category_id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Select single category
app.get('/getcategory/:id', (req, res) => {
    let category_id = req.params.id;
    let sql = 'SELECT name FROM category WHERE id = ?';
    let query = db.query(sql, [category_id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Select single beer
app.get('/getbeer/:id', (req, res) => {
    let sql = `SELECT * FROM beer WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Update category
app.get('/updatecategory/:id', (req, res) => {
    let newName = 'Updated Category Name';
    let sql = `UPDATE category SET name = '${newName}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Update beer
app.get('/updatebeer/:id', (req, res) => {
    let newName = 'Updated Beer Name';
    let sql = `UPDATE beer SET name = '${newName}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Delete category
app.get('/deletecategory/:id', (req, res) => {
    let sql = `DELETE FROM category WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Delete beer
app.get('/deletebeer/:id', (req, res) => {
    let sql = `DELETE FROM beer WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});