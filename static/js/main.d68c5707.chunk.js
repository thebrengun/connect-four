(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,n,t){},13:function(e,n,t){},14:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),i=t(4),c=t.n(i),o=(t(12),t(5)),u=t(2),l=t(1);t(13);function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:7,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6;return new Array(e).fill(null).map(function(e){return new Array(n).fill(null)})}function h(e,n,t){var r=Object(l.a)(e,2),a=r[0],i=r[1];return n.slice(0,a).concat([n[a].slice(0,i).concat([t]).concat(n[a].slice(i+1))]).concat(n.slice(a+1))}var f=function(){var e=Object(r.useState)(window.innerWidth),n=Object(l.a)(e,2),t=n[0],a=n[1],i=Object(r.useState)(window.innerHeight),c=Object(l.a)(i,2),o=c[0],u=c[1];return Object(r.useEffect)(function(){var e=function(){a(window.innerWidth),u(window.innerHeight)};return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}),{width:t,height:o}};var d=function(){var e=Object(r.useState)(s(7,6,4)),n=Object(l.a)(e,2),t=n[0],i=n[1],c=Object(r.useState)(0),d=Object(l.a)(c,2),v=d[0],w=d[1],m=Object(r.useState)(!1),p=Object(l.a)(m,2),b=p[0],g=p[1],j=f(),O=j.width,k=j.height,E=[{name:"Red",id:"0",className:"token--red"},{name:"Black",id:"1",className:"token--black"}],y=Object(r.useMemo)(function(){return function(e,n,t,r){var a=[{size:Math.floor(t/e),unit:"vw",divisor:t},{size:Math.floor(r/n),unit:"vh",divisor:r}],i=Math.min.apply(Math,Object(o.a)(a.map(function(e){var n=e.size;return n}))),c=a.reduce(function(e,n,t){var r=n.size,a=n.unit,c=n.divisor;if(r===i){var o=Math.floor(i/c*100);return{size:r,unit:a,percentage:o}}return e},null),u="".concat(c.percentage).concat(c.unit),l="".concat(c.percentage/2).concat(c.unit);return{full:u,half:l}}(8,7,O,k)},[7,6,O,k]),N=y.full,z=y.half,M={width:N,height:N},S=function(e){i(s()),g(!1)},W=function(e){return function(n){try{var r=function(e,n){var t=n[e].indexOf(null);if(-1===t)throw new Error("No empty spaces in this column");return[e,t]}(e,t),a=E[v],c=h(r,t,Object(u.a)({},a)),o=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:4,r=Object(l.a)(e,2),a=r[0],i=r[1],c=n[a][i];if(null===c)return[];var o,u=[[[0,1],[0,-1]],[[-1,0],[1,0]],[[-1,1],[1,-1]],[[-1,-1],[1,1]]];!function(e){e.push="push",e.unshift="unshift"}(o||(o={}));for(var s=0;s<u.length;s++){for(var h=u[s],f=1,d=[e],v=o.push;d.length<t&&h.length>0;){var w=h.pop();if(!w)throw new Error("Vector cannot be undefined");var m=e[0]+w[0]*f,p=e[1]+w[1]*f;m>=0&&m<n.length&&p>=0&&p<n[m].length&&null!==n[m][p]&&n[m][p].id===c.id?(d[v]([m,p]),h.push(w),f++):(f=1,v=o.unshift)}if(4===d.length)return d}return[]}(r,c);4===o.length&&(g(!0),o.forEach(function(e){c=h(e,c,Object(u.a)({},a,{winner:!0}))})),i(c),w(v+1===E.length?0:v+1)}catch(n){}}},_=function(e,n){var t=["token"];return null!==e&&e.className&&t.push(e.className),n&&t.push("token--gameover"),null!==e&&e.winner&&t.push("token--winner"),t.join(" ")};return a.a.createElement("div",{className:"App"},a.a.createElement("div",{className:"board"},t.map(function(e,n){return a.a.createElement("button",{className:"board__column",style:{borderRadius:z},key:"column-".concat(n),onClick:b?S:W(n)},e.slice().reverse().map(function(e,n){return a.a.createElement("div",{className:"board__cell",style:M,key:n},a.a.createElement("div",{className:_(e,b)}))}))})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(d,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},6:function(e,n,t){e.exports=t(14)}},[[6,1,2]]]);
//# sourceMappingURL=main.d68c5707.chunk.js.map