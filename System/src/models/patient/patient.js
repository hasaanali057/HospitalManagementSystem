
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('patient', {
    Patient_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ContactNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    freezeTableName:true,
    timestamps: false
    
  });
  return Patient;
};