import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";
import { selectGroupParticipants } from "../../selectors/users_selector";

class GroupIndexBadge extends React.Component {
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
            <li className="problem-card" onClick={this.goToGroupShowPage}>
                <p className="problem-name">{group.title}</p>
                <p className="group-participants">Number of Participants:
                    <span> {group.users.length}</span>
                </p>
                <div className="problem-link-div">
                    <button className="problem-link">OPEN</button>
                </div>
            </li>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    participants: selectGroupParticipants(
        state.entities.users.byId,
        ownProps.group.users
    )
});

export default withRouter(connect(mapStateToProps)(GroupIndexBadge));