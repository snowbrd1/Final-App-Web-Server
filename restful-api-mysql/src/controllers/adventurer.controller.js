const con = require('../db-config');
const queries = require('../queries/adventurer.queries');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

exports.getAllAdventurer = function(req, res) {
  con.query(queries.ALL_ADVENTURER, function(err, result, fields) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

// http://localhost:4000/adventurer/1
exports.getAdventurer = function(req, res) {
  con.query(queries.SINGLE_ADVENTURER, [req.params.adventurerId], function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

// http://localhost:4000/adventurer/1
/**
 * POST request -
 * {
 *  name: 'An adventurer name'
 * }
 */
exports.createAdventurer = function(req, res) {
  con.query(queries.INSERT_ADVENTURER, [req.body.name], function(err, result) {
    if (err) {
      res.send(err);
    }
    console.log(result);
    res.json({ message: 'Number of records inserted: ' + result.affectedRows });
  });
};

// http://localhost:4000/adventurer/1
/**
 * PUT request -
 * {
 *  name: 'An adventurer name',
 *  state: 'completed'
 * }
 */
exports.updateAdventurer = function(req, res) {
  con.query(
    queries.UPDATE_ADVENTURER,
    [req.body.name, req.body.location, req.params.adventurerId],
    function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    }
  );
};

// http://localhost:4000/adventurer/1
exports.deleteAdventurer = function(req, res) {
  con.query(queries.DELETE_ADVENTURER, [req.params.adventurerId], function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Adventurer lost!' });
  });
};