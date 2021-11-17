import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectGroupParticipants } from '../../selectors/users_selectors';

class GroupIndexBadge extends Component {
  render() {
    const { group } = this.props;
    
    return (
      <li>
       <ul>
         {
         this.props.participants.map(user => {
           return (
            <li key={user["_id"]}>{user.handle}</li>
            )
           })
         }
       </ul>
      </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  participants: selectGroupParticipants(state.entities.users.byId, ownProps.group.users)
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupIndexBadge)
