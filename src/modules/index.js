import {combineReducers} from 'redux';
import reducer from './reducer';
import chatreducer from './chatreducer';
import profilereducer from './profilereducer';
import mapreducer from './mapreducer';
import initialState from './store';


const rootReducer = combineReducers({
        reducer, chatreducer, profilereducer, mapreducer
});

export default rootReducer;
