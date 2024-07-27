const express = require('express');

const { InfoController } = require('../../controllers');
const router = express.Router();
const AirplaneRoutes = require('./airplane-routes')
const CityRoutes = require('./city-route')
const AirportRoute = require('./airport-route')
const FlightRoute = require('./flight-route')

router.get('/info', InfoController.info);
router.use('/airplanes',AirplaneRoutes)
router.use('/cities',CityRoutes)
router.use('/airports',AirportRoute)
router.use('/flights',FlightRoute)
module.exports = router;