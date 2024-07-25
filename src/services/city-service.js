const { StatusCodes } = require("http-status-codes");
const {CityRepo} = require("../repositories");
const AppError = require("../utils/error/app-error");
const cityRepo = new CityRepo()

async function createCity(data){
    try {
        console.log("service")
        const city = await cityRepo.create(data)
        return city;
    } catch (error) {
        console.log(error);
        if(error.name == 'SequelizeValidationError' || 'SequelizeUniqueConstraintError')
        {
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            })
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a City object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCities(){
    try {
        const city = await cityRepo.getAll();
        return city;
    } catch (error) {
        throw new AppError("Cannot able to fetch data at the moment",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCity(data){
    try {
        const city = await cityRepo.get(data);
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The City with requested Id is not found",StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot able to fetch data at the moment",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    try {
        const res = await cityRepo.destroy(id);
        return res;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The City with requested Id is not found",StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot able to delete data at the moment",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id,data){
    try {
        if (!Object.keys(data).length) {
            throw new AppError("No data provided for update", StatusCodes.BAD_REQUEST);
        }
        const res = await cityRepo.update(id,data);
        if(!res){
            throw new AppError("Please provide the necessary data to be updated",StatusCodes.BAD_REQUEST);
        }
        return res;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The City with requested Id is not found",StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot able to edit data at the moment",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {createCity,getCities,getCity,destroyCity,updateCity}