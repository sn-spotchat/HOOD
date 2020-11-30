import * as actionType from './action';
import initialState from './store';

const statereducer = (state = initialState.state, action) => {
    switch (action.type) {
        case actionType.SETCHATROOM: 
            return { ...state, chatroom: action.chatroom };
        
        case actionType.SETCHATROOMNAME: 
            return { ...state, chatroomname: action.chatroomname };
        
        case actionType.SETSIDEBAR: 
            return { ...state, sidebarstate: action.sidebarstate };
        
        default:
            return state;
    }
};

export default statereducer;