const { DataTypes } = require('sequelize');
const sequelize = require('./plantsdb');

const Plant = require('./Plant');

const PlantCareTips = sequelize.define('PlantCareTips', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
    },
});

PlantCareTips.belongsTo(Plant);

module.exports = PlantCareTips;
