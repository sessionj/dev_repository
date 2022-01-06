/********************************************************
* FILE NAME 	: validator.js
* DESC			: 폼 유효성검사
* DATE  		: 2019-11-22
* AUTHOR  		: 박재철
* HISTORY 
				: 
*********************************************************/
function Validator(form, mode) {
	this.form = form;
	this.modd = mode;
	
	var ERROR_MSG_REQUIRED = "{name+은는} 필수항목입니다.";
	var ERROR_MSG_OPTION = "{name+이가} 올바르지 않습니다";
	var ERROR_MSG_MAXBYTE = "{name+은는} 최대 {length}글자 이하이어야 합니다.";
	var ERROR_MSG_MINBYTE = "{name+은는} 최소 {length}글자 이상이어야 합니다.";
	  
	/// 스트링 객체에 메소드 추가 ///
	String.prototype.trim = function(str) { 
		str = this != window ? this : str; 
		return str.replace(/^\s+/g,'').replace(/\s+$/g,''); 
	}
	
	String.prototype.hasFinalConsonant = function(str) {
		str = this != window ? this : str; 
		var strTemp = str.substr(str.length-1);
		
		return ((strTemp.charCodeAt(0)-16)%28!=0);
	}
    
    function hasValue(group) {
        var el;
        
        for(i=0; i<form.elements.length; i++) {
            el = form.elements[i];
            
            // hidden, submit 타입은 검사하지 않음
            if( el.type == 'hidden' || el.type == 'submit'  )
                continue;
                
            // 그룹검사
            if(group != null && el.getAttribute('GROUP') != group)
                continue;
           
            if( el.value != null && el.value ) {
                return true;
            }
        }
        
        return false;
    }
    this.hasValue = hasValue;

	/**
	*	validate() : 폼의 유효성 검사를 실시합니다.
	*/
	function validate(group) {
		
		var el;
		
		for(i=0; i<form.elements.length; i++) {
			el = form.elements[i];
            
            // hidden, submit 타입은 검사하지 않음
            if( el.type == 'hidden' || el.type == 'submit' )
                continue;
                
            // 그룹검사
            if(group != null && el.getAttribute('GROUP') != group)
                continue;
			
			// 필수여부검사
			if(el.getAttribute('NOTEMPTY') != null) {
				if(el.value == null || el.value.trim() == '') {
					return doError(el, ERROR_MSG_REQUIRED, false);
				}
			}
			
			// 최대길이검사
			if(el.getAttribute('MAXBYTE') != null) {
				if(el.value != null && el.value.length > el.getAttribute('MAXBYTE') ) {
					return doError(el, ERROR_MSG_MAXBYTE, false);
				}
			}
			
			// 최소길이검사
			if(el.getAttribute('MINBYTE') != null) {
				if(el.value != null && el.value.length < el.getAttribute('MINBYTE') ) {
					return doError(el, ERROR_MSG_MINBYTE, false);
				}
			}
			
			// 특수문자 체크 
			if(el.getAttribute('HNAME') != null) {
				if( el.type != 'password'){
					if( !isSpecialChar(el.value) ){
						return doError(el,"{name+에는} (\", ', &, ^ 등 특수문자) 을 입력할 수 없습니다. ", false);
					}
				}
			}
			
			// 특수패턴검사
			var option = el.getAttribute('OPTION');
			if(option != null ) {
            
                // 필수데이터가 아닌 경우 값이 없으면 검사하지 않음
                if( el.getAttribute('NOTEMPTY') == null && (el.value == null || el.value == '') )
                    continue;
                    
				if(option == 'email') {
					if( !isValidEmail(el.value) ) {
						return doError(el, ERROR_MSG_OPTION, false);
					}
				} else if(option == 'homepage') {
					if( !isValidHomepage(el.value) ) {
						return doError(el,"{name+은는} 올바른 홈페이지주소가 아닙니다.", false);
					}
				} else if(option == 'phone') {
					if( !isValidPhone(el.value) ) {
						return doError(el,"{name+이가} 올바르지 않습니다.", false);
					}
				} else if(option == 'mobile') {
                    if( !isValidMobilePhone(el.value) ) {
                        return doError(el,"{name+이가} 올바르지 않습니다.", false);
                    }
                } else if(option == 'jumin') {
					if( !isValidJumin(el.value) ) {
						return doError(el,"{name+은는} 올바른 주민등록번호가 아닙니다.", false);
					}
				} else if(option == 'biznum') {
					if( !isValidBiznum(el.value) ) {
						return doError(el,"{name+은는} 올바른 사업자등록번호가 아닙니다.", false);
					}
				} else if(option == 'number') {
					if( !isValidNumber(el.value) ) {
						return doError(el,"{name} 숫자만 입력해야합니다", false);
					}
				} else if(option == 'avaliable_number') {
					if( !isAvaliableValidNumber(el.value) ) {
						return doError(el,"{name+은는} 유효한 범위를 입력해야합니다", false);
					}
				} else if(option == 'avaliable_zeronumber') {
					if( !isAvaliableValidZeroNumber(el.value) ) {
						return doError(el,"{name+은는} 유효한 범위를 입력해야합니다", false);
					}
				} else if(option == 'real') {
					if( !isValidReal(el.value) ) {
						return doError(el,"{name} 실수만 입력해야합니다..", false);
					}
				} else if(option == 'kor') {
					if( !isValidKor(el.value) ) {
						return doError(el,"{name+은는} 한글만 입력해야 합니다.", false);
					}
				} else if(option == 'eng') {
					if( !isValidEng(el.value) ) {
						return doError(el,"{name+은는} 영어만 입력해야 합니다.", false);
					}
				} else if(option == 'engspace') {
                    if( !isValidEngSpace(el.value) ) {
                        return doError(el,"{name+은는} 영어만 입력해야 합니다.", false);
                    }
                } else if(option == 'koreng') {
					if( !isValidKorengEng(el.value) ) {
						return doError(el,"{name+은는} 한글이나 영어만 입력해야 합니다.", false);
					}
				} else if(option == 'char') {
					if( !isValidChar(el.value) ) {
						return doError(el,"{name+은는} 한글, 영어, 숫자 만 입력해야 합니다.", false);
					}
				} else if(option == 'id') {
					if( !isValidID(el.value) ) {
						return doError(el,"{name} 올바른 아이디가 아닙니다.", false);
					}
				} else if(option == 'password') {
					if( !isValidPassword(el.value) ) {
						return doError(el,"{name} 올바른 비밀번호가 아닙니다.", false);
					}
				} else if(option == 'date') {
                    if( !isValidDate(el.value) ) {
                        return doError(el,"날짜 형식이 올바르지 않습니다.<br>형식)YYYY-MM-DD 로 입력해 주십시요.", false);
                    } else if( isDate(el.value) ) {
                        return doError(el, "존재하지 않는 날짜입니다.");
                    }
                }else if(option == 'time') {
					if( !isValidTime(el.value) ) {
						return doError(el,"{name+은는} 시간 형식이 올바르지 않습니다.<br>형식)HH-MM(24시간) 으로 입력해 주십시요.", false);
					}
				}else if(option == 'engnumber'){
					if( !isEngNumberPattern(el.value) ){
						return doError(el,"{name+은는} 영문, 숫자, (-,_)를 포함하여<br>1자리 이상 13자리 이하로 입력해 주십시요. ", true);
					}
				}else if(option == 'ip'){
					if( !isIp(el.value) ){
						return doError(el,"{name+은는} 올바른 형식이 아닙니다. ", true);
					}
				}
			}
		}
		
		return true;
	}
	this.validate = validate;
	
	/**
	*	doError() : 에러 발생에 대한 처리를 수행합니다.
	*
	* @param el : 폼의 엘리먼트 객체
	* @param type : 에러구분
	*/
	function doError(el, msg, del) {
		var pattern = /{([a-zA-Z0-9_]+)\+?([가-힣]{2})?}/;
		var pattern2 = /{length}/;
		var tail;
		var eName;
		
		eName = el.getAttribute('HNAME');
		if(eName == null) {
			eName = el.name;
		}
		
		// 이름
		pattern.exec(msg);
		tail = (RegExp.$2) ? josa(eName, RegExp.$2) : "";
		var reMsg = '[ '+eName+' ]' + msg.replace(pattern, tail);

		// 최소길이
		if( el.getAttribute('MINBYTE') && el.getAttribute('MINBYTE') != 'null' && el.value.length < el.getAttribute('MINBYTE') ) {
			pattern2.exec(reMsg);
			reMsg = reMsg.replace(pattern2, el.getAttribute('MINBYTE'));
		}
		
		// 최대길이
		if( el.getAttribute('MAXBYTE') != null && el.value != null && el.value.length > el.getAttribute('MAXBYTE') ) {
			pattern2.exec(reMsg);
			reMsg = reMsg.replace(pattern2, el.getAttribute('MAXBYTE'));
		}

		if( mode == 'pop'){
			_modalAlert('myModal-valid','안내', reMsg, 'modal-disagree');

		}else{
			modalAlert('myModal-valid','안내', reMsg, 'modal-disagree');

		}
		
		if( del ) {
			el.value = '';
		}
		//el.focus();
		focusElement = el.getAttribute('id');
		
		return false;
	}
	
	function isSpecialChar(str){
		//var pattern = /[`$%^&|\\\'\";:\/?]/gi;
		//var pattern = /[!?@#$%^&():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;
		var pattern = /[~!#$%^&+|<>?:{}\[\]\'\";:]/gi; 
		return (pattern.test(str)) ? false : true;
	}
	
	/**
	*	josa() : 문자열의 조사에따라 '은', '는' 결정
	*/
	function josa(str,tail) {
		return (str.hasFinalConsonant()) ? tail.substring(0,1) : tail.substring(1,2);
	}
	
	function isValidEmail(email) {
		var pattern = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;
		return (pattern.test(email)) ? true : false;
	}
    this.isValidEmail = isValidEmail;

	function isEngNumberPattern(str){
		var pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[_-])[A-Za-z\d_-]{1,13}$/;
		return (pattern.test(str)) ? true : false;
	}
	this.isEngNumberPattern = isEngNumberPattern;

	function isIp(ip) {
		var pattern = /^([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\.([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3}$/;
		return (pattern.test(ip)) ? true : false;
	}
    this.isIp = isIp;
	
    /**
    *   isValidHomepage() : 올바른 홈페이지 주소인지 검사
    *
    *   형식) http://www.homepage.com : 'http://'로 시작해야 함.
    */
	function isValidHomepage(homepage) {
        var pattern = /http:\/\/([a-zA-Z0-9]{2,}).(([a-zA-Z0-9]{2,}).){0,2}([a-zA-Z]{2,3})$/;
        
        if( pattern.test(homepage) ) {
            return true;
        } else {
            return false;
        }
	}
    this.isValidHomepage = isValidHomepage;
	
    /**
    *   isValidMobilePhone() : 올바른 휴대전화 번호인지 검사
    *
    *   형식) 019-973-1004 : '-'로 구분해야 함.
    */
	function isValidMobilePhone(phone) {
		//var pattern = /^([0]{1}[1]{1}[016789]{1})-([0-9]{3,4})-([0-9]{4})$/;
		var pattern = /^([0]{1}[1]{1}[016789]{1})([0-9]{3,4})([0-9]{4})$/;
        
		if( pattern.test(phone) ) {
			return true;
		} else {
			return false;
		}
	}
    this.isValidMobilePhone = isValidMobilePhone;
    
    /**
    *   isValidPhone() : 올바른 전화 번호인지 검사
    *
    *   형식) 042-486-9876 : '-' 로 구분해야 함.
    */
    function isValidPhone(phone) {
        //var pattern = /^[0]{1}[0-9]{1,2}-[0-9]{3,4}-[0-9]{4}$/;
        //var pattern = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
        var pattern = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})?[0-9]{3,4}?[0-9]{4}$/;
        if (pattern.test(phone)) {
            return true;
        } else {
            return false;
        }
    }
    this.isValidPhone = isValidPhone;
	
	function isValidJumin(jumin) {
		var pattern = /^([0-9]{6})-?([0-9]{7})$/; 
	    if (!pattern.test(jumin)) 
	    	return false; 
	    jumin = RegExp.$1 + RegExp.$2;
	
		var sum = 0;
		var last = jumin.charCodeAt(12) - 0x30;
		var bases = "234567892345";

		for (var i=0; i<12; i++) {
			if (isNaN(jumin.substring(i,i+1))) 
				return false;
			sum += (jumin.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
		}
		var mod = sum % 11;
		return ((11 - mod) % 10 == last) ? true : false;
	}
    this.isValidJumin = isValidJumin
	
	function isValidBiznum(biznum) {
		var pattern = /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/; 
	    if (!pattern.test(biznum)) 
	    	return false; 
	    	
	    biznum = RegExp.$1 + RegExp.$2 + RegExp.$3;
	    var cVal = 0; 
	    for (var i=0; i<8; i++) { 
	        var cKeyNum = parseInt(((_tmp = i % 3) == 0) ? 1 : ( _tmp  == 1 ) ? 3 : 7); 
	        cVal += (parseFloat(biznum.substring(i,i+1)) * cKeyNum) % 10; 
	    } 
	    var li_temp = parseFloat(biznum.substring(i,i+1)) * 5 + '0'; 
	    cVal += parseFloat(li_temp.substring(0,1)) + parseFloat(li_temp.substring(1,2)); 
	    return (parseInt(biznum.substring(9,10)) == 10-(cVal % 10)%10) ? true : false; 
	}
    this.isValidBiznum = isValidBiznum;
	
	function isValidNumber(number) {
		var pattern = /^[0-9]+$/;
		return (pattern.test(number)) ? true : false;
	}
	
	function isAvaliableValidNumber(number){
		if (!isNaN(number) && number > 0 && number <= 80) {
    		return true; 
		}
		return false;
	}
	
	function isAvaliableValidZeroNumber(number){
		if (!isNaN(number) && number >= 0 && number <= 99) {
    		return true; 
		}
		return false;
	}
	
	function isValidReal(real) {
		var pattern = /[0-9]*\.?[0-9]+$/;
		return (pattern.test(real)) ? true : false;
	}
	this.isValidReal = isValidReal;
	
	function isValidKor(kor) {
		var pattern = /^[가-힣]+$/;
		return (pattern.test(kor)) ? true : false;
	}
	
	function isValidEng(eng) {
		var pattern = /^[a-zA-Z]+$/;
		return (pattern.test(eng)) ? true : false;
	}
    
    function isValidEngSpace(eng) {
        var pattern = /^[a-zA-Z\s]+$/;
        return (pattern.test(eng)) ? true : false;
    }
	
	function isValidKorEng(koreng) {
		return (isValidKor(koreng) && isValidEng(koreng));
	}
	
	function isValidChar(ch) {
		var pattern = ""// /^[가-힣-a-zA-Z0-9- -(-)]+$/;
		return (pattern.test(ch)) ? true : false;
	}
	
	function isValidID(id) {
		var pattern = /^[a-z]{1}[a-z0-9]+$/;
		return (pattern.test(id)) ? true : false;
	}
	
	function isValidPassword(password) {
		var pattern = /^[a-z0-9]{1}[a-zA-Z0-9]{3,9}$/;
		return (pattern.test(password)) ? true : false;
	}
    
    /**
    *   isValidDate() : 날짜형식이 맞는지 검사(YYYY-MM-DD만 가능하도록)
    */
    function isValidDate(s) {
        var pattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
        return (pattern.test(s)) ? true : false;
    }
    
    function isValidTime(s) {
		if( s.indexOf(":") != -1){
			if( Number(s.split(":")[0]) > 24){
				return false;
			}else if( Number(s.split(":")[1]) > 60 ){
				return false;
			}else{
				var pattern = /^[0-9]{2}:[0-9]{2}$/;
				return (pattern.test(s)) ? true : false;
			}
		}

		return false;
	}
    
    /**
    *   isDate() : 존재하는 날짜인지 검사 (YYYY-MM-DD 만 가능하도록)
    */
    function isDate(s) {
        var pattern = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
        var year, month, date;
        
        pattern.exec(s);
        year = RegExp.$1;
        month = RegExp.$2;
        day = RegExp.$3;
        
        if( year && month && day ) {
        } else {
            return false;
        }
        
        var time = new Date(year, month, date);
        if( time.getFullYear() == year && time.getMonth() == month && time.getDate() == date )
            return true;
        else
            return false;
    }
    this.isDate = isDate;
}