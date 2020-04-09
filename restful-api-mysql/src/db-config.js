const mysql = require('mysql');
const { CREATE_USER_TABLE } = require('./queries/user.queries');
const { CREATE_ADVENTURE_TABLE } = require('./queries/adventure.queries');
const query = require('./utils/query');

// Get the Host from Environment or use default
const host = process.env.DB_HOST || 'localhost';

// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'root';

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || '';

// Get the Database from Environment or use default
const database = process.env.DB_DATABASE || 'final';

// Create the connection with required details
module.exports = async () =>
  new Promise(async (resolve, reject) => {
    const con = mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    const userTableCreated = await query(con, CREATE_USER_TABLE).catch(
      (err) => {
        reject(err);
      }
    );

    const adventureTableCreated = await query(con, CREATE_ADVENTURE_TABLE).catch(
      (err) => {
        reject(err);
      }
    );

    if (!!userTableCreated && !!adventureTableCreated) {
      resolve(con);
    }
  });