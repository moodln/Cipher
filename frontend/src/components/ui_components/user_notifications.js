import React from "react"
import { connect } from "react-redux"
import { fetchCurrentUserInvites } from "../../actions/invite_actions";
import { selectCurrentUserInvites } from "../../selectors/invites_selector"
import UserInvitationsContainer from "./user_invitations";
import { socket } from "../../util/socket";

export class UserNotifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayUserInvites: false,
            notifications: undefined
        }
    }

    componentDidMount() {
        this.props.fetchUserInvites();
        socket.emit("newUser", this.props.currentUser.id)
        this.receiveSocket();
    }


    receiveSocket() {
        socket.on("receiveNotification", (data) => {
            this.setState({
                notifications: this.props.invites.push(data)
            })
        })
    }


    render() {
        if (!this.props.invites) {
            return null
        } else {
            if (this.state.notifications === undefined && this.props.invites !== []) {
                this.setState({
                    notifications: this.props.invites
                })
            }
        } 
        let color;
        this.props.invites.length === 0 ? color = '' : color = 'color';
        console.log('invites', this.props.invites)
        return (
            <div onClick={() => this.setState({ displayUserInvites: !this.state.displayUserInvites })}>
                <div className="notification-badge">
                    <div className={`notification-img ${color}`}> 
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="bi bi-bell"
                            viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                        </svg>
                    </div>
                    <div className="notification-dropdown">
                        <UserInvitationsContainer fetchInvites={this.props.fetchUserInvites} notifications={this.state.notifications} />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    invites: selectCurrentUserInvites(
            state.entities.invites.byId,
            state.session.user.id
    ),
    currentUser: state.session.user
})

const mapDispatchToProps = dispatch => ({
    fetchUserInvites: () => dispatch(fetchCurrentUserInvites())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNotifications);