const initialState = {
    //기본적으로 store의 변수명은 모두 소문자로 한다.
    flag: {
        loggedin: false,
        nearlistloaded: false,
        locationloaded: false,
    },
    user: {
        key: null,
        nickname: null,
        ID: null,
        PW: null,
        chatlist: [null],
        chatroomlist: [{
            chatlist:[null],
            }
        ],
        profile: {
            age: null,
            birthday: null,
            email: null,
            gender: null,
            id: null,
            name: 'Guest',
            nickname: null,
            profile_image: null,
        },
    },
    state: {
        sidebarstate: 'home',
        chatroom: null,
        chatroomname : null,
    },
    data: {
        nearlist: null,
        location: null,
    },
    theme : {
        themename : 'Original',
        polygondesign: {
            color : ['#7ED4F0','#4040F0', '#F51D1A', '#10E040'],
            opacity : [0.3, 0.5, 0.3, 0.4],
            scolor : '#FFFFFF',
            sopacity : 1.0,
        }
    },
    update: [
        null
    ],
    marker:{
        marker: false,
        searchmarkerlat: null,
        searchmarkerlng: null,
        searchmarkeraddr: null,
    }
}

export default initialState;