import { FetchedResponseType } from "./index";
import { ProductCardViaCategoryType } from "./product";

export type SortBook = {
	id: number;
	title: string;
	author: string;
	link: string;
	picture: string;
	amount?: number;
};

//
export type CateData = {
	id: string;
	num_title: string;
	weight: string;
	level: string;
	name: string;
};

export type FetchedCateData = {
	message: string;
	status: string;
	list: CateData[];
};

//
export type UiDivision = {
	div_id: string;
	div_item: ProductCardViaCategoryType[];
	div_weight: string;
	location: string;
	div_title: string;
	due_date: string;
	div_ui_type: string;
	div_type: string;
};

export type FetchedUiDivisionListType = {
	list: UiDivision[];
} & FetchedResponseType;
