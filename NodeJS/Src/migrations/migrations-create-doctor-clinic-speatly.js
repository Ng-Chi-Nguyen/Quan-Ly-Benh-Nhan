'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ham addColum them cot vao ma k mat data cu
    // Them bang vao csdl: npx sequelize-cli db:migrate
    await queryInterface.createTable('Doctor_Clinic_Speatly', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctorId: {
        type: Sequelize.INTEGER
      },
      clinicId: {
        type: Sequelize.INTEGER
      },
      speatlyId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Doctor_Clinic_Speatly');
  }
};