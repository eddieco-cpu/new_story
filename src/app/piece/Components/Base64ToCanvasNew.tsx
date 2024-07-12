"use client";

import React, { useEffect, useRef } from "react";

interface Base64ToCanvasProps {
	base64Text: string;
}

// const Base64ToCanvas: React.FC<Base64ToCanvasProps> = ({ base64Text }) => {
// 	const canvasRef = useRef<HTMLCanvasElement>(null);

// 	useEffect(() => {
// 		//
// 		const decodedText = decodeBase64(base64Text);

// 		const lines = parseHtmlToLines(decodedText);

// 		console.log(lines);
// 		const canvas = canvasRef.current;

// 		if (canvas) {
// 			const context = canvas.getContext("2d");
// 			if (context) {
// 				//
// 				canvas.width = 500;
// 				canvas.height = 6000;
// 				context.font = "16px Arial";
// 				//context.fillText(decodedText, 10, 50);
// 				drawTextLines(context, lines, 10, 50, 20);
// 			}
// 		}
// 	}, [base64Text]);

// 	// const decodeBase64 = (base64: string): string => {
// 	// 	const binaryString = atob(base64);
// 	// 	const len = binaryString.length;
// 	// 	const bytes = new Uint8Array(len);
// 	// 	for (let i = 0; i < len; i++) {
// 	// 		bytes[i] = binaryString.charCodeAt(i);
// 	// 	}
// 	// 	const decodedText = new TextDecoder().decode(bytes);
// 	// 	return decodedText;
// 	// };

// 	const decodeBase64 = (base64: string): string => {
// 		const binaryString = atob(base64);
// 		const len = binaryString.length;
// 		const bytes = new Uint8Array(len);
// 		for (let i = 0; i < len; i++) {
// 			bytes[i] = binaryString.charCodeAt(i);
// 		}
// 		const decodedText = new TextDecoder().decode(bytes);
// 		return decodedText;
// 	};

// 	const parseHtmlToLines = (html: string): string[] => {
// 		return html.split("<br>");
// 	};

// 	const drawTextLines = (
// 		context: CanvasRenderingContext2D,
// 		lines: string[],
// 		x: number,
// 		y: number,
// 		lineHeight: number
// 	) => {
// 		lines.forEach((line, index) => {
// 			context.fillText(line.trim(), x, y + index * lineHeight, 400);
// 		});
// 	};

// 	return (
// 		<canvas
// 			ref={canvasRef}
// 			style={{ width: "100%", height: "auto", outline: "1px solid orange" }}
// 		></canvas>
// 	);
// };

const Base64ToCanvas: React.FC<Base64ToCanvasProps> = ({ base64Text }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const decodedText = decodeBase64(base64Text);
		const lines = parseHtmlToLines(decodedText);
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext("2d");
			if (context) {
				//
				const canvasWidth =
					canvas.parentElement?.clientWidth || window.innerWidth;
				const canvasHeight = calculateCanvasHeight(context, lines, canvasWidth);

				canvas.width = canvasWidth;
				canvas.height = canvasHeight;

				context.font = "16px Arial";

				drawTextLines(context, lines, 10, 20, 20, canvas.width);
			}
		}
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

	const calculateCanvasHeight = (
		context: CanvasRenderingContext2D,
		lines: string[],
		maxWidth: number
	): number => {
		const lineHeight = 20;
		let totalHeight = 0;

		lines.forEach((line) => {
			const words = line.trim().split(" ");
			let testLine = "";
			words.forEach((word) => {
				const testText = testLine + word + " ";
				const metrics = context.measureText(testText);
				const testWidth = metrics.width;
				if (testWidth > maxWidth && testLine !== "") {
					totalHeight += lineHeight;
					testLine = word + " ";
				} else {
					testLine = testText;
				}
			});
			totalHeight += lineHeight;
		});

		return totalHeight;
	};

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
			const words = line.trim().split(" ");
			let lineText = "";

			words.forEach((word) => {
				const testLine = lineText + word + " ";
				const metrics = context.measureText(testLine);

				const testWidth = metrics.width;
				//
				console.log("testLine: ", testLine);
				console.log("lineText: ", lineText);
				console.log("metrics.width: ", metrics.width);
				console.log("maxWidth: ", maxWidth);

				if (testWidth > maxWidth) {
					// && lineText !== ""
					console.log("@@@@@ NOOOOOOOO @@@@@@");
					context.fillText(lineText.trim(), x, currentY);
					lineText = word + " ";
					currentY += lineHeight;
				} else {
					lineText = testLine;
				}
			});

			context.fillText(lineText.trim(), x, currentY);
			currentY += lineHeight;
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
