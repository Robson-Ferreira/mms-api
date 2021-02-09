const axios = require('axios')
const moment = require('moment')
const Coin = require('../models/Coin')

const insertCandles = async (from, to) => {
    try {
        const now = 1612656000 //moment().unix(); 
        const lastDay = moment(new Date()).subtract(1, 'y').unix();

        const resultBtc = await consultMercadoBitcoin(lastDay, now, 'BRLBTC');
        
        const mms_20 = 20;
        const mms_50 = 50;
        const mms_200 = 200;
        
        let position_mms20 = 0;
        let position_mms50 = 0;
        let position_mms200 = 0;

        const data = resultBtc.data.candles.map((value, index) => {
            let result_mms20 = null;
            let result_mms50 = null;
            let result_mms200 = null;

            if (index >= mms_20 - 1) {
                result_mms20 = 0
                const ped_mms20 = resultBtc.data.candles.slice(position_mms20, index + 1)

                ped_mms20.forEach((obg) => {
                    result_mms20 += obg.close
                })

                result_mms20 = (result_mms20 / mms_20).toFixed(2)
                position_mms20 += 1;
            }

            if (index >= mms_50 - 1) {
                result_mms50 = 00
                const ped_mms50 = resultBtc.data.candles.slice(position_mms50, index + 1)

                ped_mms50.forEach((obg) => {
                    result_mms50 += obg.close
                })

                result_mms50 = (result_mms50 / mms_50).toFixed(2)
                position_mms50 += 1;
            }

            if (index >= mms_200 - 1) {
                result_mms50 = 0
                const ped_mms200 = resultBtc.data.candles.slice(position_mms200, index + 1)

                ped_mms200.forEach((obg) => {
                    result_mms200 += obg.close
                })

                result_mms200 = (result_mms200 / mms_200).toFixed(2)
                position_mms200 += 1;
            }
            
            return {
                price: value.close.toFixed(2),
                mms_20: result_mms20,
                mms_50: result_mms50,
                mms_200: result_mms200,
                timestap: value.timestamp
            }
        });

        console.log('=============================')
        console.log('ESSE É O RESULTADOOO')
        console.table(data)
        console.log('=============================')

        //const resultEth = await consultMercadoBitcoin(now, now, 'BRLETH')

    } catch(err) {
        console.log(err.message)
    }
}

const consultMercadoBitcoin = async (from, to, coin) => {
    try {
        const result = await axios.get(`https://mobile.mercadobitcoin.com.br/v4/${coin}/candle?from=${from}&to=${to}&precision=1d`)
        return result
    } catch(err) {
        throw err;
    }
}


insertCandles()


//module.exports = { insertCandles, consultMercadoBitcoin }