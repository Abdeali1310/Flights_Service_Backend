const logger  = require("../config/logger-config");


class crudRepository{
    constructor(model){
        this.model = model;
    }

    async create(data){
        try {
            const res = await this.model.create(data);
            return res;
        } catch (error) {
            logger.error("Error in create");
            throw error;
        }
    }
    async destroy(data){
        try {
            const res = await this.model.destroy({
                where:{
                    id:data,
                }
            });
            return res;
        } catch (error) {
            logger.error("Error in Destroy");
            throw error;
        }
    }
    async get(data){
        try {
            const res = await this.model.findAll();
            return res;
        } catch (error) {
            logger.error("Error in Get");
            throw error;
        }
    }
    async update(data){
        try {
            const res = await this.model.update(data,{
                where:{
                    id:id,
                }
            });
            return res;
        } catch (error) {
            logger.error("Error in Update");
            throw error;
        }
    }
}

module.exports = crudRepository