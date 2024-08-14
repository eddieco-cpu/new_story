import { FetchedResponseType } from "./index";

//
export type Fan = {
	reader_avatar: string;
	reader_nickname: string;
	reader_account: string;
};

export type ProductCardWithFans = {
	id: string; //product's id
	title: string;
	imgcover: string;
	fans: Fan[];
};

export type FetchedAuthorsFollowers = {
	follow_me_list: Fan[];
	follow_my_novel_list: ProductCardWithFans[];
} & FetchedResponseType;
