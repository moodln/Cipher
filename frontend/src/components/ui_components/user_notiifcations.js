import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserInvitationsContainer from './user_invitations';

export class UserNotiifcations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayUserInvites: false
    }
  }
  
  

  render() {
    const displayListOfNotifications = this.state.displayUserInvites ? <UserInvitationsContainer /> : ""
    return (
      <div onClick={ () => this.setState({displayUserInvites: !this.state.displayUserInvites}) }>
        Will display notifications here
        {displayListOfNotifications}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNotiifcations)
