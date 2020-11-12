export const SIDEBARHOME = 'sidebar/home';
export const SIDEBARMYPAGE = 'sidebar/mypage';
export const SIDEBARNEAR = 'sidebar/near';
export const SIDEBARCHAT = 'sidebar/chat';
export const SIDEBARTEST = 'sidebar/test';
export const CHATNAME = 'chat/name';
export const INSERTCHAT = 'chat/insert';
export const REMOVECHAT = 'chat/remove';
export const NEWCHAT = 'chat/newchat';
export const OLDCHAT = 'chat/oldchat';



export const sidebarhome = () => ({type:SIDEBARHOME});
export const sidebarmypage = () => ({type:SIDEBARMYPAGE});
export const sidebarnear = () => ({type:SIDEBARNEAR});
export const sidebarchat = () => ({type:SIDEBARCHAT});
export const sidebartest = () => ({type:SIDEBARTEST});
export const chatname = (chatname) => ({type:CHATNAME, name:chatname});
export const insertchat = (chatname) =>({type:INSERTCHAT, name:chatname});
export const removechat = (chatname) =>({type:REMOVECHAT, name:chatname});
export const newchat = ()=>({type:NEWCHAT});
export const oldchat = ()=>({type:OLDCHAT});

export const sidebarhomeObject = {type:SIDEBARHOME};
export const sidebarmypageObject = {type:SIDEBARMYPAGE};
export const sidebarnearObject = {type:SIDEBARNEAR};
export const sidebarchatObject = {type:SIDEBARCHAT};
export const sidebartestObject = {type:SIDEBARTEST};
export const chatnameObject = {type:CHATNAME};
//

export const INSERTPROFILE = 'insertprofile';
export const LOADPROFILE = 'loadprofile';
export const insertprofile = (profile) =>({type:INSERTPROFILE, profile: profile});
export const loadprofile = (profile) =>({type:LOADPROFILE, profile: profile});
