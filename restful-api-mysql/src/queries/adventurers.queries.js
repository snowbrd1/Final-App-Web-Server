/**
 * Tables follow syntax:
 * - CREATE TABLE <table_name>(<column_name> <data_type> <options>, ...)
 * 
 *  Create a table called `adventurers` (case-insensitive), with
 * - id as an integer/number that can't have null values, auto-increment it
 * - name with a max of 255 characters, cannot have null values
 * - favorite location with a max of 255 characters, cannot have null values
 * - favorite sport with a max of 255 characters, cannot have null values
 * - favorite outfitter with a max of 255 characters,cannot have null values
 *
 * NOTE: order is important.
 * - columns can have multiple options attached (take `id` column for example)
 * - id is always first (helps with inserting)
 * - defaults always specifed last (helps with inserting)
 */
exports.CREATE_ADVENTURERS_TABLE = `CREATE TABLE IF NOT EXISTS adventurers(
  adventurer_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  adventurer_name varchar(255) NOT NULL,
  favorite_location varchar(255) NOT NULL,
  favorite_sport varchar(255) NOT NULL,
  favorite_outfitter varchar(255) NOT NULL,
  PRIMARY KEY (adventurer_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE 
)`;

// Get every adventure
exports.ALL_ADVENTURERS = (userId) => `SELECT * FROM adventurers Where user_id = ${userId}`;

// Get a single adventure by id
exports.SINGLE_ADVENTURER = (userId, adventurerId) =>
  `SELECT * FROM adventurers WHERE user_id = ${userId} AND adventurer_id = ${adventurerId}`;

/**
 * Insert follows syntax:
 * - INSERT INTO <table_name>(<col_name1>, <col_name2>, <col_name3>, ...)
 *    VALUES(<value1>, <value2>, <value3>, ...)
 *
 * Create a new adventure in `adventurers` table where
 * - column names match the order the are in the table
 * - `?` allow us to use params in our controllers
 */
exports.INSERT_ADVENTURER = (userId, adventurerName, favoriteLocation, favoriteSport, favoriteOutfitter ) =>
  `INSERT INTO adventurers (user_id, adventurer_name, favorite_location, favorite_sport, favorite_outfitter) VALUES (${userId}, ${adventurerName}, ${favoriteLocation}, ${favoriteSport}, ${favoriteOutfitter})`;

/**
 * Update follows syntax:
 * - UPDATE <table_name> SET <colum_name> = '<new_value>' WHERE <colum_name> = '<old_value>'
 *
 * NOTE: omitting `WHERE` will result in updating every existing entry.
 */
exports.UPDATE_ADVENTURER = (userId, adventurerId, newValues) =>
  `UPDATE adventurers SET ${newValues} Where user_id = ${userId} AND adventurer_id = ${adventurerId}`;

// Delete a adventure by id
exports.DELETE_ADVENTURER = (userId, adventurerId) =>
  `DELETE FROM adventurers WHERE user_id = ${userId} AND adventurer_id = ${adventurerId}`;