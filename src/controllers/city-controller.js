const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { successResponse, errorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

async function createCity(req,res){
    try {
        console.log("Controller");
        const airplane = await CityService.createCity({
            name:req.body.name,
        });
        successResponse.data = airplane;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}

async function getCities(req,res){
    try {
        const city = await CityService.getCities();
        successResponse.data = city;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}

async function getCity(req,res){
    try {
        const city = await CityService.getCity(req.params.id);
        successResponse.data = city;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}

async function destroyCity(req,res){
    try {
        const city = await CityService.destroyCity(req.params.id);
        successResponse.data = city;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}

async function updateCity(req,res){
    try {
        if (!Object.keys(req.body).length) {
            throw new AppError("Request body is empty. Please provide data to update.", StatusCodes.BAD_REQUEST);
        }
        let data =  await CityService.getCity(req.params.id);
        let newData = req.body;
        const city = await CityService.updateCity(req.params.id,{...data,...newData});
        successResponse.data = city;
        return res.status(StatusCodes.OK).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}


module.exports = {createCity,getCities,getCity,destroyCity,updateCity}