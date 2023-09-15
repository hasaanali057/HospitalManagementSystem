
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
    Testime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    Priority: {
      type: DataTypes.STRING
    },
    ExpectedResult: {
      type: DataTypes.DATE
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