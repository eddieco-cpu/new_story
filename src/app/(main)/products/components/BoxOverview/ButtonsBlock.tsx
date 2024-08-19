"use client";

import Image from "next/image";
import Link from "next/link";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { CSSProperties, useEffect, useState } from "react";

import cookies from "js-cookie";
import { UiButton, UiTag } from "@/components/customUI/client";
import { Share } from "@/components/customUI/svg";

import { useGlobalContext } from "@contexts/globalContext";

import BlockPopup, { BlockPopupModal } from "@/components/customUI/BlockPopup";
import { useToast } from "@/components/ui/use-toast";

import { isLoginWithinDay } from "@/lib/helper";
import { getData } from "@/lib/api";

import { type FetchedResponseType } from "@/types";

//
function ShareBox() {
	//
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const { toast } = useToast();

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(
				window.location.origin + pathname + searchParams
			);
			toast({
				description: "複製成功 !",
			});
		} catch (err) {
			console.error("Failed to copy: ", err);
			toast({
				description: "複製失敗，請稍後再試。",
			});
		}
	};

	const shareLine = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		if (screen.width > 767) {
			e.preventDefault();
			window.open(
				"https://social-plugins.line.me/lineit/share?url=" +
					window.location.origin +
					pathname +
					searchParams,
				"share Post",
				"toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=500,height=700"
			);
		}
	};

	const shareFB = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		if (screen.width > 767) {
			e.preventDefault();
			window.open(
				"https://www.facebook.com/sharer.php?u=" +
					window.location.origin +
					pathname +
					searchParams,
				"share Post",
				"toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=500,height=700"
			);
		}
	};

	return (
		<div>
			<p className="border-b border-ash-350 py-4 text-center text-2xl font-medium tracking-[2px]">
				分享作品
			</p>
			<nav className="flex items-center justify-center gap-6 py-7">
				<div
					className="group flex cursor-pointer flex-col items-center justify-center gap-2"
					onClick={() => handleCopyLink()}
				>
					<b className="flex h-10 w-10 items-center justify-center rounded-full bg-ash-500">
						<i className="i-link1 -mt-1 text-3xl text-white"></i>
					</b>
					<span className="text-ash-600 group-hover:text-accent-300 group-active:text-accent-250">
						複製連結
					</span>
				</div>
				<Link
					className="group flex cursor-pointer flex-col items-center justify-center gap-2"
					href={
						"https://social-plugins.line.me/lineit/share?url=" +
						window.location.origin +
						pathname +
						searchParams
					}
					onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
						shareLine(e)
					}
				>
					<Image
						src="/images/line-logo.svg"
						alt="line"
						width={41.5}
						height={40}
					></Image>
					<span className="text-ash-600 group-hover:text-accent-300 group-active:text-accent-250">
						Line
					</span>
				</Link>
				<Link
					className="group flex cursor-pointer flex-col items-center justify-center gap-2"
					href={
						"https://www.facebook.com/sharer.php?u=" +
						window.location.origin +
						pathname +
						searchParams
					}
					onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
						shareFB(e)
					}
				>
					<Image
						src="/images/fb-logo.svg"
						alt="fb"
						width={40}
						height={40}
					></Image>
					<span className="text-ash-600 group-hover:text-accent-300 group-active:text-accent-250">
						Facebook
					</span>
				</Link>
			</nav>
		</div>
	);
}

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

export default function ButtonsBlock({
	writer_account,
	is_collection,
	id,
	setAdjustCollectAmount,
}: {
	writer_account: string;
	is_collection: "Y" | "N";
	id: string;
	setAdjustCollectAmount: React.Dispatch<React.SetStateAction<number>>;
}) {
	//
	const { directToLogin } = useGlobalContext();
	const [isCollectStatus, setIsCollectStatus] = useState<boolean>(
		is_collection === "Y"
	);
	const [isCollectStatusLoading, setIsCollectStatusLoading] =
		useState<boolean>(false);

	//
	function handleShare() {
		BlockPopupModal.setChildren(<ShareBox />);
		BlockPopupModal.setBlockClassName(
			" max-w-[560px] h-[306px] max-h-[calc(100vh-40px)] p-14 !md:px-14 max-lg:pb-6 max-md:h-[262px]"
		);
		BlockPopupModal.setIsOpen(true);
	}

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

		//
		try {
			const res = await getData(url);
			const data = res.data as FetchedResponseType;

			if (data.status === "200") {
				setIsCollectStatus((v) => !v);
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
		<div
			className="flex items-center justify-start gap-4 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:z-[9] max-md:w-full max-md:bg-white max-md:px-5 max-md:py-4 max-md:shadow-2xl"
			style={
				{
					"--tw-shadow": "0 0 25px 0 rgba(0,0,0,0.2)",
				} as CSSProperties
			}
		>
			<UiButton
				variant="primary"
				className="m-0 h-[38px] flex-1 max-md:order-4"
			>
				開始閱讀
			</UiButton>
			<UiButton
				variant="primary"
				className="m-0 h-[38px] flex-1 max-md:order-3"
			>
				全本購買
			</UiButton>

			<UiButton
				variant={
					isCollectStatusLoading
						? "secondary"
						: isCollectStatus
							? "tertiary"
							: "secondary"
				}
				className="m-0 flex h-[38px] flex-1 items-center justify-center gap-2 max-md:order-1 max-md:max-w-12"
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
						<span className="text-inherit max-md:hidden">
							{isCollectStatus && "已"}收藏
						</span>
					</>
				)}
			</UiButton>
			<UiButton
				variant="secondary"
				className="m-0 flex h-[38px] flex-1 items-center justify-center gap-2 max-md:order-2 max-md:max-w-12"
				onClick={() => handleShare()}
			>
				<Share />
				<span className="text-inherit max-md:hidden">分享</span>
			</UiButton>
		</div>
	);
}
