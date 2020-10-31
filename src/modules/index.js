import {combineReducers} from 'redux';
import reducer from './reducer';

const rootReducer = combineReducers({
    reducer
});
//후에 reducer대신 다른 이름으로 바꿔야함. SidebarContainer.js에서도 바꿔야함.
export default rootReducer;