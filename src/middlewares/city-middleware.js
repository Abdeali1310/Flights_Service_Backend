const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

const validateCreateRequest = (req, res, next) => {
  if (!req.body.name) {
    console.log("middleware")
    errorResponse.message = "Something broke while creating City";
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
};

module.exports = { validateCreateRequest };
