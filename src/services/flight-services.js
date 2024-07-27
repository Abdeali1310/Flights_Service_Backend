const { StatusCodes } = require("http-status-codes");
const {FlightsRepo} = require("../repositories");
const AppError = require("../utils/error/app-error");
const { Op } = require("sequelize");
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

async function getAllFlights(query){
    const endTime = ' 23:59:00'
    const customFilter = {};
    let sortFilter = [];
    if(query.trips){
        const [departureAirportId,arrivalAirportId] = query.trips.split('-');
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    if(query.price){
        const[minPrice,maxPrice] = query.price.split('-');
        customFilter.price = {
            [Op.between] : [minPrice,((maxPrice == undefined)?20000:maxPrice)]
        }
    }
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte]:query.travellers
        }
    }
    if(query.tripDate){
        customFilter.departureTime = {
            [Op.between] : [query.tripDate,query.tripDate+endTime]
        }
    }
    if(query.sort){
        const params = query.sort.split(',');
        const sortFilters = params.map((param)=> param.trim().split('_'))
        sortFilter=sortFilters
        console.log(customFilter,sortFilter);
    }
    
    try {
        const flights = await flightRepo.getAllFlights(customFilter,sortFilter);
        return flights;
    } catch (error) {
        throw new AppError("Cannot able to fetch data at the moment",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {createFlight,getAllFlights}