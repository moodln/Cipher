import React from "react"
import { connect } from "react-redux"
import { inviteUserToGroup } from "../../actions/invite_actions";
import { fetchUsersToInvite } from "../../actions/user_actions";
import { selectUsersToInvite } from "../../selectors/users_selector";

class UserSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }

        this.updateQuery = this.updateQuery.bind(this);
        this.findAssociatedUsers = this.findAssociatedUsers.bind(this);
    }

    componentDidMount() {
        this.props.fetchUsersToInvite(this.props.participants)
    }


    inviteCollaborator(inviteeId) {
        this.props.inviteUser(inviteeId, this.props.groupId)
        this.setState({
            query: ''
        })
    }

    userPopUp(userHandle) {
        return (
            <div className='user-popup'>
                {userHandle}
            </div>
        )
    }

    updateQuery(e) {
        e.preventDefault();
        this.setState({
            query: e.currentTarget.value
        })
    }

    findAssociatedUsers(usersToInvite) {
        let filteredUsers = []
        this.props.associatedGroups.forEach(group => {
            group.users.forEach(user => {
                let associatedUser = usersToInvite.filter(invitee => invitee._id === user)
                if (associatedUser.length > 0) {
                    filteredUsers.push(associatedUser)
                }
            })
        })

        let flag = {};
        let associatedUsers = [];
        filteredUsers.forEach(user => {
            if (!flag[user[0]._id]) {
                flag[user[0]._id] = true;
                associatedUsers.push(user[0])
            }
        })

        return associatedUsers;
    }

    render() {
        if (this.props.usersToInvite.length === 0) return null;
        let associatedUsers = this.findAssociatedUsers(this.props.usersToInvite);
        let users = this.state.query === "" ? associatedUsers : this.props.usersToInvite;
        let message = users.length > associatedUsers.length ? "" : "Recent collaborators";

        return (
            <div>
            <div className="invite-search">
                <input type="text" 
                    placeholder="Search" 
                    value={this.state.query} 
                    onChange={this.updateQuery} />
            </div>
            <div className="user-search">
                <div className='collaborator-message'>
                    {message}
                </div>
                <ul className="user-search-dropdown">
                    
                    {
                        users.filter(user => {
                            let idx = (user.email.length - this.state.query.length) * -1
                            if (this.state.query === '') {
                                return user;
                            } else if (user.email.slice(0, idx).toLowerCase().includes(this.state.query.toLowerCase())) {
                                return user;
                            }
                        }).map(user => (
                            <li className="user-search-dropdown-item"
                                key={user["_id"]}
                                onClick={() => this.inviteCollaborator(user._id)}>
                                <span 
                                    onClick={() => this.userPopUp(user.handle)}>
                                    {user.email}
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    usersToInvite: selectUsersToInvite(
        Object.values(state.entities.users.byId),
        ownProps.participants,
        ownProps.invitedUsers
    ),
    associatedGroups: Object.values(state.entities.groups.byId)
});

const mapDispatchToProps = dispatch => ({
    fetchUsersToInvite: (usersInGroup) => dispatch(fetchUsersToInvite(usersInGroup)),
    inviteUser: (inviteeId, groupId) => dispatch(inviteUserToGroup(inviteeId, groupId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);