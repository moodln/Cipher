import axios from "axios";

export const fetchAllProblems = () => {
    return axios.get("/api/problems/");
};

export const fetchProblem = id => {
    return axios.get(`/api/problems/${id}`);
};