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
        <section className="problem-index-problems-section">
          <div className="problem-index-problems-header-div">
            <h1>Your Groups:</h1>
          </div>
          <div className="problem-index-problems-div">
            <ul className="problem-index-problems-list">
              {
                this.props.groups.map(group => (
                  <GroupIndexBadgeContainer key={group["_id"]} group={group} />
                ))
              }
            </ul>
          </div>
        </section>
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
