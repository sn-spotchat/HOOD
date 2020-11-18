import * as actionType from './action';
import initialState from './store';

const sidebarState = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SIDEBARHOME:
            return { ...state, sidebarstate: "home" };
        case actionType.SIDEBARNEAR:
            return { ...state, sidebarstate: "near" };
        case actionType.SIDEBARCHAT:
            return { ...state, sidebarstate: "chat" };
        case actionType.SIDEBARTEST:
            return { ...state, sidebarstate: "test" };
        case actionType.SIDEBARLOGIN:
            return { ...state, sidebarstate: 'login' };
        case actionType.SIDEBARSIGNIN:
            return { ...state, sidebarstate: 'signin' };
        case actionType.SIDEBARNSIGNIN:
            return { ...state, sidebarstate: 'nsignin' };
        case actionType.SIDEBARMYPAGE:
            return { ...state, sidebarstate: 'mypage' };
        default:
            return state;
    }
};

//사용자 정보 관련 reducer를 따로 만들어야 하지만 일단 연습을 해야하기 때문에 siderbarState에 넣는다.

export default sidebarState;