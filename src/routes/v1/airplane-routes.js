const { AirplaneController } = require("../../controllers");
const express = require('express');
const { AirplaneMiddlewares } = require("../../middlewares");
const router = express.Router();

//for creating route
router.post('/',AirplaneMiddlewares.validateCreateRequest,AirplaneController.createAirplane)

//for getting all airplane data
router.get('/',AirplaneController.getAirplanes)
//for getting /:id
router.get('/:id',AirplaneController.getAirplane)

//for deleting /:id
router.delete('/:id',AirplaneController.destroyAirplane)

//for update /:id
router.patch('/:id',AirplaneController.updateAirplane)

module.exports = router;