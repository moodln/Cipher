import * as GroupsApiUtil from "../util/group_api_util";

export const RECEIVE_USER_GROUPS = 'RECEIVE_USER_GROUPS';

export const receiveUserGroups = (groupsCollection) => {
  return {
    type: RECEIVE_USER_GROUPS,
    groupsCollection
  }
}

export const fetchCurrentUserGroups = () => dispatch => {
  return GroupsApiUtil.fetchCurrentUserGroups()
  .then( groupsResponse => {
    
    return dispatch(receiveUserGroups(groupsResponse.data))
  })
}

