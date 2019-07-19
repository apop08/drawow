module.exports = function(sequelize, DataTypes) {
    var Score = sequelize.define("Score", {
      userName: {
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
  