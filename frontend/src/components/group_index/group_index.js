import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCurrentUserGroups } from '../../actions/group_actions';
import GroupIndexBadgeContainer from './group_index_badge';

class GroupIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
        groups: []
    }
  }
  componentDidMount() {
      this.props.fetchUserGroups();
  }

  // componentDidUpdate(newState) {
  //     this.setState({ groups: newState.groups });
  // }

  render() {
    if (this.props.groups.length === 0) {
      return (<div>You did not join any groups yet!</div>)
    } else {
      return (
        <div>
          <h2>Groups:</h2>
          <ul>
          {
            this.props.groups.map(group => (
              <GroupIndexBadgeContainer key={group["_id"]} group={group}/>
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
    groups: Object.values(state.entities.groups.byId),
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUserGroups: () => dispatch(fetchCurrentUserGroups())
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupIndex)
