export const selectGroupParticipants = (users, participantsId) => {
  let participants = [];
  participantsId.forEach(userId => {
    participants.push(users[userId])
  });
  return participants;
}

export const selectUsersInvitedToGroup = (users, invitations, groupId) => {
  let invitedUsers = {
    byId: {},
    allIds: []
  };
  
  
  Object.values(invitations).forEach(invite => {
    if (invite.group === groupId && users[invite.invitee]) {
      
      invitedUsers.byId[users[invite.invitee]._id] = users[invite.invitee];
    }
  });
  invitedUsers.allIds = Object.keys(invitedUsers.byId)
  
  return invitedUsers;
}