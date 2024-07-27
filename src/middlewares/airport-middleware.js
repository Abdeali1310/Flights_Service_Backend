const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

const validateCreateRequest = (req, res, next) => {
  if (!req.body.name) {
    errorResponse.message = "Something broke while creating airport";
    errorResponse.error = new AppError("Name is not found in incoming request",StatusCodes.BAD_REQUEST)
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.code) {
    errorResponse.message = "Something broke while creating airport";
    errorResponse.error = new AppError("Code is not found in incoming request",StatusCodes.BAD_REQUEST)
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.cityId) {
    errorResponse.message = "Something broke while creating airport";
    errorResponse.error = new AppError("cityId is not found in incoming request",StatusCodes.BAD_REQUEST)
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
};

module.exports = { validateCreateRequest };
