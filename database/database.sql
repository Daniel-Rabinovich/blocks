CREATE DATABASE site;

\c site;

CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(100)
);

CREATE TABLE blocks (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) references users(username),
    date DATE DEFAULT CURRENT_TIMESTAMP,
    data TEXT NOT NULL
);
