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
export default function UiDivision3({
	uiDivision,
}: {
	uiDivision: UiDivision;
}) {
	return (
		<UiSection titleChildren={uiDivision.div_title} titleLink="/cate">
			<FreeGlide className="free-glide-flex gap-x-[30px]">
				{uiDivision.div_item.map((card) => (
					<Link
						href={`/products/${card.id}`}
						key={card.id}
						className="group w-[180px]"
					>
						<picture className="pic-base book-base h-full">
							<img
								src={card.imgcover}
								className={imgClassNameInGroupHover}
								alt=""
							/>
						</picture>
						<article className="h-[104px] p-2">
							<h3 className="mb-2 line-clamp-2 h-14 text-lg font-normal text-ash-900 group-hover:text-accent-300 group-active:text-accent-220">
								{card.title}
							</h3>
							<p className="line-clamp-1 text-base font-normal text-primary-200">
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
