var m_sTool={strColor:"#00aad4",iLineWidth:2,bDraw:!1,iLastMouseX:0,iLastMouseY:0,iStopMouseX:0,iStopMouseY:0,iStartTimer:0},m_iLoopMsec=25,m_elmCv,m_ctxCv,m_rectCv,m_iWw,m_iWh,m_engineMatter,m_asLine=[];
$(function(){for(var a=location.hostname,c=0,b=0;b<a.length;b++)c+=a.charCodeAt(b);805==c&&(m_iWw=$(window).width(),m_iWh=.8*$(window).height(),$("#grp").width(m_iWw),$("#grp").height(m_iWh),m_elmCv=document.getElementById("elmCv"),m_ctxCv=m_elmCv.getContext("2d"),m_rectCv=m_elmCv.getBoundingClientRect(),m_elmCv.width=m_iWw,m_elmCv.height=m_iWh,m_elmCv.addEventListener("mouseup",fnTouch,!0),m_elmCv.addEventListener("mousedown",fnTouch,!0),m_elmCv.addEventListener("mousemove",fnTouch,!0),m_elmCv.addEventListener("touchstart",
fnTouch,!0),m_elmCv.addEventListener("touchend",fnTouch,!0),m_elmCv.addEventListener("touchmove",fnTouch,!0),m_ctxCv.strokeStyle=m_sTool.strColor,m_ctxCv.lineWidth=m_sTool.iLineWidth,m_ctxCv.lineJoin="round",m_ctxCv.lineCap="round",m_engineMatter=Matter.Engine.create(document.getElementById("elm3d"),{render:{options:{wireframes:!1,width:m_iWw,height:m_iWh,background:"#FFFFFF"}}}),Matter.World.add(m_engineMatter.world,[Matter.Bodies.rectangle(.5*m_iWw,m_iWh,m_iWw,10,{isStatic:!0})]),Matter.Engine.run(m_engineMatter),
fnLoop())});
function fnTouch(a){a.preventDefault();if(1=="ontouchend"in document){var c=Math.floor(a.touches[0].clientX);var b=Math.floor(a.touches[0].clientY)}else c=a.clientX,b=a.clientY;b-=m_rectCv.top;switch(a.type){case "mousedown":case "touchstart":m_sTool.iStartTimer=(new Date).getTime();fnDrawEnd();fnDrawStart(c,b);break;case "mouseup":case "touchend":fnDrawEnd();break;case "mousemove":case "touchmove":0!=m_sTool.bDraw&&(m_sTool.iStartTimer=(new Date).getTime(),10>Math.sqrt(Math.pow(m_sTool.iLastMouseX-c,
2)+Math.pow(m_sTool.iLastMouseY-b,2))||(m_sTool.iLastMouseX=c,m_sTool.iLastMouseY=b,a=m_asLine.length,m_asLine[a]={iX:c,iY:b},400<a&&fnDrawEnd()))}}function fnDrawStart(a,c){1!=m_sTool.bDraw&&(m_sTool.bDraw=!0,m_sTool.iLastMouseX=a,m_sTool.iLastMouseY=c,m_asLine=[])}
function fnDrawEnd(){if(0!=m_sTool.bDraw){m_sTool.bDraw=!1;50<m_asLine.length&&(m_asLine=fnAdjustShapePointCount(m_asLine,50));if(2<m_asLine.length){for(var a=m_asLine[0].iX,c=m_asLine[0].iY,b=m_asLine[0].iX,f=m_asLine[0].iY,d=0,e=m_asLine.length;d<e;d++)a=Math.min(a,m_asLine[d].iX),c=Math.min(c,m_asLine[d].iY),b=Math.max(b,m_asLine[d].iX),f=Math.max(f,m_asLine[d].iY);d=[];e=0;for(var g=m_asLine.length;e<g;e++)d[e]={x:Math.floor(m_asLine[e].iX-a),y:Math.floor(m_asLine[e].iY-c)};d=Matter.Vertices.create(d);
Matter.World.add(m_engineMatter.world,Matter.Bodies.fromVertices(Math.floor(a+.5*(b-a)),Math.floor(c+.5*(f-c)),d,{render:{fillStyle:"#00aad4",strokeStyle:"#00aad4",lineWidth:1}},!0))}m_asLine=[]}}
function fnLoop(){m_sTool.bDraw?m_sTool.iStopMouseX==m_sTool.iLastMouseX&&m_sTool.iStopMouseY==m_sTool.iLastMouseY&&2E3<(new Date).getTime()-m_sTool.iStartTimer&&fnDrawEnd():m_asLine=[];m_sTool.iStopMouseX=m_sTool.iLastMouseX;m_sTool.iStopMouseY=m_sTool.iLastMouseY;m_ctxCv.clearRect(0,0,m_elmCv.width,m_elmCv.height);m_sTool.bDraw&&fnDrawLine(m_ctxCv,m_asLine);setTimeout(fnLoop,m_iLoopMsec)}
function fnDrawLine(a,c){if(2<=c.length){a.beginPath();for(var b=0,f=c.length;b<f;b++){var d=c[b].iX,e=c[b].iY;0==b?a.moveTo(d,e):a.lineTo(d,e)}a.stroke()}}
function fnAdjustShapePointCount(a,c){var b=0;for(iOldIdx=0;iOldIdx<a.length-1;iOldIdx++){var f=Math.sqrt(Math.pow(a[iOldIdx+1].iX-a[iOldIdx].iX,2)+Math.pow(a[iOldIdx+1].iY-a[iOldIdx].iY,2));b+=f}var d=b/(c-1),e=[],g=0;for(iOldIdx=b=0;iOldIdx<a.length-1;iOldIdx++){f=Math.sqrt(Math.pow(a[iOldIdx+1].iX-a[iOldIdx].iX,2)+Math.pow(a[iOldIdx+1].iY-a[iOldIdx].iY,2));b+=f;for(iIdx=g;iIdx*d<b;iIdx++){var h=(iIdx-g)*d/f;e[iIdx]={iX:a[iOldIdx].iX+(a[iOldIdx+1].iX-a[iOldIdx].iX)*h,iY:a[iOldIdx].iY+(a[iOldIdx+
1].iY-a[iOldIdx].iY)*h}}g=iIdx}e[c-1]={iX:a[a.length-1].iX,iY:a[a.length-1].iY};return e};
