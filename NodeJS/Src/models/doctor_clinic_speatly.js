'use strict';
const {
   Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Doctor_Clinic_Speatly extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   };
   Doctor_Clinic_Speatly.init({
      doctorId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      speatlyId: DataTypes.INTEGER,
   }, {
      sequelize,
      modelName: 'Doctor_Clinic_Speatly',
   });
   return Doctor_Clinic_Speatly;
};