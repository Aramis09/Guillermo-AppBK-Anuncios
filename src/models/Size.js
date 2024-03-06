const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('size', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        size: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            isIn: [[1, 2, 3, 4, 5]] // Esto asegura que el valor esté en el arreglo [1, 2, 3]
          }
      },
    },
    {
      timestamps: false, // sacamos las dos ultimas columnas que muestran las fechas y hora modificaciones 
  });
};