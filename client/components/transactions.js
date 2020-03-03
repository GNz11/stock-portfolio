import React from 'react'
import {connect} from 'react-redux'
import {getTransactionsThunk} from '../store/transactions'

class Transactions extends React.Component {
  componentDidMount() {
    this.props.getTransactions()
  }

  render() {
    if (!this.props.transactions || !this.props.transactions.transactions) {
      return <div>No transactions at this time..</div>
    } else {
      return (
        <div>
          {this.props.transactions.transactions.map(transaction => (
            <div key={transaction.id}>
              <p>
                {transaction.code} - {transaction.quantity} shares @ ${Number.parseFloat(
                  transaction.price / transaction.quantity
                ).toFixed(2)}
              </p>
              <hr />
            </div>
          ))}
        </div>
      )
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    transactions: state.transactions
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getTransactions: () => dispatch(getTransactionsThunk())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
