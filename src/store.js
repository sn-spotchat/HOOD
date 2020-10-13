import {createStore} from 'redux';

export default createStore(function(state, action){
    if(state === undefined){
        return {messages:''}
    }
    if(action.type === 'INCREMENT'){
        return {...state, messages:action.messages}
    }
    return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())