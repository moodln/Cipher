import { RECEIVE_USER_GROUPS } from "../actions/group_actions";

const _nullState = {
  byId: {},
  allIds: []
}

export const GroupsReducer = (state = _nullState, action) => {

  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_USER_GROUPS:
      nextState.byId = action.groupsCollection.groupsById;
      nextState.allIds = action.groupsCollection.allGroupsId;
      return nextState;
    default:
      return state;
  }
};