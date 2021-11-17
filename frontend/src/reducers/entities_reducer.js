import { combineReducers } from "redux";
import { GroupsReducer } from "./groups_reducer";
import { InvitesReducer } from "./invites_reducer";
import problemsReducer from "./problems_reducer";
import { UsersReducer } from "./users_reducer";

const entitiesReducer = combineReducers({
    problems: problemsReducer,
    groups: GroupsReducer,
    users: UsersReducer,
    invites: InvitesReducer
});

export default entitiesReducer;