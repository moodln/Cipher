import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCurrentUserInvites } from '../../actions/invite_actions'
import { selectCurrentUserInvites } from '../../selectors/invites_selector';
import InviteManagerBadgeContainer from './invite_manager_badge';

class UserInvitations extends Component {



  render() {
    const numberOfInvites = this.props.invites.length > 1 ? 
    <p>You have {this.props.invites.length} pending invites!</p> : 
    <p>You have {this.props.invites.length} pending invite!</p>
    if (this.props.invites.length === 0) {
      return (
        <div className='no-notifications-message'>
          <p>You do not have any notifications yet!</p>
        </div>
      )
    }
    return (
      <div>
        {numberOfInvites}
        <ul>
          {
            this.props.invites.map(invite => (
              <InviteManagerBadgeContainer key={invite._id} invite={invite} />
            ))
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  invites: selectCurrentUserInvites(state.entities.invites.byId, state.session.user.id)
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInvitations)
