import {combineReducers} from 'redux';
import reducer from './reducer';
import chatreducer from './/chatreducer';

const rootReducer = combineReducers({
    reducer, chatreducer
});
//후에 reducer대신 다른 이름으로 바꿔야함. SidebarContainer.js에서도 바꿔야함.
export default rootReducer;