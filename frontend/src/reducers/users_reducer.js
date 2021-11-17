import { RECEIVE_USER_GROUPS } from "../actions/group_actions";

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
    default:
      return state;
  }
};