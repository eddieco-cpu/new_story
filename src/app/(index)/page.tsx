import Link from "next/link";

import { Category, Categories, SortBook } from "@/types/cate";
import { PhotoSlider } from "@/types";

import randomPicture from "@utils/randomPicture";
import randomText from "@utils/randomText";

import PurePhotoSlider from "@/components/slider/PurePhotoSlider";

const photoSliders: PhotoSlider[] = Array.from(
	{ length: 6 },
	(_, i) => i + 1
).map((i) => ({
	id: `${new Date().getTime() + i}`,
	link: "",
	title: randomText(3, 20),
	alt: randomText(3, 20),
	src: randomPicture(),
}));

export default function Home() {
	return (
		<section>
			<section className="h-[330px] overflow-hidden max-xl:h-[calc(var(--container-width)*33/128)] max-md:aspect-[375/313] max-md:h-auto md:mt-5">
				{/* 330 | 405 */}
				<PurePhotoSlider {...{ photoSliders }} />
			</section>
		</section>
	);
}
