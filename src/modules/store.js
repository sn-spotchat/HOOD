import * as actionType from './action';

const initialState = {
    sidebarstate: "home",
    chatid: undefined,
    mypageselecterstate: 'login',
    loggedin: false,
    chatname: undefined,
    newchat: true,
    chatlist: [],
    map: undefined,
    maploaded: false,
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