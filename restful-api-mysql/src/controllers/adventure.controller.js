const connection = require('../db-config');
const {
  ALL_ADVENTURE,
  SINGLE_ADVENTURE,
  INSERT_ADVENTURE,
  UPDATE_ADVENTURE,
  DELETE_ADVENTURE,
} = require('../queries/adventure.queries');
const query = require('../utils/query');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

// http://localhost:4000/adventure
exports.getAllAdventure = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all adventure
  const adventure = await query(con, ALL_ADVENTURE).catch((err) => {
    res.send(err);
  });

  if (adventure.length) {
    res.json(adventure);
  }
};

// http://localhost:4000/adventure/1
exports.getAdventure = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all adventure
  const adventure = await query(con, SINGLE_ADVENTURE, [req.params.adventureId]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (adventure.length) {
    res.json(adventure);
  }
};

// http://localhost:4000/adventure
/**
 * POST request -
 * {
 *  name: 'A adventure name'
 * }
 */
exports.createAdventure = async (req, res) => {
  // verify valid token
  const decoded = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (decoded.id) {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });

    // query add adventure
    const result = await query(con, INSERT_ADVENTURE, [req.body.name]).catch(
      (err) => {
        res.send(err);
      }
    );
    console.log(result);

    if (result.affectedRows === 1) {
      res.json({ message: 'Added adventure successfully!' });
    }
  }
};

// http://localhost:4000/adventure/1
/**
 * PUT request -
 * {
 *  name: 'A adventure name',
 *  state: 'completed'
 * }
 */
exports.updateAdventure = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query update adventure
  const result = await query(con, UPDATE_ADVENTURE, [
    req.body.name,
    req.body.status,
    req.params.adventureId,
  ]).catch((err) => {
    res.send(err);
  });

  if (result.affectedRows === 1) {
    res.json(result);
  }
};

// http://localhost:4000/adventure/1
exports.deleteAdventure = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query delete adventure
  const result = await query(con, DELETE_ADVENTURE, [req.params.adventureId]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (result.affectedRows === 1) {
    res.json({ message: 'Deleted successfully.' });
  }
};