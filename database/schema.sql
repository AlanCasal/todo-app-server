CREATE DATABASE todo_app;

use todo_app;

-- CREATE TABLE users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     email VARCHAR(255) UNIQUE NOT NULL,
--     password VARCHAR(255)
-- );
-- INSERT INTO users (name, email, password) VALUES ('Alan', 'alan@casal.com', 'alancasal');
-- INSERT INTO users (name, email, password) VALUES ('Natalia', 'natalia@garro.com', 'nataliagarro');

-- CREATE TABLE todos (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     completed BOOLEAN DEFAULT FALSE,
--     user_id INT NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );
-- INSERT INTO todos (title, user_id) VALUES
-- ('Buy milk', 1),
-- ('Buy bread', 1),
-- ('Buy eggs', 1),
-- ('Buy cheese', 1);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE sessions (
    token VARCHAR(255) PRIMARY KEY,
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
