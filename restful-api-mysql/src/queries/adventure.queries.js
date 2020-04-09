/**
 * Tables follow syntax:
 * - CREATE TABLE <table_name>(<column_name> <data_type> <options>, ...)
 *
 * Create a table called `adventure` (case-insensitive), with
 * - id as an integer/number that can't have null values, auto-increment it
 * - name with a max of 255 characters, cannot have null values
 * - created_date set to date and time created
 * - status with a max of 10 characters, has a default of 'pending'
 *
 * NOTE: order is important.
 * - columns can have multiple options attached (take `id` column for example)
 * - id is always first (helps with inserting)
 * - defaults always specifed last (helps with inserting)
 */
exports.CREATE_ADVENTURE_TABLE = `CREATE TABLE IF NOT EXISTS adventure(
  id int NOT NULL AUTO_INCREMENT,
  user_id varchar(50) NOT NULL,
  location varchar(255) NOT NULL,
  adventure varchar(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(user_id) 
)`;

// Get every adventure
exports.ALL_ADVENTURE = `SELECT * FROM adventure`;

// Get a single adventure by id
exports.SINGLE_ADVENTURE = `SELECT * FROM adventure WHERE id = ?`;

/**
 * Insert follows syntax:
 * - INSERT INTO <table_name>(<col_name1>, <col_name3>, <col_name3>, ...)
 *    VALUES(<value1>, <value2>, <value3>, ...)
 *
 * Create a new adventure in `adventure` table where
 * - column names match the order the are in the table
 * - `?` allow us to use params in our controllers
 */
exports.INSERT_ADVENTURE = `INSERT INTO adventure (location) VALUES (?)`;

/**
 * Update follows syntax:
 * - UPDATE <table_name> SET <colum_name> = '<new_value>' WHERE <colum_name> = '<old_value>'
 *
 * NOTE: omitting `WHERE` will result in updating every existing entry.
 */
exports.UPDATE_ADVENTURE = `UPDATE adventure SET location = ?, adventure  = ? WHERE id = ?`;

// Delete a adventure by id
exports.DELETE_ADVENTURE = `DELETE FROM adventure WHERE id = ?`;