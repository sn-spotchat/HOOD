import * as actionType from './action';
import initialState from './store';

const profilereducer = (state = initialState, action) =>{
    switch(action.type){
        case actionType.INSERTPROFILE:
            return {...state, profile : action.profile};
        case actionType.LOGGEDIN:
            return {...state, loggedin : true};
        default:
            return state;
    }
};


export default profilereducer;