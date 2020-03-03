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
      code: event.target.code.value.toUpperCase(),
      quantity: event.target.quantity.value
    }
    this.props.buyStock(data)
  }

  render() {
    let {portfolio} = this.props.portfolio
    let portfolioWorth = 0
    if (portfolio && portfolio.length && portfolio.length > 0) {
      for (let i = 0; i < portfolio.length; i++) {
        portfolioWorth += portfolio[i].latestPrice * portfolio[i].quantity
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h3>Portfolio - ${Number.parseFloat(portfolioWorth).toFixed(2)}</h3>
            {portfolio &&
              portfolio.map(stock => (
                <div
                  key={stock.code}
                  className={
                    'alert alert-' +
                    (stock.latestPrice >= stock.previousClose
                      ? 'success'
                      : 'danger')
                  }
                  role="alert"
                >
                  <p>
                    {stock.code} - {stock.quantity} shares ${Number.parseFloat(
                      stock.quantity * stock.latestPrice
                    ).toFixed(2)}
                  </p>
                  <hr />
                </div>
              ))}
          </div>
          <div className="col-md-4">
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
