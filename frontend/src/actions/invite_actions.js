import * as InviteApiUtil from "../util/invite_api_util"

export const RECEIVE_INVITE = "RECEIVE_INVITE";
export const RECEIVE_INVITES = "RECEIVE_INVITES";
export const REMOVE_INVITE = "REMOVE_INVITE";

export const receiveInvite = invite => ({
    type: RECEIVE_INVITE,
    invite
});

export const receiveInvites = invitesCollection => ({
    type: RECEIVE_INVITES,
    invitesCollection
});

export const removeInvite = (inviteId, resolutionCollection) => ({
    type: REMOVE_INVITE,
    inviteId,
    resolutionCollection
});

export const inviteUserToGroup = (inviteeId, groupId) => dispatch => {
    return InviteApiUtil.inviteUserToGroup(inviteeId, groupId)
        .then(inviteResponse => dispatch(receiveInvite(inviteResponse.data)))
};

export const fetchCurrentUserInvites = () => dispatch => {
    return InviteApiUtil.fetchCurrentUserInvites()
        .then(invitesResponse => dispatch(receiveInvites(invitesResponse.data)))
};

export const inviteResolution = (inviteId, response) => dispatch => {
    return InviteApiUtil.inviteResolution(inviteId, response)
        .then(resolutionResponse => {
            return dispatch(removeInvite(inviteId, resolutionResponse.data));
        })
};