"use strict";(self.webpackChunksamurai_way=self.webpackChunksamurai_way||[]).push([[562],{7562:function(s,e,t){t.r(e),t.d(e,{default:function(){return as}});var r=t(1413),o=t(5671),n=t(3144),i=t(136),a=t(8557),l=t(2791),c="Profile_profile__8AvcK",d="Profile_avatarBlock__nf3x1",u="Profile_mainPhoto__nnoEH",f="Profile_previewImage__hgrDb",h="Profile_fileInput__LHeTS",p="Profile_customFileUpload__Ztp0O",m="Profile_profileContent__Hi8K9",x=t(885),j="ProfileInfo_descriptionBlock__UU8E7",_="ProfileInfo_profileStatus__cR6yh",v="ProfileInfo_profileData__D97W+",P="ProfileInfo_profileDataContent__7xvIs",b="ProfileInfo_editButton__OTYdw",Z=t(3445),g=t(184),C=function(s){var e=s.status,t=s.updateStatus,r=(0,l.useState)(!1),o=(0,x.Z)(r,2),n=o[0],i=o[1],a=(0,l.useState)(e),c=(0,x.Z)(a,2),d=c[0],u=c[1];(0,l.useEffect)((function(){u(e)}),[e]);return(0,g.jsx)("div",{children:n?(0,g.jsx)("div",{children:(0,g.jsx)("input",{onChange:function(s){u(s.currentTarget.value)},value:d,onBlur:function(){i(!1),t(d)},autoFocus:!0})}):(0,g.jsxs)("div",{children:[(0,g.jsx)("b",{children:"Status: "})," ",(0,g.jsx)("span",{onDoubleClick:function(){i(!0)},children:e||"------"})]})})},N="Contact_contact__vqn2I",k=function(s){var e=s.contactTitle,t=s.contactValue;return(0,g.jsxs)("div",{className:N,children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("b",{children:e}),":"," "]}),t]})},F=t(1117),S=t(704),I=t(9234),y={profileDataForm:"ProfileDataForm_profileDataForm__mMS5H",profileDataFormContent:"ProfileDataForm_profileDataFormContent__stNtA",contacts:"ProfileDataForm_contacts__5TLJr",contactsTitle:"ProfileDataForm_contactsTitle__PYbHA",contact:"ProfileDataForm_contact__30egV"},D=t(5323),A=t(7359),w=(0,S.Z)({form:"edit-profile"})((function(s){var e=s.handleSubmit,t=s.error,r=s.profile;return(0,g.jsxs)("form",{onSubmit:e,className:y.profileDataForm,children:[(0,g.jsxs)("div",{className:y.profileDataFormContent,children:[t&&(0,g.jsx)("div",{className:I.Z.formSummaryError,children:t}),(0,g.jsxs)("div",{children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("b",{children:"Full name"}),":"," "]}),(0,F.Gr)("Full name","fullName",[],F.PI)]}),(0,g.jsxs)("div",{children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("b",{children:"Looking for a job"}),":"," "]}),(0,F.Gr)("","lookingForAJob",[],F.PI,{type:"checkbox"})]}),(0,g.jsxs)("div",{children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("b",{children:"My professional skills"}),":"," "]}),(0,F.Gr)("My professional skills","lookingForAJobDescription",[],F.Cc)]}),(0,g.jsxs)("div",{children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("b",{children:"About me"}),":"," "]}),(0,F.Gr)("About me","aboutMe",[],F.Cc)]}),(0,g.jsxs)("div",{className:y.contacts,children:[(0,g.jsxs)("span",{className:y.contactsTitle,children:[(0,g.jsx)("b",{children:"Contacts"}),":"," "]}),Object.keys(r.contacts).map((function(s){return(0,g.jsx)("div",{className:y.contact,children:(0,g.jsxs)("b",{children:[(0,g.jsxs)("span",{children:[s,": "]}),(0,F.Gr)(s,"contacts."+s,[],F.PI)]})},s)}))]})]}),(0,g.jsx)("div",{children:(0,g.jsx)(A.Z,{htmlType:"submit",className:y.saveButton,children:(0,g.jsx)(D.Z,{})})})]})})),T=t(1752),M=function(s){var e=s.profile,t=s.status,r=s.updateStatus,o=s.isOwner,n=(s.savePhoto,s.saveProfile),i=l.useState(!1),a=(0,x.Z)(i,2),c=a[0],d=a[1];if(!e)return(0,g.jsx)(Z.p,{});return(0,g.jsxs)("div",{className:j,children:[(0,g.jsx)("div",{className:_,children:(0,g.jsx)(C,{status:t,updateStatus:r})}),c?(0,g.jsx)(w,{onSubmit:function(s){n(s).then((function(){d(!1)}))},profile:e,initialValues:e}):(0,g.jsx)(O,{profile:e,isOwner:o,goToEditMode:function(){d(!0)}})]})},O=function(s){var e=s.profile,t=s.isOwner,r=s.goToEditMode;return(0,g.jsxs)("div",{className:v,children:[(0,g.jsxs)("div",{className:P,children:[(0,g.jsxs)("div",{children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("b",{children:"Full name"}),":"," "]}),e.fullName]}),(0,g.jsxs)("div",{children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("b",{children:"Looking for a job"}),":"," "]}),e.lookingForAJob?"yes":"no"]}),e.lookingForAJob&&(0,g.jsxs)("div",{children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("b",{children:"My professional skills"}),":"," "]}),e.lookingForAJobDescription]}),(0,g.jsxs)("div",{children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("b",{children:"About me"}),":"," "]}),e.aboutMe]}),(0,g.jsx)("br",{}),(0,g.jsxs)("div",{children:[(0,g.jsx)("b",{children:"Contacts"}),":"," ",Object.keys(e.contacts).map((function(s){return e.contacts[s]&&(0,g.jsx)(k,{contactTitle:s,contactValue:e.contacts[s]},s)}))]})]}),t&&(0,g.jsx)("div",{className:b,children:(0,g.jsx)(A.Z,{onClick:r,children:(0,g.jsx)(T.Z,{})})})]})},U=t(2982),E="MyPosts_postsBlock__UQGsK",G="MyPosts_posts__eHHT8",J="Post_post__8IgOn",H="Post_post_text__qd8oC",B="Post_post_like__lrS0d",L=t(9529),q=t(4399),R=function(s){return(0,g.jsxs)("div",{className:J,children:[(0,g.jsx)(q.C,{icon:(0,g.jsx)(L.Z,{})}),(0,g.jsxs)("div",{className:H,children:[s.message,(0,g.jsxs)("div",{className:B,children:[(0,g.jsx)("span",{children:"like: "}),s.likesCount]})]})]})},V="AddPostForm_addPostForm__hAG5q",z="AddPostForm_addPostForm__inputContainer__2I-ne",K=(0,S.Z)({form:"profile-add-post"})((function(s){return(0,g.jsxs)("form",{onSubmit:s.handleSubmit,className:V,children:[(0,g.jsx)("div",{className:z,children:(0,F.Gr)("Your post","newPostText",[],F.Cc)}),(0,g.jsx)("div",{children:(0,g.jsx)("button",{children:"Add post"})})]})})),Y=l.memo((function(s){var e=(0,U.Z)(s.posts).reverse().map((function(s){return(0,g.jsx)(R,{message:s.message,likesCount:s.likesCount},s.id)}));return(0,g.jsxs)("div",{className:E,children:[(0,g.jsx)("h3",{children:"My posts"}),(0,g.jsx)(K,{onSubmit:function(e){s.addPost(e.newPostText)}}),(0,g.jsx)("div",{className:G,children:e})]})})),W=t(364),$=t(4294),Q=(0,W.$j)((function(s){return{posts:s.profilePage.posts}}),{addPost:$.ap.addPostActionCreator})(Y),X=t(4353),ss=t(2533),es=t(166),ts=t(2365),rs=function(s){var e=(0,W.v9)((function(s){return s.profilePage.profile}));return(0,g.jsxs)("div",{className:c,children:[(0,g.jsxs)("div",{className:d,children:[(0,g.jsx)(ss.Z,{className:u,preview:{className:f},src:(null===e||void 0===e?void 0:e.photos.large)||X,alt:"Avatar"}),s.isOwner&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("label",{htmlFor:"file-upload",className:p,children:(0,g.jsx)(ts.Z,{})}),(0,g.jsx)(es.Z,{id:"file-upload",type:"file",className:h,onChange:function(s){s.target.files&&s.target.files.length&&(0,$.Ju)(s.target.files[0])}})]})]}),(0,g.jsxs)("div",{className:m,children:[(0,g.jsx)(M,{savePhoto:s.savePhoto,isOwner:s.isOwner,profile:s.profile,status:s.status,saveProfile:s.saveProfile,updateStatus:s.updateStatus}),(0,g.jsx)(Q,{})]})]})},os=t(9271),ns=t(7781),is=function(s){(0,i.Z)(t,s);var e=(0,a.Z)(t);function t(){return(0,o.Z)(this,t),e.apply(this,arguments)}return(0,n.Z)(t,[{key:"refreshProfile",value:function(){var s=+this.props.match.params.userId;s||(s=this.props.authorizedUserId)||this.props.history.push("login"),s?(this.props.getUserProfile(s),this.props.getStatus(s)):console.error("ID should exists in URI params or in state ('authorizedUserId')")}},{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(s,e){this.props.match.params.userId!==s.match.params.userId&&this.refreshProfile()}},{key:"render",value:function(){return(0,g.jsx)(rs,(0,r.Z)((0,r.Z)({},this.props),{},{isOwner:!this.props.match.params.userId,profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus,savePhoto:this.props.savePhoto}))}}]),t}(l.Component),as=(0,ns.qC)((0,W.$j)((function(s){return{profile:s.profilePage.profile,status:s.profilePage.status,authorizedUserId:s.auth.userId,isAuth:s.auth.isAuth}}),{getUserProfile:$.et,getStatus:$.lR,updateStatus:$.Nf,savePhoto:$.Ju,saveProfile:$.Ii}),os.EN)(is)},1117:function(s,e,t){t.d(e,{Cc:function(){return h},PI:function(){return p},Gr:function(){return m}});var r=t(1413),o=t(5987),n=(t(2791),t(9234)),i=t(6139),a=t(4033),l=t(166),c=t(184),d=["input","meta"],u=["input","meta"],f=function(s){var e=s.meta,t=e.touched,r=e.error,o=s.children,i=t&&r;return(0,c.jsxs)("div",{className:n.Z.formControl+" "+(i?n.Z.error:""),children:[(0,c.jsx)("div",{children:o}),i&&(0,c.jsx)("span",{children:r})]})},h=function(s){var e=s.input,t=(s.meta,(0,o.Z)(s,d));return(0,c.jsx)(f,(0,r.Z)((0,r.Z)({},s),{},{children:(0,c.jsx)(a.Z,(0,r.Z)((0,r.Z)({},e),t))}))},p=function(s){var e=s.input,t=(s.meta,(0,o.Z)(s,u));return(0,c.jsx)(f,(0,r.Z)((0,r.Z)({},s),{},{children:(0,c.jsx)(l.Z,(0,r.Z)((0,r.Z)({},e),t))}))};function m(s,e,t,o){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"";return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(i.Z,(0,r.Z)({placeholder:s,name:e,validate:t,component:o},n))," ",a]})}},9234:function(s,e){e.Z={formControl:"FormsControls_formControl__iw5Wr",error:"FormsControls_error__vUZR7",formSummaryError:"FormsControls_formSummaryError__P7Ljl"}},4353:function(s,e,t){s.exports=t.p+"static/media/user.5faf09a7795d28bf5a2b.png"}}]);
//# sourceMappingURL=562.b781f396.chunk.js.map