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
        owner: {
          type: DataTypes.STRING,
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
        expire:{
          type: DataTypes.DATE,
          allowNull: false,
        },
        deleted:{
          type: DataTypes.BOOLEAN,
          allowNull: false,
        }
    },
    {
      timestamps: true, // sacamos las dos ultimas columnas que muestran las fechas y hora modificaciones 
  });
};