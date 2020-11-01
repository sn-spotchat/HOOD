import React from 'react';
import NaverLogin from 'react-naver-login';

const Login = (props) =>{
    const userinfo ={
        age: undefined,
        birthday: undefined,
        email: undefined,
        gender: undefined,
        id: "00000000",
        name: "Guest",
        nickname: undefined,
        profile_image: undefined
    }
    return (
        <NaverLogin 
            clientId="IiiApimgTUwcBWT8GLsw"
            callbackUrl="https://hood-sgtmi.web.app/"
            render={(props) => 
            <div onClick={props.onClick}><img className = "NavigationIcon" src = {require('./naver.png')}></img></div>
        }
            onSuccess={(result) => console.log(result)}
            onFailure={(result) => console.error(result)}                       
        />   
    );
};

export default Login;