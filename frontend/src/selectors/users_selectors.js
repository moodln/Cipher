export const selectGroupParticipants = (users, participantsId) => {
  let participants = [];
  participantsId.forEach(userId => {
    participants.push(users[userId])
  });
  return participants;
}