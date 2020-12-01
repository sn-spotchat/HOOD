import React from 'react';

const NAVER_ID_SDK_URL = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js';

const initLoginButton = (props) => {
    if(!('browser' in process)) {
      return;
    } 
    const clientId = "dgwFUqPZTSWhHSO0FkGl"
    const callbackUrl = "http://localhost:3000/callback"
    const onSuccess = props.onSuccess;
    //const { clientId, callbackUrl, onSuccess, onFailure } = props;
    const naver = window['naver'];
  
    const naverLogin = new naver.LoginWithNaverId(
       {
        callbackUrl,
        clientId,
        isPopup: true,
        loginButton: {color: "green", type: 3, height: 60},
      }
    );
  
    naverLogin.init();
  
    if (!window.opener) {
      naver.successCallback = (data) => onSuccess(data);
     // naver.failureCallback = onFailure;
    } else {
      naverLogin.getLoginStatus((status) => {
        if (status) {
          window.opener.naver.successCallback(naverLogin.user);
        } else {
          window.opener.failureCallback();
        }
        window.close();
      })
    }
  };

export const appendNaverButton = () => {
    if (document && document.querySelectorAll('#naverIdLogin').length === 0) {
        const naverId = document.createElement('div');
        naverId.id = 'naverIdLogin';
        naverId.style.position = 'absolute';
        naverId.style.top = '-10000px';
        document.body.appendChild(naverId);
    }
}
export const loadScript = async (props) => {
    if (document && document.querySelectorAll('#naver-login-sdk').length === 0) {
        const script = document.createElement('script');
        script.id = 'naver-login-sdk';
        script.src = NAVER_ID_SDK_URL;
        script.onload = () => {initLoginButton(props)}
        document.head.appendChild(script);
    }
    return;
}

const LoginNaver = (props) =>{  
    appendNaverButton();
    initLoginButton(props);    
    return(<div onClick = {() => {
      const naverLoginButton = (document).querySelector('#naverIdLogin').firstChild;
      naverLoginButton.click();}
    }>네이버 아이디로 로그인</div>
    )
}
export default LoginNaver;