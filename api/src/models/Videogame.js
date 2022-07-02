const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false
    },

    released: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    plataforms: {
      type: DataTypes.STRING,
      allowNull: false
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    }

  });
};