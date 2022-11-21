const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'vavjsdatabase'
});

app.get('/get/users', (req, response) => {
    const sqlInsert = "SELECT * FROM users";

    db.query(sqlInsert, (err, data) => {
        response.send(data);
    })
})

app.post("/api/login", (req, res) => {
    const sqlInsert = "SELECT * FROM users WHERE username = ? AND password = ?";
    const values = [req.body.username, req.body.password];
    
    db.query(sqlInsert, values, (err, data) => {
        if(err) {
            console.log(err);
            return;
        }
        if (data.length === 0) {
            res.send([-1, "Username or password is incorrect!"]);
            return 0;
        }else res.send(data[0]);
    })
})

app.post("/api/register", (req,res) => {
    const sqlInsert = "INSERT INTO users (username, password, email, age, height) VALUES (?)";
    const values = [req.body.login, req.body.password, req.body.email, req.body.age, req.body.height];
    db.query(sqlInsert, [values], (err, result) => {
        res.send("");
    })
})

app.post("/remove/user", (req, res) => {
    const sqlInsert = "DELETE FROM users WHERE id = ?";
    db.query(sqlInsert, req.body.idOfUser, (err, data) => {
        res.send("");
    })
})

app.listen('3001', () => {
    console.log("Server running on port 3001");
})