import { combineReducers } from "redux";
import problemsReducer from "./problems_reducer";

const entitiesReducer = combineReducers({
    problems: problemsReducer
});

export default entitiesReducer;