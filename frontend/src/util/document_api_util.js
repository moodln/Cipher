import axios from "axios";

export const fetchDocument = id => {
    return axios.get(`/api/documents/${id}`);
};

export const createDocument = data => {
    return axios.post("/api/documents/", data);
};

export const updateDocument = (document, newBody, groupId) => {
    return axios.put(`/api/documents/${document._id}`, { newBody, groupId });
};

export const removeDocument = id => {
    return axios.delete(`/api/documents/${id}`);
};