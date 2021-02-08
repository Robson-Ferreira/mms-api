const express = require('express')
const CoinController = require('./controllers/CoinController')

const routes = express.Router()

routes.get('/:pair/mms', CoinController.mms)

module.exports = routes