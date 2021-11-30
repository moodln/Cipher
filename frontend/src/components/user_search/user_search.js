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
    }

    updateQuery(e) {
        e.preventDefault();
        this.setState({
            query: e.currentTarget.value
        })
        // console.log(this.state.query)
    }

    findAssociatedUsers(usersToInvite) {
        let filteredUsers = []
        this.props.associatedGroups.forEach(group => {
            // debugger
            group.users.forEach(user => {
                // debugger
                let associatedUser = usersToInvite.filter(invitee => invitee._id === user)
                if (associatedUser.length > 0) {
                    filteredUsers.push(associatedUser)
                }
                
                // debugger
            })
        })

        let flag = {};
        let associatedUsers = [];
        filteredUsers.forEach(user => {
            // debugger
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
        let users = this.state.query === '' ? associatedUsers : this.props.usersToInvite;
        let message = users.length > associatedUsers.length ? '' : 'recent collaborators';
        // console.log(users)
        // console.log(this.props.usersToInvite)

        return (
            <div>
            <div className='invite-search'>
                <input type="text" 
                    placeholder='search' 
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
                            // console.log(idx)
                            // console.log(user.email.slice(0, idx))
                            console.log('query', this.state.query)
                            if (this.state.query === '') {
                                // console.log(associatedUsers);
                                return user;
                            } else if (user.email.slice(0, idx).toLowerCase().includes(this.state.query.toLowerCase())) {
                                console.log(this.state.query)
                                console.log(user.email)
                                console.log('inside conditional')
                                return user;
                            }
                        }).map(user => (
                            <li className="user-search-dropdown-item"
                                key={user["_id"]}
                                onClick={() => this.inviteCollaborator(user._id)}>
                                {user.email}
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