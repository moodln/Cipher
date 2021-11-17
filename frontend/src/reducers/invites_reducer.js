import { RECEIVE_GROUP } from "../actions/group_actions";
import { RECIEVE_INVITE } from "../actions/invite_actions";


const _nullState = {
  byId: {},
  allIds: []
}

export const InvitesReducer = (state = _nullState, action) => {

  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {

    case RECIEVE_INVITE:
      nextState.allIds.push(action.invite._id)
      nextState.byId[action.invite._id] = action.invite
      return nextState;
      case RECEIVE_GROUP:
      console.log(`action: `, action);
      Object.values(action.groupCollection.invitesById).forEach(invite => {
        nextState.byId[invite._id] = invite;
        
      });
      nextState.allIds = nextState.allIds.concat(action.groupCollection.allInvitesId);
      return nextState;
    default:
      return state;
  }
};