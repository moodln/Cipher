import React from "react"
import { connect } from "react-redux"
import { fetchCurrentUserGroups } from "../../actions/group_actions";
import { selectGroupsWhereCurrentUserParticipant } from "../../selectors/groups_selector";
import GroupIndexBadgeContainer from "./group_index_badge";

class GroupIndex extends React.Component {
    componentDidMount() {
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
        }
        else {
            return (
                <section className="problem-index-problems-section">
                    <div className="problem-index-problems-list-div">
                        <div className="problem-index-problems-header-div">
                            <h1>Your Groups:</h1>
                        </div>
                        <div className="problem-index-problems-div">
                            <ul className="problem-index-problems-list">
                                {
                                    this.props.groups.map(group => (
                                        <GroupIndexBadgeContainer
                                            key={group["_id"]}
                                            group={group} />
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </section>
            );
        }
    }
}

const mapStateToProps = state => ({
    groups: selectGroupsWhereCurrentUserParticipant(
        Object.values(state.entities.groups.byId),
        state.session.user.id
    ),
    userIds: Object.values(state.entities.users.byId)
});


const mapDispatchToProps = dispatch => ({
    fetchUserGroups: () => dispatch(fetchCurrentUserGroups())
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupIndex);