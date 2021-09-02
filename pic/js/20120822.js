// ********** Common
var m_dStart;
var m_bFocus = 0;

// ********** Const
var m_iAnimeSt = 0;

// ********** Draw
var m_elmPn;
var m_strText;

var m_iAnime;
var m_timAnime;
var m_strDefine;
var m_astrryaku = new Array();
var m_iCntBox = 0;

var m_strReq = '';

var m_strAmaKey = '';

window.onload = sbInit;

function sbInit() {
	// Create NameBox
	m_elmPn = document.getElementById('ryaku_pn');
	
//20120822
	// Get Param
	var astrParam = [];
	astrParam = sbGetParam();
	var strReq = '';
	if ('n' in astrParam) {
		strReq = decodeURI(astrParam['n']);
		if (strReq != '') {
			strReq = strReq.replace(/,/g,"\n");
			document.getElementById('ryaku_req').value = strReq;
			document.getElementById('ryaku_res').value = '';
			sbSend();
		}
	}
	
	// Disable Desc
	sbNoneDesc();
//20120822
	
	// Start Timer
	m_timAnime = setInterval('sbAnime()',500);
}

function sbAnime() {
	var iIdx;
	var iIdx2;
	var astrDefine = new Array();
	var strDefine;
	var astrCell = new Array();
	var astrAmaKey = new Array();
	strDefine = '' + document.getElementById('ryaku_res').value;
	
	// Start Animation
	if (strDefine != '' && strDefine != m_strDefine) {
		m_iAnime = m_iAnimeSt;
		m_strDefine = strDefine;
		
		// Init
		astrDefine = strDefine.split('~');
		document.getElementById('ryaku_alert').innerHTML = '';
		document.getElementById('ryaku_alert').style.display = 'none';
		if (astrDefine[1] != '') {
			document.getElementById('ryaku_alert').innerHTML = '<span class="info">' + astrDefine[1] + '</span>';
		}
		m_astrryaku = astrDefine[2].split(',');
		
		m_iCntBox = m_astrryaku.length;
		
		// ********** Time
		if (m_bFocus == 0) {
			document.getElementById('ryaku_wait').style.display = 'none';
			document.getElementById('ryaku_all').style.display = 'block';
//20120822
//			document.getElementById('ryaku_req').focus();
//20120822
			m_bFocus = 1;
		}
		m_dStart = new Date();
	}
	
	if (m_iAnime >= 0 && m_iAnime < m_iCntBox) {
		strHtml = '';
		if (m_iCntBox > 1) {
			strHtml += '<table summary="Input Table" class="mn" id="ryaku_msg">';
			strHtml += '<tr><th class="gmryaku1"></th><th class="gmryaku2">' + m_astrryaku[0] + '</th></tr>';
			for (iIdx = m_iCntBox - m_iAnime; iIdx < m_iCntBox; iIdx++) {
				astrCell = (m_astrryaku[iIdx] + '@').split('@');
				strHtml += '<tr><td class="gmryaku1">' + iIdx + '.</td><td class="gmryaku2">';
				if (iIdx == 1) {
					strHtml += '<span class="bigf">' + astrCell[0] + '</span><br />';
				} else {
					strHtml += astrCell[0];
				}
				if (astrCell[1] != '') {
					strHtml += '<span class="fade">(' + astrCell[1] + ')</span>';
				}
				strHtml += '</td></tr>';
				
				if (iIdx == 1) {
					astrAmaKey = (' ' + astrCell[0]).split(' ');
					m_strAmaKey = astrAmaKey[astrAmaKey.length - 1];
				}
			}
			strHtml += '</table>';
		}
		m_elmPn.innerHTML = strHtml;
	}
	
	if (m_iAnime == m_iCntBox) {
		if (document.getElementById('ryaku_alert').innerHTML != '') {
			document.getElementById('ryaku_alert').style.display = 'block';
		}
		if (m_strAmaKey != '') {
//20120822
//			sbGetAmazonImage('links','ryaku-22','DVD',EscapeUTF8(m_strAmaKey),'',260,1,1);
//20120822
		}
//20120822
		setTimeout("sbBlockDesc()",Math.floor(Math.random() * 10 + 1) * 500);
//20120822
	}
	
	// Add FrameCount
	if (m_iAnime > m_iAnimeSt - 1 && m_iAnime <= m_iCntBox + 2) {
		m_iAnime ++;
	}
}

function fnSend_anoryaku() {
//20120822
//	var strReq;
//	strReq = '';
//	strReq +=  'nm=' + EscapeEUCJP(document.getElementById('ryaku_req').value);
//	strReq += '&mode=' + document.getElementById('ryaku_mode').value;
//	if (strReq != m_strReq) {
//		document.getElementById('ryaku_alert').innerHTML = '';
//		document.getElementById('ryaku_alert').style.display = 'none';
//		m_elmPn.innerHTML = 'Now loading ...<br />';
//		fnGetValue_anoryaku(strReq,'ryaku_res');
//		m_iAnime = m_iAnimeSt - 1;
//		m_strReq = strReq;
//	}
//	return false;
	var strURL;
	strURL = '' + document.location;
	var astrTemp = strURL.split('?');
	strURL = astrTemp[0];
	var strReq;
	strReq = '';
	strReq += strURL + '?n=' + encodeURI(document.getElementById('ryaku_req').value);
	document.location = strReq;
	return false;
//20120822
}
//20120822
function sbSend() {
	var strReq;
	strReq = '';
	strReq +=  'nm=' + EscapeEUCJP(document.getElementById('ryaku_req').value);
	strReq += '&mode=' + document.getElementById('ryaku_mode').value;
	if (strReq != m_strReq) {
		document.getElementById('ryaku_alert').innerHTML = '';
		document.getElementById('ryaku_alert').style.display = 'none';
		m_elmPn.innerHTML = 'Now loading ...<br />';
		fnGetValue_anoryaku(strReq,'ryaku_res');
		m_iAnime = m_iAnimeSt - 1;
		m_strReq = strReq;
	}
	return false;
}
//20120822

// EnterKey Event
var m_elmFocus;
function fnFocus_anoryaku(elmNum){
	m_elmFocus = elmNum
	elmNum.style.backgroundColor = '#f6eddd';
	elmNum.select();
}
function fnBlur_anoryaku(elmNum){
	elmNum.style.backgroundColor = '';
}
//20120822
//function fnGetKeycode_anoryaku(e){
//	if (document.all) {
//		return event.keyCode;
//	} else if (document.getElementById) {
//		return (e.keyCode!=0) ? e.keyCode : e.charCode;
//	} else if(document.layers){
//		return e.which;
//	}
//}
//function fnKeyPress_anoryaku(e){
//	if(fnGetKeycode_anoryaku(e) == 13) {
//		if        (m_elmFocus.id == 'ryaku_send') { document.getElementById('ryaku_req').focus();
//		} else if (m_elmFocus.id == 'ryaku_req')  { document.getElementById('ryaku_send').focus(); fnSend_anoryaku();
//		}
//		return false;
//	}
//}
//document.onkeypress = fnKeyPress_anoryaku;
//20120822

//20120822
function sbNoneDesc() {
	document.getElementById('gen_desc').style.display = (Math.floor((new Date()).getTime() / (15 * 1000)) % 3 == 0 ? 'none' : 'block');
}
function sbBlockDesc() {
	document.getElementById('gen_desc').style.display = 'block';
}
function sbGetParam() {
	var iIdx,iTemp;
	var strKey,strVal;
	var astrParam = [];
	var strQuery = window.location.search.substring(1);
	var astrParam = strQuery.split('&');
	for (iIdx = 0; iIdx < astrParam.length; iIdx++) {
		var iTemp = astrParam[iIdx].indexOf('=');
		if (iTemp > 0) {
			strKey = astrParam[iIdx].substring(0,iTemp);
			strVal = astrParam[iIdx].substring(iTemp + 1);
			astrParam[strKey] = strVal;
		}
	}
	return astrParam;
}
//20120822
