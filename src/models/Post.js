const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('post', {
        id:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        img: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        contactValue: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
    },
    {
      timestamps: false, // sacamos las dos ultimas columnas que muestran las fechas y hora modificaciones 
  });
};