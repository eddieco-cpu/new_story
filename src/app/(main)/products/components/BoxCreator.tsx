import Image from "next/image";
import Link from "next/link";

import randomPicture from "@tools/randomPicture";
import randomText from "@tools/randomText";

import { UiButton } from "@/components/customUI/client";
import NestedLink from "@/components/customUI/NestedLink";

//
const author = {
	id: 1,
	name: randomText(20, 60),
	avatar: randomPicture(),
	about: randomText(300, 800),
	storiesNumber: Math.floor(Math.random() * 100),
	followersNumber: Math.floor(Math.random() * 100),
};

export default function Page() {
	return (
		<section className="flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0)]">
			<article className="flex max-w-full shrink-0 items-center justify-center gap-3 overflow-hidden p-3 max-md:px-2 xl:flex-col">
				{/* -- */}
				<picture className="pic-base aspect-square w-[100px] shrink-0 rounded-full max-md:w-[60px]">
					<img src={author.avatar} alt={author.name} />
				</picture>

				{/* -- */}
				<div className="grid grid-cols-1 gap-2 max-md:flex-grow">
					<p className="flex items-center justify-center gap-1 max-xl:justify-start">
						<img src="/images/author_icon.png" className="block w-5" alt="" />
						<span className="text-sm text-secondary-500">簽約作家</span>
					</p>
					<h2 className="line-clamp-2 text-2xl font-normal text-ash-900 max-md:line-clamp-3 max-md:text-sm">
						{author.name}
					</h2>
				</div>

				{/* -- */}
				<div className="flex flex-col items-center justify-center gap-3 max-xl:py-2 max-md:py-0">
					<div className="flex items-center justify-center gap-2">
						<p className="flex flex-col items-center justify-center gap-3 px-2">
							<b className="text-xl leading-none">{author.storiesNumber}</b>
							<span className="text-sm leading-none text-ash-600">作品數</span>
						</p>
						<div className="h-[50px] w-[1px] bg-ash-500"></div>
						<p className="flex flex-col items-center justify-center gap-3 px-2">
							<b className="text-xl leading-none">{author.followersNumber}</b>
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
