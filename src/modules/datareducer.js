import * as actionType from './action';
import initialState from './store';

const datareducer = (state = initialState.data, action) =>{
    switch(action.type){
        case actionType.SETLOCATION : {
            return {...state, location : action.Geo};
        }
        case actionType.SETNEARLIST : {
            return {...state, nearlist : action.nearlist};
        }
        default:
            return state;
    }
};

export default datareducer;