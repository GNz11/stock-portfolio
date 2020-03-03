import React from 'react'
import {connect} from 'react-redux'
import {buyStockThunk, getPortfolioThunk} from '../store/portfolio'
import {me} from '../store/user'

class Portfolio extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getPortfolio()
  }

  handleSubmit(event) {
    event.preventDefault()
    const data = {
      code: event.target.code.value,
      quantity: event.target.quantity.value
    }
    this.props.buyStock(data)
    this.props.me()
  }

  render() {
    let {portfolio} = this.props.portfolio
    return (
      <div>
        <h3>Portfolio</h3>
        {portfolio &&
          portfolio.map(portfolio => (
            <div key={portfolio.code}>
              <p>
                {portfolio.code} - {portfolio.quantity} shares ${Number.parseFloat(
                  portfolio.quantity * portfolio.latestPrice
                ).toFixed(2)}
              </p>
              <hr />
            </div>
          ))}
        <div>
          <h3>
            Cash - ${Number.parseFloat(this.props.user.balance).toFixed(2)}
          </h3>
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
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    portfolio: state.portfolio
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolioThunk()),
    me: () => dispatch(me()),
    buyStock: data => dispatch(buyStockThunk(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
