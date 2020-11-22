import * as actionType from './action';
import product from "immer";

const initialState = {
    nickname: undefined,
    id: undefined,
    pw: undefined,

    profileimage : './profile.png',
    user_id: -1,
    sidebarstate: "home",
    chatid: undefined,
    mypageselecterstate: 'login',
    loggedin: false,
    chatname: undefined,
    newchat: true,
    nearlist: [],
    chatroomlist: [],
    map: undefined,
    maploaded: false,
    location : undefined,
    profile:{
        age: '',
        birthday: '',
        email: '',
        gender: '',
        id: "-1",
        name: "Guest",
        nickname: '',
        profile_image: ''
    },
}

export default initialState;