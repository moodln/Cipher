import { combineReducers } from "redux";
import GroupsReducer from "./groups_reducer";
import InvitesReducer from "./invites_reducer";
import ProblemsReducer from "./problems_reducer";
import UsersReducer from "./users_reducer";
import DocumentsReducer from "./documents_reducer";

const EntitiesReducer = combineReducers({
    problems: ProblemsReducer,
    groups: GroupsReducer,
    users: UsersReducer,
    invites: InvitesReducer,
    documents: DocumentsReducer
});

export default EntitiesReducer;