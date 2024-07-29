"use client";

import React, { useState, useEffect } from "react";

import FabricCanvasCreator from "./FabricCanvasCreator";

const decodeBase64 = (base64: string): string => {
	const binaryString = atob(base64);
	const len = binaryString.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	const decodedText = new TextDecoder().decode(bytes);

	return decodedText;
};

function splitByImgTags(decodedText: string): string[] {
	// 匹配 <img> 正則表達式
	const imgTagPattern = /(<img[^>]*>)/gi;

	// 使用正則表達式進行拆分，保留 <img> 標籤
	const parts = decodedText.split(imgTagPattern);

	// 過濾掉空字符串
	return parts.filter((part) => part !== "");
}

function splitTextByConditions(text: string): string[] {
	const maxLength = 1000; // if > 1000, need to split into multiple parts
	const maxBrCount = 100; // if > 100, need to split into multiple parts
	const brPattern = /<br\s*\/?>/gi;

	// 計算 <br> 標籤的數量
	const brCount = (text.match(brPattern) || []).length;

	// 檢查條件，如果不滿足條件，返回原文本
	if (text.length <= maxLength && brCount <= maxBrCount) {
		return [text];
	}

	// 依 <br> 拆分成多個部分
	let parts = text.split(brPattern);

	// 如果連續 maxLength 字元都沒有 <br> 標籤，則應尋找。 、 ， 等標點符號進行拆分
	// to be continued

	const results: string[] = [];
	let currentPart = "";

	parts.forEach((part, i) => {
		if (currentPart.length + part.length < maxLength) {
			currentPart += `${part}\n`;
		} else {
			results.push(currentPart);
			currentPart = `${part}\n`;
		}
	});

	if (currentPart.length > 0) {
		results.push(currentPart);
	}

	return results;
}

function processDecodedText(decodedText: string): string[] {
	const splitTexts = splitByImgTags(decodedText);
	const results: string[] = [];

	splitTexts.forEach((part) => {
		if (part.startsWith("<img")) {
			results.push(part);
		} else {
			const furtherSplit = splitTextByConditions(part);
			results.push(...furtherSplit);
		}
	});

	return results;
}

export default function ArticleBox({ pieceBase64 }: { pieceBase64: string }) {
	//
	const [decodedHtmls, setDecodedHtmls] = useState<string[]>([]);

	useEffect(() => {
		//
		//const decodedText = decodeBase64(base64Text);
		const decodedText = decodeBase64(pieceBase64);

		//console.log("decodedText: \n", decodedText, decodedText.length);

		//
		let decodedTexts = processDecodedText(decodedText);
		//console.log("decodedTexts: \n", decodedTexts);

		//
		setDecodedHtmls(() => decodedTexts);
		//
	}, []);

	return (
		<div className="piece">
			{decodedHtmls.map((decodedHtml, i) =>
				decodedHtml.startsWith("<img") ? (
					<div
						key={i}
						dangerouslySetInnerHTML={{ __html: decodedHtml }}
						className="*:block *:max-w-full"
					></div>
				) : (
					<FabricCanvasCreator
						decodedHtml={decodedHtml}
						key={i}
					></FabricCanvasCreator>
				)
			)}
		</div>
	);
}
