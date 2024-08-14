import { FetchedResponseType } from "./index";

//
export type CategoryType = {
	id: string;
	name: string;
};

export type FetchedProductDataType = {
	summary: string;
	publish_article: string;
	writer_account: string;
	collection: string;
	last_update_chapter_publishtime: string;
	id: string;
	author: string;
	last_update_chapter_id: string;
	title: string;
	share: string;
	words: string;
	imgcover: string;
	contentrating: string;
	status_status: string;
	is_shelf: string;
	last_reading_chapter_id: string;
	charge_type: string;
	writer_type: string;
	buy_point: string;
	authorize: string;
	category: CategoryType[];
	publishtime: string;
	read_prohibition: string;
	is_charge: string;
	view: string;
	last_update_chapter_name: string;
} & FetchedResponseType;

export type ProductCardType = {
	summary: string;
	publish_article: string;
	collection: string;
	id: string;
	author: string;
	category: CategoryType[];
	title: string;
	share: string;
	last_update_chapter_time: string;
	words: string;
	publishtime: string;
	imgcover: string;
	contentrating: string;
	view: string;
	status_status: string;
	last_update_chapter_name: string;
};

export type FetchedProductCardListType = {
	data_count: string;
	list: ProductCardType[];
} & FetchedResponseType;

//
export type ProductCardViaAuthorType = Omit<
	ProductCardType,
	| "publish_article"
	| "last_update_chapter_time"
	| "collection"
	| "share"
	| "words"
	| "contentrating"
	| "view"
> & {
	last_update_chapter_id: string; // 添加新屬性
	last_update_chapter_publishtime: string;
};
