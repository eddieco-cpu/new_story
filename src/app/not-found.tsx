import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { UiMain } from "@/components/customUI";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

//
export default function NotFound() {
	//
	//const headersList = headers();

	// console.log("headersList: ", headersList);
	// headersList.forEach((value, name) => {
	// 	console.log(name, value);
	// });

	// const headersArray = Array.from(headersList);
	// console.log("headersArray: ", headersArray);

	// const referer = headers().get("referer");
	// console.log("referer: ", referer);

	return (
		<>
			<Header />
			<UiMain className="flex items-center justify-center">
				<section className="flex items-center justify-center gap-x-10 max-md:flex-col max-md:py-5">
					<article className="w-[366px] *:text-center max-md:w-full">
						<p
							className="text-[180px] font-bold leading-none text-[rgba(174,53,53,0.7)] max-md:text-[130px]"
							style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
						>
							404!
						</p>
						<p className="text-xl font-medium tracking-[6px]">
							很抱歉，目前的網頁連結
						</p>
						<p className="text-xl font-medium tracking-[6px]">不存在</p>
					</article>
					<div>
						<Image
							src={BASE_PATH + "/images/error.png"}
							width={170}
							height={232}
							alt="error"
						/>
					</div>
				</section>
			</UiMain>
			<Footer />
		</>
	);
}
