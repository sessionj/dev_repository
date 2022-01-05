<%@page import="java.text.DecimalFormat"%>

<%@ page language="java" import="java.util.*" pageEncoding="euc-kr"%>
<%@include file="/mobile/common/include/common.inc.jsp"%>
<title>운임계산기 | 대신모바일</title>
<%@include file="/mobile/common/include/header.inc.jsp"%>  

<%

	Calendar cal = Calendar.getInstance();
	PublicQueryManager qryMgr = null;
	DBResource dbr = null;
	String query = null;
	String streetCode = null;
	             
	String date = null;
	String sMonth = null;
	String sDay = null;
	
	int cyear = cal.get(Calendar.YEAR);
    int cmonth = cal.get(Calendar.MONTH) + 1;
    int cday = cal.get(Calendar.DATE);
    
    DecimalFormat sdf = new DecimalFormat("###,###");

	date = request.getParameter("inputDate") == null ? "" : request.getParameter("inputDate") ;

	if( date.equals("") ){
    
		sMonth = ( cmonth < 10) ? "0" + cmonth : String.valueOf(cmonth);
		sDay = ( cday < 10) ? "0" + cday : String.valueOf(cday);

		date = cyear + sMonth + sDay;
    }
    
    // 테스트
    //date = "20130411";
    
    streetCode = request.getParameter("streetCode");
    
    if( streetCode != null && !streetCode.equals("")){
			
		query = "SELECT   MAX (DECODE (x.frto, 'fr', x.agencycode, '')) AS stagencycode, "+
			"         MAX (DECODE (x.frto, 'to', x.agencycode, '')) AS edagencycode, "+
			"         MAX (DECODE (x.frto, 'fr', x.agencyname, '')) AS stagencyname, "+
			"         MAX (DECODE (x.frto, 'to', x.agencyname, '')) AS edagencyname, "+
			"         TO_CHAR (SUM (DECODE (x.frto, 'fr', x.fare, 0)), "+
			"                  '999,999,999,999' "+
			"                 ) AS sendfare, "+
			"         TO_CHAR (SUM (DECODE (x.frto, 'to', x.fare, 0)), "+
			"                  '999,999,999,999' "+
			"                 ) AS arrivefare, "+
			"         gubun "+
			"    FROM (SELECT a.agencycode, code.lib.f_agency (a.agencycode) agencyname, "+
			"                 b.fare, DECODE (?, beflinecode, 'to', 'fr') frto, "+
			"                 d.passorder, a.aftlinecode, a.beflinecode, '909302', "+
			"                 DECODE "+
			"                    (?, "+
			"                     beflinecode, DECODE "+
			"                                (SUBSTR (a.aftlinecode, 1, 1), "+
			"                                 '0', '1', "+
			"                                 CASE "+
			"                                    WHEN a.progressno > 1 "+
			"                                    AND SUBSTR (a.aftlinecode, 1, 1) <> '0' "+
			"                                    AND SUBSTR (a.beflinecode, 1, 1) <> '0' "+
			"                                       THEN '2' "+
			"                                    ELSE '3' "+
			"                                 END "+
			"                                ), "+
			"                     '3' "+
			"                    ) AS gubun "+
			"            FROM receipt.unsongtransway a, "+
			"                 receipt.unsong b, "+
			"                 (SELECT passorder, linecode, linename, agencycode "+
			"                    FROM code.globallinecode "+
			"                   WHERE linecode = ?) d "+
			"           WHERE a.input_date = ? "+
			"             AND a.agencycode = d.agencycode "+
			"             AND (a.aftlinecode = d.linecode OR a.beflinecode = d.linecode) "+
			"             AND b.billno = a.billno "+
			"             AND b.dmlgubun <> 'D') x "+
			"GROUP BY x.agencycode, x.agencyname, x.passorder, x.gubun "+
			"ORDER BY x.passorder, x.gubun";

		qryMgr = new PublicQueryManager();
		
		qryMgr.addParam(streetCode);
		qryMgr.addParam(streetCode);
		qryMgr.addParam(streetCode);
		qryMgr.addParam(date);
		
		//System.out.println(query);
		
		dbr = qryMgr.execute(Query.SELECT, query, "search_unsong_standard");
		
	}
 %>
	<script>
		function viewDataPicker(){
			
			window.HybridApp.webToDataPicker();
		}  
		function setDataPicker(data){
			document.getElementById("write_dt").value = data;
		}
		function getCurrentDataCall(){
			var f = document.frm;
			f.action = "./list.jsp";
			f.submit();
		}
		function view(agencyCode, date, frto){
			var f = document.frm;
			var ff = document.f;
			
			f.agencyCode.value = agencyCode;
			f.inputDate.value = date;
			f.frto.value = frto;
			f.streetNames.value = ff.streetNames.value;
			f.streetCodes.value = ff.streetCodes.value;
			f.frtos.value = ff.frtos.value;
			
			f.action = "./view.jsp";
			f.submit();
		}
	</script> 
	<style>
		
		.btn {display: inline-block; font-weight: 400;  padding: .5em .75rem; font-size: 1em; line-height: 20px;  text-align: center; white-space: nowrap; vertical-align: top; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid transparent; font-size:  0.9em; border-radius: .15rem}
		.btn.active.focus, .btn.active:focus, .btn.focus, .btn:active.focus, .btn:active:focus, .btn:focus {outline: 5px auto -webkit-focus-ring-color; outline-offset: -2px}
		.btn:focus, .btn:hover {text-decoration: none}
		.btn.focus {text-decoration: none}
		.btn.active, .btn:active {background-image: none; outline: 0}
		.btn.disabled, .btn:disabled {cursor: not-allowed; opacity: .65}
		a.btn.disabled, fieldset[disabled] a.btn {pointer-events: none}
				
		
		.btn-primary {color: #fff; background-color: #0275d8; border-color: #0275d8}
		.btn-primary:hover {color: #fff; background-color: #025aa5; border-color: #01549b}
		.btn-primary.focus, .btn-primary:focus {color: #fff; background-color: #025aa5; border-color: #01549b}
		.btn-primary.active, .btn-primary:active, .open>.btn-primary.dropdown-toggle {color: #fff; background-color: #025aa5; border-color: #01549b; background-image: none}
		.btn-primary.active.focus, .btn-primary.active:focus, .btn-primary.active:hover, .btn-primary:active.focus, .btn-primary:active:focus, .btn-primary:active:hover, .open>.btn-primary.dropdown-toggle.focus, .open>.btn-primary.dropdown-toggle:focus, .open>.btn-primary.dropdown-toggle:hover {color: #fff; background-color: #014682; border-color: #01315a}
		.btn-primary.disabled.focus, .btn-primary.disabled:focus, .btn-primary:disabled.focus, .btn-primary:disabled:focus {background-color: #0275d8; border-color: #0275d8}
		.btn-primary.disabled:hover, .btn-primary:disabled:hover {background-color: #0275d8; border-color: #0275d8}
		
		.btn-warning {color: #fff; background-color: #f57c00; border-color: #f57c00}
		.btn-warning:hover {color: #fff; background-color: #e07302; border-color: #e07302}
		.btn-warning.focus, .btn-warning:focus {color: #fff; background-color: #f57c00; border-color: #eb9316}
		.btn-warning.active, .btn-warning:active, .open>.btn-warning.dropdown-toggle {color: #fff; background-color: #f57c00; border-color: #eb9316; background-image: none}
		.btn-warning.active.focus, .btn-warning.active:focus, .btn-warning.active:hover, .btn-warning:active.focus, .btn-warning:active:focus, .btn-warning:active:hover, .open>.btn-warning.dropdown-toggle.focus, .open>.btn-warning.dropdown-toggle:focus, .open>.btn-warning.dropdown-toggle:hover {color: #fff; background-color: #d58512; border-color: #b06d0f}
		.btn-warning.disabled.focus, .btn-warning.disabled:focus, .btn-warning:disabled.focus, .btn-warning:disabled:focus {background-color: #f57c00; border-color: #f57c00}
		.btn-warning.disabled:hover, .btn-warning:disabled:hover {background-color: #f57c00; border-color: #f57c00}
		
		.table-bordered {/* border: 1px solid #eceeef; */ width: 100%; border-collapse: collapse; }
		.table-bordered td {/* border: 1px solid #eceeef; */ 	font-weight:400; }
		.table-bordered th {/* border: 1px solid #eceeef; */ vertical-align: middle; font-weight: 500; /* background-color: rgba(0,0,0,0.02); */ font-weight: bold;}
		.table-bordered thead td, .table-bordered thead th {border-bottom-width: 2px; height: 50px;}
		.table-bordered thead td.left {text-align: left}
		
		.text-center { text-align: center; }
		.m-t-10 { margin-top: 10px; }
		.m-t-20 { margin-top: 20px; }
		.m-t-30 { margin-top: 30px; }
		.m-b-10 { margin-bottom: 10px !important; }
		.border0 {border: 2px solid red;}
		
		.form-control {display: block; width: 100%; padding: .5em .75rem; font-size: 1em; line-height: 20px; color: #000000; background-color: #fff; background-image: none; -webkit-background-clip: padding-box; background-clip: padding-box; border: 1px solid rgba(0, 0, 0, .15); border-radius: .05rem}
		.form-control-inline {display: inline-block; width: auto; padding: .5em .75rem; font-size: 1em; line-height: 20px; color: #000000; background-color: #fff; background-image: none; -webkit-background-clip: padding-box; background-clip: padding-box; border: 1px solid rgba(0, 0, 0, .15); border-radius: .25rem}
		input.form-control {padding:0.5em; line-height: 20px; }
		select.form-control {padding:0.5em; line-height: 20px; } 
		.form-control:disabled {  cursor: not-allowed;}
		.form-control:disabled, .form-control[readonly] {  background-color: #eceeef;  opacity: 1;}
		
		.container {
		  display: block;
		  position: relative;
		  padding-left: 35px;
		  margin-bottom: 12px;
		  cursor: pointer;
		  font-size: 22px;
		  -webkit-user-select: none;
		  -moz-user-select: none;
		  -ms-user-select: none;
		  user-select: none;
		}
		
		/* Hide the browser's default checkbox */
		.container input {
		  position: absolute;
		  opacity: 0;
		  cursor: pointer;
		  height: 0;
		  width: 0;
		}
		
		/* Create a custom checkbox */
		.checkmark {
		  position: absolute;
		  top: 0;
		  left: 41.5%;
		  height: 25px;
		  width: 25px;
		  background-color: #eee;
		}
		
		/* On mouse-over, add a grey background color */
		.container:hover input ~ .checkmark {
		  background-color: #ccc;
		}
		
		/* When the checkbox is checked, add a blue background */
		.container input:checked ~ .checkmark {
		  background-color: #2196F3;
		}
		
		/* Create the checkmark/indicator (hidden when not checked) */
		.checkmark:after {
		  content: "";
		  position: absolute;
		  display: none;
		}
		
		/* Show the checkmark when checked */
		.container input:checked ~ .checkmark:after {
		  display: block;
		}
		
		/* Style the checkmark/indicator */
		.container .checkmark:after {
		  left: 9px;
		  top: 5px;
		  width: 5px;
		  height: 10px;
		  border: solid white;
		  border-width: 0 3px 3px 0;
		  -webkit-transform: rotate(45deg);
		  -ms-transform: rotate(45deg);
		  transform: rotate(45deg);
		}
		
	</style>
	<!--메인top S-->
	<div id="mainTop">
	  <div class="mainTopLeft" ><a href="/mobile/loadPlan/list.jsp"><img src="/mobile/common/images/common/logo_ds.gif" style="vertical-align:middle;"></a></div>
      <div class="mainTopRight" style="width:60%;padding-top: 20px;">
         <p style="float:right;">
		 	<span style="font-size: 12px; font-weight: bold;"> + 운임기준표</span>
		 </p>
       </div>
	</div>
    <!--메인top E-->    
   	
   	<!-- form -->
	<div id="mainmenu01">
        <!-- 부피 영역 -->
        <div id="f_01">
        	<table class="table table-bordered  text-center  ">
        		<colgroup>
        			<col width="20%" />
        			<col width="20%" />
        			<col width="20%" />
        			<col />
        		</colgroup>
        		<thead>
	        		<tr>
	        			<th rowspan="3">부피</th>
	        			<th>가로</th>
	        			<td><input class="form-control text-center" type="text" style="background: #F6F6F6; border: 0px;" id="" name="" placeholder="가로(㎝)" NOTEMPTY HNAME="가로" MAXBYTE=9 maxlength="9" ></td>
	        			<td rowspan="3"><span style="color: red; font-weight: bold;">10,000,000</span>(㎝)</td>
	        		</tr>
	        		<tr>
	        			<th>세로</th>
	        			<td><input class="form-control text-center" type="text" style="background: #F6F6F6; border: 0px;" id="" name="" placeholder="세로(㎝)" NOTEMPTY HNAME="세로" MAXBYTE=9 maxlength="9"></td>
	        		</tr>
	        		<tr>
	        			<th>높이</th>
	        			<td><input class="form-control text-center" type="text" style="background: #F6F6F6; border: 0px;" id="" name="" placeholder="높이(㎝)" NOTEMPTY HNAME="높이" MAXBYTE=9 maxlength="9"></td>
	        		</tr>
        		</thead>
        	</table>
        </div>
        
        <div id="f_02" class="m-t-10">
        	<table class="table table-bordered  text-center m-b-30" >
        		<colgroup>
        			<col width="20%" />  
        			<col width="20%" />
        			<col />
        			<col width="25%" />
        		</colgroup>
        		<thead>
	        		<tr>
	        			<th rowspan="4">파렛트</th>
	        			<td style="padding-bottom: 7px;">
	        			<label class="container"><input type="checkbox"><span class="checkmark">
	        			</td>
	        			<td class="left">높이 12cm 초과</td>
	        			<td>30%</td>
	        		</tr>
	        		<tr>
	        			<td style="padding-bottom: 7px;">
	        			<label class="container"><input type="checkbox" ><span class="checkmark">
	        			</td>
	        			<td class="left">폭/너비 110㎝ 초과</td>
	        			<td>30%</td>
	        		</tr>
	        		<tr>
	        			<td style="padding-bottom: 7px;">
	        			<label class="container"><input type="checkbox" ><span class="checkmark">
	        			</td>
	        			<td class="left">중량 1톤 초과</td>
	        			<td>30%</td>
	        		</tr>
	        		<tr>
	        			<td style="padding-bottom: 7px;">
	        			<label class="container"><input type="checkbox" ><span class="checkmark">
	        			</td>
	        			<td class="left">상단부 돌출</td>
	        			<td>30%</td>
	        		</tr>
        		</thead>
        	</table>
        </div>
        <!-- 계산버튼 영역 -->
        <div id="f_02" class="m-t-30">
        	<span class="f-right"><a href="javascript:addPartner();" class=" modal-open btn btn-primary  "><i class="icofont icofont-page"></i> 운임계산 </a></span>
        	<span class="f-right"><a href="javascript:addPartner();" class=" modal-open btn btn-warning  "><i class="icofont icofont-page"></i> 초기화 </a></span>
        </div>
        <!-- 계산 결과값 -->
        <div id="f_03" class="m-t-20">
        	<table class="table table-bordered  text-center" style="width: 70%;margin: auto ">
        		<colgroup>
        			<col width="25%" />
        			<col width="25%" />
        			<col width="25%" />
        			<col width="25%" />
        		</colgroup>
        		<thead>
	        		<tr>
	        			<th>정기화물</th>
	        			<th>20,000</th>
	        			<th>택배</th>
	        			<th>25,000</th>
	        		</tr>
        		</thead>
        	</table>
        </div>
    </div>
         
    <!--푸터S-->
    <div id="footer"><span style="float:center; padding-right:10px; font-size:13px;">&nbsp;+ 입력 상자에 입력 후 검색 버튼을 눌러 활용하세요</span></div>
    <!--푸터E-->
	<br/><br/><br/><br/>
  </div>


</body>
</html>
