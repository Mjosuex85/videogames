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
      unique: true
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false
    },

    released: {    // REVISAR DATATYPE!!!
      type: DataTypes.STRING,
      allowNull: false,
    },

    rating: {               // DEBE SER INTEGER
      type: DataTypes.INTEGER,
      allowNull: false
    },

    plataforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },

    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    screenShots: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    }

  });
};