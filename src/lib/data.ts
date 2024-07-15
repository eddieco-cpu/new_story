//import { Category, Categories, SortBook } from "@/types/cate";

export type CategoryData = {
	id: string;
	name: string;
	url: string;
};

export const categoryDatas: CategoryData[] = [
	{
		id: "original",
		name: "琅琅原創",
		url: "/cate/original",
	},
	{
		id: "romance",
		name: "愛情",
		url: "/cate/romance",
	},
	{
		id: "horror",
		name: "恐怖",
		url: "/cate/horror",
	},
	{
		id: "crime",
		name: "犯罪",
		url: "/cate/crime",
	},
	{
		id: "fantasy",
		name: "幻想",
		url: "/cate/fantasy",
	},
	{
		id: "wuxia",
		name: "武俠",
		url: "/cate/wuxia",
	},
	{
		id: "realistic",
		name: "寫實",
		url: "/cate/realistic",
	},
	{
		id: "comic",
		name: "漫畫",
		url: "/cate/comic",
	},
	{
		id: "lgbt",
		name: "LGBT",
		url: "/cate/lgbt",
	},
	{
		id: "adult",
		name: "成人",
		url: "/cate/adult",
	},

	// {
	// 	id: "supernatural",
	// 	name: "靈異",
	// 	url: "/supernatural",
	// },
	// {
	// 	id: "suspense",
	// 	name: "懸疑",
	// 	url: "",
	// },
	// {
	// 	id: "adventure",
	// 	name: "冒險",
	// 	url: "",
	// },
];

export const imgClassNameInGroupHover =
	" transition-transform duration-300 group-hover:scale-110 group-active:scale-110 ";

export const majorTextClassNameInGroupHover = ` group-active:text-accent-220 group-hover:text-accent-300 `;
