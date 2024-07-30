'use strict';
const {
  Model
} = require('sequelize');
const { enums } = require('../utils/common');
const {ECONOMY,BUSINESS,PREMIUM_ECONOMY,FIRST_CLASS} = enums.SEAT_VALUE;
module.exports = (sequelize, DataTypes) => {
  class Seats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Airplane,{
        foreignKey:'airplaneId',
      });
    }
  }
  Seats.init({
    airplaneId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    row: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    col: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    type: {
      type:DataTypes.ENUM,
      values:[BUSINESS,ECONOMY,PREMIUM_ECONOMY,FIRST_CLASS],
      defaultValue:ECONOMY,
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'Seats',
  });
  return Seats;
};