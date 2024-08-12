import Image from "next/image";
import Link from "next/link";

import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

import { UiButton } from "@/components/customUI/client";
import NestedLink from "@/components/customUI/NestedLink";

import { type AuthorDataType } from "@/types/author";

//
export default function BoxCreator({
	authorData,
	writer_account,
}: {
	authorData: AuthorDataType;
	writer_account: string;
}) {
	return (
		<section className="flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0)]">
			<article className="flex w-full max-w-full shrink-0 items-center justify-center gap-3 overflow-hidden p-3 max-md:px-2 xl:flex-col">
				{/* -- */}
				<Link href={`/authors/${writer_account}`}>
					<picture className="pic-base aspect-square w-[100px] shrink-0 rounded-full max-md:w-[60px]">
						<img
							src={authorData.writer_avatar || "/images/default-member.jpg"}
							alt={authorData.writer_nickname}
						/>
					</picture>
				</Link>

				{/* -- */}
				<div className="grid flex-grow grid-cols-1 gap-2 max-md:flex-grow">
					{/* <p className="flex items-center justify-center gap-1 max-xl:justify-start">
						<img src="/images/author_icon.png" className="block w-5" alt="" />
						<span className="text-sm text-secondary-500">簽約作家</span>
					</p> */}
					<h2 className="line-clamp-2 text-center text-2xl font-normal text-ash-900 max-md:line-clamp-3 max-md:text-sm">
						<Link
							href={`/authors/${writer_account}`}
							className="cursor-pointer hover:text-accent-300"
						>
							{authorData.writer_nickname}
						</Link>
					</h2>
				</div>

				{/* -- */}
				<div className="flex flex-col items-center justify-center gap-3 max-xl:py-2 max-md:py-0">
					<div className="flex items-center justify-center gap-2">
						<p className="flex flex-col items-center justify-center gap-3 px-2">
							<b className="text-xl leading-none">
								{authorData.published_count}
							</b>
							<span className="text-sm leading-none text-ash-600">作品數</span>
						</p>
						<div className="h-[50px] w-[1px] bg-ash-500"></div>
						<p className="flex flex-col items-center justify-center gap-3 px-2">
							<b className="text-xl leading-none">97?</b>
							<span className="text-sm leading-none text-ash-600">追蹤數</span>
						</p>
					</div>
					<UiButton variant="secondary" className="w-[150px]">
						追蹤
					</UiButton>
				</div>
			</article>
		</section>
	);
}
