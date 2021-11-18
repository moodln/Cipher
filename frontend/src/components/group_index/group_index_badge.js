import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { selectGroupParticipants } from '../../selectors/users_selectors';

class GroupIndexBadge extends Component {
  constructor(props) {
    super(props);
    this.goToGroupShowPage = this.goToGroupShowPage.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {

  //   // Typical usage (don't forget to compare props):
  //   if (this.props.participants.length !== prevProps.participants.length) {
  //     console.log('list changed ');
      
  //   }
  // }

  goToGroupShowPage() {
    this.props.history.push({ pathname: `/groups/${this.props.group._id}` })
  }

  render() {
    const { group } = this.props;

    return (
      <li className="problem-card" onClick={this.goToGroupShowPage}>
       {group.title}
      </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  participants: selectGroupParticipants(state.entities.users.byId, ownProps.group.users)
})

const mapDispatchToProps = {

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupIndexBadge));