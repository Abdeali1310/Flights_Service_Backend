const { FlightController } = require("../../controllers");
const express = require('express');
const { FlightMiddlewares } = require("../../middlewares");
const router = express.Router();

//for creating route
router.post('/',FlightMiddlewares.validateCreateRequest,FlightMiddlewares.validateTime,FlightController.createFlight)

//for getting all Flight data
router.get('/',FlightController.getAllFlights)
//for getting /:id
router.get('/:id',FlightController.getFlight)

// //for updating seats /:id
router.patch('/:id/seats',FlightMiddlewares.validateUpdateRemainingSeats,FlightController.updateSeats)

// //for deleting /:id
// router.delete('/:id',FlightController.destroyFlight)

// //for update /:id
// router.patch('/:id',FlightController.updateFlight)

module.exports = router;