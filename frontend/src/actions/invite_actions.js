import * as InviteApiUtil from "../util/invite_api_util"

export const RECIEVE_INVITE = 'RECIEVE_INVITE';

export const receiveInvite = (invite) => {
  return {
    type: RECIEVE_INVITE,
    invite
  }
}

export const inviteUserToGroup = (inviteeId, groupId) => dispatch => {
  return InviteApiUtil.inviteUserToGroup(inviteeId, groupId)
  .then( inviteResponse => {
    
    return dispatch(receiveInvite(inviteResponse.data))
  })
}

