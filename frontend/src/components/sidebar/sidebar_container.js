import { connect } from "react-redux";
import { fetchAllProblems } from "../../actions/problem_actions";
import { createUserGroupWithProblem } from "../../actions/group_actions";
import { selectGroupsWhereCurrentUserParticipant } from '../../selectors/groups_selector';
import { fetchCurrentUserGroups } from '../../actions/group_actions';
import Sidebar from "./sidebar";

const mSTP = state => ({
        problems: Object.values(state.entities.problems.byId),
        currentUser: state.session.user,
        groups: selectGroupsWhereCurrentUserParticipant(
            Object.values(state.entities.groups.byId),
            state.session.user.id
        )
});

const mDTP = dispatch => ({
        fetchProblems: () => dispatch(fetchAllProblems()),
        createGroupWithProblem: (problemId) => (
            dispatch(createUserGroupWithProblem(problemId))
        ),
        fetchUserGroups: () => dispatch(fetchCurrentUserGroups())
});

export default connect(mSTP, mDTP)(Sidebar);