import cookies from "js-cookie";

export function convertCookieObjArrayToString(arr: any[]): string {
	return arr.map((obj) => `${obj?.name}=${obj?.value}`).join(";");
}

export function formatTimestampToDateString(
	timestamp: number | string
): string {
	// Ensure the timestamp is a number
	const timestampNumber =
		typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp;

	// Convert seconds to milliseconds and create a Date object
	const date = new Date(timestampNumber * 1000);

	// Extract year, month, and day
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
	const day = String(date.getDate()).padStart(2, "0");

	// Format the date as "yyyy-mm-dd"
	return `${year}-${month}-${day}`;
}

export function replaceNewlinesWithBreaks(input: string): string {
	return input.replace(/\r?\n/g, "<br />");
}

export function isLoginWithinYear() {
	if (cookies.get("udngold") && cookies.get("udnland")) return true;
	return false;
}

export function isLoginWithinDay() {
	if (
		cookies.get("udngold") &&
		cookies.get("udnland") &&
		cookies.get("um2") &&
		cookies.get("udnmember")
	) {
		console.log(`cookies.get("um2"): `, cookies.get("um2"));
		console.log(`cookies.get("udnmember"): `, cookies.get("udnmember"));
		return true;
	}
	console.log("not isLoginWithinDay");
	return false;
}
