import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserSearchContainer from '../user_search/user_search';

class InviteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchUserMode: false
    }
  }

  renderUserSearch() {
    return (
      <div>
        <UserSearchContainer 
          participants={this.props.participants}
          groupId={this.props.groupId}
          />
      </div>
    )
  }
  
  render() {
    const searchUserDisplay = this.state.searchUserMode ? this.renderUserSearch() : "";
    const buttonDisplay = this.state.searchUserMode ? "Close User Selector" : "Invite a Collaborator";
    return (
      <div>
        <button onClick={() => {this.setState({searchUserMode: !this.state.searchUserMode})} }>
          {buttonDisplay}
        </button>
        {searchUserDisplay}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteButton)
