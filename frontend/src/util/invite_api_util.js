import axios from 'axios';

export const fetchCurrentUserInvites = () => {
  return axios.get('/api/users/invites');
};

export const inviteUserToGroup = (inviteeId, groupId) => {
  return axios.post('/api/users/invites', {headers: {inviteeId, groupId}});
}

export const inviteResolution = (inviteId, response) => {
  return axios.post('/api/users/invites', {headers: {inviteId, response}});
}