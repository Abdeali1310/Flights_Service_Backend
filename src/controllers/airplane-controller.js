const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { successResponse, errorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

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

async function getAirplanes(req,res){
    try {
        const airplane = await AirplaneService.getAirplanes();
        successResponse.data = airplane;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}


async function getAirplane(req,res){
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        successResponse.data = airplane;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}


async function destroyAirplane(req,res){
    try {
        const airplane = await AirplaneService.destroyAirplane(req.params.id);
        successResponse.data = airplane;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}

async function updateAirplane(req,res){
    try {
        if (!Object.keys(req.body).length) {
            throw new AppError("Request body is empty. Please provide data to update.", StatusCodes.BAD_REQUEST);
        }
        let data =  await AirplaneService.getAirplane(req.params.id);
        let newData = req.body;
        const airplane = await AirplaneService.updateAirplane(req.params.id,{...data,...newData});
        successResponse.data = airplane;
        return res.status(StatusCodes.OK).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}
module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}