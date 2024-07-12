"use client";

import React, { useEffect, useRef, useState } from "react";

interface Base64ToCanvasProps {
	base64Text: string;
}

const Base64ToCanvas: React.FC<Base64ToCanvasProps> = ({ base64Text }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isDrawed, setIsDrawed] = useState(false);

	useEffect(() => {
		//64 -> 字
		const decodedText = decodeBase64(base64Text);

		//分 line
		const lines = parseHtmlToLines(decodedText);

		//canvas
		const canvas = canvasRef.current;
		if (!canvas) return;

		//context
		const context = canvas.getContext("2d");
		if (!context) return;

		if (isDrawed) return;

		//
		const canvasWidth = canvas.parentElement?.clientWidth || window.innerWidth;
		//const canvasHeight = calculateCanvasHeight(context, lines, canvasWidth);

		canvas.width = canvasWidth;
		canvas.height = 10000;

		context.font = "18px Arial";

		drawTextLines(context, lines, 0, 24, 24, canvas.width);
		setIsDrawed(true);

		//
	}, [base64Text]);

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

	const parseHtmlToLines = (html: string): string[] => {
		return html.split("<br>");
	};

	// const drawTextLines = (
	// 	context: CanvasRenderingContext2D,
	// 	lines: string[],
	// 	x: number,
	// 	y: number,
	// 	lineHeight: number,
	// 	maxWidth: number
	// ) => {
	// 	let currentY = y;
	// 	lines.forEach((line) => {
	// 		const words = line.trim().split("");
	// 		let lineText = "";

	// 		words.forEach((word) => {
	// 			//
	// 			const testLine = lineText + word + "";
	// 			const metrics = context.measureText(testLine);

	// 			const testWidth = metrics.width;

	// 			if (testWidth > maxWidth && lineText !== "") {
	// 				//
	// 				context.fillText(lineText.trim(), x, currentY);
	// 				lineText = word + "";
	// 				currentY += lineHeight;
	// 			} else {
	// 				lineText = testLine;
	// 			}
	// 		});

	// 		context.fillText(lineText.trim(), x, currentY);
	// 		currentY += lineHeight;
	// 	});
	// };

	const drawTextLines = (
		context: CanvasRenderingContext2D,
		lines: string[],
		x: number,
		y: number,
		lineHeight: number,
		maxWidth: number
	) => {
		let currentY = y;

		lines.forEach((line) => {
			let lineText = "";
			let testLine = "";
			let testWidth = 0;

			for (const char of line) {
				testLine = lineText + char;
				testWidth = context.measureText(testLine).width;

				if (testWidth > maxWidth && lineText !== "") {
					context.fillText(lineText, x, currentY);
					lineText = char;
					currentY += lineHeight;
				} else {
					lineText = testLine;
				}
			}

			if (lineText) {
				context.fillText(lineText, x, currentY);
				currentY += lineHeight;
			}
		});
	};

	return (
		<canvas
			ref={canvasRef}
			style={{ width: "100%", height: "auto", outline: "1px solid orange" }}
		></canvas>
	);
};

export default Base64ToCanvas;
