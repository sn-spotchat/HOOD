import * as actionType from './action';

const initialState = {
    sidebarstate: "list",
    userinfo:{
        age: undefined,
        birthday: undefined,
        email: undefined,
        gender: undefined,
        id: "Guest",
        name: "Guest",
        nickname: undefined,
        profile_image: undefined
    },
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
        case actionType.SIDEBARTEST:
            return {...state, sidebarstate: "test"};
        default:
            return state;
    }
};

export default sidebarState;