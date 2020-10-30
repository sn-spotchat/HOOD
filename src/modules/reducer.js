import * as actionType from './action';

const initialState = {
    sidebarstate: "list",
}

const sidebarState = (state = initialState, action) =>{
    switch(action.type){
        case actionType.SIDEBARHOME:
            return {...state, sidebarstate: "home"};
        case actionType.SIDEBARLOGIN:
            return {...state, sidebarstate: "login"};
        case actionType.SIDEBARLIST:
            return {...state, sidebarstate: "list"};
        case actionType.SIDEBARCHAT:
            return {...state, sidebarstate: "chat"};
        default:
            return state;
    }
};

export default sidebarState;