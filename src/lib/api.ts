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

export async function fetchData(url: string): Promise<any> {
	//get without cookie
	try {
		const res: Response = await fetch(url);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const data: any = await res.json();
		return data;
	} catch (error) {
		console.error("Fetch error:", error);
		return null;
	}
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

export const STORY_DOMAIN = "https://story-onlinelab.udn.com";
export const STORY_PATH = "/story3";
export const SHOW_STORE_PRODUCT = STORY_PATH + "/ShowStoreProduct";
export const SHOW_STORE_PRODUCT_CHAPTER =
	STORY_PATH + "/ShowStoreProductChapter";
export const SHOW_CATEGORY = STORY_PATH + "/ShowCategory";
export const READ_CHAPTER = STORY_PATH + "/ReadChapter";
export const COLLECT_MANAGER = STORY_PATH + "/CollectManager";
export const ACCOUNT_DATA = STORY_PATH + "/AccountData";
export const TERMS = STORY_PATH + "/Terms";
export const SHOW_STORE_PRODUCT_LIST = STORY_PATH + "/ShowStoreProductList";
export const FOLLOW_CONTROL = STORY_PATH + "/FollowControl";
export const SHOW_PUBLISHER = STORY_PATH + "/ShowPublisher";
export const SHOW_CATEGORY_DIVISIONS = STORY_PATH + "/IndexDiv";
