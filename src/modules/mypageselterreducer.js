import * as actionType from './action';
import initialState from './store';

const mypageselecterState = (state = initialState, action) =>{
    switch(action.type){
        case actionType.MYPAGESELECTERLOGIN:
            return {...state, mypagestate: 'login'};
        case actionType.MYPAGESELECTERSIGNIN:
            return {...state, mypagestate: 'signin'};
        case actionType.MYPAGESELECTERMYPAGE:
            return {...state, mypagestate: 'mypage'};
        default:
            return state;
    }
};

export default mypageselecterState;