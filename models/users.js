module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      userName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
      
    });
  
    
  
    return Users;
  };
  