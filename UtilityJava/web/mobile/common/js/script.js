function showLoginMark(check){
	var idMark = document.getElementById("logID");
	var pwMark = document.getElementById("logPW");
	
	var idText = document.getElementById("idText");
	var pwText = document.getElementById("pwText");
	

	if(check == 0){
		if(idMark.value == ""){
			idText.style.display = "block";
		}
		if(pwMark.value == ""){
			pwText.style.display = "block";
		}
	}
	
	else if(check == 1){
		if(idMark.value == ""){
			idText.style.display = "block";
		}
	}else{
		if(pwMark.value == ""){
			pwText.style.display = "block";
		}
	}
}

function hideLoginMark(check){
	var idMark = document.getElementById("logID");
	var pwMark = document.getElementById("logPW");

	var idText = document.getElementById("idText");
	var pwText = document.getElementById("pwText");

	if(check == 1){
		
		if(idText.style.display == "block"){
			idText.style.display = "none";
		}
	}else{
		
		if(pwText.style.display == "block"){
			pwText.style.display = "none";
		}
	}
}
function loginCheck(){

	var frm = document.getElementById("loginFrm");
		if(frm.loginId.value == ""){
			alert("아이디를 입력하세요!");
			return false;
		}
		
		if(frm.loginPw.value == ""){
			alert("패스워드를 입력하세요!");
			return false;
		}
		frm.submit();
}

var checkNum = [0,0,0,0];		//서브메뉴 보여줄지 체크하는 배열변수
//서브 메뉴 출력 함수
function submenuEvent(DetailNo){
	
	var submenu;
	if(DetailNo !=""){
		
		var detailIcon = document.getElementById("showDetail"+DetailNo);
		submenu = document.getElementById("submenuDetail"+DetailNo).style;
		
		if(checkNum[DetailNo] == 1){
			submenu.display = "none";
			detailIcon.src = "images/arr_1.png";
			checkNum[DetailNo] = 0;
		}
		else{
			for(var i=0; i<4; i++){
				if(i==DetailNo){
					submenu = document.getElementById("submenuDetail"+DetailNo).style;
					submenu.display = "block";
					checkNum[DetailNo] = 1;
					detailIcon = document.getElementById("showDetail"+DetailNo);
					detailIcon.src = "images/arr_2.png";
				}
				else{
					submenu =  document.getElementById("submenuDetail"+i).style;
					submenu.display = "none";
					checkNum[i] = 0;
					detailIcon = document.getElementById("showDetail"+i);
					detailIcon.src = "images/arr_1.png";
				}
			}
		}
	}
}

//탭 메뉴 선택 함수
function tabmenuEvent(DetailNo,tabCount){

	var tabmenu;
	var li;
	
	for(var i=0; i<tabCount; i++){
		if(i==DetailNo){
			tabmenu = document.getElementById("tabmenuDetail"+DetailNo).style;
			tabmenu.display = "block";
			switch(tabCount){
			case 2:
				li = document.getElementById("itemBottom_li"+DetailNo).style;
				li.width="48.7%";
				break;
			case 3:
				li = document.getElementById("itemBottom_third_li"+DetailNo).style;
				if(DetailNo == 0){
					document.getElementById("subTabLine1").style.display = "none";
					document.getElementById("subTabLine2").style.display = "block";
				}
				else if(DetailNo == 1){
					document.getElementById("subTabLine1").style.display = "none";
					document.getElementById("subTabLine2").style.display = "none";
				}
				else if(DetailNo == 2){
					document.getElementById("subTabLine1").style.display = "block";
					document.getElementById("subTabLine2").style.display = "none";
				}
				break;
			case 4:
					li = document.getElementById("itemBottom_fourth_li"+DetailNo).style;
					
					if(DetailNo == 0){
						document.getElementById("subTabLine1").style.display = "none";
						document.getElementById("subTabLine2").style.display = "block";
						document.getElementById("subTabLine3").style.display = "block";
					}
					else if(DetailNo == 1){
						document.getElementById("subTabLine1").style.display = "none";
						document.getElementById("subTabLine2").style.display = "none";
						document.getElementById("subTabLine3").style.display = "block";
					}
					else if(DetailNo == 2){
						document.getElementById("subTabLine1").style.display = "block";
						document.getElementById("subTabLine2").style.display = "none";
						document.getElementById("subTabLine3").style.display = "none";
					}else if(DetailNo == 3){
						document.getElementById("subTabLine1").style.display = "block";
						document.getElementById("subTabLine2").style.display = "block";
						document.getElementById("subTabLine3").style.display = "none";
					}
				}
		
			li.height="3.35em";
			li.lineHeight ="3.5em";
			
			li.fontWeight="bold";
			li.border="1px solid #74A4D5";		//해당 아이디의 스타일 변경
			li.background="#FFFFFF";
			li.color="#000000";
		}
		else{
			tabmenu =  document.getElementById("tabmenuDetail"+i).style;
			tabmenu.display = "none";
			switch(tabCount){
			case 2:
				li = document.getElementById("itemBottom_li"+i).style;
				li.width="48.7%";
				break;
			case 3:
				li = document.getElementById("itemBottom_third_li"+i).style;
				break;
			case 4:
					li = document.getElementById("itemBottom_fourth_li"+i).style;
					break;
			}
			li.height="3.35em";
			
			li.lineHeight="3.5em";
			li.background="#74A4D5";
			li.color="#FFFFFF";
			
		}
	}
}

//탭 서브 메뉴 선택 함수
function tabSubmenuEvent(DetailNo,tabCount,SubTabCount,curr_idx){	//내용 보여줄 div 숫자, 탭 갯수, 서브탭 갯수, 슬라이드 탭에서의 슬라이드 횟수
	
	
	var tabmenu;
	var li;
	
	for(var i=curr_idx; i<SubTabCount; i++){
		
		if(i==DetailNo){
			
			switch(tabCount){
			case 1:
				tabmenu = document.getElementById("tabSubmenuDetail"+DetailNo).style;
				if(SubTabCount == 2){
					li = document.getElementById("itemBottomSub_li"+DetailNo).style;
				}else if(SubTabCount == 3){
					li = document.getElementById("itemBottomThirdSub_li"+DetailNo).style;
				}else{
					li = document.getElementById("itemBottomFourthSub_li"+DetailNo).style;
				}
				break;
			
			case 2:
				tabmenu = document.getElementById("tabSubmenu2Detail"+DetailNo).style;
				li = document.getElementById("itemBottomThirdSub2_li"+DetailNo).style;
				
				break;
			case 3:
				tabmenu = document.getElementById("tabSubmenu3Detail"+DetailNo).style;
				li = document.getElementById("itemBottomFourthSub3_li"+DetailNo).style;
				break;
			}
			
			tabmenu.display = "block";
			if(tabCount == 4){
				li.borderTop ="1px solid #74A4D5";
			}else{
				
			}
			
			li.background="#FFFFFF";
			li.color="#000000";
			li.fontWeight="bold";
		}
		else{				
			switch(tabCount){
			case 1:
				tabmenu = document.getElementById("tabSubmenuDetail"+i).style;
				if(SubTabCount == 2){
					li = document.getElementById("itemBottomSub_li"+i).style;
				}else if(SubTabCount == 3){
					li = document.getElementById("itemBottomThirdSub_li"+i).style;
				}else{
					li = document.getElementById("itemBottomFourthSub_li"+i).style;
				}
				break;
			
			case 2:
				tabmenu = document.getElementById("tabSubmenu2Detail"+i).style;
				li = document.getElementById("itemBottomThirdSub2_li"+i).style;
				break;
			case 3:
				tabmenu = document.getElementById("tabSubmenu3Detail"+i).style;
				li = document.getElementById("itemBottomFourthSub3_li"+i).style;
				break;
			}
			
			if(tabCount == 4){
				li.border="0";
			}
			tabmenu.display = "none";
		
			li.background="#FFFFFF";
			li.color="#666666";
		}
	}
}

function paging(num){
	var paging = document.getElementById("pagingNew");
	var htmlText = "";
	for(var i=1; i<6; i++){
		if(i == num){
			htmlText += "<a href='#' style='border: 1px solid #2C578C; background: #5282bc;color:#FFFFFF;' onclick='paging("+i+");'>"+i+"</a>";
		}else{
			htmlText += "<a href='#' onclick='paging("+i+");'>"+i+"</a>";
		}
	}
	
	paging.innerHTML = htmlText;
}

function imageSlider(w, cnt)
{
    // Global Variable
    imageList = new Object();
    item_width = w*cnt;
    curr_position = 0;
    curr_idx = 0;
    tmp = 0;

    var slider = document.getElementById("imageSlider");
    var groups = slider.getElementsByTagName("div");
    for(var i=0; i < groups.length; i++)
    {
        if(groups[i].className == "imageList") imageList = groups[i].getElementsByTagName("ul")[0]; // Image List (UL Element)
    }
    var lis = imageList.getElementsByTagName("li");
    imageList.style.width = (w * lis.length) + "px";
    
    // Controller
    var bts = slider.getElementsByTagName("img");
    for(var i=0; i<bts.length; i++)
    {
        if(bts[i].className == 'btn_prev')
        {
            bts[i].onclick = function() { sliderPrev(cnt); } // Click To Prev
        }
        else if(bts[i].className == 'btn_next')
        {
            bts[i].onclick = function() { sliderNext(cnt); } // Click To Next
        }
    }
}

function sliderNext(cnt) // Next Behavior
{
    if(curr_idx < 5)
    {
        imageList.style.left = (curr_position - item_width) + "px";
        curr_position -= item_width;
        for(var i=0; i<cnt; i++) curr_idx++;
    }
    else
    {
 
		}
}

function sliderPrev(cnt) // Prev Behavior
{
    if(curr_idx > 0)
    {
        imageList.style.left = (curr_position + item_width) + "px";
        curr_position += item_width;
        for(var i=0; i<cnt; i++) curr_idx--;
    }
    else
    {
 
    }
}

function imgshow(a) {
	document.getElementById("imageshowname").src=a;
}

/* 주소창 자동 숨김 */
window.addEventListener('load', function(){
    setTimeout(function() { 
 window.scrollTo(0, 1);
    }, 100);
}, false);



//메인 비쥬얼
var old_vi = 1;
function viControl(sel) {	
	var timegap = 10000;	
	var num = $(".visual>li").length;
	
	id = setInterval(rotation, timegap);
	function rotation() {
		if (sel == num) {
			sel = 1;	
		} else {
			sel++;
		}
		var old_img = $(".vi"+old_vi);
		var new_img = $(".vi"+sel);
		
		$(old_img).fadeOut(700);
		$(new_img).fadeIn(700);
		
		old_vi = sel;
	}	
	//이전버튼
	viPre = function(){
		if (sel == 1) {
			sel = num;		
		} else {
			sel--;
		}
		
		var old_img = $(".vi"+old_vi);
		var new_img = $(".vi"+sel);
		
		$(old_img).fadeOut(700);
		$(new_img).fadeIn(700);
		
		old_vi = sel;
	}
	//다음버튼
	viNext = function(){
		if (sel == num) {
			sel = 1;		
		} else {
			sel++;
		}
		var old_img = $(".vi"+old_vi);
		var new_img = $(".vi"+sel);
		
		$(old_img).fadeOut(700);
		$(new_img).fadeIn(700);
		
		old_vi = sel;
	}
}


