import * as actionType from './action';

const initialState = {
    sidebarstate: "list",
}

const sidebarState = (state = initialState, action) =>{
    switch(action.type){
        case actionType.SIDEBARHOME:
            return {...state, sidebarstate: "home"};
        case actionType.SIDEBARMYPAGE:
            console.log('damn');
            return {...state, sidebarstate: "mypage"};
        case actionType.SIDEBARLIST:
            return {...state, sidebarstate: "list"};
        case actionType.SIDEBARCHAT:
            return {...state, sidebarstate: "chat"};
        case actionType.SIDEBARTEST:
            return {...state, sidebarstate: "test"};
        default:
            return state;
    }
};

export default sidebarState;