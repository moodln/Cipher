import { connect } from "react-redux";
// import { fetchProblems } from "../../actions/problem_actions";
import ProblemIndex from "./problem_index";

const mSTP = state => {
    return {
        // problems: Object.values(state.problems.all)
    }
};

const mDTP = dispatch => {
    return {
        // fetchProblems: () => dispatch(fetchProblems())
    }
};

export default connect(mSTP, mDTP)(ProblemIndex);