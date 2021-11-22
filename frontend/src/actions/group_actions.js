import * as GroupsApiUtil from "../util/group_api_util";

export const RECEIVE_USER_GROUPS = "RECEIVE_USER_GROUPS";
export const RECEIVE_GROUP = "RECEIVE_GROUP";
export const RECEIVE_USER_GROUP = "RECEIVE_USER_GROUP";
export const RECEIVE_GROUP_AFTER_EXIT = "RECEIVE_GROUP_AFTER_EXIT";

export const receiveUserGroups = groupsCollection => ({
    type: RECEIVE_USER_GROUPS,
    groupsCollection
});

export const receiveGroup = groupCollection => ({
    type: RECEIVE_GROUP,
    groupCollection
});

export const receiveUserGroup = group => ({
    type: RECEIVE_USER_GROUP,
    group
});

export const receiveGroupAfterExit = group => ({
    type: RECEIVE_GROUP_AFTER_EXIT,
    group
});

export const fetchCurrentUserGroups = () => dispatch => {
    return GroupsApiUtil.fetchCurrentUserGroups()
        .then(groupsResponse => {

            return dispatch(receiveUserGroups(groupsResponse.data))
        })
}

export const createUserGroupWithProblem = problemId => dispatch => {
    return GroupsApiUtil.createGroupWithProblem(problemId)
    // .then(groupResponse => dispatch(receiveUserGroup(groupResponse.data)))
}

export const fetchGroup = (groupId) => dispatch => {
    return GroupsApiUtil.fetchGroup(groupId)
        .then(groupResponse => dispatch(receiveGroup(groupResponse.data)))
};

export const removeCurrentUserFromGroup = groupId => dispatch => {
    return GroupsApiUtil.removeCurrentUserFromGroup(groupId)
        .then(groupResponse => dispatch(receiveGroupAfterExit(groupResponse.data)))
};