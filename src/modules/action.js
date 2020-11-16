export const SIDEBARHOME = 'sidebar/home';
export const SIDEBARNEAR = 'sidebar/near';
export const SIDEBARCHAT = 'sidebar/chat';
export const SIDEBARTEST = 'sidebar/test';
export const SIDEBARMYPAGE = 'sidebar/mypage';
export const SIDEBARLOGIN = 'sidebar/login';
export const SIDEBARSIGNIN = 'sidebar/signin';


export const CHATNAME = 'chat/name';
export const INSERTCHAT = 'chat/insert';
export const REMOVECHAT = 'chat/remove';
export const NEWCHAT = 'chat/newchat';
export const OLDCHAT = 'chat/oldchat';



export const sidebarhome = () => ({type:SIDEBARHOME});
export const sidebarnear = () => ({type:SIDEBARNEAR});
export const sidebarchat = () => ({type:SIDEBARCHAT});
export const sidebartest = () => ({type:SIDEBARTEST});
export const sidebarlogin = () => ({type:SIDEBARLOGIN});
export const sidebarsignin = () => ({type:SIDEBARSIGNIN});
export const sidebarmypage = () => ({type:SIDEBARMYPAGE});


export const chatname = (chatname) => ({type:CHATNAME, name:chatname});
export const insertchat = (chatname) =>({type:INSERTCHAT, name:chatname});
export const removechat = (chatname) =>({type:REMOVECHAT, name:chatname});
export const newchat = ()=>({type:NEWCHAT});
export const oldchat = ()=>({type:OLDCHAT});

export const sidebarhomeObject = {type:SIDEBARHOME};
export const sidebarnearObject = {type:SIDEBARNEAR};
export const sidebarchatObject = {type:SIDEBARCHAT};
export const sidebartestObject = {type:SIDEBARTEST};
export const sidebarloginObject = {type:SIDEBARLOGIN};
export const sidebarsigninObject = {type:SIDEBARSIGNIN};
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

