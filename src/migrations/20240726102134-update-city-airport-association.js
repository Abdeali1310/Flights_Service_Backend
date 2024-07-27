'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports',{
      type:'FOREIGN KEY',
      name:'city_foreignKey_constraint',
      fields:['cityId'],
      references:{
        table:'Cities',
        field:'id',
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports','city_foreignKey_constraint')
  }
};
