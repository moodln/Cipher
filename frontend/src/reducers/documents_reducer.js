import { RECEIVE_DOCUMENT, REMOVE_DOCUMENT } from "../actions/document_actions";

const _nullState = {
  byId: {},
  allIds: []
}

const DocumentsReducer = (oldState = _nullState, action) => {
    Object.freeze(oldState);
    const nextState = Object.assign({}, oldState);

    switch (action.type) {
        case RECEIVE_DOCUMENT:
            nextState.byId[action.document.id] = action.document;
            nextState.allIds = Object.keys(nextState.byId);
            return nextState;
        case REMOVE_DOCUMENT:
            delete nextState.byId[action.documentId];
            nextState.allIds = Object.keys(nextState.byId);
            return nextState;
        case RECEIVE_GROUP_AFTER_EXIT:
            if (action.group.groupResult) {
                
                nextState.byId[action.group.groupResult._id] = action.group.groupResult;
                
            };
            if (action.group.deletedGroup) {
                delete nextState.byId[action.group.deletedGroup]
            }
            nextState.allIds = Object.keys(nextState.byId);
            
            return nextState;
        default:
            return oldState;
    }
};

export default DocumentsReducer;