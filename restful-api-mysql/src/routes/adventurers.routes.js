const express = require('express');
const {
  getAllAdventurers,
  createAdventurer,
  getAdventurer,
  updateAdventurer,
  deleteAdventurer,
} = require('../controllers/adventurers.controller');
const canAccess = require('../middleware/auth.middleware');

const adventurersRoutes = express.Router();
/**
 * Express routes for Adventurers.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all adventurers. Evaluates to `/adventurers/`.
 */
adventurersRoutes.get('/', canAccess, getAllAdventurers).post('/', canAccess, createAdventurer);

/**
 * Routes for an adventure by id. Evalutes to `/adventurers/:adventurerId`.
 */
adventurersRoutes
  .get('/:adventurerId', canAccess, getAdventurer) // GET http://locahost:4000/adventure/1
  .put('/:adventurerId', canAccess, updateAdventurer)
  .delete('/:adventurerId', canAccess, deleteAdventurer);

module.exports = adventurersRoutes;