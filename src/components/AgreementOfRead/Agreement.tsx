"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState, CSSProperties } from "react";
import BlockPopup, { BlockPopupModal } from "@/components/customUI/BlockPopup";

import cookies from "js-cookie";
import { UiButton } from "../customUI/client";

import { useGlobalContext } from "@contexts/globalContext";
import { useToast } from "@/components/ui/use-toast";

import { isLoginWithinDay } from "@/lib/helper";

import { getData, TERMS } from "@/lib/api";
import { FetchedResponseType } from "@/types";

import useDirectToLogin from "@/hooks/useDirectToLogin";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

type FetchedAgreementOfReadType = {
	content: string;
	title: string;
	ver: string;
	type: string;
} & FetchedResponseType;

export default function AgreementOfRead() {
	//
	const pathname = usePathname();
	const searchParams = useSearchParams();

	//
	const [directToLogin] = useDirectToLogin();
	const { toast } = useToast();
	const { isMemberConformAgreementOfRead, setIsMemberConformAgreementOfRead } =
		useGlobalContext();

	//
	const [isAgreeLoading, setIsAgreeLoading] = useState(false);

	//
	const [agreement, setAgreement] = useState({
		content: "",
		title: "",
		ver: "",
		type: "",
	});

	//
	const [isOpenSetter, setIsOpenSetter] = useState<null | boolean>(null); //popup open/close

	//
	useEffect(() => {
		fetchAgree();
	}, []);

	useEffect(() => {
		if (isMemberConformAgreementOfRead) return;
		setIsOpenSetter(true);
	}, [pathname, searchParams]);

	//
	async function fetchAgree() {
		try {
			const res = await getData(BASE_PATH + TERMS + `?action=select&type=S`);

			if (!res.data || res.data.status !== "200") {
				throw new Error("fetchAgree error");
			}

			const data = res.data as FetchedAgreementOfReadType;
			const { message, status, ...rest } = data;

			setAgreement(() => ({ ...rest }));
		} catch (error) {
			console.error(error);
		}
	}

	async function sendIsAgree() {
		//
		setIsAgreeLoading(true);

		const account = cookies.get("udnmember");
		let url =
			BASE_PATH +
			TERMS +
			`?action=agree&type=S&account=${account}&ver=${agreement.ver || "1"}`;

		try {
			const res = await getData(url);

			if (!res.data || res.data.status !== "200") {
				throw new Error("sendIsAgree error");
			}

			toast({
				description: "條款同意成功。",
			});
			setIsAgreeLoading(false);
			setIsOpenSetter(false);
			setIsMemberConformAgreementOfRead(true);

			//
		} catch (error) {
			console.error(error);
			toast({
				description: "條款同意失敗，請稍後再試。",
			});
			setIsAgreeLoading(false);
		}
	}

	async function dealWithAgree() {
		//
		if (!isLoginWithinDay()) {
			directToLogin();
			return;
		}
		if (isAgreeLoading) return;
		await sendIsAgree();
	}

	//
	if (!agreement.content || !agreement.title) return null;

	return (
		<>
			<BlockPopup
				//isDefaultOpen={true}
				isOpenSetter={isOpenSetter}
				blockClassName=" min-w-[80vw] min-h-[80vh]"
				onCloseCallback={() => setIsOpenSetter(false)}
			>
				<section className="flex h-full flex-col justify-between gap-4 p-2">
					<h3 className="h-9 flex-shrink-0 text-2xl font-bold">
						{agreement.title}
					</h3>
					<article className="flex-grow overflow-y-auto">
						<div
							dangerouslySetInnerHTML={{ __html: agreement.content }}
							className="py-2"
							style={{
								fontSize: "18px",
								lineHeight: "1.8",
								opacity: "0.85",
							}}
						/>
					</article>
					<div className="h-9 flex-shrink-0 text-center">
						<UiButton
							variant="primary"
							className={
								"h-11 w-32 text-xl " +
								(isAgreeLoading ? "pointer-events-none opacity-50" : "")
							}
							onClick={dealWithAgree}
						>
							{isAgreeLoading ? "loading..." : "同意"}
						</UiButton>
					</div>
				</section>
			</BlockPopup>
		</>
	);
}
