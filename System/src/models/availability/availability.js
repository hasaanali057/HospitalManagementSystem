
module.exports = (sequelize, DataTypes) => {
  const Availability = sequelize.define('availability', {
    availabilitySlot_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    Day: {
      type: DataTypes.STRING
    },
    TimeFrom: {
      type: DataTypes.STRING
    },
    TimeTo: {
      type: DataTypes.STRING
    }
    
  },{
    freezeTableName:true,
    timestamps: false
    
  });
  return Availability;
};