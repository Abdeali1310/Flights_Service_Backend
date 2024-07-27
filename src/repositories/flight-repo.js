const crudRepository = require("./crud-repository");
const {Flights} = require('../models')
class FlightsRepo extends crudRepository{
    constructor(){
        super(Flights)
    }
}

module.exports = FlightsRepo;