const { StatusCodes } = require("http-status-codes");
const {FlightsRepo} = require("../repositories");
const AppError = require("../utils/error/app-error");
const flightRepo = new FlightsRepo()

async function createFlight(data){
    try {
        const flight = await flightRepo.create(data)
        return flight;
    } catch (error) {
        if(error.name == 'SequelizeValidationError')
        {
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            })
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create an Flight object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {createFlight}