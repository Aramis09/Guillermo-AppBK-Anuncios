const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('category', {
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