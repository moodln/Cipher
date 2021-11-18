import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { selectGroupParticipants } from '../../selectors/users_selectors';

class GroupIndexBadge extends Component {
  constructor(props) {
    super(props);
    this.goToGroupShowPage = this.goToGroupShowPage.bind(this);
  }

  goToGroupShowPage() {
    this.props.history.push({ pathname: `/groups/${this.props.group._id}` })
  }

  render() {
    const { group } = this.props;

    return (
      <li className="problem-card">
        {
          this.props.participants.map(user => {
            return (
              <div key={user["_id"]} onClick={this.goToGroupShowPage}
              >
                <p className="problem-name">{user.handle}</p>
              </div>
            )
          })
        }
      </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  participants: selectGroupParticipants(state.entities.users.byId, ownProps.group.users)
})

const mapDispatchToProps = {

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupIndexBadge))
