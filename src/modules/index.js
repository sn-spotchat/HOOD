import {combineReducers} from 'redux';

import flagreducer from './flagreducer'
import datareducer from './datareducer'
import userreducer from './userreducer'
import statereducer from './statereducer'
import markerreducer from './markerreducer'
import themereducer from './themereducer';

const rootReducer = combineReducers({
    //sidebarreducer, chatreducer, profilereducer, mapreducer, loginreducer
    flagreducer,
    userreducer,
    statereducer,
    datareducer,
    markerreducer,
    themereducer,
});

export default rootReducer;
