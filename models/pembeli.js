    const { DataTypes } = require('sequelize');
    const sequelize = require('./index'); 
    const user = require('./User');

    const Pembeli = sequelize.define('Pembeli', {
        pembeliID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alamat: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'pembeli',
        timestamps: false
    });

    module.exports = Pembeli;
