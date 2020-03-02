const axios = require('axios')
const router = require('express').Router()
const db = require('../db')
const {Transaction, Stock, User} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const {code, quantity} = req.body
    const user = await User.findByPk(userId)

    const tickerLookupURL = `https://cloud.iexapis.com/stable/stock/${
      req.body.code
    }/quote?token=${process.env.IEX_TOKEN}`
    const stockData = await axios.get(tickerLookupURL)

    const latestPrice = stockData.data.latestPrice
    const price = latestPrice * quantity
    const balance = user.balance

    if (!price || price > balance) {
      return res.status(500).send('Not enough balance')
    }

    await db.transaction(async t => {
      // only supports BUY transactions at the moment
      await Transaction.create(
        {
          userId: user.id,
          type: 'BUY',
          code: code,
          quantity: quantity,
          price: price
        },
        {transaction: t}
      )

      const stock = await Stock.findOne({
        where: {
          userId: user.id,
          code: code
        }
      })

      if (stock) {
        const prevQuantity = stock.quantity
        const newQuantity = prevQuantity + quantity
        await Stock.update(
          {quantity: newQuantity},
          {
            where: {
              userId: user.id,
              code: code
            }
          }
        )
      } else {
        await Stock.create({userId: user.id, code: code, quantity: quantity})
      }
      await user.update({
        balance: balance - price
      })
    })
    res.status(201).send('transaction complete')
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const transactions = await Transaction.findAll({where: {userId: userId}})
    console.log('transactions: ' + transactions)
    res.json(transactions)
  } catch (error) {
    next(error)
  }
})
