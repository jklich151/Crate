// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// allows us to talk between our component and our redux store
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import Button from '../../ui/button'
import ImageTile from '../../ui/image/Tile'
import Input from '../../ui/input/Input'
import H3 from '../../ui/typography/H3'
import Icon from '../../ui/icon'
import { level1 } from '../../ui/common/shadows'
import { white } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import userRoutes from '../../setup/routes/user'
import { messageShow, messageHide } from '../common/api/actions'
import { register } from './api/actions'
import AuthCheck from '../auth/AuthCheck'

// Component
class Signup extends Component {

  constructor(props) {
    super(props)

    this.state = {
      error: '',
      isLoading: false,
      user: {
        name: '',
        email: '',
        password: '',
      }
    }
  }


// when an input change is made, it immediately updates the state of the SignUp component
  onChange = (event) => {
    let user = this.state.user
    user[event.target.name] = event.target.value

    this.setState({
      user
    })
  }

// when the user completes the form, the app starts to load
// begins to save the user information
  onSubmit = (event) => {
    event.preventDefault()

    this.setState({
      isLoading: true
    })

// displays this message on the screen
    this.props.messageShow('Signing you up, please wait...')

    this.props.register(this.state.user)
      .then(response => {
        this.setState({
          isLoading: false
        })

        // Displays sign in errors if they exist, otherwise displays successful login message
        if (response.data.errors && response.data.errors.length > 0) {
          this.props.messageShow(response.data.errors[0].message)
        } else {
          this.props.messageShow('Signed up successfully.')

          this.props.history.push(userRoutes.login.path)
        }
      })

      // shows errors that get 'caught'
      .catch(error => {
        this.props.messageShow('There was some error signing you up. Please try again.')

        this.setState({
          isLoading: false,
          error: 'Error signing up.'
        })
      })
      .then(() => {
        window.setTimeout(() => {
          this.props.messageHide()
        }, 5000)
      })
  }

  // HTML rendered below here
  render() {
    return (
      <Grid gutter={true} alignCenter={true} style={{ padding: '2em' }}>
        {/* SEO */}
        <Helmet>
          <title>Create an account - Crate</title>
        </Helmet>

        {/* Left Content - Image Collage */}
        <GridCell>
          <Grid gutter={true} alignCenter={true}>
            <GridCell justifyCenter={true}>
              <ImageTile width={300} height={530} shadow={level1} image={`${ APP_URL }/images/stock/men/1.jpg`}/>
            </GridCell>

            <GridCell>
              <Grid>
                <GridCell justifyCenter={true}>
                  <ImageTile width={170} height={250} shadow={level1} image={`${ APP_URL }/images/stock/women/2.jpg`}/>
                </GridCell>
              </Grid>

              <Grid>
                <GridCell justifyCenter={true}>
                  <ImageTile width={170} height={250} shadow={level1} image={`${ APP_URL }/images/stock/women/3.jpg`}
                             style={{ marginTop: '1.9em' }}/>
                </GridCell>
              </Grid>
            </GridCell>
          </Grid>
        </GridCell>

        {/* Right Content */}
        <GridCell style={{ textAlign: 'center' }}>
          <H3 font="secondary" style={{ marginBottom: '1em' }}>Create an account</H3>

          {/* Signup Form */}
          <form onSubmit={this.onSubmit}>
            <div style={{ width: '25em', margin: '0 auto' }}>
              {/* Name */}
              <Input
                type="text"
                fullWidth={true}
                placeholder="Name"
                required="required"
                name="name"
                value={this.state.user.name}
                onChange={this.onChange}
              />

              {/* Email */}
              <Input
                type="email"
                fullWidth={true}
                placeholder="Email"
                required="required"
                name="email"
                value={this.state.user.email}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />

              {/* Password */}
              <Input
                type="password"
                fullWidth={true}
                placeholder="Password"
                required="required"
                name="password"
                value={this.state.user.password}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />
            </div>

            <div style={{ marginTop: '2em' }}>
              {/* Login link */}
              <Link to={userRoutes.login.path}>
                <Button type="button" style={{ marginRight: '0.5em' }}>Login</Button>
              </Link>

              {/* Form submit */}
              <Button type="submit" theme="secondary" disabled={this.state.isLoading}>
                Signup
                <Icon size={1.2} style={{ color: white }}>navigate_next</Icon>
              </Button>
            </div>
          </form>
        </GridCell>

        {/* Auth Check */}
        <AuthCheck/>
      </Grid>
    )
  }
}

// Component Properties
Signup.propTypes = {
  register: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// this allows the component to connect with the redux store
// { register, messageShow, messageHide } is coming from the actions file (line 22)
export default connect(null, { register, messageShow, messageHide })(withRouter(Signup))
