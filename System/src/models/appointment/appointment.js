
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('appointment', {
    Doctor_ID: {
      type:  DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    Patient_ID: {
      type:  DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    Day: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false
    }
    
  },{
    freezeTableName:true,
    timestamps: false
  });
  return Appointment;
};