import * as actionType from './action';
import initialState from './store';

const flagreducer = (state = initialState.flag, action) =>{
    switch(action.type){
        case actionType.LOCATIONLOADED:
            return {...state, locationloaded : true};
        case actionType.NEARLISTLOADED:
            return {...state, nearlistloaded : true};
        case actionType.LOGGEDIN:
            return {...state, loggedin : true};
        default:
            return state;
    }
};

//사용자 정보 관련 reducer를 따로 만들어야 하지만 일단 연습을 해야하기 때문에 siderbarState에 넣는다.

export default flagreducer;