(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),i=n(5),c=n.n(i),a=(n(13),n(31)),l=function(e){return console.log(e),r.a.createElement(r.a.Fragment,null,'"Header here. Hallo"')},s=n(2),u=[[[[[0,1,0],[0,1,0],[0,1,1]],[[0,0,0],[1,1,1],[1,0,0]],[[1,1,0],[0,1,0],[0,1,0]],[[0,0,1],[1,1,1],[0,0,0]]],"#b69"],[[[[0,1,0],[0,1,1],[0,1,0]],[[0,0,0],[1,1,1],[0,1,0]],[[0,1,0],[1,1,0],[0,1,0]],[[0,1,0],[1,1,1],[0,0,0]]],"lime"],[[[[1,1,0],[0,1,1],[0,0,0]],[[0,0,1],[0,1,1],[0,1,0]],[[1,1,0],[0,1,1],[0,0,0]],[[0,0,1],[0,1,1],[0,1,0]]],"#f6f"],[[[[0,1,1],[1,1,0],[0,0,0]],[[1,0,0],[1,1,0],[0,1,0]],[[0,1,1],[1,1,0],[0,0,0]],[[1,0,0],[1,1,0],[0,1,0]]],"#69f"],[[[[0,1,0],[0,1,0],[1,1,0]],[[1,0,0],[1,1,1],[0,0,0]],[[0,1,1],[0,1,0],[0,1,0]],[[0,0,0],[1,1,1],[0,0,1]]],"#7ff"],[[[[1,1,0],[1,1,0],[0,0,0]],[[1,1,0],[1,1,0],[0,0,0]],[[1,1,0],[1,1,0],[0,0,0]],[[1,1,0],[1,1,0],[0,0,0]]],"#e26"],[[[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]]],"#ff8"]],f=function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"#765",r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"adf";e.fillStyle=o,e.fillRect(30*t,30*n,30,30),e.strokeStyle=r,e.strokeRect(30*t,30*n,30,30)};function v(e,t,n,o){var r=this;this.piece=n,this.colour=o,this.active=0,this.x=0,this.y=0,this.context=e,this.grid=t,this.draw=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r.active;r.active=e;for(var t=0;t<r.piece[r.active].length;t++)for(var n=0;n<r.piece[r.active][t].length;n++)r.piece[r.active][t][n]&&f(r.context,r.x+n,r.y+t,r.colour)},this.clear=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r.active;r.active=e;for(var t=0;t<r.piece[r.active].length;t++)for(var n=0;n<r.piece[r.active][t].length;n++)r.piece[r.active][t][n]&&f(r.context,r.x+n,r.y+t,"#765")},this.lock=function(){for(var e=0;e<r.piece[r.active].length;e++)for(var n=0;n<r.piece[r.active][e].length;n++)r.piece[r.active][e][n]&&(t.coords[r.y+e][r.x+n]=r.colour)},this.rotate=function(){r.isCollition(r.x,r.y,(r.active+1)%4)?r.isCollition(r.x+1,r.y,(r.active+1)%4)?r.isCollition(r.x-1,r.y,(r.active+1)%4)?r.isCollition(r.x-2,r.y,(r.active+1)%4)||(r.clear(),r.x=r.x-2,r.active=(1+r.active)%r.piece.length,r.draw()):(r.clear(),r.x=r.x-1,r.active=(1+r.active)%r.piece.length,r.draw()):(r.clear(),r.x=r.x+1,r.active=(1+r.active)%r.piece.length,r.draw()):(r.clear(),r.active=(1+r.active)%r.piece.length,r.draw())},this.moveLeft=function(){r.isCollition(r.x-1)||(r.clear(),r.x=r.x-1,r.draw())},this.moveRight=function(){r.isCollition(r.x+1)||(r.clear(),r.x=r.x+1,r.draw())},this.moveDown=function(){return!r.isCollition(r.x,r.y+1)&&(r.clear(),r.y=r.y+1,r.draw(),!0)},this.isCollition=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r.x,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r.y,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:r.active,o=0;o<r.piece[n].length;o++)for(var i=0;i<r.piece[n][o].length;i++)if(r.piece[n][o][i]){if(e+i<0||e+i>=10||t+o>=20)return console.log("collision"),!0;if("#765"!==r.grid.coords[t+o][e+i])return!0}return!1}}function h(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:20,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"#765";this.colums=n,this.rows=o,this.colour=r,this.coords=[],this.init=function(){for(var e=0;e<t.rows;e++){t.coords[e]=[];for(var n=0;n<t.colums;n++)t.coords[e][n]="#765"}t.draw()},this.draw=function(){for(var n=0,o=0;t.coords[n];){for(o=0;t.coords[n][o];)f(e,o,n,t.coords[n][o]),o++;n++}},this.penalty=function(e){for(var n=0;t.coords[n+1];)t.coords[n]=t.coords[n+1],n++;t.coords[n]=[];for(var o=0;o<10;o++)t.coords[n][o]="red";t.draw(),e.y-1>=0&&(e.y-=1),e.draw()},this.removeFull=function(){}}function d(e,t){if(!e||!t)return null;var n=Math.floor(Math.random()*u.length),o=Math.floor(Math.random()*u[n][0].length);console.log(n,o);var r=new v(e,t,u[n][0],u[n][1]);r.active=o;var i=function(e,t){return 0===e||4===e||2===e||3===e?[0,3]:6===e?0===t||2===t?[0,3]:[-1,3]:1===e?1===t?[-1,3]:0===t||3===t?[0,3]:[0,4]:5===e?[0,4]:void 0}(n,o),c=Object(s.a)(i,2),a=c[0],l=c[1];return r.x=l,r.y=a,r.draw(),r}var g=function(){var e=Object(o.useRef)(null),t=Object(o.useState)(null),n=Object(s.a)(t,2),i=n[0],c=n[1],a=Object(o.useState)(null),l=Object(s.a)(a,2),u=l[0],f=l[1],v=Object(o.useState)(null),g=Object(s.a)(v,2),m=g[0],w=g[1];Object(o.useEffect)((function(){if(e.current){var t=e.current.getContext("2d");t&&c(t)}}),[i]),Object(o.useEffect)((function(){if(i)if(u)if(console.log("grid already exist"),m)console.log("current piece already set: ",m);else{var e=d(i,u);e.draw(),w(e)}else{var t=new h(i);t.init(),f(t)}return function(){console.log("this is where the cleanup stuff happens")}}),[i,u,m]),Object(o.useEffect)((function(){var e=function(e){return function(e,t,n,o){"ArrowUp"===e&&t.rotate(),"ArrowLeft"===e&&t.moveLeft(),"ArrowRight"===e&&t.moveRight(),"ArrowDown"===e&&t.moveDown(),"l"===e&&t.lock(),"p"===e&&n.penalty(t),"n"===e&&d(o,n)}(e.key,m,u,i)};return m&&document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[m,u,i]);var p=Object(o.useState)(0),x=Object(s.a)(p,2),y=x[0],b=x[1];return Object(o.useEffect)((function(){var e=setInterval((function(){b((function(e){return e+1})),m&&(m.moveDown()||(m.lock(),w(d(i,u)),b(0),console.log("lock current piece and request for the next piece")))}),1e3);return function(){return clearInterval(e)}}),[m]),r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement("h3",null,y," seconds since mount"),r.a.createElement("canvas",{id:"canvas",ref:e,width:300,height:600,style:{border:"2px solid #000",marginTop:10}}))},m=function(e){return r.a.createElement(g,null)};n(14);var w=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(a.a,null,r.a.createElement(l,null),r.a.createElement(m,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,n){e.exports=n(19)}},[[8,1,2]]]);
//# sourceMappingURL=main.0bbf7586.chunk.js.map