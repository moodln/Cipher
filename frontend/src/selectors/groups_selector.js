export const selectGroupsWhereCurrentUserParticipant = (groups, currUserId) => {
  let selectedGroups = [];
  Object.values(groups).forEach(group => {
    if (group.users.includes(currUserId)) selectedGroups.push(group)
  });
  return selectedGroups;
}