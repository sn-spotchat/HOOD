export const SIDEBARHOME = 'sidebar/home';
export const SIDEBARNEAR = 'sidebar/near';
export const SIDEBARCHAT = 'sidebar/chat';
export const SIDEBARTEST = 'sidebar/test';
export const CHATID = 'chat/id';
export const SIDEBARMYPAGE = 'sidebar/mypage';
export const SIDEBARLOGIN = 'sidebar/login';
export const SIDEBARSIGNIN = 'sidebar/signin';
export const SIDEBARNSIGNIN = 'sidebar/nsignin';


export const CHATNAME = 'chat/name';
export const INSERTCHATROOM = 'chat/insert';
export const REMOVECHATROOM = 'chat/remove';
export const NEWCHAT = 'chat/newchat';
export const OLDCHAT = 'chat/oldchat';

export const LOGINID = 'login/id';
export const LOGINPW = 'login/pw';
export const LOGINUSERID = 'login/user_id';

export const sidebarhome = () => ({type:SIDEBARHOME});
export const sidebarnear = () => ({type:SIDEBARNEAR});
export const sidebarchat = () => ({type:SIDEBARCHAT});
export const sidebartest = () => ({type:SIDEBARTEST});
export const sidebarlogin = () => ({type:SIDEBARLOGIN});
export const sidebarsignin = () => ({type:SIDEBARSIGNIN});
export const sidebarnsignin = () => ({type:SIDEBARNSIGNIN});
export const sidebarmypage = () => ({type:SIDEBARMYPAGE});


export const chatname = (chatname) => ({type:CHATNAME, name:chatname});
export const chatid = (chatid) => ({type:CHATID, id:chatid});
export const insertchatroom = (chatroomid) =>({type:INSERTCHATROOM, id:chatroomid});
export const removechatroom = (chatroomid) =>({type:REMOVECHATROOM, id:chatroomid});
export const newchat = ()=>({type:NEWCHAT});
export const oldchat = ()=>({type:OLDCHAT});

export const loginid = (loginid)=>({type:LOGINID, id:loginid});
export const loginpw = (loginpw)=>({type:LOGINPW, pw:loginpw});
export const loginuserid = (loginuserid)=>({type:LOGINUSERID, user_id:loginuserid});

export const sidebarhomeObject = {type:SIDEBARHOME};
export const sidebarnearObject = {type:SIDEBARNEAR};
export const sidebarchatObject = {type:SIDEBARCHAT};
export const sidebartestObject = {type:SIDEBARTEST};
export const chatidObject = {type:CHATID};
//
export const sidebarloginObject = {type:SIDEBARLOGIN};
export const sidebarsigninObject = {type:SIDEBARSIGNIN};
export const sidebarnsigninObject = {type:SIDEBARNSIGNIN};
export const sidebarmypageObject = {type:SIDEBARMYPAGE};
export const chatnameObject = {type:CHATNAME};


export const INSERTPROFILE = 'insertprofile';
export const insertprofile = (profile) =>({type:INSERTPROFILE, profile: profile});
export const insertprofileObject = {type:INSERTPROFILE};

export const LOGGEDIN = 'loggedin';
export const loggedin = () =>({type : LOGGEDIN});
export const loggedinObject = {type:LOGGEDIN};

export const MAPLOADED = 'maploaded';
export const maploaded = () =>({type : MAPLOADED});
export const maploadedObject = {type:MAPLOADED};

export const MAPSAVE = 'mapsave';
export const mapsave = (map) =>({type : MAPSAVE, map : map});
export const mapsaveObject = {type:MAPSAVE};

