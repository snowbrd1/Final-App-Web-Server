const express = require('express');
const {
  getAllAdventure,
  createAdventure,
  getAdventure,
  updateAdventure,
  deleteAdventure,
} = require('../controllers/adventure.controller');
const canAccess = require('../middleware/auth.middleware');

const adventureRoutes = express.Router();
/**
 * Express routes for Adventure.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all adventure. Evaluates to `/adventure/`.
 */
adventureRoutes.get('/', canAccess, getAllAdventure).post('/', canAccess, createAdventure);

/**
 * Routes for a adventure by id. Evalutes to `/adventure/:adventureId`.
 */
adventureRoutes
  .get('/:adventureId', canAccess, getAdventure) // GET http://locahost:4000/adventure/1
  .put('/:adventureId', canAccess, updateAdventure)
  .delete('/:adventureId', canAccess, deleteAdventure);

module.exports = adventureRoutes;