var m_sTool={strColor:"rgba(255,255,255,1)",iLineWidth:3,bDraw:!1,iLastMouseX:0,iLastMouseY:0,iStopMouseX:0,iStopMouseY:0,iStartTimer:0},m_iLoopMsec=25,m_iBaseSize=320,m_elmCv,m_ctxCv,m_rectCv,m_aasLine=[],m_iFi=0,m_iLastDankaiPer=1,m_asShape=[],m_astrColor="000088 0000FF 008800 008888 0088FF 00FF00 00FF88 00FFFF 880000 880088 8800FF 888800 888888 8888FF 88FF00 88FF88 88FFFF FF0000 FF0088 FF00FF FF8800 FF8888 FF88FF FFFF00 FFFF88".split(" "),m_iColorMode=Math.floor(10*Math.random());
$(function(){for(var b=location.hostname,c=0,f=0;f<b.length;f++)c+=b.charCodeAt(f);805==c&&(m_elmCv=document.getElementById("elmCv"),m_ctxCv=m_elmCv.getContext("2d"),m_rectCv=m_elmCv.getBoundingClientRect(),m_elmCv.width=$(window).width(),m_elmCv.height=.8*$(window).height(),m_elmCv.addEventListener("mouseup",fnTouch,!0),m_elmCv.addEventListener("mousedown",fnTouch,!0),m_elmCv.addEventListener("mousemove",fnTouch,!0),m_elmCv.addEventListener("touchstart",fnTouch,!0),m_elmCv.addEventListener("touchend",
fnTouch,!0),m_elmCv.addEventListener("touchmove",fnTouch,!0),m_ctxCv.lineJoin="round",m_ctxCv.lineCap="round",fnLoop())});
function fnTouch(b){b.preventDefault();if(1=="ontouchend"in document){var c=Math.floor(b.touches[0].clientX);var f=Math.floor(b.touches[0].clientY)}else c=b.clientX,f=b.clientY;f-=m_rectCv.top;switch(b.type){case "mousedown":case "touchstart":m_sTool.iStartTimer=(new Date).getTime();fnDrawEnd(-.5);fnDrawStart(c,f);break;case "mouseup":case "touchend":fnDrawEnd(-.5);break;case "mousemove":case "touchmove":0!=m_sTool.bDraw&&(m_sTool.iStartTimer=(new Date).getTime(),10>Math.sqrt(Math.pow(m_sTool.iLastMouseX-
c,2)+Math.pow(m_sTool.iLastMouseY-f,2))||(m_sTool.iLastMouseX=c,m_sTool.iLastMouseY=f,b=m_aasLine.length-1,m_aasLine[b][m_aasLine[b].length]={iX:c,iY:f}))}}function fnDrawStart(b,c){1!=m_sTool.bDraw&&(m_sTool.bDraw=!0,m_sTool.iLastMouseX=b,m_sTool.iLastMouseY=c,m_aasLine[m_aasLine.length]=[])}
function fnDrawEnd(b){if(0!=m_sTool.bDraw){m_sTool.bDraw=!1;var c=m_aasLine.length-1;if(6>m_aasLine[c].length)m_aasLine.pop();else{for(var f=[],a=[],d=0,e=m_aasLine[c].length;d<e;d++)f[d]=m_aasLine[c][d].iX,a[d]=m_aasLine[c][d].iY;d=0;for(e=m_aasLine[c].length;d<e;d++)m_aasLine[c][d].iOldX=f[d],m_aasLine[c][d].iOldY=a[d];e=f[0];var h=f[0];for(d=0;d<f.length;d++)e=Math.min(e,f[d]),h=Math.max(h,f[d]);e+=.5*(h-e);for(d=0;d<f.length;d++)f[d]-=e;e=a[0];h=a[0];for(d=0;d<a.length;d++)e=Math.min(e,a[d]),
h=Math.max(h,a[d]);e+=.5*(h-e);for(d=0;d<a.length;d++)a[d]-=e;d=0;for(e=m_aasLine[c].length;d<e;d++)m_aasLine[c][d].iNewX=f[d]+.5*m_elmCv.width,m_aasLine[c][d].iNewY=a[d]+.5*m_elmCv.height;m_aasLine[c].iMorphPer=b;m_asShape[c]=[];m_asShape[c].aiX=[];m_asShape[c].aiY=[];d=0;for(e=m_aasLine[c].length;d<e;d++)m_asShape[c].aiX[d]=f[d],m_asShape[c].aiY[d]=a[d];m_asShape[c].strColor=m_astrColor[Math.floor(Math.random()*m_astrColor.length)];5>m_iColorMode&&0<c&&(m_asShape[c].strColor=m_asShape[0].strColor)}}}
function fnLoop(){m_sTool.bDraw&&m_sTool.iStopMouseX==m_sTool.iLastMouseX&&m_sTool.iStopMouseY==m_sTool.iLastMouseY&&3E3<(new Date).getTime()-m_sTool.iStartTimer&&(fnDrawEnd(0),fnDrawStart(m_sTool.iLastMouseX,m_sTool.iLastMouseY));m_sTool.iStopMouseX=m_sTool.iLastMouseX;m_sTool.iStopMouseY=m_sTool.iLastMouseY;for(var b=0,c=m_aasLine.length;b<c;b++)2<=m_aasLine[b].length&&2>=m_aasLine[b].iMorphPer&&(m_aasLine[b].iMorphPer+=m_iLoopMsec/25*.01);m_ctxCv.clearRect(0,0,m_elmCv.width,m_elmCv.height);m_iFi=
(m_iFi+1)%40;c=(m_iFi+1)/40;b=(Math.cos((1-c)*Math.PI)+1)/2;var f=b<m_iLastDankaiPer;m_iLastDankaiPer=b;var a=m_asShape.length;for(b=0;b<a;b++){var d=m_aasLine[b].iMorphPer;if(1<=d){d=[];d.aiX=[];d.aiY=[];for(var e=0,h=m_asShape[b].length;e<h;e++)d.aiX[e]=m_asShape[b].aiX[e],d.aiY[e]=m_asShape[b].aiY[e];d=m_elmCv.width/2;e=m_elmCv.height/2;m_elmCv.width>m_elmCv.height?d=m_elmCv.width/(a+1)*(b+1):e=m_elmCv.height/(a+1)*(b+1);clsEffect.sbDrawButterfly(m_ctxCv,d,e,"temp"+b,.3,m_asShape[b],30,3,.1,1,
1,"FFFFFF",m_asShape[b].strColor,30,90,100,10,5,!0,c,f,m_elmCv.width,m_elmCv.height,m_elmCv.width/m_iBaseSize)}}m_ctxCv.globalAlpha=1;m_ctxCv.strokeStyle=m_sTool.strColor;m_ctxCv.lineWidth=m_sTool.iLineWidth;b=0;for(c=m_aasLine.length;b<c;b++)d=m_aasLine[b].iMorphPer,0<=d&&1>=d&&(f=d,f=Math.max(0,f),f=Math.min(1,f),f=(Math.cos((1-f)*Math.PI)+1)/2,m_aasLine[b]=fnMorph(m_aasLine[b],"iX","iOldX","iNewX",f),m_aasLine[b]=fnMorph(m_aasLine[b],"iY","iOldY","iNewY",f)),1<=d&&2>=d&&(f=2-d,f=Math.max(0,f),
f=Math.min(1,f),m_ctxCv.globalAlpha=f),(!d||2>=d)&&fnDrawLine(m_ctxCv,m_aasLine[b]),1<=d&&2>=d&&(f=d-1,f=Math.max(0,f),f=Math.min(1,f),m_ctxCv.globalAlpha=f),1<=d&&2>=d&&(m_ctxCv.globalAlpha=1);setTimeout(fnLoop,m_iLoopMsec)}function fnDrawLine(b,c){if(2<=c.length){b.beginPath();for(var f=0,a=c.length;f<a;f++){var d=c[f].iX,e=c[f].iY;0==f?b.moveTo(d,e):b.lineTo(d,e)}b.stroke()}}function fnMorph(b,c,f,a,d){for(var e=0,h=b.length;e<h;e++)b[e][c]=b[e][f]+(b[e][a]-b[e][f])*d;return b}
var clsMorph=clsMorph||{};
clsMorph={fnGetMophPath:function(b,c,f){var a=[],d=[];if(c.aiX.length!=b.aiX.length||c.aiY.length!=b.aiY.length||c.aiX.length!=c.aiY.length||0==f)for(var e=0,h=b.aiX.length;e<h;e++)a[e]=b.aiX[e],d[e]=b.aiY[e];else if(1==f)for(e=0,h=c.aiX.length;e<h;e++)a[e]=c.aiX[e],d[e]=c.aiY[e];else for(e=0,h=b.aiX.length;e<h;e++)a[e]=b.aiX[e]+(c.aiX[e]-b.aiX[e])*f,d[e]=b.aiY[e]+(c.aiY[e]-b.aiY[e])*f;return{aiX:a,aiY:d}},fnRotate:function(b,c,f,a,d){if(0!=d%360){var e=Math.sqrt(Math.pow(f-b,2)+Math.pow(a-c,2));
a=Math.atan2(a-c,f-b)/(Math.PI/180);a+=d;f=b+Math.cos(a/180*Math.PI)*e;a=c+Math.sin(a/180*Math.PI)*e}return{iX:f,iY:a}},sbDrawBezierCurveSimple:function(b,c,f){b.beginPath();clsMorph.sbMoveToBezierCurveTo(b,c.aiX,c.aiY)},sbMoveToBezierCurveTo:function(b,c,f){var a=c.length;if(0<a){b.moveTo(c[0],f[0]);for(var d=1;d<a;d++)b.lineTo(c[d],f[d])}}};var clsEffect=clsEffect||{};
clsEffect={bButterflyInit:!1,abButterflyTracking:null,abButterflyHolding:null,abButterflyInit:null,aiButterflyX0:null,aiButterflyY0:null,aiButterflyZ0:null,aiButterflyA0:null,aiButterflyX1:null,aiButterflyY1:null,aiButterflyZ1:null,aiButterflyA1:null,aaiButterflyParticleX:null,aaiButterflyParticleY:null,aiButterflyParticleCnt:0,End:null,sbDrawButterfly:function(b,c,f,a,d,e,h,A,w,m,k,B,x,g,u,n,l,q,y,v,t,p,r,z){m=Number(m);k=Number(k);g=Number(g);clsEffect.bButterflyInit||(clsEffect.abButterflyTracking=
[],clsEffect.abButterflyHolding=[],clsEffect.aiButterflyX0=[],clsEffect.aiButterflyY0=[],clsEffect.aiButterflyZ0=[],clsEffect.aiButterflyA0=[],clsEffect.aiButterflyX1=[],clsEffect.aiButterflyY1=[],clsEffect.aiButterflyZ1=[],clsEffect.aiButterflyA1=[],clsEffect.aaiButterflyParticleX=[],clsEffect.aaiButterflyParticleY=[],clsEffect.aiButterflyParticleCnt=[],clsEffect.abButterflyInit=[],clsEffect.bButterflyInit=!0);clsEffect.abButterflyInit[a]||(clsEffect.abButterflyTracking[a]=!1,clsEffect.abButterflyHolding[a]=
!1,clsEffect.aiButterflyX0[a]=.5*p,clsEffect.aiButterflyY0[a]=.5*r,clsEffect.aiButterflyZ0[a]=1,clsEffect.aiButterflyA0[a]=90,clsEffect.aiButterflyX1[a]=clsEffect.aiButterflyX0[a],clsEffect.aiButterflyY1[a]=clsEffect.aiButterflyY0[a],clsEffect.aiButterflyZ1[a]=clsEffect.aiButterflyZ0[a],clsEffect.aiButterflyA1[a]=clsEffect.aiButterflyA0[a],clsEffect.aaiButterflyParticleX[a]=[],clsEffect.aaiButterflyParticleY[a]=[],clsEffect.aiButterflyParticleCnt[a]=0,clsEffect.abButterflyInit[a]=!0);t&&(0<=d&&(clsEffect.abButterflyTracking[a]=
Math.random()<d),clsEffect.aiButterflyX1[a]=Math.floor((3*Math.random()-1)*p),clsEffect.aiButterflyY1[a]=Math.floor((3*Math.random()-1)*r),clsEffect.aiButterflyZ1[a]=Math.floor(Math.random()*(k-m)+m),clsEffect.aiButterflyA1[a]=Math.atan2(clsEffect.aiButterflyY0[a]-clsEffect.aiButterflyY1[a],clsEffect.aiButterflyX0[a]-clsEffect.aiButterflyX1[a])/(Math.PI/180));clsEffect.abButterflyTracking[a]?(clsEffect.aiButterflyX1[a]=c,clsEffect.aiButterflyY1[a]=f,clsEffect.aiButterflyZ1[a]=m):clsEffect.abButterflyHolding[a]=
!1;clsEffect.abButterflyHolding[a]&&(clsEffect.aiButterflyX0[a]=c,clsEffect.aiButterflyY0[a]=f,clsEffect.aiButterflyZ0[a]=m);k=(Math.cos((1-v)*Math.PI)+1)/2;t=4*v;d=clsEffect.aiButterflyX0[a]+(clsEffect.aiButterflyX1[a]-clsEffect.aiButterflyX0[a])*k;m=clsEffect.aiButterflyY0[a]+(clsEffect.aiButterflyY1[a]-clsEffect.aiButterflyY0[a])*k;k=clsEffect.aiButterflyZ0[a]+(clsEffect.aiButterflyZ1[a]-clsEffect.aiButterflyZ0[a])*k;t=clsEffect.aiButterflyA0[a]+(Math.cos((1-(1<t?1:t))*Math.PI)+1)/2*(clsEffect.aiButterflyA1[a]-
clsEffect.aiButterflyA0[a]);p=0;y&&(u=t+(Math.random()-.5)*u,n=Math.random()*n*k*z,clsEffect.aaiButterflyParticleX[a][clsEffect.aiButterflyParticleCnt[a]]=d+Math.cos(u/180*Math.PI)*n,clsEffect.aaiButterflyParticleY[a][clsEffect.aiButterflyParticleCnt[a]]=m+Math.sin(u/180*Math.PI)*n,p=clsEffect.aaiButterflyParticleX[a].length);clsEffect.abButterflyTracking[a]&&Math.floor(d/10)==Math.floor(c/10)&&Math.floor(m/10)==Math.floor(f/10)&&(clsEffect.abButterflyHolding[a]=!0);if(1<p)for(c=0;c<p;c++)for(n=(p+
(clsEffect.aiButterflyParticleCnt[a]-c))%p,f=clsEffect.aaiButterflyParticleX[a][n],n=clsEffect.aaiButterflyParticleY[a][n],u=(p-c+1)/(p+1),y=Math.random()/2+.5,r=0;2>r;r++){var C=(0==r?l:q)*u*k*z*y;b.beginPath();b.moveTo(f+C/2,n);b.arc(f,n,C/2,0,2*Math.PI,!1);b.closePath();b.fillStyle=0==r?"#"+x:"#"+B;b.globalAlpha=0==r?w:1;b.fill()}clsEffect.aiButterflyParticleCnt[a]=(clsEffect.aiButterflyParticleCnt[a]+1)%g;l=(Math.cos(v*(clsEffect.abButterflyHolding[a]?1:4)*2*Math.PI)+1)/2;l=.8*l+.2;g=[[]];g[0].aiX=
[];g[0].aiY=[];for(c=0;c<e.aiX.length;c++)g[0].aiX[c]=e.aiX[c]*l,g[0].aiY[c]=e.aiY[c];for(e=0;e<g.length;e++)for(c=0,l=g[e].aiX.length;c<l;c++)q=clsMorph.fnRotate(0,0,g[e].aiX[c],g[e].aiY[c],t+270),g[e].aiX[c]=q.iX,g[e].aiY[c]=q.iY,g[e].aiX[c]*=k,g[e].aiY[c]*=k,g[e].aiX[c]+=d,g[e].aiY[c]+=m;for(l=0;2>l;l++)for(e=0;e<g.length;e++)if(clsMorph.sbDrawBezierCurveSimple(b,g[e],!0),1==l)b.fillStyle="#"+B,b.globalAlpha=1,b.fill(),b.fillStyle="#"+x,b.globalAlpha=w,b.fill();else for(q=0;q<A;q++)b.lineWidth=
(h-h/A*q)*z,b.strokeStyle="#"+x,b.globalAlpha=w,b.stroke();1<=v&&(clsEffect.aiButterflyA0[a]=clsEffect.aiButterflyA1[a],clsEffect.aiButterflyX0[a]=clsEffect.aiButterflyX1[a],clsEffect.aiButterflyY0[a]=clsEffect.aiButterflyY1[a],clsEffect.aiButterflyZ0[a]=clsEffect.aiButterflyZ1[a])}};