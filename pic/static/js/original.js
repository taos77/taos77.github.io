/**
 * original
 * @constructor
 * @classdesc 本システム独自の処理を行う
 * @param 無し
 */
var Original = function() {
	/**
	 * 共通初期化処理（事前）
	 * 
	 * 全画面：画面表示時の最初に実行する
	 * 
	 * @example
	 * original.initBefore();
	 * 
	 * @access  public
	 * @return  無し
	 */
	this.initBefore = function() {
		this.initForm();
		
		//★ツールチップ表示
		$('[data-toggle="tooltip"]').tooltip();
		
		//★タグアイコン表示
		$('.tagtile a').prepend('<span class="glyphicon glyphicon-tag" aria-hidden="true"></span> ');
	}
	
	/**
	 * フォーム初期化処理
	 * 
	 * @access  public
	 * @return  無し
	 */
	this.initForm = function() {
		//━━━━━━━━━━
		//イベント作成
		//━━━━━━━━━━
//		//★カレンダー表示（日）
//		$('.datepicker').datetimepicker({
//			 locale: 'ja'
//			,format : 'YYYY/MM/DD'
//			,useCurrent: false
//			,showTodayButton: true
//			,showClear: true
//			,keyBinds: false
//		});
//		
//		//★カレンダー表示（日時）
//		$('.datetimepicker').datetimepicker({
//			 locale: 'ja'
//			,format : 'YYYY/MM/DD HH:mm:ss'
//			,useCurrent: false
//			,showTodayButton: true
//			,showClear: true
//			,keyBinds: false
//			,sideBySide: true
//		});
		
		//★ひらがな変換
		$('.hiragana').focusout(function(e) {
			var katakana = $(this).val();
			var hiragana = original.convKatakanaToHiragana(katakana);
			$(this).val(hiragana);
		});
		
		//★イニシャル大文字変換
		$('.initial').focusout(function(e) {
			var komoji = $(this).val();
			var oomoji = komoji.toUpperCase();
			$(this).val(oomoji);
		});
		
		//★英数字半角変換
		$('.hankaku').focusout(function(e) {
			var zen = $(this).val();
			var han = original.convZenkakuToHankaku(zen);
			$(this).val(han);
		});
	}
	
	/**
	 * 共通初期化処理（事後）
	 * 
	 * 全画面：画面表示時の最後に実行する
	 * 
	 * @example
	 * original.initAfter();
	 * 
	 * @access  public
	 * @return  無し
	 */
	this.initAfter = function() {
	}
	
	/**
	 * カタカナtoひらがな変換処理
	 * 
	 * var hiragana = original.convKatakanaToHiragana(katakana);
	 * 
	 * @access  public
	 * @param   src 変換前の文字列
	 * @return  カタカナをひらがなに変換した文字列
	 */
	this.convKatakanaToHiragana = function(src) {
		return src.replace(/[\u30a1-\u30f6]/g,function(match) {
			var chr = match.charCodeAt(0) - 0x60;
			return String.fromCharCode(chr);
		});
	}
	
	/**
	 * 全角英数字to半角英数字変換処理
	 * 
	 * var hankaku = original.convKatakanaToHiragana(zenkaku);
	 * 
	 * @access  public
	 * @param   src 変換前の文字列
	 * @return  全角英数字を半角英数字に変換し、トリムした文字列
	 */
	this.convZenkakuToHankaku = function(src) {
		var str = src.replace( /[Ａ-Ｚａ-ｚ０-９－＠．＿]/g, function(s) {
			return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
		});
		str = str.replace(/　/g,' ');
		str = jQuery.trim(str);
		return str;
	}
	
	/**
	 * セル結合
	 * 
	 * @access  public
	 * @return  無し
	 */
	this.adjustTable = function(strId,aiColKey,aiColJoin) {
		var aelmOldKey = [];
		var aelmOldJoin = [];
		$(strId).find('tr').each(function () {
			var aelmNewKey = [];
			var aelmNewJoin = [];
			for(var iIdx = 0; iIdx < aiColKey.length; iIdx++) {
				strVal = aiColKey[iIdx];
				aelmNewKey[iIdx] = $(this).find('td').eq(strVal);
			}
			for(var iIdx = 0; iIdx < aiColJoin.length; iIdx++) {
				strVal = aiColJoin[iIdx];
				aelmNewJoin[iIdx] = $(this).find('td').eq(strVal);
			}
			if (aelmOldKey.length == 0) {
				for(var iIdx = 0; iIdx < aiColKey.length; iIdx++) {
					aelmOldKey[iIdx] = aelmNewKey[iIdx];
				}
				for(var iIdx = 0; iIdx < aiColJoin.length; iIdx++) {
					aelmOldJoin[iIdx] = aelmNewJoin[iIdx];
				}
			} else {
				strNewKey = '';
				strOldKey = '';
				for(var iIdx = 0; iIdx < aelmOldKey.length; iIdx++) {
					strNewKey += "\t" + aelmNewKey[iIdx].text();
					strOldKey += "\t" + aelmOldKey[iIdx].text();
				}
				if (strNewKey == strOldKey) {
					for(var iIdx = 0; iIdx < aiColJoin.length; iIdx++) {
						aelmNewJoin[iIdx].remove();
						if (aelmOldJoin[iIdx].attr('rowspan') == null) {
							aelmOldJoin[iIdx].attr('rowspan',1);
						}
						aelmOldJoin[iIdx].attr('rowspan',parseInt(aelmOldJoin[iIdx].attr('rowspan'),10) + 1);	//parseIntの引数の10は10進数
					}
				} else {
					for(var iIdx = 0; iIdx < aiColKey.length; iIdx++) {
						aelmOldKey[iIdx] = aelmNewKey[iIdx];
					}
					for(var iIdx = 0; iIdx < aiColJoin.length; iIdx++) {
						aelmOldJoin[iIdx] = aelmNewJoin[iIdx];
					}
				}
			}
		});
	}
	
	this.aiRowCount = [];
	this.insRow = function(strClassName,astrRow) {
		//★IDに使用する連番を初期化
		if (!(strClassName in this.aiRowCount)) {
			this.aiRowCount[strClassName] = 0;
		}
		
		//★行を複製
		var trOld = $('.' + strClassName);
		var trNew = trOld.clone();
		
		//★行にIDを付加
		trNew.removeClass(strClassName);
		trNew.prop('id',strClassName + '_' + this.aiRowCount[strClassName]);
		
		//★値をセット
		jQuery.each(astrRow, function(strKey,strVal) {
			inpTemp = $('#' + strKey,trNew);
			if (inpTemp.prop('type') == 'checkbox') {
				inpTemp.prop('checked',(strVal == inpTemp.val()));
			} else {
				inpTemp.val(strVal);
			}
			inpTemp.change();
		});
		
		//★テーブルに行を追加
		trOld.before(trNew);
		
		//★IDに使用する連番をインクリメント
		this.aiRowCount[strClassName] ++;
		return trNew;
	}
	
	this.insTable = function(strClassName,astrTable) {
		for(var iIdx in astrTable){
			original.insRow(strClassName,astrTable[iIdx]);
		}
	}
	
	this.delRow = function(btnTemp) {
		var trOld = $(btnTemp).closest('tr');
		trOld.remove();
		return false;
	}
	
	this.getRow = function(strRowId) {
		var astrRow = {};
		$('#' + strRowId + ' [dynamic-row="true"]').each(function(colnum) {
			var elmInput = this;
			var strInputId = $(elmInput).prop('id');
			if ($(elmInput).prop('type') == 'checkbox') {
				astrRow[strInputId] = ($(elmInput).prop('checked') ? $(elmInput).val() : '');
			} else {
				astrRow[strInputId] = $(elmInput).val();
			}
		});
		return astrRow;
	}
	
	this.getTable = function(strTableId) {
		var astrTable = [];
		var iIdx = 0;
		$('#' + strTableId + ' tr').each(function(rownum) {
			var elmTr = this;
			if ($(elmTr).is(':visible')) {
				var strRowId = $(elmTr).prop('id');
				astrTable[iIdx] = original.getRow(strRowId);
				iIdx ++;
			}
		});
		return astrTable;
	}
	
	this.openWindow = function(strUrl,param2) {
		var param1 = {
			href: strUrl,
			width: '1000px',
			//height: '400px',
			innerHeight: 3300,
			maxHeight: '95%',
			opacity : 0.5,
			iframe: true,
			fixed: true,
		};
		
		var param = $.extend(param1,param2);
		$.colorbox(param);
	}
	
	this.getTdValue = function(elmTd) {
		var value = null;
		$('input,select',elmTd).each(function(colnum) {
			var elmInput = this;
			if ($(elmInput).prop('type') == 'radio') {
				if ($(elmInput).prop('checked')) {
					value = $(elmInput).val();
				}
			} else {
				value = $(elmInput).val();
			}
		});
		return value;
	}
	
	this.setTdValue = function(elmTd,value) {
		$('input,select',elmTd).each(function(colnum) {
			var elmInput = this;
			if ($(elmInput).prop('type') == 'radio') {
				$(elmInput).prop('checked',(value == $(elmInput).val()));
			} else {
				$(elmInput).val(value);
			}
		});
	}
	
	this.setTdStatusColor = function(elmTd) {
		elmTd.removeClass('danger');
		elmTd.removeClass('info');
		elmTd.removeClass('warning');
		
		var value = original.getTdValue(elmTd);
		
		if        (value == '-1') { elmTd.addClass('danger');
		} else if (value ==  '1') { elmTd.addClass('info');
		} else if (value ==  '0') { elmTd.addClass('warning');
		}
	}
}

