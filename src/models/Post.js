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
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        img: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        number_phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        personal_page: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: true,
        },
    },
    {
      timestamps: false, // sacamos las dos ultimas columnas que muestran las fechas y hora modificaciones 
  });
};