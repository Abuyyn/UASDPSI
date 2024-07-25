const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Pembeli = require('./pembeli');
const Hewan = require('./hewan');
const User = require('./User');
const Penjual = require('./penjual');

const Pesanan = sequelize.define('Pesanan', {
    pesananID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tanggal: {
        type: DataTypes.DATE,
        allowNull: false
    },
    pembeliID: {
        type: DataTypes.INTEGER,
        references: {
            model: Pembeli,
            key: 'pembeliID'
        }
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
            key: 'ID'
        }
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'pesanan',
    timestamps: false
});

Pesanan.beforeCreate(async (pesanan, options) => {
    const hewan = await Hewan.findByPk(pesanan.hewanID);
    if (hewan) {
        pesanan.total = hewan.harga * pesanan.jumlah;
    } else {
        throw new Error('Hewan not found');
    }
});

module.exports = Pesanan;
