const { AirportController } = require("../../controllers");
const express = require('express');
const { AirportMiddlewares } = require("../../middlewares");
const router = express.Router();

//for creating route
router.post('/',AirportMiddlewares.validateCreateRequest,AirportController.createAirport)

//for getting all Airport data
router.get('/',AirportController.getAirports)
//for getting /:id
router.get('/:id',AirportController.getAirport)

//for deleting /:id
router.delete('/:id',AirportController.destroyAirport)

//for update /:id
router.patch('/:id',AirportController.updateAirport)

module.exports = router;