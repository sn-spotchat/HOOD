import * as React from 'react';
import {appendNaverButton, loadScript} from './components/RNL';

const Init = () =>{
    appendNaverButton();
    loadScript({onSuccess : console.log});
    console.log('Init.js');    
    return;
}


export default Init;
