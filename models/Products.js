const { DataTypes } = require('sequelize');
const sequelize = require('./plantsdb');

const PlantCareTips = require('./PlantCareTips');

const Plant = sequelize.define('Plant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
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

Plant.hasMany(PlantCareTips);

module.exports = Plant;