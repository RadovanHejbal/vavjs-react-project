CREATE DATABASE db;
USE db; 

CREATE TABLE IF NOT EXISTS users (
    id int(11) NOT NULL UNIQUE AUTO_INCREMENT,
    username varchar(50) NOT NULL UNIQUE,
    password varchar(50) NOT NULL,
    email varchar(50) NOT NULL UNIQUE,
    age int(10) NOT NULL,
    height int(10) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
