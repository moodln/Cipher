import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCurrentUserGroups } from '../../actions/group_actions';
import { selectGroupsWhereCurrentUserParticipant } from '../../selectors/groups_selector';
import GroupIndexBadgeContainer from './group_index_badge';

class GroupIndex extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   groups: []
    // }
  }
  componentDidMount() {
    
    this.props.fetchUserGroups();
  }


  render() {
    if (this.props.groups.length === 0) {
      return (<div>You did not join any groups yet!</div>)
    } else {
      return (
        <div className="problem-index-problems-section">
          <div className="problem-index-problems-header-div">
            <h1>Groups:</h1>
          </div>
          <ul className="problem-index-problems-list">
            {
              this.props.groups.map(group => (
                <GroupIndexBadgeContainer key={group["_id"]} group={group} />
              ))
            }
          </ul>
        </div>
      );
    }
  }
}


const mapStateToProps = (state) => {

  return {
    groups: selectGroupsWhereCurrentUserParticipant(Object.values(state.entities.groups.byId), state.session.user.id),
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUserGroups: () => dispatch(fetchCurrentUserGroups())
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupIndex)
