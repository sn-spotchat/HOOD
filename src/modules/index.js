import {combineReducers} from 'redux';

import flagreducer from './flagreducer'
import datareducer from './datareducer'
import userreducer from './userreducer'
import statereducer from './statereducer'

const rootReducer = combineReducers({
    //sidebarreducer, chatreducer, profilereducer, mapreducer, loginreducer
    flagreducer,
    userreducer,
    statereducer,
    datareducer,
});

export default rootReducer;
