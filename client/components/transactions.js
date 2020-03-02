import React from 'react'
import {connect} from 'react-redux'
import {getTransactionsThunk} from '../store/transactions'

class Transactions extends React.Component {
  componentDidMount() {
    this.props.getTransactions()
  }

  render() {
    console.log('transaction props: ' + JSON.stringify(this.props.transactions))
    console.log('transaction props: ' + this.props.transaction)
    if (!this.props.transactions || !this.props.transactions.transactions) {
      return <div>No transactions at this time..</div>
    } else {
      console.log(
        'transactions: ' + JSON.stringify(this.props.transactions.transactions)
      )
      console.log(
        'transactions: ' + this.props.transactions.transactions.length
      )
      return (
        <div>
          {this.props.transactions.transactions.map(transaction => (
            <div key={transaction.id}>
              <p>
                {transaction.code} - {transaction.quantity} shares @ ${transaction.price /
                  transaction.quantity}
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
