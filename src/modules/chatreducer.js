import * as actionType from './action';
import initialState from './store';

const chatreducer = (state = initialState, action) =>{
    switch(action.type){
        case actionType.CHATNAME:
            return {...state, chatname: action.name};
        case actionType.INSERTCHAT:
            return {...state, chatlist: [...state.chatlist, {name:action.name}]};
        case actionType.REMOVECHAT:
            return {...state, chatlist: state.chatlist.filter((obj)=>{
                if(obj.name !== action.name){
                    return obj;
                }
            })};
        case actionType.NEWCHAT:
            return {...state, newchat: true};
        case actionType.OLDCHAT:
            return {...state, newchat: false};
        default:
            return state;
    }
};

//사용자 정보 관련 reducer를 따로 만들어야 하지만 일단 연습을 해야하기 때문에 siderbarState에 넣는다.

export default chatreducer;