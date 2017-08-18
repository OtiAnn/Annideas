$().ready(function(){function t(t,e,i){l.push(t),u.push(e),f.push(i),g.push(v)}function e(){o.fillStyle="#ffffff",o.fillRect(0,0,a,h),r.width=r.width}function i(){e();var t=5;o.lineJoin="round",o.lineWidth=t;for(var i=0;i<l.length;i++)o.beginPath(),f[i]&&i?o.moveTo(l[i-1],u[i-1]):o.moveTo(l[i]-1,u[i]),o.lineTo(l[i],u[i]),o.closePath(),o.strokeStyle=g[i],o.stroke()}function n(t,e){var i=t.getBoundingClientRect();return{x:e.touches[0].clientX-i.left,y:e.touches[0].clientY-i.top}}var o,s=document.getElementById("canvasDiv"),r=document.createElement("canvas"),a=300,h=300,c=!1,l=[],u=[],f=[],d="#334455",p="#659b41",_="#ffcf33",m="#986928",v=d,g=[];r.setAttribute("width",a),r.setAttribute("height",h),r.setAttribute("id","canvas"),s.appendChild(r),"undefined"!=typeof G_vmlCanvasManager&&(r=G_vmlCanvasManager.initElement(r)),o=r.getContext("2d"),$("#canvas").mousedown(function(e){e.pageX-this.offsetLeft,e.pageY-this.offsetTop;c=!0,t(e.pageX-this.offsetLeft,e.pageY-this.offsetTop),i()}),$("#canvas").mousemove(function(e){c&&(t(e.pageX-this.offsetLeft,e.pageY-this.offsetTop,!0),i())}),$("#canvas").mouseup(function(t){c=!1,i()}),$("#canvas").mouseleave(function(t){c=!1}),$("#choosePurple").mousedown(function(t){v=colorPurple}),$("#chooseGreen").mousedown(function(t){v=p}),$("#chooseYellow").mousedown(function(t){v=_}),$("#chooseBrown").mousedown(function(t){v=m}),$("#clearCanvas").mousedown(function(t){l=[],u=[],f=[],g=[],e()}),r.addEventListener("touchstart",function(t){mousePos=n(r,t);var e=t.touches[0],i=new MouseEvent("mousedown",{clientX:e.clientX,clientY:e.clientY});r.dispatchEvent(i)},!1),r.addEventListener("touchend",function(t){var e=new MouseEvent("mouseup",{});r.dispatchEvent(e)},!1),r.addEventListener("touchmove",function(t){var e=t.touches[0],i=new MouseEvent("mousemove",{clientX:e.clientX,clientY:e.clientY});r.dispatchEvent(i)},!1),document.body.addEventListener("touchstart",function(t){t.target==r&&t.preventDefault()},!1),document.body.addEventListener("touchend",function(t){t.target==r&&t.preventDefault()},!1),document.body.addEventListener("touchmove",function(t){t.target==r&&t.preventDefault()},!1)}),
// Copyright 2006 Google Inc.
document.createElement("canvas").getContext||!function(){function t(){return this.context_||(this.context_=new c(this))}function e(t,e,i){var n=S.call(arguments,2);return function(){return t.apply(e,n.concat(S.call(arguments)))}}function i(t){var e=t.srcElement;switch(t.propertyName){case"width":e.style.width=e.attributes.width.nodeValue+"px",e.getContext().clearRect();break;case"height":e.style.height=e.attributes.height.nodeValue+"px",e.getContext().clearRect()}}function n(t){var e=t.srcElement;e.firstChild&&(e.firstChild.style.width=e.clientWidth+"px",e.firstChild.style.height=e.clientHeight+"px")}function o(){return[[1,0,0],[0,1,0],[0,0,1]]}function s(t,e){for(var i=o(),n=0;3>n;n++)for(var s=0;3>s;s++){for(var r=0,a=0;3>a;a++)r+=t[n][a]*e[a][s];i[n][s]=r}return i}function r(t,e){e.fillStyle=t.fillStyle,e.lineCap=t.lineCap,e.lineJoin=t.lineJoin,e.lineWidth=t.lineWidth,e.miterLimit=t.miterLimit,e.shadowBlur=t.shadowBlur,e.shadowColor=t.shadowColor,e.shadowOffsetX=t.shadowOffsetX,e.shadowOffsetY=t.shadowOffsetY,e.strokeStyle=t.strokeStyle,e.globalAlpha=t.globalAlpha,e.arcScaleX_=t.arcScaleX_,e.arcScaleY_=t.arcScaleY_,e.lineScale_=t.lineScale_}function a(t){var e,i=1;if(t=String(t),"rgb"==t.substring(0,3)){var n=t.indexOf("(",3),o=t.indexOf(")",n+1),s=t.substring(n+1,o).split(",");e="#";for(var r=0;3>r;r++)e+=T[Number(s[r])];4==s.length&&"a"==t.substr(3,1)&&(i=s[3])}else e=t;return{color:e,alpha:i}}function h(t){switch(t){case"butt":return"flat";case"round":return"round";case"square":default:return"square"}}function c(t){this.m_=o(),this.mStack_=[],this.aStack_=[],this.currentPath_=[],this.strokeStyle="#000",this.fillStyle="#000",this.lineWidth=1,this.lineJoin="miter",this.lineCap="butt",this.miterLimit=1*w,this.globalAlpha=1,this.canvas=t;var e=t.ownerDocument.createElement("div");e.style.width=t.clientWidth+"px",e.style.height=t.clientHeight+"px",e.style.overflow="hidden",e.style.position="absolute",t.appendChild(e),this.element_=e,this.arcScaleX_=1,this.arcScaleY_=1,this.lineScale_=1}function l(t,e,i,n){t.currentPath_.push({type:"bezierCurveTo",cp1x:e.x,cp1y:e.y,cp2x:i.x,cp2y:i.y,x:n.x,y:n.y}),t.currentX_=n.x,t.currentY_=n.y}function u(t){for(var e=0;3>e;e++)for(var i=0;2>i;i++)if(!isFinite(t[e][i])||isNaN(t[e][i]))return!1;return!0}function f(t,e,i){if(u(e)&&(t.m_=e,i)){var n=e[0][0]*e[1][1]-e[0][1]*e[1][0];t.lineScale_=x(y(n))}}function d(t){this.type_=t,this.x0_=0,this.y0_=0,this.r0_=0,this.x1_=0,this.y1_=0,this.r1_=0,this.colors_=[]}function p(){}var _=Math,m=_.round,v=_.sin,g=_.cos,y=_.abs,x=_.sqrt,w=10,C=w/2,S=Array.prototype.slice,b={init:function(t){if(/MSIE/.test(navigator.userAgent)&&!window.opera){var i=t||document;i.createElement("canvas"),i.attachEvent("onreadystatechange",e(this.init_,this,i))}},init_:function(t){if(t.namespaces.g_vml_||t.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml","#default#VML"),t.namespaces.g_o_||t.namespaces.add("g_o_","urn:schemas-microsoft-com:office:office","#default#VML"),!t.styleSheets.ex_canvas_){var e=t.createStyleSheet();e.owningElement.id="ex_canvas_",e.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"}for(var i=t.getElementsByTagName("canvas"),n=0;n<i.length;n++)this.initElement(i[n])},initElement:function(e){if(!e.getContext){e.getContext=t,e.innerHTML="",e.attachEvent("onpropertychange",i),e.attachEvent("onresize",n);var o=e.attributes;o.width&&o.width.specified?e.style.width=o.width.nodeValue+"px":e.width=e.clientWidth,o.height&&o.height.specified?e.style.height=o.height.nodeValue+"px":e.height=e.clientHeight}return e}};b.init();for(var T=[],E=0;16>E;E++)for(var M=0;16>M;M++)T[16*E+M]=E.toString(16)+M.toString(16);var k=c.prototype;k.clearRect=function(){this.element_.innerHTML=""},k.beginPath=function(){this.currentPath_=[]},k.moveTo=function(t,e){var i=this.getCoords_(t,e);this.currentPath_.push({type:"moveTo",x:i.x,y:i.y}),this.currentX_=i.x,this.currentY_=i.y},k.lineTo=function(t,e){var i=this.getCoords_(t,e);this.currentPath_.push({type:"lineTo",x:i.x,y:i.y}),this.currentX_=i.x,this.currentY_=i.y},k.bezierCurveTo=function(t,e,i,n,o,s){var r=this.getCoords_(o,s),a=this.getCoords_(t,e),h=this.getCoords_(i,n);l(this,a,h,r)},k.quadraticCurveTo=function(t,e,i,n){var o=this.getCoords_(t,e),s=this.getCoords_(i,n),r={x:this.currentX_+2/3*(o.x-this.currentX_),y:this.currentY_+2/3*(o.y-this.currentY_)},a={x:r.x+(s.x-this.currentX_)/3,y:r.y+(s.y-this.currentY_)/3};l(this,r,a,s)},k.arc=function(t,e,i,n,o,s){i*=w;var r=s?"at":"wa",a=t+g(n)*i-C,h=e+v(n)*i-C,c=t+g(o)*i-C,l=e+v(o)*i-C;a!=c||s||(a+=.125);var u=this.getCoords_(t,e),f=this.getCoords_(a,h),d=this.getCoords_(c,l);this.currentPath_.push({type:r,x:u.x,y:u.y,radius:i,xStart:f.x,yStart:f.y,xEnd:d.x,yEnd:d.y})},k.rect=function(t,e,i,n){this.moveTo(t,e),this.lineTo(t+i,e),this.lineTo(t+i,e+n),this.lineTo(t,e+n),this.closePath()},k.strokeRect=function(t,e,i,n){var o=this.currentPath_;this.beginPath(),this.moveTo(t,e),this.lineTo(t+i,e),this.lineTo(t+i,e+n),this.lineTo(t,e+n),this.closePath(),this.stroke(),this.currentPath_=o},k.fillRect=function(t,e,i,n){var o=this.currentPath_;this.beginPath(),this.moveTo(t,e),this.lineTo(t+i,e),this.lineTo(t+i,e+n),this.lineTo(t,e+n),this.closePath(),this.fill(),this.currentPath_=o},k.createLinearGradient=function(t,e,i,n){var o=new d("gradient");return o.x0_=t,o.y0_=e,o.x1_=i,o.y1_=n,o},k.createRadialGradient=function(t,e,i,n,o,s){var r=new d("gradientradial");return r.x0_=t,r.y0_=e,r.r0_=i,r.x1_=n,r.y1_=o,r.r1_=s,r},k.drawImage=function(t,e){var i,n,o,s,r,a,h,c,l=t.runtimeStyle.width,u=t.runtimeStyle.height;t.runtimeStyle.width="auto",t.runtimeStyle.height="auto";var f=t.width,d=t.height;if(t.runtimeStyle.width=l,t.runtimeStyle.height=u,3==arguments.length)i=arguments[1],n=arguments[2],r=a=0,h=o=f,c=s=d;else if(5==arguments.length)i=arguments[1],n=arguments[2],o=arguments[3],s=arguments[4],r=a=0,h=f,c=d;else{if(9!=arguments.length)throw Error("Invalid number of arguments");r=arguments[1],a=arguments[2],h=arguments[3],c=arguments[4],i=arguments[5],n=arguments[6],o=arguments[7],s=arguments[8]}var p=this.getCoords_(i,n),v=[],g=10,y=10;if(v.push(" <g_vml_:group",' coordsize="',w*g,",",w*y,'"',' coordorigin="0,0"',' style="width:',g,"px;height:",y,"px;position:absolute;"),1!=this.m_[0][0]||this.m_[0][1]){var x=[];x.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",m(p.x/w),",","Dy=",m(p.y/w),"");var C=p,S=this.getCoords_(i+o,n),b=this.getCoords_(i,n+s),T=this.getCoords_(i+o,n+s);C.x=_.max(C.x,S.x,b.x,T.x),C.y=_.max(C.y,S.y,b.y,T.y),v.push("padding:0 ",m(C.x/w),"px ",m(C.y/w),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",x.join(""),", sizingmethod='clip');")}else v.push("top:",m(p.y/w),"px;left:",m(p.x/w),"px;");v.push(' ">','<g_vml_:image src="',t.src,'"',' style="width:',w*o,"px;"," height:",w*s,'px;"',' cropleft="',r/f,'"',' croptop="',a/d,'"',' cropright="',(f-r-h)/f,'"',' cropbottom="',(d-a-c)/d,'"'," />","</g_vml_:group>"),this.element_.insertAdjacentHTML("BeforeEnd",v.join(""))},k.stroke=function(t){var e=[],i=a(t?this.fillStyle:this.strokeStyle),n=i.color,o=i.alpha*this.globalAlpha,s=10,r=10;e.push("<g_vml_:shape",' filled="',!!t,'"',' style="position:absolute;width:',s,"px;height:",r,'px;"',' coordorigin="0 0" coordsize="',w*s," ",w*r,'"',' stroked="',!t,'"',' path="');for(var c={x:null,y:null},l={x:null,y:null},u=0;u<this.currentPath_.length;u++){var f,d=this.currentPath_[u];switch(d.type){case"moveTo":f=d,e.push(" m ",m(d.x),",",m(d.y));break;case"lineTo":e.push(" l ",m(d.x),",",m(d.y));break;case"close":e.push(" x "),d=null;break;case"bezierCurveTo":e.push(" c ",m(d.cp1x),",",m(d.cp1y),",",m(d.cp2x),",",m(d.cp2y),",",m(d.x),",",m(d.y));break;case"at":case"wa":e.push(" ",d.type," ",m(d.x-this.arcScaleX_*d.radius),",",m(d.y-this.arcScaleY_*d.radius)," ",m(d.x+this.arcScaleX_*d.radius),",",m(d.y+this.arcScaleY_*d.radius)," ",m(d.xStart),",",m(d.yStart)," ",m(d.xEnd),",",m(d.yEnd))}d&&((null==c.x||d.x<c.x)&&(c.x=d.x),(null==l.x||d.x>l.x)&&(l.x=d.x),(null==c.y||d.y<c.y)&&(c.y=d.y),(null==l.y||d.y>l.y)&&(l.y=d.y))}if(e.push(' ">'),t)if("object"==typeof this.fillStyle){var p=this.fillStyle,v=0,g={x:0,y:0},y=0,x=1;if("gradient"==p.type_){var C=p.x0_/this.arcScaleX_,S=p.y0_/this.arcScaleY_,b=p.x1_/this.arcScaleX_,T=p.y1_/this.arcScaleY_,E=this.getCoords_(C,S),M=this.getCoords_(b,T),k=M.x-E.x,P=M.y-E.y;v=180*Math.atan2(k,P)/Math.PI,0>v&&(v+=360),1e-6>v&&(v=0)}else{var E=this.getCoords_(p.x0_,p.y0_),X=l.x-c.x,Y=l.y-c.y;g={x:(E.x-c.x)/X,y:(E.y-c.y)/Y},X/=this.arcScaleX_*w,Y/=this.arcScaleY_*w;var $=_.max(X,Y);y=2*p.r0_/$,x=2*p.r1_/$-y}var L=p.colors_;L.sort(function(t,e){return t.offset-e.offset});for(var A=L.length,D=L[0].color,R=L[A-1].color,j=L[0].alpha*this.globalAlpha,V=L[A-1].alpha*this.globalAlpha,W=[],u=0;A>u;u++){var z=L[u];W.push(z.offset*x+y+" "+z.color)}e.push('<g_vml_:fill type="',p.type_,'"',' method="none" focus="100%"',' color="',D,'"',' color2="',R,'"',' colors="',W.join(","),'"',' opacity="',V,'"',' g_o_:opacity2="',j,'"',' angle="',v,'"',' focusposition="',g.x,",",g.y,'" />')}else e.push('<g_vml_:fill color="',n,'" opacity="',o,'" />');else{var B=this.lineScale_*this.lineWidth;1>B&&(o*=B),e.push("<g_vml_:stroke",' opacity="',o,'"',' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',h(this.lineCap),'"',' weight="',B,'px"',' color="',n,'" />')}e.push("</g_vml_:shape>"),this.element_.insertAdjacentHTML("beforeEnd",e.join(""))},k.fill=function(){this.stroke(!0)},k.closePath=function(){this.currentPath_.push({type:"close"})},k.getCoords_=function(t,e){var i=this.m_;return{x:w*(t*i[0][0]+e*i[1][0]+i[2][0])-C,y:w*(t*i[0][1]+e*i[1][1]+i[2][1])-C}},k.save=function(){var t={};r(this,t),this.aStack_.push(t),this.mStack_.push(this.m_),this.m_=s(o(),this.m_)},k.restore=function(){r(this.aStack_.pop(),this),this.m_=this.mStack_.pop()},k.translate=function(t,e){var i=[[1,0,0],[0,1,0],[t,e,1]];f(this,s(i,this.m_),!1)},k.rotate=function(t){var e=g(t),i=v(t),n=[[e,i,0],[-i,e,0],[0,0,1]];f(this,s(n,this.m_),!1)},k.scale=function(t,e){this.arcScaleX_*=t,this.arcScaleY_*=e;var i=[[t,0,0],[0,e,0],[0,0,1]];f(this,s(i,this.m_),!0)},k.transform=function(t,e,i,n,o,r){var a=[[t,e,0],[i,n,0],[o,r,1]];f(this,s(a,this.m_),!0)},k.setTransform=function(t,e,i,n,o,s){var r=[[t,e,0],[i,n,0],[o,s,1]];f(this,r,!0)},k.clip=function(){},k.arcTo=function(){},k.createPattern=function(){return new p},d.prototype.addColorStop=function(t,e){e=a(e),this.colors_.push({offset:t,color:e.color,alpha:e.alpha})},G_vmlCanvasManager=b,CanvasRenderingContext2D=c,CanvasGradient=d,CanvasPattern=p}();var showMenu=function(){$("body").addClass("stop-scrolling"),$("body").bind("touchmove",function(t){t.preventDefault()}),$("nav").addClass("is-open"),$(".mask").addClass("is-open")},hideMenu=function(){$("body").removeClass("stop-scrolling"),$("body").unbind("touchmove"),$("nav").removeClass("is-open"),$(".mask").removeClass("is-open")},menuControl=function(){$("[data-show-menu]").click(function(){showMenu()}),$("[data-hide-menu]").click(function(){hideMenu()})};$().ready(function(){menuControl()});var titleControl=function(){var t=["\u6709\u4e9b\u4e8b\u60c5\u9084\u4e0d\u505a \u4f60\u7684\u7406\u7531 \u6703\u662f\u4ec0\u9ebc\uff1f","\u706b\u7bad\u767c\u5c04\uff0c\u8f5f\u9686\u9686\u9686\uff5e","\u518d\u5403\u4e00\u9846\u860b\u679c\u3002","\u6211\u4e0d\u8f49\u5f4e \u6211\u4e0d\u8f49\u5f4e \u6211\u4e0d\u8f49\u5f4e \u6211\u4e0d\u8f49\u5f4e","\u55ef\u55ef \u642d\u5566 \u6211\u53c8 \u5fd8\u4e86","\u55ef\u55ef \u642d\u62c9 \u60f3\u8d77 \u4f86\u4e86","\u6211\u4e0d\u662f\u982d\u8166\u7a7a\u7a7a","\u6211\u4e0d\u662f\u4e00\u96bb\u7c73\u87f2","\u4f60\u8aaa\u90a3 C \u548c\u5f26\u5c31\u662f Do Mi So"],e=Math.floor(Math.random()*t.length);$(".title_block .desc").text(t[e])};$().ready(function(){titleControl()});