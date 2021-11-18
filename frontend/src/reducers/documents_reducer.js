import { RECEIVE_DOCUMENT, REMOVE_DOCUMENT } from "../actions/document_actions";

const DocumentsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    const nextState = Object.assign({}, oldState);

    switch (action.type) {
        case RECEIVE_DOCUMENT:
            nextState[action.document.id] = action.document;
            return nextState;
        case REMOVE_DOCUMENT:
            delete nextState[action.documentId];
            return nextState;
        default:
            return oldState;
    }
};

export default DocumentsReducer;