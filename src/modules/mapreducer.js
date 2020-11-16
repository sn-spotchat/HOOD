import * as actionType from './action';
import initialState from './store';

const mapreducer = (state = initialState, action)=>{
    switch(action.type){
        case actionType.MAPSAVE:
            return {...state, map : action.map};
        case actionType.MAPLOADED:
            return {...state, maploaded : true};
        default:
            return state;
    }
}

export default mapreducer;
        