const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Stage extends Model {
    static associate(models) {
      // associations can be defined here if needed
    }
  }

  Stage.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
          this.setDataValue('title', value.trim())
        },
        validate: { notEmpty: true }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      thumbUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      textChallenge: {
        type: DataTypes.TEXT,
        allowNull: false,
        set(value) {
          this.setDataValue('textChallenge', value.trim())
        },
        validate: { notEmpty: true }
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at',
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      modelName: 'Stage',
      tableName: 'stages'
    }
  )

  return Stage
}
