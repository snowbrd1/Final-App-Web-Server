const mysql = require('mysql');
const connection = require('../db-config');
const {
  ALL_ADVENTURERS,
  SINGLE_ADVENTURER,
  INSERT_ADVENTURER,
  UPDATE_ADVENTURER,
  DELETE_ADVENTURER,
} = require('../queries/adventurers.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

// http://localhost:4000/adventurers
exports.getAllAdventurers = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all adventurers
  const adventurers = await query(con, ALL_ADVENTURERS(req.user.id), []).catch(
    serverError(res)
  );

  // [] === true, 0 === false
  if (!adventurers.length) {
    res.status(200).json({ msg: 'No adventurers available for this user.'});;
  }
  res.json(adventurers);
};

// http://localhost:4000/adventurers/1
exports.getAdventurer = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all adventurer
  const adventurer = await query(
    con, 
    SINGLE_ADVENTURER(req.user.id, req.params.adventurerId)
    ).catch(serverError(res));
    
  if (!adventurer.length) {
      res.status(400).json({msg: 'No adventurers available for this user.' });
    }
    res.json(adventurer);
  };

// http://localhost:4000/adventurers
/**
 * POST request -
 * {
 *  name: 'An adventurer name'
 * }
 */
exports.createAdventurer = async (req, res) => {
  // verify valid token
  const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (user.id) {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });

    // query add adventurer
    const adventurerName = mysql.escape(req.body.adventurer_name);
    const favoriteLocation = mysql.escape(req.body.favorite_location);
    const favoriteSport = mysql.escape(req.body.favorite_sport);
    const favoriteOutfitter = mysql.escape(req.body.favorite_outfitter);
    const result = await query(con, INSERT_ADVENTURER(user.id, adventurerName, favoriteLocation, favoriteSport, favoriteOutfitter)).catch(
      serverError(res)
    );
 
    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ 
          msg: `Unable to add adventurer: ${req.body.adventurer_name}` 
        });
    }
    res.json({ msg: 'Added adventurer successfully!' })
  }
};

/**
 * Build up values string.
 *
 * @example
 * 'key1 = value1, key2 = value2, ...'
 * "adventurer_name = \'Adventurer 1\', sport = \'\', location = \'\', outfitter = \'\'"
 */
const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    
    (key) => `${key} = ${mysql.escape(body[key])}` // 'New 1 adventurer name'
  );

  values.join(', '); // make into a string
  return values;
};

// http://localhost:4000/adventurers/1
/**
 * PUT request -
 * {
 *  name: 'An adventurer name',
 *  state: 'completed'
 * }
 */
exports.updateAdventurer = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });
  const values = _buildValuesString(req);

  // query update adventurer
  const result = await query(
    con, 
    UPDATE_ADVENTURER(req.user.id, req.params.adventurerid, values)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
        .status(500)
        .json({ msg: `Unable to update adventurer: '${req.body.adventurer_name}'` 
      });
    }
    res.json(result);
  };

// http://localhost:4000/adventure/1
exports.deleteAdventurer = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query delete adventurer
  const result = await query(
    con, 
    DELETE_ADVENTURER(req.user.id, req.params.adventurerId)
    ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
    .status(500)
    .json({ msg: `Unable to delete adventurer at: ${req.params.adventurerId}`});
    }
    res.json({ msg: 'Deleted successfully.' });
};