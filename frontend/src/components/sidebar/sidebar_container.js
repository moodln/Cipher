import { connect } from "react-redux";
import { fetchAllProblems } from "../../actions/problem_actions";
import Sidebar from "./sidebar";

const mSTP = state => {
    // debugger
    return {
        problems: state.entities.problems.data,
        // currentUser: state.session.user
    }
};

const mDTP = dispatch => {
    return {
        fetchProblems: () => dispatch(fetchAllProblems())
        // createGroupWithProblem: (problemId) => dispatch(createUserGroupWithProblem(problemId))
    }
};

export default connect(mSTP, mDTP)(Sidebar);