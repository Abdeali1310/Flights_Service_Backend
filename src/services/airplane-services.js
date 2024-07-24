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

module.exports = {createAirplane}