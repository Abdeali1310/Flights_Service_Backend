const crudRepository = require("./crud-repository");
const {Airports} = require('../models')
class AirportRepo extends crudRepository{
    constructor(){
        super(Airports)
    }
}

module.exports = AirportRepo;