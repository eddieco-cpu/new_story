//
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import React, { Suspense } from "react";

import { type NewsType } from "@/types";
import randomText from "@tools/randomText";

import NewsSlider from "@/components/slider/NewsSlider";
import Breadcrumb from "@/components/Breadcrumb";

import AssembleContainer from "../../../components/AssembleContainer";
import Loading from "@/components/Loading";

import { isValidPathSegment } from "@/tools/validator";

//
const newsArray: NewsType[] = Array.from({ length: 5 }, (_, i) => i + 1).map(
	(i) => ({
		link: "",
		text: randomText(40, 80),
	})
);

export default function Page({
	params: { licenseName },
	searchParams,
}: {
	params: { licenseName: string };
	searchParams: { [key: string]: string };
}) {
	//
	// console.log("searchParams: ", searchParams);
	// console.log("licenseName: ", licenseName);

	if (searchParams.searchstring) {
		redirect(`/search?${new URLSearchParams(searchParams).toString()}`);
	}

	//
	return (
		<section>
			<section className="py-5 max-md:px-5">
				<NewsSlider newsArray={newsArray} />
			</section>

			<section className="pb-5 max-md:hidden">
				<Breadcrumb />
			</section>

			{isValidPathSegment(licenseName) ? (
				<Suspense
					fallback={
						<div>
							<Loading />
						</div>
					}
				>
					<AssembleContainer searchParams={searchParams} />
				</Suspense>
			) : (
				<div>
					{
						//不合法的 pathname
					}
				</div>
			)}
		</section>
	);
}
