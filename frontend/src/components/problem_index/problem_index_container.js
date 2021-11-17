import { connect } from "react-redux";
import { fetchAllProblems } from "../../actions/problem_actions";
import ProblemIndex from "./problem_index";

const mSTP = state => {
    // debugger
    return {
        problems: Object.values(state.entities.problems)
    }
};

const mDTP = dispatch => {
    return {
        fetchProblems: () => dispatch(fetchAllProblems())
    }
};

export default connect(mSTP, mDTP)(ProblemIndex);