module.exports = function(sequelize, DataTypes) {
    var Parking = sequelize.define("Score", {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Score: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    });
  
    
    return Score;
  };
  