const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');
const Hewan = require('./hewan');
const DataPenjualan = require('./datapenjualan');
const Penjual = require('./penjual');

const Penjualan = sequelize.define('Penjualan', {
    penjualanID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tanggal: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    hewanID: {
        type: DataTypes.INTEGER,
        references: {
            model: Hewan,
            key: 'hewanID'
        }
    },
    penjualID: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'penjualan',
    timestamps: false,
    hooks: {
        afterCreate: async (penjualan, options) => {
            const hewan = await Hewan.findByPk(penjualan.hewanID);
            if (hewan) {
                await DataPenjualan.create({
                    hewanID: hewan.hewanID,
                    nama_hewan: hewan.jenis,
                    harga: hewan.harga,
                    jumlah: penjualan.jumlah,
                    total: hewan.harga * penjualan.jumlah
                });
            }
        }
    }
});

module.exports = Penjualan;
