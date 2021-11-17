import * as GroupsApiUtil from "../util/group_api_util";

export const RECEIVE_USER_GROUPS = 'RECEIVE_USER_GROUPS';
export const RECEIVE_USER_GROUP = 'RECEIVE_USER_GROUP';

export const receiveUserGroups = (groupsCollection) => {
  return {
    type: RECEIVE_USER_GROUPS,
    groupsCollection
  }
}

export const receiveUserGroup = (group) => {
  return {
    type: RECEIVE_USER_GROUP,
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
    .then(groupResponse => dispatch(receiveUserGroup(groupResponse)))
}


