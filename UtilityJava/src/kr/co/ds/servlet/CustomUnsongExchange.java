package kr.co.ds.servlet;

/**
 * 
 */

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.json.JSONException;
import org.json.JSONObject;

public class CustomUnsongExchange {

	// API 주소
	private static final String HOST_URL = "http://127.0.0.1:8090/Custem-unsong";

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		exchangeUnsong();
	}

	public static void exchangeUnsong() {
		HttpURLConnection conn = null;
		JSONObject responseJson = null;

		try {
			URL url = new URL(HOST_URL);

			conn = (HttpURLConnection) url.openConnection();
			conn.setConnectTimeout(5000);
			conn.setReadTimeout(5000);
			conn.setRequestMethod("GET");
			// conn.setDoOutput(true);

			JSONObject commands = new JSONObject();

			int responseCode = conn.getResponseCode();
			if (responseCode == 400 || responseCode == 401 || responseCode == 500) {
				System.out.println(responseCode + " Error!");
			} else {
				BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				StringBuilder sb = new StringBuilder();
				String line = "";
				while ((line = br.readLine()) != null) {
					sb.append(line);
				}
				responseJson = new JSONObject(sb.toString());
				System.out.println(responseJson);
			}
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			System.out.println("not JSON Format response");
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
