"use client";

import React, { useEffect, useState, CSSProperties } from "react";
import cookies from "js-cookie";
import { isLoginWithinDay } from "@/lib/helper";

import { useGlobalContext } from "@contexts/globalContext";

import { getData, ACCOUNT_DATA } from "@/lib/api";
import { FetchedAuthorDataType } from "@/types/author";

import Agreement from "./Agreement";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

export default function Index() {
	//
	const { isMemberConformAgreementOfRead } = useGlobalContext();

	//
	const [fetchedAuthorData, setFetchedAuthorData] =
		useState<null | FetchedAuthorDataType>(null);
	//
	useEffect(() => {
		fetchToCheckIfMemberAcceptAgreement();
	}, []);

	async function fetchToCheckIfMemberAcceptAgreement() {
		//
		if (!isLoginWithinDay()) return;

		const account = cookies.get("udnmember");
		if (!account) return;

		try {
			const res = await getData(
				BASE_PATH + ACCOUNT_DATA + `?account=${account}&action=select`
			);

			if (!res.data || res.data.status !== "200") {
				throw new Error("fetchToCheckIfMemberAcceptAgreement error");
			}

			const data = res.data as FetchedAuthorDataType;
			console.log("logined member data: ", data);
			setFetchedAuthorData(() => ({ ...data }));
		} catch (error) {
			console.error(error);
		}
	}

	if (!isLoginWithinDay()) {
		return null;
	}
	if (!fetchedAuthorData) {
		return null;
	}
	if (isMemberConformAgreementOfRead) {
		return null;
	}
	return (
		<>
			{!fetchedAuthorData.agree_s_term_ver ||
			fetchedAuthorData.agree_s_term_ver === "0" ? (
				<Agreement />
			) : null}
		</>
	);
}
