import React from "react"
import UserSearchContainer from "../user_search/user_search";

class InviteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchUserMode: false
        }
 
    }

    updateQuery(e) {
        e.preventDefault();
        this.setState({
            query: e.target.value
        })
    }

    renderUserSearch() {
        return (
            <div>
                <div>
                    <UserSearchContainer
                        participants={this.props.participants}
                        invitedUsers={this.props.invitedUsers}
                        groupId={this.props.groupId}
                        query={this.state.query} />
                </div>
            </div>
        );
    }

    render() {
        const buttonDisplay = this.state.searchUserMode ? "Close User Selector" : "Invite a Collaborator";
        const searchUserDisplay = this.state.searchUserMode ? this.renderUserSearch() : "";
        return (
            <div className="invite-button">
                <button onClick={() => { this.setState({ searchUserMode: !this.state.searchUserMode }) }}>
                    {buttonDisplay}
                </button>
                
                {searchUserDisplay}
                
            </div>
        )
    }
}

export default InviteButton;