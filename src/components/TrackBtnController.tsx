"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

import cookies from "js-cookie";
import { UiButton } from "@/components/customUI/client";
import BlockPopup, { BlockPopupModal } from "@/components/customUI/BlockPopup";

import { useGlobalContext } from "@contexts/globalContext";

import { isLoginWithinDay } from "@/lib/helper";
import { getData, FOLLOW_CONTROL } from "@/lib/api";
import { cn } from "@/lib/utils";

import { type FetchedResponseType } from "@/types";

//
type actOfFollow = "1" | "2"; //1：關注作者、2：取消關注作者、9：撈取關注清單

type follewedWriter = {
	is_cancel_writer_message: "N" | "Y";
	writer_account: string;
	writer_nickname: string;
	writer_avatar: string;
};

type follewedNovel = {
	is_cancel_writer_message: "N" | "Y";
	is_cancel: "N" | "Y";
	id: string;
	title: string;
	imgcover: string;
};

type FetchedUserFollowings = {
	follow_novel_list: follewedNovel[];
	follow_writer_list: follewedWriter[];
} & FetchedResponseType;

//
function ComfirmUnfollowPopup({
	doUpdateFollow,
}: {
	doUpdateFollow: () => void;
}) {
	return (
		<div className="flex flex-grow flex-col justify-between">
			<div className="py-16">
				<p className="text-center text-xl">確定要 ❝取消❞ 追蹤嗎？</p>
			</div>
			<div className="mx-auto flex w-5/6 max-w-[400px] items-center justify-center gap-5 *:flex-grow">
				<UiButton
					variant="primary"
					onClick={() => (doUpdateFollow(), BlockPopupModal.setIsOpen(false))}
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
export default function TrackBtnController({
	writer_account,
	className,
	callback,
}: {
	writer_account: string;
	className?: string;
	callback: (v: "add" | "remove") => void;
}) {
	//
	const { directToLogin } = useGlobalContext();

	const [followingStatus, setFollowingStatus] = useState<boolean | "loading">(
		"loading"
	);

	//
	useEffect(() => {
		if (!isLoginWithinDay()) {
			setFollowingStatus(false);
			return;
		}

		fetchFollowData();
	}, []);

	//
	async function fetchFollowData() {
		//
		const acount = cookies.get("udnmember");
		let url = FOLLOW_CONTROL + `?account=${acount}&type=9`;

		try {
			const res = await getData(url);
			const data = res.data;
			console.log("data: ", data);

			if (data.status === "200") {
				const successData = data as FetchedUserFollowings;
				const follow_writer_list = successData.follow_writer_list;

				const isFollowed = follow_writer_list.some(
					(item) => item.writer_account === writer_account
				);

				setFollowingStatus(isFollowed);
			} else {
				throw new Error("fetchFollowData error");
			}
		} catch (error) {
			console.error(error);
			setFollowingStatus(false);
		}
	}
	async function updateFollowData(act: actOfFollow) {
		//
		const acount = cookies.get("udnmember");
		let url =
			FOLLOW_CONTROL +
			`?account=${acount}&type=${act}&writer_account=${writer_account}`;

		try {
			const res = await getData(url);
			const data = res.data as FetchedResponseType;
			//console.log("data: ", data);

			if (data.status === "200") {
				setFollowingStatus(act === "1"); //1：關注作者、2：取消關注作者、9：撈取關注清單
				callback(act === "1" ? "add" : "remove");
			} else {
				throw new Error("updateFollowData error");
			}
		} catch (error) {
			console.error(error);
		}
	}
	function doUpdateFollow() {
		updateFollowData(followingStatus ? "2" : "1");
	}

	//
	function handleToFollow() {
		if (!isLoginWithinDay()) {
			directToLogin();
			return;
		}
		if (followingStatus === "loading") return;
		if (followingStatus === true) {
			BlockPopupModal.setChildren(
				<ComfirmUnfollowPopup doUpdateFollow={doUpdateFollow} />
			);
			BlockPopupModal.setBlockClassName("  w-[685px] h-[320px] flex flex-col");
			BlockPopupModal.setIsOpen(true);
		} else {
			doUpdateFollow();
		}
	}

	//
	return (
		<>
			<UiButton
				variant={followingStatus === true ? "tertiary" : "secondary"}
				className={cn("w-[150px]", className || "")}
				onClick={handleToFollow}
			>
				{followingStatus === "loading" ? (
					"loading..."
				) : followingStatus === true ? (
					<>
						<i className="i-done text-base text-accent-250"></i>
						<span className="text-inherit">已追蹤</span>
					</>
				) : (
					"追蹤"
				)}
			</UiButton>
		</>
	);
}
