const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('user', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        user: {
          type: DataTypes.STRING,  
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,  
          allowNull: false,
        },
    },
    {
      timestamps: false, // sacamos las dos ultimas columnas que muestran las fechas y hora modificaciones 
  });
};