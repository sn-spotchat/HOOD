import * as actionType from './action';
import initialState from './store';

const userreducer = (state = initialState.user, action) => {
    switch (action.type) {
        case actionType.SETUSER: 
            return {
                ...state,
                nickname: action.user.nickname,
                ID: action.user.ID,
                PW: action.user.PW,
                chatlist: action.user.chatlist,
                chatroomlist: action.user.chatroomlist,
                profile: action.user.profile
            };
        case actionType.SETKEY:
            return { ...state, key: action.key };
        case actionType.INSERTCHATROOM: {
            let obj = {};
            if (state.chatroomlist !== undefined) obj = state.chatroomlist;                            
            obj[action.chatroom] = {time : action.time};
            return {...state, chatroomlist : obj}
        };
        case actionType.REMOVECHATROOM: {
            let newstate = state;
            console.log(newstate);
            console.log(newstate.chatroomlist);
            delete newstate.chatroomlist[action.chatroom];
            console.log(action.chatroom);
            console.log(newstate);
            return newstate;
        }; 
        case actionType.SENDCHAT: {
            let newstate = state;
            if(state.chatlist === undefined){
                newstate.chatlist = [action.chat];
            }
            else{
                newstate.chatlist.push(action.chat);
            }
            return newstate;
        };
        default:
            return state;
    }
};

//사용자 정보 관련 reducer를 따로 만들어야 하지만 일단 연습을 해야하기 때문에 siderbarState에 넣는다.

export default userreducer;