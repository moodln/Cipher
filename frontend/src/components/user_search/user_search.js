import React from "react"
import { connect } from "react-redux"
import { inviteUserToGroup } from "../../actions/invite_actions";
import { fetchUsersToInvite } from "../../actions/user_actions";
import { selectUsersToInvite } from "../../selectors/users_selector";

class UserSearch extends React.Component {

    componentDidMount() {
        this.props.fetchUsersToInvite(this.props.participants)
    }


    inviteCollaborator(inviteeId) {
        this.props.inviteUser(inviteeId, this.props.groupId)
    }

    render() {
        if (this.props.usersToInvite.length === 0) return null;
        
        return (
            <div className="user-search">
                <ul className="user-search-dropdown">
                    {
                        this.props.usersToInvite.map(user => (
                            <li className="user-search-dropdown-item"
                                key={user["_id"]}
                                onClick={() => this.inviteCollaborator(user._id)}>
                                {user.email}
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    usersToInvite: selectUsersToInvite(
        Object.values(state.entities.users.byId),
        ownProps.participants,
        ownProps.invitedUsers
    )
});

const mapDispatchToProps = dispatch => ({
    fetchUsersToInvite: (usersInGroup) => dispatch(fetchUsersToInvite(usersInGroup)),
    inviteUser: (inviteeId, groupId) => dispatch(inviteUserToGroup(inviteeId, groupId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);