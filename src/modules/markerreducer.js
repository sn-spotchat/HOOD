import * as actionType from './action';
import initialState from './store';

const markerreducer = (state = initialState.marker, action) =>{
    switch(action.type){
        case actionType.SETMARKERX:
            return {...state, searchmarkerx : action.searchmarkerx};
        case actionType.SETMARKERY:
            return {...state, searchmarkery : action.searchmarkery};
        default:
            return state;
    }
};

//사용자 정보 관련 reducer를 따로 만들어야 하지만 일단 연습을 해야하기 때문에 siderbarState에 넣는다.

export default markerreducer;