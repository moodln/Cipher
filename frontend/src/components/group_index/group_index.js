import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCurrentUserGroups } from '../../actions/group_actions';
import { selectGroupsWhereCurrentUserParticipant } from '../../selectors/groups_selector';
import GroupIndexBadgeContainer from './group_index_badge';

class GroupIndex extends Component {
  constructor(props) {
    super(props);


  }
  componentDidMount() {
    console.log('mounting!!');
    
    this.props.fetchUserGroups();
  }


  render() {
    if (this.props.groups.length === 0) {
      return (
        <section className="problem-index-problems-section">
          <div className="problem-index-problems-list-div">
            <div className="problem-index-problems-header-div">
              <h1>You have not joined or created any groups yet!</h1>
            </div>
          </div>
        </section>
      )
    } else {
      return (
        <section className="problem-index-problems-section">
          <div className="problem-index-problems-list-div">
            <div className="problem-index-problems-header-div">
              <h1>Your Groups:</h1>
            </div>
            <div className="problem-index-problems-div">
              <ul className="problem-index-problems-list">
                {
                  this.props.groups.map(group => {
                    return (
                      <GroupIndexBadgeContainer key={group["_id"]} group={group} />
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </section>
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
