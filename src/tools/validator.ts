export function emailValidator(email: string): boolean {
	return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(
		email
	);
}

export function mobileNumberValidator(number: string): boolean {
	return /09\d{2}(\d{6}|-\d{3}-\d{3})$/.test(number);
}

export function naturalValidator(string: string): boolean {
	return /^[a-zA-Z]{2}[0-9]{14}$/.test(string);
}

export function barcodeValidator(string: string): boolean {
	return /^\/{1}[0-9A-Z.+-]{7}$/.test(string);
}

export function ubnValidator(string: string): boolean {
	return /^[0-9]{8}$/.test(string);
}

export function isValidPathSegment(segment: string): boolean {
	// 允许字母、数字、破折号、下划线、中文字符及百分号编码
	const validPattern = /^[a-zA-Z0-9-_\u4e00-\u9fff]+|(%[0-9a-fA-F]{2})+$/;
	return validPattern.test(segment);
}

export function isChineseEncode(str: string): boolean {
	const chinesePattern = /[\u4e00-\u9fff]/;
	return chinesePattern.test(str);
}

export function decodeIfChineseEncoded(str: string): string {
	if (isChineseEncode(str)) {
		return decodeURI(str);
	} else {
		return str;
	}
}
