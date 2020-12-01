import * as actionType from './action';
import initialState from './store';

const themereducer = (state = initialState.theme, action) =>{
    switch(action.type){
        case actionType.SETPOLYGONDESIGN :
            return {...state, polygondesign : action.polygondesign};
        case actionType.SETTHEMENAME :
            return {...state, themename : action.themename};
        default:
            return state;
    }
};

export default themereducer;