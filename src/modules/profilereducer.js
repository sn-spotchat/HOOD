import * as actionType from './action';
import initialState from './store';

const profilereducer = (state = initialState, action) =>{
    switch(action.type){
        case actionType.INSERTPROFILE:
            console.log('inserted?\n');
            return {...state, profile : action.profile};
        default:
            return state;
    }
};


export default profilereducer;