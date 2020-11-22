import * as actionType from './action';
import initialState from './store';

const mapreducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.MAPSAVE:
            return { ...state, map: action.map };
        case actionType.MAPLOADED:
            return { ...state, maploaded: true };
        case actionType.ADDNEAR:
            return { ...state, nearlist : [...state.nearlist, {coordinates : action.coordinates, name : action.name, chatroom_id : action.chatroom_id}] };
        case actionType.RESETNEAR:
            return { ...state, nearlist : [] };
        default:
            return state;
    }
}

export default mapreducer;
