const axios = require('axios')
const router = require('express').Router()
const {Stock} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const stocks = await Stock.findAll({where: {userId: userId}})
    const pStock = stocks.map(async stock => {
      const tickerLookupURL = `https://cloud.iexapis.com/stable/stock/${
        stock.code
      }/quote?token=${process.env.IEX_TOKEN}`
      const stockData = await axios.get(tickerLookupURL)
      return {
        code: stock.code,
        quantity: stock.quantity,
        latestPrice: stockData.data.latestPrice,
        previousClose: stockData.data.previousClose
      }
    })
    const stocksWithTicker = await Promise.all(pStock)
    res.json(stocksWithTicker)
  } catch (error) {
    next(error)
  }
})
