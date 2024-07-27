const crudRepository = require("./crud-repository");
const {Flights} = require('../models')
class FlightsRepo extends crudRepository{
    constructor(){
        super(Flights)
    }

    async getAllFlights(filter,sort){
        const response = await Flights.findAll({
            where:filter,
            order:sort,
        });
        return response;
    }
}

module.exports = FlightsRepo;