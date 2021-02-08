const cron = require('node-cron');
const { insertCandles } = require('../commom/insertCandles')

const start = () => {
    cron.schedule('* * * * *', () => {
        insertCandles();
    });
}

module.exports = { start }