function fnCreateXMLHttp(){
	if(window.ActiveXObject){
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				return new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e2) {
				return null;
	 		}
	 	}
	} else if(window.XMLHttpRequest){
		return new XMLHttpRequest();
	} else {
		return null;
	}
}
m_strGetRemoteScript = new Array();
function fnGetRemoteScript(strURL,strGet,strElm,iType){
	//Cache 
	var dNow = new Date();
	var strRequest = strURL + '?time=' + dNow.getTime();
	var strNewHtml;
	
	//Adjust Request
	if (strGet != '') {
		strRequest = strRequest + '&' + strGet;
	}
	
	//Create Object
	var xmlhttp = fnCreateXMLHttp();
	
	//
	if (xmlhttp) {
		xmlhttp.open('GET', strRequest);
		if (iType == 1) {
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					strNewHtml = UnescapeEUCJP(xmlhttp.responseText);
					if (m_strGetRemoteScript[strElm] != strNewHtml) {
						document.getElementById(strElm).value = strNewHtml;
					}
					m_strGetRemoteScript[strElm] = strNewHtml;
				}
			}
		} else {
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					strNewHtml = UnescapeEUCJP(xmlhttp.responseText);
					if (m_strGetRemoteScript[strElm] != strNewHtml) {
						document.getElementById(strElm).innerHTML = strNewHtml;
					}
					m_strGetRemoteScript[strElm] = strNewHtml;
				}
			}
		}
		xmlhttp.send(null);
	}
}
