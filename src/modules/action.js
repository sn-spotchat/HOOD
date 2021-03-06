//인자가 필요한 액션은 함수의 형태로, 그렇지 않은 액션은 Object의 형태로 정의하고 사용한다.


//flag
export const LOCATIONLOADED = 'flag/locationloaded';
export const locationloadedObject = { type: LOCATIONLOADED };

export const NEARLISTLOADED = 'flag/nearlistloaded';
export const nearlistloadedObject = { type: NEARLISTLOADED };

export const LOGGEDIN = 'flag/loggedin';
export const loggedinObject = { type: LOGGEDIN };

//user
export const SETUSER = 'user/setuser';
export const setUser = (user) => ({ type: SETUSER, user: user });

export const SETNICKNAME = 'user/nickname';
export const setNickname = (nickname) => ({ type: SETNICKNAME, nickname: nickname });

export const SETID = 'user/ID';
export const setID = (ID) => ({ type: SETID, ID : ID});

export const SETPW = 'user/PW';
export const setPW = (PW) => ({ type: SETPW, PW : PW});

export const INSERTCHATROOM = 'user/insertchatroom';
export const insertChatroom = (chatroom, time) => ({ type: INSERTCHATROOM, chatroom: chatroom, time : time });

export const REMOVECHATROOM = 'user/removechatroom';
export const removeChatroom = (chatroom) => ({ type: REMOVECHATROOM, chatroom: chatroom });

export const SENDCHAT= 'user/sendchat';
export const sendChat = (chatroom, chat) => ({ type: SENDCHAT, chatroom : chatroom, chat : chat });


//state
export const SETCHATROOM = 'state/setchatroom';
export const setChatroom = (chatroom) => ({ type: SETCHATROOM, chatroom: chatroom });

export const SETCHATROOMNAME = 'state/setchatroomname';
export const setChatroomname = (chatroomname) => ({ type: SETCHATROOMNAME, chatroomname: chatroomname });

export const SETSIDEBAR = 'state/setsidebar';
export const setSidebar = (sidebarstate) => ({ type: SETSIDEBAR, sidebarstate: sidebarstate });


//data
export const SETLOCATION = 'data/setlocation';
export const setLocation = (Geo) => ({ type: SETLOCATION, Geo: Geo });

export const SETNEARLIST = 'data/setnearlist';
export const setNearlist = (nearlist) => ({ type: SETNEARLIST, nearlist: nearlist });

//search marker
export const SETMARKER = 'search/setmarker';
export const setMarker = (marker) => ({type: SETMARKER, marker: marker});

export const SETMARKERLAT = 'search/setmarkerlat';
export const setMarkerLAT = (searchmarkerlat) => ({type: SETMARKERLAT, searchmarkerlat: searchmarkerlat});

export const SETMARKERLNG = 'search/setmarkerlng';
export const setMarkerLNG = (searchmarkerlng) => ({type: SETMARKERLNG, searchmarkerlng: searchmarkerlng});

export const SETMARKERADDR = 'search/setmarkeraddr';
export const setMarkerAddr = (searchmarkeraddr) => ({type: SETMARKERADDR, searchmarkeraddr: searchmarkeraddr});

//theme
export const SETPOLYGONDESIGN = 'theme/setpolygondesign';
export const setPolygondesign = (polygondesign) => ({type : SETPOLYGONDESIGN, polygondesign : polygondesign});

export const SETTHEMENAME = 'theme/setthemename';
export const setThemename = (themename) => ({type : SETTHEMENAME, themename : themename});
