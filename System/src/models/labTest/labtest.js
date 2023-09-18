
module.exports = (sequelize, DataTypes) => {
  const LabTest = sequelize.define('labTests', {
    Test_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    TestName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    TesTtime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    Priority: {
      type: DataTypes.STRING
    },
    ExpectedResultTime: {
      type: DataTypes.STRING
    },
    TestPrice: {
      type: DataTypes.INTEGER
    }
  },{
    freezeTableName:true,
    timestamps: false
    
  });
  return LabTest;
};