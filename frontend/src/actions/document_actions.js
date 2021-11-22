import * as DocumentApiUtil from "../util/document_api_util";

export const RECEIVE_DOCUMENT = "RECEIVE_DOCUMENT";
export const REMOVE_DOCUMENT = "REMOVE_DOCUMENT";

const receiveDocument = (document, group, groupId) => ({
    type: RECEIVE_DOCUMENT,
    document,
    group,
    groupId
});

const removeDocument = documentId => ({
    type: REMOVE_DOCUMENT,
    documentId
});

export const fetchDocument = documentId => dispatch => {
    DocumentApiUtil.fetchDocument(documentId)
        .then(document => dispatch(receiveDocument(document)))
};

export const createDocument = document => dispatch => {
    DocumentApiUtil.createDocument(document)
        .then(document => dispatch(receiveDocument(document)))
};

export const deleteDocument = documentId => dispatch => {
    DocumentApiUtil.removeDocument(documentId)
        .then(document => dispatch(removeDocument(documentId)))
};

export const updateDocument = (document, newBody, groupId) => dispatch => {
    DocumentApiUtil.updateDocument(document, newBody, groupId)
        .then(documentResponse => {
            if (documentResponse.data.documentResult) {
                dispatch(receiveDocument(
                    documentResponse.data.documentResult,
                    documentResponse.data.groupResult,
                    groupId
                ))
            }
        })
};