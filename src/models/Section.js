const { DataTypes } = require('sequelize');
//!principal, eventos, informacion util
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('section', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique:true
      },
    },
    {
      timestamps: false, // sacamos las dos ultimas columnas que muestran las fechas y hora modificaciones 
  });
};