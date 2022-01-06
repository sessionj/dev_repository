<%@page import="kr.co.ds.conf.FareCalculator"%>
<%@page import="java.text.DecimalFormat"%>
<%@page import="com.framework.util.StringUtil"%>
<%@page import="com.framework.dbwork.Query"%>
<%@page import="com.framework.dbhelper.DBResource"%>
<%@page import="com.framework.dbhelper.PublicQueryManager"%>
<%@ page language="java" import="java.util.*" pageEncoding="euc-kr"%>
<%-- <%@include file="/mobile/common/include/common.inc.jsp"%> --%>
<title>운임계산기 | 대신모바일</title>
<%-- <%@include file="/mobile/common/include/header.inc.jsp"%>  --%> 

<script src="/mobile/fareCalculator/comm/js/common.js"></script>
<script type="text/javascript" src="/mobile/common/js/jquery.js"></script>
<script type="text/javascript" src="/mobile/common/js/jquery.min.js"></script>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.min.js"></script> 
<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

<link rel="stylesheet" type="text/css" media="screen"  href="/mobile/fareCalculator/comm/css/style.css" />
<link rel="stylesheet" type="text/css" media="screen"  href="/mobile/common/css/common.css" />

	<script>
	
		$(document).ready(function(){
			// 초기화
			formReset();
			contentView();
			// 계산 버튼 클릭
			$( '#calculatorBtn' ).click( function() {
				fSearch();
			});
			// 계산 초기화 버튼 클릭
			$( '#calculatorReset' ).click( function() {
				formReset();
			});
			
			$("#width").change(function(){
				calculator();
			});
			$("#vertical").change(function(){
				calculator();
			});
			$("#height").change(function(){
				calculator();
			});

		});
		
		/* form check */
		function formCheck(){
			console.log('==========> form 체크');
			if ( !$('#width').val()){
				Swal.fire('가로 사이즈를 입력해주세요');
				return false;
			}
			if ( !$('#vertical').val()){
				Swal.fire('세로 사이즈를 입력해주세요');	
				return false;
			}
			if ( !$('#height').val()){
				Swal.fire('높이 사이즈를 입력해주세요');	
				return false;
			}
			if ( !$('#weight').val()){
				Swal.fire('무게를 입력해주세요');	
				return false;
			}
			
			return true;
		}
		
		function contentView (){
			
			AjaxContentRequester.loadByAjax(
					'POST', 
					'./calculatorProcess.jsp?JOBTYPE=L',
					$("#calFrm").serialize(), 
					'', function(data) {
						console.log(data);
						var jsonObj = JSON.parse(data);
						console.log(jsonObj.pallet_no);

						//if (jsonObj.msg == 'SUCCESS') {
							//$('#DELIVERYAMOUNT').html(createComma(jsonObj.delivery_amount));
							//$('#FIXAMOUNT').html(createComma(jsonObj.fix_amount));
						//}
					})
			
		}
		
		/* form reset */
		function formReset(fName){
			$('#calFrm')[0].reset();
			$('#DELIVERYAMOUNT').html('0');
			$('#FIXAMOUNT').html('0');
			unCheckedAll('calFrm');
		} 
		
		function fSearch(){
			
			if ( formCheck() ){
				AjaxContentRequester.loadByAjax(
					'POST', 
					'./calculatorProcess.jsp',
					$("#calFrm").serialize(), 
					'', function(data) {
						console.log(data);
						var jsonObj = JSON.parse(data);
						console.log(jsonObj.msg);

						if (jsonObj.msg == 'SUCCESS') {
							$('#DELIVERYAMOUNT').html(createComma(jsonObj.delivery_amount));
							$('#FIXAMOUNT').html(createComma(jsonObj.fix_amount));
						}
					});
			}
		}

		/* 가로 * 세로 * 높이 결과값 제공 */
		function calculator() {
			$('#calculatorResult').html(
							createComma(Number($('#width').val())
							* Number($('#vertical').val())
							* Number($('#height').val())));
			$('#totalVolume').val(
							createComma(Number($('#width').val()) 
							* Number($('#vertical').val())
							* Number($('#height').val())));
		}
	</script> 
	<div class="loader" id="loader"></div>
	<!--메인top S-->
	<div id="mainTop">
	  <div class="mainTopLeft" ><a href="/mobile/loadPlan/list.jsp"><img src="/mobile/common/images/common/logo_ds.gif" style="vertical-align:middle;"></a></div>
      <div class="mainTopRight" style="width:60%;padding-top: 20px;">
         <p style="float:right;">
		 	<span style="font-size: 12px; font-weight: bold;"> + 운임계산기</span>
		 </p>
       </div>
	</div>
    <!--메인top E-->    
   	
   	<!-- form -->
	<div id="mainmenu01">
		<form id="calFrm" name="calFrm">
			<input type="hidden" name="totalVolume" id="totalVolume">
			<input type="hidden" name="JOBTYPE" id="JOBTYPE" value="C">
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
		        			<th rowspan="3" style="border-right: 1px solid #52a203;">부피(㎝)</th>
		        			<th>가로</th>
		        			<td><input class="form-control text-center" type="text" name="width" id="width" style="background: #F6F6F6; border: 0px;" placeholder="가로(㎝)" required HNAME="가로" MAXBYTE=9 maxlength="9" 
		        					oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
		        					></td>
		        			<td rowspan="3"><span style="color: blue; font-weight: bold;" id="calculatorResult">0</span>(㎝)</td>
		        		</tr>
		        		<tr>
		        			<th>세로</th>
		        			<td><input class="form-control text-center" type="text" name="vertical" id="vertical" style="background: #F6F6F6; border: 0px;" placeholder="세로(㎝)" required HNAME="세로" MAXBYTE=9 maxlength="9"
		        					oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
		        					></td>
		        		</tr>
		        		<tr>
		        			<th>높이</th>
		        			<td><input class="form-control text-center" type="text" name="height" id="height" style="background: #F6F6F6; border: 0px;" placeholder="높이(㎝)" required HNAME="높이" MAXBYTE=9 maxlength="9"
		        					oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
		        					></td>
		        		</tr>
		        		<tr>
		        			<th style="border-right: 1px solid #52a203;border-top: 1px solid #52a203;border-bottom:1px solid #52a203"">무게(㎏)</th>
		        			<th style="border-top: 1px solid #52a203;border-bottom:1px solid #52a203"" >무게</th>
		        			<td style="border-top: 1px solid #52a203;border-bottom:1px solid #52a203""><input class="form-control text-center" type="text" name="weight" id="weight" style="background: #F6F6F6; border: 0px;" placeholder="무게(㎏)" NOTEMPTY HNAME="높이" MAXBYTE=9 maxlength="9"
		        					oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
		        					></td>
		        			<td style="border-top: 1px solid #52a203; border-bottom:1px solid #52a203"></td>
		        		</tr>
	        		</thead>
	        	</table>
	        </div>
	        
	        <div id="f_02" >
	        	<table class="table table-bordered  text-center m-b-30" >
	        		<colgroup>
	        			<col width="20%" />  
	        			<col width="20%" />
	        			<col />
	        			<col width="25%" />
	        		</colgroup>
	        		<thead>
	        			
	        			<tr>
		        			<th rowspan="2" style="border-right: 1px solid #52a203;">장재물</th>
		        			<td style="padding-bottom: 7px;">
		        			<label class="container"><input type="checkbox"><span class="checkmark">
		        			</td>
		        			<td class="left">길이초과</td>
		        			<td class="left">30%</td>
		        		</tr>
		        		<tr>
		        			<td style="padding-bottom: 7px;">
		        			<label class="container"><input type="checkbox"><span class="checkmark">
		        			</td>
		        			<td class="left">중량 200kg 초과</td>
		        			<td class="left">50%</td>
		        		</tr>
	        		
		        		<tr>
		        			<th rowspan="4" style="border-right: 1px solid #52a203;">파렛트</th>
		        			<td style="padding-bottom: 7px;">
		        			<label class="container"><input type="checkbox"><span class="checkmark">
		        			</td>
		        			<td class="left">높이 12cm 초과</td>
		        			<td class="left">30%</td>
		        		</tr>
		        		<tr>
		        			<td style="padding-bottom: 7px;">
		        			<label class="container"><input type="checkbox" ><span class="checkmark">
		        			</td>
		        			<td class="left">폭/너비 110㎝ 초과</td>
		        			<td class="left">30%</td>
		        		</tr>
		        		<tr>
		        			<td style="padding-bottom: 7px;">
		        			<label class="container"><input type="checkbox" ><span class="checkmark">
		        			</td>
		        			<td class="left">중량 1톤 초과</td>
		        			<td class="left">30%</td>
		        		</tr>
		        		<tr>
		        			<td style="padding-bottom: 7px;">
		        			<label class="container"><input type="checkbox" ><span class="checkmark">
		        			</td>
		        			<td class="left">상단부 돌출</td>
		        			<td class="left">30%</td>
		        		</tr>
	        		</thead>
	        	</table>
	        </div>
	        <!-- 계산버튼 영역 -->
	        <div id="mainTop09"></div>
	        
	        <div id="f_02" class="m-t-10"> 
	        	<span class="f-right" id="calculatorBtn"><a href="#" class=" modal-open btn btn-primary  "><i class="icofont icofont-page"></i> 운임계산 </a></span>
	        	<span class="f-right" id="calculatorReset"><a href="#" class=" modal-open btn btn-warning  "><i class="icofont icofont-page"></i> 초기화 </a></span>
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
		        			<th class="b-c-r"><span id="DELIVERYAMOUNT">0</span></th>
		        			<th>택배</th>
		        			<th class="b-c-r"><span id="FIXAMOUNT">0</span></th>
		        		</tr>
	        		</thead>
	        	</table>
	        </div>
        </form>
    </div>
         
    <!--푸터S-->
    <div id="footer"><span style="float:center; padding-right:10px; font-size:13px;">&nbsp;※ 금액은 예상 금액이며, 실제 금액과 다를 수 있습니다.</span></div>
    <!--푸터E-->
	<br/><br/><br/><br/>
  </div>

	
</body>
</html>
