export const selectCurrentUserInvites = (invites, currentUserId) => {
    let selectedInvites = [];
    Object.values(invites).forEach(invite => {
        if (invite.invitee === currentUserId) selectedInvites.push(invite)
    });
    return selectedInvites;
};