import { RECEIVE_GROUP } from "../actions/group_actions";
import { RECEIVE_ALL_PROBLEMS, RECEIVE_PROBLEM } from "../actions/problem_actions";

const _nullState = {
  byId: {},
  allIds: []
}

const problemsReducer = (oldState = _nullState, action) => {
    Object.freeze(oldState);
    let nextState = Object.assign({}, oldState);

    switch (action.type) {
        case RECEIVE_ALL_PROBLEMS:
            
            nextState.byId = action.problems.problemsById;
            nextState.allIds = action.problems.allProblemsId
            return nextState;
        case RECEIVE_PROBLEM:
            nextState[action.problem.id] = action.problem;
            return nextState;
        case RECEIVE_GROUP:
            
            nextState.byId[action.groupCollection.problemsById._id] = action.groupCollection.problemsById;
            nextState.allIds = nextState.allIds.concat(action.groupCollection.allProblemsId);
            return nextState;
        default:
            return oldState;
    }
};

export default problemsReducer;