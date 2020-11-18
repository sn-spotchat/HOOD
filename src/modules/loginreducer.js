import * as actionType from './action';
import initialState from './store';

const loginreducer = (state = initialState, action)=>{
    switch(action.type){
        case actionType.LOGINID:
            return {...state, id : action.id};
        case actionType.LOGINPW:
            return {...state, pw : action.pw};
        case actionType.LOGINUSERID:
            return {...state, user_id : action.user_id};
        default:
            return state;
    }
}

export default loginreducer;
        