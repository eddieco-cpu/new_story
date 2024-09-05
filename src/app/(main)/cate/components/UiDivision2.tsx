import Link from "next/link";
//
import { UiTitle, UiSection } from "@/components/customUI";
import FreeGlide from "@/components/customUI/FreeGlide";
import NestedLink from "@/components/customUI/NestedLink";

import { imgClassNameInGroupHover } from "@lib/data";

//
import { type UiDivision } from "@/types/cate";
import { type ProductCardViaCategoryType } from "@/types/product";

//
export default function UiDivision2({
	uiDivision,
}: {
	uiDivision: UiDivision;
}) {
	return (
		<UiSection titleChildren={uiDivision.div_title} titleLink="/cate">
			<FreeGlide className="free-glide-flex w-[1240px] flex-wrap content-start items-start gap-x-8 gap-y-4">
				{uiDivision.div_item
					.filter((card, i) => i < 8)
					.map((card) => (
						<Link
							href={`/products/${card.id}`}
							key={card.id}
							className="group grid h-[146px] w-[286px] grid-cols-[auto_1fr] gap-2"
						>
							<picture className="pic-base book-base h-full">
								<img
									src={card.imgcover}
									alt=""
									className={imgClassNameInGroupHover}
								/>
							</picture>
							<article className="flex h-full w-full flex-col items-start justify-start gap-2">
								<h3 className="line-clamp-2 h-14 w-full text-lg font-normal text-ash-900 group-hover:text-accent-300 group-active:text-accent-220">
									{card.title}
								</h3>
								<p className="line-clamp-1 w-full text-base font-normal text-primary-200">
									<span className="text-inherit hover:text-accent-250 active:text-accent-220">
										{card.author}
									</span>
								</p>
							</article>
						</Link>
					))}
			</FreeGlide>
		</UiSection>
	);
}
