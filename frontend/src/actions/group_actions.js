import * as GroupsApiUtil from "../util/group_api_util";

export const RECEIVE_USER_GROUPS = 'RECEIVE_USER_GROUPS';
export const RECEIVE_GROUP = 'RECEIVE_GROUP';
export const RECEIVE_USER_GROUP = 'RECEIVE_USER_GROUP';
export const RECEIVE_GROUP_AFTER_EXIT = 'RECEIVE_GROUP_AFTER_EXIT';

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

export const receiveUserGroup = (group) => {
  return {
    type: RECEIVE_USER_GROUP,
    group
  }
}

export const receiveGroupAfterExit = (group) => {
  return {
    type: RECEIVE_GROUP_AFTER_EXIT,
    group
  }
}

export const fetchCurrentUserGroups = () => dispatch => {
  return GroupsApiUtil.fetchCurrentUserGroups()
    .then(groupsResponse => {

      return dispatch(receiveUserGroups(groupsResponse.data))
    })
}

export const createUserGroupWithProblem = (problemId) => dispatch => {
  return GroupsApiUtil.createGroupWithProblem(problemId)
    // .then(groupResponse => dispatch(receiveUserGroup(groupResponse.data)))
}

export const fetchGroup = (groupId) => dispatch => {
  return GroupsApiUtil.fetchGroup(groupId)
  .then( groupResponse => {
    
    return dispatch(receiveGroup(groupResponse.data))
  })
}

export const removeCurrentUserFromGroup = (groupId) => dispatch => {
  return GroupsApiUtil.removeCurrentUserFromGroup(groupId)
  .then( groupResponse => {
    console.log(`groupResponse: `, groupResponse);
    
    return dispatch(receiveGroupAfterExit(groupResponse.data))
  })
}

