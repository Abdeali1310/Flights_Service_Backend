const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { successResponse, errorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

async function createAirport(req,res){
    try {
        const Airport = await AirportService.createAirport({
            name:req.body.name,
            code:req.body.code,
            cityId:req.body.cityId,
        });
        successResponse.data = Airport;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}

async function getAirports(req,res){
    try {
        const Airport = await AirportService.getAirports();
        successResponse.data = Airport;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}


async function getAirport(req,res){
    try {
        const Airport = await AirportService.getAirport(req.params.id);
        successResponse.data = Airport;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}


async function destroyAirport(req,res){
    try {
        const Airport = await AirportService.destroyAirport(req.params.id);
        successResponse.data = Airport;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}

async function updateAirport(req,res){
    try {
        if (!Object.keys(req.body).length) {
            throw new AppError("Request body is empty. Please provide data to update.", StatusCodes.BAD_REQUEST);
        }
        let data =  await AirportService.getAirport(req.params.id);
        let newData = req.body;
        const Airport = await AirportService.updateAirport(req.params.id,{...data,...newData});
        successResponse.data = Airport;
        return res.status(StatusCodes.OK).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}
module.exports = {
    createAirport,getAirports,getAirport,destroyAirport,updateAirport
}