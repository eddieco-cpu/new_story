"use client";

import React, { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";

import { usePieceContext } from "@contexts/pieceContext";

const space = 0;
const xScale = 1;

function applyBoldStyles(textObject, rawText) {
	//
	// 正則匹配所有的 <b> 和 </b> 標籤，記錄位置
	const boldTags = [...rawText.matchAll(/<b>|<\/b>/g)];
	let boldSections = [];
	let offset = 0;

	for (let i = 0; i < boldTags.length; i += 2) {
		if (boldTags[i] && boldTags[i + 1]) {
			const startTag = boldTags[i];
			const endTag = boldTags[i + 1];

			// 開始和結束的索引
			const startIndex = startTag.index - offset;
			const endIndex = endTag.index - offset - 3; // 減去 </b> 的長度

			// 增加 <b> 和 </b> 的長度到 offset
			offset += 7; // <b> 和 </b> 總長度

			boldSections.push([startIndex, endIndex]);
		}
	}

	// 設置加粗樣式
	boldSections.forEach(([start, end]) => {
		textObject.setSelectionStyles(
			{ fontWeight: "bold" },
			start, // 開始索引
			end // 結束索引（不包含）
		);
	});
}

//
export default function FabricCanvas({ decodedHtml }) {
	//
	const { fontSize, lineHeight, setIsPieceLoading } = usePieceContext();

	const parentContainerRef = useRef(null);
	const fabricRef = useRef(null);
	const canvasRef = useRef(null);
	const textRef = useRef(null);

	useEffect(() => {
		if (!fabricRef.current) return;
		if (!textRef.current) return;

		console.log("fontSize", fontSize);

		textRef.current.set({ fontSize });
		textRef.current.canvas.renderAll();
		fabricRef.current.setHeight(textRef.current.height + space * 2);
	}, [fontSize]);

	useEffect(() => {
		if (!fabricRef.current) return;
		if (!textRef.current) return;

		console.log("lineHeight", lineHeight);

		textRef.current.set({
			lineHeight: lineHeight === "L" ? 1.75 : lineHeight === "M" ? 1.55 : 1.35,
		});
		textRef.current.canvas.renderAll();
		fabricRef.current.setHeight(textRef.current.height + space * 2);
	}, [lineHeight]);

	useEffect(() => {
		//
		let newDecodedHtml = decodedHtml.replace(/<\/?[^>]+(>|$)/g, "");
		// console.log("newDecodedHtml", newDecodedHtml);
		//console.log(" decodedHtml", decodedHtml);

		//
		const parentContainer = parentContainerRef.current;

		const initFabric = () => {
			//
			canvasRef.current.width = parentContainer.clientWidth * xScale;

			fabricRef.current = new fabric.Canvas(canvasRef.current, {
				//backgroundColor: "lightgrey",
				//width: parentContainer.clientWidth * xScale,
			});
		};

		const addText = () => {
			//let text = new fabric.Textbox(decodedHtml, {
			let text = new fabric.Textbox(newDecodedHtml, {
				left: space,
				top: space,
				width: (parentContainer.clientWidth - space * 2) * xScale,
				fontSize: fontSize * xScale,
				lineHeight:
					lineHeight === "L" ? 1.75 : lineHeight === "M" ? 1.55 : 1.35,
				splitByGrapheme: true,
				selectable: false, // 禁止選擇
				evented: false, // 禁止所有事件
				//objectCaching: false,
			});

			textRef.current = text;
			fabricRef.current.add(text);

			//
			console.log("text.height", text.height);
			fabricRef.current.setHeight(text.height + space * 2);
		};

		const decorateText = () => {
			//b
			// text.setSelectionStyles(
			// 	{ fontWeight: "bold" },
			// 	0, // 開始索引
			// 	4 // 結束索引（不包含）
			// );
			applyBoldStyles(textRef.current, decodedHtml);

			//i
			//text.setSelectionStyles({ fontStyle: "italic" }, 32, 36);
			//u
			//text.setSelectionStyles({ underline: true }, 34, 40);
			//
			//fabricRef.current.renderAll();
			//fabricRef.current.setZoom(xScale / 1);
		};

		const resizeCanvas = () => {
			fabricRef.current.setWidth(parentContainer.clientWidth);
			fabricRef.current.setHeight(textRef.current.height + space * 2);

			textRef.current.set({ width: parentContainer.clientWidth - space * 2 });
			fabricRef.current.renderAll();
			//fabricRef.current.setZoom(xScale / 1)
		};

		//
		initFabric();
		addText();
		decorateText();

		//
		window.addEventListener("resize", resizeCanvas);
		setIsPieceLoading(false);

		//
		return () => {
			window.removeEventListener("resize", resizeCanvas);
			fabricRef.current.dispose();
		};
	}, [canvasRef]);

	return (
		<div
			ref={parentContainerRef}
			// ring-1 ring-orange-400
			className={"pointer-events-none block"}
		>
			<canvas
				ref={canvasRef}
				//className="ring-1"
			></canvas>
		</div>
	);
}
