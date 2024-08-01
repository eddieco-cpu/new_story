import axios from "axios";
const querystring = require("querystring");

const env = process.env.NODE_ENV;

const axiosInstance = axios.create({
	xsrfCookieName: "",
	xsrfHeaderName: "",
	withCredentials: true,
});

export function postForm(url: string, data: any) {
	//post without cookie && Content-Type is application/x-www-form-urlencoded
	const formData = new URLSearchParams();
	for (let key in data) {
		formData.append(key, data[key]);
	}

	return axiosInstance.post(url, formData, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
		method: "POST",
	});
}

export function postData(url: string, data: any, option = { auth: true }) {
	//post with cookie
	//content-type: automatically set
	/**
	 * 當使用 Axios 並且沒有明確指定 Content-Type 時，Axios 會根據發送的數據類型自動設置 Content-Type。
	 * 如果數據是普通對象：Axios 會將 Content-Type 設置為 application/json;charset=utf-8，並將對象序列化為 JSON 字符串。
	 * 其他類型（如 URLSearchParams）：將設置為 application/x-www-form-urlencoded;charset=utf-8。
	 */

	const axiosInstance = axios.create({
		xsrfCookieName: "",
		xsrfHeaderName: "",
		withCredentials: true,
	});
	return axiosInstance({
		url,
		data,
		withCredentials: option.auth,
		method: "POST",
	});
}

export function getData(url: string, option = { auth: true }) {
	//get with cookie
	return axiosInstance({
		url,
		withCredentials: option.auth,
		method: "GET",
	});
}

export async function fetchDataWithCookieInServer(
	url: string,
	cookie: string
): Promise<any> {
	try {
		const response = await fetch(url, {
			method: "GET", // 或是 'POST'
			headers: {
				"Content-Type": "application/json",
				Cookie: cookie,
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching data: ", error);
		return null;
	}
}
