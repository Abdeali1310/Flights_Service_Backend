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

module.exports = router;