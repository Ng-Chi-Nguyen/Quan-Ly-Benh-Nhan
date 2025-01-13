'use strict';
module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Ham addColum them cot vao ma k mat data cu
      // Them bang vao csdl: npx sequelize-cli db:migrate
      await queryInterface.createTable('Allcode', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         key: {
            type: Sequelize.STRING
         },
         type: {
            type: Sequelize.STRING
         },
         valueEn: {
            type: Sequelize.STRING
         },
         valueVi: {
            type: Sequelize.STRING
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
      await queryInterface.dropTable('Allcode');
   }
};