package kr.co.ds.servlet;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import java.util.Calendar;

/**
 * Servlet implementation class CustomUnsongAction
 * /**
 * 업무 정의
 * 
 * 1. 운송장 발행
 * 2. 운송장 수정
 * 3. 운송장 삭제
 * 4. 바코드 출력용 데이터 제공 
 * 5. 
 */

@WebServlet("/Custem-unsong")
public class CustomUnsongAction extends HttpServlet {
	private static final long serialVersionUID = 1L;
	Logger logger = Logger.getLogger(this.getClass());

	/**
	 * Default constructor.
	 */
	public CustomUnsongAction() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see Servlet#init(ServletConfig)
	 */
	public void init(ServletConfig config) throws ServletException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Servlet#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		// response.getWriter().append("Served at: ").append(request.getContextPath());
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/plain");
		response.setCharacterEncoding("utf-8");
		response.setHeader("Access-Control-Allow-Origin", "*");

		// key 값을 받아 처리
		logger.info(" . Request(" + Calendar.getInstance().getTime() + "2022 01 03 API DOC Make");

		httpServiceAct(response);
	}

	/**
	 * 기능 처리
	 * 
	 * @param response
	 */
	protected void httpServiceAct(HttpServletResponse response) {

		String jsonTxt = "{\"code\":\"200\", \"msg\":\"success\"}";
		print(jsonTxt, response);
	}

	/**
	 * 화면 출력
	 * 
	 * @param msg
	 * @param response
	 */
	protected void print(String msg, HttpServletResponse response) {

		OutputStream os;
		try {
			os = response.getOutputStream();
			PrintStream out = new PrintStream(os, true);
			out.print(msg);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}