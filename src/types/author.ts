import { ProductCardViaAuthorType } from "./product";

export type AuthorDataType = {
	reader_avatar: string;
	agree_s_term_ver: string;
	reader_nickname: string;
	reader_description: string;
	status: string;
	writer_type: string;
	writer_nickname: string;
	agree_gt_term_ver: string;
	message: string;
	agree_w_term_ver: string;
	writer_description: string;
	is_stop: string;
	published_count: string;
	writer_avatar: string;
};

export type AuthorPiecesData = {
	message: string;
	status: string;
	list: ProductCardViaAuthorType[];
};
