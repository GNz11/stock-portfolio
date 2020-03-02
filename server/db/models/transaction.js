const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
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
  },
  type: {
    type: Sequelize.ENUM('BUY', 'SELL')
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
})

module.exports = Transaction
