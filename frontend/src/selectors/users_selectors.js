export const selectGroupParticipants = (users, participantsId) => {
  let participants = [];
  participantsId.forEach(userId => {
    participants.push(users[userId])
  });
  return participants;
}

// ===============================================================================
// ===============================================================================

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

// "==============================================================================="
// "==============================================================================="

export const selectUsersToInvite = (users, participants, invitedUsers) => {
  let usersToInvite = [];
  
  Object.values(users).forEach(user => {
    if (!participants.includes(user._id) && !invitedUsers.includes(user._id)) {
      usersToInvite.push(user)
    }
  });
  
  return usersToInvite;
}