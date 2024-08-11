"use client";

import React, { useState, useCallback } from "react";
import { Cross } from "@components/customUI/svg";

import { cn } from "@/lib/utils";

interface BlockPopupProps {
	isDefaultOpen?: boolean;
	onCloseCallback?: () => void;
	children?: React.ReactNode;
	blockClassName?: string;
	backgroundClassName?: string;
	crossClassName?: string;
}

interface BlockPopupModal {
	setIsOpen: any; //((v: boolean) => void) | undefined;
	setChildren: any; //((newChildren: React.ReactNode) => void) | undefined;
	setBlockClassName: any; //((newBlockClassName: string) => void) | undefined;
	setBackgroundClassName: any; //((newBackgroundClassName: string) => void) | undefined;
	setCrossClassName: any; //((newcrossClassName: string) => void) | undefined;
}

export const BlockPopupModal: BlockPopupModal = {
	setIsOpen: undefined,
	setChildren: undefined,
	setBlockClassName: undefined,
	setBackgroundClassName: undefined,
	setCrossClassName: undefined,
}

export default function BlockPopup({
	isDefaultOpen,
	onCloseCallback,
	children,
	blockClassName,
	backgroundClassName,
	crossClassName,
}: BlockPopupProps) {
	//
	const [isOpen, setIsOpen] = useState(isDefaultOpen || false);
	const [popupChildren, setPopupChildren] = useState<React.ReactNode>(children);
	const [popupBlockClassName, setPopupBlockClassName] = useState<string>(blockClassName || "");
	const [popupBackgroundClassName, setPopupBackgroundClassName] = useState<string>(backgroundClassName || "");
	const [popupCrossClassName, setPopupCrossClassName] = useState<string>(crossClassName || "");

	BlockPopupModal.setIsOpen = (v: boolean) => setIsOpen(() => v);
	BlockPopupModal.setChildren = (newChildren: React.ReactNode) => setPopupChildren(newChildren);
	BlockPopupModal.setBlockClassName = (newBlockClassName: string) => setPopupBlockClassName(newBlockClassName);
	BlockPopupModal.setBackgroundClassName = (newBackgroundClassName: string) => setPopupBackgroundClassName(newBackgroundClassName);
	BlockPopupModal.setCrossClassName = (newcrossClassName: string) => setPopupCrossClassName(newcrossClassName);

	//
	const handleClose = useCallback(
		async (e: React.MouseEvent | Event) => {
			//
			e.preventDefault();
			setIsOpen(false);

			if (onCloseCallback) {
				await Promise.resolve(onCloseCallback()); // 使用 Promise.resolve 來處理同步或異步函數
			}
		},
		[onCloseCallback]
	)

	return (
		<>
			{isOpen &&
				<div className={cn("fixed z-[99] top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)]", popupBackgroundClassName)} onClick={handleClose}>
					{/* popup */}
					<div onClick={(e) => e.stopPropagation()} className={cn(" absolute m-auto z-[1] top-0 left-0 right-0 bottom-0 bg-white  w-[40vw] aspect-video p-[60px] max-lg:py-12 max-lg:px-4 max-lg:w-[calc(100vw-60px)] rounded-md overflow-hidden", popupBlockClassName)}>
						{/* closer */}
						<Cross onClick={handleClose} className={cn(" absolute top-6 right-6 cursor-pointer opacity-35 w-[18px]", popupCrossClassName)} />

						{/* content */}
						{popupChildren && <>{popupChildren}</>}
					</div>
				</div>
			}
		</>
	);
}


