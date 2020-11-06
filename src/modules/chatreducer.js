import * as actionType from './action';
import initialState from './store';

const chatreducer = (state = initialState, action) =>{
    switch(action.type){
        case actionType.CHATNAME:
            console.log(action.name);
            return {...state, chatname: action.name};
        default:
            return state;
    }
};

//사용자 정보 관련 reducer를 따로 만들어야 하지만 일단 연습을 해야하기 때문에 siderbarState에 넣는다.

export default chatreducer;