/*! For license information please see 225.08a75ddb.chunk.js.LICENSE.txt */
(self.webpackChunksamurai_way=self.webpackChunksamurai_way||[]).push([[225],{4225:function(n,r,e){"use strict";e.r(r),e.d(r,{UsersContainer:function(){return F},default:function(){return N}});var t=e(5671),o=e(3144),s=e(136),i=e(5716),u=e(364),l=e(8386),a=e(2791),c=e(4942),f=e(885),g="Paginator_paginator__N-+GW",p="Paginator_pageNumber__eudIE",h="Paginator_selectedPage__xO3SK",d=e(1694),v=e.n(d),P=e(184),w=function(n){for(var r=n.totalItemsCount,e=n.pageSize,t=n.currentPage,o=n.onPageChanged,s=n.portionSize,i=void 0===s?10:s,u=Math.ceil(r/e),l=[],d=1;d<=u;d++)l.push(d);var w=Math.ceil(u/i),x=(0,a.useState)(1),j=(0,f.Z)(x,2),m=j[0],y=j[1],C=(m-1)*i+1,b=m*i;return(0,P.jsxs)("div",{className:g,children:[1!==t&&(0,P.jsx)("button",{onClick:function(){y(1),o(1)},children:"FIRST"}),m>1&&(0,P.jsx)("button",{onClick:function(){y(m-1)},children:"PREV"}),l.filter((function(n){return n>=C&&n<=b})).map((function(n){return(0,P.jsx)("span",{className:v()((0,c.Z)({},h,t===n),p),onClick:function(){o(n)},children:n},n)})),w>m&&(0,P.jsx)("button",{onClick:function(){y(m+1)},children:"NEXT"}),t!==u&&(0,P.jsx)("button",{onClick:function(){y(w),o(u)},children:"LAST"})]})},x="users_userPhoto__zvIv+",j=e(4353),m=e(1523),y=function(n){var r=n.user,e=n.followingInProgress,t=n.unfollow,o=n.follow;return(0,P.jsxs)("div",{children:[(0,P.jsxs)("span",{children:[(0,P.jsx)("div",{children:(0,P.jsx)(m.OL,{to:"/profile/"+r.id,children:(0,P.jsx)("img",{src:null!==r.photos.small?r.photos.small:j,className:x,alt:"userPhoto"})})}),(0,P.jsx)("div",{children:r.followed?(0,P.jsx)("button",{disabled:e.some((function(n){return n===r.id})),onClick:function(){t(r.id)},children:"Unfollow"}):(0,P.jsx)("button",{disabled:e.some((function(n){return n===r.id})),onClick:function(){o(r.id)},children:"Follow"})})]}),(0,P.jsxs)("span",{children:[(0,P.jsxs)("span",{children:[(0,P.jsx)("div",{children:r.name}),(0,P.jsx)("div",{children:r.status})]}),(0,P.jsxs)("span",{children:[(0,P.jsx)("div",{children:"user.location.country"}),(0,P.jsx)("div",{children:"user.location.city"})]})]})]})},C=function(n){var r=n.currentPage,e=n.totalUsersCount,t=n.pageSize,o=n.onPageChanged,s=n.users,i=n.followingInProgress,u=n.follow,l=n.unfollow;return(0,P.jsxs)("div",{children:[(0,P.jsx)(w,{currentPage:r,onPageChanged:o,totalItemsCount:e,pageSize:t}),(0,P.jsx)("div",{children:s.map((function(n){return(0,P.jsx)(y,{user:n,followingInProgress:i,follow:u,unfollow:l},n.id)}))})]})},b=e(3445),S=e(7781),I=function(n){return n.usersPage.users},_=function(n){return n.usersPage.pageSize},k=function(n){return n.usersPage.currentPage},z=function(n){return n.usersPage.totalUsersCount},U=function(n){return n.usersPage.isFetching},Z=function(n){return n.usersPage.followingInProgress},F=function(n){(0,s.Z)(e,n);var r=(0,i.Z)(e);function e(){var n;(0,t.Z)(this,e);for(var o=arguments.length,s=new Array(o),i=0;i<o;i++)s[i]=arguments[i];return(n=r.call.apply(r,[this].concat(s))).onPageChanged=function(r){var e=n.props.pageSize;n.props.setCurrentPage(r),n.props.requestUsers(r,e)},n}return(0,o.Z)(e,[{key:"componentDidMount",value:function(){var n=this.props,r=n.currentPage,e=n.pageSize;this.props.requestUsers(r,e)}},{key:"render",value:function(){return(0,P.jsxs)(P.Fragment,{children:[this.props.isFetching?(0,P.jsx)(b.p,{}):null,(0,P.jsx)(C,{totalUsersCount:this.props.totalUsersCount,pageSize:this.props.pageSize,currentPage:this.props.currentPage,onPageChanged:this.onPageChanged,users:this.props.users,toggleFollowingProgress:this.props.toggleFollowingProgress,followingInProgress:this.props.followingInProgress,follow:this.props.follow,unfollow:this.props.unfollow})]})}}]),e}(a.Component),N=(0,S.qC)((0,u.$j)((function(n){return{users:I(n),pageSize:_(n),totalUsersCount:z(n),currentPage:k(n),isFetching:U(n),followingInProgress:Z(n)}}),{follow:l.ZN,unfollow:l.fv,setCurrentPage:l.D4,toggleFollowingProgress:l.ZH,requestUsers:l.D7}))(F)},1694:function(n,r){var e;!function(){"use strict";var t={}.hasOwnProperty;function o(){for(var n=[],r=0;r<arguments.length;r++){var e=arguments[r];if(e){var s=typeof e;if("string"===s||"number"===s)n.push(e);else if(Array.isArray(e)){if(e.length){var i=o.apply(null,e);i&&n.push(i)}}else if("object"===s)if(e.toString===Object.prototype.toString)for(var u in e)t.call(e,u)&&e[u]&&n.push(u);else n.push(e.toString())}}return n.join(" ")}n.exports?(o.default=o,n.exports=o):void 0===(e=function(){return o}.apply(r,[]))||(n.exports=e)}()},4353:function(n,r,e){"use strict";n.exports=e.p+"static/media/user.5faf09a7795d28bf5a2b.png"},885:function(n,r,e){"use strict";e.d(r,{Z:function(){return o}});var t=e(181);function o(n,r){return function(n){if(Array.isArray(n))return n}(n)||function(n,r){var e=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=e){var t,o,s=[],i=!0,u=!1;try{for(e=e.call(n);!(i=(t=e.next()).done)&&(s.push(t.value),!r||s.length!==r);i=!0);}catch(l){u=!0,o=l}finally{try{i||null==e.return||e.return()}finally{if(u)throw o}}return s}}(n,r)||(0,t.Z)(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}}]);
//# sourceMappingURL=225.08a75ddb.chunk.js.map