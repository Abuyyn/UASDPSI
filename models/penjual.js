        const { DataTypes } = require('sequelize');
        const sequelize = require('./index');
        const User = require('./User');

        const Penjual = sequelize.define('Penjual', {
            penjualID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nama: {
                type: DataTypes.STRING,
                allowNull: false
            },
            noTelepon: {
                type: DataTypes.STRING,
                allowNull: false
            },
            alamat: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            tableName: 'penjual',
            timestamps: false
        });

        module.exports = Penjual;
