const { CityController } = require("../../controllers");
const express = require('express');
const { CityMiddlewares } = require("../../middlewares");
const router = express.Router();

//for creating route
router.post('/',CityMiddlewares.validateCreateRequest,CityController.createCity)

//for getting all cities
router.get('/',CityController.getCities)

//for getting city /:id
router.get('/:id',CityController.getCity)

//for delete /:id
router.delete('/:id',CityController.destroyCity)

//for update /:id
router.patch('/:id',CityController.updateCity)

module.exports = router;