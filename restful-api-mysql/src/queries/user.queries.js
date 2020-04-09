exports.CREATE_USER_TABLE = `CREATE TABLE IF NOT EXISTS user(
    user_id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
  )`;

exports.GET_ME_BY_USER_ID = `SELECT user_id, username, email FROM user WHERE user_id = ?`; // don't return the password

exports.GET_ME_BY_USERNAME = `SELECT user_id, username, email FROM user WHERE username = ?`; // don't return the password

exports.GET_ME_BY_USER_ID_WITH_PASSWORD = `SELECT * FROM user WHERE user_id = ?`;

exports.GET_ME_BY_USERNAME_WITH_PASSWORD = `SELECT * FROM user WHERE username = ?`;

exports.INSERT_NEW_USER = `INSERT INTO user (username, email, password) VALUES (?, ?, ?)`;

exports.UPDATE_USER = `UPDATE user SET username = ?, email = ?, password = ? WHERE user_id = ?`;