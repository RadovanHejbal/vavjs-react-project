/*
    Radovan Hejbal
*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const fs = require('fs');
const fastcsv = require('fast-csv');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'db',
});

app.post('/inicialize', (req, res) => {
    var sqlInsert = "CREATE TABLE IF NOT EXISTS users (id int NOT NULL UNIQUE AUTO_INCREMENT, username varchar(50) NOT NULL UNIQUE, password varchar(50) NOT NULL, email varchar(50) NOT NULL UNIQUE, age int(10) NOT NULL, height int(10) NOT NULL, PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;"

    db.query(sqlInsert, (err, data) => {
        console.log(err);
        console.log(data);
    })

    sqlInsert = "CREATE TABLE IF NOT EXISTS weights (id int NOT NULL UNIQUE AUTO_INCREMENT, date datetime NOT NULL, value int NOT NULL, method varchar(50), userId int NOT NULL, PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;";
    db.query(sqlInsert, (err, data) => {
        console.log(err);
        console.log(data);
    })

    sqlInsert = "CREATE TABLE IF NOT EXISTS steps (id int NOT NULL UNIQUE AUTO_INCREMENT, date datetime NOT NULL, value int NOT NULL, method varchar(50), userId int NOT NULL, PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;";
    db.query(sqlInsert, (err, data) => {
        console.log(err);
        console.log(data);
    })

    sqlInsert = "CREATE TABLE IF NOT EXISTS pulses (id int NOT NULL UNIQUE AUTO_INCREMENT, date datetime NOT NULL, value int NOT NULL, method varchar(50), userId int NOT NULL, PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;";
    db.query(sqlInsert, (err, data) => {
        console.log(err);
        console.log(data);
    })

    sqlInsert = "CREATE TABLE IF NOT EXISTS methods (id int NOT NULL UNIQUE AUTO_INCREMENT, title varchar(50) NOT NULL, description varchar(100), userId int NOT NULL, PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;";
    db.query(sqlInsert, (err, data) => {
        console.log(err);
        console.log(data);
    })

    sqlInsert = "CREATE TABLE IF NOT EXISTS advertising (image varchar(500) NOT NULL, link varchar(500) NOT NULL, count int) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;";
    db.query(sqlInsert, (err, data) => {
        console.log(err);
        console.log(data);
    })

    sqlInsert = "INSERT INTO advertising (image, link, count) VALUES ('https://www.mktg-edge.com/wp-content/uploads/2020/01/Website-image-advertising-1024x640.jpg', 'https://www.youtube.com/', 0)";
    db.query(sqlInsert, (err, data) => {
        console.log(err);
        console.log(data);
    })
})

app.get('/get/users', (req, response) => {

    const sqlInsert = "SELECT * FROM users";
    db.query(sqlInsert, (err, data) => {
        response.send(data);
    })
})

app.post("/api/login", (req, res) => {
    
    db.query(`SELECT * FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`, (err, data) => {
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
    async function readCsv() {
        const content = await fsPromises.readFile('./users.csv', 'utf-8');
        console.log(fsPromises.readFile('./users.csv', 'utf-8'));
    }

    (async () => {
        await readCsv();
    })
})

app.post("/export/users", (req, res) => {
    const sqlInsert = "SELECT * FROM users";
    db.query(sqlInsert, (err, data) => {
        if(err) return;
        const ws = fs.createWriteStream('./users.csv');
        fastcsv.write(data, { headers: true}).on("finish", () => {
            res.send("Exported");
        }).pipe(ws);
    })
})

app.post("/insert/measurment", (req, res) => {
    let sqlInsert = "INSERT INTO weights (date, value, userId, method) VALUES (?)";
    if(req.body.measurment === "pulses") sqlInsert = "INSERT INTO pulses (date, value, userId, method) VALUES (?)";
    else if(req.body.measurment === "steps") sqlInsert = "INSERT INTO steps (date, value, userId, method) VALUES (?)";
    const values = [req.body.date, req.body.val, req.body.userId, req.body.method];
    db.query(sqlInsert, [values], (err, data) => {
        if(err === null) {
            res.send(data);
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

app.post("/remove/measurement", (req, res) => {
    let sqlInsert = "DELETE FROM weights WHERE id = ?";
    if(req.body.measurement === "steps") sqlInsert = "DELETE FROM steps WHERE id = ?";
    if(req.body.measurement === "pulses") sqlInsert = "DELETE FROM pulses WHERE id = ?";

    console.log(req.body.id);
    db.query(sqlInsert, [req.body.id], (err, data) => {
        res.send(data);
    })
})

app.post("/add/method", (req, res) => {
    const sqlInsert = "INSERT INTO methods (title, description, userId) VALUES (?)";
    const values = [req.body.method, req.body.description, req.body.userId];
    db.query(sqlInsert, [values], (err, data) => {
        if(err) return;
        res.send(data);
    })
})

app.post("/remove/method", (req, res) => {
    const sqlInsert = "DELETE FROM methods WHERE id = ?";
    db.query(sqlInsert, [req.body.id], (err, data) => {
        if(!err) res.send("success");
    })
})

app.post("/get/methods", (req, res) => {
    const sqlInsert = "SELECT * from methods WHERE userId = ?";
    console.log(req.body.userId);
    db.query(sqlInsert, [req.body.userId], (err, data) => {
        console.log(data);
        res.send(data);
    })
})

app.post("/clicked/ad", (req,res) => {
    const sqlInsert = "UPDATE advertising SET count = count + 1";
    db.query(sqlInsert, (err, data) => {
        console.log(data);
    })
})

app.listen('8080', () => {
    console.log("Server running on port 8080");
})

