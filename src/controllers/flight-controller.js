const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { successResponse, errorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    
    });
    successResponse.data = flight;
    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error) {
    errorResponse.message = error.message;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function getAllFlights(req,res){
    try {
        const flights = await FlightService.getAllFlights(req.query);
        successResponse.data = flights;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}
module.exports = {
  createFlight,getAllFlights
};
