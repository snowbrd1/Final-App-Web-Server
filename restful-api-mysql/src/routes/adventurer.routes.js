const controllers = require('../controllers/adventurer.controller');
const express = require('express');

const adventurerRoutes = express.Router();
/**
 * Express routes for Adventurer.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all adventurer. Evaluates to `/adventurer/`.
 */
adventurerRoutes.get('/', controllers.getAllAdventurer).post('/', controllers.createAdventurer);

/**
 * Routes for an adventurer by id. Evalutes to `/adventurer/:adventurerId`.
 */
adventurerRoutes
  .get('/:adventurerId', controllers.getAdventurer) // GET http://locahost:4000/adventurer/1
  .put('/:adventurerId', controllers.updateAdventurer)
  .delete('/:adventurerId', controllers.deleteAdventurer);

module.exports = adventurerRoutes;