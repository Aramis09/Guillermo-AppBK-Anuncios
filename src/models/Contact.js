const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('contact', {
        type: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            isIn: [["whatsapp","personal-page","direct-phone","none"]] // Esto asegura que el valor esté en el arreglo [1, 2, 3]
            }
        },
    },
    {
      timestamps: false, // sacamos las dos ultimas columnas que muestran las fechas y hora modificaciones 
  });
};