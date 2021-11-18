import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchGroup, removeCurrentUserFromGroup } from '../../actions/group_actions';
import { selectGroupParticipants, selectUsersInvitedToGroup } from '../../selectors/users_selectors';


import InviteButtonContainer from '../ui_components/invite_button'

class GroupShow extends Component {
  constructor(props) {
    super(props);
    this.exitFromGroupAndGoToProblemsPage = this.exitFromGroupAndGoToProblemsPage.bind(this);
  }
  

  componentDidMount() {
    
    this.props.fetchGroup(this.props.match.params.groupId)
  }

  exitFromGroupAndGoToProblemsPage(e) {
    e.preventDefault();
    this.props.exitFromGroup(this.props.match.params.groupId)
    this.props.history.push("/problems");
  }
  
  render() {
    if (!this.props.group) return null;
    if (!this.props.problem) return null;
    const {group, problem} = this.props;
    return (
      <div>
        <button onClick={this.exitFromGroupAndGoToProblemsPage}>
          Exit from Group
        </button>
        <InviteButtonContainer groupId={this.props.group._id} participants={group.users} invitedUsers={this.props.invitedUsers.allIds}/>
        <h1>{this.props.problem.body}</h1>
        <h1>Participants:</h1>
        <ul>
         {
         this.props.participants.map(user => {
          return (
            <li key={user["_id"]}>
              {user.email}
            </li>
          )
        })
        }
       </ul>
       <h1>Invited Users:</h1>
       <ul>
         {
         Object.values(this.props.invitedUsers.byId).map(user => {
          return (
            <li key={user["_id"]} 
            
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

const mapStateToProps = (state, ownProps) => {
  const groupId = ownProps.match.params.groupId;
  if (Object.values(state.entities.groups.byId).length === 0) return {};
  if (Object.values(state.entities.problems.byId).length === 0) return {};
  // console.log(`state.entities.groups.byId: `, state.entities.groups.byId[groupId].document.problem);
  
  const problemId = state.entities.groups.byId[groupId].document.problem;
  return {
  group: state.entities.groups.byId[groupId],
  problem: state.entities.problems.byId[problemId],
  participants: selectGroupParticipants(state.entities.users.byId, state.entities.groups.byId[groupId].users),
  invitedUsers: selectUsersInvitedToGroup(state.entities.users.byId, state.entities.invites.byId, groupId)
}}

const mapDispatchToProps = (dispatch) => ({
  fetchGroup: (groupId) => dispatch(fetchGroup(groupId)),
  exitFromGroup: (groupId) => dispatch(removeCurrentUserFromGroup(groupId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupShow))
