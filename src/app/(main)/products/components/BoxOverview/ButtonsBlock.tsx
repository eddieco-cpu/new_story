"use client";

import Image from "next/image";
import Link from "next/link";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { CSSProperties, useEffect, useState } from "react";

import { UiButton, UiTag } from "@/components/customUI/client";
import { Share } from "@/components/customUI/svg";
import CollectBtnController from "@/components/CollectBtnController";
import StartReadBtnController from "@/components/StartReadBtnController";

import BlockPopup, { BlockPopupModal } from "@/components/customUI/BlockPopup";
import { useToast } from "@/components/ui/use-toast";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

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
						src={BASE_PATH + "/images/line-logo.svg"}
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
						src={BASE_PATH + "/images/fb-logo.svg"}
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
	function handleShare() {
		BlockPopupModal.setChildren(<ShareBox />);
		BlockPopupModal.setBlockClassName(
			" max-w-[560px] h-[306px] max-h-[calc(100vh-40px)] p-14 !md:px-14 max-lg:pb-6 max-md:h-[262px]"
		);
		BlockPopupModal.setIsOpen(true);
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
			<StartReadBtnController id={id} />
			<UiButton
				variant="primary"
				className="m-0 h-[38px] flex-1 max-md:order-3"
			>
				全本購買
			</UiButton>

			{/* -- */}
			<CollectBtnController
				is_collection={is_collection}
				id={id}
				setAdjustCollectAmount={setAdjustCollectAmount}
				className="overflow-hidden max-md:order-1 max-md:max-w-12 max-md:justify-start *:max-md:w-full *:max-md:flex-shrink-0"
				isInNav={false}
			/>

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
