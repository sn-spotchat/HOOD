import {combineReducers} from 'redux';

import flagreducer from './flagreducer'
import datareducer from './datareducer'
import userreducer from './userreducer'
import statereducer from './statereducer'
import markerreducer from './markerreducer'

const rootReducer = combineReducers({
    //sidebarreducer, chatreducer, profilereducer, mapreducer, loginreducer
    flagreducer,
    userreducer,
    statereducer,
    datareducer,
    markerreducer,
});

export default rootReducer;
