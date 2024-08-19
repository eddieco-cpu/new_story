"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

import cookies from "js-cookie";
import { UiButton } from "@/components/customUI/client";
import NavButton from "@/app/piece/Components/NavButton";

import BlockPopup, { BlockPopupModal } from "@/components/customUI/BlockPopup";

import { useGlobalContext } from "@contexts/globalContext";

import { isLoginWithinDay } from "@/lib/helper";
import { getData } from "@/lib/api";
import { cn } from "@/lib/utils";

import { type FetchedResponseType } from "@/types";

//
function ComfirmUnCollectPopup({
	doUpdateCollect,
}: {
	doUpdateCollect: () => void;
}) {
	return (
		<div className="flex flex-grow flex-col justify-between">
			<div className="py-16">
				<p className="text-center text-xl">確定要 ❝取消❞ 收藏嗎？</p>
			</div>
			<div className="mx-auto flex w-5/6 max-w-[400px] items-center justify-center gap-5 *:flex-grow">
				<UiButton
					variant="primary"
					onClick={() => (doUpdateCollect(), BlockPopupModal.setIsOpen(false))}
				>
					確定
				</UiButton>
				<UiButton
					variant="secondary"
					onClick={() => BlockPopupModal.setIsOpen(false)}
				>
					返回
				</UiButton>
			</div>
		</div>
	);
}

//
export default function CollectBtnController({
	is_collection,
	id,
	isInNav,
	setAdjustCollectAmount,
	className,
}: {
	is_collection: "Y" | "N";
	id: string;
	isInNav: boolean;
	setAdjustCollectAmount?: React.Dispatch<React.SetStateAction<number>>;
	className?: string;
}) {
	//
	const { directToLogin } = useGlobalContext();
	const [isCollectStatus, setIsCollectStatus] = useState<boolean>(
		is_collection === "Y"
	);
	const [isCollectStatusLoading, setIsCollectStatusLoading] =
		useState<boolean>(false);

	//
	function handleSetIsCollect() {
		//
		if (!isLoginWithinDay()) {
			return directToLogin();
		}
		if (isCollectStatusLoading) return;

		if (isCollectStatus === false) {
			fetchToSetIsCollect("add");
		} else {
			BlockPopupModal.setChildren(
				<ComfirmUnCollectPopup
					doUpdateCollect={() => fetchToSetIsCollect("delete")}
				/>
			);
			BlockPopupModal.setBlockClassName("  w-[685px] h-[320px] flex flex-col");
			BlockPopupModal.setIsOpen(true);
		}
	}

	async function fetchToSetIsCollect(action: "add" | "delete") {
		//
		setIsCollectStatusLoading(true);

		const acount = cookies.get("udnmember");
		let url = `/story3/CollectManager?account=${acount}&action=${action}&id=${id}`;

		try {
			const res = await getData(url);
			const data = res.data as FetchedResponseType;

			if (data.status === "200") {
				setIsCollectStatus((v) => !v);
				setAdjustCollectAmount &&
					setAdjustCollectAmount((prev) =>
						action === "add" ? prev + 1 : prev - 1
					);
			} else {
				console.error("updateFollowData error");
			}
		} catch (error) {
			console.error(error);
		}
		setIsCollectStatusLoading(false);
	}

	//
	return (
		<>
			{isInNav ? (
				<NavButton
					icon={isCollectStatus ? "heart-done" : "heart"}
					onClick={handleSetIsCollect}
				>
					{isCollectStatus && "已"}收藏
				</NavButton>
			) : (
				<UiButton
					variant={
						isCollectStatusLoading
							? "secondary"
							: isCollectStatus
								? "tertiary"
								: "secondary"
					}
					className={cn(
						"m-0 flex h-[38px] flex-1 items-center justify-center gap-2",
						className || ""
					)}
					onClick={handleSetIsCollect}
				>
					{isCollectStatusLoading ? (
						""
					) : (
						<>
							<i
								className={
									isCollectStatus
										? "i-heart-2 text-xl text-accent-250"
										: "i-heart-empty text-accent-250"
								}
							></i>
							<span className="text-inherit">
								{isCollectStatus && "已"}收藏
							</span>
						</>
					)}
				</UiButton>
			)}
		</>
	);
}
