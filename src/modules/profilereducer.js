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
        case actionType.SETUSERID:
            return {...state, user_id : action.userid};
        default:
            return state;
    }
};


export default profilereducer;