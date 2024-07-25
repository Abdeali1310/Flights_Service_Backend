const { StatusCodes } = require("http-status-codes");
const {AirplaneRepo} = require("../repositories");
const AppError = require("../utils/error/app-error");
const airplaneRepo = new AirplaneRepo()

async function createAirplane(data){
    try {
        const airplane = await airplaneRepo.create(data)
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
        throw new AppError("Cannot create an Airplane object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes(){
    try {
        const airplane = await airplaneRepo.getAll();
        return airplane;
    } catch (error) {
        throw new AppError("Cannot able to fetch data at the moment",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(data){
    try {
        const airplane = await airplaneRepo.get(data);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The Airplane with requested Id is not found",StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot able to fetch data at the moment",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id){
    try {
        const res = await airplaneRepo.destroy(id);
        return res;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The Airplane with requested Id is not found",StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot able to fetch data at the moment",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {createAirplane,getAirplanes,getAirplane,destroyAirplane}