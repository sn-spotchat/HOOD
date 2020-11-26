import React from 'react';
import NaverLogin from 'react-naver-login';

const Callback = (props) =>{
    return ( 
        <NaverLogin 
            //deploy
            //clientId="IiiApimgTUwcBWT8GLsw"            
            //callbackUrl="https://hood-sgtmi.web.app/"
            clientId="dgwFUqPZTSWhHSO0FkGl" 
            callbackUrl="http://localhost:3000/callback"
            render={(props) => 
            <div onClick={props.onClick} >Callback.js</div>
            }
        />   
    );
};

export default Callback;