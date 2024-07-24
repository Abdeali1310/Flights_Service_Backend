const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { successResponse, errorResponse } = require("../utils/common");

async function createAirplane(req,res){
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity,
        });
        successResponse.data = airplane;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}

module.exports = {
    createAirplane,
}