import { RECEIVE_DOCUMENT } from "../actions/document_actions";
import { RECEIVE_GROUP, RECEIVE_GROUP_AFTER_EXIT, RECEIVE_USER_GROUPS } from "../actions/group_actions";
import { RECEIVE_INVITES, REMOVE_INVITE } from "../actions/invite_actions";

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
      nextState.allIds = Object.keys(nextState.byId);
      return nextState;
    case RECEIVE_GROUP:
      
      nextState.byId[action.groupCollection.groupsById._id] = action.groupCollection.groupsById;
      nextState.allIds = Object.keys(nextState.byId);

      return nextState;

    case RECEIVE_DOCUMENT:
      nextState.byId[action.group._id] = action.group;
      nextState.allIds = Object.keys(nextState.byId);
      return nextState;

    case RECEIVE_INVITES:
      Object.values(action.invitesCollection.groupsById).forEach(group => {
        nextState.byId[group._id] = group;
        
      });
      nextState.allIds = Object.keys(nextState.byId);

      return nextState;
    case REMOVE_INVITE:
      if (action.resolutionCollection.groupsById) {
        Object.values(action.resolutionCollection.groupsById).forEach(group => {
        nextState.byId[group._id] = group;
        
      });
      nextState.allIds = Object.keys(nextState.byId);
    }
      return nextState;

    case RECEIVE_GROUP_AFTER_EXIT:
      if (action.group.groupResult) {
        delete nextState.byId[action.group.groupResult._id]

        nextState.byId[action.group.groupResult._id] = action.group.groupResult;
        
        return nextState;
      };
      if (action.group.deletedGroup) {
        delete nextState.byId[action.group.deletedGroup]
      }
      nextState.allIds = Object.keys(nextState.byId);
      
      return nextState;
    default:
      return state;
  }
};