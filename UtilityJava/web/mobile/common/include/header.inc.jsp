<%@ page language="java" import="java.util.*" pageEncoding="euc-kr"%>

<link rel="stylesheet" type="text/css" media="screen"  href="/mobile/common/css/common.css" />
<script type="text/javascript" src="/mobile/common/js/jquery.js"></script>
<script type="text/javascript" src="/mobile/common/js/jquery.min.js"></script>
<script type="text/javascript" src="/mobile/common/js/jquery.touchSlider.js"></script>

<script type="text/javascript">
$(document).ready(function() {
	
	$("#touchSlider").touchSlider({
		flexible : true,
		btn_prev : $("#touchSlider").next().find(".btn_prev"),
		btn_next : $("#touchSlider").next().find(".btn_next"),
		counter : function (e) {
			$("#count").html("" + e.current + " / " + e.total);
		}
	});

});              
</script>            

</head>	

<body onload="showHot=true;self.focus();">
  <div id="wrap">
    
