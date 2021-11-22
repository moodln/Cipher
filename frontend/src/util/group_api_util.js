import axios from "axios";

export const fetchCurrentUserGroups = () => {
    return axios.get("/api/users/groups");
};

export const createGroupWithProblem = (problemId) => {
    return axios.post("/api/groups/", { headers: { problemId } });
};

export const removeCurrentUserFromGroup = (groupId) => {
    return axios.delete(`/api/users/${groupId}`);
};

export const fetchGroup = (groupId) => {
    return axios.get(`/api/groups/${groupId}`);
};