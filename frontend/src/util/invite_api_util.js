import axios from 'axios';

export const fetchCurrentUserInvites = () => {
  return axios.get('/api/users/invites');
};

export const inviteUserToGroup = (inviteeId, groupId) => {
  console.log(`inviteeId: `, inviteeId);
  return axios.post('/api/invites/', {headers: {inviteeId, groupId}});
}

export const inviteResolution = (inviteId, response) => {
  return axios.delete(`/api/invites/${inviteId}`, {headers: {response}});
}