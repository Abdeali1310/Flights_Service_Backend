const { StatusCodes } = require("http-status-codes");
const {AirportRepo} = require("../repositories");
const AppError = require("../utils/error/app-error");
const airportRepo = new AirportRepo()

async function createAirport(data){
    try {
        const airplane = await airportRepo.create(data)
        return airplane;
    } catch (error) {
        if(error.name == 'SequelizeValidationError')
        {
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            })
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create an Airport object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports(){
    try {
        const airplane = await airportRepo.getAll();
        return airplane;
    } catch (error) {
        throw new AppError("Cannot able to fetch data at the moment",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(data){
    try {
        const airplane = await airportRepo.get(data);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The Airport with requested Id is not found",StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot able to fetch data at the moment",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id){
    try {
        const res = await airportRepo.destroy(id);
        return res;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The Airport with requested Id is not found",StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot able to delete data at the moment",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id,data){
    try {
        if (!Object.keys(data).length) {
            throw new AppError("No data provided for update", StatusCodes.BAD_REQUEST);
        }
        const res = await airportRepo.update(id,data);
        if(!res){
            throw new AppError("Please provide the necessary data to be updated",StatusCodes.BAD_REQUEST);
        }
        return res;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The Airport with requested Id is not found",StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot able to edit data at the moment",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {createAirport,getAirports,getAirport,destroyAirport,updateAirport}