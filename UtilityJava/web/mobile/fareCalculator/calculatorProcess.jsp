<%@page import="kr.co.ds.conf.FareCalculator"%>
<%@ page language="java" import="java.util.*" pageEncoding="euc-kr"%>
<%
	FareCalculator fareCalculator = null;
	String jobType = null;
	String result = null;
	
	jobType = request.getParameter("JOBTYPE");
	
	fareCalculator = new FareCalculator();
	
	if ( jobType != null && jobType.length() > 0){
		if ( jobType.equals("C")){
			
			// ��� 
			result = fareCalculator.calculator(request);	
		}else if ( jobType.equals("L") ){
			
			// ���
			result = fareCalculator.getPalletList();
		}
	}
	System.out.println(result);
	out.print(result);
%>
