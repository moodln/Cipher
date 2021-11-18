import React, { Component } from 'react'
import { connect } from 'react-redux'
import { inviteResolution } from '../../actions/invite_actions'

class InviteManagerBadge extends Component {
  render() {
    return (
      <div>
        {this.props.group}
        <button onClick={ () => this.props.acceptInvite(this.props.invite._id) }>
          Accept
        </button>
        <button onClick={ () => this.props.declineInvite(this.props.invite._id) }>
          Decline
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  group: state.entities.groups.byId[ownProps.invite.group]._id
})

const mapDispatchToProps = dispatch => ({
  acceptInvite: (inviteId) => dispatch(inviteResolution(inviteId, "true")),
  declineInvite: (inviteId) => dispatch(inviteResolution(inviteId, "false"))
})

export default connect(mapStateToProps, mapDispatchToProps)(InviteManagerBadge)
