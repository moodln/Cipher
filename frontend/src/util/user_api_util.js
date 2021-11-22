import axios from "axios";

export const fetchUsersToInvite = (usersInGroup) => {
    return axios.get(
        "/api/users/invite_user_search",
        { headers: { usersInGroup }
    });
};