import { RECEIVE_GROUP } from "../actions/group_actions";
import { RECEIVE_INVITE, RECEIVE_INVITES, REMOVE_INVITE } from "../actions/invite_actions";


const _nullState = {
  byId: {},
  allIds: []
}

export const InvitesReducer = (state = _nullState, action) => {

  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_INVITE:
      nextState.allIds.push(action.invite._id)
      nextState.byId[action.invite._id] = action.invite
      return nextState;

    case RECEIVE_GROUP:
      Object.values(action.groupCollection.invitesById).forEach(invite => {
        nextState.byId[invite._id] = invite;
        
      });
      nextState.allIds = nextState.allIds.concat(action.groupCollection.allInvitesId);
      return nextState;

    case RECEIVE_INVITES:
      Object.values(action.invitesCollection.invitesById).forEach(invite => {
        nextState.byId[invite._id] = invite;
        
      });
      nextState.allIds = nextState.allIds.concat(action.invitesCollection.allInvitesId);
      return nextState;
    case REMOVE_INVITE:
      delete nextState.byId[action.inviteId];
      nextState.allIds = Object.keys(nextState.byId);
      return nextState;
    default:
      return state;
  }
};