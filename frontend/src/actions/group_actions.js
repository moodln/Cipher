import * as GroupsApiUtil from "../util/group_api_util";

export const RECEIVE_USER_GROUPS = 'RECEIVE_USER_GROUPS';
export const RECEIVE_GROUP = 'RECEIVE_GROUP';

export const receiveUserGroups = (groupsCollection) => {
  return {
    type: RECEIVE_USER_GROUPS,
    groupsCollection
  }
}

export const receiveGroup = (groupCollection) => {
  return {
    type: RECEIVE_GROUP,
    groupCollection
  }
}

export const fetchCurrentUserGroups = () => dispatch => {
  return GroupsApiUtil.fetchCurrentUserGroups()
  .then( groupsResponse => {
    
    return dispatch(receiveUserGroups(groupsResponse.data))
  })
}

export const fetchGroup = (groupId) => dispatch => {
  return GroupsApiUtil.fetchGroup(groupId)
  .then( groupResponse => {
    
    return dispatch(receiveGroup(groupResponse.data))
  })
}

