/********************************************************
* FILE NAME 	: common.js
* DESC			: 
* DATE  		: 2019-11-22
* AUTHOR  		: 박재철
* HISTORY 
				: 
*********************************************************/
// 현재 일자 
function currentDate(){
	
	var d = new Date();
	var currentDate = d.getFullYear() + "-" + (( d.getMonth() + 1 ) < 10 ? ("0"+( d.getMonth() + 1 )) : ( d.getMonth() + 1 ) )  + "-" + 
			(d.getDate() < 10 ? ("0"+ d.getDate()) : d.getDate() )  + " " +
			d.getHours() + ":" + d.getMinutes() + " " + d.getSeconds();
	
	return currentDate;
}

function _currentDate(){
	
	var d = new Date();
	var currentDate = d.getFullYear() + "-" + (( d.getMonth() + 1 ) < 10 ? ("0"+( d.getMonth() + 1 )) : ( d.getMonth() + 1 ) )  + "-" + 
			(d.getDate() < 10 ? ("0"+ d.getDate()) : d.getDate() );
	
	return currentDate;
}

function beforDateSetting(add){
	var d = new Date();
	var newDate = d.getTime() - (add * 24 * 60 * 60 * 1000);
	d.setTime(newDate);
	
	var currentDate = d.getFullYear() + "-" + (( d.getMonth() + 1 ) < 10 ? ("0"+( d.getMonth() + 1 )) : ( d.getMonth() + 1 ) )  + "-" + 
	(d.getDate() < 10 ? ("0"+ d.getDate()) : d.getDate() ) ;
	
	return currentDate;
	
}

function afterDateSetting(add){
	var d = new Date();
	var newDate = d.getTime() + (add * 24 * 60 * 60 * 1000);
	d.setTime(newDate);
	
	var currentDate = d.getFullYear() + "-" + (( d.getMonth() + 1 ) < 10 ? ("0"+( d.getMonth() + 1 )) : ( d.getMonth() + 1 ) )  + "-" + 
	(d.getDate() < 10 ? ("0"+ d.getDate()) : d.getDate() ) ;
	
	return currentDate;
	
}

// 콤마 등록
function createComma(str) {
	if( isEmpty(str) ){
		return '0';
	}
	
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function nvl(str, defaultStr){
	if(typeof str == "undefined" || str == null || str == ""){
    	str = defaultStr ;
         
        return str ;
    }
}
function isEmpty(str){
	if(typeof str == "undefined" || str == null || str == ""){
    	return true;
    }else{
    	return false;
    }
}


// 콤마 제거
function removeComma(str){
	n = parseInt(str.replace(/,/g,""));
	return n;
}

function notFoundData(col, message){
	var html = "";
	if(message == '')message='검색된 자료가 없습니다.';
	html += "<tr>";
	html += "	<td style='text-align:center;' colspan='"+col+"'>"+message+"</td>";
	html += "</tr>";
	return html;
}

textLength = function(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (escape(str.charAt(i)).length == 6) {
            len++;
        }
        len++;
    }
    
    return len;
}

// ajax
var AjaxContentRequester = {
		
	loadByAjax : function(type, url, data, dataType, result_callback) {
		$.ajax({
			type : type,
			url : url,
			data : data,
			dataType : dataType,
			cache : false,
			async: true,
			success: function(data) {
				result_callback(data);
			},
			beforeSend:function(){
				$("#loader").show();
			},
			complete:function(){
				setTimeout(function() {
					$("#loader").hide();
				}, 100);
			},
			error:function(e){
				console.log(e);
				$("#loader").hide();
			}
		});
	}
	
};


// collspan
function notFoundData(col, message){
	var html = "";
	if(message == '')message='자료가 없습니다.';
	html += "<tr class=\"check\">";
	html += "	<td style='text-align:center;' colspan='"+col+"'>"+message+"</td>";
	html += "</tr>";
	return html;
}

// 전체 체크 
function checkedAll(id, list_id){
	var chk = $("input:checkbox[name='"+id+"']").is(":checked");
	$("#"+list_id).find('input[type="checkbox"]').each(function (idx) {
		$(this).prop("checked", chk);
	});
}

// 체크 목록
function checkedValues(id, delimiter){	
	var values = "";
	$("#"+id).find('input[type="checkbox"]').each(function (index) {
		if($(this).is(':checked') == true){
			values += $(this).val()+""+delimiter;
		}
	});
	if(values.length > 0){
		values = values.substring(0, values.length-1);
	}
	return values;
}

function _checkedValues(id, delimiter, splitLimit){	
	var values = "";
	$("#"+id).find('input[type="checkbox"]').each(function (index) {
		if($(this).is(':checked') == true){
			values += ($(this).val().split('/')[splitLimit]) +""+delimiter;
		}
	});
	if(values.length > 0){
		values = values.substring(0, values.length-1);
	}
	return values;
}

// 체크 해제
function unChecked(id){
	$("input:checkbox[name='"+id+"']").attr("checked", false);
}

// 체크해제
function unCheckedAll(list_id){
	$("#"+list_id).find('input[type="checkbox"]').each(function (idx) {
		$(this).prop("checked", false);
	});
}

//체크박스 체크
function checked(checkedId, bool){
	$('#'+ checkedId).prop("checked", bool);
}

function dateDiff(sdd, edd){
	
    var ar1 = sdd.split('-');
    var ar2 = edd.split('-');
    var da1 = new Date(ar1[0], ar1[1], ar1[2]);
    var da2 = new Date(ar2[0], ar2[1], ar2[2]);
    var dif = da2 - da1;
    var cDay = 24 * 60 * 60 * 1000;
    var cMonth = cDay * 30;
    var cYear = cMonth * 12; 
    
    return parseInt(dif/cDay);
}

function addDate(dateStr, addDate, type, gubun){ 
	 
	var selectDate = dateStr.split(gubun);
    var changeDate = new Date();
    if(type == 'd'){
   		changeDate.setFullYear(Number(selectDate[0]), Number(selectDate[1])-1, Number(selectDate[2]) + Number(addDate));
    } else if(type == 'm'){
   		changeDate.setFullYear(Number(selectDate[0]), Number(selectDate[1])-1 + Number(addDate), Number(selectDate[2]));
    } else if(type == 'y') {
   		changeDate.setFullYear(Number(selectDate[0])+ Number(addDate), Number(selectDate[1])-1, Number(selectDate[2]));
    }
    var y = changeDate.getFullYear();
    var m = changeDate.getMonth() + 1;
    var d = changeDate.getDate();
    if(m < 10)    { m = "0" + m; }
    if(d < 10)    { d = "0" + d; }
    
    var resultDate = y + gubun + m + gubun + d;
   
    return resultDate;
}

function getToday(){

	var now = new Date();  
	
	var year= now.getFullYear();  
	var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);  
	var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate(); 
	
	return year +"-"+ mon +"-"+ day;
}

// 체크박스 배열로 받아오기 ( id = customerId)
function getArrayCheckBox(id){
	
	var obj = $("[name='+id+']");
	var chkArray = new Array();
	
	$('input:checkbox[name='+id+']:checked').each(function() {
        chkArray.push(this.value);
    });
	
	var uniq = chkArray.reduce(function(a,b){
		if (a.indexOf(b) < 0 ) a.push(b);
		return a;
  	},[]);
	
	return uniq;
}


// alert
function modalAlert(obj, title, message, target){
	console.log('modalAlert ::: '+obj);
	
	$("#modal").fadeIn(100);
	$("#"+obj).css({
    	"display": "block"
  	});
	
	if(title != ""){
		$("#"+obj+" div h4 span").text(title);
	}
	$("#"+obj+" div p span").html(message);
	//$("#"+obj+" .close").attr("onclick","modalClose('"+obj+"')");
	//$("#"+obj+" #modal-disagree").attr("onclick","modalClose('"+obj+"')");
	
	if( target != ''){
		$("#"+obj+" #"+ target).focus();
	}
}

function _modalAlert(obj, title, message, target){
	console.log('_modalAlert ::: '+obj);
	
	$("#modal").fadeOut(100);
	$("#"+obj).css({
    	"display": "block",
    	"z-index":100005
  	});
	$("#_modal").fadeIn(100);
	
	if(title != ""){
		$("#"+obj+" div h4 span").text(title);
	}
	$("#"+obj+" div p span").html(message);
	
	if( target != ''){
		$("#"+obj+" #"+ target).focus();
	}
}

// confirm
function modalConfirm(obj, title, message, callFnc, target){
	console.log('modalConfirm ::: '+obj);
	
	$("#modal").fadeIn(100);
	$("#"+obj).css({
    	"display": "block"
  	});
  	
  	if(title != ""){
		$("#"+obj+" div h4 span").text(title);
	}
	$("#"+obj+" div p span").html(message);
	$("#"+obj+" .close").attr("onclick","modalClose('"+obj+"')");
	//$("#"+obj+" #modal-agree").attr("onclick",callFnc);
	//$("#"+obj+" #modal-disagree").attr("onclick","modalClose('"+obj+"')");
	
	if( target != ''){
		$("#"+obj+" #"+ target).focus();
	}
}

function _modalConfirm(obj, title, message, callFnc, target){
	console.log('_modalConfirm ::: '+obj);
	
	$("#modal").fadeOut(100);
	$("#"+obj).css({
    	"display": "block",
    	"z-index":100005
  	});
  	$("#_modal").fadeIn(100);
  	
  	if(title != ""){
		$("#"+obj+" div h4 span").text(title);
	}
	$("#"+obj+" div p span").html(message);
	$("#"+obj+" .close").attr("onclick","modalClose('"+obj+"')");
	//$("#"+obj+" #modal-agree").attr("onclick",callFnc);
	//$("#"+obj+" #modal-disagree").attr("onclick","modalClose('"+obj+"')");
	
	if( target != ''){
		$("#"+obj+" #"+ target).focus();
	}
}

// open
function modalOpen(obj){
	console.log('modalOpen ::: '+obj);
	
	if( obj == 'allMenu'){
		$("#modal").fadeToggle(500);
		 
	}else{
		$("#modal").fadeIn(100);
		
	}
	
	$("#"+obj).css({
    	"display": "block"
  	});
	//$("#"+obj+" .close").attr("onclick","modalClose('"+obj+"')");
	//$("#"+obj+" #modal-disagree").attr("onclick","modalClose('"+obj+"')");
}

function _modalOpen(obj){
	console.log('_modalOpen ::: '+obj);
	
	$("#modal").fadeOut(0);
	$("#"+obj).css({
    	"display": "block",
    	"z-index":100005
  	});
  	$("#_modal").fadeIn(100);
	//$("#"+obj+" .close").attr("onclick","modalClose('"+obj+"')");
	//$("#"+obj+" #modal-disagree").attr("onclick","modalClose('"+obj+"')");
}

// close
function modalClose(obj){
	console.log('modalClose ::: '+obj);
	
	$("#modal").fadeOut(100);
	$("#"+obj).css({
    	"display": "none"
  	});
  	
  	if( focusElement != ''){
  		$("#"+ focusElement).focus();
  	}
}
 
function _modalClose(obj){
	console.log('_modalClose ::: '+obj);
	 
	$("#_modal").fadeOut(100);
	$("#modal").fadeIn(100);
	$("#"+obj).css({
    	"display": "none"
  	});
  	
  	if( focusElement != ''){
  		$("#"+ focusElement).focus();
  	}
}


// 자바스크립트 빈갑(null) 처리
function objectNull(value){
	if(typeof value == "undefined" || value == "" || value == null){
		return false;
	}
	return true;
}

//alert(phoneFormatter('0101234567',1) + ", "
//	+ phoneFormatter('01012345678',1) +", " 
//	+ phoneFormatter('0212345678',1) +", " 
//	+ phoneFormatter('0431234567',1) +", " 
//	+ phoneFormatter('07043135447',1) +", " 
//	+ phoneFormatter('04312344567',1)+", " 
//	+ phoneFormatter('1234567890987',1)
//	);
function phoneFormatter(num, type) {
	var formatNum = '';

	if( num.length > 11 ){
		return (num.length > 11 ? num.substr(0, 11) : num);
	}
	try{
		if (num.length == 11) {
			if (type == 0) {
				formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');

			} else {
				formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

			}
		} else if (num.length == 8) {
			formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');

		} else {
			if (num.indexOf('02') == 0) {
				if (type == 0) {
					formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');

				} else {
					formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');

				}

         } else {
			if (type == 0) {
				formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');

            } else {
				formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

            }
         }
      }
	} catch(e) {
		formatNum = (num.length > 11 ? num.subst(0, 11) : num);
		//alert(e);

	}

   return formatNum;

}

function autoHypenTel(str) {
	
	if (!str) {
		return "";
	}

	var result = "";
	str = RemoveDash2(str);
	try {
		result = str.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") ;
	}catch(e){
		result = str.length > 11 ? str.subst(0, 11) : str;
	}
	return	result;
}

function RemoveDash2(sNo) {
	var reNo = ""
	for (var i = 0; i < sNo.length; i++) {
		if (sNo.charAt(i) != "-") {
			reNo += sNo.charAt(i);
		}
	}
	return reNo;
}