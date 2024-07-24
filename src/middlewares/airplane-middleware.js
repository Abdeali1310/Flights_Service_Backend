const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

const validateCreateRequest = (req, res, next) => {
  if (!req.body.modelNumber || !req.body.capacity) {
    errorResponse.message = "Something broke while creating airplane";
    !req.body.modelNumber ? errorResponse.error = new AppError("Model number is not found in incoming request",StatusCodes.BAD_REQUEST) : errorResponse.error = new AppError("Capacity is not found in incoming request",StatusCodes.BAD_REQUEST) 

    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
};

module.exports = { validateCreateRequest };
