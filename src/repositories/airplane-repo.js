const crudRepository = require("./crud-repository");
const {Airplane} = require('../models')
class AirplaneRepo extends crudRepository{
    constructor(){
        super(Airplane)
    }
}

module.exports = AirplaneRepo;