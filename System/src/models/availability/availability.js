
module.exports = (sequelize, DataTypes) => {
  const Availability = sequelize.define('availability', {
    availabilitySlot_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    Day: {
      type: DataTypes.DATEONLY
    },
    TimeFrom: {
      type: DataTypes.TIME
    },
    TimeTo: {
      type: DataTypes.TIME
    }
    
  },{
    freezeTableName:true,
    timestamps: false
    
  });
  return Availability;
};