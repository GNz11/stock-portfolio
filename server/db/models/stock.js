const Sequelize = require('sequelize')
const db = require('../db')

const Stock = db.define('stock', {
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  }
})

module.exports = Stock
