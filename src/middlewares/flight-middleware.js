const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");
const { compareDateAndTime } = require("../utils/helper/datetime");

const validateCreateRequest = (req, res, next) => {
  if (!req.body.flightNumber) {
    errorResponse.message = "Something broke while creating flight";
    errorResponse.error = new AppError(
      "flightNumber is not found in incoming request",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.airplaneId) {
    errorResponse.message = "Something broke while creating flight";
    errorResponse.error = new AppError(
      "airplaneId is not found in incoming request",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.departureAirportId) {
    errorResponse.message = "Something broke while creating flight";
    errorResponse.error = new AppError(
      "departureAirportId is not found in incoming request",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.arrivalAirportId) {
    errorResponse.message = "Something broke while creating flight";
    errorResponse.error = new AppError(
      "arrivalAirportId is not found in incoming request",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.arrivalTime) {
    errorResponse.message = "Something broke while creating flight";
    errorResponse.error = new AppError(
      "arrivalTime is not found in incoming request",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.departureTime) {
    errorResponse.message = "Something broke while creating flight";
    errorResponse.error = new AppError(
      "departureTime is not found in incoming request",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.price) {
    errorResponse.message = "Something broke while creating flight";
    errorResponse.error = new AppError(
      "price is not found in incoming request",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.totalSeats) {
    errorResponse.message = "Something broke while creating flight";
    errorResponse.error = new AppError(
      "totalSeats is not found in incoming request",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
};

const validateTime = (req, res, next) => {
  const result = compareDateAndTime(
    req.body.arrivalTime,
    req.body.departureTime
  );
  if (!result) {
    errorResponse.message = "Something broke while creating flight";
    errorResponse.error = new AppError(
      "Arrival time should not be behind the departure time",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
};

const validateUpdateRemainingSeats = (req, res, next) => {
  if (!req.body.seats) {
    errorResponse.message = "Something broke while Updating flight";
    errorResponse.error = new AppError(
      "Number of Seats are required",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
};
module.exports = {
  validateCreateRequest,
  validateTime,
  validateUpdateRemainingSeats,
};
