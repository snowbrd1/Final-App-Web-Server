
exports.CREATE_ADVENTURER_TABLE = `CREATE TABLE IF NOT EXISTS adventurer(
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    sport VARCHAR(50) NULL DEFAULT 'null',
    location VARCHAR(100) NULL DEFAULT 'null' ,
    PRIMARY KEY (id)
  )`;

  // Get every adventurer
  exports.ALL_ADVENTURER = `SELECT * FROM adventurer`;
  
  // Get a single adventurer by id
  exports.SINGLE_ADVENTURER = `SELECT * FROM adventurer WHERE id = ?`;
  
  /**
   * Insert follows syntax:
   * - INSERT INTO <table_name>(<col_name1>, <col_name3>, <col_name3>, ...)
   *    VALUES(<value1>, <value2>, <value3>, ...)
   *
   * Create a new adventurer in `adventurer` table where
   * - column names match the order the are in the table
   * - `?` allow us to use params in our controllers
   */
  exports.INSERT_ADVENTURER = `INSERT INTO adventurer (name) VALUES (?)`;
  
  /**
   * Update follows syntax:
   * - UPDATE <table_name> SET <colum_name> = '<new_value>' WHERE <colum_name> = '<old_value>'
   *
   * NOTE: omitting `WHERE` will result in updating every existing entry.
   */
  exports.UPDATE_ADVENTURER = `UPDATE adventurer SET name = ?, location = ? WHERE id = ?`;
  
  // Delete a adventurer by id
  exports.DELETE_ADVENTURER = `DELETE FROM adventurer WHERE id = ?`;