import { RECEIVE_GROUP, RECEIVE_USER_GROUPS } from "../actions/group_actions";
import { RECEIVE_INVITES } from "../actions/invite_actions";

const _nullState = {
  byId: {},
  allIds: []
}

export const GroupsReducer = (state = _nullState, action) => {

  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_USER_GROUPS:
      Object.values(action.groupsCollection.groupsById).forEach(group => {
        nextState.byId[group._id] = group;
        
      });
      nextState.allIds = nextState.allIds.concat(action.groupsCollection.allGroupsId);
      return nextState;
      // nextState.byId = action.groupsCollection.groupsById;
      // nextState.allIds = action.groupsCollection.allGroupsId;
      // return nextState;
    case RECEIVE_GROUP:
      
      nextState.byId[action.groupCollection.groupsById._id] = action.groupCollection.groupsById;
      nextState.allIds = nextState.allIds.concat(action.groupCollection.allGroupsId);
      return nextState;

    case RECEIVE_INVITES:
      Object.values(action.invitesCollection.groupsById).forEach(group => {
        nextState.byId[group._id] = group;
        
      });
      nextState.allIds = nextState.allIds.concat(action.invitesCollection.allGroupsId);
      return nextState;
    default:
      return state;
  }
};