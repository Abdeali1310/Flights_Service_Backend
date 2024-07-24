const { AirplaneController } = require("../../controllers");
const express = require('express');
const { AirplaneMiddlewares } = require("../../middlewares");
const router = express.Router();

//for creating route
router.post('/',AirplaneMiddlewares.validateCreateRequest,AirplaneController.createAirplane)


module.exports = router;