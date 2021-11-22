import * as UserApiUtil from "../util/user_api_util";

export const RECEIVE_USERS_SEARCH = "RECEIVE_USERS_SEARCH";

export const receiveUsersSearch = usersCollection => ({
    type: RECEIVE_USERS_SEARCH,
    usersCollection
});

export const fetchUsersToInvite = usersInGroup => dispatch => {
    return UserApiUtil.fetchUsersToInvite(usersInGroup)
        .then(usersResponse => dispatch(receiveUsersSearch(usersResponse.data)))
};