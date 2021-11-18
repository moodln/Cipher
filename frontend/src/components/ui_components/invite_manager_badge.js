 import React, { Component } from 'react'
import { connect } from 'react-redux'
import { inviteResolution } from '../../actions/invite_actions'

class InviteManagerBadge extends Component {
  render() {
    return (
      <div className="notification-list">
        <div className="group-title">
          {this.props.group}
        </div>
        <div className="buttons">
          <div className='button-styling'>
            <button onClick={ () => this.props.acceptInvite(this.props.invite._id) }>
              Accept
            </button>
          </div>
          <div className='button-styling'>
            <button onClick={ () => this.props.declineInvite(this.props.invite._id) }>
              Decline
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  group: state.entities.groups.byId[ownProps.invite.group].title
})

const mapDispatchToProps = dispatch => ({
  acceptInvite: (inviteId) => dispatch(inviteResolution(inviteId, "true")),
  declineInvite: (inviteId) => dispatch(inviteResolution(inviteId, "false"))
})

export default connect(mapStateToProps, mapDispatchToProps)(InviteManagerBadge)
