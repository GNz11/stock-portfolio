import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="box">
      <h2>{displayName}</h2>
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' && (
          <div className="form-group">
            <input
              name="userName"
              type="text"
              placeholder="name"
              className="form-control"
              required
            />
          </div>
        )}
        <div className="form-group">
          <input
            name="email"
            type="text"
            placeholder="email"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            name="password"
            type="password"
            placeholder="password"
            className="form-control"
            required
          />
        </div>
        <div>
          <button className="btn btn-light btn-block" type="submit">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const name = evt.target.userName ? evt.target.userName.value : ''
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(name, email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
