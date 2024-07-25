const crudRepository = require("./crud-repository");
const {Cities} = require('../models')
class CityRepo extends crudRepository{
    constructor(){
        super(Cities)
    }
}

module.exports = CityRepo;