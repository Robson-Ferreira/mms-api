const Coin = require('../models/Coin')
const {Sequelize, Op} = require('Sequelize')
const moment = require('moment')

module.exports = {
    async insertData(req, res) {
        const { pair, mms_20, mms_50, mms_200 } = req.body

        const data = await Coin.create({
            pair, mms_20, mms_50, mms_200
        })

        res.json(data)
    },

    async mms(req, res) {
        try {
            const { pair } = req.params
            let { from, to, range } = req.query

            if (!to) {
                to = moment().subtract(1, 'd').format("YYYY-MM-DD HH:mm:ss") //default 'to' date
            } else {
                to = moment(parseInt(to)).format("YYYY-MM-DD HH:mm:ss")
            }

            if (!from) {
                throw new Error("please enter a start date")
            }

            from = moment(parseInt(from)).format("YYYY-MM-DD HH:mm:ss")

            if (range != 20 && range != 50 && range != 200) {
                throw new Error("the range is not valid, supported: 20, 50 or 200")
            }

            const days = moment(new Date()).diff(from, 'days')

            if (days > 365) {
                throw new Error("the start date greater than 365 days")
            }

            const results = await Coin.findAll({ 
                where: { 
                    pair: pair, 
                    created_at: { 
                        [Op.between]: [from, to]
                    }
                }
            });

            if (results.length >= 3) {
                
            }
            
            return res.status(200).json(results)

        } catch(err) {
            return res.status(400).json({
                status_code: 400,
                status_message: err.message
            })
        }
    }
}