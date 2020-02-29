import React from 'react'
import {connect} from 'react-redux'

class Portfolio extends React.Component {
  componentDidMount() {
    this.props.getPortfolio(this.props.match.params.id)
  }
  render() {
    const {game} = this.props
    if (!game) {
      return (
        <div>
          <h1>Sorry But This Game Does Not Exist</h1>
        </div>
      )
    }
    return (
      <div className="container">
        <h3>{game.name}</h3>
        <img src={game.imageUrl} />
        <p>{`Price:$${game.price / 100}`}</p>
        <p>Description: {game.description}</p>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    game: state.game.game
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getPortfolio: id => dispatch(getPortfolio(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
