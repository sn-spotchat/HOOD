import * as actionType from './action';
import initialState from './store';

const profilereducer = (state = initialState, action) =>{
    switch(action.type){
        case actionType.INSERTPROFILE:
            return {...state, profile : action.profile};
        case actionType.LOGGEDIN:
            return {...state, loggedin : true};
        case actionType.INSERTNICKNAME:
            return {...state, nickname : action.nickname};
        default:
            return state;
    }
};


export default profilereducer;