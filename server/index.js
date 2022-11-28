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

app.post("/import/users", (req,res) => {
    const sqlInsert = "LOAD DATA INFILE 'C:/Users/hejba/Desktop/FIIT STU/5.Semester/VAVJS/Zadanie_3/users.csv' INTO TABLE users FIELDS TERMINATED BY ';' IGNORE 1 ROWS;";
    db.query(sqlInsert, (err, data) => {
        console.log(err);
        console.log(data);
    })
})

app.post("/export/users", (req, res) => {
    const sqlInsert = "SELECT * FROM users INTO OUTFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\' FIELDS TERMINATED BY ';' LINES TERMINATED BY '\n'";
    db.query(sqlInsert, (err, data) => {
        console.log(err);
        console.log(data);
    })
})

app.post("/insert/measurment", (req, res) => {
    let sqlInsert = "INSERT INTO weights (date, value, userId, method) VALUES (?)";
    if(req.body.measurment === "pulses") sqlInsert = "INSERT INTO pulses (date, value, userId, method) VALUES (?)";
    else if(req.body.measurment === "steps") sqlInsert = "INSERT INTO steps (date, value, userId, method) VALUES (?)";
    const values = [req.body.date, req.body.val, req.body.userId, req.body.method];
    db.query(sqlInsert, [values], (err, data) => {
        if(err === null) {
            res.send("Successfully added!");
        }
    })
})

app.post("/get/measurements", (req, res) => {
    let sqlInsert = "SELECT * FROM weights WHERE userId = ?";
    if(req.body.measurement === "steps") sqlInsert = "SELECT * FROM steps WHERE userId = ?";
    else if(req.body.measurement === "pulses") sqlInsert = "SELECT * FROM pulses WHERE userId = ?";
    db.query(sqlInsert, [req.body.id], (err, data) => {
        res.send(data);
    })

})

app.get("/get/advertising", (req, res) => {
    const sqlInsert = "SELECT * FROM advertising";
    db.query(sqlInsert, (err, data) => {
        res.send(data[0]);
    })
})

app.post("/new-link", (req,res) => {
    const sqlInsert = "UPDATE advertising SET link = ?";
    
    db.query(sqlInsert, [req.body.link], (err, data) => {
        if(err === null) {
            res.send("success");
        }
    })
})

app.post("/set/image", (req,res) => {
    const sqlInsert = "UPDATE advertising SET image = ?";
    
    db.query(sqlInsert, [req.body.image], (err, data) => {
        if(err === null) {
            res.send("success");
        }
    })
})

app.listen('3001', () => {
    console.log("Server running on port 3001");
})