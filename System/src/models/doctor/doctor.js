
module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('doctor', {
    Doctor_ID: {
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
    Speciality: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Qualifications: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ConsultationFee: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Experience: {
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
    },
    isDoctor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true // Set the default value to true
    }
  },{
    freezeTableName:true,
    timestamps: false
    
  });
  return Doctor;
};