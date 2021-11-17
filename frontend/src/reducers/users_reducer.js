import { RECEIVE_GROUP, RECEIVE_USER_GROUPS } from "../actions/group_actions";
import { RECEIVE_USERS_SEARCH } from "../actions/user_actions";

const _nullState = {
  byId: {},
  allIds: []
}

export const UsersReducer = (state = _nullState, action) => {

  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_USER_GROUPS:
      nextState.byId = action.groupsCollection.usersById;
      nextState.allIds = action.groupsCollection.allUsersId;
      return nextState;
    case RECEIVE_USERS_SEARCH:
      Object.values(action.usersCollection.usersById).forEach(user => {
        nextState.byId[user._id] = user;
        
      });
      nextState.allIds = nextState.allIds.concat(action.usersCollection.allUsersId);
      return nextState;
      
    case RECEIVE_GROUP:
      Object.values(action.groupCollection.usersById).forEach(user => {
        nextState.byId[user._id] = user;
        
      });
      nextState.allIds = nextState.allIds.concat(action.groupCollection.allUsersId);
      return nextState;
    default:
      return state;
  }
};