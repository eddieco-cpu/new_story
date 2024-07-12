import { Category, Categories, SortBook } from "@/types/cate";

export const categories: Categories = [
	{
		id: "original",
		name: "琅琅原創",
		url: "/original",
		isEmphasis: true,
	},
	{
		id: "romance",
		name: "言情",
		url: "/cate",
		isEmphasis: false,
	},
	{
		id: "lightNovel",
		name: "輕小說",
		url: "",
		isEmphasis: false,
	},
	{
		id: "fantasy",
		name: "玄幻",
		url: "",
		isEmphasis: false,
	},
	{
		id: "suspense",
		name: "懸疑",
		url: "",
		isEmphasis: false,
	},
	{
		id: "adventure",
		name: "冒險",
		url: "",
		isEmphasis: false,
	},
	{
		id: "supernatural",
		name: "靈異",
		url: "",
		isEmphasis: false,
	},
	{
		id: "BL",
		name: "BL",
		url: "",
		isEmphasis: false,
	},
	{
		id: "adult",
		name: "18+",
		url: "",
		isEmphasis: false,
	},
	{
		id: "comic",
		name: "漫畫",
		url: "",
		isEmphasis: true,
	},
	{
		id: "manga",
		name: "漫畫",
		url: "",
		isEmphasis: false,
	},
];

export const imgClassNameInGroupHover =
	" transition-transform duration-300 group-hover:scale-110 group-active:scale-110 ";

export const majorTextClassNameInGroupHover = ` group-active:text-accent-220 group-hover:text-accent-300 `;
