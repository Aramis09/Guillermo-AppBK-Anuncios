const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('importance', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        importance: {
          type: DataTypes.CHAR(1),
          allowNull: false,
          validate: {
            isIn: [["A", "B", "C", "D", "E"]] // Esto asegura que el valor esté en el arreglo [1, 2, 3]
          }
      },
    },
    {
      timestamps: false, // sacamos las dos ultimas columnas que muestran las fechas y hora modificaciones 
  });
  };