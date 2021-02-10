const { Coin } = require('../models')
const { Op } = require('Sequelize')
const moment = require('moment')

module.exports = {

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
                attributes: [`mms_${range}`, 'timestamp'],
                where: { 
                    pair: pair, 
                    timestamp: { 
                        [Op.between]: [from, to]
                    }
                }
            });
            
            return res.status(200).json(results)

        } catch(err) {
            return res.status(400).json({
                status_code: 400,
                status_message: err.message
            })
        }
    }
}