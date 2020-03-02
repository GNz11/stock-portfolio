import React from 'react'
import {connect} from 'react-redux'
import {buyStockThunk} from '../store/portfolio'

class Portfolio extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const data = {
      code: event.target.code.value,
      quantity: event.target.quantity.value
    }
    this.props.buyStock(data)
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h3>Cash - ${Number.parseFloat(this.props.user.balance).toFixed(2)}</h3>
        <form onSubmit={this.handleSubmit} name={name}>
          <div className="form-group">
            <input
              name="code"
              type="text"
              placeholder="Ticker"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              name="quantity"
              type="number"
              placeholder="Qty"
              className="form-control"
              required
            />
          </div>
          <div>
            <button className="btn btn-light btn-block" type="submit">
              Buy
            </button>
          </div>
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // getPortfolio: id => dispatch(getPortfolio(id))
    buyStock: data => dispatch(buyStockThunk(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
