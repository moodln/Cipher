import { RECEIVE_ALL_PROBLEMS, RECEIVE_PROBLEM } from "../actions/problem_actions";

const problemsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let nextState = Object.assign({}, oldState);

    switch (action.type) {
        case RECEIVE_ALL_PROBLEMS:
            nextState = action.problems;
            return nextState;
        case RECEIVE_PROBLEM:
            nextState[action.problem.id] = action.problem;
            return nextState;
        default:
            return oldState;
    }
};

export default problemsReducer;