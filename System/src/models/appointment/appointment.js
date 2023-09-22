
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('appointment', {
    Appointment_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false,
      defaultValue: 1
    },
    Day: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Time: {
      type: DataTypes.STRING,
      allowNull: false
    }
    
  },{
    freezeTableName:true,
    timestamps: false
  });
  return Appointment;
};