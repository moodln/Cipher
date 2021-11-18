import React, { Component } from 'react'
import { connect } from 'react-redux'
import { inviteUserToGroup } from '../../actions/invite_actions';
import { fetchUsersToInvite } from '../../actions/user_actions';
import { selectUsersToInvite } from '../../selectors/users_selectors';

class UserSearch extends Component {

  componentDidMount() {
    this.props.fetchUsersToInvite(this.props.participants)
  }


  inviteCollaborator(inviteeId) {
    this.props.inviteUser(inviteeId, this.props.groupId)
  }

  render() {
    if(this.props.usersToInvite.length === 0){
      return (
      <div>
        Fetching users for you!
      </div>
    )
    }
    return (
      <div>
        <ul>
         {
         this.props.usersToInvite.map(user => {
           return (
            <li key={user["_id"]} 
            onClick={ () => this.inviteCollaborator(user._id) }
            >
              {user.email}
            </li>
            )
           })
         }
       </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  usersToInvite: selectUsersToInvite(Object.values(state.entities.users.byId), ownProps.participants, ownProps.invitedUsers)
})

const mapDispatchToProps = (dispatch) => ({
  fetchUsersToInvite: (usersInGroup) => dispatch(fetchUsersToInvite(usersInGroup)),
  inviteUser: (inviteeId, groupId) => dispatch(inviteUserToGroup(inviteeId, groupId))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch)
