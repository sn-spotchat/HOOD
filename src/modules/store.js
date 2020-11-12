import * as actionType from './action';

const initialState = {
    sidebarstate: "home",
    chatname: undefined,
    chatlist: [],
    profile:{
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

export default initialState;