"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Cross } from "@components/customUI/svg";

import { cn } from "@/lib/utils";

interface BlockPopupProps {
	isDefaultOpen?: boolean;
	isOpenSetter?: boolean | null;
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
};

export default function BlockPopup({
	isDefaultOpen,
	isOpenSetter,
	onCloseCallback,
	children,
	blockClassName,
	backgroundClassName,
	crossClassName,
}: BlockPopupProps) {
	//
	const [isOpen, setIsOpen] = useState(isDefaultOpen || false);
	const [popupChildren, setPopupChildren] = useState<React.ReactNode>(children);
	const [popupBlockClassName, setPopupBlockClassName] = useState<string>(
		blockClassName || ""
	);
	const [popupBackgroundClassName, setPopupBackgroundClassName] =
		useState<string>(backgroundClassName || "");
	const [popupCrossClassName, setPopupCrossClassName] = useState<string>(
		crossClassName || ""
	);

	BlockPopupModal.setIsOpen = (v: boolean) => setIsOpen(() => v);
	BlockPopupModal.setChildren = (newChildren: React.ReactNode) =>
		setPopupChildren(newChildren);
	BlockPopupModal.setBlockClassName = (newBlockClassName: string) =>
		setPopupBlockClassName(newBlockClassName);
	BlockPopupModal.setBackgroundClassName = (newBackgroundClassName: string) =>
		setPopupBackgroundClassName(newBackgroundClassName);
	BlockPopupModal.setCrossClassName = (newcrossClassName: string) =>
		setPopupCrossClassName(newcrossClassName);

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
	);

	//
	useEffect(() => {
		if (typeof isOpenSetter !== "boolean") return;
		setIsOpen(() => isOpenSetter);
		/**
		 * 如果外層有使用 isOpenSetter 來控制 popup 的開關，
		 * 記得外層也要寫 onCloseCallback={() => setIsOpenSetter(false)}
		 * 來確保 popup 關閉時，外層的 isOpenSetter 也會被設為 false
		 * 參考 src/components/AgreementOfRead/Agreement.tsx
		 */
	}, [isOpenSetter]);

	return (
		<>
			{isOpen ? (
				<div
					className={cn(
						"fixed bottom-0 left-0 right-0 top-0 z-[99] bg-[rgba(0,0,0,0.7)]",
						popupBackgroundClassName
					)}
					onClick={handleClose}
				>
					{/* popup */}
					<div
						onClick={(e) => e.stopPropagation()}
						className={cn(
							"absolute bottom-0 left-0 right-0 top-0 z-[1] m-auto aspect-video w-[40vw] overflow-hidden rounded-md bg-white p-[60px] max-lg:w-[calc(100vw-60px)] max-lg:px-4 max-lg:py-12",
							popupBlockClassName
						)}
					>
						{/* closer */}
						<Cross
							onClick={handleClose}
							className={cn(
								"absolute right-6 top-6 w-[18px] cursor-pointer opacity-35",
								popupCrossClassName
							)}
						/>

						{/* content */}
						{popupChildren && <>{popupChildren}</>}
					</div>
				</div>
			) : null}
		</>
	);
}
