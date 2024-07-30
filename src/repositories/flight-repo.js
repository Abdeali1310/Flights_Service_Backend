const crudRepository = require("./crud-repository");
const {Flights,Airplane,Airports} = require('../models');
const { Sequelize } = require("sequelize");
class FlightsRepo extends crudRepository{
    constructor(){
        super(Flights)
    }

    async getAllFlights(filter,sort){
        const response = await Flights.findAll({
            where:filter,
            order:sort,
            include:[
                {
                    model:Airplane,
                    required:true,
                    as:'airplaneDetail',
                },
                {
                    model:Airports,
                    required:true,
                    as:'departureAirport',
                    on:{
                        col1:Sequelize.where(Sequelize.col('Flights.departureAirportId'),'=',Sequelize.col('departureAirport.code'))
                    }
                },
                {
                    model:Airports,
                    required:true,
                    as:'arrivalAirport',
                    on:{
                        col1:Sequelize.where(Sequelize.col('Flights.arrivalAirportId'),'=',Sequelize.col('arrivalAirport.code'))
                    }
                }
            ]
        });
        return response;
    }
}

module.exports = FlightsRepo;