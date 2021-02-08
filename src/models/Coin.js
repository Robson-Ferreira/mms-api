const { Model, DataTypes } = require('sequelize')

class Coin extends Model {
    static init(sequelize) {
        super.init({
            pair: DataTypes.STRING,
            mms_20: DataTypes.INTEGER,
            mms_50: DataTypes.INTEGER,
            mms_200: DataTypes.INTEGER
        }, { sequelize })
    }
}

module.exports = Coin