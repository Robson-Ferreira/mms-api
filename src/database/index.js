const Sequelize = require('Sequelize')
const dbConfig = require('../config/database')

const Coin = require('../models/Coin')

const connection = new Sequelize(dbConfig)

Coin.init(connection)

try {
    connection.authenticate()
    console.log('Connection successfully made to the database.')
} catch (err) {
    console.error('Unable to connect to the database:', error)
}

module.exports = connection

