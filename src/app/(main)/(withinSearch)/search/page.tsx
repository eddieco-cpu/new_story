//
import Link from "next/link";
import { redirect, notFound } from "next/navigation";

import { type NewsType } from "@/types";
import randomText from "@tools/randomText";

import NewsSlider from "@/components/slider/NewsSlider";
import Breadcrumb from "@/components/Breadcrumb";

import AssembleContainer from "../components/AssembleContainer";

//
const newsArray: NewsType[] = Array.from({ length: 5 }, (_, i) => i + 1).map(
	(i) => ({
		link: "",
		text: randomText(40, 80),
	})
);

export default function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string };
}) {
	//
	return (
		<section>
			<section className="py-5 max-md:px-5">
				<NewsSlider newsArray={newsArray} />
			</section>

			<section className="pb-5 max-md:hidden">
				<Breadcrumb />
			</section>

			<AssembleContainer searchParams={searchParams} />
		</section>
	);
}