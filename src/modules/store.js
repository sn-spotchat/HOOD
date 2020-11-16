import * as actionType from './action';

const initialState = {
    sidebarstate: "home",
    chatname: undefined,
    newchat: true,
    chatlist: [],
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