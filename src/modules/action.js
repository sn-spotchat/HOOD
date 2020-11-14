export const SIDEBARHOME = 'sidebar/home';
export const SIDEBARMYPAGE = 'sidebar/mypage';
export const SIDEBARNEAR = 'sidebar/near';
export const SIDEBARCHAT = 'sidebar/chat';
export const SIDEBARTEST = 'sidebar/test';
export const CHATID = 'chat/id';
export const INSERTCHAT = 'chat/insert';
export const REMOVECHAT = 'chat/remove';
export const NEWCHAT = 'chat/newchat';
export const OLDCHAT = 'chat/oldchat';



export const sidebarhome = () => ({type:SIDEBARHOME});
export const sidebarmypage = () => ({type:SIDEBARMYPAGE});
export const sidebarnear = () => ({type:SIDEBARNEAR});
export const sidebarchat = () => ({type:SIDEBARCHAT});
export const sidebartest = () => ({type:SIDEBARTEST});
export const chatid = (chatid) => ({type:CHATID, id:chatid});
export const insertchat = (chatid) =>({type:INSERTCHAT, id:chatid});
export const removechat = (chatid) =>({type:REMOVECHAT, id:chatid});
export const newchat = ()=>({type:NEWCHAT});
export const oldchat = ()=>({type:OLDCHAT});

export const sidebarhomeObject = {type:SIDEBARHOME};
export const sidebarmypageObject = {type:SIDEBARMYPAGE};
export const sidebarnearObject = {type:SIDEBARNEAR};
export const sidebarchatObject = {type:SIDEBARCHAT};
export const sidebartestObject = {type:SIDEBARTEST};
export const chatidObject = {type:CHATID};
//

export const INSERTPROFILE = 'insertprofile';
export const LOADPROFILE = 'loadprofile';
export const insertprofile = (profile) =>({type:INSERTPROFILE, profile: profile});
export const loadprofile = (profile) =>({type:LOADPROFILE, profile: profile});
