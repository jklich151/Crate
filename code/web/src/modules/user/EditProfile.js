import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { updateUser } from './api/actions'

class EditProfile extends Component {
  constructor(props) {
    super(props)
      this.state = {
        error: '',
        isLoading: false,
        user: {
          id: this.props.user.details.id,
          name: this.props.user.details.name,
          email: this.props.user.details.email,
          address: '',
          description: '',
        }
      }
  }

  onChange = (event) => {
    let user = this.state.user
    user[event.target.name] = event.target.value;

    this.setState({user});
  }

  onClick = (event) => {
    this.props.updateUser(this.state.user)
  }


  render() {
    return (
      <div>
      <input name="email" onChange={this.onChange} value={this.state.user.email} />
      <button onClick={this.onClick}>Save</button>
    </div>
    )
  }
}

const editProfileState = (state) => {
  return {
    user: state.user
  }
}

// export default connect(loginState, { login, messageShow, messageHide })(withRouter(Login))
export default connect(editProfileState, { updateUser } )(withRouter(EditProfile))