const crudRepository = require("./crud-repository");
const {Flights,Airplane,Airports} = require('../models');
const { Sequelize } = require("sequelize");
const db = require("../models");
const { addRowLockOnFlights } = require("./queries");
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

    async updateRemainingSeats(flightId,seats,dec = 1){
        await db.sequelize.query(addRowLockOnFlights(flightId))
        const flight = await Flights.findByPk(flightId);
        console.log(dec);
        if(parseInt(dec)){
            await flight.decrement('totalSeats',{by:seats});
        }else{
            await flight.increment('totalSeats',{by:seats});
        }
        return flight;
    }
}

module.exports = FlightsRepo;