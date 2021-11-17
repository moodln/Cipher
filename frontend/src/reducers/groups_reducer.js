import { RECEIVE_GROUP, RECEIVE_USER_GROUPS } from "../actions/group_actions";

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
    case RECEIVE_GROUP:
      
      nextState.byId[action.groupCollection.groupsById._id] = action.groupCollection.groupsById;
      nextState.allIds = nextState.allIds.concat(action.groupCollection.allGroupsId);
      return nextState;
    default:
      return state;
  }
};